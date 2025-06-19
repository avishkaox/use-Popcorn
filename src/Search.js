import { useEffect, useRef } from "react";

function Search(props) {
  const inputEl = useRef(null);

  useEffect(function () {
    function callback(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
}
export default Search;
