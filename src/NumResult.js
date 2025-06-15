function NumResult(props) {
  return (
    <p className="num-results">
      Found <strong>{props.movies.length ?? 0}</strong>{" "}
      results
    </p>
  );
}
export default NumResult;
