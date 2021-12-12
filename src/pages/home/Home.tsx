import './Home.css';
import React from 'react'
import { useAxiosGet } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';
import RecipeList from '../../components/RecipeList/RecipeList';


export default function Home() {

    const {data: recipes, error, loading} = useAxiosGet<IRecipe[]>('http://localhost:3000/recipes');
    return (
        <div>
            {loading && <p className='loading'>Loading recipes...</p>}
            {error && <p className='error'>{error}</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}
