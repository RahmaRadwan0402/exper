import Header from "../../components/website/Header";
import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../Context/Usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const cookie = new Cookies();

  const nav = useNavigate();
  const usernow = useContext(User);

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    if (password.length < 8) {
    }

    try {
      if (true) {
        let res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        });
        const token = res.data.data.token;
        const userDetails = res.data.data.user;

        cookie.set("authData", {
          token: token,
          userDetails: userDetails,
        });
        usernow.setAuth({ token, userDetails });
        nav("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
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
        <div style={{ textAlign: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
