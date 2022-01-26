var mysql = require("mysql2");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "97177akshit",
  database: "catsDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  // to create a DB (one time only)

  // db.query("CREATE DATABASE catsDB", (err, result) => {
  //   if (err) throw err;
  //   console.log("Database created");
  // });

  // to create a table (one time only)

  // var sql =
  //   "CREATE TABLE Cats (id INT AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(255), Breed VARCHAR(255), Age int, Image VARCHAR(255))";

  // db.query(sql, (err, result) => {
  //   if (err) throw err;
  //   console.log("Table created");
  // });

  // inserting  one item to table
  // var sql =
  //   "INSERT INTO Cats (Name,Breed,Age,Image) VALUES ('luna', 'first',14,'https://cdn2.thecatapi.com/images/beu.jpg')";
  // db.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });

  // inserting multiple values
  // var sql = "INSERT INTO Cats (Name, Breed,Age,Image) VALUES ?";
  // const values = [
  //   ["oliver", "second", 6, "https://cdn2.thecatapi.com/images/2IpZYS6fW.png"],
  //   ["brett", "third", 16, "https://cdn2.thecatapi.com/images/a9h.jpg"],
  //   ["siri", "fourth", 4, "https://cdn2.thecatapi.com/images/OhTkBTPnD.jpg"],
  //   ["birman", "fifth", 9, "https://cdn2.thecatapi.com/images/a3n.jpg"],
  //   ["jacky", "fifth", 6, "https://cdn2.thecatapi.com/images/k1R0x8yEc.jpg"],
  //   ["skyu", "fouth", 16, "https://cdn2.thecatapi.com/images/6d0.jpg"],
  //   ["uri", "third", 6, "https://cdn2.thecatapi.com/images/XvrmhmEoP.jpg"],
  //   ["lacy", "second", 6, "https://cdn2.thecatapi.com/images/_JgU99DS-.jpg"],
  // ];
  // db.query(sql, [values], (err, result) => {
  //   if (err) throw err;
  //   console.log("Number of records inserted: " + result.affectedRows);
  // });

  // querying items from table
  // db.query("SELECT * FROM Cats ", (err, result, fields) => {
  //   if (err) throw err;
  //   console.log("new", result);
  // });
  //   let allCats = [];
  //   db.query("SELECT * FROM Cats ", (err, result, fields) => {
  //     if (err) throw err;
  //     // console.log("new", result);
  //     allCats = result.map((item) => item);
  //     console.log(allCats);
  //   });
});
module.exports = db;
