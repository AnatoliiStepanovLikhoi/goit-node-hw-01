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

async function getContactById(contactId) {
  try {
    const contacts = await getContactsData();

    const contactById = contacts.filter(
      (contact) => contact.id === contactId.toString()
    );

    // console.log(contactById);

    if (!contactById.length)
      return console.log(`We found no contact with ID ${contactId} `);

    console.table(contactById);
  } catch (error) {
    return error;
  }
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports = { listContacts, getContactById, removeContact, addContact };
