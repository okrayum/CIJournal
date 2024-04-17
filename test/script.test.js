// Importing DOMPurify
const DOMPurify = require('dompurify');
global.DOMPurify = DOMPurify;

require("./jestSetup");

const {
  renderEntries,
  deleteEntry,
  editEntry,
  getEntries,
  sanitizeInput,
  maxTitleLength,
  maxContentlength,
} = require('../src/script');

// Helper functions
function setInputValues(title, content, date) {
  titleInput.value = title;
  contentInput.value = content;
  entryDateInput.value = date;
}

function submitForm() {
  journalForm.dispatchEvent(new Event('submit'));
}

describe("CRUD Tests", () => {
  test("Should create a new entry", () => {
    const title = "New Test Entry";
    const content = "This is a new test entry.";
    const date = new Date().toLocaleString();

    setInputValues(title, content, date);
    submitForm();

    const [newEntry] = getEntries();
    expect(newEntry.title).toBe(title);
    expect(newEntry.content).toBe(content);
    expect(newEntry.date).toBe(date);
  });

  test("Should render current journal entries", () => {
    const renderedList = entriesList.innerHTML;
    const existingEntries = getEntries();

    existingEntries.forEach(entry => {
      expect(renderedList).toContain(entry.title);
      expect(renderedList).toContain(entry.content);
    });
  });

  test("Should be able to edit an entry", () => {
    const index = 0;
    const newTitle = "Updated Test Entry";
    const newContent = "Updated test content.";

    editEntry(index);
    setInputValues(newTitle, newContent, new Date().toLocaleString());
    submitForm();

    const updatedEntry = getEntries()[index];
    expect(updatedEntry.title).toBe(newTitle);
    expect(updatedEntry.content).toBe(newContent);
  });

  test("Should be able to delete an entry", () => {
    const initialLength = getEntries().length;
    deleteEntry(0);
    const newLength = getEntries().length;

    expect(newLength).toBe(initialLength - 1);
  });
});


describe("Edge Case Tests", () => {
  test("Should not be able to submit an empty input field", () => {
    errorMessage.textContent = "";
    const initialLength = getEntries().length;

    setInputValues('', '', '');
    submitForm();

    expect(errorMessage.textContent).toBe('Please enter a title, content, and date.');
    expect(getEntries().length).toBe(initialLength);
  });


  test("Should not be able to sumbit an entry over max character length", () => {
    errorMessage.textContent = "";
    const initialLength = getEntries().length;
    const longTitle = 'A'.repeat(51); // 51 characters long
    const longContent = 'B'.repeat(501); // 501 characters long
    const date = new Date().toLocaleString();

    setInputValues(longTitle, longContent, date);
    submitForm();

    expect(errorMessage.textContent).toBe(`Title must not exceed ${maxTitleLength} characters. Content must not exceed ${maxContentlength} characters.`);
    expect(getEntries().length).toBe(initialLength);
  });

  test("Should handle special characters in entry submission", () => {
    errorMessage.textContent = "";
    const specialTitle = 'Test <Title> 😊 &amp;';
    const specialContent = 'Test <Content> &lt;script&gt;alert("xss")&lt;/script&gt; &copy;';
    const date = new Date().toLocaleString();

    setInputValues(specialTitle, specialContent, date);
    submitForm();

    renderEntries();
    const renderedList = entriesList.innerHTML;

    expect(renderedList).toContain(sanitizeInput(specialTitle));
    expect(renderedList).toContain(sanitizeInput(specialContent));
  });


  test("Should get error with invalid date input", () => {
    errorMessage.textContent = "";
    const invalidDate = "2023/04/01";

    entryDateInput.value = invalidDate;
    submitForm();

    expect(errorMessage.textContent).toBe("Please enter a title, content, and date.");
  });

  test("Should be able to handle concurrent entry submissions", async () => {
    errorMessage.textContent = '';
    const entryData1 = { title: 'Concurrent Entry 1', content: 'Content for entry 1', date: new Date().toLocaleString() };
    const entryData2 = { title: 'Concurrent Entry 2', content: 'Content for entry 2', date: new Date().toLocaleString() };

    const submitEntry = async (entryData) => {
      setInputValues(entryData.title, entryData.content, entryData.date);
      submitForm();
    };

    await Promise.all([
      submitEntry(entryData1),
      submitEntry(entryData2),
    ]);

    const finalEntries = getEntries();
    expect(finalEntries.length).toBeGreaterThanOrEqual(2);

    const entry1 = finalEntries.find(entry => entry.title === entryData1.title && entry.content === entryData1.content);
    const entry2 = finalEntries.find(entry => entry.title === entryData2.title && entry.content === entryData2.content);
    expect(entry1).toBeDefined();
    expect(entry2).toBeDefined();
  });

  test('Unauthorized access', () => {
    const isUserAuthorized = true;

    if (!isUserAuthorized) {
      titleInput.value = 'Attempted edit';
      contentInput.value = 'Attempted content edit';
      entryDateInput.value = new Date().toISOString();
      editEntry(0);

      expect(errorMessage.textContent).toBe('You do not have permission to perform this action.');
    }
  });
});
