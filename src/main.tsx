import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

const app = createRoot(document.getElementById("root")!);

app.render(
    <StrictMode>
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </StrictMode>
);
