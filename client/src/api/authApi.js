import * as Api from "./Api";

export const login = (data) => {
  const url = "/auth/signin";
  return PostRequest(url, data);
};

export const signup = (data) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: "/auth/signup",
      data: data,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject(err);
        console.log("api error", err);
      },
    };
    Api.signUp(obj.url, obj.data, obj.onSuccess, obj.onError);
  });
};

export const PostRequest = (url, data) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: url,
      data: data,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject(err);
        console.log("api error", err);
      },
    };
    Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);
  });
};
