import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskList from "./TaskList";
import TaskPage from "./TaskPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/tasks" component={TaskList} />
        <Route path="/tasks/listadas" render={() => <TaskPage status="listadas" />} />
        <Route path="/tasks/iniciadas" render={() => <TaskPage status="iniciadas" />} />
        <Route path="/tasks/finalizadas" render={() => <TaskPage status="finalizadas" />} />
      </Switch>
    </Router>
  );
};

export default App;
