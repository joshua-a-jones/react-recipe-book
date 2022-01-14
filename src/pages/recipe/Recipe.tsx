import './Recipe.css';
import { useParams } from 'react-router';
import { useAxios } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';
import { useTheme } from '../../api/hooks/useTheme';

export default function Recipe() {
    const { themeStyle } = useTheme()
    const { id } = useParams<{id?: string}>();

    const {responseData: recipe, isLoading, isError} = useAxios<IRecipe>({
        method: 'get',
        url: `http://localhost:3000/recipes/${id}`
    })


    return (
        <div className={`recipe ${themeStyle.mode}`}>
            {isLoading && <p className='loading'>Loading...</p>}
            {isError && <p className='error'>Could Not Load Recipe</p>}
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
