import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import Chart from './LineCharts';
import { LineChart } from 'recharts';
import LineCharts from './LineCharts';
import PieCharts from './PieCharts';

interface DataType {
    key: string;
    team_id: number;
    team_name: string;
    pts: number
}

interface ResultListProps {
    data: DataType[];
}

const TeamList: React.FC<ResultListProps> = (props) => {

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

    const handleReset = (clearFilters: () => void,
        confirm: (param?: FilterConfirmProps) => void) => {
        clearFilters();
        setSearchText('');

        confirm();
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
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
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
            title: 'POS',
            dataIndex: 'team_id',
            key: 'team_id',
            sorter: (a, b) => a.team_id - b.team_id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'TEAM',
            dataIndex: 'team_name',
            key: 'team_name',
            ...getColumnSearchProps('team_name'),
        },
        {
            title: 'PTS',
            dataIndex: 'pts',
            key: 'pts',
        },
    ];

    const data: any = [];
    props.data.map((item: DataType) => data.push({ name: item.team_name, value: item.pts }));

    return (
        <>
            <Table columns={columns} dataSource={props.data} />
            <div className="chart">
                <h2 className="chart-title">TEAMS RESULTS CHART</h2>
                <div className="chart-list">
                    <PieCharts data={data} />
                </div>
            </div>
        </>
    )
}

export default TeamList;