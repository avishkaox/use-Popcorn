import { useState } from "react";
import Movie from "./Movie";

function ListBox(props) {
  const [isOpen1, setIsOpen1] = useState(true);

  
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          {props.movies.map((item, index) => (
            <Movie
              key={index}
              imdbID={item.imdbID}
              Title={item.Title}
              Year={item.Year}
              Poster={item.Poster}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListBox;
