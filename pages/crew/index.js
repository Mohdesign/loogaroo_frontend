import Layout from '@/components/Layout'
import Crew from '@/components/Crew'
import DividerPrimary from '@/components/DividerPrimary'



export default function CrewList({crew,crewheader}) {

  return (
    <Layout title={"Projects | Loogaroo Animation Studio"}>
      {console.log(crew)}
      <><div className="front-end main-content">
      <Crew crew={crew} crewheader={crewheader}/>
        <DividerPrimary />
        </div>
      </>
    </Layout>
  )
}

export async function getStaticProps(){
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${API_URL}/api/crews?populate=*`);
  const res2 = await fetch(`${API_URL}/api/crew-header?populate=*`);
  const crew = await res.json();
  const crewheader = await res2.json();
  return {
      props: {crew,crewheader},
      revalidate: 1
  }
}
 