export default class LocalStorage {
  static saveToLocalStorage(list) {
    localStorage.setItem('todo-list-tasks', JSON.stringify(list));
  }

  static loadLocalStorage() {
    const stringTaskList = localStorage.getItem('todo-list-tasks');

    if (stringTaskList) {
      const parsedTaskList = JSON.parse(stringTaskList);
      if (Array.isArray(parsedTaskList)) {
        return parsedTaskList;
      }
    }

    return [];
  }
}