const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file, callback) {
  // Code here
  fs.readFile(parent_file, 'utf8', function(err, data) {
    let dataParent = JSON.parse(data)
    fs.readFile(children_file, 'utf8', function(err, data){
      let dataChildren = JSON.parse(data)
      for(let i = 0; i < dataParent.length; i++) {
        dataParent[i].children = []
        for(let j = 0; j < dataChildren.length; j++) {
          if(dataParent[i].last_name === dataChildren[j].family) {
            dataParent[i].children.push(dataChildren[j].full_name)
          }
        }
      }
      callback(dataParent)
    })
   })
}

match_data('./parents.json', './children.json', function(data){
console.log(data)
})
console.log("Notification : Data sedang diproses !");
