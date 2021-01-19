export const required = (value) => {
  return {
    isTrue: value.trim() !== "" && value.trim() !== null,
    msg: value.trim() !== "" && value.trim() !== null ? "" : "Required",
  };
};

export const username = (value) =>{
  const regex =  /^[a-zA-Z0-9]+$/
  return{
    isTrue: regex.test(value),
    msg: regex.test(value) ? "": "Username must be either letters and numbers"
}
}

export const fullname = (value) =>{
  const regex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/
  return{
      isTrue: regex.test(value),
      msg: regex.test(value) ? "": "Enter your Full Name"
  }
}

export const email = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Enter a valid email",
  };
};

export const password = (value) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value)
      ? ""
      : "Password must be 8 characters long and must contain letters and numbers",
  };
};

export const confirmPassword = (cPassword, password) => {
  return {
    isTrue: cPassword === password,
    msg: cPassword === password ? "" : "Password Mismatch",
  };
};

export const checkLength = (value) => {
  return { isTrue: value.length > 1000, msg: value.length > 1000 ? "" : "must be more than 1000 letters"};
};


export const URLChecker = (value) =>{
  const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
  return {isTrue: regex.test(value) || value.trim() === "", msg: regex.test(value)
    ? ""
    : "Must be a valid URL", }
}