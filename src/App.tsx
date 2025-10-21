import { useState } from "react";
import FormAI from "./components/FormAI"
import ProductsTable from "./components/ProductsTable"
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {

  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  return (
    <>
      <Header />
      <div className="text-center">
        <h1 className="display-3 my-3 my-md-5">PRODUCTS CRUD AI</h1>
      </div>
      <ProductsTable refreshFlag={refreshFlag} />
      <FormAI refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
      <Footer />
    </>
  )
}

export default App
