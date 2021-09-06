import { Link, useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const { score } = location.state;
  let message = "";

  if (score < 5) {
    message = "Better luck next time. 😔";
  } else if (score >= 5 && score < 10) {
    message = "Good job! You did well! 👏";
  } else if (score === 10) {
    message = "Hooray, you nailed it! 🥳 🎉";
  }

  return (
    <div className="content-wrapper">
      <div className="label-question-no">Result</div>
      <div className="score-container">
        <p>You scored </p>
        <p>{score} / 10</p>
        <p>{message}</p>
      </div>
      <div className="btn-group-container">
        <Link className="btn btn-shadow" to="/">
          Back to 🏠
        </Link>
        <Link className="btn btn-shadow" to="/game">
          Play again
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
