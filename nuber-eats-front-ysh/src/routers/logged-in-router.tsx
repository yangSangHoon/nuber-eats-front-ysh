import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedInRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/create-account" element={<CreateAccount />}></Route>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  </BrowserRouter>
);
