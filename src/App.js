import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import StartGamePage from "./pages/StartGamePage";
import PrevGamesPage from "./pages/PrevGamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import { useState } from "react";

import { gameDataHandler } from "./functions/appFunctions";
import Auth from "./components/Auth";
import CreateTeamPage from "./pages/CreateTeamPage";
import CreatePlayerPage from "./pages/CreatePlayerPage";

/**
 * This component is responsible for the whole project,
 * and specifically, for the routing.
 * @returns
 */
function App() {
  const [prevGames, setPrevGames] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const signedOutRoutes = [
    {
      path: "/",
      element: <Auth onSignIn={handleSignIn} />,
      errorElement: <ErrorPage />,
    },
  ];

  const signedInRoutes = [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "start",
          element: (
            <StartGamePage
              onFinalisedGame={(data) =>
                gameDataHandler(prevGames, setPrevGames, data)
              }
            />
          ), // getting the data from the game page
        },
        { path: "games", element: <PrevGamesPage prevGamesData={prevGames} /> }, // sending down the data to previous games page
        { path: "games/:gameId", element: <GameDetailPage /> },
        { path: "create-team", element: <CreateTeamPage /> },
        { path: "create-player", element: <CreatePlayerPage /> },
      ],
    },
  ];

  const router = createBrowserRouter(
    signedInRoutes
    //isSignedIn ? signedInRoutes : signedOutRoutes
  );

  return <RouterProvider router={router} />;
}

export default App;
