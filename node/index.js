//http://joashc.github.io/posts/2015-09-14-prerender-mathjax.html node script

const mjpage= require("mathjax-node-page").mjpage;
const fs = require("fs");
const path = require("path");

var args = process.argv
var dir = args[2]

//TODO Rewrite this so we process all files in one run
//TODO Add check for whether files contain MathJax
var renderMathjaxForFile = (fullPath, callback) => {
    var html = fs.readFile(fullPath, (err, data) => {
    //console.log("HTML is " + data)
    console.time("Rendering " + fullPath)
    mjpage(
        data,
        {
          format: ["TeX"],
          singleDollars: true
        },
        {
            html: true,
            css: true,
            mml: true
        },
        function(result) {
            "use strict";
          fs.writeFileSync(fullPath, result);
          console.timeEnd("Rendering " + fullPath)
          process.exit()
        }
    );
  });
};

renderMathjaxForFile(dir);

