import { useReactiveVar } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("isLoggedIn", isLoggedIn);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
  // return (
  //   <BrowserRouter>
  //     <LoggedInRouter />
  //     <LoggedOutRouter />
  //   </BrowserRouter>
  // );
}

export default App;
