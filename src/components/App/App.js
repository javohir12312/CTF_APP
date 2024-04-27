import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Error from "../Error/Error";
import FullGet from "../../Store/FullGet";
import Voices from "../Voices/Voices";
import Category from "../Category/Category";
import About from "../About/About";

const App = () => { 
  FullGet();
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="voices" element={<Voices />} />
        <Route path=":id" element={<Category />} />
      </Route>
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
