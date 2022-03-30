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
import ArrowRight from '@strapi/icons/ArrowRight';
import More from '@strapi/icons/More';
import Trash from '@strapi/icons/Trash'; 
import Eye from '@strapi/icons/Eye';
import {Flex} from '@strapi/design-system/Flex';
import{BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import {VisuallyHidden} from '@strapi/design-system/VisuallyHidden';
import {Avatar} from '@strapi/design-system/Avatar';
import {HeaderLayout, BaseHeaderLayout, ActionLayout } from '@strapi/design-system/Layout';
import {Button} from '@strapi/design-system/Button';
import { Dots, NextLink, PageLink, Pagination, PreviousLink } from '@strapi/design-system/Pagination';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import EmptyDocuments from '@strapi/icons/EmptyDocuments';
import { StaticRouter } from 'react-router-dom'
 


import {Link} from  '@strapi/design-system/Link';
import Image from 'next/image';
import AdminLayout from "@/components/admin/AdminLayout"
import { API_URL } from "url.config"
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// DELETE SERVCICE
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import {Stack} from '@strapi/design-system/Stack';
// PUBLISHED AND DRAFT STATE
import { Status } from '@strapi/design-system/Status';
import { Badge } from '@strapi/design-system/Badge';
// PUBLISHED AT 
import moment from "moment";

import { useState } from "react";

export default function Services({ services, page }) {
        //console.log(services.meta.pagination.total + " total services");

        const router = useRouter();
        
        // get the page name & service count
        const pageName = router.pathname.split('/')[2];
        const servicesCount = services.meta.pagination.total;
        
        // get the last 
        const lastPage = Math.ceil(services.meta.pagination.total / 6);

        // create an array containing the page numbers
        const pageNumbers = [];

        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i);
        }

        // Checkbox
        const [checkoxval , setCheckboxVal] = useState([]);
        const [checkedItems, setCheckedItems] = useState([]);
        const [allChecked, setAllChecked] = useState(false);
        const [deleteButton, setDeleteButton] = useState(false);

        // delete service
        const [isVisible, setIsVisible] = useState(false);
        const [service, setService] = useState({});
            
        const deleteService = async (id) => {           
            const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;     
            try {
                const response = await fetch(`${API_URL}/api/services/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data);
                if ( response.status === 200 ) {
                //wait seconds and redirect to the new page
                setTimeout(() => {
                    router.push("/admin/services?page=1");
                } 
                , 1200);
                // remove toast after seconds
                setTimeout(() => {
                    toast.dismiss();
                }, 1000);
                    toast.success("Service deleted successfully");        
                    setIsVisible(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        // delete multiple checkbox function    
        const DeleteSelectedService = async (id) => {
            const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;   
            try {
                // craete array of filter 
                Array.from(checkoxval).forEach(async (id) => {
                    const response = await fetch(`${API_URL}/api/services/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });

                const data = await response.json();
                console.log(data);
                    
                if ( response.status === 200 ) {
                    //wait seconds and redirect to the new page
                    setTimeout(() => {
                        router.push("/admin/services?page=1");
                    }
                    , 1200);
                    // remove toast after seconds
                    setTimeout(() => {
                        toast.dismiss();
                    }, 1000);
                    toast.success("Service deleted successfully");
                    setIsVisible(false);
                    setDeleteButton(false);

                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // show the popup
    const showPopup = (service) => {
        // This runs when the button on the service is clicked and we want to show the popup
        setIsVisible(true);
        setService(service);
    }

    // count how many services are checked
    const countChecked = () => {
        // count the number of checked items
        const checkedCount = checkedItems.length;
        return checkedCount;
    }

    return (
   
    <StaticRouter 
    >
        <AdminLayout title={"Services | websolutions.ca"}>
            <>
            <ToastContainer />
            <Box background="neutral100" padding={0}>
                <HeaderLayout 
                primaryAction={<Button startIcon={<Plus />}
                onClick={() => 
                    router.push(`/admin/services/create`)
                }>Create an entry</Button>} 

                navigationAction={<Link startIcon={<ArrowLeft />} TO="/services"
                onClick={() => router.back()}
                >  
                <a> Go back</a>
                </Link>} title={pageName} subtitle={servicesCount + " entries found"} as="h2" />

            </Box>
               
            <ThemeProvider theme={lightTheme}>
                            
            {
                services.data.length === 0 ?
                <Box padding={0} background="neutral100">
                    <EmptyStateLayout
                    icon={<EmptyDocuments width="160px" />}
                    content="You don't have any content yet..." 
                    action={<Button 
                    variant="secondary" startIcon={<Plus />}
                    onClick={() =>
                        router.push(`/admin/services/create`)
                    }>
                    Create your first service entry
                    </Button>} />
                </Box>
                : 
                <Box centered  background="neutral100" >
                    {/* The Delete button for checkbox*/}
                    { deleteButton ? 
                        <>
                        <div className="row mb-3">
                            <div className="col-md-4  d-flex align-items-center">
                            <p variant="omega">{countChecked()} entry selected</p> 
                            <Button variant="danger-light"  size="L"  
                                startIcon={<Trash />} className="ml-2"
                                onClick={() => {
                                    //filter the checked items and set the state
                                    const checkedItems = checkoxval.filter(item => item !== null);
                                    setCheckboxVal(checkedItems);
                                    setAllChecked(false);
                                    // if there are checked items
                                    if (checkedItems.length > 0) {
                                        DeleteSelectedService (checkedItems);
                                    } else {
                                        toast.error("Please select at least one service to delete");
                                    }
                                }} 
                                >Delete</Button>
                            </div>
                             
                        </div>
                
                        </>
                        : null
                    }
 
                    <Table colCount={10} rowCount={6} footer={<TFooter  icon={<Plus />} onClick={() => router.push(`/admin/services/create`) }>Add another field to this collection type</TFooter>}>
                            <Thead>
                            <Tr>
                                <Th>
                                <BaseCheckbox 
                                    type="checkbox"
                                    aria-label="Select all entries"
                                    // checked all items
                                    onChange={(e) => {
                                        if (e.target.checked === true) {
                                            setDeleteButton(true);
                                            setAllChecked(true);
                                            setCheckboxVal(services.data.map(service => service.id));
                                            setCheckedItems(services.data.map(service => service.id));
                                            
                                        } else {
                                            setDeleteButton(false);
                                            setAllChecked(false);
                                            setCheckboxVal([]);
                                            setCheckedItems([]);
                                        }
                                    }}
                                    checked={allChecked}
                                    aria-label="Select all entries" />
                                </Th>
                                <Th>
                                <Typography variant="sigma">ID</Typography>
                                </Th>
                                <Th>
                                <Typography variant="sigma">Title</Typography>
                                </Th>
                                <Th>
                                <Typography variant="sigma">Slug</Typography>
                                </Th>
                                <Th>
                                <Typography variant="sigma">Published at</Typography>
                                </Th>
                                <Th>
                                <Typography variant="sigma">Cover</Typography>
                                </Th>
                                <Th>
                                <Typography variant="sigma">Content avalable in </Typography>
                                </Th>
                                <Th>
                                <Typography variant="sigma">State </Typography>
                                </Th>
                                <Th>
                                <VisuallyHidden>Actions</VisuallyHidden>
                                </Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            
                            {services.data.map (service => ( <Tr key={service.id}>
                                <Td>
                                    {/* <BaseCheckbox aria-label={service.attributes.title} /> */}
                                    
                                    <BaseCheckbox aria-label={service.attributes.title} 
                                        type="checkbox"
                                        checked={
                                            checkoxval.includes(service.id)
                                        }

                                        onChange={() => {
                                            // if the checkbox is checked set all checked to 
                                            if (  checkoxval.length === 1 && checkoxval.includes(service.id) ) {
                                                setCheckboxVal([service.id]);
                                                setCheckedItems([service.id]);
                                                setAllChecked(false);
                                                setDeleteButton(false);
                                            } else {
                                                // if the checkbox is not checked set all checked to false
                                                if ( checkoxval.includes(service.id) ) {
                                                    setAllChecked(true);
                                                    setDeleteButton(true);
                                                } else {
                                                    setAllChecked(true);
                                                    setDeleteButton(true);
                                                }

                                            }

                                            if (checkoxval.includes(service.id)) {
                                                const index = checkoxval.indexOf(service.id);
                                                setCheckboxVal(checkoxval.filter(item => item !== service.id));
                                                setCheckedItems(checkoxval.filter(item => item !== service.id));
                                                //setAllChecked(false);
                                                 
                                            } else {
                                                setCheckboxVal([...checkoxval, service.id]);
                                                setCheckedItems([...checkedItems, service.id]);
                                                //setAllChecked(true);
                                            }
                                        }}
                                        value={service.id}
                                        name={service.id}
                                       
                                    />
                                     
                                 </Td>
                                <Td>
                                    <Typography textColor="neutral800">{service.id}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{service.attributes.title}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{service.attributes.slug}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{moment(service.attributes.publishedAt).format("yyyy-MM-DD")}</Typography>
                                </Td>
                                
                                <Td>{console.log(service.attributes.cover)} 
                                    {
                                    service.attributes.thumbnail.data  !=null ?
                                    
                                        <Avatar  src={service.attributes.thumbnail.data.attributes.url} alt={service.attributes.title} />
                                    : 
                                        <Avatar  src="/images/default-cover.png"  />
                                      
                                    }   
                                </Td>
                                
                                <Td>
                                    <Typography textColor="neutral800">{service.attributes.locale}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">
                                         {
                                        service.attributes.publishedAt !== null ?
                                        <Badge background="success100" >Published</Badge>
                                        :
                                        <Badge background="secondary100" >Draft</Badge>
                                        }
                                     </Typography>
                                </Td>
                                  
                                <Td>
                                    <Flex>
                                    {/* EDIT */}
                                    <IconButton onClick={() => router.push(`/admin/services/edit/${service.id}`)} label="Edit" noBorder icon={<Pencil />} />

                                    {/* DELETE */}
                                    <Box paddingLeft={1}>
                                        <IconButton label="Delete" 
                                        onClick={() => showPopup(service)}
                                        title={service.id}  noBorder icon={<Trash />} />
                                    </Box>
                                    {/* EDIT */}
                                    <a href={`/services/${service.attributes.slug}`}><IconButton   label="View" noBorder icon={<Eye />} /></a>
                                    </Flex>
                                </Td>
                                
                                </Tr>))}
                            </Tbody>
                    </Table>        
                </Box>
            }
            
            {/* Pagination */}
            { services.data.length > 0 ?
            
            <Box padding={12}  background="neutral100"  className="d-flex align-items-center justify-content-center mt-4">
            <Pagination activePage={page} pageCount={lastPage}>
                <PreviousLink 
                onClick={() => { router.push(`/admin/services?page=${page - 1}`) }}
                to={`/admin/services?page=${page - 1}`}
                >Go to previous page</PreviousLink>
                {   
                    pageNumbers.map(number =>  (
                        <PageLink 
                            number={number}
                            key={number}  
                            to={`/${number}`} 
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(`/admin/services?page=${number}`);
                            }}
                            >
                            {number}
                        </PageLink>
                    ))
                }
                    
                <NextLink 
                onClick={() => { router.push(`/admin/services?page=${page + 1}`) }}
                    to={`/admin/services?page=${page + 1}`} >
                Go to next page</NextLink>
                </Pagination>
                </Box>

                :
                null
            }
            </ThemeProvider>
    
            { /* Popup */ }
            <Dialog onClose={() => setIsVisible(false)} title="Confirmation" isOpen={
                isVisible === true ? true : false
                }>
                <DialogBody icon={<ExclamationMarkCircle />}>
                <Stack size={2}>
                    <Flex justifyContent="center">
                    <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
                    </Flex>
                </Stack>
                </DialogBody>
                
                <DialogFooter 
                    startAction={<Button onClick={() => setIsVisible(false)}variant="tertiary">
                    Cancel
                    </Button>} 
                    
                    endAction={<Button 
                        variant="danger-light" title="Delete" startIcon={<Trash />}
                        onClick={() => { deleteService(service.id)}}>
                    Confirm
                    </Button>} 
                />
            </Dialog>
                                                        

            </>
        </AdminLayout>
        </StaticRouter>
         
    )
}

export async function getServerSideProps({query: {page = 1}}) {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const start = +page === 1 ? 0 : (+page - 1) * 6;
    //publicationState=preview or publicationState=live
    const res = await fetch(`${API_URL}/api/services?populate=*&pagination[start]=${start}&pagination[limit]=6&sort=id:DESC&publicationState=preview`); 
    
    const data = await res.json();
    return {
        props: {
        services: data,
        //page: parseInt(page),// convert string to number
        page: +page,// convert string to number
    },
 }
}