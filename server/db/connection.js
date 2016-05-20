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

      var listTable = 'CREATE TABLE IF NOT EXISTS species_list (' +
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
      'disko INT);';

      var detailTable = 'CREATE TABLE IF NOT EXISTS species_details (' +
      'sourcedb varchar(255) NOT NULL,' +
      'species varchar(255) NOT NULL,' +
      'varvalt varchar(255),' +
      'varname varchar(255),' +
      'varval numeric(300),' +
      'weightsize varchar(255),' +
      'biofunctio varchar(255),' +
      'dimension varchar(255),' +
      'lifematrix varchar(255),' +
      'demovar varchar(255),' +
      'demovsex varchar(255),' +
      'agestage varchar(255),' +
      'sampsize varchar(255),' +
      'poptrenden varchar(255),' +
      'nyears varchar(255),' +
      'npop varchar(255),' +
      'origin varchar(255),' +
      'sex varchar(255),' +
      'quality varchar(255),' +
      'adddata varchar(255),' +
      'lifematrixlevel varchar(255),' +
      'lucnstatus varchar(255),' +
      'n_seqs INT,' +
      'gbif INT,' +
      'meanseqlen INT,' +
      'minseqlen INT,' +
      'maxseqlen INT,' +
      'genus varchar(255),' +
      '"family" varchar(255),' +
      '"order" varchar(255),' +
      '"class" varchar(255),' +
      'phylum varchar(255),' +
      'kingdom varchar(255),' +
      'colid varchar(255));';

      var query = client.query(listTable + detailTable);

      query.on('end', function(){
        console.log('species_list and species_detail tables created');
        done();
        });
      }

      query.on('error', function(err) {
        console.log('Error executing query', err);
      });

    });
   }

 module.exports.connectionString = connectionString;
 module.exports.initializeDB = initializeDB;
