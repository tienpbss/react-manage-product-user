import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";

const productAttribute = {
    name: "name",
    price: "price",
    description: "description",
};

const priceRegex = /^\d+(?:[.,]\d+)*$/;

export default function FormProduct() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        price: "",
        description: "",
    });

    const handleErrors = () => {
        const errorsFeedBack = {
            name: !product.name ? "Please provide a valid name" : "",
            price:
                !product.price || !priceRegex.test(product.price)
                    ? "Please provide a valid price"
                    : "",
            description: !product.description
                ? "Please provide a valid description"
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
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        let err;
        const value = e.target.value;
        switch (e.target.name) {
            case productAttribute.name:
                err = !value ? "Please provide a valid name" : "";
                setErrors((prev) => ({ ...prev, name: err }));
                break;
            case productAttribute.price:
                err =
                    !value || !priceRegex.test(value)
                        ? "Please provide a valid price"
                        : "";
                setErrors((prev) => ({ ...prev, price: err }));
                break;
            case productAttribute.description:
                err = !value ? "Please provide a valid description" : "";
                setErrors((prev) => ({ ...prev, description: err }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const canSave = handleErrors();
        if (canSave){
            // fetch()
            console.log('save')
        }
    };

    return (
        <>
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 className="display-5">Product Infomation</h3>
                <Link to="/product">Back</Link>
            </div>

            <div className="container">
                <form>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        >
                            Product name
                        </label>
                        <div className="col-sm-9">
                            <input
                                value={product.name}
                                onChange={handleChange}
                                name={productAttribute.name}
                                type="text"
                                className={classNames("form-control", {
                                    "is-invalid": errors.name,
                                })}
                                required
                            />
                            <div className="invalid-feedback">
                                {" "}
                                {errors.name}{" "}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        >
                            Product price
                        </label>
                        <div className="col-sm-9">
                            <input
                                value={product.price}
                                onChange={handleChange}
                                name={productAttribute.price}
                                type="text"
                                className={classNames("form-control", {
                                    "is-invalid": errors.price,
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.price}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        >
                            Product description
                        </label>
                        <div className="col-sm-9">
                            <textarea
                                value={product.description}
                                onChange={handleChange}
                                name={productAttribute.description}
                                className={classNames("form-control", {
                                    "is-invalid": errors.description,
                                })}
                                rows="3"
                            ></textarea>
                            <div className="invalid-feedback">
                                {errors.description}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="inputPassword"
                            className="col-sm-3 col-form-label"
                        ></label>
                        <div className="col-sm-9">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save
                            </button>{" "}
                            &nbsp;
                            <button type="reset" className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
