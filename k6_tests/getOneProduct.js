import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '1ms', target: 1000 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'],
    http_req_duration: ['p(95)<250'],
  }
};

export default function () {

  for (let id= 1; id <= 1000011; id++) {

    const res = http.get(`http://localhost:3000/products/${id}`);

    check(res, {
      'response status is 200': (res) => res.status === 200,
      'response duration is < 250ms': (res) => res.timings.duration < 250,
    });

    sleep(1);
  }
}
