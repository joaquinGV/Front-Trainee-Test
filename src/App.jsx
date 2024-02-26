import "./App.css";
import { Formulario } from "./Components/Formulario";
import "bootstrap/dist/css/bootstrap.min.css";
import { Lista } from "./Components/Lista";

function App() {
  return (
    <>
      <h1>Applicación de Contactos</h1>
      <Formulario />
      <Lista />
    </>
  );
}

export default App;
