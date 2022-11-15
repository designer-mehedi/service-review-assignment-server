const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 5000; 

//Middlewares
app.use(cors());
app.use(express.json());


const uri =
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26tpbod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const run = async() => {
    try{
        const serviceCollection = client.db('serviceReview').collection('services'); 
        const reviewCollection = client.db("serviceReview").collection('reviews');


        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services); 
        });

        app.get('/service-page', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services); 
        });

        app.get('/service-page/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service); 
        });

        app.get('/reviews', async(req, res) => {
            let query = {};
            if(req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review); 
         })

        app.post('/reviews', async(req, res) => {
            const review = req.body; 
            const result = await reviewCollection.insertOne(review);
            res.send(result); 
        });

        app.post('/services', async(req, res) => {
            const addService = req.body;
            const result = await serviceCollection.insertOne(addService);
            res.send(result); 
        })

        app.delete('/reviews/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await reviewCollection.deleteOne(query);
            res.send(result); 
        })
    }
    finally{
        
    }
}
run().catch(err => console.log(err)); 


app.get('/', (req, res) => {
    res.send('service review assignment server running');
});

app.listen(port, () => {
    console.log(`server running on port ${port}`); 
})