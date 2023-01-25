/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */
import TodoList from '../modules/todoList.js';
import Form from '../modules/form.js';

document.body.innerHTML = `
    <div> 
        <ul id="test-list"></ul> 
    </div>
    <div class="all"> 
        <input id="new_task_input" placeholder="Add to your list..." type="text"> 
        <i id="new_task_icon" class="fa-solid fa-arrow-turn-down fa-rotate-90 fa-2xs"></i>
    </div>
    <button class="all" id="clear_all_completed_tasks">
        <span>Clear all completed</span>
    </button>
  `;

const myList = new TodoList('#test-list');

const myForm = new Form(myList, {
  newTaskInput: 'new_task_input',
  newTaskIcon: 'new_task_icon',
  clearAllCompletedTasks: 'clear_all_completed_tasks',
});

describe('Testing To Do list: part 1', () => {
  test('Add one new item to the list', () => {
    myList.addTask('Test description');
    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(1);
  });

  test('Remove one item to the list', () => {
    myList.removeTask(1);
    myList.drawTable();

    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(0);
  });
});
