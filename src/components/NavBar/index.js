import {Link} from 'react-router-dom'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import './index.css'

const NavBar = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {switchTab, searchInput, searchMovies, search} = value
      return (
        <div className="navbar">
          <h1>movieDB</h1>
          <ul className="tab-list">
            <Link to="/">
              <li>
                <button
                  className="tab-button"
                  type="button"
                  value="Popular"
                  onClick={switchTab}
                >
                  Popular
                </button>
              </li>
            </Link>
            <Link to="/top-rated">
              <li>
                <button
                  className="tab-button"
                  type="button"
                  value="Top Rated"
                  onClick={switchTab}
                >
                  Top Rated
                </button>
              </li>
            </Link>
            <Link to="/upcoming">
              <li>
                <button
                  className="tab-button"
                  type="button"
                  value="Upcoming"
                  onClick={switchTab}
                >
                  Upcoming
                </button>
              </li>
            </Link>
            <li>
              <div>
                <input
                  className="search-input"
                  type="textbox"
                  placeholder="search"
                  onChange={searchInput}
                />
                <Link to="/search-movies">
                  <button
                    type="button"
                    onClick={searchMovies}
                    value="Search Movies"
                  >
                    <h1 style={{fontSize: '10px'}}>Search</h1>
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default NavBar
