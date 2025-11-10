import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-gradient-to-b from-black to-gray-900 w-[5%] hover:w-[16%] h-[100vh] fixed transition-all duration-300 ease-in-out`}
      id="navigation-container"
    >
      <div className="flex flex-col space-y-6 mt-8">
        <Link
          to="/"
          className="flex items-center py-3 px-2 rounded-lg transition-all transform hover:translate-x-1 hover:bg-gray-800"
          onClick={() => setDropdownOpen(false)}
        >
          <AiOutlineHome className="min-w-[26px]" size={26} />
          <span className="hidden nav-item-name ml-4 font-medium">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center py-3 px-2 rounded-lg transition-all transform hover:translate-x-1 hover:bg-gray-800"
          onClick={() => setDropdownOpen(false)}
        >
          <AiOutlineShopping className="min-w-[26px]" size={26} />
          <span className="hidden nav-item-name ml-4 font-medium">SHOP</span>
        </Link>

        <Link 
          to="/cart" 
          className="flex items-center py-3 px-2 rounded-lg transition-all transform hover:translate-x-1 hover:bg-gray-800 relative" 
          onClick={() => setDropdownOpen(false)}
        >
          <div className="relative min-w-[26px]">
            <AiOutlineShoppingCart size={26} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs text-white bg-pink-500 rounded-full font-bold">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </div>
          <span className="hidden nav-item-name ml-4 font-medium">CART</span>
        </Link>

        <Link 
          to="/favorite" 
          className="flex items-center py-3 px-2 rounded-lg transition-all transform hover:translate-x-1 hover:bg-gray-800 relative" 
          onClick={() => setDropdownOpen(false)}
        >
          <div className="relative min-w-[26px]">
            <FaHeart size={22} />
            <FavoritesCount />
          </div>
          <span className="hidden nav-item-name ml-4 font-medium">FAVORITES</span>
        </Link>
      </div>

      <div className="relative mb-4">
        <button
          onClick={toggleDropdown}
          className="flex items-center w-full py-3 px-2 rounded-lg hover:bg-gray-800 focus:outline-none transition-all"
        >
          {userInfo ? (
            <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center min-w-[26px]">
                <span className="text-white font-bold text-sm">
                  {userInfo.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden nav-item-name ml-4 font-medium truncate">
                {userInfo.username}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`hidden nav-item-name h-4 w-4 ml-auto transition-transform ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          ) : null}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute left-full ml-2 bottom-0 min-w-[200px] space-y-1 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700 overflow-hidden p-2`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📊 Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📦 Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    🏷️ Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    🛍️ Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    👥 Users
                  </Link>
                </li>
                <li className="border-t border-gray-700 my-2"></li>
              </>
            )}

            <li>
              <Link 
                to="/profile" 
                className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                👤 Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 rounded-md transition-colors text-red-400"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        )}
        
        {!userInfo && (
          <div className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="flex items-center py-3 px-2 rounded-lg transition-all transform hover:translate-x-1 hover:bg-gray-800"
            >
              <AiOutlineLogin className="min-w-[26px]" size={26} />
              <span className="hidden nav-item-name ml-4 font-medium">LOGIN</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center py-3 px-2 rounded-lg transition-all transform hover:translate-x-1 hover:bg-gray-800"
            >
              <AiOutlineUserAdd className="min-w-[26px]" size={26} />
              <span className="hidden nav-item-name ml-4 font-medium">REGISTER</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
