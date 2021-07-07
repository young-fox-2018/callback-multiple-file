const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file, cb) {
  // Code here
  readData(parent_file, function(err, data_parent) {
    if (err) {
      cb(err)
    } else {
      console.log(`Extracting parent data...`);
      sleep.sleep(2);

      readData(children_file, function(err, data_children) {
        if (err) {
          cb (err)
        } else {
          console.log(`Extracting children data...`);
          sleep.sleep(2);

          for (let i = 0; i < data_parent.length; i++) {
            //loop data children, samakan family name children dengan last name parent
            for (let j = 0; j < data_children.length; j++) {
              if (data_parent[i].last_name === data_children[j].family) {
                if (data_parent[i].children === undefined) {
                  data_parent[i].children = [data_children[j].full_name];
                } else {
                  data_parent[i].children.push(data_children[j].full_name);
                }
              }
            }
          }
          console.log(data_parent);
        }
      })
    }
  })
}

function readData(file, callback) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, JSON.parse(data));
    }
  })

}

match_data('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");
