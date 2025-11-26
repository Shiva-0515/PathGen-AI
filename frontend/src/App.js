// import './App.css';
// import MarketingPage from './MarketingPage';
// import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
// import SignIn from  './components/Signin';
// import SignUp from  './components/Signup';
// import RoadmapFlow from './components/RoadmapFlow';
// import QuizSelector from './components/QuizSelector';
// import ProtectedRoute from './ProtectedRoute';  
// import Pricing from './components/Pricing';
// import FAQ from './components/FAQ';
// import AppTheme from './AppTheme';
// import AppAppBar from './components/AppAppBar';
// function App() {
//   return (
//     <AppTheme>
//         <Router>
//           {/* Global AppBar */}
//           {/* <AppAppBar /> */}

//           {/* Routes */}
//           <Routes>
//             <Route path="/" element={<MarketingPage />} />

//             <Route
//               path="/roadmap"
//               element={
//                 <ProtectedRoute>
//                   <RoadmapFlow />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/login" element={<SignIn />} />
//         <Route path="/register" element={<SignUp />} />
//             <Route
//               path="/quiz"
//               element={
//                 <ProtectedRoute>
//                   <QuizSelector />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="/pricing" element={<Pricing />} />
//             <Route path="/faq" element={<FAQ />} />
//           </Routes>
//         </Router>
//     </AppTheme>
//   );
// }

// export default App;





import './App.css';
import MarketingPage from './MarketingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import RoadmapFlow from './components/RoadmapFlow';
import QuizSelector from './components/QuizSelector';
import ProtectedRoute from './ProtectedRoute';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import AppTheme from './AppTheme';
// import AppAppBar from './components/AppAppBar';
import { useEffect, useState } from 'react';

function DesktopGuard({ children }) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="mobile-blocker">
        <div className="mobile-blocker-card">
          <h1 className="mobile-blocker-title">Not Found on this Device</h1>
          <p className="mobile-blocker-text">
            This website is optimized for desktop screens.
            <br />
            Please open it on a laptop or desktop for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

function App() {
  return (
    <AppTheme>
      <DesktopGuard>
        <Router>
          {/* <AppAppBar /> */}
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
      </DesktopGuard>
    </AppTheme>
  );
}

export default App;
