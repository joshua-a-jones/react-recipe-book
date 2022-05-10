import "./Home.css";
import { IRecipe } from "../../api/recipes/Recipe";
import RecipeList from "../../components/RecipeList/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
import { useAuth } from "../../api/hooks/useAuth";
import { Link } from "react-router-dom";
import { MessageCard } from "../../components/MessageCard/MessageCard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[] | undefined>();
  const { authState } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    if (authState.user) {
      return projectFirestore
        .collection(`users/${authState.user.uid}/recipes`)
        .onSnapshot(
          (snapshot) => {
            if (snapshot.empty) {
              setIsLoading(false);
              setIserror(false);
            } else {
              let results: IRecipe[] = [];
              snapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() } as IRecipe);
              });
              setIsLoading(false);
              setRecipes(results);
              setIserror(false);
            }
          },
          (error) => {
            setIserror(true);
            setIsLoading(false);
          }
        );
    }
  }, [authState]);
  return (
    <div>
      {!authState.user && !isLoading && (
        <MessageCard>
          <h2>Welcome to your recipe book!</h2>
          <p>
            <span>Sign in</span> to get started
          </p>
        </MessageCard>
      )}
      {isLoading && authState.user && (
        <p className="loading">Loading recipes...</p>
      )}
      {isError && !isLoading && authState.user && (
        <p className="error">'Failed To Load Recipes'</p>
      )}
      {recipes && authState.user && <RecipeList recipes={recipes} />}
      {!recipes && !isLoading && authState.user && !isError && (
        <MessageCard>
          <p>
            Looks like you don't have any recipes yet.{" "}
            <Link to="/create">Create a new recipe</Link> to get started!
          </p>
        </MessageCard>
      )}
    </div>
  );
}
