import axios from "axios";
import {
  ADD_ADMIN,
  GET_ADMINS,
  DELETE_ADMIN,
  UPDATE_ADMIN,
  ADD_CHILD,
  GET_ALL_CHILDRENS,
  DELETE_CHILD,
  UPDATE_CHILD,
  ADD_PARENT,
  GET_PRENTS,
  DELETE_PARENT,
  UPDATE_PARENT,
  ADD_TEACHER,
  GET_TEACHERS,
  DELETE_TEACHER,
  GET_CLAIMS,
  GET_SUBJECTS,
  DELETE_SUBJECT,
  ADD_SUBJECT,
  ADD_CLASSE,
  GET_CLASSES,
  DELETE_CLASSE,
  ADD_EVENT,
  GET_EVENTS,
  DELETE_EVENT,
  ADMINS_NUMBER,
  PARENTS_NUMBER,
  CHILDRENS_NUMBER,
  TEACHERS_NUMBER,
  PARENTS_MEN_NUMBER,
  PARENTS_WOMEN_NUMBER,
  TEACHER_MEN_NUMBER,
  TEACHER_WOMEN_NUMBER,
} from "../Constants";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const AuthorizationToken = "Bearer " + localStorage.getItem("token");

// Admins Routes
const addAdmin = (object) =>
  axiosInstance.post(`${ADD_ADMIN}`, object, {
    headers: { 
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken},
  });
const getAllAdmins = (nbPage) =>
  axiosInstance.get(`${GET_ADMINS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteAdmin = (id) =>
  axiosInstance.delete(`${DELETE_ADMIN}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
const updateAdmin = (id, object) =>
  axiosInstance.post(`${UPDATE_ADMIN}${id}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
// Childrens Routes
const addChildren = (object) =>
  axiosInstance.post(`${ADD_CHILD}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
const getAllChildrens = (nbPage) =>
  axiosInstance.get(`${GET_ALL_CHILDRENS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteChildren = (id) =>
  axiosInstance.delete(`${DELETE_CHILD}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
const updateChildren = (id, object) =>
  axiosInstance.post(`${UPDATE_CHILD}${id}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
// Parents Routes
const addParent = (object) =>
  axiosInstance.post(`${ADD_PARENT}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
const getAllParents = (nbPage) =>
  axiosInstance.get(`${GET_PRENTS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteParent = (id) =>
  axiosInstance.delete(`${DELETE_PARENT}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
const updateParent = (id, object) =>
  axiosInstance.post(`${UPDATE_PARENT}${id}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
// Teachers Routes
const addTeacher = (object) =>
  axiosInstance.post(`${ADD_TEACHER}`, object, {
    headers: {
      Authorization: AuthorizationToken,
    },
  });
const getAllTeachers = (nbPage) =>
  axiosInstance.get(`${GET_TEACHERS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteTeachers = (id) =>
  axiosInstance.delete(`${DELETE_TEACHER}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
// Claims Routes
const getAllClaims = (nbPage) =>
  axiosInstance.get(`${GET_CLAIMS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
// Subject Routes
const addSubject = (object) =>
  axiosInstance.post(`${ADD_SUBJECT}`, object, {
    headers: {
      Authorization: AuthorizationToken,
    },
  });
const getAllSubjects = (nbPage) =>
  axiosInstance.get(`${GET_SUBJECTS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteSubject = (id) =>
  axiosInstance.delete(`${DELETE_SUBJECT}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
//Classes Routes
const addClasse = (object) =>
  axiosInstance.post(`${ADD_CLASSE}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
const getAllClasses = (nbPage) =>
  axiosInstance.get(`${GET_CLASSES}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteClasse = (id) =>
  axiosInstance.delete(`${DELETE_CLASSE}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
// Events Routes
const addEvent = (object) =>
  axiosInstance.post(`${ADD_EVENT}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: AuthorizationToken,
    },
  });
const getAllEvents = (nbPage) =>
  axiosInstance.get(`${GET_EVENTS}?page=${nbPage}`, {
    headers: { Authorization: AuthorizationToken },
  });
const deleteEvent = (id) =>
  axiosInstance.delete(`${DELETE_EVENT}${id}`, {
    headers: { Authorization: AuthorizationToken },
  });
//Dashboard statics Routes
const getAdminsNumber = () =>
  axiosInstance.get(`${ADMINS_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getParentsNumber = () =>
  axiosInstance.get(`${PARENTS_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getChildrensNumber = () =>
  axiosInstance.get(`${CHILDRENS_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getTeachersNumber = () =>
  axiosInstance.get(`${TEACHERS_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getParentsMen = () =>
  axiosInstance.get(`${PARENTS_MEN_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getParentsWomen = () =>
  axiosInstance.get(`${PARENTS_WOMEN_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getTeachersMen = () =>
  axiosInstance.get(`${TEACHER_MEN_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
const getTeachersWomen = () =>
  axiosInstance.get(`${TEACHER_WOMEN_NUMBER}`, {
    headers: { Authorization: AuthorizationToken },
  });
export {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
  addChildren,
  getAllChildrens,
  deleteChildren,
  updateChildren,
  addParent,
  getAllParents,
  deleteParent,
  updateParent,
  addTeacher,
  getAllTeachers,
  deleteTeachers,
  getAllClaims,
  addSubject,
  getAllSubjects,
  deleteSubject,
  addClasse,
  getAllClasses,
  deleteClasse,
  addEvent,
  getAllEvents,
  deleteEvent,
  getAdminsNumber,
  getParentsNumber,
  getChildrensNumber,
  getTeachersNumber,
  getParentsMen,
  getParentsWomen,
  getTeachersMen,
  getTeachersWomen,
};
