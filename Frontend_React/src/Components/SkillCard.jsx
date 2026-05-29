
import { useState } from 'react';
import { updateSkill } from '../Services/SkillService';

function getStars(status){
  if( status === 'Learning') return '⭐';
  if (status === 'Succeeded') return '⭐⭐';
  if (status === 'Mastered') return '⭐⭐⭐';
  if (status === 'MasteredButNeedsAttention') return (<span>⭐⭐⭐<span className="text-yellow-400"> !</span></span>);
  return 'Undefined';
}

function SkillCard({ skill }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [localSkill, setLocalSkill] = useState(skill);
  const [form, setForm] = useState({
    name: skill.name,
    status: skill.status,
    difficulty: skill.difficulty,
    categories: skill.categories,
    youtubeUrl: skill.youtubeUrl || '',
  });

 const handleSave = async () => {
    const updated = { ...localSkill, ...form };
    await updateSkill(localSkill.id, updated);
    setLocalSkill(updated);
    setEditing(false);
};

  return (
    <div className="bg-gray-800 rounded-xl p-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => { setExpanded(!expanded); setEditing(false); }}
      >
        <span className="text-white">{localSkill.name}</span>
        <div className="flex items-center gap-2">
          <span>{getStars(localSkill.status)}</span>
          <button
            className="text-pink-400 transition-opacity text-sm"
            onClick={(e) => { e.stopPropagation(); setExpanded(true); setEditing(true); }}
          >✏️</button>
        </div>
      </div>

      {expanded && (
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
      )}
    </div>
  );
}

export default SkillCard;