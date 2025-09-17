import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    price: number;
    stock: number;
    active: number;
};

const ProductsTable = () => {

    const [products, setProducts] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((response : { data: User[] }) => setProducts(response.data))
            .catch((error : Error) => console.log(error));
    }, []);

    return (
        <div className="container mt-5">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product: User) => {
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
