import './index.css'

const FetchedMoviesList = props => {
  const {results, viewMovieDetails} = props
  return (
    <div className="popular-movie-list">
      {results.length === 0 ? (
        <div className="no-results">
          <p>Oops! We could not find any movies.</p>
          <p>Try searching again with a different keyword.</p>
        </div>
      ) : (
        results.map(result => (
          <div
            className="popular-movie-list-item"
            key={result.id}
            id={result.id}
            style={{overflow: 'hidden'}}
          >
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/w300${result.posterPath}`}
              alt={result.originalTitle}
            />
            <div>
              <div>
                <h1>{result.title}</h1>
                <p className="rating-para">
                  Rating: {result.voteAverage.toFixed(1)}/10
                </p>
              </div>
              <button
                className="details-button"
                type="button"
                id={result.id}
                onClick={viewMovieDetails}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default FetchedMoviesList
