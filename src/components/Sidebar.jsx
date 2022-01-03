import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import logo from "../assets/logo.png";
import { GoogleLogout } from "react-google-login";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210  hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <>
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <div
                className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-full shadow-lg mx-3 cursor-pointer group"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none"
                >
                  <AiOutlineLogout
                    className="text-red-500 group-hover:text-red-800"
                    fontSize={21}
                  />
                </button>
                <p className="text-red-500 group-hover:text-red-800">LogOut</p>
              </div>
            )}
            onLogoutSuccess={logout}
            cookiePolicy="single_host_origin"
          />
          {/* <img
            src={user.image}
            className="w-10 h-10 rounded-full "
            alt="user-profile"
          />
          <p>{user.userName}</p> */}
        </>
      )}
    </div>
  );
};

export default Sidebar;
