import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="cont-guest">
            <div className="cont-form-guest">
                <div className="cont-image-guest">
                    <img
                        src="/images/Computer.svg"
                        alt="logo_Foto"
                        className="guest-foto"
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
