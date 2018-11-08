"use strict"
const fs = require('fs');

function match_data(parent_file, children_file, cb) {
  console.log("Notification : Data sedang diproses !");
  fs.readFile(parent_file, 'utf8', (err, parentData) => {
    sleep(2000)

    if (err) throw err

    fs.readFile(children_file, 'utf8', (err, childrenData) => {
      if (err) throw err
      
      cb(JSON.parse(parentData), JSON.parse(childrenData))
    })  
  })
}

function matchData(parentData, childrenData) {
  for (let i = 0; i < parentData.length; i++) {
    for (let j = 0; j < childrenData.length; j++) {
      if (parentData[i].last_name === childrenData[j].family) {
        if (parentData[i].children == null) {
            parentData[i].children = [childrenData[j].full_name]
        } else {
          parentData[i].children.push(childrenData[j].full_name)
        }
      }
    }
  }
  
  sleep(2000)
  console.log(parentData)
  console.log('Data sudah selesai diproses')

}


function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

match_data('./parents.json', './children.json', matchData)

