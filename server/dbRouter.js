import express from "express";
import db from "./conn.js";
import textParcer from "./dbTextParcer.js";

const router = express.Router();

// Monsters
router.get("/monsters", async (req, res) => {
    let collection = db.collection("monsters");
    let results = await collection.find({})
      .toArray();
    res.send(results);
});

router.post("/monsters/query", async (req, res) => {
    let collection = db.collection("monsters");
    let query = {};
    if (req.body.name!="") {
      query.name = new RegExp(req.body.name, 'i');
    }
    if (req.body.type.length>0) {
      query.type = { $in: req.body.type };
    }
    if (req.body.size.length>0) {
      query.size = { $in: req.body.size };
    }
    if (req.body.alignment.length>0) {
      query.alignment = { $in: req.body.alignment };
    }
    let results = await collection.find(query)
      .toArray();
    res.send(results);
});

router.get("/monsters/id/:id", async (req, res) => {
  let collection = db.collection("monsters");
  let query = {};
  query.id = new RegExp(req.params.id);
  let results = await collection.findOne(query);
  res.send(results);
});

router.get("/monsters/types", async (req, res) => {
  let collection = db.collection("monsters");
  const cursor = await collection.distinct("type");
  res.send(cursor);
});

router.get("/monsters/alignments", async (req, res) => {
  let collection = db.collection("monsters");
  const cursor = await collection.distinct("alignment");
  res.send(cursor);
});

router.get("/monsters/sources", async (req, res) => {
  let collection = db.collection("monsters");
  const cursor = await collection.distinct("source");
  res.send(cursor);
});

// Items
router.get("/items", async (req, res) => {
  let collection = db.collection("items");
  let results = await collection.find({})
    .toArray();
  res.send(results);
});

router.post("/items/query", async (req, res) => {
  let collection = db.collection("items");
  let query = {};
  if (req.body.name!="") {
    query.name = new RegExp(req.body.name, 'i');
  }
  if (req.body.type.length>0) {
    query['data.type'] = { $in: req.body.type };
  }
  if (req.body.rarity.length>0) {
    query['data.rarity'] = { $in: req.body.rarity };
  }
  if (req.body.attunement.length>0) {
    query['data.attunement'] = { $in: req.body.attunement };
  }
  let results = await collection.find(query)
    .toArray();
  res.send(results);
});

router.get("/items/id/:id", async (req, res) => {
  let collection = db.collection("items");
  let query = {};
  query.id = new RegExp(req.params.id);
  let results = await collection.findOne(query);
  res.send(results);
});

router.get("/items/types", async (req, res) => {
  let collection = db.collection("items");
  const cursor = await collection.distinct("data.type");
  res.send(cursor);
});

router.get("/items/rarities", async (req, res) => {
  let collection = db.collection("items");
  const cursor = await collection.distinct("data.rarity");
  res.send(cursor);
});

router.get("/items/sources", async (req, res) => {
  let collection = db.collection("items");
  const cursor = await collection.distinct("source");
  res.send(cursor);
});

// Spells
router.get("/spells", async (req, res) => {
  console.log("hello");
  let collection = db.collection("spells");
  let results = await collection.find({})
    .toArray();
  res.send(results);
});

router.post("/spells/query", async (req, res) => {
  let collection = db.collection("spells");
  let query = {};
  if (req.body.name!="") {
    query.name = new RegExp(req.body.name, 'i');
  }
  if (req.body.level.length>0) {
    query['data.level'] = { $in: req.body.level };
  }
  if (req.body.school.length>0) {
    query['data.school'] = { $in: req.body.school };
  }
  if (req.body.concentration.length>0) {
    query['data.concentration'] = { $in: req.body.concentration };
  }
  if (req.body.components.length>0) {
    query['data.components'] = { $all: req.body.components };
  }
  if (req.body.ritual.length>0) {
    query['data.ritual'] = { $in: req.body.ritual };
  }
  if (req.body.source.length>0) {
    query['source'] = { $in: req.body.source };
  }
  console.log(query);
  let results = await collection.find(query)
    .toArray();
  res.send(results);
});

router.get("/spells/id/:id", async (req, res) => {
  let collection = db.collection("spells");
  let query = {};
  query.id = new RegExp(req.params.id);
  let results = await collection.findOne(query);
  res.send(results);
});

router.get("/spells/levels", async (req, res) => {
  let collection = db.collection("spells");
  const cursor = await collection.distinct("data.level");
  res.send(cursor);
});

router.get("/spells/schools", async (req, res) => {
  let collection = db.collection("spells");
  const cursor = await collection.distinct("data.school");
  res.send(cursor);
});

router.get("/spells/sources", async (req, res) => {
  let collection = db.collection("spells");
  const cursor = await collection.distinct("source");
  res.send(cursor);
});


// Add New

router.post("/monsters/new", async (req, res) => {
  //let collection = db.collection("monstertest"); //TODO update to monsters

  const doc = textParcer(req.body.monster);
  //let results = await collection.insertOne(doc);
  res.send(doc);
});

export default router;