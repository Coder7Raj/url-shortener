export const unwrapResponse = (response) => {
  return response.data.data;
};

export const unwrapMessage = (response) => {
  return response.data.message;
};
