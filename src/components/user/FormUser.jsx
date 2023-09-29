import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import validator from "validator";

const attributeUser = {
    name: "name",
    email: "email",
    password: "password",
};

export default function FormUser() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState({
        [attributeUser.name]: "",
        [attributeUser.email]: "",
        [attributeUser.password]: "",
    });

    const [errors, setErrors] = useState({
        [attributeUser.name]: "",
        [attributeUser.email]: "",
        [attributeUser.password]: "",
    });

    useEffect(() => {
        if (userId) {
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                });
        }
    }, [userId]);

    const handleErrors = () => {
        const errorsFeedBack = {
            name: !user.name ? "Please provide a username" : "",
            email: !validator.isEmail(user.email)
                ? "Please provide a valid email"
                : "",
            password: !(user.password.length >= 6)
                ? "Password must more than 6 character"
                : "",
        };
        setErrors({ ...errorsFeedBack });
        return (
            !errorsFeedBack.name &&
            !errorsFeedBack.price &&
            !errorsFeedBack.description
        );
    };

    const handleChange = (e) => {
        let err;
        const key = e.target.name;
        const value = e.target.value;
        switch (e.target.name) {
            case attributeUser.name:
                err = !value ? "Please provide a username" : "";
                break;
            case attributeUser.email:
                err = !validator.isEmail(value)
                    ? "Please provide a valid email"
                    : "";
                break;
            case attributeUser.password:
                err = !(value && value.length >= 6)
                    ? "Password must more than 6 character"
                    : "";
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [key]: err }));
        setUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const canSave = handleErrors();

        if (!canSave) return;

        if (!userId) {
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        navigate("/user");
                    }
                });
        } else {
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${user.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        navigate("/user");
                    }
                });
        }
    };

    return (
        <>
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 className="display-5">User Infomation</h3>
                <Link to="/user">Back</Link>
            </div>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        >
                            User name
                        </label>
                        <div className="col-sm-9">
                            <input
                                value={user.name}
                                onChange={(e) => handleChange(e)}
                                name={attributeUser.name}
                                type="text"
                                className={classNames("form-control", {
                                    "is-invalid": errors.name,
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.name}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        >
                            User email
                        </label>
                        <div className="col-sm-9">
                            <input
                                value={user.email}
                                onChange={(e) => handleChange(e)}
                                name={attributeUser.email}
                                type="text"
                                className={classNames("form-control", {
                                    "is-invalid": errors.email,
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        >
                            User password
                        </label>
                        <div className="col-sm-9">
                            <input
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                                name={attributeUser.password}
                                className={classNames("form-control", {
                                    "is-invalid": errors.password,
                                })}
                                rows="3"
                                // type="password"
                            ></input>
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        ></label>
                        <div className="col-sm-9">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>{" "}
                            &nbsp;
                            <Link to="/user" className="btn btn-danger">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
