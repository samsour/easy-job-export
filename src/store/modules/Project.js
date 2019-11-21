export default {
  namespaced: true,
  state: {
    projects: []
  },
  getters: {
    projects: state => state.projects,
    customerProjects: state => customerId => state.projects.filter(project => project.customer == customerId),
    tasks: state => {
      const tasks = [];
      for (const project of state.projects) {
        tasks.push(...project.tasks);
      }
      return tasks;
    },
    projectTasks: state => projectId => state.projects.find(project => project.id == projectId).tasks
  },
  mutations: {
    ADD_PROJECT(state, name) {
      state.projects.push(name);
    },
    ADD_TASK(state, { projectId, task}) {
      const projectIndex = state.projects.findIndex((project => project.id == projectId));
      state.projects[projectIndex].tasks.push(task);
    },
    SET_PROJECT(state, newProject) {
      const projectIndex = state.projects.findIndex((project => project.projectId == newProject.projectId));
      Object.assign(state.projects[projectIndex]);
    },
    REMOVE_TASK(state, { projectId, taskId }) {
      const projectIndex = state.projects.findIndex((project => project.id == projectId));
      state.projects[projectIndex].tasks = state.projects[projectIndex].tasks.filter(task => task.id !== taskId);
    }
  },
  actions: {
    addProject({ commit, state }, project) {
      commit("ADD_PROJECT", project);
    },
    addTask({ commit, state }, task) {
      // copy projectId from task into variable projectId and then copy rest of properties into variable taskWithoutProjectId
      const { projectId, ...taskWithoutProjectId } = task;
      commit("ADD_TASK", { projectId: task.projectId, task: taskWithoutProjectId });
    },
    removeTask({ commit, state }, data) {
      commit("REMOVE_TASK", data);
    }
  }
};
