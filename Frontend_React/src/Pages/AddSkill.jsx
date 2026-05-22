import { useState } from "react";
import PinkButton from "../Components/PinkButton";
import addSkill from '../Services/SkillService';
import { useNavigate, useParams } from 'react-router-dom';

function AddSkill() {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [status, setStatus] = useState('');
    const [mainSkillCategory, setMainSkillCategory] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const { disciplineName } = useParams();
    const navigate = useNavigate();

    const handleSave = async () => {

    const response = await addSkill({ 
        name, 
        status, 
        difficulty, 
        disciplines: [disciplineName],
        categories: [mainSkillCategory], 
        youtubeUrl,  
        createdAt: new Date().toISOString() });

        if (response.ok) {
        alert('Skill saved!')
        setName('')
        setDifficulty('')
        setStatus('')
        setMainSkillCategory('')
        setYoutubeUrl('')
    }
}

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-white font-bold mb-2.5">Add Skill</h1>
 

      <div className="text-white mb-2.5">
        <input
            placeholder="--Skill Name--"
            value={name}
            onChange={(e) => setName(e.target.value) }   
            className="bg-gray-800 text-white rounded p-2 w-full mt-1 border border-gray-600"/>
        </div>

        <div className="mb-2.5">  
        <select className="bg-gray-800 text-white rounded p-2 w-full mt-1" value={mainSkillCategory} onChange={(e) => setMainSkillCategory(e.target.value)}>
            <option value="">-- Select Training Category --</option>
            <option value="Balance">Balance</option>
            <option value="Dynamic">Dynamic</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Strength">Strength</option>
            <option value="Transition">Transition</option>
        </select>
        </div>

        <div className="mb-2.5">  
        <select className="bg-gray-800 text-white rounded p-2 w-full mt-1" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">-- Select Difficulty --</option>
            <option className="text-white" value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>
        </div>
     
        <div className="text-white mb-2.5 ">
        <select className="bg-gray-800 text-white rounded p-2 w-full mt-1" value={ status } onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Select Status --</option>
            <option value="Learning">Learning</option>
            <option value="Succeeded">Succeeded</option>
            <option value="Mastered">Mastered</option>
            <option value="MasteredButNeedsAttention">Mastered But Needs Attention</option>
        </select>
        </div>

        <div className="text-white mb-2.5 ">
        <input
            placeholder="--Skill Example Link--"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value) }   
            className="bg-gray-800 text-white rounded p-2 w-full mt-1 border border-gray-600"/>
        </div>

        <PinkButton onClick={ handleSave }>💾</PinkButton>
        <button onClick={() => navigate('/')} className="text-pink-400 mb-4">← Back</button>
    </div>
    
  )
}

export default AddSkill; 