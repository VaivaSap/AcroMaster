import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SkillList from './Pages/SkillList';
import AddSkill from './Pages/AddSkill';
import SkillDetails from './Pages/SkillDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skills/:disciplineName" element={<SkillList />} />
      <Route path="/skills/:disciplineName/:skillId" element={<SkillDetails />} />
      <Route path="/skills/:disciplineName/add-skill" element={<AddSkill />} />
    </Routes>
  )
}

export default App