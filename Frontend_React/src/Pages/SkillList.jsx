import { useParams, Link, useNavigate } from 'react-router-dom';
import SkillCard from '../Components/SkillCard';

const mockSkills = [
  { id: 1, name: 'Fireman Spin', discipline: 'Pole', status: 'Learning', difficulty: 'Beginner', category: 'Dynamic' },
  { id: 2, name: 'Jade Split', discipline: 'Lyra', status: 'Mastered', difficulty: 'Advanced', category: 'Flexibility' },
  { id: 3, name: 'Ayesha', discipline: 'Flow Arts', status: 'Succeeded', difficulty: 'Intermediate', category: 'Strength' },
  { id: 4, name: 'Caterpillar', discipline: 'Yoga', status: 'Learning', difficulty: 'Beginner', category: 'Transition' },
]

function SkillList(){
    const { disciplineName } = useParams();
    const filteredSkills = mockSkills.filter(skill => skill.discipline === disciplineName)
    const navigate = useNavigate()
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
                    <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
      <button onClick={() => navigate('/')} className="text-pink-400 mb-4">← Back</button>
        </div>
    )
}

export default SkillList;