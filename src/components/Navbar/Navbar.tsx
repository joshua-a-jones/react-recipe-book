import './Navbar.css';
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='navbar'>
            <nav>
                <Link to='/'>
                    <h1>My Recipe Book</h1>
                </Link>
                <Link to='/create'>Create Recipe</Link>
            </nav>
        </div>
    )
}
