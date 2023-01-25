import Task from './task.js';
import Form from './form.js';
import LocalStorage from './localStorage.js';

export default class TodoList {
  constructor(selector) {
    this.domList = document.querySelector(selector);
    this.tasks = [];
  }

  addTask(description, completed = false) {
    const newIndex = this.tasks.length + 1;
    const newTask = new Task(description, completed, newIndex);
    this.tasks.push(newTask);
    this.drawTable();
    Form.refreshTasksEvents();
    LocalStorage.saveToLocalStorage(this.tasks);
  }

  removeTask(indexToRemove) {
    this.tasks.splice(indexToRemove - 1, 1);
    this.resetIndex();

    LocalStorage.saveToLocalStorage(this.tasks);
  }

  editTask(task) {
    if (task.domInput.value) {
      task.description = task.domInput.value;
      task.domSpan.innerHTML = task.description;
      task.domInput.value = '';
    }

    task.domElement.classList.remove('editing');
    task.editing = false;
    LocalStorage.saveToLocalStorage(this.tasks);
  }

  completeTask(task) {
    task.completed = true;
    this.drawTable();
    Form.refreshTasksEvents();
    LocalStorage.saveToLocalStorage(this.tasks);
  }

  uncompleteTask(task) {
    task.completed = false;
    this.drawTable();
    Form.refreshTasksEvents();
    LocalStorage.saveToLocalStorage(this.tasks);
  }

  clearAllCompleted() {
    this.tasks = this.tasks.filter((task) => !task.completed);

    this.resetIndex();

    this.drawTable();
    Form.refreshTasksEvents();
    LocalStorage.saveToLocalStorage(this.tasks);
  }

  resetIndex() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  drawTable() {
    this.domList.innerHTML = '';
    this.tasks.forEach((task) => {
      const domTask = task.draw();
      this.domList.appendChild(domTask);
    });
  }

  switchIndexes(index1, index2) {
    const from = index1 - 1;
    const to = index2 - 1;

    const element = this.tasks.splice(from, 1)[0];
    this.tasks.splice(to, 0, element);
    this.resetIndex();

    this.drawTable();
    Form.refreshTasksEvents();
    LocalStorage.saveToLocalStorage(this.tasks);
  }
}