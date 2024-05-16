import React from "react";
import ReactDOM from "react-dom";
import ReactDemo from "./react.demo";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./styles.module.less";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ReactDemo />} />
      </Routes>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
