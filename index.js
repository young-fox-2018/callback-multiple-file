const fs = require('fs')
// const sleep = require('sleep')
// const pathParent = 'parents.json'


function readData(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) callback(err, null)
    else callback(null, data)
  })
}

function save(path, callback) {
  fs.writeFile(path, (err, data) => {
    if (err) callback(err, null)
    else callback(`Data berhasil disimpan!`)
  })
}

function match_data(parent_file, children_file, callback) {
  // Code here
  fs.readFile(parent_file, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      let parent_data = JSON.parse(data)
      fs.readFile(children_file, (err, data) => {
        if (err) {
          callback(err, null)
        } else {
          let children_data = JSON.parse(data)
          parent_data.forEach(parent => {
            parent.children = []
            children_data.forEach(children => {
              if (parent.last_name === children.family) {
                parent.children.push(children.full_name)
              }
            })
          })
          callback(null, parent_data)
        }
      })

    }
  })

}

match_data('./parents.json', './children.json', (err, data) => {
  if (err) throw err
  else {
    console.log(data)
  }
})
console.log("Notification : Data sedang diproses !");