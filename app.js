const express = require('express');
const app = express();
const port = 8080;

async function test(url) {
  try {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    let response = await fetch(`${url}/api/user`, options);
  
    return response.json();
  } catch (error) {
    res.json({status: "error", error});
  }
  
}

app.post('/', (req, res) => {
  let url = req.data?.url || ""
  if (!req.data|| !req.data.url) {
    res.json({status: "error", error: "No URL found"});
    process.exit(1)
  }
  test(url).then((data) => {
    res.json({status: "success", data});
  }).catch(error => {
    res.json({status: "error", error});
  })
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
