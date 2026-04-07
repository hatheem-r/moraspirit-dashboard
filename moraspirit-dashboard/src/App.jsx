import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MemberDetails from './components/MemberDetails'; // We will create this next

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
          <h1 style={{ margin: 0 }}>MoraSpirit Web Pillar - Technical Task</h1>
        </header>
        
        <Routes>
          {/* The Home Page */}
          <Route path="/" element={<Dashboard />} />
          
          {/* The Dynamic Profile Page. The ":id" part is a variable we can read later */}
          <Route path="/member/:id" element={<MemberDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;