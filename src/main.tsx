import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import IndexPopup from "~/popup"
import "~/style.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndexPopup />
  </StrictMode>
)
