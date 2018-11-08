const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file) {
  // Code here
  fs.readFile(parent_file, function(err, data) {
    if(err) console.log(err)
    
    console.log(`Extracting parent data...`);
    sleep.sleep(2);
    let parent_data = JSON.parse(data);
    
    fs.readFile(children_file, function(err, data) {
      if(err) console.log(err)
      
      console.log(`Extracting children data...`);
      sleep.sleep(2);
      let children = JSON.parse(data);

      //loop data parent
      for (let i = 0; i < parent_data.length; i++) {
        //loop data children, samakan family name children dengan last name parent
        for (let j = 0; j < children.length; j++) {
          if (parent_data[i].last_name === children[j].family) {
            if (parent_data[i].children === undefined) {
              parent_data[i].children = [children[j].full_name];
            } else {
              parent_data[i].children.push(children[j].full_name);
            }
          }
        }
      }
      console.log(parent_data);
      
    });
  });
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
