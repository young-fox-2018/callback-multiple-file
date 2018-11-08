const fs = require('fs');
// const sleep = require('sleep');

function sleep (milliseconds) {
  
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function match_data(parent_file, children_file, cb) {
  // Code here
  console.log("Notification : Data sedang diproses !");
  fs.readFile(parent_file,"utf8",function(err,data){
    sleep(5000)
    if(err) {
      console.log(err)
    }

    fs.readFile(children_file,"utf8", function(err, dataChildren){
      if(err){
        console.log(err)
      }

      // console.log(typeof ,"++++++++++++", dataChildren)
      cb(JSON.parse(data), JSON.parse(dataChildren), parent_file)
    })
  })
}

function matchFile(parents, children, dataBase){
  for(let iParents = 0 ; iParents < parents.length ; iParents++){
    for(let iChildren = 0 ; iChildren < children.length ; iChildren++){
      if(children[iChildren]["family"] === parents[iParents]["last_name"]){
        if(parents[iParents]["children"] == null){
          parents[iParents]["children"] = [children[iChildren]["full_name"]]
        }
        else{
          parents[iParents]["children"].push(children[iChildren]["full_name"])
        }
      }
    }
    console.log(parents)
  }

}

match_data('./parents.json', './children.json', matchFile)