var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();

var typingDnaVerifyClient = require("typingdna-verify-client");

var typingDnaClient = new typingDnaVerifyClient({
  clientId: "b713430cb83fd50e973e0dd6205cccda",
  secret: "3cda1d13dcbcf5ced5700d3aaa011cc4",
  applicationId: "c3234940b0d9cfa02adc1ee49dcb6ab8"
})
app.set('views', path.join(__dirname, 'engine'));
app.set('view engine', 'ejs');

router.get("/verify", (req, res) => {
  const typingDnaDataAttributes = typingDnaClient.getDataAttributes({
    email: "demo@typingdna.com",
    language: "EN",
    mode:"standard"
  });
  res.render('index', {data: typingDnaDataAttributes});
  console.log(typingDnaDataAttributes);
  // res.status(200).json(typingDnaDataAttributes);
});

router.get("/result", (req,res) => {
  const otp = req.query.otp;

  typingDnaClient.validateOTP({
      email:"demo@typingdna.com",
  },otp)
      .then((data) => {
          res.status(200).json({
              success: `Authentication ${data.success === 1 ? "Successful" : "Failed"}`
          });
      });
});



app.use("/", router);
app.listen(process.env.PORT || 3005, function(){
  console.log("Express server listening on port 5005");
});

module.exports = app;
