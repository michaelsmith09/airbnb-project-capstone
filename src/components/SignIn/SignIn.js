import { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
    if (register) {
      axios
        .post("http://localhost:4000/signin", body)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("id", res.data.id);
          navigate('/');
        })
        .catch((err) => {
          alert(err);
          console.error(err);
        });
      } else {
        axios
          .post("http://localhost:4000/register", body)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            if (err.response.data) {
              alert(err.response.data);
            }
            console.error(err);
          });
      }
      console.log("submitHandler called");
    };

  return (
    <div>
      <Navbar />
      <main className="signin">
        <h1>Welcome!</h1>
        <form className="form auth-form" onSubmit={submitHandler}>
          <input
            className="form-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form-btn">{register ? "Login" : "Sign Up"}</button>
        </form>
        <button className="form-btn" onClick={() => setRegister(!register)}>
          Need to {register ? "Sign Up" : "Login"}?
        </button>
      </main>
    </div>
  );
};

export default SignIn;
