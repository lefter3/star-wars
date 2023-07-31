import React, { useEffect, useState } from 'react'
import { useGetListQuery } from '../slice/listSlice'
import Table from '../component/Table'
import { Link, useSearchParams } from 'react-router-dom'
import { List, ListTypes } from '../slice/typing'
import { getColumns } from '../lib/columns'

function List() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<string | number>(searchParams.get('page') || 1)
    const [type, setType] = useState<List<ListTypes>>(searchParams.get('type') || 'vehicles')
    const { data, error , isFetching, } = useGetListQuery({ page, type }, { refetchOnFocus: false })

    useEffect(() => {
        setType(searchParams.get('type') ?? 'vehicles')
        setPage(searchParams.get('page') ?? 1)
    }, [searchParams])

    const column = getColumns(type)


    return (
        <div className='filter__page'>
            <div className='px-1 filter__page_control'>
                {data && <div className='fetch mr-1'>Page - {page} of {Math.ceil((data.count) / 10)};</div>}
                <button
                    className='btn-primary mr-1'
                    disabled={isFetching || page === 1}
                    onClick={() => {
                        if (!data) {
                            setSearchParams({
                                type: searchParams.get('type') ?? 'people',
                                page: '1'
                            });
                        }
                        else setPage(Number(page) - 1)
                    }}>
                    Prev
                </button>

                <button className='btn-primary mr-1' disabled={isFetching || (data?.next ? false : true)} onClick={() => {
                    setPage(Number(page) + 1)
                }}>
                    Next
                </button>
                {isFetching && <div className='fetch'><span className='capitalize'>{type}</span> fetching..</div>}
            </div>
            <Table
                column={column}
                dataSource={!isFetching ? data?.results || [] : []}
                loading={isFetching}
                error={error}
                type={type}
            />
        </div >
    )
}

export default List