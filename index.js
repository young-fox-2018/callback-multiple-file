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
function match_data(parent_file, children_file) {
  fs.readFile(parent_file, function(err, data) {
    if (err) {
        throw err;
    }else{

      let parent = JSON.parse(data);
      // console.log(parent)
      
      fs.readFile(children_file, function(err, data) {
        if (err) {
            throw err;
        }
        let children = JSON.parse(data)
        // console.log(children)
        for(let i = 0 ; i < parent.length;i++){
          for(let j = 0 ; j < children.length; j++){
            if(children[j].family === parent[i].last_name){
              if(parent[i].children === undefined){
                parent[i].children = []
              }
              parent[i].children.push(children[j].full_name)
            }
          }
        }
        console.log(parent)
    });


    }
});
  // Code here
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
