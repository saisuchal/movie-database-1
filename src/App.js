import {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import UpcomingMovies from './components/UpcomingMovies'
import TopRatedMovies from './components/TopRatedMovies'
import MovieDetails from './components/MovieDetails'
import SearchMovies from './components/SearchMovies'
import NavBar from './components/NavBar'
import MovieDatabaseContext from './context/MovieDatabaseContext'
import './App.css'

class App extends Component {
  state = {
    formattedData: {},
    search: '',
    isFetchSuccess: false,
    activeTab: 'Popular',
    activePageDisplay: 1,
    movieId: '',
  }

  componentDidMount() {
    const {history} = this.props
    history.replace('/')
    this.fetchData()
  }

  fetchData = async () => {
    const {search, activeTab, activePageDisplay, movieId} = this.state
    let url1
    let url2
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWM4N2E5ODYyMzg5YjAxODczNTAxOTQ5MDBjZDMyYiIsIm5iZiI6MTczNzU0MjE5NS4yNjQ5OTk5LCJzdWIiOiI2NzkwY2EzMzJkNjFjMzNlNjNkZmY4ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4QNKZoGVLtyCn2nYNzSbZ4kL9puCxh6Iwiuu6vaznCE'
    const apiKey = '39c87a9862389b0187350194900cd32b'
    switch (`${activeTab}`) {
      case 'Popular':
        url1 = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${activePageDisplay}`
        break
      case 'Top Rated':
        url1 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${activePageDisplay}`
        break
      case 'Upcoming':
        url1 = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${activePageDisplay}`
        break
      case 'Movie Details':
        url1 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en`
        url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
        break
      case 'Search Movies':
        url1 = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${activePageDisplay}`
        break
      default:
        url1 = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${activePageDisplay}`
        break
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    if (activeTab === 'Movie Details') {
      try {
        const movieResponse = await fetch(url1, options)
        const castAndCrewResponse = await fetch(url2, options)
        const movieResponseData = await movieResponse.json()
        console.log(movieResponseData)
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
        const errorMsg = e.error_message
        console.log(errorMsg)
      }
    } else {
      try {
        if (activeTab !== 'Movie Details') {
          console.log(url1)
          const response = await fetch(url1, options)
          const data = await response.json()
          const formattedData = this.formatData(data)
          console.log(formattedData)
          this.setState({isFetchSuccess: true, formattedData})
        }
      } catch (e) {
        const errorMsg = e.error_message
        console.log(errorMsg)
      }
    }
  }

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

  switchTab = event => {
    const {id} = event.target
    this.setState(
      {
        isFetchSuccess: false,
        activeTab: id,
        activePageDisplay: 1,
        search: '',
      },
      this.fetchData,
    )
  }

  viewMovieDetails = movieId => {
    const {history} = this.props
    this.setState(
      {activeTab: 'Movie Details', movieId, isFetchSuccess: false},
      this.fetchData,
    )
    history.push(`/movie-details/${movieId}`)
  }

  searchInput = event => {
    const {value} = event.target
    this.setState({search: value})
  }

  searchMovies = event => {
    const {id} = event.target
    console.log(id)
    this.setState(
      {activeTab: id, activePageDisplay: 1, isFetchSuccess: false},
      this.fetchData,
    )
  }

  nextPage = () => {
    const {formattedData, activePageDisplay, activeTab} = this.state
    const {totalPages} = formattedData
    const {history} = this.props
    let path
    if (activeTab === 'Top Rated') {
      path = `/top-rated/${activePageDisplay + 1}`
    } else if (activeTab === 'Upcoming') {
      path = `/upcoming/${activePageDisplay + 1}`
    } else if (activeTab === 'Search Movies') {
      path = `/search-movies/${activePageDisplay + 1}`
    } else if (activeTab === 'Popular') {
      path = `/${activePageDisplay + 1}`
    }
    if (activePageDisplay !== totalPages) {
      this.setState(
        prevState => ({
          activePageDisplay: prevState.activePageDisplay + 1,
          isFetchSuccess: false,
        }),
        this.fetchData,
      )
      history.push(path)
    }
  }

  previousPage = () => {
    const {activePageDisplay, activeTab} = this.state
    const {history} = this.props
    let path
    if (activeTab === 'Top Rated') {
      path = `/top-rated/${activePageDisplay - 1}`
    } else if (activeTab === 'Upcoming') {
      path = `/upcoming/${activePageDisplay - 1}`
    } else if (activeTab === 'Search Movies') {
      path = `/search-movies/${activePageDisplay - 1}`
    } else {
      path = `/${activePageDisplay - 1}`
    }
    if (activePageDisplay !== 1) {
      this.setState(
        prevState => ({
          activePageDisplay: prevState.activePageDisplay - 1,
          isFetchSuccess: false,
        }),
        this.fetchData,
      )
      history.push(path)
    }
  }

  render() {
    const {
      formattedData,
      search,
      isFetchSuccess,
      activeTab,
      activePageDisplay,
    } = this.state
    console.log(this.state)
    return (
      <MovieDatabaseContext.Provider
        value={{
          isFetchSuccess,
          formattedData,
          fetchData: this.fetchData,
          switchTab: this.switchTab,
          viewMovieDetails: this.viewMovieDetails,
          searchInput: this.searchInput,
          searchMovies: this.searchMovies,
          search,
          activeTab,
          activePageDisplay,
          nextPage: this.nextPage,
          previousPage: this.previousPage,
        }}
      >
        <div>
          <NavBar />
          <Switch>
            <Route path="/upcoming" component={UpcomingMovies} />
            <Route path="/top-rated" component={TopRatedMovies} />
            <Route path="/search-movies" component={SearchMovies} />
            <Route path="/movie-details/:id" component={MovieDetails} />
            <Route path="/" component={PopularMovies} />
          </Switch>
        </div>
      </MovieDatabaseContext.Provider>
    )
  }
}

export default withRouter(App)
