import React, { FormEvent, useState, useRef, useEffect } from 'react'
import './Create.css';
import { useAxiosPost } from '../../api/hooks/useAxios';
import { IRecipe } from '../../api/recipes/Recipe';
import { useHistory } from 'react-router-dom';

export default function Create() {

    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([''])
    const ingredientInput = useRef<HTMLInputElement>(null);
    const {postData, error, isLoading} = useAxiosPost<IRecipe>('http://localhost:3000/recipes');
    const history = useHistory();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const recipe: IRecipe = {
            title,
            method,
            cookingTime: cookingTime + ' minutes',
            ingredients
        }
        
        postData(recipe);

        
    }

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!ingredients[0]) {
            setIngredients([newIngredient.trim()]);
        } else if (newIngredient && !ingredients.includes(newIngredient.trim())) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
        }

        setNewIngredient('');
        ingredientInput.current?.focus();
    }

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        const filteredIngredients = ingredients.filter(i => i !== target.innerText.trim());
        setIngredients(filteredIngredients);
    }

    useEffect(() => {
        if (!isLoading) {
            history.push('/');
        }
    }, [isLoading])

    return (
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label >
                    <span>Recipe Title:</span>
                    <input 
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        />
                </label>
                <label>
                    <span>Ingredients:</span>
                    <div className='ingredients'>
                        <input
                            type="text"
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            ref={ingredientInput}
                            />
                        <button onClick={handleAdd} className='button'>add</button>
                    </div>
                </label>
                <p>
                    Current Ingredients: {ingredients[0] && 
                        ingredients.map(i => <em onClick={e => handleRemove(e)} key={i}>{i}</em>)}
                </p>
                <label >
                    <span>Method:</span>
                    <textarea 
                        onChange={(e) => {setMethod(e.target.value)}}
                        value={method}
                        required    
                    />
                </label>
                <label >
                    <span>Cooking Time (minutes):</span>
                    <input
                        type='number'
                        onChange= {(e) => setCookingTime(e.target.value)}
                        value={ cookingTime }
                        min='0'
                        required
                    />
                </label>
                <button className='button'>Submit</button>
            </form>
        </div>
    )
}
