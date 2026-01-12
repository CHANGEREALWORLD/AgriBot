// src/layout/Layout.jsx

// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function Layout({ children }) {
//   return (
//     <div className="layout-root">
//       <Sidebar />
//       <div className="main-area">
//         <Navbar />
//         <main className="page-area">{children}</main>
//       </div>
//     </div>
//   );
// }


// function logout() {
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
//   window.location.href = "/login";
// }
// export { logout };

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-root">
      <Sidebar isOpen={sidebarOpen} />

      <div className="main-area">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main
          className="page-area"
          onClick={() => setSidebarOpen(false)}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
