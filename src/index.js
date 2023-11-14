import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
// import "./index.css";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Test />
    {/* <App /> */}
    <StarRating maxRating={10} />
    <StarRating size={30} color="red" />
  </React.StrictMode>
);

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <>
      <StarRating
        color="blue"
        size={40}
        maxRating={10}
        onSet={setMovieRating}
      />
      <h1>The movie is rated {movieRating}</h1>
    </>
  );
}
