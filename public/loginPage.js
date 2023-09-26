'use strict';

const userFormObject = new UserForm();

userFormObject.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
    console.log(response); // проверяем, какой объект возвращает сервер
    // проверяем успешность запроса
    if(response.success === true) {
      location.reload();
    } else {
      setLoginErrorMessage(message);
    };
  });
};
registerFormCallback.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
      console.log(response); // проверяем, какой объект возвращает сервер
      // проверяем успешность запроса
      if(response.success === true) {
        location.reload();
      } else {
        setRegisterErrorMessage(message);
      };
    });
  };


