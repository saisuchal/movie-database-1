import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import FetchedMoviesList from '../FetchedMoviesList'
import NavBar from '../NavBar'

const PopularMovies = () => (
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
            <h1>Popular</h1>
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

export default withRouter(PopularMovies)
