import React from "react";
import Header from "./../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header></Header>

      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default Layout;
