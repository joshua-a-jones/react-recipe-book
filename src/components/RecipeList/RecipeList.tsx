import './RecipeList.css'
import React from 'react'
import { Link } from 'react-router-dom';
import { IRecipe } from '../../api/recipes/Recipe'

export interface RecipeListProps {
    recipes: IRecipe[];
}

export default function RecipeList(props: RecipeListProps) {

    const { recipes } = props;

    if (recipes.length === 0) {
        return <div className='error'>No Recipes Found.</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => {
                return(
                    <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                        <div  className='card'>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.cookingTime}</p>
                            <div>{recipe.method.substring(0,100) + '...'}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
