import { useState, useEffect, useRef } from 'react';

export default function AvailabilityForm({ 
  members, 
  selectedMemberId, 
  setSelectedMemberId, 
  selectedDate, 
  setSelectedDate, 
  onSubmit, 
  isChecking 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter members based on the search query
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a member from the dropdown
  const handleSelectMember = (member) => {
    setSelectedMemberId(member.id);
    setSearchQuery(member.name); // Fill input with the selected name
    setIsDropdownOpen(false);    // Close the dropdown
  };

  // Handle typing in the input
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedMemberId(''); // Clear the actual selected ID if they start typing again
    setIsDropdownOpen(true);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '20px' }}>
      
      {/* Searchable Input Container */}
      <div ref={dropdownRef} style={{ position: 'relative', width: '250px' }}>
        <input 
          type="text" 
          placeholder="Search for a member..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
          required
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
        />
        
        {/* Floating Dropdown List */}
        {isDropdownOpen && searchQuery && (
          <ul style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            background: 'white', 
            border: '1px solid #ccc', 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            maxHeight: '200px', 
            overflowY: 'auto',
            zIndex: 10,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <li 
                  key={member.id} 
                  onClick={() => handleSelectMember(member)}
                  style={{ 
                    padding: '8px', 
                    cursor: 'pointer', 
                    borderBottom: '1px solid #eee'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  <strong>{member.name}</strong> <small>({member.role})</small>
                </li>
              ))
            ) : (
              <li style={{ padding: '8px', color: '#888' }}>No members found</li>
            )}
          </ul>
        )}
      </div>

      <input 
        type="date" 
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        required
        style={{ padding: '8px' }}
      />
      
      {/* We keep the button disabled until a real ID is selected from the list */}
      <button type="submit" disabled={isChecking || !selectedMemberId} style={{ padding: '8px 15px' }}>
        {isChecking ? 'Checking...' : 'Check'}
      </button>

    </form>
  );
}