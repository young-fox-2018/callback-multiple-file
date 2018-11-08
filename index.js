const fs = require('fs');
const sleep = require('sleep');

function match_data(parent_file, children_file, cb) {
  fs.readFile(parent_file, (err,data) => {
      sleep.sleep(5)

      let dataParent = JSON.parse(data)
      
      if(err){
        console.log("data error")
      } else {
        // console.log(dataParent)
        fs.readFile(children_file, (err2,data2) => {
          if(err2){
            console.log("data error")
          } else {
            let dataChildren = JSON.parse(data2)
            //console.log(dataChildren)
            for(let i = 0; i < dataParent.length; i++){
              dataParent[i].children = []
              for( let j = 0; j < dataChildren.length; j++){
                if(dataChildren[j].family === dataParent[i].last_name){
                  dataParent[i].children.push(dataChildren[j].full_name)
                }
              }
            }
            sleep.sleep(5)
          }
          cb(dataParent)
          // console.log(dataParent)
  
        })
      }
  })

}

match_data('./parents.json', './children.json',function(data){
  console.log(data)
})
console.log("Notification : Data sedang diproses !");
