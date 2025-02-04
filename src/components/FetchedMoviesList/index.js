import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import Pagination from '../Pagination'
import './index.css'

const FetchedMoviesList = props => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {isFetchSuccess} = value
      const {results, viewMovieDetails} = props
      const viewDetails = event => {
        const {id} = event.target
        viewMovieDetails(id)
      }
      return (
        <div className="movies-list">
          <Pagination />
          {isFetchSuccess && (
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
                      onClick={viewDetails}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default FetchedMoviesList
