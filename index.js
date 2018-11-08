const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file,cb) {
  fs.readFile(parent_file,"utf8", function (err, data) {
    let dataParent = JSON.parse(data)
    
    fs.readFile(children_file, "utf8", function (err, data) {
      let dataChildren = JSON.parse(data)
      
      for (let i = 0; i < dataParent.length; i++) {
        dataParent[i].children = []
        for (let j = 0; j < dataChildren.length; j++) {
          if (dataChildren[j].family == dataParent[i].last_name) {
            dataParent[i].children.push(dataChildren[j].full_name)
          }
        }
      }
      cb(dataParent)
    })
  })
}



match_data('./parents.json', './children.json',function (a) {
  console.log(a);
  
})
console.log("Notification : Data sedang diproses !");
