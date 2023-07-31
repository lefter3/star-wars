import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListTypes } from '../slice/typing'


export const getColumns = (type: List<ListTypes>) => {
    switch (type) {
        case 'starships':
            return getStarshipsColumns('starships')
        case 'vehicles':
            return getVehiclesColumns('vehicles')
        default:
            return getStarshipsColumns('starships')
    }

}

export const getStarshipsColumns = (type: 'starships') => {
    return [{
        name: 'Name',
        dataIndex: 'name'
    }, 
    {
        name: 'View More',
        render: (data: any) => {
            let val = data.url.replaceAll(`https://swapi.dev/api/${type}`, '').replaceAll('/', '')
            return <Link className='table_view_more' to={`/list/${type}/${val}`}>View More</Link>
        }
    }]
}

export const getVehiclesColumns = (type: 'vehicles') => {
    return [{
        name: 'Name',
        dataIndex: 'name'
    },
    {
        name: 'View More',
        render: (data: any) => {
            let val = data.url.replaceAll(`https://swapi.dev/api/${type}`, '').replaceAll('/', '')
            return <Link className='table_view_more' to={`/list/${type}/${val}`}>View More</Link>
        }
    }]
}

