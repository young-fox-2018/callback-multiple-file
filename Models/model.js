const fs = require('fs')

class Model {
    static readData(file, type, cb) {
        fs.readFile(file, type, cb)
    }

    static sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    static match_data(cb) {
        Model.readData('./parents.json', 'utf8', function (err, data) {
            console.log(`Notifikasi!: Data sedang Diproses!`)
            Model.sleep(7000)
            let dataParent = JSON.parse(data)
            if (err) {
                throw err
            } else {
                Model.readData('./children.json', 'utf8', function (err, data) {
                    let dataChildren = JSON.parse(data)
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, dataParent, dataChildren)
                    }
                })
            }
        })
    }


}

module.exports = Model