import axios from 'axios';
import BaseUrl from '../../Config/BaseUrl';
import { AdminToken,MentorToken,EnterpricessToken,CampusToken,StudentToken } from '../../features/Token';

export const authFetch = axios.create({
  baseURL: BaseUrl.url,
  headers: {
    'Authorization':`Bearer ${AdminToken()}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export const authFetchMentor = axios.create({
  baseURL: BaseUrl.url,
  headers: {
    'Authorization':`Bearer ${MentorToken()}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export const authFetchEnterpricess = axios.create({
  baseURL: BaseUrl.url,
  headers: {
    'Authorization':`Bearer ${EnterpricessToken()}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export const authFetchCampus = axios.create({
  baseURL: BaseUrl.url,
  headers: {
    'Authorization':`Bearer ${CampusToken()}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export const authFetchStudent = axios.create({
  baseURL: BaseUrl.url,
  headers: {
    'Authorization':`Bearer ${StudentToken()}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    // "Content-Type": "multipart/form-data"
  },
});