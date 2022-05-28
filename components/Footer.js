export default function Footer () {
 
    return (
        <>
      <footer className="front-end footer pb-5">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="row mt-md-5 mt-0">
                        <div className="col-md-12">
                            <ul className="list-unstyled p-0">
                                <li className="pr-2"><a href="#" target="_blank"><i className="fab fa-facebook"></i></a></li>
                                <li className="pr-2"><a href="#" target="_blank"><i className="fab fa-flickr"></i></a></li>
                                <li className="pr-2"><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                <li className="pr-2"><a href="#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="copy"> &copy; 
                    {new Date().getFullYear()} 
                    &nbsp;Loogaroo.com </div>
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}