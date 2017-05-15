const userModel = require('./model');
const SHA256 = require("crypto-js/sha256");

function getAllUsers( req, res ) {
  userModel.find({}, (error, users) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`});
    if (!users) return res.status(404).send({message: `No existen Usuarios`});

    res.status(200).send({ usuarios: users });
  })
};

function saveUser( req, res ) {

  let user = new userModel();
  user.fullname = req.body.fullname;
  user.email = req.body.email;
  user.password = SHA256(req.body.password);
  user.client = req.body.client;

  user.save( (error, userStored) => {
    if (error) {
      res.status(500).send(`Error al guardar el user en la base de datos ${error}`);
    }

    res.status(200).send({ user: userStored });
  });
};

function updateUser( req, res ) {
  let userId = req.params.userId;
  let modification = req.body;
  modification.updatedAt = new Date();

  userModel.findByIdAndUpdate(userId, modification, (err, updatedDoc) => {
    if (err) return res.status(500).send({message: `Error al realizar la actualiza
                                                      ción del usuario. Error: ${err}`});

    res.status(200).send({ usuario: updatedDoc });
  });
};

function deleteUSer( req, res ) {
  let userId = req.params.userId;

  userModel.findById(userId, (error, user) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})

    user.remove(error => {
      if (error) return res.status(500).send({message: `Error al realizar el borrado del usuario. Error: ${error}`})

      res.status(200).send({ message: `El usuario ha sido eliminado` })
    })
  })

};

function canLogin( req, res ) {
  let loginInfo = req.body;
  let encryptedPass = SHA256(loginInfo.password).toString();

  userModel.findOne({ 'email': loginInfo.email, 'client': loginInfo.client }, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${error}`});
    if (!user) return res.status(200).send({ acceptedLogin: false });


    if ( user.password === encryptedPass ) return res.status(200).send({ acceptedLogin: true });

    res.status(200).send({ acceptedLogin: false });
    
  });

}

module.exports = {
  getAllUsers,
  saveUser,
  updateUser,
  deleteUSer,
  canLogin
}
