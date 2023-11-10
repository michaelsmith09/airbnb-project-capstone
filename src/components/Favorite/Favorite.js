import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./Favorite.css";
import Navbar from "../Navbar/Navbar";
// import { useNavigate } from "react-router-dom";

const Favorite = () => {
  let users_id = sessionStorage.getItem("id");
  let username = sessionStorage.getItem("username");
  const [favorite, setFavorite] = useState([]);
  const [heartRefresh, setHeartRefresh] = useState(true);

  useEffect(() => {
    console.log(users_id)
      axios.get(`http://localhost:4000/favorite/${users_id}`).then((res) => {
        console.log(res.data);
        setFavorite(res.data);
      }) .catch((err) => {
        console.log(err)
      })
    }, [heartRefresh]);


  return (
    <div>
      <Navbar />
      <div>
        <h1>{`${username}'s favorites`}</h1>
        <div className="swift-favorite">
          {favorite.length == 0 ? (
            <p>loading</p>
          ) : (
            <>
              {favorite.map((item, index) => {
                return <Card item={item} key={index} favorite={favorite} favpage={true} setHeartRefresh={setHeartRefresh} heartRefresh={heartRefresh}/>;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
