import { useParams, Link, useNavigate } from 'react-router-dom';
import SkillCard from '../Components/SkillCard';
import { getSkillsByDiscipline } from '../Services/SkillService';
import { useState, useEffect } from 'react';

function SkillList(){
    const { disciplineName } = useParams();
    const [skills, setSkills] = useState([]);
    const filteredSkills = skills.filter(skill => skill.disciplines?.includes(disciplineName))
    const navigate = useNavigate()
     useEffect(() => {
        getSkillsByDiscipline(disciplineName).then(setSkills);
    }, [disciplineName]);
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-white font-bold text-center">{disciplineName}</h1>

            <div className='my-3'>
                <Link to={`/skills/${disciplineName}/add-skill`}   
                    className="bg-pink-400 text-white rounded p-2 font-bold w-8 h-8 flex items-center justify-center">+
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {filteredSkills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} disciplineName={disciplineName}/>
                ))}
            </div>
            <button onClick={() => navigate('/')} className="text-pink-400 mb-4">← Back</button>
        </div>
    )
}

export default SkillList;