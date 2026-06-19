import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getStars(status) {
  if (status === "Learning") return "⭐";
  if (status === "Succeeded") return "⭐⭐";
  if (status === "Mastered") return "⭐⭐⭐";
  if (status === "MasteredButNeedsAttention")
    return (
      <span>
        ⭐⭐⭐<span className="text-yellow-400">!</span>
      </span>
    );
  return "Undefined";
}

function SkillCard({ skill, disciplineName }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl p-3 flex flex-col h-full">
      <div className="cursor-pointer" onClick={() => { setExpanded(!expanded); }}>
        <div className="flex items-start justify-between">
          <span className={`text-white ${expanded ? '' : 'skill-name'}`}>{skill.name}</span>
          <button
            className="text-pink-400 transition-opacity text-sm shrink-0 ml-2"
            onClick={(e) => { e.stopPropagation(); navigate(`/skills/${disciplineName}/${skill.id}`); }}
          >⤢</button>
        </div>
        <span className="whitespace-nowrap">{getStars(skill.status)}</span>
      </div>

      {expanded && (
        <div className="mt-auto border-t border-gray-600 pt-3 text-sm text-gray-300">
          <div><span className="text-gray-500">Difficulty:</span> {skill.difficulty}</div>
          <div><span className="text-gray-500">Category:</span> {skill.categories?.join(', ')}</div>
          {skill.youtubeUrl && (
            <div><a href={skill.youtubeUrl} target="_blank" rel="noreferrer" className="text-pink-400">▶ Trick example</a></div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillCard;