import Header from "../../components/website/Header";
import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../Context/Usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nav = useNavigate();
  const usernow = useContext(User);
  console.log(usernow);

  const cookie = new Cookies();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    if (name === "" || password.length < 8 || PasswordR !== password) {
    }

    try {
      if (true) {
        let res = await axios.post("http://127.0.0.1:8000/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: PasswordR,
        });

        const token = res.data.data.token;
        const userDetails = res.data.data.user;

        cookie.set("authData", {
          token: token,
          userDetails: userDetails,
        });

        cookie.set("Bearer", token);
        usernow.setAuth({ token, userDetails });
        nav("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div
      className="register"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        flexDirection: "column",
      }}>
      <Header />
      <form onSubmit={submit} style={{}}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name === "" && accept && <p className="error">Name is required.</p>}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError === 422 && accept && (
          <p className="error">Email is already been taken.</p>
        )}
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password.length < 8 && accept && (
          <p className="error">Password must be at least 8 characters long.</p>
        )}
        <label htmlFor="confirm-password">Repeat Password:</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm Password..."
          value={PasswordR}
          onChange={(e) => setPasswordR(e.target.value)}
        />
        {PasswordR !== password && accept && (
          <p className="error">Passwords does not match.</p>
        )}
        <div style={{ textAlign: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
