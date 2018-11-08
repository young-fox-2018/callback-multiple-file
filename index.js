const fs = require('fs');
const sleep = require('sleep');

function readFiles(path, cb) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) cb('ini error')
    else cb(null, data)
  })
}

function match_data(parent_file, children_file, callback) {
  readFiles(parent_file, (err, data) => {
    if (err) console.log(err) 
    else {
      let dataParents = JSON.parse(data)
      readFiles(children_file, (err, data) => {
        if (err) console.log(err) 
        else {
          let dataChildren = JSON.parse(data)
          dataParents.forEach(parent => {
            parent.children = []
            dataChildren.forEach(child => {
              if (parent.last_name === child.family) {
                parent.children.push(child.full_name)
              }
            })
          })
          callback(null, dataParents)
        }
      })
    }
  })
}

function loading(second) {
  let countdown = setInterval(() => {
    switch (second) {
      case 5:
      console.clear()
      console.log("loading data  [xxx      ]")
      break;
      case 4:
      console.clear()
      console.log("loading data  [xxxxx    ]")
      break;
      case 3:
      console.clear()
      console.log("loading data  [xxxxxxx  ]")
      break;
      case 2:
      console.clear()
      console.log("loading data  [xxxxxxxxx]")
      break;
      case 1:
      console.clear()
      break;
    }
    second--
    if (second === 0) {
      match_data('./parents.json', './children.json', (err, data) => {
        if (err) throw err
        else console.log(data)
      })
      clearInterval(countdown)
    }
  }, 1500)
}
loading(5)
//loading(5)
console.log("Notification : Data sedang diproses !");

