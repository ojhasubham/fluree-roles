import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import RoutesTree from './component/router';
import Database from "./component/Database";

function App() {
  return (
    <Database>
    <Router>
      <>
          <Route component={RoutesTree} />
      </>
    </Router>
    </Database>
  );
}

export default App;
