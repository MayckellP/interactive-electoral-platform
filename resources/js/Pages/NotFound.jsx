import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";

export default function NotFound({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Votantes">
            <Head title="Votantes" />
            <Link href={route("votantes.index")} className="cont-btn-back">
                <img
                    src="/images/Back-icon.svg"
                    alt="icon-back"
                    className="back-button"
                />
                <span className="back-text">Back</span>
            </Link>
            <div className="cont-img-not-found">
                <h3 className="title">Oops!</h3>
                <span className="text">
                    El votante solicitado no se encuentra aun registrado.
                </span>
                <img
                    src="/images/NotFound.svg"
                    alt="icon-back"
                    className="back-button"
                />
            </div>
        </AuthenticatedLayout>
    );
}
