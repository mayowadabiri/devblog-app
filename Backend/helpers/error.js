exports.errors = (msg, code) => {
  const error = {
    msg,
    code,
  };
  code !== 500 ? (error.name = "Error") : (error.name = "Server");
  return error;
};
