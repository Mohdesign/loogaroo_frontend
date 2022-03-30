import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

export default function Nav (){
    const router = useRouter();
    return (
        <>
        <header>
            <div className="container">
                <div className="row d-flex align-content-center">
                    <div className="col-md-12">
                        <div className="headline">
                            <div className="headline-content intro">
                                <div className="my-3 mx-md-0 mx-5">
                                    < Link href="/">
                                        <a className="logo">
                                        <Image 
                                        src="/images/logo-colors.png" className="img-fluid" 
                                        width="536"
                                        height="250" 
                                        alt="Loogaroo logo"
                                        />
                                        </a>
                                    </Link>

                                </div>
 
                                <h1 className="headline-title display-3">Animated fun for hire</h1>
                                { router.pathname === '/' ? 
                                <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                                    <div className="container">  
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                                        <div className="collapse navbar-collapse" id="navbarResponsive">
                                            <ul className="navbar-nav">
                                            
                                                <li className="nav-item"> <a className="nav-link js-scroll-trigger" href="#bio">Bio  </a> </li>
                                                <span> | </span>
                                                <li className="nav-item"> <a className="nav-link js-scroll-trigger" href="#crew">Crew</a> </li>
                                                <span> | </span>
                                                <li className="nav-item"> <a className="nav-link js-scroll-trigger" href="#contact">Contact</a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                :
                                <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                                    <div className="container">  
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                                        <div className="collapse navbar-collapse" id="navbarResponsive">
                                            <ul className="navbar-nav">
                                            
                                                <li className="nav-item"> <Link href="/"><a  className="nav-link js-scroll-trigger" ><i class="fas fa-arrow-left"></i> Home </a></Link> </li>
                                                 
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                }
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </header>


    </>
    )
}