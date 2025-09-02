import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    price: number;
    stock: number;
    archived: number;
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
                        <th>id</th>
                        <th>name</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>archived</th>
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
                                    <td>{product.archived ? "Yes" : "No"}</td>
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
