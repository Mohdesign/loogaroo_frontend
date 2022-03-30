import Link from 'next/link';
import Layout from "@/components/Layout"
import Cta from "@/components/Cta"
import { API_URL } from "url.config"

export default function Services({ services }) {
    console.log(services);
    // services = services.sort(() => Math.random() - 0.5)
    return (
        <Layout title={"Services | websolutions.ca"}>
            <>
                <section className="services space-md  subpages">
                    <div className="container">
                        <div className="row d-flex align-content-center">
                            <div className="col-md-12">
                                <div className="headline mt-0 mb-0">
                                    { services.length === 0 && (
                                        <div className="headline-content solution-link">
                                            <h1 className="headline-title display-3">No services..</h1>
                                        </div>
                                    )}
                                    {services.data.map (service => (
                                        
                                        <div className="headline-content solution-link" key={service.id}>
                                        <Link  href={`/services/${service.attributes.slug}`}>
                                            <a>
                                                <h1 className="headline-title display-3">{service.attributes.title}</h1>
                                                <p className="headline-subtitle">{service.attributes.subtitle}</p>
                                            </a>
                                        </Link>
                                        </div>
                                    ))}

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

export async function getStaticProps(){
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const res = await fetch(`${API_URL}/api/services`)
    //const res = await fetch(`http://localhost:1337/api/services`)
    const services = await res.json();
    return {
        props: {services},
        revalidate: 1
    }
}