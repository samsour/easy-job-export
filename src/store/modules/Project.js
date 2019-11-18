export default {
  namespaced: true,
  state: {
    projects: [
      {
        id: "09n34f94",
        customer: "f0923f0",
        exportValue: "ID-undso-2019",
        name: "Metal Homepage",
        tasks: [
          {
            id: "732hd9d8",
            exportValue: 76177,
            name: "Designer"
          },
          {
            id: "fn38qwd9034",
            exportValue: 12345,
            name: "Entwickler"
          }
        ]
      },
      {
        id: "5462cgtvba23",
        customer: "d09r3f0",
        exportValue: "PROJ-2",
        name: "echt langes Projekt",
        tasks: [
          {
            id: "732h5etf9d8",
            exportValue: 11112,
            name: "echt langer Task mit ganz vielen Buchstaben"
          },
          {
            id: "ffffewfdf",
            exportValue: 25252,
            name: "kurzer Task"
          },
          {
            id: "1d1d1f1f1gg",
            exportValue: 123111,
            name: "Ganz normaler Task"
          }
        ]
      },
      {
        id: "jfowntjssi4",
        customer: "jjwer31r",
        exportValue: "PROJECT-2019",
        name: "Ausbildung",
        tasks: [
          {
            id: "73btgsfe8",
            exportValue: 73452,
            name: "Berufsschule"
          },
          {
            id: "45gfdewf",
            exportValue: 90707,
            name: "Berichtsheft"
          }
        ]
      },
      {
        id: "jfowntjssi4",
        customer: "jjwer31r",
        exportValue: "PROJECT-2011",
        name: "Relaunch Bad Website",
        tasks: [
          {
            id: "73btgsfe8",
            exportValue: 73452,
            name: "Senior Developer"
          },
          {
            id: "45gfdewf",
            exportValue: 90707,
            name: "Junior Developer"
          }
        ]
      }
    ]
  },
  getters: {
    projects: state => state.projects,
    tasks: state => {
      const tasks = [];
      for (const project of state.projects) {
        tasks.push(...project.tasks);
      }
      return tasks;
    }
  },
  mutations: {
    ADD_PROJECT(state, name) {
      state.customers.push(name);
    },
    ADD_TASK(state, task) {
      const index = state.projects.findIndex((project => project.id == task.projectId));
      state.projects[index].tasks.push({ id: task.taskId, name: task.name });
    },
    SET_PROJECT(state, newProject) {
      const index = state.projects.findIndex((project => project.projectId == newProject.projectId));
      Object.assign(state.projects[index]);
    },
    SET_TASK(state, { projectId, newTask }) {
      const projectIndex = state.projects.findIndex((project => project.id == projectId));
      const taskIndex = state.projects[projectIndex].tasks.findIndex((task => task.id == newTask.id));
      Object.assign(state.projects[projectIndex].tasks[taskIndex], task);
    }
  },
  actions: {
    addProject({ commit, state }, project) {
      commit("ADD_PROJECT", project);
    },
    addTask({ commit, state }, task) {
      commit("ADD_TASK", task);
    },
  }
};
