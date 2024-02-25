import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavLink from "@/Components/NavLink";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "@/Components/Dropdown";
import ButonCreate from "./ButtonCreate";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { Link } from "@inertiajs/react";

function NavbarMobile(props) {
    const [show, setShow] = useState(false);

    //SEPARAR CADA CADENA POR UN ESPACIO " "
    const nombreCompleto = props.user.name.split(" ");
    const apellidoCompleto = props.user.apellido.split(" ");

    //AGREGAR LA PRIMERA A LA VARIABLE Y ESCRIBIR LA PRIMERA LETRA EN MAYUSCULA Y EL RESTO EN MINUSCULA
    const nombre =
        nombreCompleto[0].charAt(0).toUpperCase() +
        nombreCompleto[0].slice(1).toLowerCase();
    const apellido =
        apellidoCompleto[0].charAt(0).toUpperCase() +
        apellidoCompleto[0].slice(1).toLowerCase();

    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    bg="dark"
                    variant="dark"
                    className="NavbarMobile"
                >
                    <Container className="cont-logo-cart">
                        <Navbar.Brand
                            href={route("profile.edit")}
                            className="cont-img-client-mobile"
                        >
                            {/* <img src="/images/Logo.svg" alt="Photo User" /> */}
                            <span>
                                <b>{props.user.role}</b>
                            </span>
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                        />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="navMenu-opened px-2"
                            style={{ width: "60%" }}
                        >
                            <Offcanvas.Header
                                closeButton
                                className="cont-nav-header border-bottom"
                            >
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    <div className="cont-img-user-mobile">
                                        <img
                                            src="/images/Icon_2.svg"
                                            alt="Photo User"
                                        />
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className="name-user"
                                                >
                                                    <span className="name">
                                                        {nombre},
                                                    </span>
                                                    <span className="lastname">
                                                        {apellido}
                                                    </span>
                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <h5 className="user-role-mobile">
                                        {props.user.role} -{" "}
                                        {props.user.distrito}
                                    </h5>
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body className="canvas-body">
                                <div className="cont-mid-navbar">
                                    <ul>
                                        <li>
                                            <Link
                                                href={route("dashboard")}
                                                className="btn-menu"
                                            >
                                                <DashboardIcon className="icon-btn-menu" />
                                                <span>Panel</span>
                                            </Link>
                                        </li>
                                        {(props.user.role === "Administrador" ||
                                            props.user.role === "Delegado" ||
                                            props.user.role ===
                                                "Coordinador") && (
                                            <li>
                                                <Link
                                                    href={route(
                                                        "usuarios.index"
                                                    )}
                                                    className="btn-menu"
                                                >
                                                    <PeopleIcon className="icon-btn-menu" />
                                                    <span>Usuarios</span>
                                                </Link>
                                            </li>
                                        )}

                                        {props.user.role ===
                                            "Administrador" && (
                                            <li>
                                                <Link
                                                    href={route("roles.index")}
                                                    className="btn-menu"
                                                >
                                                    <AssignmentIcon className="icon-btn-menu" />
                                                    <span>Roles</span>
                                                </Link>
                                            </li>
                                        )}

                                        <li>
                                            <Link
                                                href={route("votantes.create")}
                                                className="btn-menu"
                                            >
                                                <HowToVoteIcon className="icon-btn-menu" />
                                                <span>Votantes</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href={route("consulta")}
                                                className="btn-menu"
                                            >
                                                <ContentPasteSearchIcon className="icon-btn-menu" />
                                                <span>Consulta de Padron</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {/*  <div className="cont-bot-navbar-mobile">
                                    <div className="cont-img-logo-mobile">
                                        <img
                                            src="/images/Logo.svg"
                                            alt="Phrase_Login"
                                        />
                                    </div>
                                </div> */}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default NavbarMobile;
