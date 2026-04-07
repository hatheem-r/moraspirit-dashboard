import { useState, useEffect } from 'react';
import { getMembers, checkAvailability } from '../services/api';
import MemberList from './MemberList';
import AvailabilityForm from './AvailabilityForm';
import StatusIndicator from './StatusIndicator';
import SearchBar from './SearchBar'; // Import the new component

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  
  // New state for the search feature
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isLoadingDirectory, setIsLoadingDirectory] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        const data = await getMembers();
        setMembers(data.members); 
      } catch (err) {
        setError('Failed to load member directory.');
      } finally {
        setIsLoadingDirectory(false);
      }
    };
    fetchDirectory();
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!selectedMemberId || !selectedDate) return;

    setIsChecking(true);
    setStatusResult(null); 
    setError(null);

    try {
      const result = await checkAvailability(selectedMemberId, selectedDate);
      setStatusResult(result);
    } catch (err) {
      setError('Failed to check availability.');
    } finally {
      setIsChecking(false);
    }
  };

  // Filter logic: Check if the search query matches the name OR the role (case-insensitive)
  const filteredMembers = members.filter((member) => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingDirectory) return <p>Loading directory...</p>;

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>Check Availability</h2>
        
        {/* We pass the FULL members array here so the dropdown always has everyone */}
        <AvailabilityForm 
          members={members} 
          selectedMemberId={selectedMemberId}
          setSelectedMemberId={setSelectedMemberId}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSubmit={handleCheck}
          isChecking={isChecking}
        />

        <StatusIndicator statusResult={statusResult} />
      </section>

      <section>
        <h2>Member Directory</h2>
        
        {/* Render the search bar right above the list */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Pass the FILTERED members array to the list */}
        <MemberList members={filteredMembers} />
      </section>
    </main>
  );
}