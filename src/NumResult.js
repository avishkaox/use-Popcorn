function NumResult(props){
    return(
         <p className="num-results">
        Found <strong>{props.movies.length}</strong> results
      </p>
    )
}
export default NumResult