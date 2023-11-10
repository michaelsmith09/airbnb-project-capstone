import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../Card/Card";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

function Home() {
  let users_id = sessionStorage.getItem("id");
  const [properties, setProperties] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [heartRefresh, setHeartRefresh] = useState(true);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/allProperties")
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
        if (users_id !== null) {
          axios
            .get(`http://localhost:4000/favorite/${users_id}`)
            .then((res) => {
              console.log(res.data);
              setFavorite(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [heartRefresh]);

  return (
    <div>
      <Navbar />
      <div className="swift">
        {properties.length == 0 ? (
          <p>loading</p>
        ) : (
          properties.map((item, index) => {
            return <Card item={item} key={index} favorite={favorite} favpage={false} heartRefresh={heartRefresh} setHeartRefresh={setHeartRefresh} />;
          })
        )}
      </div>
    </div>
  );
}

export default Home;
