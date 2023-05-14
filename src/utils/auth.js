export const BASE_URL = 'https://auth.nomoreparties.co';

const getFetchAnswer = (result) => {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
}

const request = (endpoint, options) => {
  return fetch(`${BASE_URL + endpoint}`, options).then(res => getFetchAnswer(res))
}

export const register = (password, email) => {
  return request(`/signup`,
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const authorize = (password, email) => {
  return request(`/signin`,
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const checkToken = () => {
  return request(`/users/me`,
  {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
}
