var stages = {
    0:{
        descricao:"menu inicial",
        obj: { execute: require('./stages/0.js') }
    }
}
exports.step = stages;