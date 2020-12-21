const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://elasticsearch.internal.coalescelab.com:9200' });
const welcome = require('cli-welcome');

welcome({
  title: 'testing elasticsearch',
  clear: true,
});
// promise API

(async () => {
  // const result = await client.search({
  //   index: 'cs-containers-2020.11.30',
  //   body: {
  //     query: {
  //       wildcard: {
  //         msisdn: {
  //           value: '*',
  //         },
  //       },
  //     },
  //   },
  // });
  const result = await client.search({
    index: ['cs-containers-2020.12.17', 'cs-containers-2020.12.16'],
    body: {
      from: 0,
      size: 1000,
      query: {
        bool: {
          filter: [
            { match_all: {} },
            { match_phrase: { 'kubernetes.namespace_name': 'cs-core-staging' } },
            { match_phrase: { 'kubernetes.labels.app': 'coalesce-menu-server' } },
            {
              range: {
                logtime: {
                  gte: '2020-12-15T20:10:12.150Z',
                  lte: '2020-12-18T20:10:12.150Z',
                  format: 'strict_date_optional_time',
                },
              },
            },
          ],
        },
      },
    },
  });

  for (let i = 0; i < 1000; i++) {
    console.log(
      `${result.body.hits.hits[i]._source.logtime}:  ${result.body.hits.hits[i]._source.log.replace(/\n$/, '')}`
    );
  }

  console.log('took:', result.body.took);
  console.log('hits:', result.body.hits.total);


