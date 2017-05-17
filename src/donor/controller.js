const donorModel = require('./model');
const excel = require('node-excel-export');
let shortid = require('shortid');

// Private Functions:
function createExcel( data ) {

  const styles = {
    headerDark: {
      font: {
        color: {
          rgb: '000000'
        },
        sz: 12,
        bold: true,
        underline: false
      }
    }
  };

  const specification = {
    name: {
      displayName: 'Name',
      headerStyle: styles.headerDark,
      width: 120
    },
    lastname: {
      displayName: 'Lastname',
      headerStyle: styles.headerDark,
      width: '10' // <- width in chars (when the number is passed as string)
    },
    email: {
      displayName: 'Email',
      headerStyle: styles.headerDark,
      width: 220
    },
    birthdate: {
      displayName: 'Birthdate',
      headerStyle: styles.headerDark,
      width: 120
    },
    phone: {
      displayName: 'Phone',
      headerStyle: styles.headerDark,
      width: 120
    },
    gender: {
      displayName: 'Gender',
      headerStyle: styles.headerDark,
      width: 120
    }
  }

  let dataset = data.map( elem => {
    let aux = {
      name: elem.name,
      lastname: elem.lastname,
      email: elem.email,
      birthdate: `${elem.birthdate.getFullYear()}-${elem.birthdate.getMonth() + 1}-${elem.birthdate.getDate()}`,
      phone: elem.phone,
      gender: elem.gender
    }
    return aux;
  });

  const report = excel.buildExport(
    [{
        name: 'test',
        specification: specification,
        data: dataset
      }]
  );

  return report;
}

function getAllDonors( req, res ) {
  donorModel.find({}, (err, donors) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
    if (!donors) return res.status(404).send({message: `No existen Donantes`});

    res.status(200).send({ donors: donors });
  });
}

function saveDonor( req, res ) {
  let donor = new donorModel();

  donor.donorId = shortid.generate();
  donor.name = req.body.name;
  donor.lastname = req.body.lastname;
  donor.email = req.body.email;
  donor.birthdate = req.body.birthdate;
  donor.phone = req.body.phone;
  donor.gender = req.body.gender;
  donor.slug = (donor.name.toLowerCase() + "-" + donor.lastname.toLowerCase()).replace(/\s/g, "");
  donor.clientid = process.env.CLIENT;
  donor.createdAt = new Date();
  donor.updatedAt = new Date();

  donor.save( (err, donorStored) => {
    if (err) return res.status(500).send(`Error al guardar el user en la base de datos ${err}`);

    res.status(200).send({ donor: donorStored });
  });
}

function updateDonor( req, res ) {
  let donorId = req.params.donorId;
  let modification = req.body;
  modification.updatedAt = new Date();

  donorModel.findOneAndUpdate({ donorId: donorId}, modification, (err, updatedDoc) => {
    if (err) return res.status(500).send({message: `Error al realizar la actualiza
                                                      ción del donante. Error: ${err}`});

    res.status(200).send({ donor: updatedDoc });
  });
}

function deleteDonor( req, res ) {
  let donorId = req.params.donorId;

  donorModel.findOneAndRemove({ donorId: donorId}, (err, removedDoc) => {
    if (err) return res.status(500).send({message: `Error al realizar la actualiza
                                                      ción del donante. Error: ${err}`});

    res.status(200).send({ donor: removedDoc });
  });
}

function getOrderedExcel ( req, res ) {
  donorModel.find({}).sort({ name: 1, lastname: 1 }).exec( (err, docs) => {
    let report = createExcel(docs);

    res.attachment('orderedDonors.xlsx');
    return res.status(200).send(report);

  } );
}

module.exports = {
  getAllDonors,
  saveDonor,
  updateDonor,
  deleteDonor,
  getOrderedExcel
}
