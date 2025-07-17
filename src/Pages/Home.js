import Header from "../components/website/Header";

export default function Home() {
  return (
    <div className="container">
      <Header style={{ width: "100%" }} />
      <h1>Welcome to the Store</h1>
      <p>This is the home page of the store application.</p>
      <p>Here you can find various products and services.</p>
    </div>
  );
}