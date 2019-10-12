const express = require('express')
const mongo = require('mongodb')     

const app = express()
const MongoClient = mongo.MongoClient //ขอร้องเรียกใช้ mongodb
const mongoUrl = 'mongodb+srv://FirmAdmin:Ryoma2460@pokemon-cluster-9jypk.gcp.mongodb.net/test?retryWrites=true&w=majority' //URL เชื่อต่อ

const dbname =  'pokemon'
const collection = 'pokemons'        // collection == table ใน Mysql
const client = new MongoClient(mongoUrl, {newUrlParser: true, useUnifiedTopology: true})  //connect Mongo 

app.use(express.json())

// app.post('/pokemons', (req,res)=> {   // version call-back
//         client.connect((err,client) =>{
//                 if (err){
//                     console.log(err)
//                     res.status(500).send({ error : err})
//                     return
//                 }
            
//                 let db = client.db(dbname)
//                 db.collection(collection).insertOne({ name :' Risadon'},(err,r)=>{  // r คือ respond ของ ฝั่ง dbที่เราเชื่อมต่อ
//                     res.status(201).send({ message: 'Create pokemon successfully'})
//                     return 
//                 })
//             })

//             res.status(200).send({ message: 'Finished too early'})
// })
// app.get('/airbnb/list-reviews',(req,res)=>{       // version call-back
//      client.connect((err,client) =>{
//         if (err){
//             console.log(err)
//             res.status(500).send({ error : err})
//             return
//         }
//         let db = client.db('sample_airbnb')
//         db.collection('listingsAndReviews').find().limit(10).toArray(function(err,docs) {
//             if (err){
//                 console.log(err)
//                 res.status(500).send({ error : err})
//                 return
//             }
//             res.send(docs)
//         })
//     })
// })


app.post('/pokemons',async (req,res) =>{
        let c = await client.connect().catch((err) =>{
            console.log('Error occured when try to connnect Mongo')
            console.log(err)
            res.status(500).send({error:err})
            return
        })
            let db = c.db('pokemon')
            let r = await db.collection(collection).insertOne({ name :'Gennija'}).catch((err)=>{ 
                console.log('Error occured when insert pokemon')
                console.log(err)
                res.status(500).send({error:err})
                return 
            })
        res.status(201).send({ message: 'Create pokemon successfully'})
})
app.get('/airbnb/list-reviews', async (req,res)=>{

    let c = await client.connect().catch((err) =>{
        console.log('Error occured when try to connnect Mongo')
        console.log(err);
        res.status(500).send({error:err})
        return
    })
    let db = c.db('sample_airbnb')
    let docs = await db.collection('listingsAndReviews').find({}).limit(10).toArray().catch((err) => {
        console.log('Error occured when get  listingsAndReviews')
        console.log(err)
        res.status(500).send({error:err})
    })
    res.send(docs)
})


app.listen(3000,() => console.log('Poekmon Api started at port 3000'))