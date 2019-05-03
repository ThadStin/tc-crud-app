const mongoose = require('mongoose');


const beerSchema = new mongoose.Schema({
  //img: String,
  name: {type: String, required: true},
  street: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true},
  tag_list: [{type: String, required: false}],
});

const Beer = mongoose.model('Beers', beerSchema);

module.exports = Beer;

//////// SAMPLE PLACEHOLDER ABOVE------EDIT!!!!! /////////////////////
//////////sample db entry below //////////////
// "id": 6836,
// "name": "Pegasus City Brewery",
// "brewery_type": "micro",
// "street": "2222 Vantage St",
// "city": "Dallas",
// "state": "Texas",
// "postal_code": "75207-6102",
// "country": "United States",
// "longitude": "-96.8339969571821",
// "latitude": "32.7991564828495",
// "phone": "9723667722",
// "website_url": "http://www.pegasuscitybrewery.com",
// "updated_at": "2018-08-24T16:22:28.539Z",
// "tag_list": []
