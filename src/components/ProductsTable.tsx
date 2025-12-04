import { useEffect, useMemo, useState } from "react";
import { type Product } from '../types/crud'
import "../styles/Table.css"

type Props = { 
    refreshFlag: boolean;
}

const ProductsTable = ({ refreshFlag } : Props) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [isTableLoading, setTableLoading ] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    const startRow = (page - 1) * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    const currentRows = products.slice(startRow, endRow);
    const totalPages = Math.ceil(products.length / rowsPerPage);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if(totalPages > 0 && page > totalPages){
            setPage(totalPages);
        }
    }, [rowsPerPage, totalPages]);

    // Compute visible page buttons. On mobile, limit to max 3 pages around the current page.
    const visiblePages = useMemo(() => {
        const maxMobilePages = 3;
        if (!isMobile) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // If total pages less than or equal to limit, show all
        if (totalPages <= maxMobilePages) return Array.from({ length: totalPages }, (_, i) => i + 1);

        // Try to center current page in the pagination when possible
        let startPage = Math.max(1, page - Math.floor(maxMobilePages / 2));
        let endPage = startPage + maxMobilePages - 1;

        // If endPage exceeds total, shift pagination to the left
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - maxMobilePages + 1;
        }

        const pages: number[] = [];
        for (let p = startPage; p <= endPage; p++) pages.push(p);
        return pages;
    }, [page, isMobile, totalPages]);
    

    useEffect(() => {
        setTableLoading(true);
        fetch(`${ import.meta.env.VITE_PRODUCTS_API_URL || "http://localhost:3000" }/products`)
            .then((response) => response.json())
            .then((response : { data: Product[] }) => setProducts(response.data))
            .catch(() => console.log("There was an error fetching the products"))
            .finally(() => {
                setTimeout(() => {
                    setTableLoading(false);
                }, 1000)
            });
    }, [refreshFlag]);

    const handleChangePage = (action : "next" | "prev") => {
        if (action === "next" && page < totalPages) {
            setPage(page + 1);
        }
        if (action === "prev" && page > 1) {
            setPage(page - 1);
        }
    }

    const handleChangeEntriesPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(parseInt(event.target.value))
    }

    return (
        <>
        <div className="container position-relative my-3">
            <div className={`position-absolute ${isTableLoading ? "" : "d-none"} d-flex w-100 h-100 top-0 start-0 justify-content-center align-items-center bg-light bg-opacity-50 z-2`}>
                <div className="spinner-border text-info" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="d-flex flex-row py-3 gap-2">
                <select id="entries" className="" defaultValue="5" onChange={(event) => handleChangeEntriesPerPage(event)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <span className="text-muted">Entries per page</span>
            </div>
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
            <nav aria-label="Table pagination">
                <ul className="pagination container d-block justify-content-between">
                    <div className="row align-items-center">
                        <div className="col-6 col-md-6">
                            <li className="text-muted">
                                Showing {startRow + 1} to {endRow <= products.length ? endRow : products.length} of {products.length} entries
                            </li>
                        </div>
                        <div className="col-6 col-md-6 d-flex justify-content-end text-muted z-1">
                            <li className="page-item cursor-pointer">
                                <a className="page-link border-0 text-muted" aria-label="Previous" onClick={() => handleChangePage("prev")}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            {visiblePages.map((p) => (
                                <li
                                key={p}
                                className={`page-item ${page === p ? "active" : ""}`}
                                >
                                    <button className="page-link border-0" onClick={() => setPage(p)}>
                                        {p}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item cursor-pointer">
                                <a className="page-link border-0 text-muted" aria-label="Next" onClick={() => handleChangePage("next")}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default ProductsTable;
