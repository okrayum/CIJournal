// Get DOM elements
const journalForm = document.getElementById("journalForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const entryDateInput = document.getElementById("entryDate");
const entriesList = document.getElementById("entriesList");
const errorMessage = document.getElementById("errorMessage");

const maxTitleLength = 50;
const maxContentlength = 500;

// array to hold journal entries
let entries = [
  {
    id: "1T",
    title: 'Second Entry',
    content: 'This is the second entry in the journal.',
    date: new Date().toLocaleString(),
  },
  {
    id: "0T",
    title: 'First Entry',
    content: 'This is the first entry in the journal.',
    date: new Date().toLocaleString(),
  },
];

// helper function to get entried
function getEntries() {
  return entries;
}

// function to render journal entries
function renderEntries() {
  entriesList.innerHTML = "";

  entries.forEach((entry, index) => {
      const li = document.createElement("li");
      const date = new Date(entry.date).toLocaleString();

      li.innerHTML =`
          <h3>${entry.title}</h3>
          <p>${entry.content}</p>
          <p>Date: ${date}</p>
          <button onclick="deleteEntry(${index})">Delete</button>
          <button onclick="editEntry(${index})">Edit</button>
      `;

      entriesList.appendChild(li);
  });
}

// Using DOMPurify to sanitize input
function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}

// Function to handle form submission
journalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const title = sanitizeInput(titleInput.value.trim());
    const content = sanitizeInput(contentInput.value.trim());
    const entryDate = entryDateInput.value;

    if (!title || !content || !entryDate) {
      throw new Error("Please enter a title, content, and date.");
    }

    if (title.length > maxTitleLength || content.length > maxContentlength) {
      throw new Error(`Title must not exceed ${maxTitleLength} characters. Content must not exceed ${maxContentlength} characters.`);
    }

    errorMessage.textContent = "";

    if (indexToEdit !== -1) {
      entries[indexToEdit].title = title;
      entries[indexToEdit].content = content;
      entries[indexToEdit].date = entryDate;

      indexToEdit = -1;
      titleInput.value = "";
      contentInput.value = "";
      entryDateInput.value = "";

      renderEntries();
    } else {
      const newEntry = {
        id: entries.length + 1,
        title,
        content,
        date: entryDate,
      };
      entries.unshift(newEntry);

      // Reset the form fields
      titleInput.value = "";
      contentInput.value = "";
      entryDateInput.value = "";

      renderEntries();
    }
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});

// to delete an entry
function deleteEntry(index) {
  if (index < 0 || index >= entries.length) {
    errorMessage.textContent = "Entry not found.";
    return;
  }
  errorMessage.textContent = "";
  entries.splice(index, 1);
  renderEntries();
}

function isUserAuthorized() {
  return true;
}

let indexToEdit = -1;

// edit an entry
function editEntry(index) {
  // Check if the user is authorized
  if (!isUserAuthorized()) {
    errorMessage.textContent = "You do not have permission to perform this action.";
    return;
  }

  if (index < 0 || index >= entries.length) {
    errorMessage.textContent = "Entry not found.";
    return;
  }
  errorMessage.textContent = "";

  indexToEdit = index;

  const entry = entries[index];

  titleInput.value = entry.title;
  contentInput.value = entry.content;
  entryDateInput.value = entry.date;
}

renderEntries();

module.exports = {
  renderEntries,
  deleteEntry,
  editEntry,
  maxTitleLength,
  maxContentlength,
  sanitizeInput,
  isUserAuthorized,
  getEntries,
};
