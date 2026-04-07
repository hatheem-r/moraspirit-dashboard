import MemberCard from './MemberCard';

export default function MemberList({ members }) {
  if (!members || members.length === 0) {
    return (
      <div className="member-grid">
        <p className="member-grid-empty">No members match your search.</p>
      </div>
    );
  }

  return (
    <div className="member-grid">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
