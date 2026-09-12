import { Routes, Route } from "react-router-dom";
import BranchListPage from "./pages/BranchListPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CallPage from "./pages/CallPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BranchListPage />} />
      <Route path="/admin/:branchId" element={<AdminPage />} />
      <Route path="/call" element={<CallPage />} />
    </Routes>
  );
}
