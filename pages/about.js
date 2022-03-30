import Header from "@/components/Header"
import Layout from "@/components/Layout"
import AboutHistory from "@/components/about/AboutHistory"
import AboutTeam from "@/components/about/AboutTeam"
import AboutWhy from "@/components/about/AboutWhy"
import Cta from "@/components/Cta"
import styles from "@/styles/About.module.css"

export default function About() {
    return (
        <Layout title={"About | websolutions.ca"}> 
        <>
            <Header title={"Who we are"} subtitle={"For almost 20 years Websolutions.ca has been designing cutting edge websites and applications for clients big and small. Our expert team of designers, coders and marketing professionals always aim to deliver a quality product helping to insure the success of our clients on-line. Hence our tagline 'Websites that work for you'."} />

            <section className={`${styles.who} subpages`}>
                <div className="container">
                    <AboutHistory styles={styles} />
                    <AboutTeam styles={styles} />
                    <AboutWhy styles={styles} />
                </div>
            </section>
            <Cta title={"We guide users to their best experiences."} btn={"Let's Get Started"}/>
        </>
        </Layout>
    )
}