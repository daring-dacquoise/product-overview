import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 10,
  duration: '30s',
};

//init code

export default function () {
  //vu code

  http.get('https://test.k6.io');
  sleep(1);
}
