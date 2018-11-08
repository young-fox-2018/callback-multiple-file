const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file, callback) {
  // Code here
  fs.readFile(parent_file, 'utf8', function(err, data) {
    sleep.sleep(5)
    if (err) throw err
    else {
      let parentData = JSON.parse(data)
      fs.readFile(children_file, 'utf8', function(err, data) {
        if (err) throw err
        else {
          let childData = JSON.parse(data)
          childData.forEach(input => {
            let famName = input.family 
            parentData.forEach(input2 => {
              if (famName === input2.last_name) {
                if(!input2.children) {
                  input2.children = [input.full_name]
                }
                if(input2.children[0] != input.full_name) {
                  input2.children.push(input.full_name)
                }
              }
            });
          });
        }
        callback(parentData)
      })
    }
  })
}

match_data('./parents.json', './children.json', function(data) {console.log(data)})
console.log("Notification : Data sedang diproses !");
