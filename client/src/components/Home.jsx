import { useEffect, useState } from 'react';
import { getAllRecipes } from '../utilities/loaders/recipes';
import { Link } from 'react-router-dom';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (!recipes.length) {
    console.error('No recipes available.');
    return <p>No recipes available.</p>;
  }

  const index = Math.floor(Math.random() * recipes.length);
  const randomPick = recipes[index];
  const { title, category, description, prepTime, _id } = randomPick;

  if (!title || !category || !_id) {
    console.error('Invalid or missing data:', randomPick);
    return <p>Recipe data is incomplete or missing.</p>;
  }

  return (
    <>
      <div className="recipeimg">
        <Link to={`/recipes/${_id}`}>
          <h1 className='text-center bold display-3 mb-4'>{title}</h1>
        </Link>
        <p>Continent: {category}</p>
        <p>{description}</p>
        <p>Prep time: {prepTime} minutes</p>
      </div>
    </>
  );
}



