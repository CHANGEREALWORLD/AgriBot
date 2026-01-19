// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.jsx";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import SoilHealth from "./pages/SoilHealth";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Weather from "./pages/Weather";
// import DiseaseHistory from "./pages/DiseaseHistory";
// import Profile from "./pages/Profile";
// import Layout from "./layout/Layout";


// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";

// import ProtectedRoute from "./components/ProtectedRoute";
// import AuthRedirect from "./components/AuthRedirect";

// export default function App() {
//   return (
//     <Routes>

//       {/* PUBLIC ROUTES */}
//       <Route
//         path="/login"
//         element={
//           <AuthRedirect>
//             <Login />
//           </AuthRedirect>
//         }
//       />

//       <Route
//         path="/signup"
//         element={
//           <AuthRedirect>
//             <Signup />
//           </AuthRedirect>
//         }
//       />

//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/Layout" element={<Layout />}></Route>
      

//       {/*  PROTECTED ROUTES  */}
//       <Route
//         path="/Dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop"
//         element={
//           <ProtectedRoute>
//             <CropRecommend />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield"
//         element={
//           <ProtectedRoute>
//             <YieldPredict />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/soil_input"
//         element={
//           <ProtectedRoute>
//             <SoilHealth />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease"
//         element={
//           <ProtectedRoute>
//             <DiseaseDetect />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease/history"
//         element={
//           <ProtectedRoute>
//             <DiseaseHistory />
//           </ProtectedRoute>
//         }
//       />
//       <Route path="/Weather"
//       element={
//     <ProtectedRoute>
//       <Weather/>
//     </ProtectedRoute>
//   }
// />


//       {/*  FALLBACK  */}
//       <Route path="*" element={<Navigate to="/" />} />

//     </Routes>
//   );
// }


// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Dashboard from "./pages/Dashboard.jsx";
// // import CropRecommend from "./pages/CropRecommend";
// // import YieldPredict from "./pages/YieldPredict";
// // import SoilHealth from "./pages/SoilHealth";
// // import DiseaseDetect from "./pages/DiseaseDetect";
// // import Weather from "./pages/Weather";
// // import DiseaseHistory from "./pages/DiseaseHistory";
// // import Profile from "./pages/Profile";

// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import ForgotPassword from "./pages/ForgotPassword";

// // import ProtectedRoute from "./components/ProtectedRoute";
// // import AuthRedirect from "./components/AuthRedirect";

// // export default function App() {
// //   return (
// //     <Routes>
// //       {/* PUBLIC ROUTES */}
// //       <Route
// //         path="/login"
// //         element={
// //           <AuthRedirect>
// //             <Login />
// //           </AuthRedirect>
// //         }
// //       />

// //       <Route
// //         path="/signup"
// //         element={
// //           <AuthRedirect>
// //             <Signup />
// //           </AuthRedirect>
// //         }
// //       />

// //       <Route path="/forgot-password" element={<ForgotPassword />} />

// //       {/* ROOT REDIRECT */}
// //       <Route path="/" element={<Navigate to="/dashboard" replace />} />

// //       {/* PROTECTED ROUTES */}
// //       <Route
// //         path="/dashboard"
// //         element={
// //           <ProtectedRoute>
// //             <Dashboard />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/profile"
// //         element={
// //           <ProtectedRoute>
// //             <Profile />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/crop"
// //         element={
// //           <ProtectedRoute>
// //             <CropRecommend />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/yield"
// //         element={
// //           <ProtectedRoute>
// //             <YieldPredict />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/soil_input"
// //         element={
// //           <ProtectedRoute>
// //             <SoilHealth />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/disease"
// //         element={
// //           <ProtectedRoute>
// //             <DiseaseDetect />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/disease/history"
// //         element={
// //           <ProtectedRoute>
// //             <DiseaseHistory />
// //           </ProtectedRoute>
// //         }
// //       />

// //       <Route
// //         path="/weather"
// //         element={
// //           <ProtectedRoute>
// //             <Weather />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* FALLBACK */}
// //       <Route path="*" element={<Navigate to="/dashboard" replace />} />
// //     </Routes>
// //   );
// // }




import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CropRecommend from "./pages/CropRecommend";
import YieldPredict from "./pages/YieldPredict";
import SoilHealth from "./pages/SoilHealth";
import DiseaseDetect from "./pages/DiseaseDetect";
import Weather from "./pages/Weather";
import DiseaseHistory from "./pages/DiseaseHistory";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthRedirect>
            <Signup />
          </AuthRedirect>
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />

      {/* ROOT */}
      {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      <Route path="/" element={<Home />} />

      {/* PROTECTED ROUTES WITH LAYOUT */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/crop" element={<CropRecommend />} />
        <Route path="/yield" element={<YieldPredict />} />
        <Route path="/soil_input" element={<SoilHealth />} />
        <Route path="/disease" element={<DiseaseDetect />} />
        <Route path="/disease/history" element={<DiseaseHistory />} />
        <Route path="/weather" element={<Weather />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
