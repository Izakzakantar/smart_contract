import React from "react";
import Header from "./components/header/Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main> {/* This is where your routes render */}
    </div>
  );
}

export default Layout;
