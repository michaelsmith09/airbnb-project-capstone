import React from "react";
import axios from "axios";
import "./Card.css";
import { useNavigate } from "react-router-dom";
// import lehicabin from "../pictures/lehicabin.webp";

function Card(props) {
  let users_id = sessionStorage.getItem("id");
  const navigate = useNavigate()
  const addFavorites = () => {
    console.log(props)
    let body = { properties_id: props.item.id, users_id };
    axios.post("http://localhost:4000/favorite", body).then((res) => {
      console.log(res.data);
      props.setHeartRefresh(!props.heartRefresh)
    });
  };

  const deleteFavorites = () => {
    let properties_id = props.item.id
    axios.delete(`http://localhost:4000/favorite/${users_id}/${properties_id}`).then((res) => {
      console.log(res.data);
      props.setHeartRefresh(!props.heartRefresh)
    });
  };

  return (
    <section className="card-section">
      <div className="card">
        {users_id == null ? null : (
         props.favorite.some(item => item.properties_id == props.item.id) || props.favpage
          ?
        <div className="heart-position">
        <button className="heart" onClick={deleteFavorites}></button>
        </div>
          :
        <div className="whiteheart-position">
        <button className="whiteheart" onClick={addFavorites}></button>
        </div> )} 

        <img src={props.item.picture} alt="lehicabin" className="picture" />
        <section>
          <h1>
            {props.item.location}
            <br></br>
            {props.item.name}
            <br></br>
            {props.item.bedrooms} Bedrooms<br></br>${props.item.price} per night
          </h1>
        </section>
      </div>
    </section>
  );
}

export default Card;
