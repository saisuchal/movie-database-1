import {withRouter} from 'react-router-dom'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'

const MovieDetails = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {formattedData, isFetchSuccess} = value
      const {movie, castAndCrew} = formattedData
      return (
        isFetchSuccess && (
          <div className="all-details">
            <div className="movie-details-section">
              <img
                className="details-poster-image"
                src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
                alt={movie.title}
              />
              <div className="movie-info-div">
                <div className="movie-info">
                  <h1 className="movie-info-head">{movie.title}</h1>
                  <p className="movie-info-para">
                    {movie.runtime}min {movie.releaseDate}
                  </p>
                  <p className="movie-info-para">{movie.genres}</p>
                  <h4>Overview</h4>
                  <p className="movie-info-para">{movie.overview}</p>
                </div>
                <div className="movie-rating-div">
                  <p className="movie-info-para">Rating</p>
                  <p className="movie-rating">{movie.voteAverage.toFixed(1)}</p>
                  <p className="movie-info-para">{movie.voteCount} Votes</p>
                </div>
              </div>
            </div>
            <div className="cast-details-section">
              <div>
                <h2 className="cast-head">Cast</h2>
              </div>
              <hr style={{width: '90vw'}} />
              <ul className="cast-list">
                {castAndCrew.cast.map(member => (
                  <li key={member.id} style={{margin: '1vw'}}>
                    <img
                      className="poster-image"
                      src={`https://image.tmdb.org/t/p/original/${member.profilePath}`}
                      alt={member.name}
                    />
                    <div className="cast-info">
                      <p
                        style={{fontWeight: 'bold'}}
                        className="movie-info-para"
                      >
                        {member.name}
                      </p>
                      <p style={{color: 'grey'}} className="movie-info-para">
                        as {member.character}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default withRouter(MovieDetails)
