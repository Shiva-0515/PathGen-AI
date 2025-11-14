import './App.css';
import MarketingPage from './MarketingPage';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import SignIn from  './components/Signin';
import SignUp from  './components/Signup';
import RoadmapFlow from './components/RoadmapFlow';
import QuizSelector from './components/QuizSelector';
import ProtectedRoute from './ProtectedRoute';  
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import AppTheme from './AppTheme';
import AppAppBar from './components/AppAppBar';
function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<MarketingPage />} />
    //     <Route path="/roadmap" element={
    //       <ProtectedRoute>
    //       <RoadmapFlow />
    //       </ProtectedRoute>} />
    //     <Route path="/login" element={<SignIn />} />
    //     <Route path="/register" element={<SignUp />} />
    //     <Route path="/quiz" element={
    //       <ProtectedRoute>
    //       <QuizSelector />
    //       </ProtectedRoute>} />
    //     <Route path="/pricing" element={<Pricing />} />
    //     <Route path="/faq" element={<FAQ />} />

    //   </Routes>
    // </Router>
    <AppTheme>
        <Router>
          {/* Global AppBar */}
          {/* <AppAppBar /> */}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<MarketingPage />} />

            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <RoadmapFlow />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <QuizSelector />
                </ProtectedRoute>
              }
            />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Router>
    </AppTheme>
  );
}

export default App;
