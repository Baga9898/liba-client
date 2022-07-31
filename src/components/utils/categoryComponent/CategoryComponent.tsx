/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UseKey } from '../../../hooks/UseKey';
import axios from 'axios';
import Preloader from '../../utils/preloader/Preloader';
import LibaModal from '../libaModal/LibaModal';
import Pagination from '../pagination/Pagination';
import LibaNotification from '../libaNotification/LibaNotification';
import ResourceWrapper from '../resourceWrapper/ResourceWrapper';
import SortComponent from '../sortComponent/SortComponent';
import CountOfResourcesComponent from '../countOfResourcesComponent/CountOfResourcesComponent';
import AddResourceComponent from '../addResourceComponent/AddResourceComponent';
import ResourcesSearch from '../resourcesSearch/ResourcesSearch';
import ResourceType from '../../types/ResourceType';
import '../../pages/allResources/allResources.scss'
import 'animate.css';

type CategoryComponentType = {
    categoryName: string,
    baseURL: string,
    getParams?: object,
    actionInfoSections: boolean, 
    actionSection: boolean, 
    itemsToShow?: number, 
    searchInclude: boolean, 
    pagination: boolean, 
    pageSize?: number, 
    addResourceAction?: boolean, 
    createUpdate?: any, 
    isMainPage?: boolean,
}

const CategoryComponent: React.FC<CategoryComponentType> = ({ categoryName, baseURL, getParams, actionInfoSections=false, actionSection=false, itemsToShow, searchInclude=false, pagination=false, pageSize, addResourceAction, createUpdate, isMainPage=false }) => {
    const [allResources, setAllResources] = useState<ResourceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requestIsLoading, setRequestIsLoading] = useState(false);
    const [idOfResource, setIdOfResource] = useState<number>(0);
    const [searchParametrs, setSearchParametrs] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [resourcesPerPage] = useState(pageSize || 5);
    const [sortType, setSortType] = useState(localStorage.getItem('sortMode'));

    const [notificationStatus, setNotificationStatus] = useState<string>('success');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    const [resource, setResource] = useState({
        id: 0,
        name: '',
        link: '',
        description: '',
        category: '',
        date: '',
    })

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const searchArray = allResources.filter((resource: ResourceType) => resource.name.includes(searchParametrs));
    const lastResourceIndex = currentPage * resourcesPerPage;
    const firstResourseIndex = lastResourceIndex - resourcesPerPage;
    const currentResources = searchArray.slice(firstResourseIndex, lastResourceIndex);

    const paginate = (pageNumbers: number) => {setCurrentPage(pageNumbers)}

    const prevPage = () => {
        setCurrentPage(pageNumber => pageNumber === 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setCurrentPage(pageNumber => pageNumber === Math.ceil(searchArray.length / resourcesPerPage) ? pageNumber : pageNumber + 1)
    }

    const categoriesList = ['', 'books', 'soft', 'websites', 'posts'];

    const showNHideNotification = (status: string, message: string) => {
        setNotificationStatus(status);
        setNotificationText(message);
        setNotificationIsOpen(true);
        setTimeout(() => {
            setNotificationIsOpen(false);
        }, 3000);
    }

    const setDefaultResource = () => {
        setResource({
            id: 0,
            name: '',
            link: '',
            description: '',
            category: '',
            date: '',
        });
    }

    const handleEnter = () => {
        if (editModalIsOpen) {
            editResource(idOfResource);
            setEditModalIsOpen(false);
        } else if (deleteModalIsOpen) {
            deleteResourse(idOfResource);
            setDeleteModalIsOpen(false);
        }
    }

    const handleEscape = () => {
        if (editModalIsOpen) {
            setEditModalIsOpen(false);
        } else if (deleteModalIsOpen) {
            setDeleteModalIsOpen(false);
        }
    }

    UseKey('Enter', handleEnter);
    UseKey('Escape', handleEscape);

    useEffect(() => {
        const getResources = async () => {
            try {
                await axios.get(baseURL, {params: getParams})
                .then((response) => {
                    const newArray = response.data;
                    const reverseArray = itemsToShow ? newArray.reverse().slice(0, itemsToShow) : newArray.reverse();
                    setAllResources(reverseArray);
                    setIsLoading(false);
                })
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        getResources();
    }, [itemsToShow, baseURL, getParams]);

    const getOneResource = async (resourceId: number) => {
        setDefaultResource();
        setRequestIsLoading(true);
        try {
            await axios.get(`${baseURL}/${resourceId}`)
            .then((response) => {
                setResource({...resource, name: response.data.name});
            })
        } catch (error) {
            console.error(error);
        }
        setRequestIsLoading(false);
    }

    const getNewResourcesFirst = async () => {
        setRequestIsLoading(true);
        try {
            await axios.get(baseURL, {params: getParams})
            .then((response) => {
                const newArray = response.data;
                const reverseArray = newArray.reverse();
                setAllResources(reverseArray);
                setIsLoading(false);
            })
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
        setRequestIsLoading(false);
    }

    const newResourcesIsFirst = () => {
        getNewResourcesFirst();
        setSortType('newFirst');
        localStorage.setItem('sortMode', 'newFirst');
    }

    const getOldResourcesFirst = async () => {
        setRequestIsLoading(true);
        try {
            await axios.get(baseURL, {params: getParams})
            .then((response) => {
                setAllResources(response.data);
                setIsLoading(false);
            })
        } catch (error) {
            console.error(error);
        }
        setRequestIsLoading(false);
    }

    const oldResourcesIsFirst = () => {
        getOldResourcesFirst();
        setSortType('oldFirst');
        localStorage.setItem('sortMode', 'oldFirst');
    }

    const alphabetSorting = () => {
        axios.get(baseURL, {params: getParams})
        .then((response) => {
            const newArray = response.data.sort((a: any, b: any) => a.name.localeCompare(b.name));
            setAllResources(newArray);
        })
    }

    const alphabetSort = () => {
        alphabetSorting();
        setSortType('alphabet');
        localStorage.setItem('sortMode', 'alphabet');
    }

    useEffect(() => {
        switch (sortType) {
            case 'newFirst':
                newResourcesIsFirst();
                break;

            case 'oldFirst':
                oldResourcesIsFirst();
                break;

            case 'alphabet':
                alphabetSort();
                break;
        
            default:
                break;
        }
    }, [sortType])

    const createResource = async () => {
        if (!allResources.some((CheckResource: ResourceType) => CheckResource.name === resource.name || CheckResource.link === resource.link)) {
            const date = (new Date().toLocaleString('en-US', { hour12: true }));
            setRequestIsLoading(true);

            try {
                await axios.post(baseURL, {
                    name: resource.name.toLowerCase(),
                    link: resource.link.toLowerCase(),
                    category: resource.category.toLowerCase(),
                    date: date,
                })
                .then((response) => {
                    setAllResources([response.data, ...allResources]);
                    showNHideNotification('success', 'Adding was successfully');
                })
                setDefaultResource();
            } catch (error) {
                console.error(error);
                showNHideNotification('error', 'Adding failed');
            }
            setRequestIsLoading(false);
            setDefaultResource();
        } else {
            if (allResources.some((CheckResource: ResourceType) => CheckResource.name === resource.name)) {
                showNHideNotification('warning', 'Resource with the same name already exists');
            } else if (allResources.some((CheckResource: ResourceType) => CheckResource.link === resource.link)) {
                showNHideNotification('warning', 'Resource with the same link already exists');
            }
        }
    }

    const openEditModal = (resourceId: number) => {
        setDefaultResource();
        getOneResource(resourceId);
        setEditModalIsOpen(true);
        setIdOfResource(resourceId)
    }

    const editResource = async (resourceId: number) => {
        if (!allResources.some((CheckResource: ResourceType) => CheckResource.name === resource.name)) {
            setRequestIsLoading(true);
            try {
                await axios.put(`${baseURL}/${resourceId}`, {
                    name: resource.name.toLowerCase(),
                })
                .then((response) => {
                    const indexOfChangedResource = allResources.findIndex((resource: ResourceType) => resource.id === response.data.id);
                    const newArray = [...allResources];
                    newArray[indexOfChangedResource] = response.data;
                    setAllResources(newArray);
                })
                setDefaultResource();
                showNHideNotification('success', 'Editing was successfilly');
            } catch (error) {
                console.error(error);
                showNHideNotification('error', 'Resource with the same name already exists');
            }
            setRequestIsLoading(false);
        } else {
            showNHideNotification('error', 'Resource with the same name already exists');
            setDefaultResource();
        }
        setEditModalIsOpen(false);
    }

    const openDeleteModal = (resourceId: number) => {
        setDeleteModalIsOpen(true);
        setIdOfResource(resourceId);
    }

    const deleteResourse = async (resourceId: number) => {
        setRequestIsLoading(true);
        try {
            await axios.delete(`${baseURL}/${resourceId}`)
            .then((response) => {
                const newArray = allResources.filter((resource: ResourceType) => resource.id !== response.data.id);
                setAllResources(newArray);
            })
            showNHideNotification('success', 'Removal was successfully');
        } catch (error) {
            console.error(error);
            showNHideNotification('error', 'Removal failed');
        }
        setRequestIsLoading(false);
        setDeleteModalIsOpen(false);
    }

    if (!allResources || allResources.length === 0) return (
        <div>{isLoading ? <Preloader/> : <p className='oops animate__animated animate__fadeIn'>Oops, there's nothing<br/>here yet</p>}</div>
    )

    return (
        <>
            {requestIsLoading && <Preloader/>}
            {searchInclude && 
                <ResourcesSearch searchParametrs={searchParametrs} setSearchParametrs={setSearchParametrs}/>
            }
            <div className={actionInfoSections ? 'action-info-wrapper' : ''}>
                {actionSection && 
                    <div className='allResources__actions_wrapper animate__animated animate__fadeIn'>
                        <CountOfResourcesComponent categoryName={categoryName} count={allResources.length}/>
                        {addResourceAction &&
                            <AddResourceComponent resource={resource} setResource={setResource} categoriesList={categoriesList} createResource={createResource}/>
                        }
                        <SortComponent sortType={localStorage.getItem('sortMode') || 'newFirst'} newResourcesIsFirst={newResourcesIsFirst} oldResourcesIsFirst={oldResourcesIsFirst} alphabetSort={alphabetSort}/>
                    </div>
                }
                <div style={{width: '100%'}}>
                    <div className={isMainPage ? 'allResources__wrapper' : 'allResources__wrapper-mainPage'}>
                        {
                            <ResourceWrapper dataSource={currentResources} actionSection={actionSection} openEditModal={openEditModal} openDeleteModal={openDeleteModal} createUpdate={createUpdate}/>
                        }
                    </div>
                    {pagination &&
                        <div className='pagination-wrapper animate__animated animate__fadeIn'>
                            <button className='prev-page' onClick={prevPage}><FontAwesomeIcon icon={faChevronLeft}/></button>
                            <Pagination resourcesPerPage={resourcesPerPage} totalCountOfResources={searchArray.length} paginate={paginate} currentPage={currentPage}/>
                            <button className='next-page' onClick={nextPage}><FontAwesomeIcon icon={faChevronRight}/></button>
                        </div>
                    }
                </div>
                {editModalIsOpen &&
                    <LibaModal modalTitle='Edit resource' closeHandler={() => setEditModalIsOpen(false)} actionHandler={() => editResource(idOfResource)} actionName='Edit'>
                        <div className='addResource__content_wrapper'>
                            <label className='editModal__content_label'>Name</label>
                            <input className='editModal__content_input' type='text' value={resource.name} onChange={e => setResource({...resource, name: e.target.value})}/>
                        </div>
                    </LibaModal>
                }
                {deleteModalIsOpen && 
                    <LibaModal modalTitle='Delete resource' closeHandler={() => setDeleteModalIsOpen(false)} actionHandler={() => deleteResourse(idOfResource)} actionName='Delete'>
                        <p className='editModal__content_text'>Are you sure you want to delete the resource?</p>
                    </LibaModal>
                }
                {notificationIsOpen && 
                    <LibaNotification closeHandler={() => setNotificationIsOpen(false)} status={notificationStatus}>
                        <p className='libaNotification__body_text'>{notificationText}</p>
                    </LibaNotification>
                }
            </div>
        </>
    )
};


export default CategoryComponent;