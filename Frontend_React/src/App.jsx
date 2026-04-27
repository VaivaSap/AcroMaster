import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SkillList from './Pages/SkillList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skills/:disciplineName" element={<SkillList />} />
    </Routes>
  )
}

export default App