import { Link } from "react-router-dom";


export default function FormUser(){
    return (
        <>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h3 className="display-5">User Infomation</h3>
        <Link to="/user">Back</Link>
    </div>
    
    <div className="container">
        <form >
            <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">User name</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" />
               
            </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">User price</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">User description</label>
                <div className="col-sm-9">
                    <textarea className="form-control" rows="3"></textarea>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-3 col-form-label"></label>
                <div className="col-sm-9">
                    <button type="submit" className="btn btn-primary">Save</button> &nbsp;
                    <button type="reset" className="btn btn-danger">Cancel</button>
                </div>
            </div>
        </form>
    </div>
        </>
    )
}