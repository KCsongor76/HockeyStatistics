Modal.setAppElement("#root"); // Required for accessibility
const PlayerModal = ({
  isOpen,
  onRequestClose,
  homeTeam, 
  awayTeam,
  homeColors,
  awayColors,
  onIconClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <h2>Which player?</h2>
    </Modal>
  );
};

export default PlayerModal;
