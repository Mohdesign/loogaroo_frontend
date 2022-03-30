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
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/jesse.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Jesse</span>
                                    </a>
                                </h3>
                             </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/gene.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Gene</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/casey.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Casey</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex align-content-center text-center">
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/simon.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Simon</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/david.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">David</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/kelly.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Kelly</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex align-content-center text-center">
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/jesse2.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Jesse</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/josie.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Josie</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/heather.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Heather</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex align-content-center text-center">
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/mai.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Mai</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/ryan.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Ryan</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/nadi.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Nadi</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex align-content-center text-center">
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/delano.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Delano</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/isabel.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Isabel</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-crew">
                        <div className="crew-image"><Image src="/images/crew/josee.png"  width={350} height={350}  className="img-fluid" alt="" /></div>
                        <div className="crew-content">
                            <div className="crew-name">
                                <h3 className="crew-title">
                                    <a href="crew-member.html">
                                        <span className="crew-name-first">Josée</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
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