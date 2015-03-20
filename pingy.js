var Pingy = function(){
    this.currentPing = false;
    this.waitingPings = [];
    this.isReady = false;
    window.onload = (function () { this.isReady = true; this.doNextPing()}).bind(this);

    window.onerror = this.onError.bind(this);

    this.needsTimeout = true;
    var script = document.createElement("script");
    script.setAttribute("src", "http://dcuobuowcbiuwbcouiwb.dichybiu");
    script.onerror = (function(){this.needsTimeout = false;}).bind(this);
    document.head.appendChild(script);
};
Pingy.prototype.ping = function(url, callback, timeout){
    if(timeout == null) timeout = 1500;
    this.waitingPings.push([url, callback, timeout]);

    this.doNextPing();
};
Pingy.prototype.doNextPing = function(){
    if(this.currentPing == false && this.isReady){
        if(this.waitingPings.length > 0) {
            this.currentPing = this.waitingPings.pop();

            var script = document.createElement("script");
            script.setAttribute("src", this.currentPing[0]);
            script.onerror = this.timeoutPing.bind(this, this.currentPing[0]);
            document.head.appendChild(script);

            if(this.needsTimeout) {
                setTimeout(this.timeoutPing.bind(this, this.currentPing[0]), this.currentPing[2]);
            }
        }
    }
};
Pingy.prototype.timeoutPing = function(url){
    if(this.currentPing && this.currentPing[0] == url){
        this.currentPing[1](false);
        this.currentPing = false;
        this.doNextPing();
    }
};
Pingy.prototype.usesTimeout = function(){
    return this.needsTimeout;
};
Pingy.prototype.onError = function(errorMsg, url, lineNumber){
    if(errorMsg == "Script error." && lineNumber == 0 && this.currentPing){
        this.currentPing[1](true);
        this.currentPing = false;
        this.doNextPing();
    }
};
var pingy = new Pingy();