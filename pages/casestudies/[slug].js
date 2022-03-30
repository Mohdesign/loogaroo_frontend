import Image from "next/image";
import Layout from "@/components/Layout"
import Cta from "@/components/Cta"
import { API_URL } from 'url.config';
import { useRouter} from 'next/router';
//translation
import useTranslation from 'next-translate/useTranslation'
 
export default function SingleCase( {casestudy} ) {
    // const router = useRouter();
    // const { t } = useTranslation();

    return (
       <Layout title={"Case Studies | " + casestudy.title} >
           <>
           <header className="space-md subpages">
               <div className="container">
                   <div className="row d-flex align-content-center">
                       <div className="col-lg-6">
                           <div className="headline mt-0 mb-0">
                               <div className="headline-content">
                                   <h1 className="headline-title display-3">{casestudy.title}</h1>
                                   <p className="headline-subtitle">{casestudy.desc}</p>
                               </div>
                           </div>
                       </div>
                       <div className="col-lg-5 offset-lg-1">
                           <div className="cms-group mt-3">
                           <h3 className="mt-3 mb-2 font-weight-bold">Other Case Studies</h3>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Funeral homes</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Machinery</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Cinemas</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Tourism</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Sports</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Restaurant</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Dealership</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Hotel</p>
                               </div>
                           </a>
                           <a href="#\" className="mr-1">
                               <div className="cms-list">
                               <p>Architect</p>
                               </div>
                           </a>
                           </div>
                       </div>
                   </div>

               </div>
           </header>

           <section className="solutions">
               <div className="container">
                   <figure> <Image src="/images/solutions/img-1.jpg" 
                   width={1410} 
                   height={940} 
                   layout="responsive"
                   alt="" className="img-fluid" /> </figure>
                   <div className="row d-flex justify-content-start space-md">
                       <div className="col-lg-3 order-lg-1 order-12">
                           <ul className="list-unstyled project-intro">
                               <li className="title">Deliverables</li>
                               <li>UX</li>
                               <li>Visual Design</li>
                               <li>Development</li>
                               <li>Creative Direction</li>
                           </ul>
                       </div>
                       <div className="col-lg-7 offset-lg-1 order-1">
                           <p className="h4"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  .</p>
                           <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                           <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                       </div>
                   </div>
                   
                   <div className="row">
                       <div className="col-md-12">
                           <figure> <Image src="/images/solutions/img-2.jpg" width={1030} height={3249} alt="" className="md-img img-fluid" /> </figure>
                       </div>
                   </div>
                   <div className="row space-md">
                   <div className="col-lg-8">
                       <h3>You are not the same as your competition, so why should your website look like your competition? With a custom website from Websolution.ca you will attract new potential customers.</h3> 
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-md-12">
                       <figure> <Image src="/images/solutions/img-4.jpg" width={1410} height={896} alt="" className="img-fluid" /> </figure>
                       <figure className="mt-5 pt-5"> <Image src="/images/solutions/img-5.jpg" width={1030} height={2201} alt="" className="md-img img-fluid" /> </figure>
                   </div>
                   </div>
                   <div className="row space-md">
                   <div className="col-md-10 offset-md-1">
                       <h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  .</h4>
                       <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a href="https://www.elhatton.com/" target="_blank" title="">Elhatton</a>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                       <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <a href="#\">Duis aute irure dolor in reprehenderit</a> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                       <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <b>BOLD TEXT cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nibh tortor id aliquet lectus. Malesuada fames ac turpis egestas integer eget aliquet nibh. Arcu ac tortor dignissim convallis aenean et</b>. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. A pellentesque sit amet porttitor eget dolor. Est ullamcorper eget nulla facilisi. Non diam phasellus vestibulum lorem sed. Quis commodo odio aenean sed adipiscing diam donec. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Ut pharetra sit amet aliquam id diam. Turpis nunc eget lorem dolor sed. Semper eget duis at tellus at urna condimentum mattis pellentesque. Lectus proin nibh nisl condimentum id. Mauris a diam maecenas sed enim. Leo duis ut diam quam nulla porttitor massa id. Varius duis at consectetur lorem donec massa sapien faucibus et. Imperdiet sed euismod nisi porta lorem mollis aliquam.</p>
                       <h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h4>
                       <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nibh tortor id aliquet lectus. Malesuada fames ac turpis egestas integer eget aliquet nibh. Arcu ac tortor dignissim convallis aenean et. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. A pellentesque sit amet porttitor eget dolor. Est ullamcorper eget nulla facilisi. Non diam phasellus vestibulum lorem sed. Quis commodo odio aenean sed adipiscing diam donec. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Ut pharetra sit amet aliquam id diam. Turpis nunc eget lorem dolor sed. Semper eget duis at tellus at urna condimentum mattis pellentesque. Lectus proin nibh nisl condimentum id. Mauris a diam maecenas sed enim. Leo duis ut diam quam nulla porttitor massa id. Varius duis at consectetur lorem donec massa sapien faucibus et. Imperdiet sed euismod nisi porta lorem mollis aliquam.</p>
                       <h2>Turpis nunc eget lorem dolor sed:</h2>
                       <ul>
                       <li>Nibh tortor id aliquet lectus.</li>
                       <li>Arcu ac tortor dignissim convallis aenean et. </li>
                       <li>Est ullamcorper eget nulla facilisi. Non diam phasellus.</li>
                       <li>Quis commodo odio aenean sed adipiscing diam donec. </li>
                       <li>Varius duis at consectetur lorem donec massa sapien faucibus.</li>
                       <li>Nibh tortor id aliquet lectus.</li>
                       <li>Arcu ac tortor dignissim convallis aenean et. Congue mauris rhoncus aeneanpulvinar. </li>
                       <li>Est ullamcorper eget nulla facilisi. Non diam phasellus.</li>
                       <li>Quis commodo odio aenean sed adipiscing diam donec. </li>
                       <li>Varius duis at consectetur lorem donec massa sapien faucibus.</li>
                       </ul>
                       <h1>This is an H1</h1>
                       <h2>This is an H2</h2>
                       <h3>This is an H3</h3>
                       <h4>This is an H4</h4>
                       <h5>This is an H5</h5>
                       <h6>This is an H6</h6>
                   </div>
                   </div>
                   
               </div>
           </section>
           
           <Cta title={"We guide users to their best experiences."} btn={"Let's Get Started"}/>

           </>
       </Layout>
   )
}

// Exaple of using getServerSideProps 
// export async function getServerSideProps({ query: { slug } }){
//     const res = await fetch(`${API_URL}/api/casestudies/${slug}`);
//     const data = await res.json();

//     return {
//         props: {casestudies: data[0]},

//     }
// }

// This function gets called at build time
export async function getStaticPaths({locales}) {
    // Call an external API endpoint to get casestudies
    const res = await fetch(`${API_URL}/api/casestudies`)
    const casestudies = await res.json()
  
    // Get the paths we want to pre-render based on casestudies
    const paths = casestudies.map((casestudy) => ({
      params: ({ locale: 'en-US', slug: casestudy.slug }),
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: 'blocking' }
  }
export async function getStaticProps({params, locale}){
    const res = await fetch(`${API_URL}/api/casestudies/${params.slug}`)
    const casestudy = await res.json();
    return {
        props: {
            casestudy: casestudy[0],
            locale: locale
        }
    }
}