import { getTasksApi } from '../api';

const taskService = {
  getAll: async () => {
    const { data } = await getTasksApi();
    return data;
  },
};

export default taskService;
