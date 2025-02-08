import {Component} from 'react'
import './index.css'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import FetchedMoviesList from '../FetchedMoviesList'
import Pagination from '../Pagination'
import NavBar from '../NavBar'

class UpcomingMovies extends Component {
  state = {isFetchSuccess: false, data: {}}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {location} = this.props
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page')
    const activePage = page === null || page === undefined ? 1 : parseInt(page)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWM4N2E5ODYyMzg5YjAxODczNTAxOTQ5MDBjZDMyYiIsIm5iZiI6MTczNzU0MjE5NS4yNjQ5OTk5LCJzdWIiOiI2NzkwY2EzMzJkNjFjMzNlNjNkZmY4ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4QNKZoGVLtyCn2nYNzSbZ4kL9puCxh6Iwiuu6vaznCE'
    const apiKey = '39c87a9862389b0187350194900cd32b'

    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${activePage}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      this.setState({isFetchSuccess: true, data})
    } catch (e) {
      const errorMsg = e.error_message
      console.log(errorMsg)
    }
  }

  nextPage = () => {
    const {data} = this.state
    const totalPages = data.total_pages
    const {history, location} = this.props
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page')
    const activePage = page === null || page === undefined ? 1 : parseInt(page)
    if (activePage !== totalPages) {
      const path = `/upcoming/?page=${activePage + 1}`
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
    const {history, location} = this.props
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page')
    const activePage = page === null || page === undefined ? 1 : parseInt(page)
    if (activePage !== 1) {
      const path = `/upcoming/?page=${activePage - 1}`
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
    const {location} = this.props
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page')
    const activePage = page === null || page === undefined ? 1 : parseInt(page)
    return (
      <MovieDatabaseContext.Consumer>
        {value => {
          const {data, isFetchSuccess} = this.state
          const {formatData} = value
          let formattedData
          if (isFetchSuccess) {
            formattedData = formatData(data)
          }
          return (
            <>
              <NavBar />
              <div className="flex-column">
                <div className="heading-div">
                  <h1 className="page-heading">Upcoming</h1>
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
            </>
          )
        }}
      </MovieDatabaseContext.Consumer>
    )
  }
}

export default UpcomingMovies
