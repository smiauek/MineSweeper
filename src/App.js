import React from "react";
import { Route, Routes } from "react-router-dom";
import useQuery from "./utils/useQuery";
import NotFound from "./components/NotFound";
import Grid from "./components/Grid";
import ChooseGrid from "./components/ChooseGrid";
import Header from "./components/Header";

function App() {
  const query = useQuery();
  const width = query.get("width");
  const heigth = query.get("heigth");

  return (
    <>
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route path="/" element={<ChooseGrid />} />
          <Route
            path="/play"
            element={<Grid width={width} heigth={heigth} />}
          />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
