const getFloat = (value) => {
  if (typeof value === "string") {
    return parseFloat(parseFloat(value).toFixed(2));
  }
  return parseFloat(value.toFixed(2));
};
export default getFloat;
