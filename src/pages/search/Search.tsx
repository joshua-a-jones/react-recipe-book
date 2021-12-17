import './Search.css';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useAxiosGet } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';
import RecipeList from '../../components/RecipeList/RecipeList';

export default function Search() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('q');

    const url = 'http://localhost:3000/recipes?q=' + query;

    const { data, loading, error } = useAxiosGet<IRecipe[]>(url)

    return (
        <div>
            <h2 className='page-title'>Recipes including "{query}"</h2>
            {error && <p className='error'>{error}</p>}
            {loading && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}
