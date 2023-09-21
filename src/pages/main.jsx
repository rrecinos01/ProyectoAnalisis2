import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const inter = Inter({ subsets: ["latin"] });

// Importa tus componentes de página aquí...
import Dashboard from "./Dahboard/dashboard";
import Gestions from "./Gestionar_expedientes/gestion";
import Login from "../pages/login_principal"; 

export default function Home() {
  const menuLeft = useRef(null);
  const toast = useRef(null);
  const [activePage, setActivePage] = useState("dashboard");
  const router = useRouter();
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => setActivePage("dashboard"),
    },
    {
      label: "Gestionar Expedientes",
      icon: "pi pi-inbox",
      command: () => setActivePage("gestion"),
    },
    {
      label: "Consultar Ausencias",
      icon: "pi pi-compass",
      command: () => setActivePage("muebles_exterior"),
    },
    {
      label: "Cálculos Especiales",
      icon: "pi pi-cog",
      command: () => setActivePage("crud_productos"),
    },
    {
      label: "Registro de Historial de Aumentos Salariales",
      icon: "pi pi-users",
      command: () => setActivePage("clientes"),
    },
    {
      label: "Reportes",
      icon: "pi pi-chart-bar",
      command: () => setActivePage("reportes"),
    },
  ];
   // Lógica para verificar si el usuario ha iniciado sesión
   useEffect(() => {
    // Implementa tu lógica de autenticación aquí.
    // Puedes usar cookies, tokens JWT o cualquier otro método.
    // Por ahora, usaremos una variable de estado falsa para simularlo.
    const userIsLoggedIn = false; // Cambia esto a `true` si el usuario ha iniciado sesión.

    setUserLoggedIn(userIsLoggedIn);
  }, []);
  const toast2 = useRef(null);
  const items2 = [
    {
      label: "Actualizar Datos",
      icon: "pi pi-refresh",
      command: () => {
        setProductDialog(true);
      },
    },
    {
      label: "Mis Compras",
      icon: "pi pi-money-bill",
      command: () => {
        setActivePage("clientes_compras");
      },
    },
    // Otras opciones aquí...
  ];

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  const saveProduct = () => {
    setSubmitted(true);
  };
  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
    </>
  );
  return (
    <>
      <Head>
        <title>La Tablita Feliz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <div className={styles.description2}>
            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button
              severity="secondary"
              icon="pi pi-align-left"
              className={styles.vercelLogo}
              onClick={(event) => menuLeft.current.toggle(event)}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
          </div>
          <div>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
              onClick={() => setActivePage("dashboard")}
            />
          </div>
        </div>
        <div className=" d-flex  justify-content-end p-2">
          <Toast ref={toast}></Toast>
          <SplitButton
            label="Login"
            icon="pi pi-plus"
            onClick={() => router.push("/login_principal")}
            model={items2}
            severity="warning"
            rounded
            size="small"
          />
        </div>

        <div>
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "gestion" && <Gestions />}
          {activePage === "ausencias" && <ClientesEdit />}
          {activePage === "especiales" && <ComprasCliente />}
          {activePage === "historial" && <Clientes />}
          {activePage === "reportes" && <Crud_Productos />}
        </div>
      </main>
      <Dialog
        visible={productDialog}
        style={{ width: "500px" }}
        header="Editar Perfil"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {/*{product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}*/}
        <div className="field">
          <label htmlFor="name" className="font-bold block mb-2">
            Tipo de Documento
          </label>
          <InputText id="name" required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold block mb-2">
            Número de documento{" "}
          </label>
          <InputText id="description" required />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold block mb-2">
            Nombre completo del cliente
          </label>
          <InputText id="description" required />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold block mb-2">
            Teléfono de residencia
          </label>
          <InputNumber id="description" required useGrouping={false} />
        </div>
        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2">
            Teléfono celular
          </label>
          <InputNumber inputId="withoutgrouping" useGrouping={false} />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold block mb-2">
            Dirección
          </label>
          <InputTextarea id="description" required rows={1} cols={20} />
        </div>
        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2">
            Ciudad de residencia
          </label>
          <InputNumber inputId="withoutgrouping" useGrouping={false} />
        </div>
        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2">
            Departamento
          </label>
          <InputNumber inputId="withoutgrouping" useGrouping={false} />
        </div>
        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2">
            País
          </label>
          <InputNumber inputId="withoutgrouping" useGrouping={false} />
        </div>
        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2">
            Profesión
          </label>
          <InputNumber inputId="withoutgrouping" useGrouping={false} />
        </div>
        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2">
            Email
          </label>
          <InputNumber inputId="withoutgrouping" useGrouping={false} />
        </div>
      </Dialog>
    </>
  );
}
