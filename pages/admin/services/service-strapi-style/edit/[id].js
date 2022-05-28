import { ThemeProvider } from "@strapi/design-system/ThemeProvider";
import { lightTheme } from "@strapi/design-system/themes";
import { Table, Thead, Tbody, Tr, Td, Th,TFooter  } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { Icon } from '@strapi/design-system/Icon';
import Plus from '@strapi/icons/Plus';
import {IconButton} from '@strapi/design-system/IconButton';
import Pencil from '@strapi/icons/Pencil';
import ArrowLeft from '@strapi/icons/ArrowLeft';
import Earth from '@strapi/icons/Earth';
import Check from '@strapi/icons/Check';
import Trash from '@strapi/icons/Trash';
import {Flex} from '@strapi/design-system/Flex';
import{BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import {VisuallyHidden} from '@strapi/design-system/VisuallyHidden';
import {Avatar} from '@strapi/design-system/Avatar';
import {HeaderLayout, BaseHeaderLayout, ActionLayout } from '@strapi/design-system/Layout';
import {Button} from '@strapi/design-system/Button';
import { Alert } from '@strapi/design-system/Alert';
//image card @strapi
import {
    Card,
    CardHeader,
    CardBody,
    CardCheckbox,
    CardAction,
    CardAsset,
    CardTimer,
    CardContent,
    CardBadge,
    CardTitle,
    CardSubtitle,
  } from '@strapi/design-system/Card';

import {Link} from  '@strapi/design-system/Link';
import Image from 'next/image';
import AdminLayout from "@/components/admin/AdminLayout"
//import { API_URL } from "url.config"
import 'react-toastify/dist/ReactToastify.css';

import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
// PUBLISHED AT 
import moment from "moment";

// EDITOR
import Editor  from '@/components/admin/Editor';

export default function Editprojects({ project, allCategories }) {
    console.log(project)
    const router = useRouter();
    // get the page name
    const pageName = project.data.attributes.title;
 
    if(project) {
        console.log(project.data.attributes.associate_categories.data);
    }
    // console.log(project.data.attributes.thumbnail.data.attributes.url)
    const [file, setFile] = useState(false);
    const [response, setResponse] = useState({});
     
    // Input Fields
    const[published_At, setPublished_At] = useState(project.data.attributes.publishedAt);    
    
    const [ values, setValues ] = useState({
        title: project.data.attributes.title,
        content: project.data.attributes.content,
        client: project.data.attributes.client,
        video: project.data.attributes.video,
        // slug: project.data.attributes.slug,
        associate_categories: project.data.attributes.associate_categories.data,
        publishedAt:  published_At ? moment(published_At).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
    })

    const { 
      title, 
      client,
      video,
      // slug,
      content, 
      thumbnail,
      associate_categories,
      publishedAt ,
    } = values;
    
    // slug
    //replace spaces with -
    const slugify = (text) => {
        return text
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
        .replace(/\s+/g, '-') // Replace spaces with -
    }

    // slug value same as title
    const handleSlugChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setValues({ ...values, slug: slugify(e.target.value) });
    }

    // Rich text editor
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
      setEditorLoaded(true);
    }, []);
    
    // handleInputChange function will update the state of the input field file / image
    const [image, setImage] = useState(null); // setImage is the state of the image
    const [createObjectURL, setCreateObjectURL] = useState(null); // setCreateObjectURL is the state of the image
    const [fileName, setFileName] = useState(null); // setFileName is the state of the image
    const [fileType, setFileType] = useState(null); // setFileType is the state of the image
    const [fileSize, setFileSize] = useState(null); // setFileSize is the state of the image
    const [fileError, setFileError] = useState(null); // setFileError is the state of the image
    const [kb, setKb] = useState(null); // setKb is the state of the image

    const handleInputChange = (event) => {
        if(event.target.files[0] !== null) { // if the input file is not null, and its value not empty then set the file to the file
            setFile(event.target.files[0]);
            const imgPreview = event.target.files[0]; // imgPreview is the state of the image
            setImage(imgPreview); // setImage is the state of the image
            setCreateObjectURL(URL.createObjectURL(imgPreview)); 
            // setFileName is the state of the image
            setFileName(event.target.files[0].name);
            // setFileType is the state of the image
            setFileType(event.target.files[0].type);
            // setFileError is the state of the image
            setFileError(event.target.files[0].error);
            // setFileSize is the state of the image
            // convirt b to kb from image size
            setFileSize(event.target.files[0].size);
            const b = event.target.files[0].size;
            const kb = b / 1024;
            setKb(kb);
            setValues({
                ...values,
                thumbnail: [],
                //associate_categories: []
            })
            console.log(event.target.files[0]);
        }
    };

   

    // Publish data
    const publishData = (e) => {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    let formData = new FormData();
        formData.append("files.thumbnail", file);
        formData.append("data", JSON.stringify(values));
       
        axios({
            method: "put",
            url: `${API_URL}/api/projects/${project.data.id}`,
            data: formData,
        })
        .then(({ data }) => {
          setResponse(data);
          console.log("Succesfully uploaded: ", JSON.stringify(data));
            setPublishMessage("Published");  // Display Alert message
            setAlert(true); // show alert
            setTimeout(() => {// hide the alert after 2 seconds
                setPublishMessage(false);
            }, 2000);
                 
          })
        .catch((error) => {
          console.log("Error: ", error.message);
        });
        
    };

    // Save data
    const saveData = (e) => {
        const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        let formData = new FormData();
          formData.append("files.thumbnail", file);
          formData.append("data", JSON.stringify(
            {
                title,
                client,
                video,
                // slug,
                content,
                thumbnail,
                associate_categories,
            }
          ));
          
          axios({
              method: "put",
              url: `${API_URL}/api/projects/${project.data.id}`,
              data: formData,
          })
          .then(({ data }) => {
            setResponse(data);
            console.log("Succesfully uploaded: ", JSON.stringify(data));
                setSaveMessage("Saved");  // Display Alert message
                setAlert(true); // show alert
                setTimeout(() => {// hide the alert after 2 seconds
                    setSaveMessage(false);
                }, 2000);
            })
          .catch((error) => {
            console.log("Error: ", error.message);
          });
          
      };
      // unpublish data
    const unpublish = (e) => {
        const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        let formData = new FormData();
          formData.append("files.thumbnail", file);
          formData.append("data", JSON.stringify(
            {
                title,
                client,
                video,
                // slug,
                content,
                thumbnail,
                associate_categories,
                publishedAt: null
            }
          ));
          
          axios({
              method: "put",
              url: `${API_URL}/api/projects/${project.data.id}`,
              data: formData,
          })
          .then(({ data }) => {
            setResponse(data);
            console.log("Succesfully unpublished: ", JSON.stringify(data));
            setUnpublishMessage("Unpublished");  // Display Alert message
            setAlert(true); // show alert
            setTimeout(() => {// hide the alert after 2 seconds
                setUnpublishMessage(false);
            }, 2000);
               
            })
          .catch((error) => {
            console.log("Error: ", error.message);
          });
          
      };
      // handlechange function
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    // Alert message @strapi
    const [alert, setAlert] = useState(false);
    const [publishMessage, setPublishMessage ] = useState(false);
    const [unpublishMessage, setUnpublishMessage ] = useState(false);
    const [saveMessage, setSaveMessage] = useState(false);

    return (
        <>
        <AdminLayout title={"projects | websolutions.ca"}>
         
        <ToastContainer />
        <Box background="neutral100" padding={0}>
            <HeaderLayout 
           primaryAction={
            <>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="alertTop">
                    {
                        saveMessage ?  <Alert closeLabel="Close alert" onClose={() => setSaveMessage(false)}
                        title="Success" className="mr-5" variant="success">{saveMessage}</Alert>
                        :
                        null
                    }

                    {
                        publishMessage ?  <Alert closeLabel="Close alert" onClose={() => setPublishMessage(false)}
                        title="Success" className="mr-5" variant="success">{publishMessage}</Alert>
                        :
                        null
                    }
                    {
                        unpublishMessage ?  <Alert closeLabel="Close alert" onClose={() => setUnpublishMessage(false)}
                        title="Success" className="mr-5" variant="success">{unpublishMessage}</Alert>
                        :
                        null
                    }
                </div>
                {
                    published_At ? 
                    <>
                        <Button variant="secondary" className="mr-2" startIcon={<Check />}
                        onClick={unpublish} size="S">Unpublish
                        </Button>
                    </>
                    :
                    <>
                        <Button variant="secondary" className="mr-2" startIcon={<Check />}
                        onClick={publishData} size="S">Publish
                        </Button>
                    </>
                }
                <Button onClick = {saveData} size="S">Save</Button> 
            </div>
            </>
          } 
            navigationAction={<Link startIcon={<ArrowLeft />} TO="/projects"
            onClick={() => router.back()}
            >  
            <a> Go back</a>
            </Link>} title={pageName} subtitle={"Edit project entry"} as="h2" />
        </Box>
        
        
        <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
              <Box padding={12} background="neutral100" className="shadow-sm p-4 mb-3 bg-white rounded">
                
                <Card style={{
                      width: '240px',
                      overflow: 'hidden',
                    }} id="first">
                    <CardHeader style={{
                      overflow: 'hidden',
                    }}>
                      <CardAction position="end">
                          <IconButton  onClick={() => {document.getElementById("uploadImage").click();}} aria-label="Upload Image" icon={<Pencil />} />
                      </CardAction>
                      <CardAsset>
                        {
                          createObjectURL ? 
                          <img src={createObjectURL} alt="Uploaded image" width="100%" /> 
                          : 
                            project.data.attributes.thumbnail.data == null ?
                            //""
                            <img src="/images/default-cover.png" width="100%"  />
                            :
                            <img src={project.data.attributes.thumbnail.data.attributes.url} width="100%"  />
                        }
                      </CardAsset>
                    </CardHeader>
                    <CardBody>
                      <CardContent>
                        <CardTitle>
                          {fileName ? fileName : null}
                        </CardTitle>
                        <CardSubtitle> 
                          { /* Replace image/ with "" */}
                          {fileType ? fileType.replace("image/", " ") + " | ": null}
                          { /* Replace kb with kb */}
                          {kb ? kb.toFixed(2) + " kb" : null}
                        </CardSubtitle>
                      </CardContent>
                      <CardBadge>IMG</CardBadge>
                    </CardBody>
                  </Card>
                
                <form>
                { /* HIDE THE INPUT FILE WITH THE LABEL*/}
                      <div className="form-group" style={{display:"none"}} >
                        <label htmlFor="uploadImage">Image thumbnail <span><Earth className="icon" /></span></label>
                      </div>
                      <div class=" mb-3" style={{display:"none"}}>
                        <input type="file" class="custom" id="uploadImage" onChange={handleInputChange}/>
                      </div>
                  { /* END HIDE THE INPUT FILE WITH THE LABEL*/}
                    <hr/>
                    <div className="form-group">
                      <label htmlFor="title">Title <span><Earth className="icon" /></span></label>
                      <input type="text" className="form-control" id="title" name="title" value={title} 
                      onChange={handleChange} 
                      onKeyUp={handleSlugChange}
                      placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtitle">Client <span><Earth className="icon" /></span></label>
                        <input type="text" className="form-control" id="client" name="client" value={client} onChange={handleChange} placeholder="Enter Sub-title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtitle">video <span><Earth className="icon" /></span></label>
                        <input type="text" className="form-control" id="video" name="video" value={video} onChange={handleChange} placeholder="Enter Sub-title" />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="slug">Slug <span><Earth className="icon" /></span></label>
                      <input type="text" className="form-control" id="slug" 
                      name="slug" value={slug} placeholder="Enter slug" />
                    </div> */}


                    <div className="form-group">
                      <label htmlFor="publishedAt">publishedAt <span><Earth className="icon" /></span></label>
                       
                        <input type="text" className="form-control" id="publishedAt" 
                        name="publishedAt" 
                        value = {publishedAt}
                        placeholder="publishedAt" />
                        
                    </div>

                    <div className="form-group">
                    <label htmlFor="subtitle">Content <span><Earth className="icon" /></span></label>
                    <Editor
                      name={'content'}
                      onChange = {(content) => {
                          setValues({
                              ...values,
                              content
                          })
                        }
                      }
                      value={values.content}
                      editorLoaded={editorLoaded}
                    />

                    {/* {JSON.stringify(values)} */}
                    </div>
                    <div className="form-group">
                      <label className="mb-2" htmlFor="associate_categories">Associate category <span><Earth className="icon" /></span></label>
                      {
                            allCategories.data.map(category => (
                                <div className="custom-checkbox"  key={category.id}>
                                     <BaseCheckbox  aria-label="Simple checkbox" 
                                        type="checkbox"
                                        checked={associate_categories.find(single => single.id === category.id)}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setValues({
                                                    ...values,
                                                    associate_categories: [...values.associate_categories, category]
                                                })
                                            } else {
                                                setValues({
                                                    ...values,
                                                    associate_categories: values.associate_categories.filter(single => single.id !== category.id)
                                                })
                                            }

                                        }}
                                        name="associate_categories"
                                        id={category.id}
                                    />
                                    <label className="form-check-label"  htmlFor={category.id}>{category.attributes.title }</label>
                                </div>
                            ))
                        }
                    </div>
                    {/* 
                    <input 
                    className="form-control"
                    name="thumbnail"
                    type="text"
                    id="thumbnail"
                    value={thumbnail}
                    onChange={ handleChange }
                    /> */}
                        
                </form>
                </Box>
                </div>
            </div>
        </div>


            </AdminLayout>
         </>
    )
}



export async function getServerSideProps(context) {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
    const { id } = context.query;
    const res = await axios.get(`${API_URL}/api/projects/${id}?populate=*`);
    const res2 = await axios.get(`${API_URL}/api/categories`);

    const project = res.data;
    const allCategories = res2.data;
    return {
        props: {
            project,
            allCategories
        }
    }
 }
 
// Editprojects.getInitialProps = async ctx => {
//     try {
//       const res = await axios.get('http://localhost:1337/api/categories');
//       const allCategories = res.data;
//       return { allCategories };
//     } catch (err) {
//         console.error(err);
//     }
//   };

 