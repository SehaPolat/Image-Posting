const querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

const start = (response) => {
  console.log("Request handler 'start' was called.");

  const body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
};

const upload = (response, request) => {
  console.log("Request handler 'upload' was called.");

  const form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    fs.rename(files.upload.filepath, "/tmp/test.png", function(err) {
      if (err) {
        console.log('error', err);
        //fs.unlink("/tmp/test.png");
        //fs.rename(files.upload.filepath, "/tmp/test.png");
        // this part causes the error "TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. Received undefined"
        // I don't understand it fully so I left it out.
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
};

const show = (response) => {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
};

exports.start = start;
exports.upload = upload;
exports.show = show;