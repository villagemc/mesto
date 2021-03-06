// Класс по работе с профилем и аватром:
export default class UserInfo {
  constructor(data) {
    this._userName = document.querySelector(data.userName);
    this._userInfo = document.querySelector(data.userJob);
    this._userAvatar = document.querySelector(data.userAvatar);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userInfo.textContent,
      id: this.id,
      avatar: this._userAvatar,
    };
  }

  setUserInfo(name, description, userId) {
    this._userName.textContent = name;
    this._userInfo.textContent = description;
    this.id = userId;
  }

  updateUserAvatar(link) {
    this._userAvatar.style.backgroundImage = `url(${link})`;
  }
}
