import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import FetchedMoviesList from '../FetchedMoviesList'

const SearchMovies = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, search, viewMovieDetails, isFetchSuccess} = value
      if (isFetchSuccess) {
        const {totalResults} = formattedData
        if (totalResults === 0) {
          return (
            <div className="no-results">
              <p>Search Results could not be found.</p>
              <p>Try searching again with a different keyword.</p>
            </div>
          )
        }
      }
      return (
        <div className="flex-column">
          <div className="heading-div">
            <h1 className="page-heading">
              Search Results For: &quot;{search}&quot;
            </h1>
          </div>
          <FetchedMoviesList
            results={formattedData.results}
            viewMovieDetails={viewMovieDetails}
          />
        </div>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default SearchMovies
