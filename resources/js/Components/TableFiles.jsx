import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

//Modal
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function TableFiles({ data, dataCount, identifier, username }) {
    const [counter, setCounter] = useState("");
    const [pageNumber, setPageNumber] = useState(data.current_page);
    //Modal
    var [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    console.log(username);

    var quantityPages = dataCount / data.per_page;
    quantityPages = Math.trunc(quantityPages + 1);

    const currentPage = (event, page) => {
        OpenLoading();
        setTimeout(() => {
            window.location.href = `${data.path}?page=${page}`;
        }, 1000);
    };
    const OpenLoading = () => {
        setOpen(true);
    };

    const generatePDF = () => {
        setCounter("La descarga inciara en breves segundos...");
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
            const titulo = "LISTA DE VOTANTES";
            doc.setFontSize(18); // Tamaño de fuente para el título
            const tituloWidth =
                doc.getStringUnitWidth(titulo) * doc.internal.getFontSize();
            const pageWidth = doc.internal.pageSize.width;
            const tituloX = (pageWidth - tituloWidth) * 2; // Calcula la posición X para centrar el título
            doc.text(titulo, tituloX, margin * 1);

            // Agregar párrafo
            doc.setFontSize(12); // Tamaño de fuente para el párrafo
            doc.text(`Descargado por: ${username}`, margin, margin * 1.75);

            // Encabezados de la tabla
            const headers = [["Nombre", "Apellido", "Cedula"]];

            // Contenido de la tabla
            const content = data.data.map((row) => [
                row.nombre,
                row.apellido,
                row.cedula,
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

            doc.save("votantes.pdf");
        }, 1000);
    };

    const generateExcel = () => {
        setCounter("La descarga iniciará en breves segundos...");

        setTimeout(() => {
            // Crea un nuevo libro de Excel
            const workbook = XLSX.utils.book_new();

            // Crea una hoja de cálculo en el libro
            const worksheet = XLSX.utils.json_to_sheet(data.data);

            // Asigna un nombre a la hoja de cálculo (puedes cambiarlo según tus necesidades)
            XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

            // Genera el archivo XLSX y lo descarga
            XLSX.writeFile(workbook, "votantes.xlsx");
        }, 1000);
    };

    return (
        <>
            <div className="table-votante">
                <Alert severity="info" className="mb-2 alert-edit">
                    <AlertTitle>
                        Clic en en el enlace para comenzar la descarga.
                    </AlertTitle>
                </Alert>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Archivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(identifier === "PDF_total" ||
                            identifier === "PDF_select") && (
                            <tr>
                                <td
                                    onClick={generatePDF}
                                    className="cursor-pointer"
                                >
                                    <span className="fw-bold underline">
                                        <FileDownloadIcon className="text-success" />
                                        Descargar Archivo en formato .pdf
                                    </span>
                                    <span className="ms-3 text-sm text-decoration-none italic">
                                        {counter}
                                    </span>
                                </td>
                            </tr>
                        )}
                        {(identifier === "EXCEL_total" ||
                            identifier === "EXCEL_select") && (
                            <tr>
                                <td
                                    onClick={generateExcel}
                                    className="cursor-pointer"
                                >
                                    <span className=" fw-bold underline">
                                        <FileDownloadIcon className="text-success" />
                                        Descargar Archivo en formato .xlsx
                                    </span>
                                    <span className="ms-3 text-sm italic">
                                        {counter}
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <Pagination
                count={quantityPages}
                page={pageNumber}
                color="error"
                onChange={currentPage}
                className="paginate"
                //onClick={OpenLoading}
            />
            <Dialog
                fullScreen={fullScreen}
                open={open}
                //onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className="opacity-90"
            >
                <DialogTitle id="responsive-dialog-title"></DialogTitle>
                <DialogContentText>
                    <div className="con-loading-img">
                        <img
                            src="/images/Loading.svg"
                            alt="icon-back"
                            className="loading-img"
                        />
                        <span className="loading-text">
                            Por favor espere mientras se actualiza la pagina.
                            <CircularProgress
                                className="loading-icon"
                                color="error"
                            />
                        </span>
                    </div>
                </DialogContentText>
                <DialogActions></DialogActions>
            </Dialog>
            {/* <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}

            {/* {loading === true && (
                <div className="loading">
                    <div className="con-loading-img">
                        <img
                            src="/images/Loading.svg"
                            alt="icon-back"
                            className="loading-img"
                        />
                        <span className="loading-text">
                            Por favor espere mientras se actualiza la pagina.
                            <CircularProgress
                                className="loading-icon"
                                color="error"
                            />
                        </span>
                    </div>
                </div>
            )} */}
        </>
    );
}

export default TableFiles;
