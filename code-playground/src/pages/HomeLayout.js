import { Outlet ,Navigate, useNavigate} from "react-router-dom";
import Header from "../components/header/Header";

export default function HomeLayout() {

  return (
    <>
      <Header />
      <div className="container">
        <div >{<Outlet />}</div>
      </div>
    </>
  );
}
