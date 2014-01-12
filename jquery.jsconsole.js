var jsConsole = {
    timerNames: [],
    cssPanelBox: {
        'background-color': '#fff',
        'color': '#000',
        'border-top': '5px solid #ccc',
        'font-family': 'Courier',
        'font-size': '12px',
        'padding': '3px 3px 3px 10px',
        'position': 'fixed',
        'bottom': '0px',
        'left': '0px',
        'opacity': '1.0',
        'z-index': '10000'
    },
    cssPanelHeader: {
        'height': '18px',
        'border-bottom': '1px solid #ccc',
        'text-align': 'right',
        'font-family': 'Arial'
    },
    cssLogPanel: {
        'overflow': 'auto',
        'text-align' : 'left'
    },
    isOn: false,
    init: function () {
        if (document.getElementById("__log-panel-box") === null) {
            var layout = '<div id="__log-panel-box">' +
                        '<div id="__log-panel-header">' +
                            '<a href="javascript:void(0);" onclick="jsConsole.onOff();" id="__log-panel-menu-disable">disable</a> | ' +
                            '<a href="javascript:void(0);" onclick="jsConsole.clear();">clear</a> | ' +
                            '<a href="javascript:void(0);" id="__log-panel-menu-transparent" onclick="jsConsole.transparent();">transparent</a> | ' +
                            '<a href="javascript:void(0);" id="__log-panel-menu-minimize" onclick="jsConsole.minimize();">minimize</a> ' +
                        '</div>' +
                        '<div id="__log-panel"></div>' +
                        '</div>';

            var consolePanel = $(layout);
            $('body').append(consolePanel);
            $("#__log-panel-box").css(this.cssPanelBox).css("width", $(window).width() - 13);
            $("#__log-panel").css(this.cssLogPanel).css("height", "100px");
            $("#__log-panel-header").css(this.cssPanelHeader);
        }

        $(window).resize(function () {
            $("#__log-panel-box").css("width", $(window).width() - 13);
        });
        
        this.isOn = true;
    },
    log: function (msg, pause) {
        if (this.isOn === true) {
            $("#__log-panel").append(msg + "<br>");
            if (pause !== undefined && pause === true)
                alert("Click button to continue.");
            //Scroll to bottom of textarea to simulate console
            $("#__log-panel").scrollTop($("#__log-panel")[0].scrollHeight);
        }
    },
  now: function () {
    var performance = window.performance ||{};
    performance.now = (function () {
        return performance.now    ||
        performance.webkitNow     ||
        performance.msNow         ||
        performance.oNow          ||
        performance.mozNow        ||
        function () { return new Date().getTime(); };
    })();
    return performance.now();
  },
    time: function (sTimerName) {
      this.timerNames.push({
        sTimerName : sTimerName,
        dStartTime: this.now()
      });
    },
    timeEnd: function (sTimerName) {
      if (this.timerNames.length !== 0 ) { 
        var dEndTime = this.now();
        for (var x = 0; x< this.timerNames.length; x++) {
          if (this.timerNames[x].sTimerName === sTimerName) {
             var TimerNameEnd = dEndTime - parseInt(this.timerNames[x].dStartTime, 10);
            this.log(  JSON.stringify(this.timerNames[x].sTimerName).replace(/"/g,"") + " " + TimerNameEnd);
          }
        }
      }
    },
    enable: function () {
        this.isOn = true;
    },
    disable: function () {
        this.isOn = false;
    },
    clear: function () {
        $("#__log-panel").html("");
    },
    onOff: function () {
        if (this.isOn === false) {
            this.enable();
            $("#__log-panel-menu-disable").html("disable");
        }
        else {
            this.disable();
            $("#__log-panel-menu-disable").html("enable");

        }
    },
    transparent: function () {
        if ($("#__log-panel-box").css("opacity") === "0.5") {
            $("#__log-panel-box").css("opacity", "1.0");
            $("#__log-panel-menu-transparent").html("transparent");
        }
        else {
            $("#__log-panel-box").css("opacity", "0.5");
            $("#__log-panel-menu-transparent").html("opaque");
        }
    },
    minimize: function () {
        if ($("#__log-panel").css("display") === "block") {
            $("#__log-panel").css("display", "none");
            $("#__log-panel-menu-minimize").html("expand");
        }
        else {
            $("#__log-panel").css("display", "block");
            $("#__log-panel-menu-minimize").html("minimize");
        }
    },
    toggle: function () {
        if ($("#__log-panel-box").css("display") == "block") {
            $("#__log-panel-box").css("display", "none");
        }
        else {
            $("#__log-panel-box").css("display", "block");
        }
  }
};
