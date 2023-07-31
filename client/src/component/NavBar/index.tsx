import { Link, NavLink, useParams, useSearchParams } from "react-router-dom"
import { List, ListTypes } from "../../slice/typing"

function NavBar({ isOpen, handleIsOpen }: { isOpen: boolean, handleIsOpen: () => void }) {
  const [searchParams] = useSearchParams()
  let { type: pageType } = useParams();
  const navLink: { name: string, link: string, type: List<ListTypes> }[] = [
    { name: 'Vehicles', link: '/list?type=vehicles', type: 'vehicles' },
    { name: 'Starships', link: '/list?type=starships', type: 'starships' },
  ]


  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>
      <h1 className='navbar__head'>Filters</h1>
      <div className="navbar__cont">
        {navLink.map(nl => {
          const type = searchParams.get('type') || pageType || 'vehicles'
          return <div className="navbar__link" key={nl.name}>
            <Link
              onClick={handleIsOpen}
              className={type === nl.type ? 'active' : ''}
              to={nl.link}>
              {nl.name}
            </Link>
          </div>
        })}
      </div>
    </div>
  )
}

export default NavBar