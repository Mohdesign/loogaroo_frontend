import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";
export default function Contact ({contact}) {
    return (
        <>
        {contact.data.attributes ? (
        <section className="space-sm">
        <div id="contact" className="container">
            <div className="row d-flex align-content-center text-center">
                <div className="col-md-12">
                    <div className="headline mt-0 mb-0">
                        <div className="headline-content">
                            <h2 className="headline-title display-4">{ contact.data.attributes.title} </h2>
                         </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                        <p className="headline-subtitle">
                        { contact.data.attributes.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-8 ">
                    <iframe frameBorder={0} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10883.73611581096!2d-65.5652105!3d47.0022683!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf41868b7427f3a6e!2sLoogaroo!5e0!3m2!1sen!2sca!4v1648482101406!5m2!1sen!2sca" width="100%" height="350"  allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div> 

                <div className="col-md-4">
                    <div className="row mt-4 ml-4">
                        <div className="col-md-12 contact-info">
                            <p>
                                <strong>Address</strong><br/>
                                { contact.data.attributes.address}
                            </p>
                        </div>
                
                        <div className="col-md-12 contact-info">
                            <p>
                                <strong>Contact Info</strong>
                                <a href={`mailto:${contact.data.attributes.email}`}>{ contact.data.attributes.email} </a>
                                <a href= {`tel:${contact.data.attributes.phone}`}>{ contact.data.attributes.phone}</a>
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
        ) : (
            <p> NO CONTACT API</p>
        )}
        </>
    )
}