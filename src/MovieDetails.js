function MovieDetails(props) {
  return (
    <div className="details">
      <img style={{width:'100%'}} src={props.Poster} alt={`${props.Title} poster`} />
      <h3>{props.Title}</h3>
      <div>
        <p>{props.Plot}</p>
        <p>
          <span>🗓</span>
          <span>{props.Year}</span>
        </p>
      </div>
    </div>
  );
}
export default MovieDetails;
