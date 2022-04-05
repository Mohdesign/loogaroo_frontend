import Layout from '@/components/Layout'
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown";
import DividerPrimary from '@/components/DividerPrimary'
import { fetchAPI } from "../../lib/api";



export default function SingleCrew({crew}) {

  return (
    <Layout title={crew.attributes.name}>
       <><div className="main-content">
      
        <section className='single-project'>
            <div className="container" id="portfolio">
                <header>
                {/* <DividerPrimary /> */}
                    <div class="container">
                        <div class="row d-flex align-content-center text-center">
                            <div class="col-md-12">
                                <div class="headline mt-0 mb-4">
                                    <div class="headline-content">
                                        <h1 class="headline-title display-5">{crew.attributes.name}</h1>
                                        <p class="headline-subtitle">{crew.attributes.position}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </header>
         
                

                <div className="row d-flex justify-content-center space-sm mt-0">
                  <div className="col-md-10">
                      <div className="single-crew text-center">
                          <div className="crew-image">
                              <Image src={crew.attributes.picture.data.attributes.url}  width={350} height={350}  className="img-fluid" alt="" />
                          </div>
                          <div className="crew-content">
                              <div className="crew-name">
                                  <h3 className="crew-title mt-4">
                                     <div className="crew-name-first" dangerouslySetInnerHTML={{__html: crew.attributes.bio}}/> 
                                  </h3>
                              </div>
                          </div>
                      </div>
                  </div>
 
                </div>
            </div>
        </section>
         <DividerPrimary />
     
        </div>
      </>
    </Layout>
  )
}




export async function getStaticPaths() {
    const crews = await fetchAPI("/crews?populate=*", { fields: ["slug"] });
  
    return {
        paths: crews.data.map((crew) => ({
        params:({slug: crew.attributes.slug}),
         
      })),
       fallback: 'blocking',
    };
  }
  
  export async function getStaticProps({ params }) {
    const crews = await fetchAPI("/crews", {
      filters: {
        slug: params.slug,
      },
      populate: [ "picture"],
       
    });
  
    return {
      props: { 
        crew: crews.data[0],
        },
      revalidate: 1,
    };
  }
 