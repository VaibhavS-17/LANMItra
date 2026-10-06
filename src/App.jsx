import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App
