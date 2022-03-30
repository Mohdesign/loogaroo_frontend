import Layout from "@/components/Layout"
import Header from "@/components/Header"
import Cta from "@/components/Cta"
import Jobs_list from "@/components/Jobs_list"
import { API_URL } from "url.config"

export default function JobsPage({jobs}) {
  return (
    <Layout title={"Jobs | websolutions.ca"}>
       <>
       <Header title={"Work with us"} subtitle={"Websolutions.ca is always looking for experienced web developers and graphic designers. Our small team of enthusiastic young professionals enjoy tackling any type of project. We provide a flexible work environment with competitive salaries, health benefits and ongoing skill development."} />
        
        <section className="subpages">
            <div className="container">
                <div class="row jobs">
                    <div class="col-md-12 mb-4">
                        <span>Current opportunities</span>
                        <p>We are currently looking to fill the following positions.</p>
                    </div>
                    <Jobs_list jobs={jobs} />      
                </div>
            </div>
        </section>
        <Cta title={"We guide users to their best experiences."} btn={"Let's Get Started"}/>
      </>
    </Layout>
  )
}


export async function getStaticProps(){
    const res = await fetch(`${API_URL}/api/jobs`)
    const jobs = await res.json();
    return {
        props: {jobs},
        //revalidate: 1
    }
}