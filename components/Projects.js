import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";
export default function Projects ({projectsList}) {

     //prjects = projects.sort(() => Math.random() - 0.5)
    return (
        <>
          <div className="content-warpper">  
          <section>
            <div id="portfolio" className="container">

                <div className="grid" data-cols="3" data-margin="30" data-height="1" data-masonry='{ "columnWidth": 200, "itemSelector": ".entry" }'>
                   
                    {projectsList.data.map((project, index) => (
                        
                        <div className="entry work-entry branding" key={index}>
                            <Link href={`/projects/${project.attributes.slug}`}> 
                            <a>
                                <div className="entry-image imageBG" data-img={project.attributes.thumbnail.data.attributes.url}></div>
                                <div className="work-entry-hover">
                                    <div className="work-entry-content">
                                        <div className="work-entry-title">{project.attributes.title}</div>
                                        <div className="work-entry-cat">{project.attributes.type}</div>
                                    </div>
                                </div>
                            </a>
                            </Link>
                        </div>
                    ))}
 
                </div>
            </div>
          
        </section>
        </div>
        </>
    )
}