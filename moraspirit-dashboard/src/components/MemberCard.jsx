import { Link } from 'react-router-dom';

export default function MemberCard({ member }) {
  return (
    <Link to={`/member/${member.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        style={{ 
          border: '1px solid #ccc', 
          padding: '15px',
          minWidth: '220px',
          maxWidth: '300px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          backgroundColor: 'white'
        }}
        // Simple hover effects using React event handlers
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
      >
        <h3 style={{ margin: '0 0 5px' }}>{member.name}</h3>
        <p style={{ margin: '0 0 5px', color: '#555' }}>{member.role}</p>
        <small style={{ color: '#888' }}>{member.id}</small>
      </div>
    </Link>
  );
}