import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListProduct() {
    const [users, setUsers] = useState([]);

    const fetUserData = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    };

    useEffect(() => {
        fetUserData();
    }, []);

    const handleDelete = (userId) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`, {
            method: "DELETE",
        })
            .then(() => {
                fetUserData();
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    };

    return (
        <>
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 className="display-5">User Management</h3>
                <p>
                    <Link to="/user/create">Add new</Link>
                </p>
            </div>

            <div className="container">
                <div className="card-deck mb-3 text-center">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User name</th>
                                <th scope="col">User email</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={`/user/edit/${user.id}`} className="btn btn-primary mx-1">
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
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
