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
      var exists;
        var query = client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'species');");

        query.on('row', function(row) {
          if(row) {
            exists = true;
          }
        });

        query.on('end', function(){
          if(exists) {
            console.log('table exists');
            done();
          } else {


        var query = client.query(
          'CREATE TABLE IF NOT EXISTS species_list(' +
          'id SERIAL PRIMARY KEY,' +
          'species varchar(255) NOT NULL,' +
          'class varchar(255) NOT NULL,' +
          'order varchar(255),' +
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

        var query = client.query("COPY csv FROM $1 WITH NULL AS 'NA' DELIMITER ',' HEADER CSV;", [process.cwd() + '/files/diskoindex.csv']);

        query.on('err', function(err) {
          console.log(err);
        });

        query.on('end', function(){
          console.log('finished copy');
          done();
        });
        done();
      });
     }
    });
   }
  });
 }
