
function MovieDetails(props) {
  return (
    <div className="details">
      <img
        style={{ width: "100%" }}
        src={props.Poster}
        alt={`${props.Title} poster`}
      />
      {props.element}
      <h3>{props.Title}</h3>
      <div>
        <p>{props.Plot}</p>
        <p>
          <span>🗓</span>
          <span>{props.Year}</span>
        </p>
      </div>
      <button onClick={()=>props.updateWatched()}>Add to list</button>
    </div>
  );
}
export default MovieDetails;
