import React, { MouseEventHandler } from 'react';

interface CategoryFilterItem {
    category?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>;
};

interface FilterListProps {
    data: CategoryFilterItem[];
    onClickFilter: (content: string) => void;
}

const CategoryFilter: React.FC<FilterListProps> = (props) => {

    const handleClickFilter: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const spanContent = event.currentTarget.querySelector('span')?.textContent;
        if (spanContent) {
            props.onClickFilter(spanContent.toLowerCase());
        }
    };

    return (
        <div className='filter-wrap'>
            <div className="filter-wrap-line">
                <ul className='filter-wrap-list'>
                    {
                        props.data.map((item, index) => (
                            <li className='filter-wrap-list-item' key={index}>
                                <a href="#" className="resultsarchive-filter-item-link" onClick={handleClickFilter} >
                                    <span>
                                        {item.category}
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

export default CategoryFilter;