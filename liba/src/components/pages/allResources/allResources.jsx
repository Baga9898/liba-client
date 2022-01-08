import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllResources = ({actionSection=true}) => {
    const [allResources, setAllResources] = useState([]);

    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setAllResources(response.data);
        });
    }, []);

    function createPost() {
        axios
            .post(baseURL, {
                name: "12345",
                category: "12345",
            })
            //     .then((response) => {
            //     setAllResources(...allResources, response.data);
            // });
        }

    if (!allResources || allResources.length === 0) return <p>Упс, здесь пока что ничего нет.</p>
    //TODO: Создать универсальный компонент обёртки, принимающий в пропсы children разметку с целью универсанализации окон.
    //TODO: Сделать капсом либа на фоне ресурсов в светло - сером цвете.
    return (
        // TODO: Сделать универсальный компонент.
        // TODO: При наведении на ресурс появляются кнопки: редактировать, удалить, при наведении на которые они становятся чёрными.
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
                                <div className='section__rightside_category'>{resource.category}</div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    actionSection && 
                    <div>
                        {/* TODO: Выести в отдельный компонент. */}
                        <div className='countOfResources'>{allResources.length}</div>
                        {/* TODO: Сделать форму для создания ресурса.
                        Выести в отдельный компонент. */}
                        <button onClick={createPost}>create new resourse</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default AllResources;