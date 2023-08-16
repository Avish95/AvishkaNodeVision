var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

router.post('/classify', function (req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = ['Blue', 'Red', 'Yellow'];

  // Your code starts here //
  const imageBuffer = req.files.file.data;
  const fileType = req.files.file.mimetype.split('/')[0];


  if (!req.files.file || fileType !== 'image') {
    return res.status(400).json({ error: 'Invalid data - Not an image file' });
  }

  AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: 'AKIARAR74F5B2ZJFROOU',
    secretAccessKey: '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'
  });


  const client = new AWS.Rekognition();
  const params = {
    Image: {
      Bytes: imageBuffer
    },
    MaxLabels: 10
  }

  client.detectLabels(params, function (err, data) {
    if (err) {

      res.status(500).json({ error: 'An unexpected error occurred' });
    } else {

      const labels = data.Labels.map((label) => label.Name);

      res.status(200).json({
        "labels": labels
      });
    }
  });



  // Your code ends here //


});

module.exports = router;
