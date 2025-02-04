import React from 'react'

const MovieDatabaseContext = React.createContext({
  activeTab: '',
  activePageNo: '',
  search: '',
  formattedData: {},
  switchTab: () => {},
  viewMovieDetails: () => {},
  searchInput: () => {},
  searchMovies: () => {},
  url: '',
  isFetchSuccess: '',
})

export default MovieDatabaseContext
