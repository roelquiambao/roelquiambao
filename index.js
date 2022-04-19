'use strict';
const https = require('https');
const express = require('express');
const app = express();
const port = 8010;
app.listen(port, () => console.log(`App started and listening on port ${port}`));

app.get('/getTimeStories', (req, res) => {
  try {
   https.get('https://time.com', (resp) => {
    let data = [];
    resp.on('data', (d) => {
      data.push(d);
    });
    let dataResp = []
    resp.on('end', ()=>{
         const result = data
          .join("")
          .match(/(?<=class="(latest-stories__item-headline)">)(.*?)(?=<\/h3>)/g)
        
          result.forEach(value => {
            dataResp.push({title: value})
          })
          res.send(dataResp)
    });
  
  }).on('error', (e) => {
    res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
     });
  });

} catch (err) {
  console.error(err)
  res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
  });
}
});
