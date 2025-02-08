import {Component} from 'react'
import NavBar from '../NavBar'
import './index.css'

class MovieDetails extends Component {
  state = {isFetchSuccess: false, formattedData: {}}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {movieId} = params

    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWM4N2E5ODYyMzg5YjAxODczNTAxOTQ5MDBjZDMyYiIsIm5iZiI6MTczNzU0MjE5NS4yNjQ5OTk5LCJzdWIiOiI2NzkwY2EzMzJkNjFjMzNlNjNkZmY4ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4QNKZoGVLtyCn2nYNzSbZ4kL9puCxh6Iwiuu6vaznCE'
    const apiKey = '39c87a9862389b0187350194900cd32b'

    const url1 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en`
    const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const movieResponse = await fetch(url1, options)
      const castAndCrewResponse = await fetch(url2, options)
      const movieResponseData = await movieResponse.json()
      const castAndCrewResponseData = await castAndCrewResponse.json()
      const formattedMovieData = this.formatMovieDetails(movieResponseData)
      const formattedCastAndCrewData = this.formatCastAndCrewData(
        castAndCrewResponseData,
      )
      const formattedData = {
        movie: formattedMovieData,
        castAndCrew: formattedCastAndCrewData,
      }
      this.setState({isFetchSuccess: true, formattedData})
    } catch (e) {
      const errorMsg = e.status_message
      console.log(errorMsg)
    }
  }

  formatMovieDetails = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    belongsToCollection: data.belongs_to_collection,
    budget: data.budget,
    genres: this.formatGenres(data.genres),
    homepage: data.homepage,
    id: data.id,
    imdbId: data.imdb_id,
    originCountry: data.origin_country,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    productionCompanies: this.formatMovieProductionCompanies(
      data.production_companies,
    ),
    productionCountries: this.formatMovieProductionCountries(
      data.production_countries,
    ),
    releaseDate: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime,
    spokenLanguages: this.formatMovieLanguages(data.spoken_languages),
    status: data.status,
    tagline: data.tagline,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  formatMovieProductionCompanies = dataArray => {
    const formattedDataArray = dataArray.map(data => ({
      id: data.id,
      logoPath: data.logo_path,
      name: data.name,
      originCountry: data.origin_country,
    }))
    return formattedDataArray
  }

  formatMovieProductionCountries = dataArray => {
    const formattedDataArray = dataArray.map(data => ({
      iso: data.iso_3166_1,
      name: data.name,
    }))
    return formattedDataArray
  }

  formatMovieLanguages = dataArray => {
    const formattedDataArray = dataArray.map(data => ({
      englishName: data.english_name,
      iso: data.iso_639_1,
      name: data.name,
    }))
    return formattedDataArray
  }

  formatGenres = dataArray => {
    const genres = dataArray.map(genre => genre.name)
    return genres.join(', ')
  }

  formatCastAndCrewData = data => ({
    id: data.id,
    cast: this.formatCastData(data.cast),
    crew: this.formatCrewData(data.crew),
  })

  formatCastData = dataArray => {
    const formattedCastData = dataArray.map(data => ({
      adult: data.adult,
      castId: data.cast_id,
      character: data.character,
      creditId: data.credit_id,
      gender: data.gender,
      id: data.id,
      knownForDepartment: data.known_for_department,
      name: data.name,
      order: data.order,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profile_path,
    }))

    return formattedCastData
  }

  formatCrewData = dataArray => {
    const formattedCrewData = dataArray.map(data => ({
      adult: data.adult,
      creditId: data.credit_id,
      department: data.department,
      gender: data.gender,
      id: data.id,
      job: data.job,
      knownForDepartment: data.known_for_department,
      name: data.name,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profile_path,
    }))

    return formattedCrewData
  }

  render() {
    const {formattedData, isFetchSuccess} = this.state
    const {movie, castAndCrew} = formattedData
    return (
      <>
        <NavBar />
        {isFetchSuccess && (
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
        )}
      </>
    )
  }
}

export default MovieDetails
