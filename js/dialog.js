/**
 * Created by Qiang(Mobro) Zhu on 2018/11/10
 * @param {Object} cfg 
 */

var Dialog = function (cfg) {
  this.config = {             
    headTitle       : '提示',     
    windowDom       : window, 
    hasMask         : true,  
    clickDomCancel  : true,  
    before          : function () {},  // 创建弹窗后的毁掉
    after           : function () {}, 
    type            : 'tips',
    content         : '提示弹框'
  }
  $.extend(this.config, cfg);

  this.init();
  return this;
}
Dialog.prototype.init = function () {
  this.const =  {
    author  : "Qiang Zhu",
    time    : "2018-11-10",
    version : "1.0.0",
    idCount : 0
  }
}
Dialog.prototype.render = function (cfg) {
  this.jqDom = {}
  var config = this.config,
    jqDom = this.jqDom
  jqDom._mask = $("<div class='hover-mask' id=" + cfg.id + "_mask></div>")
  jqDom._html = $(cfg.html)
  if (cfg.hasMask) {
    $("body").append(jqDom._mask)
    $("body #" + cfg.id + "_mask").append(jqDom._html);
  } else {
    $("body").append(config.html);
  }
  $(".dialog").on("scroll", function(e) {
    e.stopPropagation();
    $("body").scrollTop(0)
  })
  $(".dialog").on("click", function (e) {
    e.stopPropagation();
  })
  $("body").addClass("model-open")
  this.close();
  config.before && config.before()
}

Dialog.prototype.tips = function (cfg) {
  var config = this.extendCfg(cfg);
  cfg = $.extend(this.config, {type: 'tips'}, config)
  this.config.html = this.htmlModel(cfg);
  this.render(this.config);
}

Dialog.prototype.empty = function (cfg) {
  var config = this.extendCfg(cfg);
  cfg = $.extend(this.config, {type: 'introduce'}, config)
  this.config.html = this.htmlModel(cfg);
  this.render(this.config);
}

Dialog.prototype.close = function (id) {
  var _this = this
  _this.config.clickDomCancel && _this.jqDom._mask.click(function (e) {
    _this.jqDom._mask.remove()
    _this.jqDom._html.remove()
    $("body").removeClass("model-open")
    _this.const.idCount -= 1;
    _this.config.after && _this.config.after();
  })
  $("#" + _this.config.id + "_mask .dialog-close").click(function() {
    _this.jqDom._mask.remove()
    $("body").removeClass("model-open")
    _this.const.idCount -= 1;
    _this.config.after && _this.config.after();
  })
}

Dialog.prototype.idCount = function () {
  this.const.idCount += 1;
  return this.const.idCount
}

Dialog.prototype.extendCfg = function (cfg) {
  var arg = [].slice.call(arguments)[0],
    config = {};
  if (typeof cfg === 'object') {
    config.type = cfg.type;
    config.className = cfg.className ? 'dialog ' + cfg.className : 'dialog';
    config.id = cfg.id || "dialog_" + this.idCount();
  } else if (typeof cfg === 'string') {
    config.msg = cfg;

  }

  return $.extend(cfg, config)
}

Dialog.prototype.htmlModel = function (cfg) {
  var html = "";
  switch (cfg.type) {
    case "tips": 
      html = "<div class='" + cfg.className + "' id='" + cfg.id + "'>" + cfg.msg + "</div>";
      return html;
      case "empty": 
        html =   '<div class="' + cfg.className + '" id="' + cfg.id + '">' + 
          '<h2 class="dialog-title">' + cfg.headTitle + '</h2>' + 
          '<span class="dialog-close"></span>' + 
          '<div class="dialog-mask"></div>' + 
          '<div class="dialog-content">' + 
          cfg.content +
          '</div>' + 
          '</div>'
        return html;
      case "mvp": 
        html = "huodong"
        return html;
  }
}