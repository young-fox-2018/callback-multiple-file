const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file, cb) {
  // Code here
  fs.readFile(parent_file, function(err, data) {
    if (err) console.log('err');
    sleep.sleep(5);
    let parent_data = JSON.parse(data)
    fs.readFile(children_file, function(err, data) {
      if (err) console.log('err');
      sleep.sleep(5);
      let children_data = JSON.parse(data)
      for (let i = 0; i < parent_data.length; i++) {
        parent_data[i].children = [];
        for (let j = 0; j < children_data.length; j++) {
          if (parent_data[i].last_name === children_data[j].family) {
            parent_data[i].children.push(children_data[j].full_name)
          }
        }
      }
      cb(parent_data);
      // console.log(parent_data);
    })
  })
}

match_data('./parents.json', './children.json', function(data) {
  console.log(data);
})
console.log("Notification : Data sedang diproses !");
