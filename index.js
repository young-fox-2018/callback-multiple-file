const fs = require('fs');
const sleep = require('sleep');
const parents_json = "./parents.json"
const children_json = "./children.json"


function readFile(file, cb) {
    fs.readFile(file, "utf8", function(err, data) {
        //sleep.sleep(1) // syn cuman delay makanya di taro didalem 
        if (err) cb(err, null) 
        else {
          let parse_data = JSON.parse(data)
          cb(null, parse_data)
        }
    })
}

function match_data(parent_file, children_file) {
      readFile(parent_file, function(err, parent_data){ // ini bukan fs.readfile
          if (parent_data == null) { // handle error
              console.log("ERROR : ", err)
          } else {
              readFile(children_file, function(err, children_data) {
                  if (children_data == null) {
                    console.log("ERROR : ", err)
                  } else {
                    // parent data and children data is available here
                    let output = []
                    for (let i = 0; i < parent_data.length; i++) {
                        // nama belakang parent == family children 
                        let parentChild = children_data.filter(children_data => children_data.family == parent_data[i].last_name)
                        let parentChildArr = parentChild.map(obj => obj.full_name)
                        parent_data[i].children = parentChildArr
                        output.push(parent_data[i])
                    }
                    console.log("DATA PARENT CHILDREN NYA ADALAH:")
                    console.log(output)
                  }
              })
          }
      })    
}

match_data('./parents.json', './children.json')

for (let i = 0; i < 3; i++) {
    console.log("Notification : Data sedang diproses !");
    console.log("loading")
    sleep.sleep(1)
    console.clear()
    console.log("Notification : Data sedang diproses !");
    console.log("loading.")
    sleep.sleep(1)
    console.clear()
    console.log("Notification : Data sedang diproses !");
    console.log("loading..")
    sleep.sleep(1)
    console.clear()
    console.log("Notification : Data sedang diproses !");
    console.log("loading...")
    sleep.sleep(1)
    console.clear()
}


