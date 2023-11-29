import { StoreContextProvider } from "./context"
import { Gui } from "./gui"

export const App = () => {
  return (
    <StoreContextProvider>
      <Gui />
    </StoreContextProvider>
  )
}
