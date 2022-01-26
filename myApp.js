require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env['MONGO_URI']

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person',personSchema);

var createAndSavePerson = function(done){
  var jeanPierre = new Person({name:'Jean Pierre', age:40, favoriteFoods:["Cassoulet","PouleAuPot"]});

  jeanPierre.save(function(err,data){
    if (err) return console.error(err);
    done(null, data)
  });  
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data){
    if (err) return console.error(err);
    done(null, data);
  });
}

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function (err,personFound){
    if (err) return console.log(err);
    done(null, personFound)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function (err,personFound){
    if (err) return console.log(err);
    done(null, personFound)
  })
};


const findPersonById = (personId, done) => {
  Person.findById(personId,(err,pFound)=>{
    if (err) return console.log(err);
    done(null,pFound);
  })
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId,function(err,personFound){
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save(function(err,updatedPerson){
      if (err) return console.log(err);
      done(null, updatedPerson)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},function(err,personUpdated){
    if (err) return console.log(err);
    done(null,personUpdated)
  }) 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,personRemoved)=>{
    if (err) return console.log(err);
    done(null,personRemoved);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,removed){
    if (err) return console.log(err);
    done(null,removed);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let personsFound = Person.find({favoriteFoods:foodToSearch});
  console.log(personsFound);
  personsFound.sort({name:1})
  .limit(2)
  .select({age:0})
  .exec((err,list)=>{
    if (err) return console.log(err);
    done(null,list)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
