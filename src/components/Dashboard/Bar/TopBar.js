import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <div className="d-flex container top-bar">
      <h1>Store</h1>
      <Link className="register-nav" to="/">
        Go to web site
      </Link>
    </div>
  );
}
 