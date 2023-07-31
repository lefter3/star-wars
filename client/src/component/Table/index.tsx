import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";
import { Link } from "react-router-dom";
import { List, ListTypes } from "../../slice/typing";
import ErrorElement from "../ErrorElement";

type Props = {
    column: {
        name: string,
        dataIndex?: string,
        width?: string,
        render?: (data: any) => React.ReactNode;
    }[],
    dataSource: any[],
    loading?: boolean,
    error?: FetchBaseQueryError | SerializedError | undefined
    type?: List<ListTypes>
}

const Table = ({ column, dataSource, loading, error }: Props) => {
    const test = (data: any) => {console.log(data); return 0}
    const RenderTableData = ({ data }: { data: any }) => {
        let renderData: any[] = []
        column.forEach((col, index) => {
            let tdata = col.dataIndex ? data[col.dataIndex] : col.render ? col.render(data) : ''
            renderData.push({
                index,
                data: tdata
            })
        })

        return <tr>
            {renderData.map((rD) => (
                <td key={rD.index}>
                    {rD.data}
                </td>)
            )}
        </tr>
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {column.map((col, index) => <th key={index} style={{ width: col.width || 'auto' }} >{col.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <tr >
                            <td colSpan={column.length} className="table_loading">Loading...</td>
                        </tr>
                        : error ?
                            <tr >
                                <td colSpan={column.length}>
                                    <ErrorElement />
                                </td>
                            </tr>
                            : dataSource.map((row, index) => (
                                <RenderTableData data={row} key={row.name} />
                            ))}

                </tbody>
            </table>
        </div>
    );
};

export default Table;