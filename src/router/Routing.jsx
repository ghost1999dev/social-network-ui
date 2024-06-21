import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/users/Login";
import { Register } from "../components/users/Register";
import { PrivateLayout } from "../components/layout/general/PrivateLayout";
import { Feed } from "../components/publications/Feed";
import {AuthProvider} from "../context/AuthProvider";
export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>

          {/* Private Routes */}
          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
          </Route>

          {/* Catch-All Route for 404 */}
          <Route path="*" element={<h2>Error 404: Page Not Found</h2>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
