import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {

  const cookie = new Cookies();
  const token = cookie.get("authData?.token")

async function handleLogOut(){
 await axios.post(`http://127.0.0.1:8000/api/logout`,null,{headers:{
    Authorization: "Bearer " + token,
  }})
  cookie.remove("authData")
  
}

  return (
    <div className="container" 
    style={{
      boxShadow: "1px 1px 10px 1px #cbc9cb", 
      paddingBottom: "15px",
      paddingTop: "5px",}}>
      <nav className="d-flex" style={{width: "100%", }}>
        <div  
        style={{ 
          marginTop: "10px", 
          display: "flex", 
          gap: "20px", 
          paddingLeft: "30px",}}>
        <Link  className="register-nav" to="/">
            Home
        </Link>
        <Link className="register-nav" to="/dashboard">
            Dashboard
        </Link>
        </div>
        {!token ? (
          <div 
          style={{ 
            marginTop: "10px", 
            display: "flex", 
            gap: "20px",
            paddingRight: "30px",}}>
            <Link className="register-nav" to="/signup">
              Register
            </Link>
            <Link className="register-nav" to="/login">
            Login
        </Link>
        </div>) : (
          <div className="register-nav" 
          style={{ marginTop: "10px", marginRight: "30px" }}
          onClick={handleLogOut}>Log out</div>
 )}
      </nav>
    </div>
  );
}