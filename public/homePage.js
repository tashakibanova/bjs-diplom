// Выход из личного кабинета
const userLogoutButton = new LogoutButton();
userLogoutButton.action = function () {
    ApiConnector.logout((response) => {
      if (response.success === true) {
        location.reload(); // Обновление страницы при успешной деавторизации
      }
    });
}

//Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); // Отображение данных профиля при успешном запросе
    }
  });

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getCurrencyRates() {
    ApiConnector.getStocks((response) => {
      if (response.success) {
        ratesBoard.clearTable(); // Очистка таблицы
        ratesBoard.fillTable(response.data); // Заполнение таблицы полученными данными
      }
    });
}
getCurrencyRates(); // Получение текущих валют
// Выполнение функции с получением валют раз в минуту
setInterval(getCurrencyRates, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager(); 
//пополнение баланса
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data); // Отображение новых данных о пользователе
        moneyManager.setMessage(true, 'Баланс пополнен'); // Отображение сообщения об успехе
        setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
      } else {
        moneyManager.setMessage(false, response.error); // Отображение сообщения об ошибке
      }
    })
}
//конвертирование валюты
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data); // Отображение новых данных о пользователе
        moneyManager.setMessage(true, 'Валюта конвертирована'); // Отображение сообщения об успехе
        setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
      } else {
        moneyManager.setMessage(false, response.error); // Отображение сообщения об ошибке
      }
    })
  }
//перевод валюты
moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data); // Отображение новых данных о пользователе
        moneyManager.setMessage(true, 'Перевод осуществлен'); // Отображение сообщения об успехе
        setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
      } else {
        moneyManager.setMessage(false, response.error); // Отображение сообщения об ошибке
      }
    })
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget(); 

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable(); // Очистка текущего списка избранного
        favoritesWidget.fillTable(response.data); // Отрисовка полученных данных
        moneyManager.updateUsersList(response.data); // Заполнение выпадающего списка для перевода денег
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  })
//Реализуйте добавления пользователя в список избранных:
favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
      if (response.success) {
        favoritesWidget.clearTable(); // Очистка текущего списка избранного
        favoritesWidget.fillTable(response.data); // Отрисовка полученных данных
        moneyManager.updateUsersList(response.data); // Заполнение выпадающего списка для перевода денег
        favoritesWidget.setMessage(true, 'Пользователь добавлен');
        setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
      } else {
      favoritesWidget.setMessage(false, response.error);
      }
    })
}
//Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
      if (response.success) {
        favoritesWidget.clearTable(); // Очистка текущего списка избранного
        favoritesWidget.fillTable(response.data); // Отрисовка полученных данных
        moneyManager.updateUsersList(response.data); // Заполнение выпадающего списка для перевода денег
        favoritesWidget.setMessage(true, 'Пользователь удален');
        setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
      } else {
      favoritesWidget.setMessage(false, response.error);
      }
    })
}