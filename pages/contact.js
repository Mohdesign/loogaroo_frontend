import Header from "@/components/Header"
import Layout from "@/components/Layout"
import Cta from "@/components/Cta"

export default function Contact() {
    return (
        <Layout title={"Contact | websolutions.ca"}> 
        <>
            <Header title={"Contact us"} subtitle={"Have Any Questions? We Can Help"} />

            <section className="contact">
                <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <form className="">
                        <div className="row">
                            <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="" placeholder="Name" />
                            </div>
                            <div className="form-group col-md-6">
                            <input type="email" className="form-control" id="" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-12">
                            <textarea className="form-control" id="" rows="3" placeholder="Message" ></textarea>
                            </div>
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-lg btn-primary ml-auto">Send Message</button>
                        </div>
                    </form>
                    </div>

                    <div className="col-lg-4 mb-5">
                    <div className="contact_details_row ">
                        <div className="c_con">
                        <span className="c_title">Address</span>
                        <span className="c_detail">               
                            <span className="c_desc">467 Main St. Suite #1 Bathurst NB E2A 1B1 Canada </span>
                        </span>             
                        </div>
                    </div>

                    <div className="contact_details_row">
                        <div className="c_con">
                        <span className="c_title">Telephone</span>
                        <span className="c_detail">
                            <span className="c_name">Office :</span>
                            <span className="c_desc">+1 506-547-8906</span>
                        </span>
                        <span className="c_detail">
                            <span className="c_name">Fax :</span>
                            <span className="c_desc">+1 506-545-6732</span>
                        </span>             
                        </div>
                    </div>          

                    <div className="contact_details_row">
                        <div className="c_con">
                        <span className="c_title">Email </span>
                        <span className="c_detail">
                            <span className="c_name">Questions:</span>
                            <span className="c_desc"><a href="mailto:info@websolutions.ca"> info@websolutions.ca</a></span>
                        </span>
                        </div>
                    </div> 

                    <div className="contact_details_row">
                        <div className="c_con">
                        <span className="c_title">Social Media </span>
                        
                        <span className="c_detail">
                            <span className="c_name">Facebook:</span>
                            <span className="c_desc"><a href="https://www.facebook.com/websolutions.ca/" title="" target="_blank">@websolutions.ca</a></span>
                        </span>
                        <span className="c_detail">
                            <span className="c_name">Instagram:</span>
                            <span className="c_desc"><a href="https://www.instagram.com/websolutions.ca/?hl=en" title="" target="_blank">@websolutions.ca</a></span>
                        </span>
                        </div>
                    </div>          
                    </div>
                </div>
                </div>
                
            </section>
            <Cta title={"We guide users to their best experiences."} btn={"Let's Get Started"}/>
        </>
        </Layout>
    )
}