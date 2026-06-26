import { Link } from "react-router";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link> / <Link to="/register">Registrar</Link>
    </div>
  );
};

export default Home;
