const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");

app.use(express.static("public"));

const storageAudio = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "imagefile") {
      cb(null, "public/media/images");
    }
    if (file.fieldname == "mediafile") {
      cb(null, "public/media/audio");
    }
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, file.originalname);
  },
});
const storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "imagefile") {
      cb(null, "public/media/images");
    }
    if (file.fieldname == "mediafile") {
      cb(null, "public/media/video");
    }
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, file.originalname);
  },
});

const uploadAudio = multer({ storage: storageAudio });
const uploadVideo = multer({ storage: storageVideo });

const multipleAudio = uploadAudio.fields([
  { name: "imagefile" },
  { name: "mediafile" },
]);
const multipleVideo = uploadVideo.fields([
  { name: "imagefile" },
  { name: "mediafile" },
]);

app.post("/audio", multipleAudio, (req, res) => {
  saveJson(req.body.newjsonmedia, req.body.mediaformat);
  res.send("File uploaded");
});

app.post("/video", multipleVideo, (req, res) => {
  saveJson(req.body.newjsonmedia, req.body.mediaformat);
  res.send("File uploaded");
});

//oikea middle?
app.post("/json", multipleAudio, (req, res) => {
  console.log("toimiiko jsonin tulo?", req.body.newjson);
  console.log("toimiiko mediaformaatin tulo?", req.body.mediaformat);
  saveJson(req.body.newjson, req.body.mediaformat);
  res.send("File uploaded");
});

const saveJson = (newjson, med) => {
  console.log("JSON", newjson);
  console.log("Medialuokka", med);
  fs.writeFile(`public/${med}.json`, newjson, function (err) {
    if (err) {
      console.log("Error saving file", err);
    } else {
      console.log("JSON file saved");
    }
  });
};

app.listen(3003, () => {
  console.log(`Emmit listening on port 3003`);
});
