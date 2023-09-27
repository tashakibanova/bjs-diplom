'use strict';

const userFormObject = new UserForm();

userFormObject.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
    console.log(response); // проверяем, какой объект возвращает сервер
    // проверяем успешность запроса
    if(response.success === true) {
      location.reload();
    } else {
      userFormObject.setLoginErrorMessage('Ошибка авторизации');
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
        userFormObject.setRegisterErrorMessage('Ошибка регистрации');
      };
    });
  };


