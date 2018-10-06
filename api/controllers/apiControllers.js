const debug = require('debug')('app:apiControllers')
const data = require('../data/data.json')

// Utility functionality
const randomFromArray = (array) => {
  return array[Math.floor(Math.random()*array.length)]
}

// Format case nicely
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const generateData = (cb) => {

  let size      = randomFromArray(data.size_descriptors)
  let fat       = randomFromArray(data.fat_descriptors)
  let milk      = randomFromArray(data.milk_origin_descriptors)
                    + " "
                    + randomFromArray(data.milk_type_descriptors)
                    + " milk"
  let strength  = randomFromArray(data.strength_descriptors)
  let type      = randomFromArray(data.coffee_type)
  let addition  = [
                    randomFromArray(data.addition_phrases),
                    randomFromArray(data.primary_addition_origin),
                    randomFromArray(data.primary_addition),
                    randomFromArray(data.addition_combinator),
                    randomFromArray(data.secondary_addition_origin),
                    randomFromArray(data.secondary_addition)
                  ].join(" ")

  // Full Coffee Before Processing
  let fullCoffee = [
    size, fat, milk, strength, type, addition
  ]
  console.log(fullCoffee)

  // Fix case, still keep as array
  for (i in fullCoffee) {
    fullCoffee[i] = toTitleCase(fullCoffee[i])
  }
  console.log(fullCoffee)

  let coffee = {
    name: fullCoffee.join(" "),
    ingredientsUsed: fullCoffee
  }



  cb(null, coffee)

}

exports.generate = generateData

const generate = (req, res) => {

  generateData((err, data) => {
    debug(`API request from: ${req.ip}`)
    debug(`Rate limit info: ${JSON.stringify(req.rateLimit)}`)
    debug(`Sending data: ${JSON.stringify(data)}`)
    res.json(data);

  })

}

exports.generate = generate
