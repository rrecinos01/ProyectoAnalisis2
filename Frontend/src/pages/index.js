import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const inter = Inter({ subsets: ["latin"] });

// Importa tus componentes de página aquí...
import Main from "../pages/main"; 

export default function Home() {
  return (
    <>
      <Main></Main>
    </>
  );
}
