export default class Tasks {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.editing = false;
  }

  draw() {
    this.domElement = document.createElement('li');
    this.domElement.classList.add('all');
    this.domElement.setAttribute('draggable', 'true');

    this.domCheck = document.createElement('input');
    this.domCheck.setAttribute('type', 'checkbox');
    this.domCheck.checked = this.completed;

    this.domSpan = document.createElement('span');
    this.domSpan.classList.add('descriptions');
    this.domSpan.innerHTML = this.description;

    if (this.completed) {
      this.domSpan.classList.add('completed');
    }

    this.domInput = document.createElement('input');
    this.domInput.type = 'text';

    this.domIcon = document.createElement('span');
    this.domIcon.classList.add('icon', 'moveIcon');
    this.domIcon.innerHTML = '<i class="fa-solid fa-ellipsis-vertical">';

    this.domDeleteIcon = document.createElement('span');
    this.domDeleteIcon.classList.add('icon', 'deleteIcon');
    this.domDeleteIcon.innerHTML = '<i class="fa-regular fa-trash-can">';

    this.domElement.appendChild(this.domCheck);
    this.domElement.appendChild(this.domSpan);
    this.domElement.appendChild(this.domInput);
    this.domElement.appendChild(this.domIcon);
    this.domElement.appendChild(this.domDeleteIcon);

    return this.domElement;
  }
}