import  reactDom  from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Error404 from './Error404.jsx'
import PageError from './PageError.jsx'
import IdApp from './IdApp.jsx'
import Protege from './Protege.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/Inscription.jsx';
import { Toaster } from 'react-hot-toast'
import NavBar from './pages/dashboard/components/NavBar.jsx';
import { useQuery, useMutation,useQueryClient, QueryClient, QueryClientProvider  } from 'react-query'
import Profile from './pages/dashboard/Profile.jsx'
import Profil from './pages/dashboard/Profil.jsx'
import AjouterPub from './pages/dashboard/components/AjouterPub.jsx';


const queryClient = new QueryClient();
const route = createBrowserRouter([
    {
      path:"/",
      element:
      <>
        <Protege estConnecte={true}>
          <Dashboard />
        </Protege>
      </>, 
        errorElement: <PageError />,
        children:[
          {
            path: "/profil",
            element:<Profil />,
          },
          {
            path:"/ajouter",
            element:<AjouterPub />
          }
        ],
    },
    {
      path:"/:profile",
      element:<Profile />
    },
    {
      path:"/:id",
      element:
      <>
        <Protege estConnecte={true}><IdApp /></Protege>
      </>, 
    },
    {
      path:"/connexion",
      element:<Connexion />,
    },
    {
      path:"/inscription",
      element:<Inscription />,
    },
    {
      path:"/navbar",
      element:<NavBar />
    },
    {
      path:"*",
      element:<Error404 />
    },
]);

reactDom.createRoot(document.getElementById("root")).
render(
  <>
  <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={route} />
  </QueryClientProvider>
  </>
)
