class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json()
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    
      .then((res) => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    
    .then((res) => this._checkResponse(res))
  }

  editProfile(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then((res) => this._checkResponse(res))
      
  }

  addCard(obj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      })
    })
      .then((res) => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  }
  
  handleLikeClick(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  }

  updateAvatar(obj) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar
      })
    })
      .then((res) => this._checkResponse(res))
      
  }

}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '9eb97aaf-6c90-4495-9f7a-000029edf688',
    'Content-Type': 'application/json'
  }
}); 