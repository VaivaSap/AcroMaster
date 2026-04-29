import { useParams, Link } from 'react-router-dom';
import SkillCard from '../Components/SkillCard';

const mockSkills = [
  { id: 1, name: 'Fireman Spin', status: 'Learning', difficulty: 'Beginner', category: 'Dynamic' },
  { id: 2, name: 'Jade Split', status: 'Mastered', difficulty: 'Advanced', category: 'Flexibility' },
  { id: 3, name: 'Ayesha', status: 'Succeeded', difficulty: 'Intermediate', category: 'Strength' },
  { id: 4, name: 'Caterpillar', status: 'Learning', difficulty: 'Beginner', category: 'Transition' },
]

function SkillList(){
    const { disciplineName } = useParams();
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-white font-bold text-center">{disciplineName}</h1>

            <div className='my-3'>
                <Link to={`/skills/${disciplineName}/add-skill`}   
                    className="bg-pink-400 text-white rounded p-2 font-bold w-8 h-8 flex items-center justify-center">+
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {mockSkills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
      
        </div>
    )
}

export default SkillList;