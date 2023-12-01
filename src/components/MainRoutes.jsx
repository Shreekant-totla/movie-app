import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MovieListing from './MovieListing'
import MovieDetailPage from './MovieDetailPage'

function MainRoutes() {
  return (
        <div>
      <Routes>
        <Route path="/" element={<MovieListing />} />
        {/* <Route path="/product/:id" element={<MovieDetailPage />} /> */}
      </Routes>
    </div>
    
  )
}

export default MainRoutes