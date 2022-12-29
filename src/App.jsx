import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import NotFoundPage from "./pages/NotFoundPage";

import Main from "./main";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
