/* eslint-disable react/prop-types */
// ContactRow.js
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { UpdateContact } from "./UpdateContact";

// Componente de contacto.
const Contact = ({ contact, handleDelete, getList }) => {
  // Inicializar estado isEditing como false.
  const [isEditing, setIsEditing] = useState(false);

  // Cambio de estado isEditing a true en click.
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cambio de estado isEditing a false y actualizar lista de contactos (En caso de edición)
  const handleCancel = () => {
    console.log("Cancel");
    setIsEditing(false);
    getList();
  };

  // Renderización condicional dependiendo el estado isEditing para mostrar componente de edición, o de información del contacto.
  return (
    <>
          {isEditing ? (
        <UpdateContact contact={contact} handleCancel={handleCancel} />
      ) : (
        <>
          <Row className="justify-content-center align-items-center py-1">
            <Col sm={9}>
              {contact.properties.firstname}{" "}
              {contact.properties.lastname.split(" ")[0]}
              {"  |  "}
              {contact.properties.email}
            </Col>
            <Col sm={1} xs={2} className="mt-3-xs">
              <button
                type="button"
                className="btn btn-outline-info p-1 px-2"
                onClick={handleEdit}
              >
                <Edit />
              </button>
            </Col>
            <Col sm={1} xs={2}>
              <button
                type="button"
                className="btn btn-outline-danger p-1 px-2"
                onClick={() => {
                  handleDelete(contact.id);
                }}
              >
                <Trash />
              </button>
            </Col>
          </Row>
          <hr />
        </>
      )}
    </>
  );
};

export default Contact;
