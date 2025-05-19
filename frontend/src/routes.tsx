import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ListDev from "./pages/dev/ListDev";
import CreateDev from "./pages/dev/CreateDev";
import ListNivel from "./pages/nivel/ListNivel";
import CreateNivel from "./pages/nivel/CreateNivel";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
   {
      path: "/",
      element: (
         <MainLayout>
            <Home/>
         </MainLayout>
      ),
   },
   {
      path: "/dev",
      element: (
         <MainLayout>
            <ListDev/>
         </MainLayout>
      ),
   },
   {
      path: "/dev/create",
      element: (
         <MainLayout>
            <CreateDev/>
         </MainLayout>
      ),
   },
   {
      path: "/nivel",
      element: (
         <MainLayout>
            <ListNivel/>
         </MainLayout>
      ),
   },
   {
      path: "/nivel/create",
      element: (
         <MainLayout>
            <CreateNivel/>
         </MainLayout>
      ),
   },
   {
      path: "*",
      element: (
         <MainLayout>
            <NotFound/>
         </MainLayout>
      ),
   },
]);
