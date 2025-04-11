const { MongoClient } = require("mongodb");
const uri = 'mongodb+srv://jaydeep:JaydeepAndHenvika@hnvk.z27qo.mongodb.net/?retryWrites=true&w=majority&appName=hnvk';
const client = new MongoClient(uri);

async function run() {

  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);

  } finally {
    await client.close();

  }
}

run().catch(console.dir);
