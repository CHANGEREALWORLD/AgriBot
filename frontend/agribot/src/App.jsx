import { Routes, Route, Navigate } from "react-router-dom";
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

import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import Layout from "./layout/Layout";



export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
       <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}></Route>
      <Route
        path="/login"
        element={
          <AuthRedirect>
            <Login />a
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

      {/*  PROTECTED ROUTES  */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/crop"
        element={
          <ProtectedRoute>
            <CropRecommend />
          </ProtectedRoute>
        }
      />

      <Route
        path="/yield"
        element={
          <ProtectedRoute>
            <YieldPredict />
          </ProtectedRoute>
        }
      />

      <Route
        path="/soil_input"
        element={
          <ProtectedRoute>
            <SoilHealth />
          </ProtectedRoute>
        }
      />

      <Route
        path="/disease"
        element={
          <ProtectedRoute>
            <DiseaseDetect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/disease/history"
        element={
          <ProtectedRoute>
            <DiseaseHistory />
          </ProtectedRoute>
        }
      />
      <Route path="/Weather"
      element={
    <ProtectedRoute>
      <Weather/>
    </ProtectedRoute>
  }
/>


      {/*  FALLBACK  */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

