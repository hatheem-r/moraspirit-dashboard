import { Link } from 'react-router-dom';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function MemberCard({ member }) {
  return (
    <Link to={`/member/${member.id}`} className="member-card-link">
      <div className="member-card">
        <div className="member-card-avatar">
          {getInitials(member.name)}
        </div>
        <div className="member-card-name">{member.name}</div>
        <div className="member-card-role">{member.role}</div>
        <div className="member-card-id">{member.id}</div>
        <span className="member-card-arrow">→</span>
      </div>
    </Link>
  );
}
