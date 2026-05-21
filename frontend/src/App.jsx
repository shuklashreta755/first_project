import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login    from "./Login";
import Register from "./Register";
import Home     from "./Home";
import ChatHub from "./pages/ChatHub"
import Checkout from "./Checkout.jsx"

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/"      element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          
        />

        <Route path="/chat-hub" element={<ChatHub />} />
          
            <Route path="/payment" element={<Checkout />} />

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
