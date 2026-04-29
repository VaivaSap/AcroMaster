import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SkillList from './Pages/SkillList';
import AddSkill from './Pages/AddSkill';
import EditSkill from './Pages/EditSkill';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skills/:disciplineName" element={<SkillList />} />
      <Route path="/skills/:disciplineName/add-skill" element={<AddSkill />} />
      <Route path="/skills/:disciplineName/edit-skill" element={<EditSkill />} />
    </Routes>
  )
}

export default App