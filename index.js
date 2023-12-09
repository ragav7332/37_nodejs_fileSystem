// loading required modules
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3030;

app.use(cors());
app.use(express.json());
// creating time stamp for file
const currentDateStamp = `Today-Date-is-${format(
  new Date(),
  "dd-MMM-yyyy"
)}\t Current-Time-is-${format(new Date(), "HH:mm:ss")}`;

//creating variable file to store text file
let textFileInFolder = [];

// creating function for loading folder & files
const logEvents = async (currentDateStamp) => {
  const dateTime = `${format(new Date(), "dd-MMM-yyyy")}_time_${format(
    new Date(),
    "HH-mm-ss"
  )}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.writeFile(
      path.join(__dirname, "logs", `${dateTime}.txt`),
      currentDateStamp
    );
    fs.readdir(path.join(__dirname, "logs"), (err, files) => {
      if (err) {
        console.error(err);
      }
      files.forEach((file) => {
        if (path.extname(file, path.basename(file)) == ".txt") {
          textFileInFolder.push(file);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

//calling function for creating folder & file with time stamp
logEvents(currentDateStamp);

//creating endpoint
app.get("/", function (req, res) {
  res.send(textFileInFolder);
});

//creating local server for listening on port 3000
app.listen(PORT,function(err){
    if(err) {console.log("Error in server")}
    else{
        console.log(`Server listening on ${PORT} Successfully`)
    }
});