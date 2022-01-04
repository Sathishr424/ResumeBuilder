const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const html_to_pdf = require('html-pdf-node');

const app = express();
const download = require('download');

mongoose.connect("mongodb+srv://sat1:sat123@cluster0.mt6xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(process.cwd() + '/'));
//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + "/client/build/index.html");
});


app.use(express.static(__dirname + "/client/build"));

const userSchema = new mongoose.Schema({
    'username': String,
    'password': String,
    'sign_up': Date,
    'sign_in': [Date]
});

const User = new mongoose.model('User_test', userSchema);

app.route('/resume')
  .post((req,res)=>{
    console.log("Building PDF..");
    try{
        var resume = `<html><head><style>${req.body.style}</style></head><body>${req.body.resume}</body></html>`;
        fs.writeFileSync(__dirname + '/Resumes/resume.html', resume);
        var fileData = fs.readFileSync(__dirname + '/Resumes/resume.html', 'utf8');
        // console.log(fileData);
        var options = { format: 'A4', path: __dirname + "/Resumes/resume.pdf", margin: {bottom: "20px", top: "40px", left: 0, right: 0}};
        let file = { content: fileData };
    //     console.log(resume);
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            // console.log("PDF Buffer:-", pdfBuffer);
            res.setHeader('Content-disposition', 'attachment; filename=resume.pdf');
            res.setHeader('Content-type', 'application/pdf');
            res.download(`${__dirname}/Resumes/resume.pdf`, 'resume.pdf');
        });
    }catch (error) {
      res.send(error);
    }
  })

// app.route('/sign_up')
//   .post(function (req, res) {
//     var data = req.body;
//     User.create({
//       'username': data.username,
//       'password': data.password,
//       'sign_up': new Date(),
//       'sign_in': []
//     }, (err,d)=>{
//       // console.log(d);
//       if (d) res.json(d);
//       else if(err) console.log(err);
//     });
// });

// app.route('/sign_in')
//   .post(function (req, res) {
//     var data = req.body;
//     User.findOne({'username': data.username, 'password': data.password}, (err,d)=>{
//       if (d){
//         d.sign_in.push(new Date());
//         d.markModified('sign_in');
//         d.save((e,res)=>{
//           if (res) console.log("Time updated");
//           else if (err) console.log(err);
//         })
//         res.send(d.username);
//       }else{
//         res.send("User not found")
//       }
//     });
// });

// app.route('/all')
//   .post(function (req, res) {
//     User.find({}, (err,d)=>{
//       if (d) {
//         let ret = ["Username, password, Sign Up Date, Sign In Dates"];
//         // console.log(d);
//         for (var i in d){
//           ret.push(d[i].username + "," + d[i].password + "," + d[i].sign_up.toLocaleDateString() + " " + d[i].sign_up.toLocaleTimeString() + "," + d[i].sign_in.map(e=>e.toLocaleDateString() + " " + e.toLocaleTimeString()).join(" & "));
//         }res.send(ret);
//       }
//     })
// });


const listener = app.listen(process.env.PORT || 8080, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

