const fs = require('fs');
// const sleep = require('sleep');


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readData(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) callback(err, null)
    else {
      sleep(1000)
      callback(null, data)
    }
  })
}

function match_data(parent_file, children_file, callback) {
  readData(parent_file, (err, data) => {
    if (err) {
      callback(err, null)
    }
    else {
      let parent_data = JSON.parse(data)
      readData(children_file, (err, data) => {
        if (err) {
          callback(err, null)
        }
        else {
          let children_data = JSON.parse(data)
          parent_data.forEach(parent => {
            parent.children = []
            children_data.forEach(children => {
              if (parent.last_name === children.family) {
                parent.children.push(children.full_name)
              }
            });
          });
          callback(null, parent_data)
        }
      })
    }
  })
}

match_data('./parents.json', './children.json', (err, data) => {
  if (err) console.log(err)
  else console.log(data);
})
console.log("Notification : Data sedang diproses .... !");
