import './Recipe.css';
import React from 'react'
import { useParams } from 'react-router';
import { useAxiosGet } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';

export default function Recipe() {

    const { id } = useParams<{id?: string}>();
    const {data: recipe, loading, error} = useAxiosGet<IRecipe>(`http://localhost:3000/recipes/${id}`) 

    return (
        <div className='recipe'>
            {loading && <p className='loading'>Loading...</p>}
            {error && <p className='error'>{error}</p>}
            {recipe && (
                <>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>{recipe.cookingTime}</p>
                    <ul>
                        {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                    <p className="method">{recipe.method}</p>

                </>
            )}
        </div>
    )
}
