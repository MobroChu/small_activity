/**
 * Created by Qiang(Mobro) Zhu on 2018/11/11
 */

/**
 * 是否是微信浏览器
 */
function isWechat () {
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
  } else {
      return false;
  }
}

/**
 * 暂停其他视频播放
 */
function stopAllVideo () {
    var videos = document.getElementsByTagName('video');
    for (var i = videos.length - 1; i >= 0; i--) {
        (function(){
            var p = i;
            videos[p].addEventListener('play',function(){
                pauseAll(p);
            })
        })()
    }
    function pauseAll(index){
        for (var j = videos.length - 1; j >= 0; j--) {
            if (j!=index) videos[j].pause();
        }
    };
}