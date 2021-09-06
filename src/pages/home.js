import { Link } from "react-router-dom";
import HelloImage from "../assets/siora-photography-hello.jpg";

const Home = () => {
  return (
    <div className="content-wrapper">
      <h1>Guess the Lang</h1>
      <p>A Hello Word game. 👋 🌏</p>
      <p>Guess "Hello World" in different languages.</p>
      <img src={HelloImage} alt="hello" width="500" />
      <div className="btn-group-container">
        <Link className="btn btn-primary" to="/game">
          Start
        </Link>
      </div>
    </div>
  );
};

export default Home;
