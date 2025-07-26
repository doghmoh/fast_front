import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import LoginPage from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import Home from "./components/Home";
import Header from "./components/Header";

const App = () => {
  const { user, logout, isAuthLoading } = useAuth();

  if (isAuthLoading) return <Loader />;

  return (
    <Router>
      {user ? (
        <div className="min-h-screen bg-gray-50">
          <Navigation onLogout={logout} />
          <main className="lg:ml-64 min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Catch-all route for 404 */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
