import Modal from "react-modal";

const SameTeamModal = ({isOpen, onRequestClose}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Same teams"
    >
      <p>You can't choose the same team against each other!</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SameTeamModal;
