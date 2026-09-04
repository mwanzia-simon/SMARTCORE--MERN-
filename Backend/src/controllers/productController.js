import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    console.log(productData);

    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "smartcore/products",
        });
        return result.secure_url;
      }),
    );

    await Product.create({ ...productData, image: imagesUrl });
    return res.json({ success: true, message: "Product added succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to return the list of products from the db
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to get single product data
export const productById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id);

    res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to toggle the inStock status property of an item
export const changeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock updated succesifully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Fucntion to delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: "Product deleted succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
