import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'

const MovieDetails = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, isLoading} = value
      if (isLoading === false) {
        const {movie, castAndCrew} = formattedData
        const {cast} = castAndCrew
        return (
          <>
            <div className="movie-details-section">
              <img
                className="poster-image"
                style={{
                  marginRight: '5vw',
                  minWidth: '15vw',
                  minHeight: '20vw',
                }}
                src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
                alt={movie.title}
              />
              <div>
                <h1>{movie.title}</h1>
                <p>{movie.voteAverage.toFixed(1)}/10</p>
                <p>
                  {movie.runtime}min {movie.releaseDate}
                </p>
                <p>{movie.genres}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
            <div className="cast-details-section">
              <h3>Cast</h3>
              <ul className="cast-list">
                {cast.map(member => (
                  <li key={member.id} style={{margin: '1vw'}}>
                    <img
                      className="poster-image"
                      src={`https://image.tmdb.org/t/p/original/${member.profilePath}`}
                      alt={member.name}
                    />
                    <div style={{overflow: 'auto'}}>
                      <p style={{fontWeight: 'bold'}}>{member.name}</p>
                      <p style={{color: 'grey'}}>as {member.character}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
      }
      return (
        <div className="loader-div">
          <Loader height="80" width="80" color="#4fa94d" type="ThreeDots" />
        </div>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default withRouter(MovieDetails)
