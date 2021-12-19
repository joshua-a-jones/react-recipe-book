import './Home.css';
import { useAxios } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';
import RecipeList from '../../components/RecipeList/RecipeList';


export default function Home() {
    const {responseData: recipes, isError, isLoading} = useAxios<IRecipe[]>(
        {
            method: 'get',
            url: 'http://localhost:3000/recipes',
        }
    );

    return (
        <div>
            {isLoading && <p className='loading'>Loading recipes...</p>}
            {isError && <p className='error'>'Failed To Load Recipes'</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}
