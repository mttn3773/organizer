import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Notify } from "./components/notify/Notify";
import { Routes } from "./pages/routes";
import { GlobalState } from "./store/globalStore";
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
