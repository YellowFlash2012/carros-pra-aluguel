const DefaultLayout = (props) => {
    return (
        <div>
            <div className="header bs1">
                <div className="d-flex justify-content-between">
                    <h1>DeborahCars</h1>

                    
                </div>
            </div>
            <div className="content mt-5">
                {props.children}
            </div>
        </div>
    );
};
export default DefaultLayout;
