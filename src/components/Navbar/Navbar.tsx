import './Navbar.css';
import React from 'react'
import { Link } from 'react-router-dom'
import  Searchbar from '../Searchbar/Searchbar'

export default function Navbar() {
    return (
        <div className='navbar'>
            <nav>
                <Link to='/' className='logo'>
                    <h1>My Recipe Book</h1>
                </Link>
                <div className='h-stack'>
                    <Searchbar />
                    <Link to='/create'>Create Recipe</Link>
                </div>

            </nav>
        </div>
    )
}
