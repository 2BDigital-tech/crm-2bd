class ApiService {
  static query(method, api, body, token = "") {
    let params = {
      method,
    };

    if (body) {
      if (method === "get") {
        api += "?" + UtilService.objectToUrl(body);
      } else {
        params.body = JSON.stringify(body);
      }
    }
    if (token !== "") {
      params.headers = {
        "Content-Type": "application/json",
        token: token,
      };
    } else {
      params.headers = {
        "Content-Type": "application/json",
      };
    }

    return (
      fetch(`${process.env.REACT_APP_API_BASE_URL}${api}`, params)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((res) => {
          return res.json();
        })
        // .then(data => {
        //   return data;
        // })
        .catch((error) => {
          if (error instanceof TypeError) {
            throw new errorHandler(
              "E_CONNECTION_FAILED",
              500,
              "API connection error",
              error
            );
          } else {
            return error.json().then((message) => {
              if (message.status === 403) {
                AuthService.logOut();
                window.location.reload(false);
              }
              // if(message.status === 500) {}
              throw new errorHandler(
                message.code,
                error.status,
                message.message,
                message.data
              );
            });
          }
        })
    );
  }

  static post(api, body, token = "") {
    return ApiService.query("POST", api, body, token);
  }
  static put(api, body, token = "") {
    return ApiService.query("PUT", api, body, token);
  }

  static delete(api, body, token = "") {
    return ApiService.query("DELETE", api, body, token);
  }

  static get(api, body, token = "") {
    return ApiService.query("GET", api, body, token);
  }
}

export default ApiService;
