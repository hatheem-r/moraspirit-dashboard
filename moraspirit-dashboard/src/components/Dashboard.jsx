import { useState, useEffect } from 'react';
import { getMembers, checkAvailability } from '../services/api';
import MemberList from './MemberList';
import AvailabilityForm from './AvailabilityForm';
import StatusIndicator from './StatusIndicator';
import SearchBar from './SearchBar';

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [statusResult, setStatusResult] = useState(null);
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

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingDirectory) {
    return (
      <div className="loading-state">
        <div className="loading-bar" />
        Loading Directory
      </div>
    );
  }

  return (
    <main className="dashboard-main">
      {error && (
        <div className="error-banner">
          <span>⚠</span> {error}
        </div>
      )}

      {/* Check Availability Section */}
      <section>
        <div className="section-label">
          <span className="section-label-text">Check Availability</span>
          <span className="section-label-line" />
        </div>
        <div className="glass-panel">
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
        </div>
      </section>

      {/* Member Directory Section */}
      <section>
        <div className="section-label">
          <span className="section-label-text">Member Directory</span>
          <span className="section-label-line" />
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MemberList members={filteredMembers} />
      </section>
    </main>
  );
}
