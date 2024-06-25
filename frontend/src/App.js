import "./App.css";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signuppage from "./Pages/Signuppage";
import Mainpage from "./Pages/Mainpage";
import Selectpage from "./Pages/Selectpage";
import Seatpage from "./Pages/Seatpage";
import DetailsPay from "./Pages/DetailsPay";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/select" element={<Selectpage />} />
            <Route path="/seat" element={<Seatpage />} />
            <Route path="/detailsPay" element={<DetailsPay />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
