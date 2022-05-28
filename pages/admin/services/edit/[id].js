/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
// EDITOR

import axios from 'axios';
// PUBLISHED AT
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import { toast } from 'react-toastify';
// import { process.env.API_URL } from "url.config"

// reactstrap components
import {
  Alert, Badge, Button,
  Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, ListGroup,
  ListGroupItem, Modal,
  ModalBody, ModalFooter, Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import Editor from '@/components/admin/Editor';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminNavbar from '@/components/admin/Navbars/AdminNavbar';

export default function EditServices({ project, allCategories,allAuthors }) {
  // console.log(service);
  const router = useRouter();
  // get the page name
  const pageName = project.data.attributes.title;
  const subHeaderTitle = `Editing ${project.data.attributes.title}`;
  // Alert message
  const [alert, setAlert] = useState(false);
  const [publishMessage, setPublishMessage] = useState(false);
  const [unpublishMessage, setUnpublishMessage] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);
  // progressbar
  const [progress, setProgress] = useState(false);
  // setTimeout function for alert message
  const timer = () => {
    setTimeout(() => {
      setProgress(false);
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }, 1000);
  };
  // if (service) {
  //   // console.log(project.data.attributes.associate_categories.data);
  // }
  const [file, setFile] = useState(false);
  const [response, setResponse] = useState({});

  // Input Fields
  const [publishedAt, setPublishedAt] = useState(project.data.attributes.publishedAt);

  const [values, setValues] = useState({
    title: project.data.attributes.title,
    client: project.data.attributes.client,
    video: project.data.attributes.video,
    content: project.data.attributes.content,
    slug: project.data.attributes.slug,
    associate_categories: project.data.attributes.associate_categories.data.map(
      (category) => ({
        value: category.id,
        label: category.attributes.title,
      }),

    ),
    gallery: project.data.attributes.gallery.data ? project.data.attributes.gallery.data.map(
      (photo) => ({
        id: photo.id,
        url: photo.attributes.url,
        size: photo.attributes.size,
        value: photo.id,
        label: photo.attributes.title,
      }),
    ) : [],
    users_permissions_users: project.data.attributes.users_permissions_users.data.map(
      (user) => ({
        value: user.id,
        label: user.attributes.username,
      }),
    ),
    thumbnail: project.data.attributes.thumbnail ? project.data.attributes.thumbnail.url : '',
    publishedAt: publishedAt ? moment(publishedAt).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
  });
  const {
    title,
    client,
    video,
    slug,
    content,
    thumbnail,
    gallery,
    associate_categories,
    users_permissions_users,
  } = values;
  
  //console.log(users_permissions_users[0].label);
  // slug
  // replace spaces with -
  const slugify = (text) => text
    .toString()
    .toLowerCase()
    // remove accented characters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // remove all non word characters
    .replace(/\W/g, '-')
    // trim
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .replace(/\s+/g, '-'); // Replace spaces with -

  // slug value same as title
  const handleSlugChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValues({ ...values, slug: slugify(e.target.value) });
  };

  // Rich text editor
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // handleInputChange function will update the state of the input field file / image
  // setImage is the state of the image
  const [image, setImage] = useState(null);
  // setCreateObjectURL is the state of the image
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [fileName, setFileName] = useState(null); // setFileName is the state of the image
  const [fileType, setFileType] = useState(null); // setFileType is the state of the image
  const [imgDisplay, setImgDisplay] = useState(false);
  const [kb, setKb] = useState(null); // setKb is the state of the image
  const [restImage, setRestImage] = useState(false);
  const [imgCol, setImageCol] = useState(true);
  const [galleryDisplay, setGalleryDisplay] = useState(false);

  const handleInputChange = (filesArray) => {
    // console.log(filesArray);
    setProgress(true);
    timer();
    setRestImage(false); 
    setImageCol(true);

    setImgDisplay(true);
    setFile(filesArray[0]); // setFile is the state of the image
    const imgPreview = filesArray[0]; // imgPreview is the state of the image
    setImage(imgPreview); // setImage is the state of the image
    setCreateObjectURL(URL.createObjectURL(imgPreview));
    // setFileName is the state of the image
    setFileName(filesArray[0].name);
    // setFileType is the state of the image
    setFileType(filesArray[0].type);
    setKb(kb);
    setValues({
      ...values,
      thumbnail: [],
      // associate_categories: []
    });
    // console.log(event.target.files[0]);
  };

    // Upload Gallery
    const [galleryFile, setGalleryFile] = useState([]);
    const handleGalleryInputChange = (filesGalleryArray) => {
      setGalleryDisplay(true);
      setGalleryFile((oldArray) => [
        ...filesGalleryArray.map((f) => Object.assign(f, {
          preview: URL.createObjectURL(f),
        })),
        ...oldArray,
      ]);
    };
    

  // delete service
  const [isVisible, setIsVisible] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState({});

  const deleteService = async (id) => {
    try {
      const getResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${project.data.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const data = await getResponse.json();
      // console.log(data);
      if (getResponse.status === 200) {
        // wait seconds and redirect to the new page
        setTimeout(() => {
          router.back();
        }, 1200);
        // remove toast after seconds
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
        toast.success('Deleted');
        setIsVisible(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };
    // show the popup
  const showPopup = (thisPage) => {
    // This runs when the button delete on the service is clicked and we want to show the popup
    setIsVisible(true);
    setServiceToDelete(thisPage);
  };
  // Publish data
  const publishData = (e) => {
    const formData = new FormData();
    formData.append('files.thumbnail', file);
    galleryFile.forEach((f) => {
      formData.append('files.gallery', f, f.name);
    });
    formData.append('data', JSON.stringify(
      {
        title,
        client,
        video,
        slug,
        content,
        thumbnail,
        gallery: gallery.map((photo) => photo.value),
        users_permissions_users: users_permissions_users.map((user) => user.value),
        publishedAt: publishedAt ? moment(publishedAt).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        associate_categories: associate_categories.map((category) => category.value),
      },
    ));

    axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${project.data.id}`,
      data: formData,
    })
      .then(({ data }) => {
        setResponse(data);
        // console.log('Succesfully uploaded: ', JSON.stringify(data));
        // setPublishMessage('Published'); // Display Alert message
        // setAlert(true); // show alert
        // setTimeout(() => { // hide the alert after 2 seconds
        //   setPublishMessage(false);
        //   router.push('/admin/services');
        // }, 800);
        // wait seconds and redirect to the new page
        setTimeout(() => {
          router.back();
        }, 1200);
        // remove toast after seconds
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
        toast.success('Published');
        setIsVisible(false);
      })
      .catch((error) => {
        // console.log('Error: ', error.message);
      });
  };

  // Save data
  const saveData = (e) => {
    const formData = new FormData();
    formData.append('files.thumbnail', file);
    galleryFile.forEach((f) => {
      formData.append('files.gallery', f, f.name);
    });
    formData.append('data', JSON.stringify(
      {
        title,
        client,
        video,
        slug,
        content,
        thumbnail,
        gallery: gallery.map((photo) => photo.value),
        users_permissions_users: users_permissions_users.map((user) => user.value),
        associate_categories: associate_categories.map((category) => category.value),
      },
    ));

    axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${project.data.id}`,
      data: formData,
    })
      .then(({ data }) => {
        setResponse(data);
        // console.log('Succesfully uploaded: ', JSON.stringify(data));
        // setSaveMessage('Saved'); // Display Alert message
        // setAlert(true); // show alert
        // setTimeout(() => { // hide the alert after 2 seconds
        //   setSaveMessage(false);
        //   router.push('/admin/services');
        // }, 800);
        // setTimeout(() => {
        //   router.push('/admin/services');
        // }, 1200);
        // remove toast after seconds
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
        toast.success('Saved');
        setIsVisible(false);
      })
      .catch((error) => {
        // console.log('Error: ', error.message);
      });
  };
  // unpublish data
  const unpublish = (e) => {
    const formData = new FormData();
    formData.append('files.thumbnail', file);
    galleryFile.forEach((f) => {
      formData.append('files.gallery', f, f.name);
    });
    formData.append('data', JSON.stringify(
      {
        title,
        client,
        video,
        slug,
        content,
        thumbnail,
        gallery: gallery.map((photo) => photo.value),
        users_permissions_users: users_permissions_users.map((user) => user.value),
        associate_categories: associate_categories.map((category) => category.value),
        publishedAt: null,
      },
    ));

    axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${project.data.id}`,
      data: formData,
    })
      .then(({ data }) => {
        setResponse(data);
        // console.log('Succesfully unpublished: ', JSON.stringify(data));
        // setUnpublishMessage('Unpublished'); // Display Alert message
        // setAlert(true); // show alert
        // setTimeout(() => { // hide the alert after 2 seconds
        //   setUnpublishMessage(false);
        //   router.push('/admin/services');
        // }, 800);
        setTimeout(() => {
          router.back();
        }, 1200);
        // remove toast after seconds
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
        toast.success('Unpublished');
        setIsVisible(false);
      })
      .catch((error) => {
        // console.log('Error: ', error.message);
      });
  };
  // handlechange function
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // remove image from the gallery list
  const allImages = gallery;
  const [pics, setPics] = useState([]);
  const removeImage = (id) => {
    setPics((oldState) => oldState.filter((item) => item.id !== id));
    // console.log(pics);
  };
  useEffect(() => {
    setPics(allImages);
  }, []);

  // Clipboard copy
  const [copyMessage, setCopyMessage] = useState(false);
  const copyMessageTimer = () => {
    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 1000);
  };

  
  return (
    <AdminLayout title="projects | websolutions.ca">
      <AdminNavbar pageName={pageName} subHeaderTitle={subHeaderTitle} />
      <Container className="mt--7" fluid>

        <Row>
               
          <Col className="order-2 mb-5 mb-xl-0" xl="4"> 
            <Card className="card-sidebar">

              <CardBody className="pt-0 pt-md-1">
                <Row>
                
                  <div className="col">

                    <ListGroup flush>
                      <ListGroupItem className="d-flex justify-content-between mb-5 mt-3 border-0">
                        <span className="description text-uppercase">
                          {' '}
                          {project.data.attributes.publishedAt !== null ? (
                            <Badge
                              color=""
                              className="badge-dot pt-0"
                            >
                              <i className="bg-success mb-1" />
                              Published
                            </Badge>
                          ) : (
                            <Badge
                              color=""
                              className="badge-dot pt-0"
                            >
                              <i className="bg-warning mb-1" />
                              Draft
                            </Badge>
                          )}
                        </span>
                        <span className="description">
                          <a href={`/projects/${project.data.attributes.slug}`} className="text-primary">
                            Preview
                            <i className="far fa-external-link ml-2" />
                          </a>
                        </span>
                      </ListGroupItem>

                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Created At</span>
                        <span className="description">{moment(project.data.attributes.createdAt).format('MMMM Do YYYY')}</span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Published At</span>
                        <span className="description">
                          <Badge color="danger">
                            {
                            project.data.attributes.publishedAt
                              ? moment(project.data.attributes.publishedAt).format('MMMM Do YYYY')
                              : 'Not published'
                            }
                          </Badge>

                        </span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Updated At</span>
                        <span className="description">{moment(project.data.attributes.updatedAt).format('MMMM Do YYYY')}</span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Language</span>
                        <span className="description text-uppercase">
                          {' '}
                          {project.data.attributes.locale}
                        </span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Associate categories</span>
                        <span className="description text-uppercase">
                          {' '}
                          {project.data.attributes.associate_categories.data.map((category) => category.attributes.title).join(', ')}
                        </span>
                      </ListGroupItem>
                      <ListGroupItem className="buttons">
                        <span className="description">
                          <Button
                            block
                            size="md"
                            color="primary"
                            type="button"
                            onClick={saveData}
                            title={`Save ${project.data.attributes.title}`}
                          >
                            Save
                          </Button>
                        </span>
                        <br />
                        <span className="description">
                          {project.data.attributes.publishedAt ? (
                            <Button
                              block
                              outline
                              size="md"
                              color="primary"
                              type="button"
                              onClick={unpublish}
                              title={`Unpublish ${project.data.attributes.title}`}
                              className="shadow-none"
                            >
                              <i className="fal fa-times mr-2" />
                              Unpublish
                            </Button>
                          ) : (

                            <Button
                              block
                              outline
                              size="md"
                              color="primary"
                              type="button"
                              onClick={publishData}
                              title={`Publish ${project.data.attributes.title}`}
                              className="shadow-none"
                            >
                              <i className="fal fa-check mr-2" />
                              Publish
                            </Button>
                          )}
                        </span>
                        <br />
                        <span className="description">
                          <Button
                            outline
                            block
                            size="md"
                            color="danger"
                            type="button"
                            onClick={() => showPopup(project)}
                            title={`Delete ${project.data.attributes.title}`}
                          >
                            <i className="fal fa-trash-alt mr-2" />
                            Delete this entry
                          </Button>
                        </span>
                      </ListGroupItem>

                    </ListGroup>
                  </div>
                </Row>
         
              </CardBody>
            </Card>
          </Col>
          <Col className="order-1 mt-md-0 mt-3" xl="8">
            <Card className="bg-secondary">
              <CardHeader className="bg-white border-b-1 admin-card-header">
                <Row className="align-items-center">
                  <div className="d-flex justify-content-center align-items-center ">
                    <div className="alertTop">
                      {
                      alert ? (
                        <Alert
                          color="success"
                          isOpen={alert}
                        >
                          <strong>
                            <i className="fas fa-check-circle" />
                            {' '}
                            Successfully!
                          </strong>
                          {' '}
                          uploaded
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => { setAlert(false); }}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </Alert>

                      )
                        : null
                      }

                    </div>
                  </div>
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
                    {
                    publishedAt
                      ? ''
                      : (
                        <Button
                          color="outline-primary"
                          onClick={publishData}
                        >
                          <i className="fal fa-check" />
                          &nbsp;  Publish
                        </Button>
                      )
                    }
                    <Button onClick={saveData} size="S" color="primary">
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="bg-white ">
                <div className="align-items-center row d-inline-block d-lg-none mb-4">
                  <div className="col">
                    <h2 className="text-uppercase h4 ls-1 mb-0">{pageName}</h2>
                    <h5 className="mb-0 text-muted">
                      {subHeaderTitle}
                    </h5>
                  </div>
                </div>
                <Form>
                  <Row>
                    <Col lg="6">
                      <Dropzone
                        onChange={handleInputChange}
                    // onSubmit={handleSubmit}
                        onDrop={handleInputChange}
                        maxFiles={1}
                        multiple={false}
                        canCancel
                        accept="image/*,audio/*,video/*"
                        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input
                              type="file"
                              {...getInputProps()}
                              id="uploadImage"
                            />
                            <p>Drag'n'drop thumbnail image, or click to select image</p>

                          </div>
                        )}
                      </Dropzone>
                    </Col>
                      <Col lg="4">
                         { restImage ? (
                           <div>
                          <p className=" mb-0">
                            Select image to upload
                          </p>
                          <small className="text-gray">
                            Nothing is uploaded yet
                          </small>
                        </div>
                      ) : ("")}
                      { imgCol ? (
                        <Card
                          style={{
                            position: 'relative',
                            maxWidth: '240px',
                            width: '100%',
                            border: '0',
                          }}
                          id="first"
                        >
                          <Card className="border-0">
                            {
                          createObjectURL
                            ? (
                              <>
                                <img
                                  src={createObjectURL}
                                  alt="Thumbnail"
                                  className="img-fluid uploaded-thumbnail"
                                />
                                <Button
                                  onClick={() => {
                                    setValues({
                                      ...values,
                                      thumbnail: setImage || null,
                                    });
                                    setCreateObjectURL('');
                                  }}
                                  color="secondary"
                                  size="md"
                                  style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    background: '#fff',
                                  }}
                                >
                                  <i className="fal fa-trash-alt" />
                                </Button>
                              </>
                            )
                            : project.data.attributes.thumbnail.data == null
                              ? (
                                // <img
                                //   src="/images/default-cover.png"
                                //   alt="Default cover"
                                //   className="img-fluid uploaded-thumbnail"
                                // />
                                <div>
                                  <p className=" mb-0">
                                    Select image to upload
                                  </p>
                                  <small className="text-gray">
                                    Nothing is uploaded yet
                                  </small>
                                </div>
                              )
                              : (
                                <>
                                  <img
                                    src={project.data.attributes.thumbnail.data.attributes.url}
                                    alt="Thumbnail"
                                    className="img-fluid uploaded-thumbnail"
                                  />
                                  <Button
                                    onClick={() => {
                                      setFile(false);
                                      setValues({
                                        ...values,
                                        thumbnail: [],
                                      });
                                      setImageCol(false);
                                      setRestImage(true);
                                    }}
                                    color="secondary"
                                    size="md"
                                    style={{
                                      position: 'relative',
                                      display: 'inline-block',
                                      background: '#fff',
                                    }}
                                  >
                                    <i className="fal fa-trash-alt" />
                                  </Button>
                                </>
                              )
                            }
                          </Card>
                          {/* {createObjectURL ? (
                            <CardBody>
                              <div>
                                <div>
                                  {fileName || null}
                                </div>
                              </div>
                            </CardBody>
                          ) : null} */}

                          { progress ? (
                            <div className="animatted-progress">
                              <div className="animatted-progress-value" />
                            </div>
                          ) : null}
                        </Card>

                        ) : null}
                      </Col>
                  </Row>

                  <hr />
                  <h6 className="heading-small text-muted mb-4">
                    Project information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="title"
                          >
                            Title
                            {' '}
                            <span className="text-warning">*</span>
                          </label>
                          <Input
                            className="form-control"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            onKeyUp={handleSlugChange}
                            placeholder="Enter title"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="client"
                          >
                            Client
                            {' '}
                            <span className="text-warning">*</span>
                          </label>
                          <Input
                            className="form-control"
                            type="text"
                            id="client"
                            name="client"
                            value={client}
                            onChange={handleChange}
                            placeholder="Enter Client"
                          />
                        </FormGroup>

                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="title"
                          >
                            Author 
                            {' '}
                            <span className="text-warning">*</span>
                          </label>
                           
                            <Select
                            isMulti={true}
                            className="multi-opions"
                            options={
                              allAuthors.map((author) => ({
                                value: author.id,
                                htmlFor: author.id,
                                label: author.username,
                                id: author.id,
                                key: author.id,
                                checked: author.id,
                              }))
                            }
                            value={
                              users_permissions_users
                            }
                             
                            //  Select from the Multiple options
                            onChange={(e) => {
                              // console.log(e);
                              setValues({
                                ...values,
                                users_permissions_users: e.map((user) => ({
                                  value: user.value,
                                  label: user.label,
                                })),
    
                              });
                              //console.log(users_permissions_users);
                            }}
                          />
                         </FormGroup>

                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="client"
                          >
                            Video Iframe
                            {' '}
                            <span className="text-warning">*</span>
                          </label>
                          <Input
                            className="form-control"
                            type="text"
                            id="video"
                            name="video"
                            value={video}
                            onChange={handleChange}
                            placeholder="Enter Video Iframe"
                          />
                        </FormGroup>

                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="slug"
                          >
                            Slug
                          </label>
                          <Input
                            className="form-control"
                            type="text"
                            id="slug"
                            name="slug"
                            value={slug}
                            placeholder="Enter slug"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                  </div>

                  {/* Associate Category */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Associate Categories</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="mb-2" htmlFor="associate_categories">
                        Categories
                        {' '}
                        <span className="text-warning">*</span>
                      </label>
                      <Select
                        isMulti
                        options={
                          allCategories.data.map((category) => ({
                            value: category.id,
                            label: category.attributes.title,
                          }))
                        }
                        value={
                          associate_categories.map((category) => ({
                            value: category.value,
                            label: category.label,
                          }))
                         }
                        //  Select from the Multiple options
                        onChange={(e) => {
                          // console.log(e);
                          setValues({
                            ...values,
                            associate_categories: e.map((category) => ({
                              value: category.value,
                              label: category.label,
                            })),

                          });
                          // console.log(associate_categories);
                        }}
                      />
                    </FormGroup>

                    {/* {
                      allCategories.data.map((category) => (
                        <div className="custom-checkbox" key={category.id}>
                          <input
                            aria-label="Simple checkbox"
                            type="checkbox"
                            checked={associate_categories.find(
                              (single) => single.id === category.id,
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setValues({
                                  ...values,
                                  associate_categories:
                                    [...values.associate_categories, category],
                                });
                              } else {
                                setValues({
                                  ...values,
                                  associate_categories: values.associate_categories.filter(
                                    (single) => single.id !== category.id,
                                  ),
                                });
                              }
                            }}
                            name="associate_categories"
                            id={category.id}
                          />
                          <label className="form-check-label" htmlFor={category.id}>{category.attributes.title }</label>
                        </div>
                      ))
                  } */}
                  </div>

                  {/* Description */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Long description about the project</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>
                        Description
                        {' '}
                        <span className="text-warning">*</span>
                      </label>
                      <Editor
                        className="form-control"
                        placeholder="A few words about you ..."
                        rows="4"
                        name="content"
                        // eslint-disable-next-line no-shadow
                        onChange={(content) => {
                          setValues({
                            ...values,
                            content,
                          });
                        }}
                        value={values.content}
                        editorLoaded={editorLoaded}
                      />
                      {/* {JSON.stringify(values)} */}
                    </FormGroup>
                  </div>

                  {/* Gallery */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Gallery images</h6>
                  <div className="pl-lg-4">
                  <FormGroup>
                      <label className="mb-2" htmlFor="associate_casestudies">
                        Gallery
                      </label>
                      <Dropzone
                        onChange={handleGalleryInputChange}
                        onDrop={handleGalleryInputChange}
                        multiple
                        canCancel={false}
                        accept="image/*,audio/*,video/*"
                        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input
                              type="multiple"
                              {...getInputProps()}
                            />
                            <p>Drag'n'drop files, or click to select files</p>

                          </div>
                        )}
                      </Dropzone>

                      {/* Gallery files from DB */}
                      { project.data.attributes.gallery.data ? (
                        <Row>
                          <Col lg="12 px-2">
                            {/* Clipboard Message Confirmation */}
                            { copyMessage && (
                            <div className="col clipboard-message">
                              <small className="text-success">Copied</small>
                            </div>
                            ) }
                            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                              {pics.map((pic) => (

                                <li className="list-group-item px-0 dz-processing dz-image-preview">
                                  <div className="row  d-flex align-items-center">
                                    <div className="col-auto">
                                      <div className="avatar">
                                        <img
                                          className="avatar-img rounded"
                                          src={pic.url}
                                          alt={pic.name}
                                        />
                                      </div>
                                    </div>
                                    <div className="col ml--3">
                                      <h4 className="mb-1 path-name">{pic.url}</h4>
                                      <p className="small text-muted mb-0">
                                        <strong>{pic.size}</strong>
                                        {' '}
                                        { pic.size > 1000 ? 'MB' : 'KB' }
                                      </p>
                                    </div>

                                    <div className="col-auto mr-md-3">
                                      <div className="dropdown">

                                        <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <i className="fad fa-more-vertical" />
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            href="#\"
                                            onClick={() => {
                                              setValues({
                                                ...values,
                                                gallery: values.gallery.filter(
                                                  (single) => single.id !== pic.id,
                                                ),
                                              });
                                              removeImage(pic.id);
                                            }}
                                            className="dropdown-item"
                                          >
                                            Remove
                                          </a>

                                          <a
                                            href="#\"
                                            onClick={() => navigator.clipboard.writeText(pic.url)
                                              .then(() => {
                                                copyMessageTimer();
                                              })}
                                            className="dropdown-item"
                                          >
                                            Copy to clipboard
                                          </a>

                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </li>

                              ))}
                            </ul>
                          </Col>
                        </Row>
                      )
                        : <p>No images uploaded</p>}

                      {/* Upload files */}
                      { galleryFile.length > 0 ? (
                        <Row>
                          <Col lg="12 px-2">
                            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                              {galleryFile.map((f) => (
                                <li className="list-group-item px-0 dz-image-preview">
                                  <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                      <div className="avatar">
                                        <img
                                          className="avatar-img rounded"
                                          src={f.preview}
                                          alt={f.path}
                                        />
                                      </div>
                                    </div>
                                    <div className="col ml--3">
                                      <h4 className="mb-1 path-name">{f.path}</h4>
                                      <p className="small text-muted mb-0">
                                        <strong>{f.size}</strong>
                                        {' '}
                                        { f.size > 1000 ? 'MB' : 'KB' }
                                      </p>
                                    </div>
                                    <div className="col-auto mr-md-3">
                                      <div className="dropdown">
                                        <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <i className="fad fa-more-vertical" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <button
                                            type="button"
                                            onClick={() => setGalleryFile(galleryFile.filter(
                                              (single) => single.path !== f.path,
                                            ))}
                                            className="dropdown-item"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </Col>
                        </Row>
                      )
                        : null}
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        


        {/* Popup DELETE CONFIRMATION */}

        <Modal className="admin-backend" toggle={() => setIsVisible(!isVisible)} isOpen={isVisible}>
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
              <span className="btn-inner--text"> &nbsp;Confirm</span>
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
      </Container>

    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects/${id}?populate=*`);
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories`);
  const res3 = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users`);

  const project = res.data;
  const allCategories = res2.data;
  const allAuthors = res3.data;
  return {
    props: {
      project,
      allCategories,
      allAuthors,
    },
  };
}

// EditServices.getInitialProps = async ctx => {
//     try {
//       const res = await axios.get('http://localhost:1337/api/categories');
//       const allCategories = res.data;
//       return { allCategories };
//     } catch (err) {
//         console.error(err);
//     }
//   };