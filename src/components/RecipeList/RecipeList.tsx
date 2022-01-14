import './RecipeList.css'
import React from 'react'
import { Link } from 'react-router-dom';
import { IRecipe } from '../../api/recipes/Recipe'
import { useTheme } from '../../api/hooks/useTheme';

export interface RecipeListProps {
    recipes: IRecipe[];
}

export default function RecipeList(props: RecipeListProps) {
    const { themeStyle } = useTheme()
    const { recipes } = props;

    if (recipes.length === 0) {
        return <div className={`error ${themeStyle.mode}`}>No Recipes Found.</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => {
                return(
                    <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                        <div  className={`card ${themeStyle.mode}`}>
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
