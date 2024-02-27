import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import Search from "../icons/Search.jsx";
import { useEffect } from "react";
import { deleteContact, getContacts } from "../services.js";
import { useState } from "react";
import Contact from "./Contact.jsx";

// Función lista y logica de renderizado
export function Lista() {
  // Inicialización vacia de estados de contactos y searchData
  const [contacts, setContacts] = useState([]);
  const [searchData, setSearchData] = useState("");

  // Función que acualiza la lista de contactos en base a un email o vacio para obtener todos.
  async function getList(email = "") {
    const contactsList = await getContacts(email);
    setContacts(contactsList.results);
  }

  // Renderizado inicial para mostrar lista.
  useEffect(() => {
    getList();
  }, []);

  // Manejo eventos Search bar para actualizar estado y actualizar lista en caso de estar vacia.
  const handleInputChange = async (event) => {
    setSearchData(event.target.value);
    if (event.target.value == "") {
      await getList();
    }
  };

  // Manejo de click en Search button.
  const handleSearchClick = async () => {
    await getList(searchData);
  };

  // Manejo de delete para borrar el elemento.
  const handleDelete = async (id) => {
    await deleteContact(id);
    await getList();
  };

  return (
    <Container className="mt-4 border p-3 pr-6 rounded ">
      <h3>Contactos</h3>
      <InputGroup className="mb-3">
        <Button
          variant="outline-secondary"
          id="searchButton"
          onClick={handleSearchClick}
        >
          <Search />
        </Button>
        <Form.Control
          placeholder="Search by email"
          onChange={handleInputChange}
          value={searchData}
        />
      </InputGroup>
      {/* Map de datos */}
      {contacts &&
        contacts.map((contact) => {
          return (
            <Contact
              key={contact.id}
              contact={contact}
              handleDelete={handleDelete}
              getList={getList}
            />
          );
        })}
    </Container>
  );
}
