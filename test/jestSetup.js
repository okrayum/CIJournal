// jestSetup.js

// Set up DOM elements for testing
global.journalForm = document.createElement('form');
global.journalForm.id = 'journalForm';
document.body.appendChild(global.journalForm);

global.titleInput = document.createElement('input');
global.titleInput.id = 'title';
document.body.appendChild(global.titleInput);

global.contentInput = document.createElement('textarea');
global.contentInput.id = 'content';
document.body.appendChild(global.contentInput);

global.entryDateInput = document.createElement('input');
global.entryDateInput.id = 'entryDate';
document.body.appendChild(global.entryDateInput);

global.entriesList = document.createElement('ul');
global.entriesList.id = 'entriesList';
document.body.appendChild(global.entriesList);

global.errorMessage = document.createElement('div');
global.errorMessage.id = 'errorMessage';
document.body.appendChild(global.errorMessage);
