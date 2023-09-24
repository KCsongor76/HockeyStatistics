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
    let gameIndex = prevGames.length + 1;
    prevGames.push({...coordData, gameIndex});
    console.log(coordData);
    console.log(prevGames);

    localStorage.setItem("games", JSON.stringify(prevGames));
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
          element: <StartGamePage onFinalisedGame={gameDataHandler} />,
        },
        { path: "games", element: <PrevGamesPage prevGamesData={prevGames} /> },
        { path: "games/:gameId", element: <GameDetailPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
