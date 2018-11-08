const fs = require('fs');
const sleep = require('sleep');

function readData(input, cb) {
  fs.readFile(input, "utf8", function (err, data) {
    if (err) {
      cb(err, null)
    } else {
      sleep.sleep(2)
      cb(null, data)
    }
  })
}

function match_data(parent_file, children_file, callback) {
  // Code here
  readData(parent_file, function (err, data) {
    if (err) throw err
    else {
      let parent = JSON.parse(data)
      readData(children_file, function (err, data) {
        if (err) throw err
        else {
          let children = JSON.parse(data)
          children.forEach(elementChild => {
            parent.forEach(elementParent => {
              if (elementChild.family === elementParent.last_name) {
                if (elementParent.children === undefined) {
                  elementParent.children = [elementChild.full_name]
                } else {
                  elementParent.children.push(elementChild.full_name)
                }
              }
            });
          });
          callback(parent)
        }
      })
    }
  })
}

match_data('./parents.json', './children.json', function(data){
  console.log(data)
})
console.log("Notification : Data sedang diproses !");
