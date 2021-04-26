var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-.');

function newID(Users){
    let __id = randomToken(20);
    
    let check = undefined;
    
    Users.findById(__id)
    .then((result) => {
        console.log(result)
        check = result
    })

    if (check == undefined){
        newID(Users)
    }

    return __id

}

function newAcc(Users, email, name) {

    let __id: String = newID(Users)

    const id = Math.floor(Math.random() * 10000000000).toString;
    const user = new Users({
        _id: __id,
        email: email,
        name: name,
        rooms: [],
        owned: [],
        banned: []
    });
    return {__id, id, Users}
}

module.exports = newAcc;
