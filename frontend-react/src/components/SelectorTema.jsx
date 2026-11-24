import { useColorScheme } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"

// Alterna entre tema claro y oscuro con useColorScheme.
export default function SelectorTema() {
    const { mode, systemMode, setMode } = useColorScheme()
    // Si el modo es system, se usa el del sistema operativo.
    const oscuro = (mode === "system" ? systemMode : mode) === "dark"

    return (
        <IconButton
            color="primary"
            aria-label={oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            onClick={() => setMode(oscuro ? "light" : "dark")}
        >
            {oscuro ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </IconButton>
    )
}
