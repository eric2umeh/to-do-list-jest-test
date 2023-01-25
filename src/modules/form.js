import LocalStorage from './localStorage.js';

export default class Form {
  constructor(list, domElements) {
    Form.list = list;

    this.addInput = document.querySelector(`#${domElements.newTaskInput}`);
    this.addIcon = document.querySelector(`#${domElements.newTaskIcon}`);
    this.clearButton = document.querySelector(`#${domElements.clearAllCompletedTasks}`);

    this.addInput.addEventListener('keypress', Form.addEvent.bind(this));
    this.addIcon.addEventListener('click', Form.addEvent.bind(this));
    this.clearButton.addEventListener('click', list.clearAllCompleted.bind(list));

    const storedTasks = LocalStorage.loadLocalStorage();

    storedTasks.forEach((task) => {
      Form.list.addTask(task.description, task.completed);
    });
  }

  static list;

  static refreshTasksEvents() {
    Form.list.tasks.forEach((task) => {
      task.domElement.classList.remove('editing');
      task.editing = false;

      task.domElement.addEventListener('dragstart', Form.dragTask.bind(task));
      task.domElement.addEventListener('drop', Form.dropTask.bind(task));
      task.domElement.addEventListener('dragover', Form.allowDropTask.bind(task));

      task.domElement.addEventListener('click', Form.editEvent.bind(task));
      task.domDeleteIcon.addEventListener('click', Form.removeEvent.bind(task));
      task.domCheck.addEventListener('change', Form.toggleCompleted.bind(task));
    });
  }

  static addEvent(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      Form.list.addTask(this.addInput.value);
      this.addInput.value = '';
    }
  }

  static removeEvent() {
    this.editing = false;
    Form.list.removeTask(this.index);
    Form.list.drawTable();
    Form.refreshTasksEvents();
  }

  static toggleCompleted(event) {
    if (event.currentTarget.checked) {
      Form.list.completeTask(this);
    } else {
      Form.list.uncompleteTask(this);
    }
  }

  static editEvent() {
    if (this.editing) {
      return;
    }

    this.domElement.classList.add('editing');
    this.domInput.value = this.domSpan.innerHTML;
    this.domInput.focus();
    this.editing = true;

    this.domInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        Form.list.editTask(this);
      }
    });
  }

  static dragTask(e) {
    e.dataTransfer.setData('index', this.index);
  }

  static allowDropTask(e) {
    e.preventDefault();
  }

  static dropTask(e) {
    e.preventDefault();

    const origin = e.dataTransfer.getData('index');
    const target = this.index;
    Form.list.switchIndexes(origin, target);
  }
}