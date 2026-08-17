import { useEffect, useState } from "react";
import axios from "axios";
import Category from "../components/Category";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Error from "../components/Error";
import Protected from "../components/Protected";

const url = process.env.REACT_APP_URL;

export default function Home() {
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/category`);
        if (response.status === 200) {
          setCategories(response.data.docs);
        }
      } catch (err) {
        setError(err?.code || "Failed to load categories");
      }
    };
    fetchCategories(); 
  }, []);

  async function logoutHandler() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      setError(err?.code || "Logout failed");
    }
  }

  return (
    <Protected>
      <div className={styles.home}>
        {error ? (
          <Error>{error}</Error>
        ) : (
          categories.map((cat) => (
            <Category key={cat.name} name={cat.name} />
          ))
        )}
      </div>
      <button className={styles.btn} onClick={logoutHandler}>
        Logout
      </button>
    </Protected>
  );
}
