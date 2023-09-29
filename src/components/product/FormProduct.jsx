import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const productAttribute = {
    name: "name",
    price: "price",
    description: "description",
};

const priceRegex = /^\d+(?:[.,]\d+)*$/;

export default function FormProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();

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

    useEffect(() => {
        if (productId) {
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/products/${productId}`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setProduct(data)
                })
        }
    }, [productId])

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
        if (!canSave){
            return;
        }
        if (!product.id){
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/products`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product),
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    navigate('/product');
                }
            })            
        }
        else {
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/products/${productId}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product),
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    navigate('/product');
                }
            }) 
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
                            <Link to='/product' className="btn btn-danger">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
