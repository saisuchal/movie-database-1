import {Component} from 'react'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import FetchedMoviesList from '../FetchedMoviesList'
import Pagination from '../Pagination'
import NavBar from '../NavBar'

class SearchMovies extends Component {
  state = {isFetchSuccess: false, data: {}, searchInput: ''}

  componentDidMount() {
    this.setState({isFetchSuccess: false, data: {}})
    this.fetchData()
  }

  componentDidUpdate() {
    const {searchInput} = this.state
    const {location} = this.props
    const {search} = location
    const searchParams = new URLSearchParams(search)
    const searchParameter = searchParams.get('search')
    if (searchParameter !== searchInput) {
      this.fetchData()
    }
  }

  fetchData = async () => {
    const {location} = this.props
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page')
    const search = searchParams.get('search')
    const activePage = page === null || page === undefined ? 1 : parseInt(page)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWM4N2E5ODYyMzg5YjAxODczNTAxOTQ5MDBjZDMyYiIsIm5iZiI6MTczNzU0MjE5NS4yNjQ5OTk5LCJzdWIiOiI2NzkwY2EzMzJkNjFjMzNlNjNkZmY4ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4QNKZoGVLtyCn2nYNzSbZ4kL9puCxh6Iwiuu6vaznCE'
    const apiKey = '39c87a9862389b0187350194900cd32b'

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${activePage}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      this.setState({isFetchSuccess: true, data, searchInput: search})
    } catch (e) {
      const errorMsg = e.error_message
      console.log(errorMsg)
    }
  }

  nextPage = () => {
    const {data} = this.state
    const totalPages = data.total_pages
    const {location, history} = this.props
    const searchParams = new URLSearchParams(location.search)
    const search =
      searchParams.get('search') === undefined ? '' : searchParams.get('search')
    const activePage =
      searchParams.get('page') === undefined
        ? 1
        : parseInt(searchParams.get('page'))
    if (activePage !== totalPages) {
      const path = `/search-movies/?search=${search}&page=${activePage + 1}`
      this.setState(
        {
          isFetchSuccess: false,
        },
        this.fetchData,
      )
      history.push(path)
    }
  }

  previousPage = () => {
    const {location, history} = this.props
    const searchParams = new URLSearchParams(location.search)
    const search =
      searchParams.get('search') === undefined ? '' : searchParams.get('search')
    const activePage =
      searchParams.get('page') === undefined
        ? 1
        : parseInt(searchParams.get('page'))
    if (activePage !== 1) {
      const path = `/search-movies/?search=${search}&page=${activePage - 1}`
      this.setState(
        {
          isFetchSuccess: false,
        },
        this.fetchData,
      )
      history.push(path)
    }
  }

  viewMovieDetails = event => {
    const {history} = this.props
    const movieId = event.target.id
    this.setState(
      {
        isFetchSuccess: false,
      },
      this.fetchData,
    )
    history.push(`/movie-details/${movieId}`)
  }

  render() {
    const {isFetchSuccess, data} = this.state
    const {location} = this.props
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page')
    const searchParameter = searchParams.get('search')
    const search = searchParameter === undefined ? '' : searchParameter
    const activePage = page === undefined ? 1 : parseInt(page)
    let formattedData
    return (
      <MovieDatabaseContext.Consumer>
        {value => {
          const {formatData} = value
          if (isFetchSuccess) {
            formattedData = formatData(data)
          }
          return (
            <div>
              <NavBar />
              <div>
                <div className="flex-column">
                  <div className="heading-div">
                    <h1 className="page-heading">
                      Search Results For: &quot;{search}&quot;
                    </h1>
                  </div>
                  <Pagination
                    activePage={activePage}
                    previousPage={this.previousPage}
                    nextPage={this.nextPage}
                  />
                  {isFetchSuccess && (
                    <FetchedMoviesList
                      results={formattedData.results}
                      viewMovieDetails={this.viewMovieDetails}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </MovieDatabaseContext.Consumer>
    )
  }
}

export default SearchMovies
