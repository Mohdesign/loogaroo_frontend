/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/label-has-associated-control */
// reactstrap components
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticRouter } from 'react-router-dom';
import {
  Badge,
  Card,
  CardHeader,
  Col,
  Media,
  Row,
  Table,
} from 'reactstrap';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminNavbar from '@/components/admin/Navbars/AdminNavbar';

export default function Dashboard({ projects, page }) {

  const router = useRouter();
  //console.log(projects);
  // get the page name & service count
  const pageName = router.pathname.split('/')[1];
  const subHeaderTitle = "Loogaroo Dashboard";
  
  return (
    <StaticRouter>
      <AdminLayout title="Projects | Loogaroo">
        <>
          <AdminNavbar pageName={pageName} subHeaderTitle={subHeaderTitle} /> 
          <div className="mt--7 container-fluid">
            <div className="table-loop">
                 
                  {/* The table */}
                  <Row className="mt-md-0 mt-3">
                    <div className="col-xl-6 ">
                      <Card className="list-items">
                        <CardHeader className="bg-white border-0">
                          <Row className="align-items-center">
                             <Col sm="4">
                                <h4 className="text-default">
                                    Latest projects
                                </h4>
                            </Col>
                             
                            <Col className="text-right" sm="8">
                              <Link href="/admin/services/create">
                                <a className="btn btn-primary btn-sm">
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
                               
                              <th>Title</th>
                               <th>Thumbnail</th>
                              <th>State </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.data.map((project) => (
                              <tr key={project.id}>
                                <td>
                                  <div>
                                    <Link href={`/admin/services/edit/${project.id}`}>
                                        <a  className="text-default">{project.attributes.title}</a>
                                    </Link>
                                  </div>
                                </td>

                                <td>
                                  {project.attributes.thumbnail.data != null ? (
                                    <Media className="align-items-center">
                                     <Link href={`/admin/services/edit/${project.id}`}>
                                        <a
                                            className="avatar rounded-circle mr-3"
                                        >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={
                                            project.attributes.thumbnail.data.attributes.url
                                          }
                                          width={50}
                                          alt={project.attributes.title}
                                        />
                                      </a>
                                    </Link>
                                    </Media>
                                  ) : (
                                    <Media className="align-items-center">
                                    <Link href={`/admin/services/edit/${project.id}`}>
                                        <a
                                            className="avatar rounded-circle mr-3"
                                        >
                                        <img
                                          alt="..."
                                          src="/images/default-cover.png"
                                          width={50}
                                        />
                                      </a>
                                    </Link>
                                    </Media>
                                  )}
                                </td>

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

                                <td>
                                  <div>
                                    <Link href={`/admin/services/edit/${project.id}`}>
                                        <a  className="text-default">
                                            <i className="fal fa-edit" />
                                        </a>
                                    </Link>
                                  </div>
                                </td>
                                
                                 
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        
                      </Card>
                    </div>
                  </Row>
                </div>
                </div>
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