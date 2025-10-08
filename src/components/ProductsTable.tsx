import { useEffect, useState } from "react";
import { type Product } from '../types/crud'


type Props = { 
    refreshFlag: boolean;
}

const ProductsTable = ({ refreshFlag } : Props) => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((response : { data: Product[] }) => setProducts(response.data))
            .catch((error : Error) => console.log(error));
    }, [refreshFlag]);

    return (
        <div className="container mt-5">
            <table className="table table-striped">
                <thead>
                    <tr className="table-dark">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product: Product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.active ? "Yes" : "No"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
