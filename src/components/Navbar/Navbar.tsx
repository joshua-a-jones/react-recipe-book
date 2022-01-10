import './Navbar.css';
import React from 'react'
import { Link } from 'react-router-dom'
import  Searchbar from '../Searchbar/Searchbar'
import { useTheme } from '../../api/hooks/useTheme';

export default function Navbar() {
    const { state } = useTheme();

    return (
        <div className='navbar' style={{background: state.color}}>
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
