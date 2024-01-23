import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login_page'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
      </Routes>
    </>
  )
}

export default App
