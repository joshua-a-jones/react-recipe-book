import './Search.css';
import { useLocation } from 'react-router-dom';
import { useAxios } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';
import RecipeList from '../../components/RecipeList/RecipeList';
import { useTheme } from '../../api/hooks/useTheme';

export default function Search() {
    const { themeStyle } = useTheme()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('q');

    const url = 'http://localhost:3000/recipes?q=' + query;

    const {responseData, isLoading, isError} = useAxios<IRecipe[]>({
        method: 'get',
        url: url
    })

    return (
        <div className={`search ${themeStyle.mode}`}>
            <h2 className='page-title'>Recipes including "{query}"</h2>
            {isError && <p className='error'>Could Not Load Recipes</p>}
            {isLoading && <p className='loading'>Loading...</p>}
            {responseData && <RecipeList recipes={responseData}/>}
        </div>
    )
}
