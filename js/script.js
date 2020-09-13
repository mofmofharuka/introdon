const targetDir = "C:/Users/mofmo/Dropbox/ミュージック/"; //楽曲フォルダ
const artists = "ブリーフ & トランクス,ブリーフ&トランクス,ブリーフ＆トランクス"; //アーティスト名　カンマ区切り
const playExts = "mp3,m4a"; //音楽再生可能な拡張子

var fso = new ActiveXObject("Scripting.FileSystemObject"); //ファイル検索
var artistsArr = artists.split(","); //アーティスト名の配列
var songsArr = getSongsArr(); //楽曲パスの配列を取得する

//乱数を求める
var myRnd = Math.floor(Math.random() * songsArr.length);
//index番号を指定して、audio要素内の楽曲要素を取得する
var song = new Audio(songsArr[myRnd]);
//曲名を取得する
var songName = fso.GetFileName(songsArr[myRnd]);

//ボタンをクリックしたとき、音が出る
function onDonButtonClick(sec) {
    //再生
    song.play();
    //1秒後、音を止める
    setTimeout("stop(song)", sec * 1000);

}

//ボタンをクリックしたとき、答えが出る
function onAnswerButtonClick() {
    var answer = document.getElementById("answer");

    answer.insertAdjacentHTML('afterbegin', songName);

}

//楽曲のパスを取得する
function getSongsArr() {
    var songsArr = new Array(); //楽曲パスの配列

    //アーティスト名ごと検索する
    for(var i = 0; i < artistsArr.length; i++) {
        //楽曲のパスを取得し、配列に追加する
        var albums = new Enumerator((fso.GetFolder(targetDir + artistsArr[i])).SubFolders);
       
        for (; !albums.atEnd(); albums.moveNext()) {
            var songs = new Enumerator((fso.GetFolder(albums.item().Path)).Files);

            for (; !songs.atEnd(); songs.moveNext()) {
                var song = songs.item().Path;
                
                if(canPlay(song)) {
                    songsArr.push(song);

                } else {

                }

            }
            
        }
    
    }

    return songsArr;

}

//拡張子がmp3またはm4aであればtrueを返す
function canPlay(filename) {
    var ext = getExt(filename); //拡張子を取得する
    var playExtsArr = playExts.split(","); //音楽再生可能な拡張子

    for(var i = 0; i < playExtsArr.length; i++) {
        if(ext == playExtsArr[i]) {
            return true;

        }

    }

    return false;

}

//ファイル名から拡張子を取得する
function getExt(filename) {
    var pos = filename.lastIndexOf('.');
    
    if (pos === -1) return '';
    
    return filename.slice(pos + 1);
    
}

//index番号で指定した要素を取得する
var eq = function(selector, index) {
    var nodeList = document.querySelectorAll(selector),
        length = nodeList.length;
    
    if (0 < index && index < length) {
      return nodeList[index];
    }
    
    if (0 <= length + index) {
      return nodeList[length + index];
    }
    
    return null;

};

//音を止める
function stop(song) {
    //音を一時停止する
    song.pause();
    //再生位置を先頭にする
    song.currentTime = 0;

}