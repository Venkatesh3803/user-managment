import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Users from "./pages/Users";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AdminRoute, Layout, ProtectedRoute } from "./ultils/Layout";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import ContactUs from "./pages/ContactUs";
import EditPage from "./pages/EditPage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/users", element: <Users /> },
        { path: "/contactus", element: <ContactUs /> },
        { path: "/profile/:id", element: <ProfilePage /> },
      ]
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        { path: "/settings/:id", element: <Settings /> },    
      ]
    },
    {
      path: '/',
      element: <AdminRoute />,
      children: [
        { path: "/dashboard/:id", element: <Dashboard /> },
        { path: "/adduser", element: <AddUser /> },
        { path: "/editpage/:id", element: <EditPage /> }
      ]
    },
    {
      path: "/signin",
      element: <SignIn />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ])

  return <RouterProvider router={router} />;
}

export default App
