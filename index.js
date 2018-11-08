const fs = require('fs');
// const sleep = require('sleep');

//sleep
function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function match_data(parent_file, children_file) {

  fs.readFile(parent_file , function(err, dataParent){
    if (!err){
      let parent = JSON.parse(dataParent)
      console.log('Generate parent')
      sleep(2000)
      fs.readFile(children_file , function(err, dataChildren){
        if (!err){
          //buat ngecek
          //console.log(JSON.parse(data))
          let child = JSON.parse(dataChildren)

          for (let i = 0; i < parent.length; i++) {
            parent[i].children = []       
            
            for (let j = 0; j < child.length; j++) {
              if(child[j].family === parent[i].last_name){
                parent[i].children.push(child[j].full_name)
              }
            }
          }
        }
        console.log(parent)
      })
    }
  })



}

match_data('/Users/zhang/phase1/p1w2/callback-multiple-file/parents.json', '/Users/zhang/phase1/p1w2/callback-multiple-file/children.json')
console.log("Notification : Data sedang diproses !");


