export const userService = {
    login,
    logout,
    isLogged
};

function login(username, password) {    
    let user = {};
    user.authdata = window.btoa(username + ':' + password);
    localStorage.setItem('user', JSON.stringify(user));
    return user;  
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function isLogged() {
  return localStorage.getItem('user');
}