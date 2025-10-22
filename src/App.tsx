import { useState } from "react";
import ChatAI from "./components/ChatAI"
import ProductsTable from "./components/ProductsTable"
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {

  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  return (
    <>
      <Header />
      <div className="text-center">
        <h1 className="display-3 my-3 my-md-4">PRODUCTS CRUD AI</h1>
      </div>
      <ProductsTable refreshFlag={refreshFlag} />
      <ChatAI refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
      <Footer />
    </>
  )
}

export default App
