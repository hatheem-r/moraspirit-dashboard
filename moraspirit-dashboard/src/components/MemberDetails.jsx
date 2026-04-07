import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMembers, checkAvailability } from '../services/api';
import StatusIndicator from './StatusIndicator';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function MemberDetails() {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const data = await getMembers();
        const foundMember = data.members.find((m) => m.id === id);
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

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    setIsChecking(true);
    setStatusResult(null);
    setCheckError(null);
    try {
      const result = await checkAvailability(id, selectedDate);
      setStatusResult(result);
    } catch (err) {
      setCheckError('Failed to check availability.');
    } finally {
      setIsChecking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-bar" />
        Loading Profile
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="member-details-page">
        <div className="error-banner">⚠ {profileError}</div>
        <Link to="/" className="back-link">
          <span className="back-link-icon">←</span> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="member-details-page">
      <Link to="/" className="back-link">
        <span className="back-link-icon">←</span> Back to Directory
      </Link>

      {/* Profile Card */}
      <div className="member-profile-card">
        <div className="member-profile-avatar">
          {getInitials(member.name)}
        </div>
        <h2 className="member-profile-name">{member.name}</h2>
        <p className="member-profile-role">{member.role}</p>
        <div className="member-profile-id">
          <span className="member-profile-id-label">ID</span>
          {member.id}
        </div>
      </div>

      {/* Availability Check Card */}
      <div className="availability-check-card">
        <h3 className="avail-check-title">Check Availability</h3>

        <form onSubmit={handleCheck} className="avail-check-form">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            className="form-input"
          />
          <button
            type="submit"
            disabled={isChecking || !selectedDate}
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

        {checkError && <div className="error-banner" style={{ marginTop: '16px' }}>⚠ {checkError}</div>}
        <StatusIndicator statusResult={statusResult} />
      </div>
    </div>
  );
}
