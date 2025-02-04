import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import './index.css'

const Pagination = () => (
  <MovieDatabaseContext.Consumer>
    {value => {
      const {activePageDisplay, previousPage, nextPage} = value
      return (
        <div className="pagination">
          <button type="button" onClick={previousPage} className="prev-button">
            Prev
          </button>
          <p className="active-page-display">{activePageDisplay}</p>
          <button type="button" onClick={nextPage} className="next-button">
            Next
          </button>
        </div>
      )
    }}
  </MovieDatabaseContext.Consumer>
)

export default Pagination
