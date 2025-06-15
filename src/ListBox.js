import { useState } from "react";
import Movie from "./Movie";

function ListBox(props) {
  const [isOpen1, setIsOpen1] = useState(true);

  
  return (
    <div className="box">
      {!props.isLoading?<>
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 ? <ul className="list list-movies">
          {props.movies.map((item, index) => (
            <Movie
              selectedId={props.selectedId}
              key={index}
              imdbID={item.imdbID}
              Title={item.Title}
              Year={item.Year}
              Poster={item.Poster}
            />
          ))}
        </ul> : ''}</>:<div className="loader"><p>{props.error ? props.error : 'Loading'}</p></div>}
    </div>
  );
}

export default ListBox;
