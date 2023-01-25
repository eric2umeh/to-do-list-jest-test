/* eslint-disable no-unused-vars */
import TodoList from './modules/todoList.js';
import Form from './modules/form.js';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

window.onload = () => {
  const myList = new TodoList('ul');

  const myForms = new Form(myList, {
    newTaskInput: 'taskInput',
    newTaskIcon: 'taskIcon',
    clearAllCompletedTasks: 'clearCompleted',
  });
};