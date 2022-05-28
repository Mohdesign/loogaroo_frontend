/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';
import React from 'react';
// reactstrap components
import {
  Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Form,
  Input, InputGroup, InputGroupText, Media, Nav, Navbar, NavbarBrand, NavItem,
  NavLink, Row, UncontrolledDropdown,
} from 'reactstrap';

// let ps;

function Sidebar(props) {
  // used for checking current route
  const router = useRouter();
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => router.route.indexOf(routeName) > -1;
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = () => (
    <NavItem>
    <Link href="/admin">
      <a
        className={router.pathname === '/admin' ? 'nav-link active' : 'nav-link'}
      >
        <i className="ni ni-tv-2 text-primary" />
        Dashboard
      </a>
    </Link>
    <Link href="/admin/services">
      <a
        className={router.pathname.includes('/admin/services') ? 'nav-link active' : 'nav-link'}
      >
        <i className="ni ni-planet text-blue" />
        Projects
      </a>
    </Link>
    <Link href="/admin/categories">
      <a
        className={router.pathname.includes('/admin/categories') ? 'nav-link active' : 'nav-link'}
      >
        <i className="ni ni-bullet-list-67 text-red" />
        Categories
      </a>
    </Link>
    <Link href="/admin/team">
      <a
        href="/admin/team"
        className="nav-link"
      >
        <i className="ni ni-single-02 text-yellow" />
        Team
      </a>
    </Link>
    <Link href="/admin/team">
      <a
        href="/admin/testimonial"
        className="nav-link"
        onClick={closeCollapse}
      >
        <i className="ni ni ni-books text-info" />
        {/* <i><FontAwesomeIcon icon={faBook} color="rgb(73, 69, 255)" /></i> */}
        Testimonial
      </a>
    </Link>
  </NavItem>
  );
  const { routes, logo } = props;
  const navbarBrand = (
    <NavbarBrand href="/dashboard" className="pt-0">
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img alt={logo.imgAlt} className="mt-md-3 mt-1 navbar-brand-img" width={150} src={logo.imgSrc} />
    </NavbarBrand>
  );
  return (
    <Navbar
      className="navbar-vertical admin-nav fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      {/* Toggler */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleCollapse}
      >
        <span className="navbar-toggler-icon" />
      </button>
      {/* Brand */}
      {logo && logo.innerLink ? (
        <Link href={logo.innerLink}>
          <span>{navbarBrand}</span>
        </Link>
      ) : null}
      {logo && logo.outterLink ? (
        <a href={logo.innerLink} target="_blank" rel="noreferrer">
          {navbarBrand}
        </a>
      ) : null}
      {/* User */}
      <Nav className="align-items-center d-md-none">
        <UncontrolledDropdown nav>
          <DropdownToggle nav className="nav-link-icon">
            <i className="ni ni-bell-55" />
          </DropdownToggle>
          <DropdownMenu
            aria-labelledby="navbar-default_dropdown_1"
            className="dropdown-menu-arrow"
            right
          >
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src="/images/dashboard/team-1-800x800.jpg"
                />
              </span>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </DropdownItem>
            <Link href="/admin/profile">
              <DropdownItem>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
            </Link>
            <Link href="/admin/profile">
              <DropdownItem>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
            </Link>
            <Link href="/admin/profile">
              <DropdownItem>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
            </Link>
            <Link href="/admin/profile">
              <DropdownItem>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
            </Link>
            <DropdownItem divider />
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="ni ni-user-run" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      {/* Collapse */}
      <Collapse navbar isOpen={collapseOpen}>
        {/* Collapse header */}
        <div className="navbar-collapse-header d-md-none">
          <Row>
            {logo ? (
              <Col className="collapse-brand" xs="6">
                {logo.innerLink ? (
                  <Link href={logo.innerLink}>
                    <img alt={logo.imgAlt} src={logo.imgSrc} />
                  </Link>
                ) : (
                  <a href={logo.outterLink}>
                    <img alt={logo.imgAlt} src={logo.imgSrc} />
                  </a>
                )}
              </Col>
            ) : null}
            <Col className="collapse-close" xs="6">
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleCollapse}
              >
                <span />
                <span />
              </button>
            </Col>
          </Row>
        </div>
        {/* Form */}
        <Form className="mt-4 mb-3 d-md-none">
          <InputGroup className="input-group-rounded input-group-merge">
            <Input
              aria-label="Search"
              className="form-control-rounded form-control-prepended"
              placeholder="Search"
              type="search"
            />
            <InputGroupText>
              <span className="fa fa-search" />
            </InputGroupText>
          </InputGroup>
        </Form>
        {/* Navigation */}
        <Nav navbar>{createLinks(routes)}</Nav>
        {/* Divider */}
        <hr className="my-3" />
        {/* Heading */}
        <h6 className="navbar-heading text-muted">Single type </h6>
        {/* Navigation */}
        <Nav className="mb-md-3" navbar>
          <NavItem>
            <NavLink href="#">
              <i className="ni ni-spaceship" />
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <i className="ni ni-palette" />
              Team
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <i className="ni ni-ui-04" />
              Contact
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Sidebar;