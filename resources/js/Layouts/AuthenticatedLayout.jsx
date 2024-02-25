import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { Link } from "@inertiajs/react";
import { Button } from "@mui/material";
import NavbarMobile from "@/Components/NavbarMobile";
import NavLink from "@/Components/NavLink";

export default function Authenticated({ user, header, children }) {
    //SEPARAR CADA CADENA POR UN ESPACIO " "
    const nombreCompleto = user.name.split(" ");
    const apellidoCompleto = user.apellido.split(" ");

    //AGREGAR LA PRIMERA A LA VARIABLE Y ESCRIBIR LA PRIMERA LETRA EN MAYUSCULA Y EL RESTO EN MINUSCULA
    const nombre =
        nombreCompleto[0].charAt(0).toUpperCase() +
        nombreCompleto[0].slice(1).toLowerCase();
    const apellido =
        apellidoCompleto[0].charAt(0).toUpperCase() +
        apellidoCompleto[0].slice(1).toLowerCase();
    return (
        <div className="cont-global">
            <div className="cont-menu">
                <div className="menu-top">
                    <Link href={route("profile.edit")} className="btn-setting">
                        <SettingsIcon className="icon-setting" />
                    </Link>
                    <div className="cont-profile-border">
                        <div className="cont-foto">
                            <img
                                src="/images/Logo_Aprobado.png"
                                alt="profile_Foto"
                                className="profile-foto"
                            />
                        </div>
                    </div>
                    <h4 className="user-name">
                        {nombre} {apellido}
                    </h4>
                    <span className="user-email">
                        {user.role === "Administrador"
                            ? user.role
                            : user.role + " - " + user.nombre_departamento}
                    </span>
                </div>
                <div className="menu-mid">
                    <Link href={route("dashboard")} className="btn-menu">
                        <DashboardIcon className="icon-btn-menu" />
                        <span>Panel</span>
                    </Link>

                    {(user.role === "Administrador" ||
                        user.role === "Delegado" ||
                        user.role === "Coordinador") && (
                        <Link
                            href={route("usuarios.index")}
                            className="btn-menu"
                        >
                            <PeopleIcon className="icon-btn-menu" />
                            <span>Usuarios</span>
                        </Link>
                    )}

                    {user.role === "Administrador" && (
                        <Link href={route("roles.index")} className="btn-menu">
                            <AssignmentIcon className="icon-btn-menu" />
                            <span>Roles</span>
                        </Link>
                    )}

                    <Link href={route("votantes.create")} className="btn-menu">
                        <HowToVoteIcon className="icon-btn-menu" />
                        <span>Votantes</span>
                    </Link>

                    <Link href={route("consulta")} className="btn-menu">
                        <ContentPasteSearchIcon className="icon-btn-menu" />
                        <span>Consulta de Padron</span>
                    </Link>
                </div>
                <div className="menu-bot">
                    {/*  <img
                        src="/images/Logo.svg"
                        alt="logo_Foto"
                        className="logo-foto"
                    /> */}
                </div>
            </div>
            <div className="cont-view">
                <NavbarMobile user={user} />

                {header && (
                    <header className="cont-header">
                        <h2 className="title_view">{header}</h2>
                        <Link
                            href={route("logout")}
                            method="post"
                            className="cont-logout"
                            as="button"
                        >
                            <Button
                                variant="contained"
                                endIcon={<LogoutIcon />}
                                className="btn-logout"
                            >
                                Logout
                            </Button>
                        </Link>
                    </header>
                )}

                <main className="cont-subViews">{children}</main>
            </div>
        </div>
    );
}
