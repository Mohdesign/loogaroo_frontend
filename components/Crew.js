import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";
export default function Crew ({crew}) {
 
    return (
        <>
          <section className="space-sm">
        <div id="crew" className="container">
            <div className="row d-flex align-content-center text-center mb-md-5 pb-md-5">
                <div className="col-md-12">
                    <div className="headline mt-0 mb-0">
                        <div className="headline-content">
                            <h2 className="headline-title display-4">The Crew</h2>
                         </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                        <p className="headline-subtitle">
                            Loogaroo is a group of very creative individuals who share
                            common interests in Cartoons, Games, Design and poutine. 
                        </p>
                    </div>
                </div>
            </div>
            <div className="row d-flex align-content-center text-center">
                {crew.data.map((singleCrew, index) => (
                    <div className="col-md-4">
                        <div className="single-crew">
                            <div className="crew-image">
                                <Image src={singleCrew.attributes.picture.data.attributes.url}  width={350} height={350}  className="img-fluid" alt="" />
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

            <div className="row d-flex align-content-center text-center mt-4">
                <div className="col-md-12 mx-auto">
                    <p className="headline-subtitle">
                        This team is in it for the long haul
                        We not only earn your business, but keep earning it. 
                    </p>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}