import React from "react";
import NavBar from "../pages/nav";
import styles from '../styles/Home.module.css';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>

    </>
  );
}
