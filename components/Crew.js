import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";
export default function Crew ({crew, crewheader}) {
 
    return (
        console.log(crewheader),
        <>
          <section className="space-sm">
        <div id="crew" className="container">
            <div className="row d-flex align-content-center text-center mb-md-5 pb-md-5">
                {/* Signal type */}
                { crewheader.data.attributes ? (
                <div className="col-md-12">
                    <div className="headline mt-0 mb-0">
                        <div className="headline-content">
                            <h2 className="headline-title display-4">{crewheader.data.attributes.title} </h2>
                         </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                        <p className="headline-subtitle">
                        {crewheader.data.attributes.subtitle}
                        </p>
                    </div>
                </div>
                ) : (
                <div className="col-md-12">
                    <div className="headline mt-0 mb-0">
                        <div className="headline-content">
                            <h2 className="headline-title display-4">There is no API Crew</h2>
                        </div>
                    </div>
                </div>
            )}
                
            </div>
            <div className="row d-flex align-content-center text-center">
                {crew.data.map((singleCrew, index) => (
                    <div className="col-md-4">
                        <div className="single-crew">
                            <div className="crew-image">
                                <Link href={`/crew/${singleCrew.attributes.slug}`}> 
                                    <a><Image src={singleCrew.attributes.picture.data.attributes.url}  width={350} height={350}  className="img-fluid" alt="" /></a>
                                </Link>
                            </div>
                            <div className="crew-content">
                                <div className="crew-name">
                                    <h3 className="crew-title">
                                        <Link href={`/crew/${singleCrew.attributes.slug}`}> 
                                            <a><span className="crew-name-first">{singleCrew.attributes.name}</span></a>
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            { crewheader.data.attributes ? (        
                <div className="row d-flex align-content-center text-center mt-4">
                    <div className="col-md-12 mx-auto">
                        <p className="headline-subtitle">
                            {crewheader.data.attributes.footer}
                        </p>
                    </div>
                </div>
            ) : (
                <p>NO FOOTER </p>
            )}
        </div>
    </section>
        </>
    )
}