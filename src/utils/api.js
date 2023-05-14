class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getFetchAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this.baseUrl + endpoint}`, options).then(res => this.getFetchAnswer(res))
  }

  getInitialCards() {
    return this._request(`/cards`,
    {
      headers: this.headers
    })
  }

  getUserInfo() {
    return this._request(`/users/me`,
    {
      headers: this.headers
    })
  }

  updateUserInfo(formData) {
    return this._request(`/users/me`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
  }

  addNewCard(cardData) {
    return this._request(`/cards`,
    {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`,
    {
      method: 'DELETE',
      headers: this.headers
    })
  }

  addLike(id) {
    return this._request(`/cards/${id}/likes`,
    {
      method: 'PUT',
      headers: this.headers
    })
  }

  deleteLike(id) {
    return this._request(`/cards/${id}/likes`,
    {
      method: 'DELETE',
      headers: this.headers
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`/cards/${id}/likes`,
    {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers
    })
  }

  changeAvatar(link) {
    return this._request(`/users/me/avatar`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  getDataToLoadPage() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a356cdb4-b562-4193-8871-80b2cea38756',
    'Content-Type': 'application/json'
  }
});

export default api;
