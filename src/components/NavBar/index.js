import {Link} from 'react-router-dom'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import './index.css'

const NavBar = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {switchTab, searchInput, searchMovies, search} = value
      return (
        <nav className="navbar">
          <h1 className="website">movieDB</h1>
          <ul className="tab-list">
            <li className="button-xs-sizing">
              <Link to="/?page=1">
                <button
                  className="tab-button"
                  type="button"
                  id="Popular"
                  onClick={switchTab}
                >
                  Home
                </button>
              </Link>
            </li>
            <Link to="/top-rated/?page=1">
              <li className="button-xs-sizing">
                <button
                  className="tab-button"
                  type="button"
                  id="Top Rated"
                  onClick={switchTab}
                >
                  Top Rated
                </button>
              </li>
            </Link>
            <Link to="/upcoming/?page=1">
              <li className="button-xs-sizing">
                <button
                  className="tab-button"
                  type="button"
                  id="Upcoming"
                  onClick={switchTab}
                >
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
                <Link
                  to={`/search-movies/?search=${search}&page=1`}
                  className="search-button-xs-sizing"
                >
                  <button
                    type="button"
                    onClick={searchMovies}
                    id="Search Movies"
                    className="search-button"
                  >
                    Search
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default NavBar
