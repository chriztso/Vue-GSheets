var GoogleSpreadsheet = require('google-spreadsheet');
var promisify =  require('util').promisify;
var credentials = require('./client.json');

var doc = new GoogleSpreadsheet("1NqVjlvOrsdflXGWDeAdoh3uf61evOhBYdRSsoWzH42c");
doc.useServiceAccountAuth(credentials, () => {
    console.log('Connected')
});

var getInfoAsync = promisify(doc.getInfo);

function addRow(first, last, phone, cb){
  getInfoAsync()
  .then((data) => {
      var sheet = data.worksheets[0];
      var row = {
          first : `${first}`, 
          last :  `${last}`,
          phone : phone
      }
      var addRowAsync = promisify(sheet.addRow);
      addRowAsync(row)
      .then((data) => {
          cb(null, data);
      })
      .catch((err) => {
          cb(err, null);
      })
  })
}

function getRows(cb){
  getInfoAsync()
  .then((data) => {
      var sheet = data.worksheets[0];
      var getRowsAsync = promisify(sheet.getRows);
      getRowsAsync()
      .then((data) => {
          cb(null, data)
      })
      .catch((err) => {
          cb(err, null);
      })
  }) 
  .catch((err) => {
      cb(err, null);
  }) 
}

function deleteRowsByFirstName(firstName, cb){
    getInfoAsync()
    .then((data) => {
        var sheet = data.worksheets[0];
        var getRowsAsync = promisify(sheet.getRows);
        getRowsAsync({
            query : `first  = ${firstName}`
        })
        .then((data) => {
            data[0].del()
            .then(() => {
                cb(null, data);
            })
            .catch((err) => {
                cb(err, null);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    });
}


exports.addRow = addRow;
exports.getRows = getRows;
exports.deleteRowsByFirstName = deleteRowsByFirstName;