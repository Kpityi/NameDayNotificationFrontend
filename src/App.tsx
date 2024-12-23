import './App.css';
import './styles/_globals.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContenxt';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './components/pages/HomePage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/RegistrationPage';
import { PATHS } from './common/constants/paths';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ProfilPage from './components/pages/ProfilPage';
import Page404 from './components/pages/Page404';
import PostcardsPage from './components/pages/PostcardsPage';
import NameDay from './components/common/Nameday';
import UserProfilPage from './components/pages/UserProfilPage';
import UserNotificationsPage from './components/pages/UserNotificationsPage';
import AddNotificationPage from './components/pages/AddNotificationPage';
import FriendsPage from './components/pages/FriendsPage';
import AddFriendsPage from './components/pages/AddFriendPage';

function App(): JSX.Element {
  return (
    <UserProvider>
      <Router>
        <Header />
        <NameDay />
        <main className="main-container">
          <Routes>
            <Route path={PATHS.root} element={<HomePage />} />
            <Route path={PATHS.home} element={<Navigate to="/" />} />
            <Route path={PATHS.postcards} element={<PostcardsPage />} />
            <Route path={PATHS.login} element={<LoginPage />} />
            <Route path={PATHS.signup} element={<SignUpPage />} />
            <Route path={`${PATHS.confirmation}/${PATHS.params.token}`} element={<ConfirmationPage />} />
            <Route path={PATHS.profil} element={<PrivateRoute element={<ProfilPage />} />} />
            <Route path={PATHS.user} element={<PrivateRoute element={<UserProfilPage />} />} />
            <Route path={PATHS.notifications} element={<PrivateRoute element={<UserNotificationsPage />} />} />
            <Route
              path={`${PATHS.notifications}/${PATHS.create}`}
              element={<PrivateRoute element={<AddNotificationPage />} />}
            />
            <Route path={`${PATHS.friends}`} element={<PrivateRoute element={<FriendsPage />} />} />
            <Route path={`${PATHS.friends}/${PATHS.create}`} element={<PrivateRoute element={<AddFriendsPage />} />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/hu_HU/sdk.js#xfbml=1&version=v21.0&appId=632934529077400"
          ></script>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}
export default App;
