import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { RiMenu5Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  removeActiveUser,
  setActiveUser,
} from "../../reduxToolkit/slices/authSlice";
import ShowLogin, { ShowLogout } from "../hiddenLinks/HiddenLink";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        My.<span>Shop</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaCartPlus size={20} />
      <p>0</p>
    </Link>
  </span>
);

const ActiveNav = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          // const user1 = user.email.slice(0, -10);
          const user1 = user.email.substring(0, user.email.indexOf("@"));
          const userName1 = user1.charAt(0).toUpperCase() + user1.slice(1);
          setUserName(userName1);
        } else {
          setUserName(user.displayName);
        }
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          })
        );
      } else {
        dispatch(removeActiveUser());
        setUserName("");
      }
    });
  }, [dispatch, userName]);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  const hideMenu = () => {
    setMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        toast.success("Logged out successfully !");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <header>
        <div className={styles.header}>
          {logo}
          <nav
            className={menu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}
          >
            <div
              onClick={hideMenu}
              className={
                menu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <IoMdClose size={22} onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={ActiveNav}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className={ActiveNav}>
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={ActiveNav}>
                  Contact
                </NavLink>
              </li>
            </ul>
            <div onClick={hideMenu} className={styles["header-right"]}>
              <span className={styles.links}>
                <ShowLogout>
                  <NavLink to="/login" className={ActiveNav}>
                    Login
                  </NavLink>
                </ShowLogout>
                <ShowLogin>
                  <NavLink to="#" className={ActiveNav}>
                    <FaUser size={12} /> Hi {userName}
                  </NavLink>
                  <NavLink to="/order-record" className={ActiveNav}>
                    My Orders
                  </NavLink>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowLogin>
              </span>
              {cart}
            </div>
          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <RiMenu5Fill size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
