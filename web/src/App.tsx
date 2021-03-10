import React from "react";
import { Notify } from "./components/notify/Notify";
import { Routes } from "./pages/routes";
import { DataProvider } from "./store/globalStore";
function App() {
  return (
    <div className="App">
      <DataProvider>
        <Notify />
        <Routes />
      </DataProvider>
    </div>
  );
}

export default App;
