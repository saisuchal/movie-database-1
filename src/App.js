import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import UpcomingMovies from './components/UpcomingMovies'
import TopRatedMovies from './components/TopRatedMovies'
import MovieDetails from './components/MovieDetails'
import SearchMovies from './components/SearchMovies'
import MovieDatabaseContext from './context/MovieDatabaseContext'
import './App.css'

class App extends Component {
  state = {isLoading: false}

  formatData = data => ({
    page: data.page,
    results: this.formatMovieDataArray(data.results),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  })

  formatMovieDataArray = dataArray => {
    const arr = []
    dataArray.forEach(dataObject => {
      const dataArrayObject = {
        adult: dataObject.adult,
        backdropPath: dataObject.backdrop_path,
        genreIds: dataObject.genre_ids,
        id: dataObject.id,
        originalLanguage: dataObject.original_language,
        originalTitle: dataObject.original_title,
        overview: dataObject.overview,
        popularity: dataObject.popularity,
        posterPath: dataObject.poster_path,
        releaseDate: dataObject.release_date,
        title: dataObject.title,
        video: dataObject.video,
        voteAverage: dataObject.vote_average,
        voteCount: dataObject.vote_count,
      }
      arr.push(dataArrayObject)
    })
    return arr
  }

  render() {
    const {isLoading} = this.state
    return (
      <MovieDatabaseContext.Provider
        value={{
          formatData: this.formatData,
          isLoading,
        }}
      >
        <Switch>
          <Route
            exact
            path="/movie-details/:movieId"
            component={MovieDetails}
          />
          <Route exact path="/search-movies/" component={SearchMovies} />
          <Route path="/upcoming/" component={UpcomingMovies} />
          <Route path="/top-rated/" component={TopRatedMovies} />

          <Route path="/" component={PopularMovies} />
        </Switch>
      </MovieDatabaseContext.Provider>
    )
  }
}

export default App
