export function token() {
    var  token = JSON.parse(localStorage.getItem('Admininfo'));
    return token.token;
  }