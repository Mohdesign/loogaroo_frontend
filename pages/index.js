import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import Projects from '@/components/Projects'
import Crew from '@/components/Crew'
import Contact from '@/components/Contact'
import DividerPrimary from '@/components/DividerPrimary'
import DividerSecondary from '@/components/DividerSecondary'
import { API_URL } from 'url.config';



export default function Home({projectsList,crew,bio,crewheader,contact}) {

  return (
    <Layout title={"Loogaroo | Animation Studio"}>
      {console.log(projectsList)}
      <><div className="front-end main-content">
        <Projects  projectsList={projectsList}/>
        <DividerPrimary />
        <Bio bio={bio} />
        <DividerSecondary />
        <Crew crew={crew} crewheader={crewheader}/>
        <DividerSecondary />
        <Contact contact={contact} />
        </div>
      </>
    </Layout>
  )
}

export async function getStaticProps(){
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${API_URL}/api/projects?populate=*`);
  const res2 = await fetch(`${API_URL}/api/crews?populate=*`);
  const res3 = await fetch(`${API_URL}/api/bio?populate=*`);
  const res4 = await fetch(`${API_URL}/api/crew-header?populate=*`);
  const res5 = await fetch(`${API_URL}/api/contact?populate=*`);
  const projectsList = await res.json();
  const crew = await res2.json();
  const bio = await res3.json();
  const crewheader = await res4.json();
  const contact = await res5.json();
  return {
      props: {
        projectsList,
        crew,
        bio,
        crewheader,
        contact
      },
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