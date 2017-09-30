//http://joashc.github.io/posts/2015-09-14-prerender-mathjax.html node script

var mjAPI = require("mathjax-node-page");
var jsdom = require("jsdom").jsdom;
var fs = require("fs");
var path = require("path");

//mjAPI.start();

var args = process.argv
var dir = args[0]


var renderMathjaxForFile = (dir, fileName, callback) => {
    var fullPath = path.join(dir, fileName);
    var html = fs.readFile(fullPath, (err, data) => {
    var document = jsdom(data);
    console.log("Rendering:", fileName);

    mjpage(
        {
          html: document.body.innerHTML,
          renderer: "CommonHTML",
          inputs: ["TeX"],
          xmlns:"svg",
          svg:true
        },
        {},
        function(result) {
            "use strict";
          document.body.innerHTML = result.html;
          var HTML = "<!DOCTYPE html>\n"
            + document.documentElement.outerHTML
                      .replace(/^(\n|\s)*/, "");
          fs.writeFileSync(fullPath, HTML);
          callback()
        }
    );

//    mjAPI.typeset(document.body.innerHTML, {
//      renderer: "CommonHTML",
//      inputs: ["TeX"],
//      xmlns:"svg",
//      svg:true
//    }, function(result) {
//      "use strict";
//      document.body.innerHTML = result.html;
//      var HTML = "<!DOCTYPE html>\n"
//        + document.documentElement.outerHTML
//                  .replace(/^(\n|\s)*/, "");
//      fs.writeFileSync(fullPath, HTML);
//      callback();
//    });
  });
};



var pages = fs.readdirSync(dir);

// Wait for all of these and the homepage
var pending = pages.length + 1;

var closeWhenDone = () => {
  pending -= 1;
  if (pending === 0) process.exit();
};

//renderMathjaxForFile("./_site/", "index.html", closeWhenDone);

pages.forEach(post => {
  renderMathjaxForFile(dir, post, closeWhenDone);
});
