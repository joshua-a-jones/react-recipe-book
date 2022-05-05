import "./Home.css";
import { IRecipe } from "../../api/recipes/Recipe";
import RecipeList from "../../components/RecipeList/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[] | undefined>();

  useEffect(() => {
    setIsLoading(true);
    projectFirestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setIserror(true);
          setIsLoading(false);
        } else {
          let results: IRecipe[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() } as IRecipe);
          });
          setIsLoading(false);
          setRecipes(results);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIserror(true);
      });
  }, []);
  return (
    <div>
      {isLoading && <p className="loading">Loading recipes...</p>}
      {isError && <p className="error">'Failed To Load Recipes'</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
