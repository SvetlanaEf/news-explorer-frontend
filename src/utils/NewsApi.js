import { NEWS_API_KEY, NEWS_BASE } from "./config";
import { formatDate } from "./helpers";
import Api from "./Api";

class NewsApi extends Api {
  getEverything(keyword) {
    const today = new Date();
    const past = new Date();

    past.setDate(past.getDate() - 7);

    return this._fetch(`/everything`, { // /top-headlines
      params: {
        language: 'ru',
        q: keyword,
        from: formatDate(past),
        to: formatDate(today),
        pageSize: 100
      }
    });
  }
}

const newsApi = new NewsApi({
  base: NEWS_BASE,
  params: {
    apiKey: NEWS_API_KEY
  }
})

export default newsApi;
