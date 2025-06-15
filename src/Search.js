function Search(props) {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
export default Search;
