import { MAIN_API_HOST } from "./config";
import Api from "./Api";

class MainApi extends Api{
  _setAuthHeaders = () => {
    const token = localStorage.getItem('token');

    if (token) {
      this._options.headers.authorization = `Bearer ${token}`;
    }
  }

  _fetch(url, options) {
    this._setAuthHeaders();
    return super._fetch(url, options);
  }

  getMe = () => {
    return this._fetch('/users/me');
  }

  getSavedNews = () => {
    return this._fetch('/articles')
  }

  saveNews = (form) => {
    if (!form) return ;

    return this._fetch('/articles', {
      method: 'POST',
      body: JSON.stringify(form)
    });
  }

  deleteNews = (_id) => {
    if (!_id) return ;

    return this._fetch(`/articles/${ _id }`, {
      method: 'DELETE'
    });
  }

  signIn = (body) => {
    if (!body) return ;

    return this._fetch('/signin', { method: 'POST', body });
  }

  signUp = (body) => {
    if (!body) return ;

    return this._fetch('/signup', { method: 'POST', body });
  }
}

const mainApi = new MainApi({
  base: MAIN_API_HOST,
  headers: {
    "Content-Type": "application/json",
  }
})

export default mainApi;
