import { NavLink } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded"
import logo from "../assets/sga-logo.svg"

const enlaces = [
    { to: "/alumnos", texto: "Alumnos" },
    { to: "/docentes", texto: "Docentes" },
    { to: "/materias", texto: "Materias" },
]

export default function Header() {
    return (
        <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}
        >
            <Toolbar
                sx={{
                    width: "min(100% - 2rem, 960px)",
                    mx: "auto",
                    px: "0 !important",
                    py: 1,
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >
                <Box
                    component={NavLink}
                    to="/"
                    sx={{ display: "flex", alignItems: "center", gap: 1.5, mr: "auto", color: "text.primary", textDecoration: "none" }}
                >
                    <Box component="img" src={logo} alt="" sx={{ width: 40, height: 40 }} />
                    <Box>
                        <Typography variant="h6" component="span" sx={{ display: "block", fontWeight: 800, lineHeight: 1.1 }}>
                            SGA
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Sistema de Gestión Académica
                        </Typography>
                    </Box>
                </Box>
                <Box component="nav" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {enlaces.map(enlace => (
                        <Button
                            key={enlace.to}
                            component={NavLink}
                            to={enlace.to}
                            color="inherit"
                            sx={{ "&.active": { color: "primary.main", bgcolor: "action.selected" } }}
                        >
                            {enlace.texto}
                        </Button>
                    ))}
                    <IconButton component={NavLink} to="/ayuda" aria-label="Ayuda" color="primary">
                        <HelpOutlineRoundedIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
