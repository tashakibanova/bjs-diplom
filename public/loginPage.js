'use strict';

const userFormObject = new UserForm();

userFormObject.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
    console.log(response); // проверяем, какой объект возвращает сервер
    // проверяем успешность запроса
    if(response.success) {
      location.reload();
    } else {
      userFormObject.setLoginErrorMessage(response.error);
    }
  })
}
registerFormCallback.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
      console.log(response); // проверяем, какой объект возвращает сервер
      // проверяем успешность запроса
      if(response.success) {
        location.reload();
      } else {
        userFormObject.setRegisterErrorMessage(response.error);
      }
    })
  }


