class Api {
  constructor(options) {
    this._options = options;
  }

  _fetch(url, options) {
    const fetchUrl = new URL(this._options.base + url);
    let params = this._options.params || {};
    let fetchOptions = { ...this._options, ...options };

    if (fetchOptions && fetchOptions.params) {
      params = {
        ...params,
        ...options.params
      }
    }

    if (fetchOptions && fetchOptions.body && typeof fetchOptions.body !== 'string') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    if (Object.keys(params).length) {
      fetchOptions.params = params;

      Object.keys(params).forEach(key => {
        fetchUrl.searchParams.set(key, fetchOptions.params[key]);
      });
    }

    return fetch(fetchUrl.toString(), fetchOptions)
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          return data;
        }

        return Promise.reject({
          status: response.status,
          ...data
        })
      });
  }
}

export default Api;
