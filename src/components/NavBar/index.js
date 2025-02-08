import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const NavBar = props => {
  const [search, setSearch] = useState('')

  const searchInput = event => {
    const {value} = event.target
    setSearch(value)
  }

  const searchMovies = () => {
    const {history} = props
    if (search !== '') {
      history.replace(`/search-movies/?search=${search}&page=1`)
    }
  }

  return (
    <nav className="navbar">
      <h1 className="website">movieDB</h1>
      <ul className="tab-list">
        <Link to="/?page=1">
          <li className="button-xs-sizing">
            <button className="tab-button" type="button" id="Popular">
              Home
            </button>
          </li>
        </Link>
        <Link to="/top-rated/?page=1">
          <li className="button-xs-sizing">
            <button className="tab-button" type="button" id="Top Rated">
              Top Rated
            </button>
          </li>
        </Link>
        <Link to="/upcoming/?page=1">
          <li className="button-xs-sizing">
            <button className="tab-button" type="button" id="Upcoming">
              Upcoming
            </button>
          </li>
        </Link>
        <li>
          <div className="search-div">
            <input
              className="search-input"
              type="textbox"
              placeholder="search"
              onChange={searchInput}
              value={search}
            />

            <button
              type="button"
              onClick={searchMovies}
              id="Search Movies"
              className="search-button"
            >
              Search
            </button>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(NavBar)
