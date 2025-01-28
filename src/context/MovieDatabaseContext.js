import React from 'react'

const MovieDatabaseContext = React.createContext({
  activeTab: '',
  activePageNo: '',
  search: '',
  movieId: '',
  formattedData: {},
  switchTab: () => {},
  viewMovieDetails: () => {},
  searchInput: () => {},
  searchMovies: () => {},
  url: '',
})

export default MovieDatabaseContext
