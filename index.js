let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const template = document.querySelector('#to-do__item-template');

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks');

	if (savedTasks) {
		return JSON.parse(savedTasks);
	}

	return items;
}


function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	// const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const clone = template.content.cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	// 🗑 Delete task
	deleteButton.addEventListener('click', () => {
		clone.querySelector('.to-do__item').remove();

		const items = getTasksFromDOM();
		saveTasks(items);
	});

	// 📄 Duplicate task
	duplicateButton.addEventListener('click', () => {
		const itemName = textElement.textContent;

		const newItem = createItem(itemName);
		listElement.prepend(newItem);

		const items = getTasksFromDOM();
		saveTasks(items);
	});

	// ✏️ Edit task (extra task)
	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', 'false');

		const items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;

}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];

	itemsNamesElements.forEach((element) => {
		tasks.push(element.textContent);
	});

	return tasks;
}


function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

formElement.addEventListener('submit', (event) => {
	event.preventDefault();

	const item = inputElement.value.trim();
	if (!item) return;

	const taskElement = createItem(item);
	listElement.prepend(taskElement);

	inputElement.value = '';

	items = getTasksFromDOM();
	saveTasks(items);
});



items = loadTasks();

items.forEach((item) => {
	const taskElement = createItem(item);
	listElement.append(taskElement);
});


