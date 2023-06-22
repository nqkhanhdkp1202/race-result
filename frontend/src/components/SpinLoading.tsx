import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface CustomizeSpin {
    size?: number | 24,
    color?: string | 'black',
}


const SpinLoading: React.FC<CustomizeSpin> = (props) => {

    const { size, color } = props;

    return (
        <div className="spin-container">
            <LoadingOutlined className='spin' style={{ fontSize: size, color: color }} spin />
        </div>
    )
}


export default SpinLoading;