export function ValidateOnlyContainsLetters(value, errorMessage) {
  if (value.match(/^[a-zA-Z]+$/)) {
    return true;
  }
  this.setState({
    errorMessage,
    errorSnackbarOpen: true,
  });
  return false;
}

// Checks a an array to see if it contains an attribute with the given value, will throw an error snackbar if it does.
export function ValidateUniqueValue(arr, attr, value, errorMessage) {
  let contains = false;
  if (arr.some(e => e[attr].toLowerCase() === value.toLowerCase())) {
    /* vendors contains the element we're looking for */
    contains = true;
  }
  
  if (!contains) {
    return true;
  }
  this.setState({
    errorMessage,
    errorSnackbarOpen: true,
  });
  return false;
}

export function ValidateUrl(value, errorMessage) {
  if (value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
    return true;
  }
  this.setState({
    errorMessage,
    errorSnackbarOpen: true,
  });
  return false;
}

export function ValidateIsNotNullOrEmpty(value, errorMessage) {
  if (value !== undefined && value.length > 0) {
    return true;
  }
  this.setState({
    errorMessage,
    errorSnackbarOpen: true,
  });
  return false;
}
