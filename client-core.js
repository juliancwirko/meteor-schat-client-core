/*!
    Autosize 3.0.14
    license: MIT
    http://www.jacklmoore.com/autosize
*/
const sChatAutosize=function(){function e(e){function t(){var t=window.getComputedStyle(e,null);c=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),v="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(v)&&(v=0),r()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,c=t,u&&(e.style.overflowY=t),i()}function i(){var t=window.pageYOffset,n=document.body.scrollTop,o=e.style.height;e.style.height="auto";var i=e.scrollHeight+v;return 0===e.scrollHeight?void(e.style.height=o):(e.style.height=i+"px",f=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function r(){var t=e.style.height;i();var o=window.getComputedStyle(e,null);if(o.height!==e.style.height?"visible"!==c&&n("visible"):"hidden"!==c&&n("hidden"),t!==e.style.height){var r=document.createEvent("Event");r.initEvent("autosize:resized",!0,!1),e.dispatchEvent(r)}}var d=void 0===arguments[1]?{}:arguments[1],a=d.setOverflowX,s=void 0===a?!0:a,l=d.setOverflowY,u=void 0===l?!0:l;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!o.has(e)){var v=null,c=null,f=e.clientWidth,h=function(){e.clientWidth!==f&&r()},p=function(t){window.removeEventListener("resize",h,!1),e.removeEventListener("input",r,!1),e.removeEventListener("keyup",r,!1),e.removeEventListener("autosize:destroy",p,!1),e.removeEventListener("autosize:update",r,!1),o["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",p,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",r,!1),window.addEventListener("resize",h,!1),e.addEventListener("input",r,!1),e.addEventListener("autosize:update",r,!1),o.add(e),s&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function t(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function n(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var o="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),i=null;return"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(i=function(e){return e},i.destroy=function(e){return e},i.update=function(e){return e}):(i=function(t,n){return t&&Array.prototype.forEach.call(t.length?t:[t],function(t){return e(t,n)}),t},i.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],t),e},i.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],n),e}),i}();

sChat = {
    settings: {
        ssl: true,
        hostName: 'localhost:3000',
        welcomeMessage: 'Hi, how can I help you?',
        labels: {
            sendPlaceholder: 'Send message...',
            headerTitle: 'SimpleChat.Support'
        }
    },
    autosize: sChatAutosize,
    init(clientAppId, configObj) {
        let self = this;
        if (_.isObject(configObj)) {
            this.settings = _.extend(this.settings, configObj);
        } else {
            throw new Meteor.Error(400, 'Config must be an object!');
        }
        let connectionType = 'https';
        if (this.settings.ssl === false) {
            connectionType = 'http';
        }
        const endpoint = connectionType + '://' + this.settings.hostName;
        this.userSessionId = Random.id();
        this.clientAppId = clientAppId;
        this.ddp = DDP.connect(endpoint);
        this.collection = new Mongo.Collection('chat', {connection: this.ddp});
        this.ddp.subscribe('Chat.messagesList', this.clientAppId, this.userSessionId);
        this.messages = this.collection.find({userSessionId: this.userSessionId}, {sort: {date: 1}});
    }
};