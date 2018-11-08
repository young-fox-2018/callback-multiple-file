const fs = require('fs');
const sleep = require('sleep');


function match_data(parent_file, children_file) {
  // Code here
  fs.readFile("./parents.json", "utf-8",shoutData)
  console.log(`Data sedang diproses!`)
  sleep.sleep(2)
  
}

function shoutData(err, parentData){
  parentData = JSON.parse(parentData)

  fs.readFile("./children.json", "utf-8", function(err, data){
    data = JSON.parse(data)
    sleep.sleep(2)
    

    for(let i = 0; i < parentData.length; i++){
      for(let j = 0; j < data.length; j++){
        if (parentData[i].last_name === data[j].family && parentData[i].children === undefined){
          parentData[i].children = [data[j]]
        }else if(parentData[i].last_name === data[j].family){
          parentData[i].children.push(data[j])
        }
      }
    }
    console.log(JSON.stringify(parentData, null, 2))
  })
  
}

match_data('./parents.json', './children.json')
// console.log("Notification : Data sedang diproses !");
