const { MongoClient, ServerApiVersion } = require('mongodb');
const assert = require('assert');

const uri =
  'mongodb+srv://admin:vYX02YiQ00RVh46x@clashroyalecluster.zqj6vdd.mongodb.net/';

const agg = [
  {
    $search: {
      text: {
        query: 'baseball',
        path: 'plot',
        fuzzy: {},
      },
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      plot: 1,
    },
  },
];

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    // strict: true,
    deprecationErrors: true,
  },
});

client.connect().then(async () => {
  const coll = client.db('sample_mflix').collection('movies');
  let cursor = await coll.aggregate(agg);
  await cursor.forEach((doc) => console.log(doc));
  client.close();
});
