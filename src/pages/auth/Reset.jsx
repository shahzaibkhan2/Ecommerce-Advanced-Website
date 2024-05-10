import styles from "./auth.module.scss";
import React, { useRef, useState } from "react";
import reset from "../../assets/resetPassword.jpg";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email for reset password !");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={reset} alt="Reset-Password" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <form onSubmit={resetPassword}>
              <h2>Reset Password</h2>
              <input type="text" placeholder="Email" required ref={emailRef} />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Reset Password
              </button>
              <div className={styles.links}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
