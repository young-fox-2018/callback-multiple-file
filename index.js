const fs = require('fs');
const sleep = require('sleep');

function readFile(path, cb){
  fs.readFile(path, 'utf8', function(err, data){
    if(err){
      sleep.sleep(2)
      cb(err, null)
    }else{
      sleep.sleep(2)
      cb(null, data)
    }
  })
}

function match_data(parent_file, children_file, cb) {
  readFile(parent_file, (err, data) => {
    if(err) cb(err)
    else{
      let parentList = JSON.parse(data)
      readFile(children_file, (err, data) => {
        if(err) cb(err)
        else{
          let dataChildren = JSON.parse(data)
          parentList.forEach(item => {
            dataChildren.forEach(element => {
              if(item.last_name === element.family){
                if(item.children === undefined){
                  item.children = [element.full_name]
                }else{
                  item.children.push(element.full_name)
                }
              }
            })
          })
          cb(parentList)
        }
      })
    }
  })
}

function display(value){
  console.log(value)
}

match_data('./parents.json', './children.json', display)
console.log("Notification : Data sedang diproses !");
