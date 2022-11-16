import config from './utils'

 class Api{
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  };

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      //headers: this._headers,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._getResponseData(res)
    )
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    },
    )
    .then(res=>this._getResponseData(res))
  };

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res=>this._getResponseData(res))
  };

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res=>this._getResponseData(res))
  };

  changeLikeCardStatus(cardId, isLike) {
    if(!isLike){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res=>this._getResponseData(res))
    }else{
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res=>this._getResponseData(res))
    }
    
  };

  showAvatar() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    },
    )
    .then(res=>this._getResponseData(res))
  };

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    },
    )
    .then(res=>this._getResponseData(res))
  };

  signUp(password,email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password,email})
      },
      )
      .then(res=>this._getResponseData(res))
  };

  signIn(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    },
    )
    .then(res=>this._getResponseData(res)).then((data)=>{
      if (data.token){
        //console.log(data)
        //localStorage.setItem('jwt', data.token);
        return data;
      } else {
        return
      }
    })
  };

  checkToken(token) {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
     // headers: {
       // 'Accept': 'application/json',
        //"Authorization" : `Bearer ${token}`
      //},
    })
    .then(res=>this._getResponseData(res))
  };
};

export const api = new Api(config);