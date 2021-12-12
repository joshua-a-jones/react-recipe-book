import './Home.css';
import React from 'react'
import { useAxiosGet } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';


export default function Home() {

    const {data: recipes, error, loading} = useAxiosGet<IRecipe[]>('http://localhost:3000/recipes');

    console.log(recipes);
    return (
        <div>
            {recipes && (
                recipes.map((recipe) => {
                    return (
                        <div>{recipe.title}</div>
                    )
                })
            )}

        </div>
    )
}
