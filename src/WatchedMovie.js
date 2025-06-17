function WatchedMovie(props) {
  return (
    <li>
      <img src={props.Poster} alt={`${props.Title} poster`} />
      <h3>{props.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{props.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{props.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{props.runtime} min</span>
        </p>
      </div>
      <button onClick={()=>props.onClick(props.imdbID)} >x</button>
    </li>
  );
}
export default WatchedMovie;
