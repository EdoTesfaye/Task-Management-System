//start sing up and login form 
function setFormMessage(formElement, type, message) {
	const messageElement = formElement.querySelector(".form__message");

	messageElement.textContent = message;
	messageElement.classList.remove("form__message--success", "form__message--error");
	messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
	inputElement.classList.add("form__input--error");
	inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
	inputElement.classList.remove("form__input--error");
	inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.querySelector("#login");
	const createAccountForm = document.querySelector("#createAccount");

	document.querySelector("#linkCreateAccount").addEventListener("click", e => {
			e.preventDefault();
			loginForm.classList.add("form--hidden");
			createAccountForm.classList.remove("form--hidden");
	});

	document.querySelector("#linkLogin").addEventListener("click", e => {
			e.preventDefault();
			loginForm.classList.remove("form--hidden");
			createAccountForm.classList.add("form--hidden");
	});

	loginForm.addEventListener("submit", e => {
			e.preventDefault();

		

			setFormMessage(loginForm, "error", "Invalid username/password combination");
	});

	document.querySelectorAll(".form__input").forEach(inputElement => {
			inputElement.addEventListener("blur", e => {
					if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
							setInputError(inputElement, "Username must be at least 10 characters in length");
					}
			});

			inputElement.addEventListener("input", e => {
					clearInputError(inputElement);
			});
	});
});
const continueBtn = document.getElementById("continue-btn");

continueBtn.addEventListener("click", function() {
  window.location.href = "taskmang.html";
});

//End of sign up and login form 

window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}