export default function StatusIndicator({ statusResult }) {
    if (!statusResult) return null;
  
    const isAvailable = statusResult.status !== 'busy';
  
    return (
      <div className={`status-card ${isAvailable ? 'available' : 'busy'}`}>
        <div className="status-dot-wrapper">
          <span className="status-dot" />
        </div>
        <div>
          <div className="status-label">
            {isAvailable ? 'Available' : 'Unavailable'}
          </div>
          <p className="status-message">
            {isAvailable ? (
              <>
                <strong>{statusResult.name}</strong> is free on {statusResult.requested_date}.
              </>
            ) : (
              <>
                <strong>Reason: </strong>{statusResult.reason}
              </>
            )}
          </p>
        </div>
      </div>
    );
  }
  