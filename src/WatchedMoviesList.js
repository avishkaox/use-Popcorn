import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList(props) {
  return (
    <ul className="list">
      {props.watched.map((item, index) => (
        <WatchedMovie
        key={index}
        Poster={item.Poster}
        Title={item.Title}
        imdbRating={item.imdbRating}
        userRating={item.userRating}
        runtime={item.runtime}
        />
      ))}
    </ul>
  );
}
export default WatchedMoviesList;
