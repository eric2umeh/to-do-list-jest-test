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
        <input id="taskInput" placeholder="Add task to your list...." type="text"> 
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

const testsEventStorage = new Map();

let testsEventOutput = 0;

const testsEvent = {
  dataTransfer: {
    setData: (key, value) => testsEventStorage.set(key, value),
    getData: (key) => testsEventStorage.get(key),
  },
  preventDefault: () => {
    testsEventOutput = 1;
  },
};

describe('Optional requirements', () => {
  test('Add event must create new task', () => {
    const event = { key: 'Enter', type: 'click' };

    Form.addInput = { value: 'this is a test' };
    Form.addEvent(event);

    expect(Form.list.tasks).toHaveLength(1);
  });

  test('Remove event must remove task', () => {
    Form.index = 1;
    Form.removeEvent();

    expect(Form.list.tasks).toHaveLength(0);
  });

  test('toggleCompleted event must change task complete status', () => {
    const event = { key: 'Enter', type: 'click' };

    Form.addInput = { value: 'this is a test' };
    Form.addEvent(event);

    const toggleEvent = { currentTarget: { checked: true } };

    Form.list.tasks[0].completed = true;

    Form.toggleCompleted(toggleEvent);

    expect(Form.list.tasks[0].domCheck.checked).toBe(true);
  });

  test('toggleCompleted event must change task complete status', () => {
    const event = { key: 'Enter', type: 'click' };

    Form.addInput = { value: 'this is a test 2' };
    Form.addEvent(event);

    const toggleEvent = { currentTarget: { checked: false } };

    Form.list.tasks[0].completed = false;

    Form.toggleCompleted(toggleEvent);

    expect(Form.list.tasks[0].domCheck.checked).toBe(false);
  });

  test('edit event must add .editing css class', () => {
    Form.editing = false;
    Form.domElement = Form.list.tasks[0].domElement;
    Form.domInput = Form.list.tasks[0].domInput;
    Form.domSpan = Form.list.tasks[0].domSpan;

    Form.editEvent();

    expect(Form.editing).toBe(true);
    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(
      true,
    );
  });

  test('edit event must do nothing when already editing', () => {
    Form.editing = true;

    Form.editEvent();

    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(
      true,
    );
  });

  test('dragTask must set index value', () => {
    Form.dragTask(testsEvent);

    expect(testsEvent.dataTransfer.getData('index')).toBe(1);
  });

  test('allowDropTask must prevent Default behavior', () => {
    Form.allowDropTask(testsEvent);
    expect(testsEventOutput).toBe(1);
  });

  test('dropTask must switch item index', () => {
    Form.index = 2;
    Form.dropTask(testsEvent);
    expect(Form.list.tasks[0].description).toBe('this is a test 2');
    expect(Form.list.tasks[1].description).toBe('this is a test');
  });

  test('keypress enter event on task must remove editing css class', () => {
    Form.editing = false;
    Form.domElement = Form.list.tasks[0].domElement;
    Form.domInput = Form.list.tasks[0].domInput;
    Form.domSpan = Form.list.tasks[0].domSpan;

    Form.editEvent();

    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(
      true,
    );
    Form.list.tasks[0].domInput.dispatchEvent(
      new KeyboardEvent('keypress', { key: 'Enter' }),
    );
    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(
      false,
    );
  });
});
