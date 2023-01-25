/* eslint-disable no-unused-vars */
import TodoList from './modules/todoList.js';
import Form from './modules/form.js';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

window.onload = () => {
  const myList = new TodoList('ul');

  const myForm = new Form(myList, {
    newTaskInput: 'new_task_input',
    newTaskIcon: 'new_task_icon',
    clearAllCompletedTasks: 'clear_all_completed_tasks',
  });
};