const API_URL = "http://localhost:8080/contacts/";

//Obtener contactos dependiente de email
export async function getContacts(mail) {
  try {
    let email = mail ? mail : "";
    const response = await fetch(`${API_URL}${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// Crear contacto
export async function createContact(payload) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

// Actualizar un contacto
export async function editContact(id, payload) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

// Borrar un contacto
export async function deleteContact(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}
