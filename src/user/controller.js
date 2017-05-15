const userModel = require('./model');

function getAllUsers( req, res ) {
  res.status(200).send({mgs:'hola'});
}

module.exports = {
  getAllUsers
}
