export const getToken = () => {
  localStorage.getItem('token');
};

export const setToken = () => {
  localStorage.setItem('token');
};

export const signOut = (onLogoutSuccess) => {
  if (window.gapi) {
    const auth2 = window.gapi.auth2.getAuthInstance()
    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect().then(onLogoutSuccess))
    }
  }
}