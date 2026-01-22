// import { Navigate } from "react-router-dom";
<<<<<<< HEAD

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
=======
>>>>>>> f2d7b99 (Resolve merge conflict)

// export default function ProtectedRoute({ children }) {
//   const user = localStorage.getItem("user");
//   const token = localStorage.getItem("token");

<<<<<<< HEAD
  // Not logged in → kick to login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow page
  return children;
=======
//   // Not logged in kick to login
//   if (!user || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Logged in allow page
//   return children;
// }


import { Outlet } from "react-router-dom";
import Layout from "./Layout";

export default function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem("token"); // or Firebase auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
>>>>>>> f2d7b99 (Resolve merge conflict)
}
