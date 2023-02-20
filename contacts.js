const fs = require("fs").promises;
const path = require("path");

require("colors");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументувати кожну функцію
async function getContactsData() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data.toString());

    return contacts;
  } catch (error) {
    return error;
  }
}

async function listContacts() {
  try {
    console.table(await getContactsData());
  } catch (error) {
    return error;
  }
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports = { listContacts, getContactById, removeContact, addContact };
