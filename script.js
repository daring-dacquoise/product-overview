import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';



export let options = {
  vus: 20,
  duration: '30s',
  thresholds: {
    errors: ['rate<0.1'],
    http_req_duration: ['p(95)<50'],
  }
};

export let errorRate = new Rate('errors');

//init code

export default function () {
  //vu code

  let url = 'http://localhost:3000/products/';

  const result = check(http.get(url), {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  errorRate.add(!result);
  sleep(1);

}
