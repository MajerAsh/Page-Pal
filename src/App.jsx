import { Routes, Route, Navigate } from "react-router";
import Layout from "./Layout/Layout.jsx";
import BooksList from "./pages/BooksList.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Error404 from "./pages/Error404";
import { AuthProvider, useAuth } from "./Auth/Auth.jsx";
import "./index.css";

// Simple route guard
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<BooksList />} />
          <Route path="books" element={<BooksList />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
