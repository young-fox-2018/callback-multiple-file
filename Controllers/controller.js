const Model = require('../Models/model')
const View = require('../Views/view')
class Controller {
    static match_data() {
        Model.match_data(function (err, dataParent, dataChildren) {
            View.showMatchData(err, dataParent, dataChildren)
        })

    }
}

module.exports = Controller