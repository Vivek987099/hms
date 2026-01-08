import React from "react";
import Header from "./../components/Header";
import { Outlet } from "react-router-dom";
import Footer from './../components/Footer';

function Layout() {
  return (
    <>
      <Header></Header>

      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
