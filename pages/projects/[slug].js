import Layout from '@/components/Layout'
import ReactMarkdown from "react-markdown";
import DividerPrimary from '@/components/DividerPrimary'
import { fetchAPI } from "../../lib/api";



export default function SingleProject({project}) {

  return (
    <Layout title={project.attributes.title}>
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
                                        <h1 class="headline-title display-5">{project.attributes.title}</h1>
                                        <p class="headline-subtitle">{project.attributes.type}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </header>
                <figure> 
                <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" 
                src= {"https://www.youtube.com/embed/" + project.attributes.video}
                
                allowfullscreen></iframe>
                </div>
                </figure>
                <div className="row d-flex justify-content-start space-sm mt-5">
                    <div className="col-md-4 pl-md-5">
                        <ul className="list-unstyled project-intro">
                            <li className="title">Project Details</li>
                            <li><b>CLIENT:</b> {project.attributes.client}</li>
                            <li><b>DATE: </b>{project.attributes.date}</li>
                            <li><b>PROJECT: </b>{project.attributes.type}</li>
                        </ul>
                    </div>
                    <div className="col-md-7 offset-md-1 pr-md-4">
                         <div className="lead" dangerouslySetInnerHTML={{__html: project.attributes.content}}/> 

                        <ReactMarkdown escapeHtml={false}>{project.attributes.content}</ReactMarkdown>
                        
 
 
                    </div>


                </div>
                
                
                {/* <div className="row ">
                    <div className="col-md-12 d-flex align-items-end justify-content-end mr-5">
                        <p className=""><a href=""   className="mr-2 btn-pre py-1 px-2">Previous</a></p> 
                        <p className=""><a href="#\" className="ml-2 btn-next py-1 px-2">  Next</a></p> 
                    </div>
                </div> */}
                
            </div>
        </section>
         <DividerPrimary />
     
        </div>
      </>
    </Layout>
  )
}




export async function getStaticPaths() {
    const projects = await fetchAPI("/projects?populate=*", { fields: ["slug"] });
  
    return {
      paths: projects.data.map((project) => ({
        params:({slug: project.attributes.slug}),
         
      })),
       fallback: 'blocking',
    };
  }
  
  export async function getStaticProps({ params }) {
    const projects = await fetchAPI("/projects", {
      filters: {
        slug: params.slug,
      },
      populate: [ "thumbnail"],
       
    });
  
    return {
      props: { 
          project: projects.data[0],
        },
      revalidate: 1,
    };
  }
 