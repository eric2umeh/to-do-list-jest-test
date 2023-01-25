/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */
import TodoList from '../modules/todoList.js';
import Form from '../modules/form.js';

document.body.innerHTML = `
    <div> 
        <ul id="testList"></ul> 
    </div>
    <div class="all"> 
        <input id="taskInput" placeholder="Add to your list..." type="text"> 
        <i id="taskIcon" class="fa-solid fa-arrow-turn-down fa-rotate-90 fa-2xs"></i>
    </div>
    <button class="all" id="clearCompleted">
        <span>Clear all completed</span>
    </button>
  `;

const myList = new TodoList('#testList');

const myForms = new Form(myList, {
  newTaskInput: 'taskInput',
  newTaskIcon: 'taskIcon',
  clearAllCompletedTasks: 'clearCompleted',
});

describe('Testing To-do list: add-remove', () => {
  test('Add a new item to the list', () => {
    myList.addTask('Test description');
    const list = document.querySelectorAll('#testList li');
    expect(list).toHaveLength(1);
  });

  test('Remove an item from the list', () => {
    myList.removeTask(1);
    myList.drawTable();

    const list = document.querySelectorAll('#testList li');
    expect(list).toHaveLength(0);
  });
});
