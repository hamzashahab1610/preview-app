import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Modal from "react-modal";

Modal.setAppElement("body");
ReactDOM.render(<AppRouter />, document.getElementById("root"));
