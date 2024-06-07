import { useState } from 'react'
import ProductList from './App/Components/product/ProductList';
import ProductForm from './App/Components/product/ProductForm';
import "./index.css"
import ItemForm from './App/Components/Item/ItemForm';
import ItemList from './App/Components/Item/ItemList';
import Holidays from './App/Pages/Holidays';

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="App">
      <h1>CRUD App with Redux Toolkit and Axios</h1>
      <h6 className='' style={{ marginBottom: 20 }}>json-server --watch db.json --port 5000</h6>
      <div className="forms">
        <ProductForm currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
        <ItemForm currentItem={currentItem} setCurrentItem={setCurrentItem} />
      </div>
      <div className="lists">
        <ProductList setCurrentProduct={setCurrentProduct} />
        <ItemList setCurrentItem={setCurrentItem} />
      </div>

      <div style={{ color: "black" }}>
        <h1>Holidays</h1>
        <Holidays />
      </div>
    </div>
  );
};

export default App;
