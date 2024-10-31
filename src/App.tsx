import './App.css';
import './styles/_globals.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/RegistrationPage';
import { PATHS } from './common/constants/paths';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ProfilPage from './components/pages/ProfilPage';

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path={PATHS.root} element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.signup} element={<SignUpPage />} />
          <Route path={`${PATHS.confirmation}/${PATHS.params.token}`} element={<ConfirmationPage />} />
          <Route path={`${PATHS.profil}`} element={<ProfilPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
