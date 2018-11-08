const fs = require('fs');
// const sleep = require('sleep');

function match_data(parent_file, children_file) {
    readData(parent_file , (err,data)=>{
      if (err) console.log(err)
      else{
        let parentData= JSON.parse(data)
        readData(children_file,(err,data)=>{
          if (err) console.log(err)
          else{
            let  childrenData = JSON.parse(data)
            // console.log(childrenData)
            parentData.forEach(parent=>{
              parent.children=[]
              childrenData.forEach(child=>{
                if(parent.last_name===child.family){
                  parent.children.push(child.full_name)
                }
              })
              console.log(parent)
            })
          }
        })
      }
    })


}

function readData(path,cb){
  fs.readFile(path,'utf8', (err, data) => {
    if (err) throw err;
    cb(null,data)
  });
}
match_data('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-4/callback-multiple-file/parents.json','/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-4/callback-multiple-file/children.json' )
console.log("Notification : Data sedang diproses !");
// const a = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-4/callback-multiple-file/parents.json')
// console.log(a)
