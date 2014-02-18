var ScreenBrightness = function() {
    
}

ScreenBrightness.prototype.SetScreenBrightness = function(phnum) {
    console.log("values: "+phnum);
    cordova.exec(null, null, "ScreenBrightness", "SetScreenBrightness",[{"number":phnum}]);
    //console.log("values: "+phnum)
    //cordova.exec(null, null, "ScreenBrightness",[phnum]);
};

if(!window.plugins) {
    window.plugins = {};
}
if(!window.plugins.ScreenBrightness) {
    window.plugins.ScreenBrightness = new ScreenBrightness();
}

