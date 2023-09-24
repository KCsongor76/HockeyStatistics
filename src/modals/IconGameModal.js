import React, { useState } from "react";
import Modal from "react-modal";

import classes from "./IconModal.module.css";
import Icon from "../components/Icon";

Modal.setAppElement("#root"); // Required for accessibility

const IconGameModal = ({ isOpen, onRequestClose, iconData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <h2>Game Event Data</h2>
      <div>
        <p>{iconData.type}</p>
        <p>{iconData.player}</p>
      </div>
    </Modal>
  );
};

export default IconGameModal;
