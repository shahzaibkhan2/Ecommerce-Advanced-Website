import React from "react";
import styles from "./Loader.module.scss";
import loader from "../../assets/loader1.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loader} alt="Loader" style={{ width: "130px" }} />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
