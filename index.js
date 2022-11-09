const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 5000; 

//Middlewares
app.use(cors());
app.use(express());


const uri =
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26tpbod.mongodb.net/?retryWrites=true&w=majority`;
    // console.log(uri)
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const run = async() => {
    try{

    }
    finally{}
}
run().catch(err => console.error(err)); 


app.get('/', (req, res) => {
    res.send('service review assignment server running');
});

app.listen(port, () => {
    console.log(`server running on port ${port}`); 
})