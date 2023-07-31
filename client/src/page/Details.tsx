import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetStarWarQuery } from '../slice/starWarSlice';
import ErrorElement from '../component/ErrorElement';
import ResourcesForm from '../component/Forms/resources';

function Details() {
    let { type, id } = useParams();
    const { isFetching, error, isLoading, data } = useGetStarWarQuery<any>({ id: id || '1', type: type ?? 'people' })
    const navigate = useNavigate();
    if (isFetching) return <div className='loading_comp'>Loading...</div>

    if (error) return <ErrorElement redirectPath='/list' />
    return (
        <div className='d_cont'>
            <div className='btn-cont'>
                <button type='button' onClick={() => navigate(-1)} className='btn-primary'>
                    Go Back
                </button>
            </div>
            <div className='details'>
                <div className='details__label'>
                </div>
            </div>
            {data && Object.keys(data).slice(0, 4).map(val =>
                <div className='details'>
                    <div className='details__label'>
                        {val} :
                    </div>
                    <div className='details__value'>
                        { val ? data[val] : null }
                    </div>
                    <br />
                </div>
            )}
            { !data.name ? null : <ResourcesForm type={type} id={id} /> }
        </div >
    )
}

export default Details