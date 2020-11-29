import { NEWS_API_KEY, NEWS_BASE } from "./config";
import dayjs from "dayjs";
import Api from "./Api";

class NewsApi extends Api {
  getEverything(keyword) {
    return this._fetch(`/everything`, { // /top-headlines
      params: {
        language: 'ru',
        q: keyword,
        from: dayjs().subtract(1, 'w').startOf('day').format('YYYY-MM-DD'),
        to: dayjs().endOf('day').format('YYYY-MM-DD'),
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
