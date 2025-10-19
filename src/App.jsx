import React from 'react'
import Slider from './components/Slider';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Services from './pages/Services';
import Layout from './pages/Layout';
import Contact from './pages/Contact';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        
        </Route>
        <Route path='*' element={<PageNotFound />} ></Route>
        


      </Routes>
    </>
  )
}

export default App
