import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListProduct() {
    const [products, setProducts] = useState([]);

    const fetchProductData = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/products`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProducts(data);
            });
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const handleEdit = () => {};
    const handleDelete = (productId) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/products/${productId}`, {
            method: "DELETE",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                fetchProductData();
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    };

    return (
        <>
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 className="display-5">Product Management</h3>
                <p>
                    <Link to="/product/create">Add new</Link>
                </p>
            </div>

            <div className="container">
                <div className="card-deck mb-3 text-center">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                return (
                                    <tr key={product.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Link
                                                to={`/product/edit/${product.id}`}
                                                onClick={handleEdit}
                                                className="btn btn-primary mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
