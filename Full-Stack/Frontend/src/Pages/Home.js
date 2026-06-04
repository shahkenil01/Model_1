import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.location.href = "/Website/";
  }, []);

  return <h2>Loading...</h2>;
};

export default Home;