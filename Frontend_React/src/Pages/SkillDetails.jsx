import { useParams } from 'react-router-dom';
import { getSkillById, updateSkill  } from '../Services/SkillService';
import { useState, useEffect } from 'react';

function SkillDetails(){
   const {skillId} = useParams();
   const [skill, setSkill] = useState(null);
  const [editing, setEditing] = useState(false);
  const [localSkill, setLocalSkill] = useState(skill);

  const [form, setForm] = useState({
    name: '',
    status: '',
    difficulty: '',
    categories: [],
    youtubeUrl: '',
});

 const handleSave = async () => {
    const updated = { ...localSkill, ...form };
    await updateSkill(localSkill.id, updated);
    setLocalSkill(updated);
    setEditing(false);
};

    useEffect(() => {
    getSkillById(skillId).then(data => {
        setSkill(data);
        setLocalSkill(data);
        setForm({
            name: data.name,
            status: data.status,
            difficulty: data.difficulty,
            categories: data.categories,
            youtubeUrl: data.youtubeUrl || '',
        });
    });
}, [skillId]);

if (!skill) return <div className="text-white p-4">Loading</div>

return( 
     <div className="min-h-screen bg-gray-900 p-4">
          <div className="flex justify-between items-center">
      <h1 className="text-white font-bold">{localSkill.name}</h1>
      <button onClick={() => setEditing(true)}>✏️</button>
    </div>

        <div className="mt-3 border-t border-gray-600 pt-3 text-sm text-gray-300">
          {editing ? (
            <>
              <input
                className="bg-gray-700 text-white rounded p-1 w-full mb-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <select className="bg-gray-700 text-white rounded p-1 w-full mb-2"
                value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Learning">Learning</option>
                <option value="Succeeded">Succeeded</option>
                <option value="Mastered">Mastered</option>
                <option value="MasteredButNeedsAttention">Mastered But Needs Attention</option>
              </select>
              <select className="bg-gray-700 text-white rounded p-1 w-full mb-2"
                value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select className="bg-gray-700 text-white rounded p-1 w-full mb-2"
                value={form.categories[0]} onChange={(e) => setForm({ ...form, categories: [e.target.value] })}>
                <option value="Balance">Balance</option>
                <option value="Dynamic">Dynamic</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Strength">Strength</option>
                <option value="Transition">Transition</option>
              </select>
              <input
                className="bg-gray-700 text-white rounded p-1 w-full mb-2"
                placeholder="URL"
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              />
              <div className="flex gap-2 mt-1">
                <button onClick={handleSave} className="bg-pink-400 text-white rounded px-3 py-1">Save</button>
                <button onClick={() => setEditing(false)} className="text-gray-400">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div><span className="text-gray-500">Difficulty:</span> {skill.difficulty}</div>
              <div><span className="text-gray-500">Category:</span> {skill.categories?.join(', ')}</div>
              {skill.youtubeUrl && (
                <div><a href={skill.youtubeUrl} target="_blank" rel="noreferrer" className="text-pink-400">▶ Example video</a></div>
              )}
            </>
          )}
        </div>
        </div>
)}
export default SkillDetails;