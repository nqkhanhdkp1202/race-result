import React from 'react';

interface MoreFilterProps {
    data: string[];
}

const MoreFilter: React.FC<MoreFilterProps> = (props) => {
    return (
        <div className='filter-wrap'>
            <div className="filter-wrap-line">
                <ul className='filter-wrap-list'>
                    {
                        props.data.map((item, index) => (
                            <li className='filter-wrap-list-item' key={index}>
                                <a href="#" className="resultsarchive-filter-item-link">{item}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default MoreFilter;