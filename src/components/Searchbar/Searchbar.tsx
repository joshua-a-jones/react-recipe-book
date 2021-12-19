import './Searchbar.css';
import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom';

export default function Searchbar() {
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        history.push(`/search?q=${encodeURIComponent(searchText)}`)
        setSearchText('');
    }
    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                    type='text'
                    id='search'
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                />
            </form>
        </div>
    )
}
