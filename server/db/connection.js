var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  console.log('environment var');
  connectionString = process.env.DATABASE_URL;
} else {
  console.log('local var');
  connectionString = "postgres://localhost:5432/disko";
}

function initializeDB(){
  pg.connect(connectionString, function(err, client,done){
    console.log('connected to pg');
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {

        var query = client.query(
          'CREATE TABLE IF NOT EXISTS species_list(' +
          'id SERIAL PRIMARY KEY,' +
          'species varchar(255) NOT NULL,' +
          '"class" varchar(255) NOT NULL,' +
          '"order" varchar(255),' +
          '"family" varchar(255),' +
          'colid varchar(255),' +
          'gbif INT,' +
          'iucnStatus varchar(255),' +
          'n_seqs INT,' +
          'meanseqlen INT,' +
          'minseqlen INT,' +
          'maxseqlen INT,' +
          'inZoo INT,' +
          'survind INT,' +
          'fertind INT,' +
          'disko INT);'
        );
      query.on('end', function(){
        console.log('species_list table created');

        done();
      });
    }
    });
   }

 

 module.exports.connectionString = connectionString;
 module.exports.initializeDB = initializeDB;
