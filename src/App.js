import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import StartGamePage from "./pages/StartGamePage";
import PrevGamesPage from "./pages/PrevGamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import { useState } from "react";

import Auth from "./components/Auth";
import CreatePlayerPage from "./pages/adminPages/CreatePlayerPage";
import HandleTeamPage from "./pages/adminPages/HandleTeamPage";
import TeamCRUDPage from "./pages/adminPages/TeamCRUDPage";
import CreateTeamPage from "./pages/adminPages/CreateTeamPage";
import PlayerCRUDPage from "./pages/adminPages/PlayerCRUDPage";
import TransferPage from "./pages/adminPages/TransferPage";

/**
 * This component is responsible for the whole project,
 * and specifically, for the routing.
 * @returns
 */
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const signedInAdminRoutes = [
    {
      path: "/",
      element: <RootLayout isSignedInAdmin={isSignedIn} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "start", element: <StartGamePage /> },
        { path: "games", element: <PrevGamesPage /> },
        { path: "games/:gameId", element: <GameDetailPage /> },
        {
          path: "handleTeams",
          children: [
            { index: true, element: <TeamCRUDPage /> },
            { path: "create", element: <CreateTeamPage /> },
            { path: ":teamId", element: <HandleTeamPage /> },
          ],
        },
        {
          path: "handlePlayers",
          children: [
            { index: true, element: <PlayerCRUDPage /> },
            { path: "create", element: <CreatePlayerPage /> },
            { path: "transfer", element: <TransferPage /> },
          ],
        },
      ],
    },
  ];

  const signedOutRoutes = [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "start", element: <StartGamePage /> },
        { path: "games", element: <PrevGamesPage /> },
        { path: "games/:gameId", element: <GameDetailPage /> },
        { path: "adminLogin", element: <Auth onSignIn={handleSignIn} /> },
      ],
    },
  ];

  const router = createBrowserRouter(
    isSignedIn ? signedInAdminRoutes : signedOutRoutes
  );

  return <RouterProvider router={router} />;
}

export default App;
