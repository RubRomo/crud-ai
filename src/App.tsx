import FormAI from "./components/FormAI"
import ProductsTable from "./components/ProductsTable"

function App() {
  return (<>
    <div className="text-center">
      <h1 className="display-1">PRODUCTS CRUD AI</h1>
    </div>
    <ProductsTable />
    <FormAI />
  </>
  )
}

export default App
