/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminNavbar from '@/components/admin/Navbars/AdminNavbar';
import Editor from '@/components/admin/Editor';

export default function CreateServices({ allCategories,allAuthors }) {
  const router = useRouter();
  // pagename
  const pageName = router.pathname.split('/')[2];
  const subHeaderTitle = 'Create new entry';
  // Upload image
  const [file, setFile] = useState(false);
  const [response, setResponse] = useState({});

  // Input Fields
  const [values, setValues] = useState({
    title: '',
    client: '',
    video: '',
    users_permissions_users: [],
    associate_categories: [],
    content: '',
    publishedAt: null,
    slug: '',
  });
  const {
    title,
    client,
    video,
    users_permissions_users,
    associate_categories,
    content,
    slug,
  } = values;

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

  // Alert message @strapi
  const [alert, setAlert] = useState(false);
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
  // handleInputChange function will update the state of the input field file / image
  // setImage is the state of the image
  const [image, setImage] = useState(null);
  // setCreateObjectURL is the state of the image
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [fileName, setFileName] = useState(null); // setFileName is the state of the image
  const [fileType, setFileType] = useState(null); // setFileType is the state of the image
  const [kb, setKb] = useState(null); // setKb is the state of the image
  const [restImage, setRestImage] = useState(true);
  const [imgDisplay, setImgDisplay] = useState(false);
  const [galleryDisplay, setGalleryDisplay] = useState(false);

  const handleInputChange = (filesArray) => {
    // console.log(filesArray);
    setProgress(true);
    timer();
    setImgDisplay(true);
    setRestImage(false);

    setFile(filesArray[0]); // setFile is the state of the image
    const imgPreview = filesArray[0]; // imgPreview is the state of the image
    setImage(imgPreview); // setImage is the state of the image
    setCreateObjectURL(URL.createObjectURL(imgPreview));
    // setFileName is the state of the image
    setFileName(filesArray[0].name);
    // setFileType is the state of the image
    setFileType(filesArray[0].type);
    setKb(kb);
  };
  // Upload Gallery
  const [galleryFile, setGalleryFile] = useState([]);
  const handleGalleryInputChange = (filesGalleryArray) => {
    // console.log(filesArray);
    setGalleryDisplay(true);
    // console.log(filesGalleryArray);
    setGalleryFile((oldArray) => [
      ...filesGalleryArray.map((f) => Object.assign(f, {
        preview: URL.createObjectURL(f),
      })),
      ...oldArray,
    ]);
  };

  // handlechange function for input fields
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  // handleSubmit function for input fields
  const handleSubmit = (e) => {
    // NOTE: TO CHECK AN ARRAY OF ITEMS USE .length
    if (title !== '' && content !== '' && slug !== '' && client !== ''&&  users_permissions_users.length > 0 && associate_categories.length > 0) {
      const formData = new FormData();
      formData.append('files.thumbnail', file);
      galleryFile.forEach((f) => {
        formData.append('files.gallery', f, f.name);
      });
      formData.append('data', JSON.stringify(values));
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects`,
        data: formData,
      })
      .then(({ data }) => {
        setResponse(data);
        // setAlert(true);
        // console.log('Succesfully uploaded: ', JSON.stringify(data));
        toast.success('Saved and ready to Publish: ', JSON.stringify(data));

        // redirect to the EDIT page
        router.push(`/admin/services/edit/${data.data.id}`);
      })
      .catch((error) => {
        // console.log('Error: ', error.message);
        toast.error('Error: ', error.message);
      });
  } else {
    toast.error('Please fill in all the fields', { icon: <FontAwesomeIcon icon={ faExclamationTriangle } color="#f5c0b8"  /> });
  }
};

  return (
    <AdminLayout title="Services | websolutions.ca">
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
                          <Badge
                              color=""
                              className="badge-dot pt-0"
                            >
                              <i className="bg-warning mb-1" />
                              Draft
                          </Badge>
                        </span>
                        <span className="description">
                          <a href="#\" className="text-primary btn disabled p-0">
                            Preview
                            <i className="far fa-external-link ml-2" />
                          </a>
                        </span>
                      </ListGroupItem>

                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Created At</span>
                        <span className="description">..........</span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Published At</span>
                        <span className="description">
                          <Badge color="danger">
                          Not published
                          </Badge>

                        </span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Updated At</span>
                        <span className="description">..........</span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Language</span>
                        <span className="description text-uppercase">
                          EN
                        </span>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold h4">Associate categories</span>
                        <span className="description text-uppercase">
                          .........
                        </span>
                      </ListGroupItem>
                      
                      <ListGroupItem className="buttons">
                        <span className="description">
                          <Button
                            block
                            size="md"
                            color="primary"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Save
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
            <CardHeader className="admin-card-header bg-white border-b-1">
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
                    
                    <Button
                      onClick={handleSubmit}
                      color="primary"
                    >
                      {' '}
                      save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="bg-white">
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
                    <Col className="order-xl-1" xl="8">
                      <Dropzone
                        onChange={handleInputChange}
                      // onSubmit={handleSubmit}
                        onDrop={handleInputChange}
                        maxFiles={1}
                        multiple={false}
                        canCancel={false}
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
                    <Col className="order-xl-2" xl="4">
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
                      

                      { imgDisplay ? (
                        <Card
                          className="border-0"
                          style={{
                            position: 'relative',
                            maxWidth: '240px',
                            width: '100%',

                          }}
                          id="first"
                        >

                          <Card className="border-0">
                            { createObjectURL
                              ? (
                                <>
                                  <img
                                    src={createObjectURL}
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
                                      setCreateObjectURL('');
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
                              : null}
                          </Card>

                          { progress ? (
                            <>
                              {/* <CardBody>
                                <div>
                                  <div>
                                    {fileName || null}
                                  </div>
                                </div>
                              </CardBody> */}
                              <div className="animatted-progress">
                                <div className="animatted-progress-value" />
                              </div>
                            </>
                          ) : null}
                        </Card>
                      ) : null}
                      { /* HIDE THE INPUT FILE WITH THE LABEL */}
                      <FormGroup className="form-group" style={{ display: 'none' }}>
                        <label htmlFor="uploadImage">
                          Image thumbnail
                        </label>
                      </FormGroup>
                      <div className=" mb-3" style={{ display: 'none' }}>
                        <input type="file" className="custom form-control" id="uploadImage" onChange={handleInputChange} />
                      </div>
                      { /* END HIDE THE INPUT FILE WITH THE LABEL */}
                    </Col>
                  </Row>
                  <hr />
                  <h6 className="heading-small text-muted mb-4">
                    Service information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="title"
                          >
                            Title <span class="text-warning">*</span>
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
                    </Row>

                    <Row>
                    <Col lg="6">
                      <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="client"
                          >
                            Client <span class="text-warning">*</span>
                          </label>
                          <Input
                            className="form-control"
                            type="text"
                            id="client"
                            name="client"
                            value={client}
                            onChange={handleChange}
                            placeholder="Enter client name"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="title"
                          >
                            Author <span class="text-warning">*</span>
                          </label>
                          <Select
                            isMulti
                            className="multi-opions"
                            options={
                              allAuthors.map((author) => ({
                                value: author.id,
                                htmlFor: author.id,
                                label: author.username,
                                name: 'users_permissions_user',
                                id: author.id,
                                key: author.id,
                                checked: author.id,
                              }))
                            }
                            //  Select from the Multiple options
                            onChange={(e) => {
                               console.log(e);
                              setValues({
                                ...values,
                                users_permissions_users: e ? e.map((c) => c.id) : [],
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                     
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="client"
                          >
                            Iframe Video URL 
                          </label>
                          <Input
                            className="form-control"
                            type="text"
                            id="video"
                            name="video"
                            value={video}
                            onChange={handleChange}
                            placeholder="Iframe Video URL"
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

                  {/* Description */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Long description about the service</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Description </label>
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
                  {/* Associate Category */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Associate Categories</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="mb-2" htmlFor="associate_categories">
                      Categories
                      </label>

                      {/* {
                        allCategories.data.map((category) => (
                          <div className="custom-control custom-checkbox" key={category.id}>
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              aria-label="Simple checkbox"
                              checked={associate_categories.includes(category.id)}
                              onChange={(e) => {
                                // console.log(e.target);
                                if (e.target.checked) {
                                  setValues({
                                    ...values,
                                    associate_categories:
                                    [...associate_categories, category.id],
                                  });
                                } else {
                                  setValues({
                                    ...values,
                                    associate_categories: associate_categories.filter(
                                      (id) => id !== category.id,
                                    ),
                                  });
                                }
                              }}
                              name="associate_categories"
                              id={category.id}
                            />
                            <label
                              className="form-check-label
                            custom-control-label"
                              htmlFor={category.id}
                            >
                              {category.attributes.title }

                            </label>
                          </div>
                        ))
                        } */}
                      <Select
                        isMulti
                        options={
                          allCategories.data.map((category) => ({
                            value: category.id,
                            htmlFor: category.id,
                            label: category.attributes.title,
                            name: 'associate_categories',
                            id: category.id,
                            key: category.id,
                            checked: associate_categories.includes(category.id),
                          }))
                        }
                        //  Select from the Multiple options
                        onChange={(e) => {
                          // console.log(e);
                          setValues({
                            ...values,
                            associate_categories: e ? e.map((c) => c.id) : [],
                          });
                        }}
                      />

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
                    // onSubmit={handleSubmit}
                        onDrop={handleGalleryInputChange}
                    // maxFiles={7}
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
                      { galleryFile.length > 0 ? (
                        <Row>
                          {
                        galleryFile.map((f) => (
                          <Col lg="2 px-2">
                            <Card className="mb-3">
                              <img
                                className="dropzone-preview"
                                src={f.preview}
                                alt="Uploaded image"
                              />
                            </Card>
                          </Col>
                        ))
                      }
                        </Row>
                      ) : null}
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </AdminLayout>
  );
}

CreateServices.getInitialProps = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories`);
    const res2 = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users`);
    const allCategories = res.data;
    const allAuthors = res2.data;
    return { allCategories,allAuthors };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

