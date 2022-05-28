/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';

function AdminNavbar({ pageName, subHeaderTitle }) {
  return (
    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
        <div className="align-items-center row d-none d-lg-inline-block">
          <div className="col">
            <h2 className="text-uppercase h4 ls-1 mb-0">{pageName}</h2>
            <h5 className="mb-0 text-muted">
              {subHeaderTitle}
            </h5>
          </div>
        </div>

        <Form className="form-inline mr-3 d-none d-md-flex ml-lg-auto">
          <FormGroup className="mb-0 top-search-bar ">
            <InputGroup className="input-group-alternative">
              <InputGroupText>
                <i className="fas fa-search" />
              </InputGroupText>
              <Input placeholder="Search" type="text" />
            </InputGroup>
          </FormGroup>
        </Form>
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  {/* // eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="..." src="/images/dashboard/team-1-800x800.jpg" />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-dark text-sm font-weight-bold">
                    Mahmoud
                  </span>
                </Media>
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
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;