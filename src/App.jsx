import { useState } from "react";
import ChatGPTComponent from "./ChatGPTComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import RecipeForm from "./RecipeForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ChatGPTComponent />} />
          <Route path="/recipes" element={<RecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
