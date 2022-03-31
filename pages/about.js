import Layout from "@/components/Layout"


export default function About() {
    return (
        <Layout title={"About | Loogaroo Animation Studio"}> 
        <>
            <section>
                <div className="container">
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
                </div>
            </section>
         </>
        </Layout>
    )
}