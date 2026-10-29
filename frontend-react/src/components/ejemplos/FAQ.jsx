import { useId } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

export function FAQ() {
    // useId crea un id único para vincular encabezados y paneles accesibles.
    const id = useId()

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                mt: 4,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" sx={{ mb: 1 }}>
                Preguntas frecuentes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Ayuda para utilizar el Sistema de Gestión Académica
            </Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-registro-content`}
                    id={`${id}-registro-header`}
                >
                    <Typography component="span">¿Cómo se registra un alumno?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Completá el legajo, nombre, carrera y correo electrónico en el
                        formulario. Luego seleccioná Guardar.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-edicion-content`}
                    id={`${id}-edicion-header`}
                >
                    <Typography component="span">¿Cómo modifico los datos de un alumno?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Seleccioná Editar en el listado. El formulario se completará con
                        los datos actuales para que puedas modificarlos.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-eliminacion-content`}
                    id={`${id}-eliminacion-header`}
                >
                    <Typography component="span">¿Puedo eliminar un alumno?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sí. Desde el listado, seleccioná Eliminar y verificá el alumno
                        antes de confirmar.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}