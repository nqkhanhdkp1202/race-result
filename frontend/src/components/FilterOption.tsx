import React from 'react';

interface FilterItem{
    content: string,
};

interface FilterListProps {
    data: FilterItem[];
}

const FilterOption: React.FC<FilterListProps> = (props) => {

    return (
        <div className='filter-wrap'>
                <ul className='filter-wrap-list'>
                    {
                        props.data.map((item,index) => (
                            <li className='filter-wrap-list-item' key={index}>
                                <a href="#" className="resultsarchive-filter-item-link">
                                    <span>
                                        {index}
                                    </span>
                                </a>
                            </li>
                        ))
                    }
                </ul>

        </div>
    )
}

export default FilterOption;