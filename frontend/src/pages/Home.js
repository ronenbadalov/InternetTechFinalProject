import React, { useEffect, useState } from "react";
import Legend from "../components/Legend/Legend";
import Loader from "../components/Loader/Loader";
import Map from "../components/UI/Map";

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await wait(3000);
      setIsLoading(false);
      // console.log("done");
    })();
  }, []);
  return (
    <div className="home">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <Legend /> <Map />
        </>
      )}
    </div>
  );
};

export default Home;
