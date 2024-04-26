'use strict'

// Выход
const logOut = new LogoutButton();


logOut.action = () => {
    ApiConnector.logout(answer => {
        if(answer.success) {
            location.reload();
        }
    })
}

ApiConnector.current(answer => {
    if (answer.success) {
        ProfileWidget.showProfile(answer.data);
    }
})

// Курсы валют
const ratesBoard = new RatesBoard()

ApiConnector.getStocks(answer => {
    if (answer.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(answer.data);
    }
})

// Переводы, добавление валют, конвертация
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, answer => {
        console.log(answer)
        if (answer.success) {
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(answer.success, `Пополнение успешно!`)
        } else {
            // Доделать
            moneyManager.setMessage(answer.success, answer.error)
        }
            
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, answer => {
        if (answer.success) {
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(answer.success, `Конвертация успешна!`)
        } else {
            moneyManager.setMessage(answer.success, answer.error)
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, answer => {
        if (answer.success) {
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(answer.success, `Успешно отправлено!`)
        } else {
            moneyManager.setMessage(answer.success, answer.error)
        }
    })
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(answer => {
    if (answer.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(answer.data);
        moneyManager.updateUsersList(answer.data)
    }
})

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, answer => {
        if (answer.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(answer.data);
            moneyManager.updateUsersList(answer.data);
            moneyManager.setMessage(answer.success, `Пользователь добавлен!`)
        } else {
            moneyManager.setMessage(answer.success, answer.error)
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, answer => {
        if (answer.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(answer.data);
            moneyManager.updateUsersList(answer.data)
            moneyManager.setMessage(answer.success, `Пользователь удалён!`)
        } else {
            moneyManager.setMessage(answer.success, answer.error)
        }
    })
}

