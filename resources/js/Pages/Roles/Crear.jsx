import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, permission }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        permission: [],
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("roles.store"), { onSuccess: () => reset() });
    };
    console.log(permission);
    const btnRole = (role) => {
        permission.map((item) => {
            document.getElementById(item.name).checked = false;
        });
        data.permission = [];
        data.name = "";

        if (role.target.id === "Admin") {
            permission.map((item) => {
                document.getElementById(item.name).checked = true;
                data.permission.push([item.name]);
            });

            document.getElementById("title-form").value = "Administrador";
            data.name = "Administrador";
        } else if (role.target.id === "Delegado") {
            permission.map((item) => {
                document.getElementById(item.name).checked = true;
                data.permission.push([item.name]);
            });
            document.getElementById("show-rol").checked = false;
            document.getElementById("create-rol").checked = false;
            document.getElementById("edit-rol").checked = false;
            document.getElementById("delete-rol").checked = false;

            document.getElementById("title-form").value = "Delegado";
            data.name = "Delegado";
        } else if (role.target.id === "Coordinador") {
            permission.map((item) => {
                document.getElementById(item.name).checked = true;
                data.permission.push([item.name]);
            });
            document.getElementById("show-rol").checked = false;
            document.getElementById("create-rol").checked = false;
            document.getElementById("edit-rol").checked = false;
            document.getElementById("delete-rol").checked = false;

            document.getElementById("title-form").value = "Coordinador";
            data.name = "Coordinador";
        } else if (role.target.id === "Puntero") {
            document.getElementById("show-votante").checked = true;
            document.getElementById("create-votante").checked = true;
            document.getElementById("edit-votante").checked = true;
            document.getElementById("delete-votante").checked = true;

            data.permission.push(
                ["show-votante"],
                ["create-votante"],
                ["edit-votante"],
                ["delete-votante"]
            );

            document.getElementById("title-form").value = "Puntero";
            data.name = "Puntero";
        }
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Create Roles"}>
            <Head title="Roles" />

            <div className="cont-global-roles">
                <form onSubmit={submit} className="form-roles">
                    <div className="mb-4">
                        <FloatingLabel label="Role name" className="mb-0">
                            <Form.Control
                                type="text"
                                className="form-title"
                                id="title-form"
                                value=""
                                disabled
                            />
                        </FloatingLabel>
                        <InputError message={errors.name} className="mt-2" />
                        <div className="cont-cardRoles row row-cols-1 row-cols-md-2 g-4 pb-4 m-auto">
                            <div
                                className="cont-department bg-gradient"
                                style={{ backgroundColor: "darkcyan" }}
                            >
                                <h4>Role Especial</h4>
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Administrador</span>
                                        <img
                                            id="Admin"
                                            src="/images/Admin.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cont-department bg-danger bg-gradient">
                                <h4>Puestos departamental</h4>
                                <div className="d-flex">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Delegado</span>
                                        <img
                                            id="Delegado"
                                            src="/images/Coordinador.svg"
                                            alt="Delegado_Role"
                                        />
                                    </div>
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Coordinador</span>
                                        <img
                                            id="Coordinador"
                                            src="/images/Votante.svg"
                                            alt="Coordinador_Role"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cont-department bg-dark bg-gradient">
                                <h4>Empleado General</h4>
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Puntero</span>
                                        <img
                                            id="Puntero"
                                            src="/images/Workers.svg"
                                            alt="Puntero_Role"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {permission.map((type) => (
                            <div key={type.id} className="mb-3" hidden>
                                <Form.Check // prettier-ignore
                                    type="checkbox"
                                    id={type.name}
                                    label={type.name}
                                    value={type.name}
                                />
                            </div>
                        ))}
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <Button type="submit" className="btn-roles">
                        Create Role
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
