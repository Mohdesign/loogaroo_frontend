/* eslint-disable @next/next/no-img-element */
import {
    MainNav,
    NavSection,
    NavSections,
    NavCondense,
    NavBrand,
    NavUser,
    NavLink,
  } from '@strapi/design-system/MainNav';
  import {
    SubNav,
    SubNavHeader,
    SubNavSection,
    SubNavSections,
    SubNavLink,
    SubNavLinkSection,
    
 
  } from '@strapi/design-system/SubNav';

  import { Grid, GridItem } from '@strapi/design-system/Grid';
import {Box} from '@strapi/design-system/Box';
import {Divider } from '@strapi/design-system/Divider';
import {Icon} from '@strapi/design-system/Icon';
import Write  from '@strapi/icons/Write';
import Layer from '@strapi/icons/Layer';
import Landscape from '@strapi/icons/Landscape';
import Information from '@strapi/icons/Information';
import Puzzle from '@strapi/icons/Puzzle';
import ShoppingCart from '@strapi/icons/ShoppingCart';
import Cog from '@strapi/icons/Cog';
import Feather from '@strapi/icons/Feather';

import {Link} from '@strapi/design-system/Link'; 
import { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom'
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'

export default function AdminNav({navigationContent, subNavigationContent, children}) {
     
    const [condensed, setCondensed] = useState(false);
    const router = useRouter();
    //SubNavLink act like a Link from Nextjs 
    const CustomLink = React.forwardRef((props, ref) => {
        return (
          <SubNavLink as="a" {...props} innerRef={ref}>
            {props.children}
          </SubNavLink>
        );
      });
      
      CustomLink.displayName = 'CustomLink';
      
      CustomLink.propTypes = {
        children: PropTypes.node.isRequired,
      };
 

    return (
        <StaticRouter>
        <Grid gap={0} className="Main-Subnav-container">
            <GridItem col={1} className="grid-MainNav-sidebar">
                <Box background="neutral0" padding={0} style={{ height: '100vh'}}>
                    <MainNav condensed={condensed}>
                    <NavBrand workplace="Workplace" title="App Dashboard" icon={<img src="/images/ws-logo-w-2.svg" alt="" />} />
                    <Divider />
                    <NavSections>
                    
                        <NavLink to="/cm" icon={<Write />} className="active">
                        Content Manager
                        </NavLink>
                        <NavSection label="Plugins">
                        <NavLink to="/builder" icon={<Layer />}>
                            Analytics
                        </NavLink>
                        <NavLink to="/content" icon={<Landscape />}>
                            Media library
                        </NavLink>
                        <NavLink to="/content" icon={<Information />}>
                            Documentation
                        </NavLink>
                        </NavSection>
                        <NavSection label="General">
                       
                        <NavLink to="/content" icon={<Cog />}>
                            Settings
                        </NavLink>
                        </NavSection>
                    </NavSections>
                    <NavUser src="https://avatars.githubusercontent.com/u/3874873?v=4" to="/somewhere-i-belong">
                        Moh Kader
                    </NavUser>
                    <NavCondense onClick={() => setCondensed(s => !s)}>
                        {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
                    </NavCondense>
                    </MainNav>
                </Box>
            </GridItem>

            <GridItem col={1} className="grid-SubNav-sidebar">
            <SubNav ariaLabel="Mixed sub nav">
                <SubNavHeader label="Services content" />
                <SubNavSections>
                    <SubNavSection label="COLLECTION TYPES" collapsable>
                        <SubNavLink className="active" onClick={() => router.push('/admin/services')} to="/services" icon={<Write />}>
                            Services
                        </SubNavLink>
                        <SubNavLink  onClick={() => router.push('/admin/casestudies')} to="/casestudies" icon={<Write />}>
                            Casestudies
                        </SubNavLink>
                        <SubNavLink to="/today" icon={<Write />}>
                            Team
                        </SubNavLink>
                        <SubNavLink to="/today" icon={<Write />}>
                            CTA
                        </SubNavLink>
                    </SubNavSection>
                    
                    <SubNavSection label="SINGLE TYPES" collapsable>
                        <SubNavLink  onClick={() => router.push('/admin/services')} to="/services" icon={<Feather />}>
                            Home page
                        </SubNavLink>
                        <SubNavLink  onClick={() => router.push('/admin/casestudies')} to="/casestudies" icon={<Feather />}>
                            About page
                        </SubNavLink>
                        <SubNavLink to="/today" icon={<Feather />}>
                            Contact page
                        </SubNavLink>
                    </SubNavSection>
                </SubNavSections>
            </SubNav>
            </GridItem>

        </Grid>
         <style global jsx>{`
 
            .cRfLrF {
                padding-bottom: 0!important;
            }
        
        `}</style>
         </StaticRouter>
    )
}

AdminNav.propTypes = {
    title: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    ),
  };