import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from '../NavBar'
import { useNavigate } from "react-router-dom";
import Img from '../../assets/images/logo.png'

function Layout() {

    const [navBar, setNavBar] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/list?type=vehicles");
    }, [])
    return (
        <div className='layout_cont'>
            <div className='layout__banner'>
                <button className="layout__banner_navbar_toggle btn-primary" onClick={() => setNavBar(!navBar)}>☰</button>
                <Link to='/'>
                    
                    <img src={Img} className='layout__banner_logo' alt='banner image'/>
                </Link>
            </div>
            <div className='layout'>
                <div className='layout__left'>
                    <NavBar isOpen={navBar} handleIsOpen={() => setNavBar(!navBar)} />
                </div>
                <div className='layout__right'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout