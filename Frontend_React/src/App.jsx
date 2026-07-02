import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SkillList from './Pages/SkillList';
import AddSkill from './Pages/AddSkill';
import SkillDetails from './Pages/SkillDetails';
import Register from './Pages/Register';
import Login from './Pages/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/skills/:disciplineName" element={<SkillList />} />
      <Route path="/skills/:disciplineName/:skillId" element={<SkillDetails />} />
      <Route path="/skills/:disciplineName/add-skill" element={<AddSkill />} />
    </Routes>
  )
}

export default App