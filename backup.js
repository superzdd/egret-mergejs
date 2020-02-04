// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require("express");
var fs = require("fs");
var http = require("http");
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express();

app.get("/", function(req, res) {
  //   let path = req.query.p;
  //   if (!path) {
  //     res.send("no path");
  //   }

  //   path = path.replace(/\//g, "\\");

  let new_folder_name = "" + Math.floor(Math.random() * Math.pow(10, 5));
  let new_folder_path = path + "\\" + new_folder_name;
  fs.mkdirSync(new_folder_path);

  let manifest_json =
    "D:\\dev\\illy-pacman\\code\\trunk\\illy-pacman\\bin-release\\web\\180821193055\\manifest.json"; // let manifest_json = p + '\\manifest.json';
  // let path = manifest_json;;
  let cdn_url = "https://miniapp.herdsric.com/dfsdemo/";

  let json_file = JSON.parse(fs.readFileSync(manifest_json, "utf8"));

  let new_merge_file =
    "merge" + Math.floor(Math.random() * Math.pow(10, 5)) + ".js";
  let new_merge_path = new_folder_path + "\\" + new_merge_file;
  let new_cdn_merge_path = (cdn_url + new_merge_file).replace(/\\/g, "/");

  let new_game_file =
    "game" + Math.floor(Math.random() * Math.pow(10, 5)) + ".js";
  let new_game_path = new_folder_path + "\\" + new_game_file;
  let new_cdn_game_path = (cdn_url + new_game_file).replace(/\\/g, "/");

  fs.writeFileSync(new_merge_path, "", "utf8");
  json_file.initial.forEach(e => {
    let txt = fs.readFileSync(path + "\\" + e.replace(/\//g, "\\"), "utf8");
    fs.appendFileSync(new_cdn_merge_path, txt + "\r\n");
  });

  fs.writeFileSync(new_game_path, "", "utf8");
  json_file.game.forEach(e => {
    let txt = fs.readFileSync(path + "\\" + e.replace(/\//g, "\\"), "utf8");
    fs.appendFileSync(new_cdn_game_path, txt + "\r\n");
  });

  json_file.initial = [new_merge_file];
  json_file.game = [new_game_file];

  fs.writeFileSync(
    new_folder_path + "\\manifest.json",
    JSON.stringify(json_file),
    "utf8"
  );

  res.send("complete");
});

app.get("/test", function(req, res) {
  let t = req.query.t;
  console.log("receive a test, t: " + t);
  res.send("receive test");
});

app.listen(3000, function() {
  console.log("app is listening at port 3000");
});
