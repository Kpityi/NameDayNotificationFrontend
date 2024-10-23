import './App.css';
import './styles/_globals.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navigation from './components/common/Navigation';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/RegistrationPage';
import { PATHS } from './common/constants/paths';

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Navigation />
      <main className="main-container">
        <Routes>
          <Route path={PATHS.root} element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.signup} element={<SignUpPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
