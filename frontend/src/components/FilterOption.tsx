import React from 'react';

interface FilterItem {
    year?: number,
    category?: string,
    option?: object,
    onClick?: (data: string) => void,
};


interface FilterListProps {
    data: FilterItem[];
}

const FilterOption: React.FC<FilterListProps> = (props) => {

    return (
        <div className='filter-wrap'>
            <div className="filter-wrap-line">
                <ul className='filter-wrap-list'>
                    {
                        props.data.map((item, index) => (
                            <li className='filter-wrap-list-item' key={index}>
                                <a href="#" className="resultsarchive-filter-item-link" >
                                    <span>
                                        {item.year || item.category}
                                    </span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default FilterOption;