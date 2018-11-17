$(function() {
  var current = null;
  var x = true;
  $(".opus-list").on("touchend", "video", function () {
    if (!x) {
      x = true;
      return
    }
    if (isWechat()) {
      $("video").parent().removeClass("full-screen")
      $(this).parent().addClass("full-screen")
      stopAllVideo();
      var media = $(this).get(0);
      media.loop = true;
      if ($(this)[0].currentSrc != current) {
        media.play();
        current = $(this)[0].currentSrc;
      } else {
        media.pause()
        current = null
      }
    } else {
      // 非微信浏览器
      // todo
      alert("非微信浏览器")
    }
  })
  var fedialog = new Dialog()

  // 按钮事件
  var introduce = $("#introduce").html().toString();
  var mvp = $("#mvp").html().toString()
  var friends = $("#friends").html().toString();
  $(".btns-box").on("touchend", function (e) {
    if (!x) {
      x = true;
      return
    }
    var tar = $(e.target)
    if (tar.hasClass("introduce")) {
      // 活动介绍
      fedialog.empty({
        className: 'doc-article',
        type: 'empty',
        headTitle: '活动介绍',
        content: introduce,
        before: function () {
          console.log(11)
        },
        after: function () {
          x = true;
        }
      })
    } else if (tar.hasClass("video")) {
      // 视频题材
      fedialog.empty({
        className: 'doc-article',
        type: 'empty',
        headTitle: '视频题材',
        content: introduce,
        before: function () {
          console.log(11)
        },
        after: function () {
          x = true;
        }
      })
    } else if (tar.hasClass("process")) {
      // 评选流程
      fedialog.empty({
        className: 'doc-article',
        type: 'empty',
        headTitle: '评选流程',
        content: introduce,
        before: function () {
          console.log(11)
        },
        after: function () {
          x = true;
        }
      })
    } else if (tar.hasClass("award")) {
      // 活动奖励
      fedialog.empty({
        className: 'doc-article',
        type: 'empty',
        headTitle: '活动奖励',
        content: introduce,
        before: function () {
          console.log(11)
        },
        after: function () {
          x = true;
        }
      })
    } else if (tar.hasClass("mvp")) {
      // 最新排名
      fedialog.empty({
        className: 'mvp',
        type: 'empty',
        headTitle: '最新排名',
        content: mvp,
        before: function () {
          $(".nav li").on("touchend", function (e) {
            e.stopPropagation()
            e.cancelBubble = true;
            $(this).addClass("active")
            .siblings().removeClass("active")

            var data = { bool: "children" }
            if ($(e.target).hasClass("children")) {
              data = {
                bool: "children"
              }
            } else {
              data = {
                bool: "teen"
              }
            }
            appendHtml(data)
          })
          appendHtml({ bool: "children" })
          function appendHtml(data) {
            $.ajax({
              url: "./data/a.json",
              method: "get",
              data: data,
              success: function (suc) {
                var str = "";
                var arr = suc[data.bool];
                for (var i = 0; i < arr.length; i++) {
                  str += arr[i].html
                }
                $(".tbody table").html("").append(str)
              }
            })
          }
        },
        after: function () {
          x = true;
        }
      })
    } else if (tar.hasClass("contrbute")) {
      // 亲友贡献榜
      fedialog.empty({
        className: 'friends',
        type: 'empty',
        headTitle: '亲友贡献榜',
        content: friends,
        before: function () {
          console.log(11)
        },
        after: function () {
          x = true;
        }
      })
    }
  })

  // 底部两个按钮
  $(".share-btns").on("touchend", ".share", function (e) {
    if (!x) {
      x = true;
      return
    }
    alert("立即分享")
  })
  $(".share-btns").on("touchend", ".register", function (e) {
    if (!x) {
      x = true;
      return
    }
    alert("我要报名")
  })

  // 搜索
  $(".search").on("touchend", function (e) {
    if (!x) {
      x = true;
      return
    }
    alert('搜索...')
  })

  var startx, starty;
  //获得角度
  function getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI;
  };

  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  function getDirection(startx, starty, endx, endy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;

      //如果滑动距离太短
      if (Math.abs(angx) < 4 && Math.abs(angy) < 4) {
          return result;
      }

      var angle = getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
          result = 1;
      } else if (angle > 45 && angle < 135) {
          result = 2;
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3;
      } else if (angle >= -45 && angle <= 45) {
          result = 4;
      }

      return result;
  }
  //手指接触屏幕
  document.addEventListener("touchstart", function(e) {
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
  }, false);
  document.addEventListener("touchmove", function (e) {
    var disX = e.touches[0].pageX;
    var disY = e.touches[0].pageY;
    if (disX > 20 || disY > 20) {
      x = false;
    }

  })
  //手指离开屏幕
  var count = 2,    // 每次加载多少个
    start = 0,  // 有默认的两个，并不知道你们接口是怎么设置的，这里需要你根据接口自己调整的。
    end = start + count,
    isLoad = true;
  document.addEventListener("touchend", function(e) {
      var endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      var direction = getDirection(startx, starty, endx, endy);
      if (
        direction === 1 && 
        window.screen.height + document.body.scrollTop >= document.body.scrollHeight &&
        isLoad
      ) {
        getVideo(end)
      }
  }, false);
  getVideo(0)
  function getVideo () {
    $.ajax({
      type: 'GET',
      url: './data/video.json',
      dataType: 'json',
      success: function(res){
        res = res.list
        var str = '';
        for (var i = start; i < end; i++) {
          str += '<li class="opus-item fl"><video width="100%" height="100%" src="' + 
            res[i].src + '" poster="' + 
            res[i].cover + '"></video><div class="opus-desp clearfix">  <h2 class="opus-desp-title">' + 
            res[i].title + '</h2>  <p class="opus-desp-plays fl">    <em class="icon"></em>    <i class="number">' + 
            res[i].plays + '</i>    <span>次播放</span>  </p>  <i class="thumbs fr">' + 
            res[i].thumbs + '赞</i></div></li>'
        }
        $(".opus-list").append(str);
        start = end;
        end = res.length - 1 - start >= count ? start + count : res.length - 1;
        if (end >= res.length - 1) {
          console.log("没有更多数据了。")
          end = res.length - 1
        }
      },
      error: function (res) {
        console.error(res)
      }
    })
  }
})