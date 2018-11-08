const fs = require('fs');
// const sleep = require('sleep');

function match_data(parent_file, children_file, cb) {
    fs.readFile(parent_file, (err, data) => {
      if (err) throw err;
      sleep(5000)
      let data_parent = JSON.parse(data)
      fs.readFile(children_file, (err, data) => {
        if (err) throw err;
        let data_children = JSON.parse(data)
        // console.log(data_children);

        for (let i = 0; i < data_parent.length; i++) {
          data_parent[i]['children'] = []
            for (let j = 0; j < data_children.length; j++) {
                if (data_parent[i].last_name === data_children[j].family) {
                  data_parent[i]['children'].push( data_children[j].full_name)
                }
            }
        }
        sleep(5000)
        cb(data_parent)
      })

    });
}
function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

match_data('./parents.json', './children.json', function (data) {
  console.log(data)
})
console.log("Notification : Data sedang diproses !");
