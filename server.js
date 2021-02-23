//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Beer = require('./models/beer.js');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally -- Updated for MongoDB Atlas M0
//Must create database on mongodb atlas first
//https://developer.mongodb.com/how-to/use-atlas-on-heroku/
//https://www.youtube.com/watch?v=imR9LlbG3pU
//user: ThadStin password: 5GAQBAldj73nKgdh
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ThadStin:5GAQBAldj73nKgdh@breweries.ua1xd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// when it used to be mlab on heroku: mongodb://localhost/'+ 'thirstee
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


///////////////////////////////// SEED //////////////////////////////////////////

app.get('/seed', async (req, res) => {
  const newBeer =
    [
      {
        img: "https://pbs.twimg.com/profile_images/656179629128970240/dmUBuhEf_400x400.png",
        name: "Pegasus City Brewery",
        street: "2222 Vantage St",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        website_url: "http://www.pegasuscitybrewery.com",
        // tag_list: "Good beer"
      },
      {
        img: "https://3.bp.blogspot.com/-1AdSOUWk-tE/WKuO3sLYcRI/AAAAAAAADpo/FJ_a18kMbzcLg5A1hQ2SY8WZKSRUJKnwwCLcB/s400/logo.png",
        name: "Texas Ale Project",
        street: "1001 N Riverfront Blvd",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        website_url: "http://www.texasaleproject.com",
        // tag_list: "Mike Madano is the best!"
      },
      {
        img: "https://d1yf68t7nbxlyn.cloudfront.net/image/id/24796391415034014",
        name: "Braindead Brewing",
        street: "2625 Main St",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        website_url: "http://www.braindeadbrewing.com",
        // tag_list: "Amazing Beers"
      },
      {
        img: "https://fcbrewing.com/wp-content/uploads/2018/04/3-ColorLogo-small-2.png",
        name: "Four Corners Brewing Co",
        street: "423 Singleton Blvd",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        website_url: "http://www.fcbrewing.com",
        // tag_list: "Try the El Chingon"
      },
      {
        img: "http://static1.squarespace.com/static/5b351bdc0dbda3ecb154572f/t/5b78c15a758d46b6ff83aa84/1534640475856/logo_yl_400_d.jpg?format=1500w",
        name: "Oak Cliff Brewing Co",
        street: "1300 S. Polk St",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        website_url: "",
        // tag_list: "Excellent!"
      },
      {
        img: "http://www.peticolasbrewing.com/wp-content/themes/peticolas/images/logo.png",
        name: "Peticolas Brewing Co",
        street: "2026 Farrington St",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        website_url: "http://www.peticolasbrewing.com",
        // tag_list: "Yum!"
      },

    ]

  try {
    const seedItems = await Beer.create(newBeer)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})




//___________________
// Routes
//___________________
//localhost:3000
////////////// databse test route ////////////
// app.get('/test' , (req, res) => { //change to thirstee???
//   Beer.find({}, (err, beer) => {
//     res.send(beer)
//   });
// });
// REDIRECT FOR DEFAULT ROUTE
app.get('/', (req, res) => {
  res.redirect('/thirstee')
})

//PUT - EDIT ROUTE 5
app.put('/thirstee/:id', (req, res) => {
  Beer.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
  res.redirect('/thirstee/')       //new:false shows what you used to have before you changed it
})  //take back to index page
});

//////UPDATE - edit 6
app.get('/thirstee/:id/edit', (req, res) => {
  Beer.findById(req.params.id, (err, editBeer) => {
   res.render('edit.ejs', {
     beer: editBeer
   })
  })
});

//NEW ROUTE 2
app.get('/thirstee/new' , (req, res) => {
  res.render('new.ejs')

});
//// POST -  CREATE - NEW route 3
app.post('/thirstee', (req, res) => {
 Beer.create(req.body, (error, data) => {
   res.redirect('/thirstee');
 });
});


// DELETE - DESTROY route 7
app.delete('/thirstee/:id', (req, res) => {
  // res.send('deleting...')
  Beer.findByIdAndRemove(req.params.id, (err, data) => {
  res.redirect('/thirstee');
  });
});


//test
// app.get('/' , (req, res) => {
//   res.send('Hello THIRSTEE! Use thirstee in your query string');
// });

//INDEX ROUTE 1
app.get('/thirstee' , (req, res) => {
  Beer.find({}, (err, allBeer) => {
    res.render('index.ejs', {
      beers: allBeer
    });
  });
});


//SHOW ROUTE 4
app.get('/thirstee/:id' , (req, res) => {
  Beer.findById(req.params.id, (err, foundBeer) => {
    res.render('show.ejs', {
      beer: foundBeer
    })
  })
});


//Don't need this code for POST/CREATE
// app.post('/thirstee', (req, res) => {
//   //console.log(req.body);
//   // creates newBeer object to match the data structure of the model
//   let newBeer = {
//     name: req.body.name,
//     street: req.body.street,
//     city: req.body.city,
//     state: req.body.state,
//     country: req.body.country,
//     tag_list: req.body.tag_list.split(',')
//   };
//   console.log(newBeer);
//   // pushes the newBeer object into the databse
//   Beer.create(newBeer);
//   // redirects to index page
//   res.redirect('/thirstee' );
// });





//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
