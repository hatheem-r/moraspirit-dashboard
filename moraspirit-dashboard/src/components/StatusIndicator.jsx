export default function StatusIndicator({ statusResult }) {
    // If no check has been performed yet, don't show anything
    if (!statusResult) return null; 
  
    const isAvailable = statusResult.status !== 'busy';
  
    return (
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        border: `2px solid ${isAvailable ? 'green' : 'red'}`, 
        borderRadius: '8px',
        backgroundColor: isAvailable ? '#e6ffe6' : '#ffe6e6'
      }}>
        {isAvailable ? (
          <div>
            <h3 style={{ color: 'green', margin: '0 0 10px' }}>Available</h3>
            <p style={{ margin: 0 }}><strong>{statusResult.name}</strong> is available on {statusResult.requested_date}.</p>
          </div>
        ) : (
          <div>
            <h3 style={{ color: 'red', margin: '0 0 10px' }}>Busy</h3>
            <p style={{ margin: 0 }}><strong>Reason:</strong> {statusResult.reason}</p>
          </div>
        )}
      </div>
    );
  }