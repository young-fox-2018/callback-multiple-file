
const fs = require('fs');
// const sleep = require('sleep');

function match_data(parent_file, children_file, callback) {
  fs.readFile(parent_file, (err, data) => {
    // sleep.sleep(5)
    let parent_data = JSON.parse(data) 
    if(err) {
      console.log("error")
    }
    
    fs.readFile(children_file, (err1, data1) => {
      if(err1) {
        console.log("error")
      }

      let children_data = JSON.parse(data1)
      
      for(let i = 0; i < parent_data.length; i++) {
        parent_data[i].children = []
        // console.log(parent_data[i])
        for(let j = 0; j < children_data.length; j++) {
          // console.log(children_data[j].family)
          if(parent_data[i].last_name === children_data[j].family){
            parent_data[i].children.push(children_data[j].full_name)
          }
        }
      }
      callback(parent_data);
    })
  })
}

match_data('./parents.json', './children.json', function(data) {
  console.log(data)
})
console.log("Notification : Data sedang diproses !");
