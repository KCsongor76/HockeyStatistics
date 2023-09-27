import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import StartGamePage from "./pages/StartGamePage";
import PrevGamesPage from "./pages/PrevGamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import { useState } from "react";

function App() {
  const [prevGames, setPrevGames] = useState([]);

  const gameDataHandler = (coordData) => {
    let gameIndex = prevGames.length + 1; // for dynamic data - GameDetailPage
    prevGames.push({...coordData, gameIndex}); // list of all previous games - PrevGamesPage
    console.log(coordData);
    console.log(prevGames);

    localStorage.setItem("games", JSON.stringify(prevGames)); // temporarily storing previous games
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "start",
          element: <StartGamePage onFinalisedGame={gameDataHandler} />, // getting the data from the game page
        },
        { path: "games", element: <PrevGamesPage prevGamesData={prevGames} /> }, // sending down the data to previous games page
        { path: "games/:gameId", element: <GameDetailPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
