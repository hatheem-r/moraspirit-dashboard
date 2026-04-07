import { useState, useEffect, useRef } from 'react';

export default function AvailabilityForm({
  members,
  selectedMemberId,
  setSelectedMemberId,
  selectedDate,
  setSelectedDate,
  onSubmit,
  isChecking,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMember = (member) => {
    setSelectedMemberId(member.id);
    setSearchQuery(member.name);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedMemberId('');
    setIsDropdownOpen(true);
  };

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
    <form onSubmit={onSubmit} className="availability-form">

      {/* Searchable Member Input */}
      <div ref={dropdownRef} className="member-search-wrapper">
        <input
          type="text"
          placeholder="Search member..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
          required
          className="form-input"
          autoComplete="off"
        />

        {isDropdownOpen && searchQuery && (
          <ul className="dropdown-list">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <li key={member.id} onClick={() => handleSelectMember(member)}>
                  <span className="dropdown-item-name">{member.name}</span>
                  <span className="dropdown-item-role">{member.role}</span>
                </li>
              ))
            ) : (
              <li className="dropdown-empty">No members found</li>
            )}
          </ul>
        )}
      </div>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        required
        className="form-input"
      />

      <button
        type="submit"
        disabled={isChecking || !selectedMemberId}
        className="btn-primary"
      >
        {isChecking ? (
          <>
            <span className="btn-loading-dot" />
            <span className="btn-loading-dot" />
            <span className="btn-loading-dot" />
          </>
        ) : (
          'Check Status'
        )}
      </button>
    </form>
  );
}
