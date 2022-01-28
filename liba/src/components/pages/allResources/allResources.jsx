import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './allResources.scss'
import Preloader from '../../preloader/preloader';

const AllResources = ({actionSection=true, itemsToShow}) => {
    const [allResources, setAllResources] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [resourceName, setResourceName] = useState("");
    const [resourceLink, setResourceLink] = useState("");
    const [resourceCategory, setResourceCategory] = useState("");

    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";

    useEffect(() => {
        if (itemsToShow) {
            axios.get(baseURL)
            .then((response) => {
                const newArray = response.data;
                const reverseArray = newArray.reverse().slice(0, itemsToShow);
                setAllResources(reverseArray);
                setIsLoading(false);
            });
        } else {
            axios.get(baseURL)
            .then((response) => {
                const newArray = response.data;
                const reverseArray = newArray.reverse();
                setAllResources(reverseArray);
                setIsLoading(false);
            });
        }
        
    }, [itemsToShow]);

    const createResource = () => {
        axios.post(baseURL, {
                name: resourceName,
                link: resourceLink,
                category: resourceCategory,
                date: "date",
            })
                .then((response) => {
                    setAllResources([response.data, ...allResources]);
            });
            setResourceName("");
            setResourceLink("");
            setResourceCategory("");
        }

    const editResourse = (resourceId) => {
        axios.put(`${baseURL}/${resourceId}`, {
            name: "Test",
            category: "Books",
            link: "Test",
            date: Date.now,
        })
        .then((response) => {
            const indexOfChangedResource = allResources.findIndex((resource) => resource.id === response.data.id);
            const newArray = [...allResources];
            newArray[indexOfChangedResource] = response.data;
            setAllResources(newArray);
        });
    }

    const deleteResourse = (resourceId) => {
        axios.delete(`${baseURL}/${resourceId}`)
        .then((response) => {
            const newResourcesArray = allResources.filter((resource) => resource.id !== response.data.id);
            setAllResources(newResourcesArray);
        })
    }

    if (!allResources || allResources.length === 0) return (
            <div>{isLoading ? <Preloader/> : <p className='oops'>Oops, there's nothing<br/>here yet</p>}</div>
        )

    return (
        // TODO: Сделать универсальный компонент.
        <div className='action-info-wrapper'>
            <div className='allResources__wrapper'>
                {
                    allResources.map((resource) =>
                        <div key={resource.id} className='section__wrapper'>
                            <div className='section__leftside'>
                                <div className='section__leftside_top'>
                                    <div className='section__leftside_name'>{resource.name}</div>
                                    <div className='section__leftside_link'>{resource.link}</div>
                                </div>
                                <div className='section__leftside_down'>
                                    <div className='section__leftside_date'>{resource.date}</div>
                                </div>
                            </div>
                            <div className='section__rightside'>
                                <div className="section__rightside_top">
                                    <div className='section__rightside_category'>{resource.category}</div>
                                </div>
                                {actionSection &&
                                    <div className="section__rightside_bottom">
                                        <FontAwesomeIcon icon={faPen} className="edit-section-icon" onClick={() => editResourse(resource.id)}/>
                                        <FontAwesomeIcon icon={faTrashAlt} className="delete-section-icon" onClick={() => deleteResourse(resource.id)}/>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                {actionSection && 
                    <div className='allResources__actions_wrapper'>
                        {/* TODO: Выести в отдельный компонент. */}
                        {/* <div className='countOfResources'>{allResources.length}</div> */}
                        {/* TODO: Сделать форму для создания ресурса.
                        Выести в отдельный компонент. */}
                        <div className='addResourse__wrapper section__wrapper'>
                            <input className='addResourse__input' type="text" placeholder='Name' value={resourceName} onChange={e => setResourceName(e.target.value)}/>
                            <input className='addResourse__input' type="text" placeholder='Link' value={resourceLink} onChange={e => setResourceLink(e.target.value)}/>
                            <input className='addResourse__input' type="text" placeholder='Category' value={resourceCategory} onChange={e => setResourceCategory(e.target.value)}/>
                            <button className='addResourse__button' onClick={createResource}>create new resourse</button>
                        </div>
                    </div>
                }
            </div>
            {editModal &&
                <div className="editModal-wrapper">

                </div>
            }
        </div>
    )
}

export default AllResources;