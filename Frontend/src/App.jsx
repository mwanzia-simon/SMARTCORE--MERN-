import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ProductCategory from "./pages/ProductCategory";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import { useAppContext } from "./context/AppContext";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import Orders from "./pages/admin/Orders";
import ResetPassword from "./pages/ResetPassword";
import MpesaPayment from "./components/MpesaPayment";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import FAQ from "./pages/FAQ";
import ReactivateAccount from "./pages/ReactivateAccount";
import VerifyAccount from "./pages/VerifyAccount";
import AccountDeleted from "./pages/AccountDeleted";
import LoginPage from "./pages/LoginPage";
import Customers from "./pages/admin/Customers";
import Settings from "./pages/admin/Settings";
import Dashboard from "./pages/admin/Dashboard";
import CustomerDetails from "./pages/admin/CustomerDetails";

const App = () => {
  const { admin, showMpesaPayment, selectedAddress } = useAppContext();
  const isAdminPath = useLocation().pathname.includes("admin");
  const isResetPasswordPath = useLocation().pathname.includes("reset-password");
  const isReactivateAccountPath =
    useLocation().pathname.includes("reactivate-account");
  const isVerifyAccountPath = useLocation().pathname.includes("verify-account");
  const isAccountDeletedPath =
    useLocation().pathname.includes("account-deleted");
  const isLoginPath = useLocation().pathname.includes("login");
  return (
    <div className="bg-main min-h-screen">
      <ToastContainer />
      <ScrollToTop />
      {!isAdminPath &&
        !isReactivateAccountPath &&
        !isVerifyAccountPath &&
        !isResetPasswordPath &&
        !isAccountDeletedPath &&
        !isLoginPath && <Navbar />}

      {showMpesaPayment && <MpesaPayment address={selectedAddress} />}
      <div
        className={`${isAdminPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reactivate-account/:token"
            element={<ReactivateAccount />}
          />
          <Route path="/account-deleted" element={<AccountDeleted />} />
          <Route path="/verify-account/:token" element={<VerifyAccount />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={admin ? <AdminLayout /> : <Navigate to="/admin-login" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customer-details/:id" element={<CustomerDetails />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isAdminPath &&
        !isReactivateAccountPath &&
        !isVerifyAccountPath &&
        !isResetPasswordPath &&
        !isAccountDeletedPath &&
        !isLoginPath && <Footer />}
    </div>
  );
};

export default App;
