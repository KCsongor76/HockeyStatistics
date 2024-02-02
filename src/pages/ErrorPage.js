import { useNavigate } from "react-router-dom";

/**
 * This component is responsible for rendering the error page
 * on any occuring critical errors.
 * @returns
 */
const ErrorPage = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>Something went wrong!</p>
      <p>To go back to the main page, click on the button below!</p>
      <button style={{ padding: "10px" }} onClick={navigateHandler}>
        GO BACK
      </button>
    </div>
  );
};

export default ErrorPage;
