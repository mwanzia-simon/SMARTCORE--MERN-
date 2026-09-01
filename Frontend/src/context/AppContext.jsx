import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // States to check if the paswords meet the requirements
  const [isRegisterPassValid, setIsRegisterPassValid] = useState(false);
  const [isNewPassValid, setIsNewPassValid] = useState(false);
  const [isResetPassValid, setIsResetPassValid] = useState(false);

  const isReactivateAccountPath =
    useLocation().pathname.includes("reactivate-account");

  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY;

  const fetchAdmin = async () => {
    try {
      const { data } = await api.get("/api/admin/isAuth");

      if (data.success) {
        setIsAdmin(true);
        setAdmin(data.data);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);

      toast.error(error.message);
    }
  };

  // Fucntion to merge cart items
  const mergeCartItems = async (localCartItems) => {
    try {
      const { data } = await api.post("/api/cart/merge-cart", {
        cartItems: localCartItems,
      });

      data.success && localStorage.removeItem("cartItems");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserData = async () => {
    const localCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "{}",
    );
    if (localCartItems) {
      await mergeCartItems(localCartItems);
    }
    try {
      const { data } = await api.get("/api/user/data");

      if (data.success) {
        setUser(data.user);

        setCartItems(data.user.cartItems);
        if (data.user.isDeleted && !isReactivateAccountPath) {
          navigate("/account-deleted");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/product/list");
      setIsProductsLoading(true);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    fetchAdmin();
    fetchProducts();
  }, []);

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
      toast.success("Added to cart!");
    }

    setCartItems(cartData);
  };

  // Function to remove or decrease quatity of items in cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    // Checking if the item exists in the cart
    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      // If we have decrease to zero remove it from the cart
      if (cartData[itemId] == 0) {
        delete cartData[itemId];
        toast.success("Item removed from cart!");
      }
    }

    setCartItems(cartData);
  };

  // function to count all the cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Function to calculate the total of cart items
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    setTotalCost(parseFloat(totalAmount.toFixed(2)) + deliveryFee);
    return parseFloat(totalAmount.toFixed(2));
  };

  // Function to update the quatity of a cart items
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Item updated succesifully!");
  };

  // When the cartItems change we update in the db
  useEffect(() => {
    const updateCartItems = async () => {
      try {
        const { data } = await api.post("/api/cart/update", { cartItems });
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCartItems();
    } else {
      // Save the cart items to the localstorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Here is a fucntion to log out
  const logout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);

    try {
      const { data } = await api.post("/api/auth/logout");

      if (data.success) {
        // toast.success(data.message);
        setUser(null);
        setCartItems({});
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  // value object
  const value = {
    api,
    user,
    admin,
    logout,
    setUser,
    isAdmin,
    products,
    navigate,
    currency,
    setAdmin,
    cartItems,
    addToCart,
    totalCost,
    setIsAdmin,
    deliveryFee,
    getUserData,
    searchQuery,
    setTotalCost,
    getCartCount,
    setCartItems,
    fetchProducts,
    getCartAmount,
    setSearchQuery,
    setDeliveryFee,
    updateCartItem,
    removeFromCart,
    isNewPassValid,
    selectedAddress,
    isResetPassValid,
    showMpesaPayment,
    isProductsLoading,
    setIsNewPassValid,
    setSelectedAddress,
    setShowMpesaPayment,
    setIsResetPassValid,
    isRegisterPassValid,
    setIsRegisterPassValid,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
