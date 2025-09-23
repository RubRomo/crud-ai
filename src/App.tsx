import { useState } from "react";
import FormAI from "./components/FormAI"
import ProductsTable from "./components/ProductsTable"

function App() {

  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  return (<>
    <div className="text-center">
      <h1 className="display-1">PRODUCTS CRUD AI</h1>
    </div>
    <ProductsTable refreshFlag = { refreshFlag } />
    <FormAI refreshFlag={ refreshFlag } setRefreshFlag={ setRefreshFlag } />
  </>
  )
}

export default App
