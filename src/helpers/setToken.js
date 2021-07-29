const setToken = (token) => {
  console.log(`saving token ${token}`);
  const tkn = localStorage.setItem("token", token);
  return tkn;
};
export default setToken;
