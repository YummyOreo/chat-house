function deleteAcc(Token, Users) {
    Users.deleteOne(Token)
}

module.exports = deleteAcc;