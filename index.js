const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mtryllz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{

        const serviceCollection = client.db('photoStudio').collection('services');
        const reviewCollection = client.db('photoStudio').collection('reviews');


        app.get('/services', async(req,res) =>{
            const query ={}
            const cursor = serviceCollection.find(query)
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        app.get('/allservices', async(req,res) =>{
            const query ={}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services);
    })
        app.get('/allservices/:id',async(req,res) =>{
            const id = req.params.id;
            const query ={_id:ObjectId(id)}
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        })

        app.post('/reviews',async(req,res) =>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        app.get('/reviews',async(req,res) =>{
            const query ={}
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
}
    finally{

    }
}
run().catch(e => console.log(e));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })