
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'

// Page components
import App from './App'
import Home from './components/Home'
import RecipeIndex from './components/RecipeIndex'
import SingleRecipe from './components/SingleRecipe'
import ErrorPage from './components/ErrorPage'
import Register from './components/Register'
import Login from './components/Login'
import RecipeCreate from './components/RecipeCreate'
import RecipeEdit from './components/RecipeEdit.jsx'
import Profile from './components/Profile.jsx'


// Loaders
import { getAllRecipes, getSingleRecipe } from './utilities/loaders/recipes.js'
import { CreateRecipe, editRecipe } from './utilities/actions/CreateRecipe'
import { registerUser, loginUser } from './utilities/actions/auth'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/recipes',
        element: <RecipeIndex />,
        loader: getAllRecipes
      },
      {
        path: '/recipes/:recipeId',
        element: <SingleRecipe />,
        loader: async ({ params }) => getSingleRecipe(params.recipeId),
      },
      {
        path: '/recipes/create',
        element: <RecipeCreate />,
        action: async ({ request }) => CreateRecipe(request),
      },
      {
        path: '/recipes/:recipeId/edit',
        element: <RecipeEdit />,
        action: async ({ request, params }) => editRecipe(request, params.recipeId),
        loader: async ({ params }) => getSingleRecipe(params.recipeId)
      },
      {
        path: '/register',
        element: <Register />,
        action: async ({ request }) => registerUser(request),
      },
      {
        path: '/login',
        element: <Login />,
        action: async ({ request }) => loginUser(request)
      },
      {
        path: '/profile',
        element: <Profile />,
  
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
