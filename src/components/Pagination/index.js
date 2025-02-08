import './index.css'

const Pagination = props => {
  const {activePage, previousPage, nextPage} = props
  return (
    <div className="pagination">
      <button type="button" onClick={previousPage} className="prev-button">
        Prev
      </button>
      <p className="active-page-display">{activePage}</p>
      <button type="button" onClick={nextPage} className="next-button">
        Next
      </button>
    </div>
  )
}

export default Pagination
