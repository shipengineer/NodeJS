function capitalize(str) {
  if (typeof str !== 'string') {
    try {
      str.toString();
    } catch (error) {
      console.log(error);
    }
  }
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export default { capitalize };
