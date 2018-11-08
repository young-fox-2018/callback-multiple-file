const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file, cb) {
  fs.readFile(parent_file, 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(data);

    fs.readFile(children_file, 'utf8', (err, dataChild) => {
      if (err) throw err;
      // console.log(JSON.parse(data))
      // console.log(JSON.parse(dataChild));
      let parent = JSON.parse(data)
      let child = JSON.parse(dataChild)

      for (let i = 0; i < parent.length; i++) {
        parent[i].children = []
        for (let j = 0; j < child.length; j++) {
          if (parent[i].last_name === child[j].family) {
            parent[i].children.push(child[j].full_name)
          }
        }
      }
      cb(parent)
    })

  })
}

match_data('./parents.json', './children.json', function(data){
  console.log(data)
})
console.log("Notification : Data sedang diproses !");

