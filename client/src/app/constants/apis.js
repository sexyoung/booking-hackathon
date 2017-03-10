const baseURL = process.env.baseApiURL;
export const todosApiURL = () => `${baseURL}todos`;
export const todoApiURL  = () => `${baseURL}todo`;

export default {
  todosApiURL,
  todoApiURL,
};
