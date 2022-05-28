/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/label-has-associated-control */
// PUBLISHED AT
// reactstrap components
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { StaticRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminNavbar from '@/components/admin/Navbars/AdminNavbar';

export default function Projects({ projects, page }) {
  // console.log(projects.meta.pagination.total + " total projects");

  const router = useRouter();

  console.log(projects);

  // get the page name & service count
  const pageName = router.pathname.split('/')[2];
  const subHeaderTitle = `${projects.meta.pagination.total} total projects`;

  // get the last
  const lastPage = Math.ceil(projects.meta.pagination.total / 3);

  // create an array containing the page numbers
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  // Checkbox
  const [checkoxval, setCheckboxVal] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);

  // delete service
  const [isVisible, setIsVisible] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState({});

  const deleteService = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      // console.log(data);
      if (response.status === 200) {
        // wait seconds and redirect to the new page
        setTimeout(() => {
          router.push('/admin/services?page=1');
        }, 1200);
        // remove toast after seconds
        setTimeout(() => {
          toast.dismiss();
        }, 1000);
        toast.success('Service deleted successfully');
        setIsVisible(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // delete multiple checkbox function
  const DeleteSelectedService = async () => {
    try {
      // craete array of filter
      Array.from(checkoxval).forEach(async (id) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        // const data = await response.json();
        // console.log(data);

        if (response.status === 200) {
          // wait seconds and redirect to the new page
          setTimeout(() => {
            router.push('/admin/services?page=1');
          }, 1200);
          // remove toast after seconds
          setTimeout(() => {
            toast.dismiss();
          }, 1000);
          toast.success('Service deleted successfully');
          setIsVisible(false);
          setDeleteButton(false);
        }
      });
    } catch (error) {
      // console.log(error);
    }
  };

  // show the popup
  const showPopup = (service) => {
    // This runs when the button on the service is clicked and we want to show the popup
    setIsVisible(true);
    setServiceToDelete(service);
  };

  // count how many projects are checked
  const countChecked = () => {
    // count the number of checked items
    const checkedCount = checkedItems.length;
    return checkedCount;
  };

  return (
    <StaticRouter>
      <AdminLayout title="Projects | Loogaroo">
        <>
          <AdminNavbar pageName={pageName} subHeaderTitle={subHeaderTitle} />

          <ToastContainer />

          <div className="mt--7 container-fluid ">
            <div className="table-loop">
              {projects.data.length === 0 ? (
                <div className="p-5 d-flex text-align-center text-center justify-content-center">
                  <Link href="/admin/services/create">
                    <a className="btn btn-primary">
                      <i className="fal fa-plus" />
                      {' '}
                      Create your first service
                      entry
                    </a>
                  </Link>
                </div>
              ) : (
                <div>
                  {/* The Delete button for checkbox */}
                  {deleteButton ? (
                    <div className="row mb-3">
                      <div className="col-md-4  d-flex align-items-center">
                        <p>
                          {countChecked()}
                          {' '}
                          entry selected
                        </p>
                        <button
                          type="button"
                          className="ml-2 btn btn-danger"
                          onClick={() => {
                            // filter the checked items and set the state
                            checkoxval.filter(
                              (item) => item !== null,
                            );
                            setCheckboxVal(checkedItems);
                            setAllChecked(false);
                            // if there are checked items
                            if (checkedItems.length > 0) {
                              DeleteSelectedService(checkedItems);
                            } else {
                              toast.error(
                                'Please select at least one service to delete',
                              );
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : null}
                  {/* The table */}
                  <Row>
                    <div className="col mt-md-0 mt-3">
                      <Card className="list-items">
                        <CardHeader className="bg-white border-0">
                        <div className="align-items-center row d-inline-block d-lg-none mb-3">
                          <div className="col">
                            <h2 className="text-uppercase h4 ls-1 mb-0">{pageName}</h2>
                            <h5 className="mb-0 text-muted">
                              {subHeaderTitle}
                            </h5>
                          </div>
                        </div>
                          <Row className="align-items-center">
                            <Col sm="4">
                              <a
                                href="#\"
                                onClick={() => router.back()}
                                className="mt-3 mb-0 text-muted text-xs"
                              >
                                <span className="text-primary mr-2">
                                  <i className="far fa-arrow-left" />
                                  &nbsp; Go back
                                </span>
                              </a>
                            </Col>
                            <Col className="text-right" sm="8">
                              <Link href="/admin/services/create">
                                <a className="btn btn-primary">
                                  <i className="fal fa-plus" />
                                  {' '}
                                  &nbsp;Create an entry
                                </a>
                              </Link>
                            </Col>
                          </Row>
                        </CardHeader>
                        
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>
                                <div className=" custom-control custom-checkbox">
                                  <input
                                    className=" custom-control-input"
                                    id="allChecked"
                                    type="checkbox"
                                    aria-label="Select all entries"
                                    // checked all items
                                    onChange={(e) => {
                                      if (e.target.checked === true) {
                                        setDeleteButton(true);
                                        setAllChecked(true);
                                        setCheckboxVal(
                                          projects.data.map(
                                            (service) => service.id,
                                          ),
                                        );
                                        setCheckedItems(
                                          projects.data.map(
                                            (service) => service.id,
                                          ),
                                        );
                                      } else {
                                        setDeleteButton(false);
                                        setAllChecked(false);
                                        setCheckboxVal([]);
                                        setCheckedItems([]);
                                      }
                                    }}
                                    checked={allChecked}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="allChecked"
                                  >
                                    <span> </span>
                                  </label>
                                </div>
                              </th>
                              <th>Title</th>
                              <th>Published at</th>
                              <th>Cover</th>
                              <th>Language</th>
                              <th>By </th>
                              <th>State </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.data.map((project) => (
                              <tr key={project.id}>
                                <td>
                                  <div className=" custom-control custom-checkbox">
                                    <input
                                      className=" custom-control-input"
                                      id={project.id}
                                      type="checkbox"
                                      checked={checkoxval.includes(project.id)}
                                      onChange={() => {
                                        // if the checkbox is checked set all checked to
                                        if (
                                          checkoxval.length === 1
                                          && checkoxval.includes(project.id)
                                        ) {
                                          setCheckboxVal([project.id]);
                                          setCheckedItems([project.id]);
                                          setAllChecked(false);
                                          setDeleteButton(false);
                                        } else {
                                          // if the checkbox is not checked set
                                          // all checked to false
                                          if (checkoxval.includes(project.id)) {
                                            setAllChecked(true);
                                            setDeleteButton(true);
                                          } else {
                                            setAllChecked(true);
                                            setDeleteButton(true);
                                          }
                                        }

                                        if (checkoxval.includes(project.id)) {
                                          checkoxval.indexOf(
                                            project.id,
                                          );
                                          setCheckboxVal(
                                            checkoxval.filter(
                                              (item) => item !== project.id,
                                            ),
                                          );
                                          setCheckedItems(
                                            checkoxval.filter(
                                              (item) => item !== project.id,
                                            ),
                                          );
                                          // setAllChecked(false);
                                        } else {
                                          setCheckboxVal([
                                            ...checkoxval,
                                            project.id,
                                          ]);
                                          setCheckedItems([
                                            ...checkedItems,
                                            project.id,
                                          ]);
                                          // setAllChecked(true);
                                        }
                                      }}
                                      value={project.id}
                                      name={project.id}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={project.id}
                                    >
                                      <span> </span>
                                    </label>
                                  </div>
                                </td>

                                <td>
                                  <div textColor="neutral800">
                                    {project.attributes.title}
                                  </div>
                                </td>

                                <td>
                                  <div textColor="neutral800">
                                    {moment(
                                      project.attributes.publishedAt,
                                    ).format('yyyy-MM-DD')}
                                  </div>
                                </td>

                                <td>
                                  {project.attributes.thumbnail.data != null ? (
                                    <Media className="align-items-center">
                                      <a
                                        className="avatar rounded-circle mr-3"
                                        href="#\"
                                        onClick={() => router.push(
                                          `/admin/services/edit/${project.id}`,
                                        )}
                                      >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        
                                        {/* {console.log( project.attributes.thumbnail.data.url)} */}
                                        <img
                                          src={
                                            project.attributes.thumbnail.data.attributes.url
                                          }
                                          width={50}
                                          alt={project.attributes.title}
                                        />
                                      </a>
                                    </Media>
                                  ) : (
                                    <Media className="align-items-center">
                                      <a
                                        className="avatar rounded-circle mr-3"
                                        href="#\"
                                        onClick={() => router.push(
                                          `/admin/services/edit/${project.id}`,
                                        )}
                                      >
                                        <img
                                          alt="..."
                                          src="/images/default-cover.png"
                                          width={50}
                                        />
                                      </a>
                                    </Media>
                                  )}
                                </td>
                                <td>
                                  <div textColor="neutral800">
                                    {project.attributes.locale}
                                  </div>
                                </td>
                                <td>
                                  <div className="avatar-group">
                                  { project?.attributes?.users_permissions_users?.data ? (
                                    project.attributes.users_permissions_users.data.map(
                                      (user) => (
                                        <>
                                          <a
                                            key={user.id}
                                            className="avatar avatar-sm"
                                            href="#pablo"
                                            id={user.attributes.username}
                                            onClick={(e) => e.preventDefault()}
                                          >
                                            <img
                                              alt="..."
                                              className="rounded-circle"
                                              src={"/images/dashboard/team-1-800x800.jpg"}
                                            />
                                          </a>
                                          <UncontrolledTooltip
                                            delay={0}
                                            target={user.attributes.username}
                                          >
                                            {user.attributes.username}
                                          </UncontrolledTooltip>
                                        
                                        </>

                                      ),
                                      )
                                    
                                      ) :  "No user"
                                      }
                                    </div>
                              </td>
                                {/* <td>
                                  <div textColor="neutral800">

                                    {
                                    project?.attributes?.users_permissions_users?.data ? (
                                    project.attributes.users_permissions_users.data.map(
                                      (user) => (
                                        <div key={user.id}>
                                          {user.attributes.username}
                                        </div>
                                      ),
                                    )
                                  
                                    ) :  "No user"
                                    }
                                    {console.log(project.attributes.users_permissions_users.data)}
                                  </div>
                                </td> */}

                               
                                <td>
                                  <div textColor="neutral800">
                                    {project.attributes.publishedAt !== null ? (
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Published
                                      </Badge>
                                    ) : (
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-warning" />
                                        Draft
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                                
                                <td className="text-right">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only"
                                      href="#pablo"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() => router.push(
                                          `/admin/services/edit/${project.id}`,
                                        )}
                                        label="Edit"
                                      >
                                        Edit
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() => showPopup(project)}
                                        title={project.id}
                                      >
                                        Delete
                                      </DropdownItem>
                                      <DropdownItem
                                        href={`/projects/${project.attributes.slug}`}
                                      >
                                        View
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <CardFooter className="py-4">
                          {/* Pagination */}
                          {projects.data.length > 0 ? (
                            <nav aria-label="...">
                              <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                              >
                                <PaginationItem
                                  className={`${page === 1 ? 'disabled' : ''}`}
                                >
                                  <PaginationLink
                                    onClick={() => {
                                      router.push(
                                        `/admin/services?page=${page - 1}`,
                                      );
                                    }}
                                    to={`/admin/services?page=${page - 1}`}
                                  >
                                    <i className="fas fa-angle-left" />
                                    <span className="sr-only">Previous</span>
                                  </PaginationLink>
                                </PaginationItem>
                                {pageNumbers.map((number) => (
                                  <PaginationItem
                                    key={number}
                                    className={`${
                                      page === number ? 'active' : ''
                                    }`}
                                  >
                                    <PaginationLink
                                      key={number}
                                      to={`/${number}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        router.push(
                                          `/admin/services?page=${number}`,
                                        );
                                      }}
                                    >
                                      {number}
                                    </PaginationLink>
                                  </PaginationItem>
                                ))}

                                <PaginationItem
                                  className={`${
                                    page === pageNumbers.length
                                      ? 'disabled'
                                      : ''
                                  }`}
                                >
                                  <PaginationLink
                                    onClick={() => {
                                      router.push(
                                        `/admin/services?page=${page + 1}`,
                                      );
                                    }}
                                    to={`/admin/services?page=${page + 1}`}
                                  >
                                    <i className="fas fa-angle-right" />
                                    <span className="sr-only">Next</span>
                                  </PaginationLink>
                                </PaginationItem>
                              </Pagination>
                            </nav>
                          ) : null}
                        </CardFooter>
                      </Card>
                    </div>
                  </Row>
                </div>
              )}
            </div>
          </div>
          {/* Popup DELETE CONFIRMATION */}

          <Modal toggle={() => setIsVisible(!isVisible)} isOpen={isVisible}>
            <div className=" modal-header">
              <h5 className=" modal-title" id="exampleModalLabel">
                Confirmation
              </h5>
            </div>
            <ModalBody>
              <div className=" py-3 text-center">
                <i className="text-red fas fa-exclamation-circle fa-2x" />
                <p className=" mt-4 mb-2">
                  Are you sure you want to delete this?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="shadow-none  btn"
                color="danger"
                type="button"
                onClick={() => {
                  deleteService(serviceToDelete.id);
                }}
                title="Delete"
              >
                <span className="btn-inner--icon">
                  <i className="fal fa-trash-alt" />
                </span>
                <span className="btn-inner--text"> Confirm</span>
              </Button>
              <Button
                className="ml-auto"
                color="link"
                onClick={() => setIsVisible(!isVisible)}
                type="button"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </>
      </AdminLayout>
    </StaticRouter>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * 3;
  // publicationState=preview or publicationState=live
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects?populate=*&pagination[start]=${start}&pagination[limit]=3&sort=id:DESC&publicationState=preview`,
  );

  const data = await res.json();
  return {
    props: {
      projects: data,
      // page: parseInt(page),// convert string to number
      page: +page, // convert string to number
    },
  };
}