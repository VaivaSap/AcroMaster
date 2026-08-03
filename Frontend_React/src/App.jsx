import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SkillList from './Pages/SkillList';
import AddSkill from './Pages/AddSkill';
import SkillDetails from './Pages/SkillDetails';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/skills/:disciplineName" element={<ProtectedRoute><SkillList /></ProtectedRoute>} />
      <Route path="/skills/:disciplineName/:skillId" element={<ProtectedRoute><SkillDetails /></ProtectedRoute>} />
      <Route path="/skills/:disciplineName/add-skill" element={<ProtectedRoute><AddSkill /></ProtectedRoute>} />
    </Routes>
  )
}

export default App