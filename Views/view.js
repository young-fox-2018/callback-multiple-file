
class View {
    static showMatchData(err, dataParent, dataChildren) {
        if (err) {
            console.log(err)
        } else {
            dataParent.forEach(function (parent) {
                let parentLastName = parent.last_name
                parent.childrens = []
                dataChildren.forEach(function (children) {
                    let childrenFamily = children.family
                    if (parentLastName === childrenFamily) {
                        parent.childrens.push(children.full_name)
                    }
                })
            })
            console.log(dataParent)
        }
    }
}

module.exports = View