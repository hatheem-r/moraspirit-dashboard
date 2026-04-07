export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search members by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    );
  }