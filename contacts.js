const fs = require("fs").promises;
const path = require("path");
const ShortUniqueId = require("short-unique-id");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");
const uid = new ShortUniqueId({ length: 3, dictionary: "number" });

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
    if (isNaN(contactId)) return console.log("Enter the number!".red);

    const contacts = await getContactsData();

    const contactById = contacts.filter(
      (contact) => contact.id === contactId.toString()
    );

    if (!contactById.length)
      return console.log(`We found no contact with ID ${contactId} `.bgRed);

    console.log("We found your contact!".bgGreen);
    console.table(contactById);
  } catch (error) {
    return error;
  }
}

async function removeContact(contactId) {
  try {
    if (isNaN(contactId)) return console.log("Enter the number!".red);

    const contacts = await getContactsData();

    const removeContactById = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );

    if (removeContactById.length === contacts.length)
      return console.log(`We found no contact with ID ${contactId} `.bgRed);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(removeContactById),
      "utf-8"
    );

    console.log("Contact was deleted!".green);
  } catch (error) {
    return error;
  }
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone)
    return console.log("Please enter all fields!".red);

  const contacts = await getContactsData();

  const newContactsData = [
    ...contacts,
    {
      id: uid(),
      name,
      email,
      phone,
    },
  ];

  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContactsData), "utf-8");

    console.log("Contact was added!".green);

    listContacts();
  } catch (error) {
    return error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
