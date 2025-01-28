import Loader from 'react-loader-spinner'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import NavBar from '../NavBar'
import FetchedMoviesList from '../FetchedMoviesList'

const SearchMovies = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, isLoading, search, viewMovieDetails} = value
      const {results} = formattedData
      return isLoading ? (
        <div className="loader-div">
          <Loader height="80" width="80" color="#4fa94d" type="ThreeDots" />
        </div>
      ) : (
        <div className="flex-column">
          <div className="heading">
            <h1>Search Results For: &quot;{search}&quot;</h1>
          </div>
          <FetchedMoviesList
            results={results}
            viewMovieDetails={viewMovieDetails}
          />
        </div>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default SearchMovies
