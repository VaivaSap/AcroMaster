
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getStars(status){
  if( status === 'Learning') return '⭐';
  if (status === 'Succeeded') return '⭐⭐';
  if (status === 'Mastered') return '⭐⭐⭐';
  if (status === 'MasteredButNeedsAttention') return (<span>⭐⭐⭐<span className="text-yellow-400"> !</span></span>);
  return 'Undefined';
}

function SkillCard({ skill, disciplineName }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl p-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => { setExpanded(!expanded); }}
      >
        <span className="text-white">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span>{getStars(skill.status)}</span>
          <button
            className="text-pink-400 transition-opacity text-sm"
            onClick={() => navigate(`/skills/${disciplineName}/${skill.id}`)}
          >⤢</button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 border-t border-gray-600 pt-3 text-sm text-gray-300">
          <div><span className="text-gray-500">Difficulty:</span> {skill.difficulty}</div>
          <div><span className="text-gray-500">Category:</span> {skill.categories?.join(', ')}</div>
          {skill.youtubeUrl && (
            <div><a href={skill.youtubeUrl} target="_blank" rel="noreferrer" className="text-pink-400">▶ Example video</a></div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillCard;