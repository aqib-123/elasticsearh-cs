const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://elasticsearch.internal.coalescelab.com:9200' });
const axios = require('axios');

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

  try {
    // const result = await client.search({
    //   index: ['cs-containers-2020.12.17', 'cs-containers-2020.12.16'],
    //   body: {
    //     from: 0,
    //     size: 500,
    //     query: {
    //       bool: {
    //         filter: [
    //           { match_all: {} },
    //           { match_phrase: { 'kubernetes.namespace_name': 'cs-core-staging' } },
    //           { match_phrase: { 'kubernetes.labels.app': 'coalesce-menu-server' } },
    //           {
    //             range: {
    //               logtime: {
    //                 gte: '2020-12-15T20:10:12.150Z',
    //                 lte: '2020-12-18T20:10:12.150Z',
    //                 format: 'strict_date_optional_time',
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });
    const result = await client.search({
      index: ['cs-containers-2020.12.17'],
      body: {
        // from: 0,
        size: 900,
        query: {
          match_all: {},
        },
      },
    });

    console.log('took:', result.body.took);
    console.log('hits:', result.body.hits.total);
  } catch (error) {
    console.log('error', error);
  }

  let parameters = {
    headers: {
      // 'cache-control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      from: 50,
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
  };
  // axios
  //   .get('http://localhost:9200/cs-containers-2020.12.16/_doc/_search', parameters)
  //   .then((res) => {
  //     console.log(res.data);
  //     console.log(res.data.hits.hits);
  //   })
  //   .catch((e) => console.log('e', e));
  // for (let i = 0; i < 1000; i++) {
  //   console.log(
  //     `${result.body.hits.hits[i]._source.logtime}:  ${result.body.hits.hits[i]._source.log.replace(/\n$/, '')}`
  //   );
  // }
  // console.log('total lines=', result);
  // console.log('result', result.body.hits.hits[0]);
  // console.log('result', result.body);

  //   const result = await client.indices.getFieldMapping({
  //     fields: 'log',
  //     index: 'cs-containers-2020.11.30',
  //     include_type_name: true,
  //     include_defaults: true,
  //     ignore_unavailable: true,
  //     allow_no_indices: true,
  //     local: true,
  //   });

  // indices.getMapping
  // const result = await client.indices.getMapping({
  //   index: 'cs-containers-2020.11.30',
  //   include_type_name: true,
  //   ignore_unavailable: true,
  //   allow_no_indices: true,
  //   local: true,
  // });
  // console.log('result', result.body['cs-containers-2020.11.30'].mappings._doc.properties.log);
})();

// const elasticConfig = {
//   url: `${config.elasticsearch.type}://${config.elasticsearch.host}:${config.elasticsearch.port}`,
//   username: `${config.elasticsearch.username}`,
//   password: `${config.elasticsearch.password}`,
//   indexNamePrefix: `${customer}-${environment}-tdr`,
//   clientTimeoutMilliseconds: 5000,
//   clientMaxRetries: 7,
// };

// const DEFAULT_PAGE_SIZE = 20;
// const MIN_PAGE_SIZE = 5;
// const MAX_PAGE_SIZE = 100;
