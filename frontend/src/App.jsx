import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";
import { GoalNew } from "./GoalNew";
import { GoalsIndex } from "./GoalsIndex";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function Tracker() {
  return <div className="p-8 text-3xl">トラッカー画面</div>;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/goals/new" element={<GoalNew />} />
        <Route path="/goals" element={<GoalsIndex />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;