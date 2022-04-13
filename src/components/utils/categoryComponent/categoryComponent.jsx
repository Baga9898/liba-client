/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useKey } from '../../../utils/hooks/useKey';
import axios from 'axios';
import Preloader from '../../utils/preloader/preloader';
import LibaModal from '../libaModal/libaModal';
import Pagination from '../pagination/pagination';
import LibaNotification from '../libaNotification/libaNotification';
import ResourceWrapper from '../resourceWrapper/resourceWrapper';
import SortComponent from '../sortComponent/sortComponent';
import CountOfResourcesComponent from '../countOfResourcesComponent/countOfResourcesComponent';
import AddResourceComponent from '../addResourceComponent/addResourceComponent';
import ResourcesSearch from '../resourcesSearch/resourcesSearch';
import '../../pages/allResources/allResources.scss'
import 'animate.css';

const CategoryComponent = ({ categoryName, baseURL, getParams, actionInfoSections=false, actionSection=false, itemsToShow, searchInclude=false, pagination=false, pageSize, addResourceAction, createUpdate, isMainPage=false }) => {
    const [allResources, setAllResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requestIsLoading, setRequestIsLoading] = useState(false);
    const [idOfResource, setIdOfResource] = useState('');
    const [searchParametrs, setSearchParametrs] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [resourcesPerPage] = useState(pageSize || 5);
    const [sortType, setSortType] = useState(localStorage.getItem('sortMode'));
    const [formIsValid, setFormIsValid] = useState(false);
    const [notificationIsOpen, setNotificationIsOpen] = useState('');
    const [notificationText, setNotificationText] = useState('');

    const [resourceName, setResourceName] = useState('');
    const [resourceLink, setResourceLink] = useState('');
    const [resourceCategory, setResourceCategory] = useState('');

    const [resourceNameDirty, setResourceNameDirty] = useState('');
    const [resourceNameError, setResourceNameError] = useState('Cannot be empty');

    const [resourceLinkDirty, setResourceLinkDirty] = useState('');
    const [resourceLinkError, setResourceLinkError] = useState('Cannot be empty');

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editResourceName, setEditResourceName] = useState('');
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const searchArray = allResources.filter(resource => resource.name.includes(searchParametrs));
    const lastResourceIndex = currentPage * resourcesPerPage;
    const firstResourseIndex = lastResourceIndex - resourcesPerPage;
    const currentResources = searchArray.slice(firstResourseIndex, lastResourceIndex);

    const paginate = pageNumbers => {setCurrentPage(pageNumbers)}

    const prevPage = () => {
        setCurrentPage(pageNumber => pageNumber === 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setCurrentPage(pageNumber => pageNumber === Math.ceil(searchArray.length / resourcesPerPage) ? pageNumber : pageNumber + 1)
    }

    const categoriesList = ['', 'books', 'soft', 'websites', 'posts'];

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

    useKey('Enter', handleEnter);
    useKey('Escape', handleEscape);

    const blurHandler = (e) => {
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

    const nameHandler = (e) => {
        setResourceName(e.target.value);
        if (!e.target.value) {
            setResourceNameError('Cannot be empty');
        } else {
            setResourceNameError('');
        }
    }

    const linkHandler = (e) => {
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
            if (itemsToShow) {
                try {
                    await axios.get(baseURL, {params: getParams})
                    .then((response) => {
                        const newArray = response.data;
                        const reverseArray = newArray.reverse().slice(0, itemsToShow);
                        setAllResources(reverseArray);
                        setIsLoading(false);
                    })
                } catch (error) {
                    console.error(error);
                }
            } else {
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
                }
            } 
        }
        getResources();
    }, [itemsToShow, baseURL, getParams]);

    const getOneResource = async (resourceId) => {
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
            const newArray = response.data.sort((a, b) => a.name.localeCompare(b.name));
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

    const newDate = new Date();
    const date = (newDate.toLocaleString('en-US', { hour12: true }));

    const createResource = async () => {
        if (!allResources.some(resource => resource.name === resourceName || resource.link === resourceLink)) {
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
                    setNotificationText('Adding was successfully');
                    setNotificationIsOpen(true);
                    setTimeout(() => {
                        setNotificationIsOpen(false);
                    }, 3000);
                })
                setResourceName('');
                setResourceLink('');
                setResourceCategory('');
            } catch (error) {
                console.error(error);
                setNotificationText('Adding failed');
                setNotificationIsOpen(true);
                setTimeout(() => {
                    setNotificationIsOpen(false);
                }, 3000);
            }
            setRequestIsLoading(false);
            setResourceName('');
            setResourceLink('');
            setResourceCategory('');
        } else {
            if (allResources.some(resource => resource.name === resourceName)) {
                setNotificationText('Resource with the same name already exists');
                setNotificationIsOpen(true);
                setTimeout(() => {
                    setNotificationIsOpen(false);
                }, 3000);
            } else if (allResources.some(resource => resource.link === resourceLink)) {
                setNotificationText('Resource with the same link already exists');
                setNotificationIsOpen(true);
                setTimeout(() => {
                    setNotificationIsOpen(false);
                }, 3000);
            }
        }
    }

    const openEditModal = (resourceId) => {
        getOneResource(resourceId);
        setEditModalIsOpen(true);
        setIdOfResource(resourceId)
    }

    const editResource = async (resourceId) => {
        if (!allResources.some(resource => resource.name === editResourceName)) {
            setRequestIsLoading(true);
            try {
                await axios.put(`${baseURL}/${resourceId}`, {
                    name: editResourceName,
                    date: Date.now,
                })
                .then((response) => {
                    const indexOfChangedResource = allResources.findIndex((resource) => resource.id === response.data.id);
                    const newArray = [...allResources];
                    newArray[indexOfChangedResource] = response.data;
                    setAllResources(newArray);
                })
                setEditResourceName('');
                setNotificationText('Editing was successfilly');
                setNotificationIsOpen(true);
                setTimeout(() => {
                    setNotificationIsOpen(false);
                }, 3000);
            } catch (error) {
                console.error(error);
                setNotificationText('Resource with the same name already exists');
                setNotificationIsOpen(true);
                setTimeout(() => {
                    setNotificationIsOpen(false);
                }, 3000);
            }
            setRequestIsLoading(false);
        } else {
            if (allResources.some(resource => resource.name === editResourceName)) {
                setNotificationText('');
                setNotificationIsOpen(true);
                setTimeout(() => {
                    setNotificationIsOpen(false);
                }, 3000);
            }
            setEditResourceName('');
        }
        setEditModalIsOpen(false);
    }

    const openDeleteModal = (resourceId) => {
        setDeleteModalIsOpen(true);
        setIdOfResource(resourceId);
    }

    const deleteResourse = async (resourceId) => {
        setRequestIsLoading(true);
        try {
            await axios.delete(`${baseURL}/${resourceId}`)
            .then((response) => {
                const newArray = allResources.filter((resource) => resource.id !== response.data.id);
                setAllResources(newArray);
            })
            setNotificationText('Removal was successfully');
            setNotificationIsOpen(true);
            setTimeout(() => {
                setNotificationIsOpen(false);
            }, 3000);
        } catch (error) {
            console.error(error);
            setNotificationText('Removal failed');
            setNotificationIsOpen(true);
            setTimeout(() => {
                setNotificationIsOpen(false);
            }, 3000);
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
                <ResourcesSearch setSearchParametrs={setSearchParametrs}/>
            }
            <div className={actionInfoSections ? 'action-info-wrapper' : ''}>
                {actionSection && 
                    <div className='allResources__actions_wrapper animate__animated animate__fadeIn'>
                        <CountOfResourcesComponent categoryName={categoryName} count={allResources.length}/>
                        {addResourceAction &&
                            <AddResourceComponent resourceName={resourceName} setResourceName={setResourceName} resourceLink={resourceLink} resourceLinkDirty={resourceLinkDirty} resourceLinkError={resourceLinkError} setResourceLink={setResourceLink} resourceCategory={resourceCategory} setResourceCategory={setResourceCategory} categoriesList={categoriesList} createResource={createResource} blurHandler={blurHandler} linkHandler={linkHandler} formIsValid={formIsValid} resourceNameDirty={resourceNameDirty} resourceNameError={resourceNameError} nameHandler={nameHandler}/>
                        }
                        <SortComponent sortType={localStorage.getItem('sortMode')} newResourcesIsFirst={newResourcesIsFirst} oldResourcesIsFirst={oldResourcesIsFirst} alphabetSort={alphabetSort}/>
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
                    <LibaNotification>
                        <p className='libaNotification__body_text'>{notificationText}</p>
                    </LibaNotification>
                }
            </div>
        </>
    )
};


export default CategoryComponent;