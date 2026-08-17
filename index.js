import {configureStore, createSlice} from "@reduxjs/toolkit"; 

const initialState = {
  name: "",
  quiz: [],
  token: null,
  hasBegun: false,
  category: null,
  answered: {}
};

function doesExistsInLS(prop) {
  return localStorage.hasOwnProperty(prop);
}

function setItemInReduxFromLS(prop) {
  let value=localStorage.getItem(prop);
  if (["answered","quiz"].includes(prop)) value= JSON.parse(localStorage.getItem(prop));
  initialState[prop] = value;
}

const arr = ["name", "hasBegun", "category", "answered", "quiz", "token"];

arr.forEach((prop) => {
  if (doesExistsInLS(prop)) {
    setItemInReduxFromLS(prop);
  }else{
    localStorage.setItem(prop, JSON.stringify(initialState[prop]));
  }
});


const slice=createSlice({
    name: "State",
    initialState,
    reducers:{
        chooseCategory(prevstate,action){
            const category=action.payload;
            prevstate.category= category;
            localStorage.setItem("category", category);
        },
        setUserName(prevstate,action){
            const name=action.payload;
            prevstate.name=name;
            localStorage.setItem("name", name);
        },
        setQuiz(prevstate,action){
            const quiz=action.payload;
            prevstate.quiz=action.payload;
            prevstate.hasBegun=true;
            localStorage.setItem("hasBegun", true);
            localStorage.setItem("quiz", JSON.stringify(quiz));
        },
        setAnswer(prevstate,action){
            const { q,a } = action.payload;
            prevstate.answered[q]=a;
            const updated = { ...prevstate.answered };
            updated[q] = a;
            localStorage.setItem("answered", JSON.stringify(updated));
        },
        setToken(prevstate,action){
            const token=action.payload;
            prevstate.token=token;
            localStorage.setItem("token", token);
        },
        endSession(prevstate,action){
            const token =localStorage.getItem("token");
            prevstate={token};
            localStorage.clear();
            localStorage.setItem("token", token);
        },
    },
});

export const actions=slice.actions;
export default configureStore({reducer: slice.reducer});