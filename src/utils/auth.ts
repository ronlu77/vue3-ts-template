export function SET_TOKEN(token) {
  return localStorage.setItem('USER_TOKEN', token)
}

export function GET_TOKEN() {
  return localStorage.getItem('USER_TOKEN')
}

export function REMOVE_TOKEN() {
  localStorage.removeItem('USER_TOKEN')
}
