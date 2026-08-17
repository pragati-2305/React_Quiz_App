import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";

export default function Category(props){
    const store=useSelector((state)=>state);
    const dispatch = useDispatch();
    function categoryHandler(e){
        dispatch(actions.chooseCategory(e.target.classList[0]));
    }
    return (
        <div className={styles.category}>
            <div className={styles.name}>
                <Link 
                to= "/prompt"
                onClick={categoryHandler}
                className={`${props.name} $ {styles.name}`}
                >
                    {props.name}
                </Link> 
            </div>
        </div>
    );
}