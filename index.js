const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file) {
  // Code here
  fs.readFile('parents.json', function(err, data) {
    if (err) console.log('err');
    sleep.sleep(5);
    let parent_data = JSON.parse(data)
    fs.readFile('children.json', function(err, data) {
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
      console.log(parent_data);
    })
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
