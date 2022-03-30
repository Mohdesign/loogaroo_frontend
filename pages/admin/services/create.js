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
import Editor  from '@/components/admin/Editor';
 

 
export default function CreateServices({ allCasestudies }) { 
    const router = useRouter();
  
    console.log(allCasestudies.data);
    // Upload image
    const [file, setFile] = useState(false);
    const [response, setResponse] = useState({});

    // Input Fields
    const [ values, setValues ] = useState({
        title: "",
        content: "",
        subtitle: "",
        slug: "",
        associate_casestudies: [],
        publishedAt: null,
    });
    const { 
      title, 
      subtitle,
      slug,
      content, 
      associate_casestudies,
      publishedAt,
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
      setFile(event.target.files[0]); // setFile is the state of the image
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
    };

    // handlechange function for input fields
    const handleChange = (e) => {
      setValues({
          ...values,
          [e.target.name]: e.target.value
      })
    }
    // handleSubmit function for input fields
    const handleSubmit = (e) => {
      const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      // NOTE: TO CHECK AN ARRAY OF ITEMS USE .length
      if ( title !== "" && content !== "", slug !== "" && subtitle !== "" && associate_casestudies.length > 0) {
          let formData = new FormData();
          formData.append("files.thumbnail", file);
          formData.append("data", JSON.stringify(values));
          axios({
            method: "post",
            url: `${API_URL}/api/services`,
            data: formData
          })
          .then(({ data }) => {
            
            setResponse(data);
            setAlert(true);
            console.log("Succesfully uploaded: ", JSON.stringify(data));
            // setTimeout(() => {
            //   setAlert(false);
            // }, 1000);
            //wait seconds and redirect to the EDIT page
            setTimeout(() => {
              router.push(`/admin/services/edit/${data.data.id}`);
            }, 500);
             

          })
          .catch((error) => {
            console.log("Error: ", error.message);
            toast.error("Error: ", error.message);
          });
          
        } else {
          toast.error("Please fill in all the fields");
        }
    };
 
    // Alert message @strapi
    const [alert, setAlert] = useState(false);

    return (
      <>
       <AdminLayout title={"Services | websolutions.ca"}>
        <Box background="neutral100" padding={0}>
            <HeaderLayout 
                title="Services" 
                primaryAction={
                  <>
                  <div className="d-flex justify-content-center align-items-center ">
                    <div className="alertTop">
                      {
                      alert ?  <Alert closeLabel="Close alert" onClose={() => setAlert(false)}  
                        title="Title" className="mr-5" variant="success">Successfully saved</Alert>
                      : null
                      }
                    </div>
                    <Button className="mr-2" aria-disabled="true" startIcon={<Check />}
                    onClick={handleSubmit} size="S">Publish
                    </Button> 

                    <Button startIcon={<Check />}
                    onClick={handleSubmit} size="S">Save
                    </Button> 
                  </div>
                  </>
                } 
                
              navigationAction={<Link startIcon={<ArrowLeft />} TO="/services"
              onClick={() => router.back()}
            >  

            <a> Go back</a>
            </Link>} title="Add an entry" subtitle="New service entry" as="h2" />
           
        </Box>

        <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
              <Box padding={12} background="neutral100" className="shadow-sm p-4 mb-3 bg-white rounded">

                 <form>
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
                          : null
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
                      <label htmlFor="subtitle">Sub-Title <span><Earth className="icon" /></span></label>
                      <input type="text" className="form-control" id="subtitle" name="subtitle" value={subtitle} onChange={handleChange} placeholder="Enter Sub-title" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="slug">Slug <span><Earth className="icon" /></span></label>
                      <input type="text" className="form-control" id="slug" 
                      name="slug" value={slug} placeholder="Enter slug" />
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
                      <label className="mb-2" htmlFor="associate_casestudies">Associate Case Studies <span><Earth className="icon" /></span></label>
 
                        {
                          allCasestudies.data.map(casestudy => (
                            <div className="custom-checkbox" key={casestudy.id}>
                              <BaseCheckbox 
                              aria-label="Simple checkbox" 
                              checked={associate_casestudies.includes(casestudy.id)}
                                  onChange= {(e) => {
                                      if(e.target.checked){
                                          setValues({
                                              ...values,
                                              associate_casestudies: [...associate_casestudies, casestudy.id]
                                          })
                                      } else {
                                          setValues({
                                              ...values,
                                              associate_casestudies: associate_casestudies.filter(id => id !== casestudy.id)
                                          })
                                      }
                                  }}
                                  name="associate_casestudies"
                                  id={casestudy.id}
                              />
                              <label className="form-check-label"  htmlFor={casestudy.id}>{casestudy.attributes.title }</label>
                            </div>
                          ))
                      }
                     </div>
                    
                 </form> 
              </Box>
            </div>
          </div>
        </div>

        <ToastContainer />
     </AdminLayout>
         </>
    )
}



CreateServices.getInitialProps = async (ctx) => {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
    try {
      const res = await axios.get(`${API_URL}/api/casestudies`);
      const allCasestudies = res.data;
      return { allCasestudies };
    } catch (err) {
        console.error(err);
    }
  };

 