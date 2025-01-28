import MovieDatabaseContext from '../../context/MovieDatabaseContext'

const FetchedMoviesList = props => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {isLoading} = value
      const {results, viewMovieDetails} = props
      const viewDetails = event => {
        const {id} = event.target
        viewMovieDetails(id)
      }
      return (
        isLoading === false && (
          <div className="popular-movie-list">
            {results.map(result => (
              <div
                className="popular-movie-list-item"
                key={result.id}
                id={result.id}
                style={{overflow: 'hidden'}}
              >
                <img
                  className="poster-image"
                  src={`https://image.tmdb.org/t/p/original/${result.posterPath}`}
                  alt={result.originalTitle}
                />
                <div>
                  <div>
                    <h1 style={{fontSize: '14px'}}>{result.title}</h1>
                    <p>Rating: {result.voteAverage.toFixed(1)}</p>
                  </div>
                  <button
                    className="details-button"
                    type="button"
                    id={result.id}
                    onClick={viewDetails}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default FetchedMoviesList
