import { createTheme } from "@mui/material/styles"

// Un único tema configura los estilos de Material UI en toda la aplicación.
const tema = createTheme({
    cssVariables: {
        colorSchemeSelector: "data",
    },
    colorSchemes: {
        // Paleta para el modo claro.
        light: {
            palette: {
                primary: {
                    main: "#3157a4",
                    dark: "#23417d",
                    contrastText: "#ffffff",
                },
                secondary: {
                    main: "#5575b8",
                },
                background: {
                    default: "#f4f6fb",
                    paper: "#ffffff",
                },
            },
        },
        // Paleta para el modo oscuro.
        dark: {
            palette: {
                primary: {
                    main: "#9bb8ff",
                    dark: "#7295e8",
                    contrastText: "#101a31",
                },
                secondary: {
                    main: "#aec4ff",
                },
                background: {
                    default: "#111827",
                    paper: "#1b2536",
                },
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 700,
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    },
})

export default tema
