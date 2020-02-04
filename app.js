var fs = require('fs');

function randomNumber() {
    return Math.floor(Math.random() * Math.pow(10, 5));
}

function genNewFileName(file_name, file_tail, file_path, cdn_path) {
    let new_file_name = file_name + randomNumber() + file_tail;
    let new_file_path = file_path + '\\' + new_file_name;
    let new_cdn_path = (cdn_path + '/' + new_file_name).replace(/\\/g, '/');

    return {
        name: new_file_name,
        local: new_file_path,
        cdn: new_cdn_path,
    };
}

function merge(path, cdn_url) {
    // 在path下生成新文件夹
    let new_folder_path = path + '\\' + randomNumber();
    fs.mkdirSync(new_folder_path);

    let json_file = JSON.parse(
        fs.readFileSync(path + '\\manifest.json', 'utf8')
    );

    let new_merge_file = genNewFileName(
        'merge',
        '.js',
        new_folder_path,
        cdn_url
    );

    let new_game_file = genNewFileName('game', '.js', new_folder_path, cdn_url);

    fs.writeFileSync(new_merge_file.local, '', 'utf8');
    json_file.initial.forEach(e => {
        let txt = fs.readFileSync(path + '\\' + e.replace(/\//g, '\\'), 'utf8');
        fs.appendFileSync(new_merge_file.local, txt + '\r\n');
    });

    fs.writeFileSync(new_game_file.local, '', 'utf8');
    json_file.game.forEach(e => {
        let txt = fs.readFileSync(path + '\\' + e.replace(/\//g, '\\'), 'utf8');
        fs.appendFileSync(new_game_file.local, txt + '\r\n');
    });

    json_file.initial = [new_merge_file.cdn];
    json_file.game = [new_game_file.cdn];

    fs.writeFileSync(
        new_folder_path + '\\manifest.json',
        JSON.stringify(json_file),
        'utf8'
    );

    console.log(`complete ${new_folder_path}`);
}

let replaceURL = 'http://xxx.xxx.com/project-name'; // "http://alicdn.herdsric.com/demo/egret-snap"

merge('./', replaceURL);
