import React, { useState, useEffect, useMemo, useCallback } from "react";
import Dashboard from "./components/Dashboard";
import TopicTracker from "./components/TopicTracker";
import TestTracker from "./components/TestTracker";
import Lectures from "./components/Lectures";
import Notes from "./components/Notes";
import Reports from "./components/Reports";
import CoachingLog from "./components/CoachingLog";
import LoginPage from "./components/LoginPage";

import {
  BookOpenIcon,
  ChartBarIcon,
  HomeIcon,
  BuildingLibraryIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from "./src/firebase";

export interface User {
  uid: string;
  email?: string | null;
}

export const UserContext = React.createContext<{
  user: User | null;
  updateUser: (u: Partial<User> | ((prev: User) => User)) => void;
}>({
  user: null,
  updateUser: () => {},
});

type AppView = "dashboard" | "topics" | "tests" | "lectures" | "notes" | "reports" | "coaching";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AppView>("dashboard");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateUser = useCallback(
    (updater: Partial<User> | ((prevUser: User) => User)) => {
      setUser((prev) => (typeof updater === "function" ? updater(prev!) : { ...prev!, ...updater }));
    },
    []
  );

  const contextValue = useMemo(() => ({ user, updateUser }), [user, updateUser]);

  if (!user) return <LoginPage auth={auth} />;

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <Dashboard />;
      case "topics":
        return <TopicTracker />;
      case "tests":
        return <TestTracker />;
      case "lectures":
        return <Lectures />;
      case "notes":
        return <Notes />;
      case "reports":
        return <Reports />;
      case "coaching":
        return <CoachingLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <UserContext.Provider value={contextValue}>
      <div className="flex flex-col h-screen">
        <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
          <h1 className="text-lg font-bold">JEE Prep Meter</h1>
          <button onClick={() => signOut(auth)} className="text-sm flex items-center gap-1">
            <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">{renderView()}</main>

        <footer className="flex justify-around bg-white shadow-inner p-2">
          <HomeIcon className="w-6 h-6" onClick={() => setView("dashboard")} />
          <BookOpenIcon className="w-6 h-6" onClick={() => setView("topics")} />
          <ChartBarIcon className="w-6 h-6" onClick={() => setView("tests")} />
          <BuildingLibraryIcon className="w-6 h-6" onClick={() => setView("lectures")} />
          <DocumentChartBarIcon className="w-6 h-6" onClick={() => setView("reports")} />
          <Cog6ToothIcon className="w-6 h-6" onClick={() => setView("coaching")} />
        </footer>
      </div>
    </UserContext.Provider>
  );
};

export default App;