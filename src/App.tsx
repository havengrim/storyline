import './index.css'
import First from './First'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bedroom from './Bedroom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/bedroom" element={<Bedroom />} />
      </Routes>
    </Router>
  )
}

export default App