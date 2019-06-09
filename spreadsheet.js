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


exports.addRow = addRow;