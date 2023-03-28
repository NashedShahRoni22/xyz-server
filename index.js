//initial setup for server
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
//mongo db
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://reactLandingAdmin:9eBjAP5AsuF5MPMl@cluster0.lsyvijc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const dataCollection = client.db("LandingDB").collection("HomeBanner");
    const aboutUsDataCollection = client.db("LandingDB").collection("HomeAboutUs");
    
    //get home banner data
    app.get("/data", async (req, res) => {
      const query = {};
      const result = await dataCollection.find(query).toArray();
      res.send(result);
    });
    //get all about us data
    app.get("/aboutData", async (req, res) => {
      const query = {};
      const result = await aboutUsDataCollection.find(query).toArray();
      res.send(result);
    });
    //update HomeBanner
    app.put("/data/:id", async(req, res)=>{
      const id = req.params.id;
      // const filter = { _id: ObjectId(id) };
      const filter = { ID:id };
      const options = { upsert: true };
      const UpdateHomeBanner = req.body;
      const updateDoc = {
        $set: {
          BannerTitle: UpdateHomeBanner.BannerTitle,
          BannerDetails: UpdateHomeBanner.BannerDetails,
          BannerImage: UpdateHomeBanner.BannerImage,
        },
      };
      const result = await dataCollection.updateMany(filter, updateDoc, options);
      res.send(result);
    })
    //update AboutUs
    app.put("/aboutData/:id", async(req, res)=>{
      const id = req.params.id;
      // const filter = { _id: ObjectId(id) };
      const filter = { ID:id };
      const options = { upsert: true };
      const UpdateAboutUs = req.body;
      const updateDoc = {
        $set: {
          AboutUsImage: UpdateAboutUs.AboutUsImage,
          AboutUsImage2: UpdateAboutUs.AboutUsImage2,
          AboutUsTitle: UpdateAboutUs.AboutUsTitle,
          AboutUsTitle2: UpdateAboutUs.AboutUsTitle2,
          AboutUsDetails: UpdateAboutUs.AboutUsDetails,
          AboutUsDetails2: UpdateAboutUs.AboutUsDetails2,
        },
      };
      const result = await aboutUsDataCollection.updateMany(filter, updateDoc, options);
      res.send(result);
    })

  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("React Landing Page SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log(`React Landing Page SERVER IS RUNNING ${port}`);
});