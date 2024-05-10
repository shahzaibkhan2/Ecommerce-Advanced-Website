import styles from "./auth.module.scss";
import React, { useRef, useState } from "react";
import register from "../../assets/register.jpg";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if (password !== confirmPass) {
      toast.error("Sorry ! Your password does not match.");
    }
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        navigate("/login");
        toast.success("Congratulations ! Registeration Successful.");
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
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <form onSubmit={registerUser}>
              <h2>Register</h2>
              <input type="text" placeholder="Email" required ref={emailRef} />
              <input
                type="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                ref={confirmPassRef}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account ?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={register} alt="Register" width={400} />
        </div>
      </section>
    </>
  );
};

export default Register;
