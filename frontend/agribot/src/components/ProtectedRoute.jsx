// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Not logged in → kick to login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow page
  return children;
}
