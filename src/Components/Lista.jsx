import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import Search from "../icons/Search.jsx";
import { useEffect } from "react";
import { deleteContact, getContacts } from "../services.js";
import { useState } from "react";
import Contact from "./Contact.jsx";

export function Lista() {
  const [contacts, setContacts] = useState([]);
  const [searchData, setSearchData] = useState("");

  async function getList(email = "") {
    const contactsList = await getContacts(email);
    setContacts(contactsList.results);
  }

  useEffect(() => {
    getList();
  }, []);

  const handleInputChange = async (event) => {
    setSearchData(event.target.value);
    if (event.target.value == "") {
      await getList();
    }
  };

  const handleSearchClick = async () => {
    await getList(searchData);
  };

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
      {contacts.map((contact) => {
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
