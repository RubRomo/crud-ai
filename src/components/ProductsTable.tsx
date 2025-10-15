import { useEffect, useState } from "react";
import { type Product } from '../types/crud'
import "../styles/Table.css"

type Props = { 
    refreshFlag: boolean;
}

const ProductsTable = ({ refreshFlag } : Props) => {

    const [products, setProducts] = useState<Product[]>([]);

    const rowsPerPage = 10;
    const [page, setPage] = useState(1);

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const totalPages = Math.ceil(products.length / rowsPerPage);

    const currentRows = products.slice(start, end);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((response : { data: Product[] }) => setProducts(response.data))
            .catch((error : Error) => console.log(error));
    }, [refreshFlag]);

    return (
        <>
        <div className="container my-3 my-md-5">
            <table className="table table-striped table-borderless">
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
                        currentRows.map((product: Product) => {
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
                    {Array.from({ length: rowsPerPage - currentRows.length }).map((_, i) => (
                        <tr className="empty-row" key={`empty-${i}`}>
                            <td colSpan={5}>&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-between">
                    <div>
                        <li className="text-muted">
                            Showing 1 to 10 of 57 entries
                        </li>
                    </div>
                    <div className="d-flex text-muted">
                        <li className="page-item cursor-pointer">
                            <a className="page-link border-0 text-muted" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li
                            key={i}
                            className={`page-item ${page === i + 1 ? "active" : ""}`}
                            >
                                <button className="page-link border-0" onClick={() => setPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item cursor-pointer">
                            <a className="page-link border-0 text-muted" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default ProductsTable;
