import Layout from "@/components/Layout"
import Cta from "@/components/Cta"
import Header from "@/components/Header"
import { API_URL } from 'url.config';
import { useRouter} from 'next/router';
//translation
import useTranslation from 'next-translate/useTranslation'

export default function Singlejob( {job} ) {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        
       <Layout title={"Jobs | " + job.title}>
           <>
            
           <Header title={job.title} subtitle={job.desc} />
            <section className="job-details suppages">
                <div className="container">
                <div className="row">
                    <div className="col-md-10">
                    <p className="h4">What is a Social Media Specialist?</p>
                    <p>As a Social Media Specialist, you don't just browse Facebook, Instagram or Twitter. You take the time to understand a client's brand, understanding its strengths and weaknesses. From this you develop strategies to communicate that business's message to their ideal target audience. You love writing, which will help you develop an ongoing story for their brand. You don't only understand the brand...you BECOME the brand. You've accomplished your goals when your efforts are successfully driving traffic, leads and sales to our clients.</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                    <p className="h4">Location</p>
                    <p>Bathurst, NB</p>
                    </div>
                    <div className="col-md-3">
                    <p className="h4">Type</p>
                    <p>Full Time</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-10">
                    <p className="h4">What a typical day looks like:</p>
                    <ul>
                        <li>Arrive at work around 8:30 in the morning;</li>
                        <li>Have your coffee or tea;</li>
                        <li>Review previous day's posts or ongoing campaigns for any enhancements / engagement / changes;</li>
                        <li>Brainstorm and discuss with co-workers regarding upcoming strategies and new ideas;</li>
                        <li>Work closely with your clients to understand their brands and help them achieve their business goals. This may include daily or weekly communication by email, phone, and in-person meetings;</li>
                        <li>Reporting on social media success using tools such as Google Analytics, Facebook Page Manager, Twitter Analytics, etc. to ensure objectives are met;</li>
                        <li>Monitor trends, audience insights and overall performance of digital content on multiple channels.</li>
                        <li>Brainstorm &amp; conceptualize unique ideas with the ability to take feedback and implement it throughout an overall marketing time-line.</li>
                        <li>Help with overall marketing initiatives for various clients</li>
                        <li>Maintain detailed campaign calendars to ensure plans and goals are met.</li>
                        <li>Be prepared for unexpected changes .</li>
                        <li>Play foosball...if you want to.</li>
                    </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-10">
                    <p className="h4">The ideal candidate:</p>
                    <ul>
                    <li>Delivers accurate and consistent work with acute attention to details.</li>
                    <li>Is a dynamic copywriter with a keen eye for good visual content. <b>(French proficiency will be considered an asset.)</b></li>
                    <li>Has excellent communication skills, time management skills, is self-motivated and comfortable taking initiative and handling multiple projects simultaneously.</li>
                    <li>Is a self-driven learning machine.</li>
                    <li>Has excellent analytical, technical and problem solving skills.</li>
                    </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-10">
                    <p className="h4">This stuff would make you even more awesome:</p>
                    <ul>
                    <li>A background in marketing (digital or traditional)</li>
                    <li>Photography skills</li>
                    <li>Facebook Business Manager</li>
                    <li>Google Ads</li>
                    <li>Google Analytics</li>
                    <li>Google Web Designer</li>
                    <li>Social Media Management tools (Hootsuite, Salesforce Social, Sprout, Buffer, etc.)</li>
                    <li>Bing Ads</li>
                    <li>Photoshop</li>
                    <li>After Effects</li>
                    <li>Premiere Pro</li>
                    <li>Google DoubleClick</li>
                    <li>SEO/SEM</li>
                    </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-10">
                    <p className="h4">Why work at Websolutions.ca?</p>
                    <ul className="custom-bullet-left">
                    <li>We have an awesome office located in downtown Bathurst.</li>
                    <li>Unlimited free coffee.</li>
                    <li>There is a foosball table.</li>
                    <li>We have a group medical benefits plan.</li>
                    <li>Casual yet fast paced work environment.</li>
                    <li>Local shops and restaurants in walking distance, parking available nearby.</li>
                    </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-10">
                    <p className="h4">Are you interested?</p>
                    <p>Submit your resume to <a href="jobs@websolutions.ca">jobs@websolutions.ca</a></p>
                    </div>
                </div>
                    
                </div>
            
            </section>
           
           <Cta title={"We guide users to their best experiences."} btn={"Let's Get Started"}/>
        
           </>
       </Layout>
   )
}

//This is an example of getServerSideProps

// export async function getServerSideProps({ query: { slug } }){
//     const res = await fetch(`${API_URL}/api/services/${slug}`);
//     const singleservice = await res.json();
//     return {
//         props: {services: singleservice[0]},
       
//     }
// }

// This function gets called at build time
export async function getStaticPaths({ locales }) {
    // Call an external API endpoint to get services
    const res = await fetch(`${API_URL}/api/jobs`)
    const jobs = await res.json()
  
    // Get the paths we want to pre-render based on services
    const paths = jobs.map((job) => ({
        params: ( {locale: 'en-US', slug: job.slug } ),
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: 'blocking' }
  }

export async function getStaticProps({params, locale }){
    const res = await fetch(`${API_URL}/api/jobs/${params.slug}`)
    const job = await res.json();
    return {
        props: {job: job[0],
        locale: locale
        },
    }
}