// pages/500.js
import Layout from "@/components/Layout"
import Link from "next/link"


export default function Custom500() {
    return (
        <Layout title={"505 | websolutions.ca"}>
        <>
        <header className="space-sm subpages mb-0 pb-5">
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-8">
                        <div className="headline mt-5 mb-0">
                            <div className="headline-content text-center">
                            <h1 className="headline-title display-3"> <span className="text-danger">500 </span> | Server-side error occurred!</h1>
                            <p className="pt-5"><Link href="/"><a  style={{borderBottom: '1px solid #212529'}}>Back home</a></Link></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </header>
         
        </>
        </Layout>
    )
  }