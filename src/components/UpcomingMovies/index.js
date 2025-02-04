import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import FetchedMoviesList from '../FetchedMoviesList'

const UpcomingMovies = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, viewMovieDetails} = value
      const {results} = formattedData
      return (
        <div className="flex-column">
          <div className="heading-div">
            <h1 className="page-heading">Upcoming</h1>
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
