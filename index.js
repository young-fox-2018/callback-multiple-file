const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file,callback) {
  // Code here
  fs.readFile(parent_file,"utf8", function (err,dataParent) {
    if (err) callback (err,null)
    else {
      sleep.sleep(5)
      fs.readFile(children_file,"utf8", function (err,dataChildren){
        if (err) callback (err,null)
        else {
          sleep.sleep(5)
          callback(null,JSON.parse(dataParent),JSON.parse(dataChildren))
        }
      })
    }
  })
}

match_data('./parents.json', './children.json', function(err,dataParent,dataChildren){
  if(err) console.log(err) 
  else {
    dataParent.forEach(parent => {
      parent.children = []
      dataChildren.forEach(children => {
        if(children.family === parent.last_name) parent.children.push(children.full_name)
      })
    })
  }
  console.log(dataParent)
})
console.log("Notification : Data sedang diproses !");
