/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider } from "@strapi/design-system/ThemeProvider";
import { lightTheme } from "@strapi/design-system/themes";
import {Box} from '@strapi/design-system/Box';
import {Layout} from '@strapi/design-system/Layout';
import {ContentLayout } from '@strapi/design-system/Layout';
 import Head from 'next/head';
// import Link from "next/link";
import React from 'react';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import AdminNav from "./AdminNav";
import Sidebar  from "./Sidebar/Sidebar.js";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "./Navbars/AdminNavbar.js";
import Header from "./Headers/Header.js";
import AdminFooter from "./Footers/AdminFooter.js";
import routes from "routes.js";

 

export default function AdminLayout({ props, children, title, description, keywords}) {
    
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);

   
 
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="Websolutions.ca" />
                <meta name="theme-color" content="white" />
                <meta name="theme-color" content="black" />

                <title>{title}</title>
                {/* favicon */}
                <link rel="shortcut icon" href="/images/favicon/favicon.ico" type="image/x-icon" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
                {/* iOS support */}
                <link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-icon-180x180.png" />
                {/* Android support */}
                <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-192x192.png" />
                <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-144x144.png" />
                <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-96x96.png" />
                <link rel="apple-touch-icon-precomposed" href="/images/favicon/images/android-icon-72x72.png" />
                <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-48x48.png" />
                <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-36x36.png" />
      
                {/* <script src="https://cdn.tiny.cloud/1/mu9m62f047mk5selpnu744nmws6e1iroa0d8o9xpff740cgd/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script> */}
            </Head>
            <div className="min-height-300 position-absolute w-100"></div>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                innerLink: "/admin",
                imgSrc: "/images/logo.svg",
                imgAlt: "...",
                }}
            />
            {/* <div className="main-content" ref={mainContentRef}>
                <AdminNavbar {...props} brandText={getBrandText()} />
                {children}
                <Container fluid>
                <AdminFooter />
                </Container>
            </div> */}
        
            <div className="main-content admin-backend" ref={mainContentRef}>
                <Header />
                {children}
                <Container fluid>      
                    <AdminFooter />
                </ Container>
                
            </div>
        </>
    )
}

 
  

{/* default roots for <Head></Head> */}
AdminLayout.defaultProps = {
    title: "Admin | Websolutions.ca",
    description: "Admin panel for Websolutions.ca",
    keywords: "bathurst web design, new brunswick websites, new brunswick web services, custom web based applications, motor management system"
}