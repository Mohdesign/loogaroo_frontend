import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";
export default function Bio () {
    return (
        <>
        <section className="space-sm">
        <div id="bio" className="container">
            <div className="row d-flex align-content-center text-center">
                <div className="col-md-12">
                    <div className="headline mt-0 mb-0">
                        <div className="headline-content">
                            <div><Image src="/images/bio-icon.png" 
                            width={248} height={357} className="img-fluid mb-3" /></div>
                            <h2 className="headline-title display-4">Nothing Beats being happy</h2>
                            
                         </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                        <p className="headline-subtitle">
                            Over 20 years of doing this shit and we still love it.<br/>
                            We plan the work and work the plan, no surprises.<br/>
                            Solid Animation services, on time and on budget.<br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}