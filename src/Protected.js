import { useSelector } from "react-redux";
import Auth from "../pages/Auth";

export default function Protected(props) {
  const state = useSelector((state) => state);
  const token = state.token;
  const isAuthenticated = token !== null && token !== undefined;

  return (
    <>
      {isAuthenticated ? props.children : <Auth />}
    </>
  );
}
