const suscripModel = require('./model');
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
    donorName: {
      displayName: 'Name',
      headerStyle: styles.headerDark,
      width: 100
    },
    donorLastname: {
      displayName: 'Lastname',
      headerStyle: styles.headerDark,
      width: '10' // <- width in chars (when the number is passed as string)
    },
    amount: {
      displayName: 'Amount',
      headerStyle: styles.headerDark,
      width: 80
    },
    typeCard: {
      displayName: 'Card Type',
      headerStyle: styles.headerDark,
      width: 120
    },
    brandCard: {
      displayName: 'Brand Card',
      headerStyle: styles.headerDark,
      width: 120
    },
    lastDigits: {
      displayName: 'Last Digits',
      headerStyle: styles.headerDark,
      width: 90
    },
    initData: {
      displayName: 'Primer Cobro',
      headerStyle: styles.headerDark,
      width: 120
    }
  }

  let dataset = data.map( elem => {
    let aux = {
      donorName: elem.donorId.name,
      donorLastname: elem.donorId.lastname,
      amount: elem.amount,
      typeCard: elem.typeCard,
      brandCard: elem.brandCard,
      lastDigits: elem.lastDigits,
      initData: `${elem.initData.getFullYear()}-${elem.initData.getMonth() + 1}-${elem.initData.getDate()}`

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
};

function getAllSuscriptions( req, res ) {
  suscripModel.find({}).populate('donorId').exec( (err, suscrips) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
    if (!suscrips) return res.status(404).send({message: `No existen Suscripciones`});

    res.status(200).send({ suscripciones: suscrips });
  });
};

function saveSuscription( req, res ) {
  let suscript = new suscripModel();

  suscript.suscriptionId = shortid.generate();
  suscript.donorId = req.body.donorId;
  suscript.amount = req.body.amount;
  suscript.typeCard = req.body.typeCard;
  suscript.brandCard = req.body.brandCard;
  suscript.lastDigits = req.body.lastDigits;
  suscript.initData = req.body.initData;
  suscript.createdAt = new Date();

  suscript.save( (err, docStored) => {
    if (err) return res.status(500).send(`Error al guardar el user en la base de datos ${err}`);

    res.status(200).send({ suscription: docStored });
  });
};

function updateSuscription( req, res ) {
  let suscriptionId = req.params.suscriptionId;
  let modification = req.body;
  modification.updatedAt = new Date();

  suscripModel.findOneAndUpdate({ suscriptionId: suscriptionId}, modification, (err, updatedDoc) => {
    if (err) return res.status(500).send({message: `Error al realizar la actualiza
                                                      ción del donante. Error: ${err}`});

    res.status(200).send({ suscription: updatedDoc });
  });
};

function deleteSuscription( req, res ) {
  let suscriptionId = req.params.suscriptionId;

  suscripModel.findOneAndRemove({ suscriptionId: suscriptionId}, (err, removedDoc) => {
    if (err) return res.status(500).send({message: `Error al realizar la actualiza
                                                      ción del donante. Error: ${err}`});

    res.status(200).send({ suscription: removedDoc });
  });
};

function getOrderedExcel( req, res ) {
  suscripModel.find({}).sort({ initData: 1 }).populate('donorId').exec( (err, docs) => {
    let report = createExcel(docs);

    res.attachment('orderedSuscriptions.xlsx');
    return res.status(200).send(report);

  } );
};

module.exports = {
  createExcel,
  getAllSuscriptions,
  saveSuscription,
  updateSuscription,
  deleteSuscription,
  getOrderedExcel
};
