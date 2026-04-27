function getStars(status){
  if( status === 'Learning') return '⭐';
  if (status === 'Succeeded') return '⭐⭐';
  if (status === 'Mastered') return '⭐⭐⭐';
  if (status === 'MasteredButNeedsAttention') return (<span>⭐⭐⭐<span className="text-yellow-400"> !</span></span>);
  return 'Undefined';
}

function SkillCard({ skill }) {
  return (
    <div className="bg-gray-800 rounded-xl p-3">
      <span className="text-white">{skill.name}</span>
      <span className="ml-2">{getStars(skill.status)}</span>
    </div>
  )
}

export default SkillCard;