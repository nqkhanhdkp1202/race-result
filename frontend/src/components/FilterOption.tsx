import React from 'react';

const FilterOption: React.FC = (props) => {
    interface DataType {
        year: number;
        categoty: string;
        address: string;
    }

    const Option : DataType[] = [
        {
            year: 2023,
            categoty: 'races',
            address: 'all'
        },
                {
            year: 2023,
            categoty: 'races',
            address: 'all'
        },
        {
            year: 2023,
            categoty: 'races',
            address: 'all'
        }
    ] 

    return (
        <>
        {
            Option.map((e,i) => (
                <div className="">
                    {e.year} - {e.categoty} - {e.address}
                </div>
            ))
        }
        </>
    )
}

export default FilterOption;