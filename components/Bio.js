import Image from "next/image"
export default function Bio ({bio}) {
    console.log(bio)
    return (
        <>
        <section className="space-sm">
        <div id="bio" className="container">
            <div className="row d-flex align-content-center text-center">
                {/* Signal type */}
                { bio.data.attributes ? (
                    <div className="col-md-12">
                        <div className="headline mt-0 mb-0">
                            <div className="headline-content">
                                <div><Image src="/images/bio-icon.png" 
                                width={248} height={357} className="img-fluid mb-3" alt={bio.data.attributes.title} /></div>
                                <h2 className="headline-title display-4">{bio.data.attributes.title}</h2>
                            </div>
                        </div>
                        <div className="col-md-12 mx-auto">
                            <p className="headline-subtitle">
                            {bio.data.attributes.subtitle}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="col-md-12">
                        <div className="headline mt-0 mb-0">
                            <div className="headline-content">
                                <div><Image src="/images/bio-icon.png" width={248} height={357} className="img-fluid mb-3" alt="Bio img" /></div>
                                <h2 className="headline-title display-4">There is no API BIO</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </section>
        </>
    )
}