import { getTasks } from '../api';

const taskService = {
  getAll: async () => {
    const { data } = await getTasks();
    return data;
  },
};

export default taskService;
