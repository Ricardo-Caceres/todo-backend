// create a string unique id with date.now string for each user:

const createId = () => {
  const ramdom =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const id = ramdom + Date.now().toString(36);
  return id;
};

export default createId;
