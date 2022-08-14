import { gql, useQuery } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { Login } from "../pages/login";

const ClientRoutes = [<Route path="/" element={<Restaurants />}></Route>];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  console.log("data.me.role", data?.me?.role);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {data.me.role === "Client" && ClientRoutes}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
