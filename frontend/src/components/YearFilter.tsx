import React, { MouseEventHandler } from 'react';

interface YearFilterItem {
    year?: number,
    onClick?: MouseEventHandler<HTMLAnchorElement>;
};


interface FilterListProps {
    data: YearFilterItem[];
    onClickFilter: (content: string) => void;
}

const YearFilter: React.FC<FilterListProps> = (props) => {

    const handleClickFilter: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const spanContent = event.currentTarget.querySelector('span')?.textContent;
        if (spanContent) {
            props.onClickFilter(spanContent);
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
                                        {item.year}
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

export default YearFilter;