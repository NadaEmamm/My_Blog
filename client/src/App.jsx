import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Blog from './components/Blog'
import Signout from './pages/Signout'
import Edit from './components/Edit'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path='/profile' element={<Profile />} /> 
          <Route path="/post/:id" element={<Blog />} />
          <Route path='/signout' element={<Signout />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer className="fixed bottom-0 left-0 right-0 bg-white shadow z-50 p-4" />
        </BrowserRouter>
    </>
  )
}
export default App
