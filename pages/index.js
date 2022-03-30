import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import Projects from '@/components/Projects'
import Crew from '@/components/Crew'
import Contact from '@/components/Contact'
import DividerPrimary from '@/components/DividerPrimary'
import DividerSecondary from '@/components/DividerSecondary'
import { API_URL } from 'url.config';



export default function Home({projectsList}) {

  return (
    <Layout title={"Loogaroo | Animation Studio"}>
      {console.log(projectsList)}
      <><div className="main-content">
        <Projects  projectsList={projectsList}/>
        <DividerPrimary />
        <Bio />
        <DividerSecondary />
        <Crew />
        <DividerSecondary />
        <Contact />
        </div>
      </>
    </Layout>
  )
}

export async function getStaticProps(){
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${API_URL}/api/projects?populate=*`);
   const projectsList = await res.json();
  return {
      props: {projectsList},
      revalidate: 1
  }
}


/*
Fetching multiple API queries with getStaticProps
export async function getStaticProps() {
  const res1 = await fetch(`${API_URL}/api/testimonials`)
  const res2 = await fetch(`${API_URL}/api/services`)
  const res3 = await fetch(`${API_URL}/api/casestudies`)
  const testimonials = await res1.json()
  const services = await res2.json()
  const casestudies = await res3.json()
  return {
    props: {
      testimonials,
      services,
      casestudies,
    },
    revalidate: 10, // In seconds
  }
}

*/