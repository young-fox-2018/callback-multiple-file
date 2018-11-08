const fs = require('fs');
// const sleep = require('sleep');

function match_data(parent_file, children_file, cb) {
  fs.readFile(parent_file, function(err, data){
    let parent_data = JSON.parse(data)
    fs.readFile(children_file, function(err, data){
      let children_data = JSON.parse(data)
      for (let i = 0; i < parent_data.length; i++) {
        parent_data[i].children = []
        for (let j = 0; j < children_data.length; j++) {
          if (children_data[j].family === parent_data[i].last_name) {
            parent_data[i].children.push(children_data[j].full_name)
          }
        }
      }
      cb(parent_data)
    })
  })
}

match_data('./parents.json', './children.json',function(data){
  console.log(data);
})
console.log("Notification : Data sedang diproses !");
