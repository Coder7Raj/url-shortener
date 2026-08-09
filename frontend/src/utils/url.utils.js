export const cleanUrlPayload = (data) => {
  const payload = {
    ...data,
  };

  Object.keys(payload).forEach((key) => {
    if (payload[key] === "" || payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
};
