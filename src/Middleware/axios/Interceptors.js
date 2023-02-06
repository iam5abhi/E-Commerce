import { authFetch,authFetchMentor,authFetchEnterprises,authFetchCampus,authFetchStudent } from './intance';

authFetch.interceptors.request.use((request) => {
    console.log(request,'request sent');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use((response) => {
    console.log(response,'got response');
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 404) {
      // do something
      console.log('NOT FOUND');
    }
    return Promise.reject(error);
  }
);

authFetchMentor.interceptors.request.use((request) => {
  console.log(request,'request sent');
  return request;
},
(error) => {
  return Promise.reject(error);
}
);

authFetchMentor.interceptors.response.use((response) => {
  console.log(response,'got response');
  return response;
},
(error) => {
  console.log(error.response);
  if (error.response.status === 404) {
    // do something
    console.log('NOT FOUND');
  }
  return Promise.reject(error);
}
);

authFetchEnterprises.interceptors.request.use((request) => {
  console.log(request,'request sent');
  return request;
},
(error) => {
  return Promise.reject(error);
}
);

authFetchEnterprises.interceptors.response.use((response) => {
  console.log(response,'got response');
  return response;
},
(error) => {
  console.log(error.response);
  if (error.response.status === 404) {
    // do something
    console.log('NOT FOUND');
  }
  return Promise.reject(error);
}
);

authFetchStudent.interceptors.request.use((request) => {
  console.log(request,'request sent');
  return request;
},
(error) => {
  return Promise.reject(error);
}
);

authFetchStudent.interceptors.response.use((response) => {
  console.log(response,'got response');
  return response;
},
(error) => {
  console.log(error.response);
  if (error.response.status === 404) {
    // do something
    console.log('NOT FOUND');
  }
  return Promise.reject(error);
}
);

export {authFetch,authFetchMentor,authFetchEnterprises,authFetchStudent}

