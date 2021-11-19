const router = require("express").Router();
const Person = require("../models/persons.js");

router.post("/", async function (req, res) {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    await Person.create(person);
    res
      .status(201)
      .json({ message: "Pessoa inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json({ people: people });
  } catch (error) {
    if (error) {
      res.status(500).json({ erro: error });
    }
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!person) {
    res.status(500).json({ erro: "user not found" });
    return
  }
  try {
    const person = await Person.findOne({ _id: id });
    res.status(200).json({ person: person });
  } catch (error) {
    if (error) {
      res.status(500).json({ erro: error });
    }
  }
});
//atualizando 
router.patch('./:id', async (req, res) => {
  const id = req.params.id;  
  if (!person) {
    res.status(500).json({ erro: "user not found" });
    return
  }
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    const updatePerson = await Person.updateOne({_id: id}, person);
    res.status(200).json({ person: updatePerson });
  } catch (error) {
    if (error) {
      res.status(500).json({ erro: error });
    }
  }
})
//remove
router.delete('./:id', async (req, res) => {
  const id = req.params.id;  
  if (!person) {
    res.status(500).json({ erro: "user not found" });
    return
  }
  try {
    await Person.deleteOne({_id: id});
    res.status(200).json({ message:"person deleted successfully" });
  } catch (error) {
    if (error) {
      res.status(500).json({ erro: error });
    }
  }

})

module.exports = router;
