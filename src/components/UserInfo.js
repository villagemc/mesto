// Управление отображением информации о пользователе на странице:
export default class UserInfo {
	constructor(item) {
		this._name = document.querySelector(item.userName);
		this._info = document.querySelector(item.userInfo);
	}

	getUserInfo() {
		return {
			name: this._name.textContent,
			info: this._info.textContent,
		}	
	}

	setUserInfo(name, info) {
		this._name.textContent = name;
    this._info.textContent = info;
	}
}