import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

interface DataType {
    key: string;
    grandprix: string;
    date: string;
    winner: string;
    car: string;
    laps: number,
    time: string
  }
  
  interface ResultListProps {
    data: DataType[];
  }

const ResultList: React.FC<ResultListProps> = (props) => {

    type DataIndex = keyof DataType;
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    
    const columns: ColumnsType<DataType> = [
        {
            title: 'GRAND PRIX',
            dataIndex: 'grandprix',
            key: 'grandprix',
            ...getColumnSearchProps('grandprix'),
          },
          {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
          },
          {
            title: 'WINNER',
            dataIndex: 'winner',
            key: 'winner',
            ...getColumnSearchProps('winner'),
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: 'CAR',
            dataIndex: 'car',
            key: 'car',
            ...getColumnSearchProps('car'),
          },
          {
            title: 'LAPS',
            dataIndex: 'laps',
            key: 'laps',
            ...getColumnSearchProps('laps'),
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: 'TIME',
            dataIndex: 'time',
            key: 'time',
            ...getColumnSearchProps('time'),
            sortDirections: ['descend', 'ascend'],
          },
    ];
    

    return (
    <Table columns={columns} dataSource={props.data} />
    )
}

export default ResultList;