/* eslint-disable react/prop-types */
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editContact } from "../services";
import { FloatingLabel } from "react-bootstrap";

// Componente para actualizar información del contacto
export const UpdateContact = ({ contact, handleCancel }) => {
  // Obtención de datos utilizados del contact para no manipular la información.
  const id = contact.id;
  const originalContact = {
    ...contact.properties,
  };

  // Creación de formulario con Formik con validación de datos y eventos.
  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      // Inicializar valores del contacto
      initialValues: {
        firstname: originalContact?.firstname || "",
        lastname: originalContact?.lastname || "",
        email: originalContact?.email || "",
      },
      // Actualizar datos en evento submit.
      onSubmit: async (data) => {
        await editContact(id, data);
        handleCancel();
      },
      // Esquema de validación para cada input.
      validationSchema: Yup.object({
        firstname: Yup.string()
          .required("Este campo es obligatorio")
          .min(3, "El nombre debe tener al menos 3 caracteres")
          .max(20),
        lastname: Yup.string()
          .required("Este campo es obligatorio")
          .min(3, "El nombre debe tener al menos 3 caracteres")
          .max(20),
        email: Yup.string()
          .email("Ingrese un email válido")
          .required("Este campo es obligatorio"),
      }),
      validateOnChange: true,
      validateOnBlur: true,
    });

  // Renderizado de inputs con datos del contacto, y actualización en caso de submit, o cancelación de proceso.
  return (
    <Form className="container col-12 mt-4" onSubmit={handleSubmit}>
      <Row className="g-1 justify-content-evenly align-items-center ">
        <Col sm={3}>
          <FloatingLabel controlId="floatingInputGrid" label="First Name">
            <Form.Control
              type="text"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.firstname && !errors.firstname}
              isInvalid={!!errors.firstname}
            />
          </FloatingLabel>
        </Col>
        <Col sm={3}>
          <FloatingLabel controlId="floatingInputGrid" label="Last Name">
            <Form.Control
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.lastname && !errors.lastname}
              isInvalid={!!errors.lastname}
            />
          </FloatingLabel>
        </Col>
        <Col sm={4}>
          <FloatingLabel controlId="floatingInputGrid" label="Email">
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
            />
          </FloatingLabel>
        </Col>
        <Col sm={1} className=" d-flex justify-content-center ">
          <Row>
            <Col sm={12} xs={6}>
              <button
                className="p-1 py-0 btn btn-success btn-sm mb-1"
                type="submit"
              >
                Save
              </button>
            </Col>
            <Col sm={12} xs={6}>
              <button
                className="p-1 py-0 btn btn-danger btn-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
