const fs = require('fs');
// const sleep = require('sleep');
//npm error bang gatau kenapa :(


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function match_data(parent_file, children_file, cb) {
  fs.readFile(parent_file, 'utf8', function (err, data) {
    sleep(5000)
    if (err) console.log(err)
    else {
      let parent_data = JSON.parse(data)
      fs.readFile(children_file, 'utf8', function (err, data) {
        if (err) console.log(err)
        else {
          let child_data = JSON.parse(data)
          child_data.forEach(function (child) {
            let childFamily = child.family
            parent_data.forEach(function (parent) {
              if (childFamily === parent.last_name) {
                if (!parent.children) {
                  parent.children = [child.full_name]
                }
                if (parent.children[0] != child.full_name) {
                  parent.children.push(child.full_name)
                }
              }
            });
          });
        }
        cb(parent_data)
      })
    }
  })
}
match_data('./parents.json', './children.json', function (data) {
  console.log(data)
})
console.log(`Data Sedang Di Proses!!`);


