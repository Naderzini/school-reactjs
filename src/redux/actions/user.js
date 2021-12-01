import { USER_LOGIN, USER_LOGOUT } from "../types";

export function userLogin(admin) {
  return {
    type: USER_LOGIN,
    payload: admin,
  };
}
export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}