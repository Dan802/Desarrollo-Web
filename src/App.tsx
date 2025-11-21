// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home.tsx';
import Form from './views/Form.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" component={Form} />
      </Switch>
    </Router>
  );
};

export default App;
