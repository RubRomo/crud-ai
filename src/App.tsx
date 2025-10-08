import { useState } from "react";
import FormAI from "./components/FormAI"
import ProductsTable from "./components/ProductsTable"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {

  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <div className="text-center">
        <h1 className="display-3">PRODUCTS CRUD AI</h1>
      </div>
      <ProductsTable refreshFlag = { refreshFlag } />
      <FormAI refreshFlag={ refreshFlag } setRefreshFlag={ setRefreshFlag } />
      <Footer />
    </>
  )
}

export default App
