import { MenuIcon, Search, ShoppingCart, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [logoutLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    logout,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);


  return (
    <nav className="flex flex-wrap items-center justify-between gap-y-2 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-main relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <h1 className="text-xl font-bold text-primary">
          🧑‍💻 Smart
          <span className="text-accent">Core</span>
        </h1>
      </NavLink>


      {/* Desktop Menu */}
      <div className="hidden sm:flex flex-wrap xl:flex-nowrap items-center gap-3 md:gap-4 xl:gap-8 max-w-full text-primary">
        {/* Links */}
        <NavLink to="/" className="hover:text-accent-hover">
          Home
        </NavLink>
        <NavLink to="/products" className="hover:text-accent-hover">
          All Product
        </NavLink>
        <NavLink to="/contact" className="hover:text-accent-hover">
          Contact
        </NavLink>
        {/* Search bar */}
        <div className="hidden lg:flex flex-1 items-center text-sm gap-2 border border-border-color px-3 rounded-full min-w-[180px] max-w-[300px]">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-text-muted text-primary"
            type="text"
            placeholder="Search products"
          />
          <Search className="w-4 h-4" />
        </div>


        {/* Cart icon */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <ShoppingCart className="w-6 opacity-80 text-primary" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-accent w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>


        {/* User icon */}
        {!user ? (
          <button
            onClick={() => {
              navigate("/login")
            }}
            className="cursor-pointer text-sm md:text-base px-5 md:px-8 py-1.5 md:py-2 lg:px-7 lg:py-2 bg-accent hover:bg-accent-hover transition text-primary rounded-lg"
          >
            Login
          </button>
        ) : (
          <div className="flex-1 h-10">
            <div className="flex flex-col w-32 text-sm  absolute right-10 top-auto">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className=" w-10 h-10  flex items-center justify-center bg-card rounded-full border border-border-color"
              >
                <User className="w-14" />
              </button>

              <ul
                className={`overflow-hidden right-0 ${showMenu ? "block" : "hidden"} w-40 bg-card border border-border-color rounded shadow-md mt-2 py-1 z-20`}
              >
                <li
                  onClick={() => {
                    navigate("/profile");
                    setShowMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-accent-hover cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={() => {
                    navigate("/my-orders");
                    setShowMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-accent-hover cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-red-500/10 text-red-500 cursor-pointer"
                >
                  {logoutLoading ? "Logging out..." : "Logout"}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Cart icon to be displayed in the mobile view */}
      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <ShoppingCart className="w-6 opacity-80 text-primary" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-accent w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {open ? (
            <X className="text-primary" />
          ) : (
            <MenuIcon className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-main shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-10 text-primary border-b border-border-color animate-in slide-in-from-top duration-300`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          {user && (
            <NavLink to="/profile" onClick={() => setOpen(false)}>
              My Profile
            </NavLink>
          )}
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/login")
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-accent hover:bg-accent-hover transition text-white rounded-lg text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              disabled={logoutLoading}
              className={`cursor-pointer px-6 py-2 mt-2 bg-red-600 hover:bg-red-500 transition text-primary rounded text-sm ${
                logoutLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
