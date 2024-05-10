import React from "react";
import styles from "./Contact.module.scss";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";

const Contact = () => {
  return (
    <div className={`${styles.contact} container`}>
      <section className={styles.left__part}>
        <div className={styles.header__desc}>
          <h2>Contact Us Now !</h2>
          <p>
            Welcome to [Your Website Name], your ultimate destination for all
            things stylish and convenient! Browse through our curated collection
            of fashion-forward clothing, trendy accessories, and must-have
            gadgets. With a seamless shopping experience and secure
            transactions, we bring the joy of online shopping right to your
            fingertips. Stay ahead of the curve with our latest arrivals and
            exclusive deals. Elevate your shopping experience with us today!
          </p>
        </div>
        <div className={styles.details}>
          <span>
            <FaPhoneVolume className={styles.details__icons} size={30} />
            <p>(+92-303-3330444)</p>
          </span>
          <span>
            <FaLocationDot className={styles.details__icons} size={30} />
            <p>Street No. 4, Gujranwala, Pakistan</p>
          </span>
          <span>
            <FaRegAddressCard className={styles.details__icons} size={30} />
            <p>Street No. 4, Gujranwala, Pakistan</p>
          </span>
        </div>
      </section>
      <section className={styles.right__part}>
        <form className={styles.contact__form}>
          <label>Your Name Here</label>
          <input type="text" placeholder="Enter Name" required />
          <label>Your Email Here</label>
          <input type="email" placeholder="Enter Email" required />
          <label>Write Your Message Here</label>
          <textarea rows="8" placeholder="Your Message"></textarea>
          <button type="submit" className={styles.submit__contact}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
