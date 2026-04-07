import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMembers, checkAvailability } from '../services/api';
import StatusIndicator from './StatusIndicator'; // Reusing our indicator!

export default function MemberDetails() {
  const { id } = useParams(); 
  
  // Profile state
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  // New Availability Check state
  const [selectedDate, setSelectedDate] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const data = await getMembers();
        const foundMember = data.members.find(m => m.id === id);
        
        if (foundMember) {
          setMember(foundMember);
        } else {
          setProfileError('Member not found.');
        }
      } catch (err) {
        setProfileError('Failed to fetch member details.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMemberData();
  }, [id]);

  // Handle the form submission for this specific member
  const handleCheck = async (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    setIsChecking(true);
    setStatusResult(null);
    setCheckError(null);

    try {
      // We pass the "id" from the URL, and the "selectedDate" from the input
      const result = await checkAvailability(id, selectedDate);
      setStatusResult(result);
    } catch (err) {
      setCheckError('Failed to check availability.');
    } finally {
      setIsChecking(false);
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  if (profileError) return (
    <div>
      <p style={{ color: 'red' }}>{profileError}</p>
      <Link to="/">&larr; Back to Dashboard</Link>
    </div>
  );

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Link 
        to="/" 
        style={{ textDecoration: 'none', color: '#0066cc', marginBottom: '20px', display: 'inline-block', fontWeight: 'bold' }}
      >
        &larr; Back to Dashboard
      </Link>

      <div style={{ 
        padding: '30px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        maxWidth: '600px',
        backgroundColor: '#fdfdfd',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '2em', margin: '0 0 10px' }}>{member.name}</h2>
        <h4 style={{ color: '#555', fontSize: '1.2em', margin: '0 0 20px' }}>{member.role}</h4>
        
        <div style={{ padding: '15px', backgroundColor: '#eef2f5', borderRadius: '5px' }}>
          <p style={{ margin: '0' }}><strong>System ID:</strong> {member.id}</p>
        </div>
      </div>

      {/* New Availability Check Section */}
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        maxWidth: '600px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ marginTop: 0 }}>Check {member.name}'s Availability</h3>
        
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <button type="submit" disabled={isChecking || !selectedDate} style={{ padding: '8px 15px' }}>
            {isChecking ? 'Checking...' : 'Check Status'}
          </button>
        </form>

        {checkError && <p style={{ color: 'red' }}>{checkError}</p>}
        
        {/* Our reusable StatusIndicator dynamically handles the green/red UI */}
        <StatusIndicator statusResult={statusResult} />
      </div>
    </div>
  );
}