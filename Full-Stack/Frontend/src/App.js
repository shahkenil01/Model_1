import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Registration from "./Pages/Registeration";
import ProductTable from "./Pages/ProductTable";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/ProductTable" element={<ProductTable />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;