import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";
import { GoalNew } from "./GoalNew";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;