import MemberCard from './MemberCard';

export default function MemberList({ members }) {
  if (!members || members.length === 0) return <p>No members found.</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}