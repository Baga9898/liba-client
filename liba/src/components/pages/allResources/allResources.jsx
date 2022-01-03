import React from 'react';

const AllResources = (props) => {
    const { sections } = props;

    if (!sections || sections.length === 0) return <p>Упс, здесь пока что ничего нет.</p>
    //TODO: Создать универсальный компонент обёртки, принимающий в пропсы children разметку с целью универсанализации окон.
    //TODO: Сделать капсом либа на фоне ресурсов в светло - сером цвете.
    return (
        <div className='allResources__wrapper'>
            {
                sections.map((section) =>
                    
                    <div key={section.id} className='section__wrapper'>
                        <div className='section__leftside'>
                            <div className='section__leftside_top'>
                                <div className='section__leftside_name'>{section.name}</div>
                                <div className='section__leftside_link'>{section.link}</div>
                            </div>
                            <div className='section__leftside_down'>
                                <div className='section__leftside_date'>{section.date}</div>
                            </div>
                        </div>
                        <div className='section__rightside'>
                            <div className='section__rightside_category'>{section.category}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AllResources;