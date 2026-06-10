import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api';

function Home() {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p className="mb-3">
        Select one of the sections above to view Activities, Leaderboard, Teams, Users, or Workouts.
      </p>
      <p className="small text-muted">
        API base: <code>{apiBase}</code>
      </p>
      <p className="text-muted">
        If <code>VITE_CODESPACE_NAME</code> is not defined, the app uses a safe relative fallback instead of building an invalid GitHub Codespaces URL.
      </p>
    </div>
  );
}

function App() {
  return (
    <main className="container py-5">
      <header className="text-center mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">Modern React 19 + Vite frontend with react-router-dom navigation</p>
      </header>

      {codespaceName ? null : (
        <div className="alert alert-warning">
          <strong>Warning:</strong> <code>VITE_CODESPACE_NAME</code> is not defined. Add it to <code>.env.local</code> or <code>.env.local.example</code>.
        </div>
      )}

      <nav className="nav nav-pills justify-content-center gap-2 mb-4 flex-wrap">
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/activities" className="nav-link">
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className="nav-link">
          Leaderboard
        </NavLink>
        <NavLink to="/teams" className="nav-link">
          Teams
        </NavLink>
        <NavLink to="/users" className="nav-link">
          Users
        </NavLink>
        <NavLink to="/workouts" className="nav-link">
          Workouts
        </NavLink>
      </nav>

      <div className="card shadow-sm">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
