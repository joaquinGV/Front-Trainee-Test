import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createContact } from "../services";

// Seccion de formulario para crear nuevo contacto
export const Formulario = () => {
  // Formik para manejo, validación de datos y evento submit
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
    //Evento submit
    onSubmit: async (data) => {
      await createContact(data);
      resetForm();
    },
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
      phone: Yup.number()
        .integer("Ingrese un email válido")
        .positive()
        .required("Este campo es obligatorio"),
    }),
    validateOnChange: true,
    // validateOnBlur: true,
  });

  return (
    <Form
      className="border border-2 border-info rounded container col-10 mt-4 "
      onSubmit={handleSubmit}
    >
      {/* Input de Nombre */}
      <Form.Group
        as={Row}
        className="m-3 justify-content-center align-items-center"
        controlId="firstname"
      >
        <Form.Label column sm={2}>
          Nombre
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="ej. Juan"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.firstname && !errors.firstname}
            isInvalid={
              touched.firstname &&
              !!errors.firstname &&
              values.firstname.trim() !== ""
            }
          />
        </Col>
      </Form.Group>
      {/* Input de Apellido */}
      <Form.Group
        as={Row}
        className="m-3 justify-content-center align-items-center"
        controlId="lastname"
      >
        <Form.Label column sm={2}>
          Apellido
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="ej. Perez"
            name="lastname"
            onBlur={handleBlur}
            onChange={handleChange}
            isValid={touched.lastname && !errors.lastname}
            isInvalid={
              touched.lastname &&
              !!errors.lastname &&
              values.lastname.trim() !== ""
            }
            value={values.lastname}
          />
        </Col>
      </Form.Group>
      {/* Input de Email */}
      <Form.Group
        as={Row}
        className="m-3 justify-content-center align-items-center"
        border="primary"
        controlId="formHorizontalEmail"
      >
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="email"
            placeholder="ejemplo@gmail.com"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            isValid={touched.email && !errors.email}
            isInvalid={
              touched.email && !!errors.email && values.email.trim() !== ""
            }
            value={values.email}
          />
        </Col>
      </Form.Group>
      {/* Input de Nombre */}
      <Form.Group
        as={Row}
        className="m-3 justify-content-center align-items-center"
        controlId="formHorizontalPassword"
      >
        <Form.Label column sm={2}>
          Telefono
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="tel"
            placeholder="5551234567"
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            isValid={touched.phone && !errors.phone}
            isInvalid={
              touched.phone && !!errors.phone && values.phone.trim() !== ""
            }
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 text-center">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Crear Contacto</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};
