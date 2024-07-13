import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="App-header">
        <Link to="/" className="code-title">CODE PLAYGROUND</Link>
      </div>
    </header>
  );
}
