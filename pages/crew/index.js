import Layout from '@/components/Layout'
import Crew from '@/components/Crew'
import DividerPrimary from '@/components/DividerPrimary'



export default function CrewList({crew}) {

  return (
    <Layout title={"Projects | Loogaroo Animation Studio"}>
      {console.log(crew)}
      <><div className="main-content">
        <Crew  crew={crew}/>
        <DividerPrimary />
        </div>
      </>
    </Layout>
  )
}

export async function getStaticProps(){
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${API_URL}/api/crews?populate=*`);
   const crew = await res.json();
  return {
      props: {crew},
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