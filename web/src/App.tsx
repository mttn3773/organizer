import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigation } from "./components/Navigation";
import { Notify } from "./components/notify/Notify";
import { Routes } from "./pages/routes";
import { DataProvider } from "./store/globalStore";
function App() {
  return (
    <Box className="App">
      <DataProvider>
        <Navigation />
        <Notify />
        <Routes />
      </DataProvider>
    </Box>
  );
}

export default App;
