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
    const [formIsValid, setFormIsValid] = useState(false);

    const [notificationStatus, setNotificationStatus] = useState<string>('success');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    const [resourceName, setResourceName] = useState('');
    const [resourceLink, setResourceLink] = useState<string>('');
    const [resourceCategory, setResourceCategory] = useState('');

    const [resourceNameDirty, setResourceNameDirty] = useState(false);
    const [resourceNameError, setResourceNameError] = useState('Cannot be empty');

    const [resourceLinkDirty, setResourceLinkDirty] = useState(false);
    const [resourceLinkError, setResourceLinkError] = useState('Cannot be empty');

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editResourceName, setEditResourceName] = useState('');
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

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'link':
                setResourceLinkDirty(true);
                break;
            case 'name':
                setResourceNameDirty(true);
                break;
        
            default:
                break;
        }
    }

    useEffect(() => {
        if (resourceLinkError) {
            setFormIsValid(false);
        } else {
            setFormIsValid(true);
        }
    }, [resourceLinkError]);

    useMemo(() => {
        if (resourceName === '' || resourceLink === '' || resourceCategory === '') {
            setFormIsValid(false);
        } else {
            setFormIsValid(true);
        }
    }, [resourceName, resourceLink, resourceCategory])

    const nameHandler = (e: any) => {
        setResourceName(e.target.value);
        if (!e.target.value) {
            setResourceNameError('Cannot be empty');
        } else {
            setResourceNameError('');
        }
    }

    const linkHandler = (e: any) => {
        setResourceLink(e.target.value);
        const regEx = /^(http|https)/;
        if (!regEx.test(String(e.target.value).toLowerCase())) {
            setResourceLinkError('Link is not correct');
            if (!e.target.value) {
                setResourceLinkError('Cannot be empty');
            }
        } else {
            setResourceLinkError('');
        }
    }

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
        setRequestIsLoading(true);
        try {
            await axios.get(`${baseURL}/${resourceId}`)
            .then((response) => {
                setEditResourceName(response.data.name);
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
        if (!allResources.some((resource: ResourceType) => resource.name === resourceName || resource.link === resourceLink)) {
            const date = (new Date().toLocaleString('en-US', { hour12: true }));
            setRequestIsLoading(true);

            try {
                await axios.post(baseURL, {
                    name: resourceName,
                    link: resourceLink,
                    category: resourceCategory,
                    date: date,
                })
                .then((response) => {
                    setAllResources([response.data, ...allResources]);
                    showNHideNotification('success', 'Adding was successfully');
                })
                setResourceName('');
                setResourceLink('');
                setResourceCategory('');
            } catch (error) {
                console.error(error);
                showNHideNotification('error', 'Adding failed');
            }
            setRequestIsLoading(false);
            setResourceName('');
            setResourceLink('');
            setResourceCategory('');
        } else {
            if (allResources.some((resource: ResourceType) => resource.name === resourceName)) {
                showNHideNotification('warning', 'Resource with the same name already exists');
            } else if (allResources.some((resource: ResourceType) => resource.link === resourceLink)) {
                showNHideNotification('warning', 'Resource with the same link already exists');
            }
        }
    }

    const openEditModal = (resourceId: number) => {
        getOneResource(resourceId);
        setEditModalIsOpen(true);
        setIdOfResource(resourceId)
    }

    const editResource = async (resourceId: number) => {
        if (!allResources.some((resource: ResourceType) => resource.name === editResourceName)) {
            setRequestIsLoading(true);
            try {
                await axios.put(`${baseURL}/${resourceId}`, {
                    name: editResourceName,
                })
                .then((response) => {
                    const indexOfChangedResource = allResources.findIndex((resource: ResourceType) => resource.id === response.data.id);
                    const newArray = [...allResources];
                    newArray[indexOfChangedResource] = response.data;
                    setAllResources(newArray);
                })
                setEditResourceName('');
                showNHideNotification('success', 'Editing was successfilly');
            } catch (error) {
                console.error(error);
                showNHideNotification('error', 'Resource with the same name already exists');
            }
            setRequestIsLoading(false);
        } else {
            showNHideNotification('error', 'Resource with the same name already exists');
            setEditResourceName('');
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
                            <AddResourceComponent resourceName={resourceName} setResourceName={setResourceName} resourceLink={resourceLink} resourceLinkDirty={resourceLinkDirty} resourceLinkError={resourceLinkError} resourceCategory={resourceCategory} setResourceCategory={setResourceCategory} categoriesList={categoriesList} createResource={createResource} blurHandler={blurHandler} linkHandler={linkHandler} formIsValid={formIsValid} resourceNameDirty={resourceNameDirty} resourceNameError={resourceNameError} nameHandler={nameHandler}/>
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
                            <input className='editModal__content_input' type='text' value={editResourceName} onChange={e => setEditResourceName(e.target.value)}/>
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