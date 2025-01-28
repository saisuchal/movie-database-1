import Loader from 'react-loader-spinner'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import NavBar from '../NavBar'
import FetchedMoviesList from '../FetchedMoviesList'

const UpcomingMovies = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, isLoading, viewMovieDetails} = value
      const {results} = formattedData
      return isLoading ? (
        <div className="loader-div">
          <Loader height="80" width="80" color="#4fa94d" type="ThreeDots" />
        </div>
      ) : (
        <div className="flex-column">
          <div className="heading">
            <h1>Upcoming</h1>
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

export default UpcomingMovies
