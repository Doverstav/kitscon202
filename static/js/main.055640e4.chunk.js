(this.webpackJsonpkitscon_20_2=this.webpackJsonpkitscon_20_2||[]).push([[0],[,,,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(3),r=n.n(c),i=(n(9),n(1));n(10),n(11);function l(e){return o.a.createElement("a",{className:"Link",href:e.href},e.text)}function u(e){return o.a.createElement("div",null,o.a.createElement("h1",null,"Here's a nice lil headline!"),o.a.createElement("p",null,'Welcome home! This page should probably work as an expaliner for what this site is trying to do. I could probably bake the "Exclusive Content"-demo into this page as well.'),o.a.createElement("p",null,"Lokk at this text that is ended with a nice looking lin: ",o.a.createElement(l,{href:"/",text:"Click me!"})))}function s(e){return o.a.createElement("div",null,"Here we demo removable ads!")}function m(e){return o.a.createElement("div",null,o.a.createElement("h1",null,"Monetized Content"),o.a.createElement("p",null,"Monetize playback of your content!"))}n(12),n(13);function d(e){var t="Button ".concat(e.active?"Button-active":"");return o.a.createElement("div",{className:t,onClick:e.onClick},e.text)}function f(e){var t=Object(a.useState)(10),n=Object(i.a)(t,2),c=n[0],r=n[1],l=Object(a.useState)(!1),u=Object(i.a)(l,2),s=u[0],m=u[1],f=Object(a.useState)(""),E=Object(i.a)(f,2),p=E[0],v=E[1],b=Object(a.useRef)(),h=Object(a.useRef)(),g=Object(a.useRef)(),k=Object(a.useRef)(),z=function(){var e=new CustomEvent("monetizationprogress",{detail:{requestId:k.current,paymentPointer:b.current,amount:1,assetCode:"SEK",assetScale:3}});document.monetization.dispatchEvent(e)},C=function(e){var t=new CustomEvent(e,{detail:{requestId:k.current,paymentPointer:b.current,finalized:"monetizationstop"===e||void 0}});document.monetization.dispatchEvent(t)},M=function(){console.log("Pending WM"),j("pending"),C("monetizationpending"),console.log("Generating id"),k.current=Math.random().toString(36).substring(2)+Date.now().toString(36),h.current=setTimeout(O,1e3)},j=function(e){v(e),document.monetization.state=e},O=function(){console.log("Starting WM with id ".concat(k.current)),j("started"),C("monetizationstart"),z(),g.current=setInterval((function(){console.log("Sending money! id: ".concat(k.current)),z()}),1e3)},S=function(){"started"===p||"pending"===p?(console.log("Stopping WM"),j("stopped"),C("monetizationstop"),clearTimeout(h.current),clearInterval(g.current)):M()};return Object(a.useEffect)((function(){console.log("setting WM"),document.monetization=document.createElement("div"),j("stopped")}),[]),Object(a.useEffect)((function(){b.current=document.head.querySelector('meta[name="monetization"]').content,m(!!b.current)}),[]),o.a.createElement("div",{className:"WMSpoofer-container"},o.a.createElement("p",null,"Here we can show some status about WM"),o.a.createElement("p",null,"Web Monetization tag: ",s?"Exists":"Does not exist"),o.a.createElement("p",null,"Web Monetization is: ",p),o.a.createElement("p",null,"Maybe show money sent here, with an option to reset!"),o.a.createElement(d,{onClick:function(){return S()},text:"Click me to start/stop WM"}),o.a.createElement(d,{text:"I am another button"}),o.a.createElement("label",null,"Some slidervalue: ",c),o.a.createElement("input",{type:"range",min:"0",max:"50",value:c,onChange:function(e){return r(e.target.value)}}))}n(14);function E(e){return o.a.createElement("div",{className:"Separator"})}var p=function(){var e=Object(a.useState)("Home"),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(o.a.createElement(u,null)),l=Object(i.a)(r,2),p=l[0],v=l[1];return Object(a.useEffect)((function(){v("Ads"===n?o.a.createElement(s,null):"MonetizedContent"===n?o.a.createElement(m,null):o.a.createElement(u,null))}),[n]),o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"sidebar"},o.a.createElement(d,{onClick:function(){return c("Home")},text:"Home",active:"Home"===n}),o.a.createElement(d,{onClick:function(){return c("Ads")},text:"Ads",active:"Ads"===n}),o.a.createElement(d,{onClick:function(){return c("MonetizedContent")},text:"Monetized Content",active:"MonetizedContent"===n}),o.a.createElement(E,null),o.a.createElement(f,null)),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"content-inner"},p)))};r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(p,null)),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.055640e4.chunk.js.map