import React from "react";
import styles from "./Admin.module.scss";
import { useRef, useState } from "react";
import admin from "../../assets/pro6.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Admin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        toast.success("Logged in Successfully !");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Logged in successfully !");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <section className={`container ${styles.admin}`}>
        <div className={styles.img}>
          <img src={admin} alt="Login" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <form onSubmit={loginUser}>
              <h2>Admin</h2>
              <input type="text" placeholder="Email" required ref={emailRef} />
              <input
                type="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>Or</p>
            </form>
            <button
              onClick={signInWithGoogle}
              className="--btn --btn-danger --btn-block --yellowGreenBtn"
            >
              <IoLogoGoogle size={20} /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account ?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Admin;
