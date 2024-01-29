import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

const DynamicInformativeModal = ({ isOpen, onRequestClose, iconData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {iconData && (
        <>
          <h2>Game Event Data</h2>
          <div>
            <p>{iconData.type}</p>
            <p>{iconData.player}</p>
          </div>
        </>
      )}
      {!iconData && (
        <>
          <p>You can't choose the same team against each other!</p>
          <button onClick={onRequestClose}>Close</button>
        </>
      )}
    </Modal>
  );
};

export default DynamicInformativeModal;
