import Layout from "@/components/Layout"
import Cta from "@/components/Cta"
import Image from "next/image";
import moment from  "moment"
import ReactMarkdown from "react-markdown";
//import { API_URL } from 'url.config';
import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//translation
import useTranslation from 'next-translate/useTranslation'



export default function SingleService( {service} ) {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    {console.log(service.attributes)}
    const router = useRouter();
    const { t } = useTranslation();

    const deleteService = async () => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            const res = await fetch(`${API_URL}/api/services/${service.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
             if (!res.ok) {
                toast.error(data.message);
                return;
            }else
            {
                toast.success("Service deleted successfully");
                // toast remove all
                setTimeout(() => {
                    toast.dismiss();
                }, 1000);
              
                //wait for 2 seconds
                setTimeout(() => {
                    router.push("/services");
                }, 1200);
            }
        }
    };
    
    return (
        
       <Layout title={"Services | " + service.attributes.title}>
           <>
           <ToastContainer />
           <header className="space-md subpages">
               <div className="container">
                   <div className="row d-flex align-content-center">
                       <div className="col-lg-6">
                           <div className="headline mt-0 mb-0">
                               <div className="headline-content">
                                   {/* <Link href={`/services/edit/${service.id}`}><a className="btn btn-warning">EDIT SERVICE</a></Link>
                                   <button onClick={deleteService} className="btn btn-danger">DELETE SERVICE </button> */}
                                   <h1 className="headline-title display-3">{service.attributes.title}</h1>
                                   <p className="headline-subtitle">{service.attributes.subtitle}</p>
                                   <small>{moment(service.attributes.publishedAt).format("yyyy-MM-DD")}</small>
                                   <p className="headline-subtitle">{service.attributes.desc}</p>
                               </div>
                           </div>
                       </div>
                       <div className="col-lg-5 offset-lg-1">
                           <div className="cms-group mt-3" style={{'display':'block'}}>
                           { service.attributes.thumbnail.data !== null ?
                            <Image
                                src={service.attributes.thumbnail.data.attributes.url }
                                alt="Picture of the author"
                                width={ service.attributes.thumbnail.data.attributes.width }
                                height={ service.attributes.thumbnail.data.attributes.height}
                                layout="responsive"
                            />
                            :
                             "NO IMAGE TO DISPLAY"
                           }
                           </div>
                       </div>
                   </div>
               </div>
           </header>

           <section className="solutions bg-light">
               <div className="container">
                   <div className="row d-flex justify-content-start space-md">
                       <div className="col-lg-3 order-lg-1 order-12">
                           <ul className="list-unstyled project-intro">
                               <li className="title">Related case studies</li>
                               <li><a href="#">Design & Branding</a></li>
                               <li><a href="#">Social Media Management</a></li>
                               <li><a href="#">Custom Management Systems</a></li>
                               <li><a href="#">Digital Marketing</a></li>
                           </ul>
                       </div>
                       <div className="col-lg-7 offset-lg-1 order-1 custome_content">
                
                       {/* <ReactMarkdown escapeHtml={false}>{service.attributes.content}</ReactMarkdown> */}
                       
                       <div dangerouslySetInnerHTML={{__html: service.attributes.content}}/>
                        
                               <div className="cms-group mt-5">
                               <h3 className="mt-0 mb-2 font-weight-bold">Related case studies</h3>
                               <a href="#\" className="mr-1">
                               <div className="cms-list">
                                   <p>Club Des Amis</p>
                               </div>
                               </a>
                               <a href="#\" className="mr-1">
                               <div className="cms-list">
                                   <p>Rogers Electric Motor Service</p>
                               </div>
                               </a>
                               <a href="#\" className="mr-1">
                               <div className="cms-list">
                                   <p>Go To Insure</p>
                               </div>
                               </a>
                               
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



export async function getStaticPaths({locales}) {
    const services = await fetchAPI("/services?populate=*", { fields: ["slug"] });
  
    return {
      paths: services.data.map((service) => ({
        params:({  locale: 'en-US', slug: service.attributes.slug}),
         
      })),
       fallback: 'blocking',
    };
  }
  
  export async function getStaticProps({ params, locale }) {
    const services = await fetchAPI("/services", {
      filters: {
        slug: params.slug,
      },
      populate: [ "thumbnail"],
       
    });
  
    return {
      props: { 
          service: services.data[0],
          locale: locale
        },
      revalidate: 1,
    };
  }