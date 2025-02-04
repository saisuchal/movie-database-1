import {withRouter} from 'react-router-dom'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import FetchedMoviesList from '../FetchedMoviesList'

const PopularMovies = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, viewMovieDetails} = value
      const {results} = formattedData
      return (
        <div className="flex-column">
          <div className="heading-div">
            <h1 className="page-heading">Popular</h1>
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
