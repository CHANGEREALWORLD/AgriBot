// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function Layout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="layout-root">
//       <Sidebar isOpen={sidebarOpen} />

//       <div className="main-area">
//         <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <main
//           className="page-area"
//           onClick={() => setSidebarOpen(false)}
//         >
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      {/* sidebar / navbar */}
      <Outlet />
    </div>
  );
}
