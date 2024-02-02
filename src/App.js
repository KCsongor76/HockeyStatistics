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

/**
 * This component is responsible for the whole project,
 * and specifically, for the routing.
 * @returns
 */
function App() {
  const [prevGames, setPrevGames] = useState([]);

  const router = createBrowserRouter([
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
