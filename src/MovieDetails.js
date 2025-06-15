import StarRating from "./StarRating";

function MovieDetails(props) {
  return (
    <div className="details">
      <img
        style={{ width: "100%" }}
        src={props.Poster}
        alt={`${props.Title} poster`}
      />
      <StarRating maxRating={10} />
      <h3>{props.Title}</h3>
      <div>
        <p>{props.Plot}</p>
        <p>
          <span>🗓</span>
          <span>{props.Year}</span>
        </p>
      </div>
      <button onClick={()=>props.updateWatched()}>I have Watched this</button>
    </div>
  );
}
export default MovieDetails;
