import Header from '@/components/Header';
import Layout from "@/components/Layout"
import CaseStudies from '@/components/CastStudies';
import Cta from "@/components/Cta"
import { API_URL } from "url.config"

export default function CaseStudiesPage({ casestudies }) {

    return (
        <Layout title={"Services | websolutions.ca"}>
            <>
                <Header title={"Case studies"} subtitle={"Here Are Our Case Studies. Check Back Often For The Latest Projects."} />
                <CaseStudies casestudies={casestudies}/>
                <Cta title={"We guide users to their best experiences."} btn={"Let's Get Started"}/>

            </>
        </Layout>
    )
}


export async function getStaticProps(){
    const res = await fetch(`${API_URL}/api/casestudies`)
    const casestudies = await res.json();
    return {
        props: {casestudies},
        //revalidate: 1
    }
}