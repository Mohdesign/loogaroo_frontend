import Image from "next/image"
import Link from "next/link"
export default function Services ({services}) {
    // services = services.sort(() => Math.random() - 0.5)
    return (
        <>
          <div className="content-warpper">  
            <section className="index-solutions">
            <div className="space-md">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="headline mb-0">
                        <div className="headline-content">
                        <h2 className="headline-title display-2">Our services</h2>
                        <p className="headline-subtitle">Our impact on your business</p>
                        </div>
                    </div>
                    </div>
                </div> 
                <div className="row justify-content-around">
                    <div className="col-lg-4 d-none d-lg-block">
                    <div className=" content-section">
                        <div className="sites">
                        <div className="site-screenshot">
                            <Image src="/images/solutions/website-development-4.svg" width={370} height={300} alt="" />
                        </div>

                        <div className="site-screenshot">
                            <Image src="/images/solutions/social-media-1.svg" width={370} height={300} alt="" />
                        </div>

                        <div className="site-screenshot">
                            <Image src="/images/solutions/the-kitchen-1.svg" width={370} height={300} alt="" />
                        </div>

                        <div className="site-screenshot">
                            <Image src="/images/solutions/digital-marketing.svg" width={370} height={300} alt="" />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-8 offset-0">
                    <div className="sidebar-section">
                        { services.map(service => (
                            <div className="sidebar-item" key={service.id}>
                            <div className="make-me-sticky">
                                <div className="solution-list">
                                <h3 className="headline-title display-3">{service.title}</h3>
                                <p className="headline-subtitle">Let’s build something great</p>
                                <Link href={`/services/${service.slug}`} >
                                <a  className="btn btn-lg btn-primary btn-solution mt-md-5 mt-2"> View More</a>
                                </Link>
                                </div>
                            </div>
                            </div>
                        ))}
                           
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 d-flex  justify-content-center align-content-center text-center  mt-5">
                    <Link href="/services">
                        <a className="btn btn-lg btn-primary btn-solution btn-lg py-3 px-5 mt-md-5 mt-3"> View all Services</a>
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        </>
    )
}