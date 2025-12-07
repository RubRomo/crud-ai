import { useState } from "react";
import ChatAI from "./components/ChatAI"
import ProductsTable from "./components/ProductsTable"
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {

  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="text-center">
        <h1 className="display-3 my-4 my-md-5">PRODUCTS CRUD AI</h1>
      </div>
      <div className="container flex-grow-1">
        <div className="row mb-lg-5">
          <div className="col-12 col-lg-6">
            <ProductsTable refreshFlag={refreshFlag} />
          </div>
          <div className="col-12 col-lg-6 d-flex py-4 py-lg-0">
            <ChatAI refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
