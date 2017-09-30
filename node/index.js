//http://joashc.github.io/posts/2015-09-14-prerender-mathjax.html node script

const mjpage= require("mathjax-node-page").mjpage;
const jsdom = require("jsdom").jsdom;
const fs = require("fs");
const path = require("path");

//mjAPI.start();

var args = process.argv
var dir = args[2]


var renderMathjaxForFile = (fullPath, callback) => {
    //var fullPath = path.join(dir, fileName);
    var html = fs.readFile(fullPath, (err, data) => {
    var document = jsdom(data);
    console.log("Rendering:", fullPath);
    //console.log("HTML is " + data)
    mjpage(
        document.body.innerHTML,
        {
          renderer: "CommonHTML",
          inputs: ["TeX"],
          xmlns:"svg",
          svg:true
        },
        {svg: true},
        function(result) {
            "use strict";
            //console.log("Result is " + result)
//          document.body.innerHTML = result.html;
//          var HTML = "<!DOCTYPE html>\n"
//            + document.documentElement.outerHTML
//                      .replace(/^(\n|\s)*/, "");
          fs.writeFileSync(fullPath, result);
          process.exit()
        }
    );
  });
};

renderMathjaxForFile(dir);

//var pages = fs.readdirSync(dir);

// Wait for all of these and the homepage
//var pending = pages.length + 1;

//var closeWhenDone = () => {
//  pending -= 1;
//  if (pending === 0) process.exit();
//};

//renderMathjaxForFile("./_site/", "index.html", closeWhenDone);

//pages.forEach(post => {
//  renderMathjaxForFile(dir, post, closeWhenDone);
//});
