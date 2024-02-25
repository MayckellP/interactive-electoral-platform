import * as React from "react";
import { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Table from "react-bootstrap/Table";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TableDistritoDialog({
    dataDistrito,
    userData,
    coordinadorData,
}) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState("paper");

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const creador_id = userData;
    var distrito_name;
    var departamento_name;
    var punteros = [
        {
            nombre: "",
            apellido: "",
            cantidad: "",
        },
    ];
    dataDistrito.map((puntero) => {
        if (creador_id === puntero.creador_id) {
            punteros.push({
                nombre: puntero.name,
                apellido: puntero.apellido,
                cantidad: puntero.total_votantes_por_punter,
            });
            distrito_name = puntero.nombre_distrito;
            departamento_name = puntero.nombre_departamento;
        }
    });
    punteros.shift();

    const generatePDF = () => {
        setTimeout(() => {
            const doc = new jsPDF();

            // Define los márgenes
            const margin = 10; // Puedes ajustar este valor según tus necesidades

            // Establece los márgenes del documento
            doc.setProperties({
                marginLeft: margin,
                marginRight: margin,
                marginTop: margin,
                marginBottom: margin,
            });

            // Agregar título
            const titulo = "LISTA DE PUNTEROS";
            doc.setFontSize(18); // Tamaño de fuente para el título
            const tituloWidth =
                doc.getStringUnitWidth(titulo) * doc.internal.getFontSize();
            const pageWidth = doc.internal.pageSize.width;
            const tituloX = (pageWidth - tituloWidth) * 2; // Calcula la posición X para centrar el título
            doc.text(titulo, tituloX, margin * 1);

            // Agregar párrafo
            doc.setFontSize(12); // Tamaño de fuente para el párrafo
            doc.text(
                `Descargado por el Administrador: ${coordinadorData} - ${distrito_name} - ${departamento_name}`,
                margin,
                margin * 1.75
            );

            // Encabezados de la tabla
            const headers = [["Nombre", "Apellido", "Cantidad"]];

            // Contenido de la tabla
            const content = punteros.map((row) => [
                row.nombre,
                row.apellido,
                row.cantidad,
            ]);

            doc.setFont("helvetica");
            doc.setTextColor(0, 0, 0); // Establece el color del texto a negro
            doc.setDrawColor(255, 255, 255); // Establece el color del borde a blanco
            doc.setFillColor(255, 255, 255); // Establece el color de fondo a blanco

            const tableOptions = {
                startY: margin * 2,
                margin: { left: margin, right: margin },
                styles: {
                    textColor: [0, 0, 0], // Color de texto a negro
                    lineColor: [255, 255, 255], // Color de borde a blanco
                    fillColor: [255, 255, 255], // Color de fondo a blanco
                },
            };

            // Crea la tabla en el PDF
            doc.autoTable({
                head: headers,
                body: content,
                ...tableOptions,
            });

            doc.save("Punteros.pdf");
        }, 1000);
    };

    return (
        <React.Fragment>
            <div
                onClick={handleClickOpen("paper")}
                className="link-details-table"
            >
                <RemoveRedEyeIcon className="btn" />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth="md"
            >
                <DialogTitle id="scroll-dialog-title">
                    {coordinadorData} - {distrito_name} - {departamento_name}
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText id="scroll-dialog-description">
                        <div className="table-user">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {punteros.map((puntero, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{puntero.nombre}</td>
                                            <td>{puntero.apellido}</td>
                                            <td className="">
                                                {puntero.cantidad}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={generatePDF}
                        autoFocus
                        variant="contained"
                        color="success"
                    >
                        Descargar como PDF
                    </Button>
                    {/* <Button onClick={handleClose} color="error">
                        Cerrar
                    </Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
