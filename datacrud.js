const express = require('express')
const { default: mongoose } = require('mongoose')
const bluedart = require('./hospital')
const bodyParser = require('body-parser')

const exp = express()

exp.use(bodyParser.urlencoded({ extended: true }))
exp.use(bodyParser.json())

const uri = "mongodb+srv://jothinathan:jothi422@cluster0.5zwgrsl.mongodb.net/jothinathan?appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
//post mapping to insert data into database by postbody 
exp.post("/admission", async (request, response) => {
    const newItem = new bluedart(request.body)
    await newItem.save()
    response.json(newItem)
})

//put mapping to update the status-discharge of patient by name
exp.put("/discharge/:name", async (request, response) => {
    const name = request.params.name
    const data = await bluedart.updateMany({ patientname: { '$eq': name } }, { status: "discharged" })
    response.json(data)

})

//get mapping to get the data or filter data by the issue
exp.get("/givedetails/:issues", async (request, response) => {
    const issues = request.params.issues
    const found = await bluedart.find({ "issue": { '$eq': issues } })
    response.json(found)
})
//update status by issue
exp.put("/updatestatus/:issues/:status", async (request, response) => {
    const issues = request.params.issues
    const statuss = request.params.status
    const data = await bluedart.updateMany({ "issue": { '$eq': issues } }, { $set: { "status": statuss } })
    response.json(data)
})
//remove patient details by age
exp.delete("/deletepatient/age/:ages", async (request, response) => {
    const age = request.params.ages
    const data = await bluedart.deleteMany({ "age": { '$eq': age } })
    response.json(data)
})
//remove patient details by status
exp.delete("/deletepatient/status/:statuss", async (request, response) => {
    const statuss = request.params.statuss
    const data = await bluedart.deleteMany({ "status": { '$eq': statuss } })
    response.json(data)
})











// routers
//delete mapping to delete the data
exp.delete('/many/:location', async (request, response) => {
    const data = await bluedart.deleteMany({ receiverAddress: { '$eq': request.params.location } })
    response.json(data)
})

//delete mapping to delete the data
exp.delete('/erase/:id', async (request, response) => {
    const data = await bluedart.findByIdAndDelete(id = request.params.id)
    response.json(data)
})

//put mapping to update the data
exp.put('/modify', async (request, response) => {
    const data = await bluedart.updateMany({ status: { '$eq': "Transit" } }, { status: "Return" })
    response.json(data)
})

///put mapping for update the data
exp.put('/', async (request, response) => {
    const data = await bluedart.findByIdAndUpdate(id = request.body._id, request.body, { new: false })
    response.json(data)
})

//get mapping to retirve the data
exp.get('/status/:given', async (request, response) => {
    // const found = await bluedart.findOne({"status":{'$eq':request.params.given}})
    const found = await bluedart.find({ "status": { '$eq': request.params.given } })
    response.json(found)
})

//get mapping to retrice the data
exp.get('/:id', async (request, response) => {
    const consignment = await bluedart.findById(id = request.params.id)
    response.json(consignment)
})


//post mapping to insert data
exp.post("/deliver", async (request, response) => {
    const newItem = new bluedart(request.body)
    await newItem.save()
    response.json(newItem)
})

//get mapping to view data
exp.get('/', async (request, response) => {
    const tracks = await bluedart.find()
    response.json(tracks)
})

exp.listen(1234, () => {
    console.log("express connected!!!!!!!!!!!")
})