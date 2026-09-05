// Function to handle COD

import { generateOrderNumber } from "../lib/orderNumber.js";
import Address from "../models/addressModel.js";
import Location from "../models/locationModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { formatDate } from "../lib/utils.js";

import * as paymentService from "../services/payment/paymentService.js";
import * as emailService from "../services/email/emailService.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const userID = req.userID;
    const { items, address } = req.body;

    const user = await User.findById(userID);

    if (!user) {
      return res.json({ success: false, message: "Account does not exist!" });
    }

    const userAddress = await Address.findById(address);
    const userRegion = await Location.findOne({ region: userAddress.region });

    // If no address provided and the items length is 0
    if (!address && items.length === 0) {
      return res.json({ success: false, message: "Invalid data!" });
    }

    // Calculating the amount
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Adding the delivery fee for the specific region
    amount += userRegion.deliveryFee;

    const orderNumber = await generateOrderNumber();

    const newOrder = await Order.create({
      userID,
      items,
      amount,
      address,
      orderNumber,
      paymentType: "COD",
      isPaid: false,
    });

    const customerOrder = await Order.findById(newOrder._id).populate(
      "items.product",
    );

    let productsHTML;

    const structuredOrder = customerOrder.items.map(
      (item) =>
        (productsHTML += `
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 1px solid #e5e7eb; padding-bottom: 18px; margin-bottom: 18px;">     
                <tr>
                  <td width="85" valign="top">
                    <img src="${item.product.image}" alt="${item.product.name}" width="70" height="70" style="display: block; object-fit: cover; border-radius: 8px;" />
                  </td>   
                  <td valign="top">
                    <p style="margin: 0 0 6px; color: #111827; font-size: 15px; font-weight: bold;">
                      ${item.product.name}
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 13px;">
                      Quantity: ${item.quantity}
                    </p>   
                  </td>  
                  <td align="right" valign="top" style="color: #111827; font-size: 15px; font-weight: bold;">
                    KSh ${item.product.offerPrice}
                  </td> 
                </tr>
       </table>
    
    `),
    );

    const subtotal = amount - userRegion.deliveryFee;

    const deliveryAddress = `${userAddress.firstName} ${userAddress.lastName} ${userAddress.region} ${userAddress.city}`;

    await emailService.sendOrderConfirmation({
      user,
      deliveryFee: userRegion.deliveryFee,
      orderLink: `${process.env.CLIENT_URL}/my-orders`,
      total: amount,
      estimatedDelivery: userRegion.days,
      orderNumber: newOrder.orderNumber,
      deliveryAddress,
      orderDate: formatDate(new Date(Date.now())),
      productsHTML,
      subtotal,
    });

    return res.json({ success: true, message: "Order placed succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const placeOrderOnline = async (req, res) => {
  try {
    const userID = req.userID;
    const { phoneNumber, amount, items, address } = req.body;

    const user = await User.findById(userID);

    if (!user) {
      return res.json({ success: false, message: "Account does not exists!" });
    }

    const order = await Order.create({
      userID,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: true,
    });

    const customerName = `${user.firstName} ${user.lastName}`;
    const external_reference = `SC-${order._id}`;

    await paymentService.initiatePayment({
      order: order._id,
      amount,
      phoneNumber,
      customerName,
      external_reference,
    });

    return res.json({ success: true, message: "Order placed succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userID = req.userID;
    const orders = await Order.find({
      userID,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Getting all the orders data for the admin
// /api/order/admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    return res.json({ success: true, message: "Order deleted succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to update the order status
export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the order in the db and change the status
    await Order.findByIdAndUpdate(id, { status });

    res.json({ success: true, message: "Order status updated succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// A function to return the product revenue
export const getProductsRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Delivered" });

    const revenue = orders.reduce((sum, order) => sum + order.amount, 0);

    return res.json({ success: true, revenue });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
