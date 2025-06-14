function Movie(props) {
  return (
    <li key={props.imdbID}>
      <img src={props.Poster} alt={`${props.Title} poster`} />
      <h3>{props.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{props.Year}</span>
        </p>
      </div>
    </li>
  );
}
export default Movie
