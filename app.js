var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Course = require('./Course.model');

var port = 8080;

var db = 'mongodb://localhost/crud';
mongoose.connect(db, function () {
    console.log('connected to db ' + db);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true   
}));

app.get('/', function (req, res) {
    res.send('ok');
});

// GET - cRud
app.get('/courses', function (req, res) {
    console.log('getting courses');
    Course.find({})
    .exec(function (err, courselist) {
        if(err){
            res.send('error');
        }
        else{
            console.log(courselist);
            res.json(courselist);
        }
    })
});

// app.get('/courses/:id', function (req, res) {
//     console.log('getting one course');
//     Course.findOne({
//         _id: req.params.id
//     })
//     .exec(function(err, oneCourse){
//        if(err){
//            res.send('error');
//        } 
//        else{
//            console.log(oneCourse);
//            res.json(oneCourse);
//        }
//     });
// });

// app.get('/courses/:term', function (req, res) {
//     console.log('getting term');
//     Course.findOne({
//         term: req.params.term
//     })
//     .exec(function(err, term){
//        if(err){
//            res.send('error');
//        } 
//        else{
//            console.log(term);
//            res.json(term);
//        }
//     });
// });

app.get('/courses/:year', function (req, res) {
    console.log('getting year');
    Course.find({
        year: req.params.year
    })
    .exec(function(err, year_res){
       if(err){
           console.log(year_res);
           res.send('error');
       } 
       else{
           console.log(year_res);
           res.json(year_res);
       }
    });
});

// app.get('/courses/:credit', function (req, res) {
//     console.log('getting credit');
//     Course.findOne({
//         credit: req.params.credit
//     })
//     .exec(function(err, credit){
//        if(err){
//            res.send('error');
//        } 
//        else{
//            console.log(credit);
//            res.json(credit);
//        }
//     });
// });


// POST1 - Crud
app.post('/courses', function (req, res) {
    var newCourse = new Course();
    
    newCourse.title = req.body.title;
    newCourse.code = req.body.code;
    newCourse.year = req.body.year;
    newCourse.term = req.body.term;
    newCourse.credit = req.body.credit;
    
    newCourse.save(function (err, course) {
        if(err){
            res.send('error saving course');
        }
        else{
            console.log(course);
            res.send(course);
        }
    })
});


// POST2 - Crud
app.post('/courses2', function (req, res) {
    Course.create(req.body, function (err, course) {
        if(err){
            res.send('error saving course');
        }
        else{
            console.log(course);
            res.send(course);
        }
    })
});

// PUT - crUd
app.put('/courses/add/:id', function (req, res) {
    Course.findOneAndUpdate({
        _id: req.params.id
    },
    { $set: {title: req.body.title} },
    {upsert: true},
     function (err, newCourse){
         if(err){
             console.log('error occured');
         }else{
             console.log(newCourse);
             res.status(204);
         }
     }
    );
});

// DELETE - cruD
app.delete('/courses/remove/:id', function (req, res) {
    Course.findOneAndRemove({
        _id: req.params.id
    },
     function (err, ccc){
         if(err){
             console.log('error occured');
         }else{
             console.log(ccc);
             res.send(204);
         }
     }
    );
});


app.listen(port, function () {
   console.log('app listening on port ' + port); 
});