!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0),n(1);var r=function(t){return Element.prototype.closest||function(e){let n=this;for(;n;){if(t.call(n,e))return n;n=n.parentElement}return null}}(function(){const t=Element.prototype;return t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector}());function a(t,e){var n=t.target;return n instanceof Element?r.call(n,e):null}var o=document,i="http://www.w3.org/2000/svg";function c(t,e,n){var r=e?o.createElementNS(i,t):o.createElement(t);return"svg"===t&&r.setAttribute("xmlns",i),n&&n.forEach((function(t){r.classList.add(t)})),r}function l(t,e){e=e.toString(),t.style.transform=e,t.setAttribute("transform","none"!==e?e:"")}function s(t){return Array.prototype.slice.call(t)}function u(t,e){var n="DOMPoint"in window?new DOMPoint:{};return n.x=t||0,n.y=e||0,n}function h(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function f(t,e){return u(t.x*e.a+t.y*e.c+e.e,t.x*e.b+t.y*e.d+e.f)}function d(t){var e=u();return t.forEach((function(t){e.x+=t.x,e.y+=t.y})),e.x/=t.length,e.y/=t.length,e}function g(t){var e=[];return t.forEach((function(t){e.push([Math.round(t.x),Math.round(t.y)].join(","))})),e}function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){a=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function y(t,e,n,r){var a="DOMRect"in window?new DOMRect:{};return a.x=t||0,a.y=e||0,a.width=n||0,a.height=r||0,a}function x(t){return[u(t.x,t.y),u(t.x+t.width,t.y),u(t.x+t.width,t.y+t.height),u(t.x,t.y+t.height)]}function m(t){var e={},n=[["x",function(t){return t.x}],["y",function(t){return t.y}],["x2",function(t){return t.x+t.width}],["y2",function(t){return t.y+t.height}]];return t.forEach((function(t){var r=t.getBoundingClientRect();n.forEach((function(t){var n=p(t,2),a=n[0],o=(0,n[1])(r);(void 0===e[a]||o<e[a])&&(e[a]=o)}))})),y(e.x,e.y,e.x2-e.x,e.y2-e.y)}function _(t){return new(window.DOMMatrix||window.WebKitCSSMatrix||window.MSCSSMatrix)(t)}function b(t){var e=getComputedStyle(t).transform;if("none"!==e)return _(e);var n=t.transform.baseVal.consolidate();return(n=n&&n.matrix)?_([n.a,n.b,n.c,n.d,n.e,n.f]):_()}function E(t,e){var n=t.root.getBoundingClientRect();return void 0!==e.width?y(e.x-n.x,e.y-n.y,e.width,e.height):u(e.x-n.x,e.y-n.y)}function H(t,e){var n=t.root.getBoundingClientRect();return void 0!==e.width?y(e.x+n.x,e.y+n.y,e.width,e.height):u(e.x+n.x,e.y+n.y)}function w(t,e){var n,r,a=t.svg.viewBox.baseVal,o=t.root.viewBox.baseVal,i=a.width/a.height;o.width/o.height>i?(n=i*o.height,r=o.height):(n=o.width,r=o.width/i);var c=(o.width-n)/2,l=(o.height-r)/2,s=a.width/n,h=a.height/r;return void 0!==e.width?y((e.x-c)*s,(e.y-l)*h,e.width*s,e.height*h):u((e.x-c)*s,(e.y-l)*h)}function A(t,e){return w(t,E(t,e))}function M(t){var e;0!==t.selection.length?(e=1===t.selection.length?N(t,t.selection[0]):function(t){var e=m(t.selection);return x(e=E(t,e))}(t),t.helperPoints=e,C(t,e)):t.helperPoints=[]}function S(t){t.helper&&(t.helpers.removeChild(t.helper),t.helper=null)}function N(t,e,n){var r=x((n||e).getBBox()),a=b(e);return r.forEach((function(e,n){e=f(e,a),e=function(t,e){var n,r,a=t.svg.viewBox.baseVal,o=t.root.viewBox.baseVal,i=a.width/a.height;o.width/o.height>i?(n=i*o.height,r=o.height):(n=o.width,r=o.width/i);var c=(o.width-n)/2,l=(o.height-r)/2,s=a.width/n,h=a.height/r;return void 0!==e.width?y(e.x/s+c,e.y/h+l,e.width/s,e.height/h):u(e.x/s+c,e.y/h+l)}(t,e),r[n]=e})),r}function C(t,e){if(!Y.createHelper)throw new Error("createHelper is not set");var n=Y.createHelper(t,e);t.helper=n,t.helpers.appendChild(n)}var T=document,L=null;function P(t){var e=a(t,"."+Y.base),n=e&&ot.getInstance(e);n&&function(t,e){var n="."+Y.base,r=null;a(t,"".concat(n,"__move"))&&(r=Z);a(t,"".concat(n,"__rotate"))&&(r=I);a(t,"".concat(n,"__scale"))&&(r=R);var o={operation:r,event:t,params:{}},i=e.triggerEvent("DragStart",o);r=o.operation,!i&&r&&(t.preventDefault(),L={editor:e,start:B(t),operation:r,params:o.params})}(t,n)}function O(t){L&&function(t){var e=L.editor;L.current=B(t);var n={operation:L.operation,event:t,params:{}};e.triggerEvent("Drag",n),Object.assign(L.params,n.params),L.operation(t,L);var r=t.target;L.saveTarget||(L.saveTarget=r,r.style.visibility="hidden",document.body.appendChild(r))}(t)}function V(t){L&&function(t){var e=L.editor;L.current=B(t),e.historyPush&&L.matrix&&e.historyPush({undo:X,redo:q,prev:L.matrix,next:j()});var n={event:t,operation:L.operation,params:{}},r=e.triggerEvent("DragEnd",n);Object.assign(L.params,n.params),L.operation(t,L),!r&&e.refreshHelper();var a=L.saveTarget;a&&a.parentNode.removeChild(a);e.triggerEvent("DragComplete",n),L=null}(t)}function B(t){var e=t.changedTouches,n=e&&e[0]?e[0]:t;return u(n.clientX,n.clientY)}function Z(){var t=L.editor,e=L.current.x-L.start.x,n=L.current.y-L.start.y,r=w(t,y(0,0,e,n));D(),t.selection.forEach((function(t){var e=L.matrix.get(t);l(t,e=_().translateSelf(r.width,r.height).multiplySelf(e))})),k(t,_().translateSelf(e,n))}function I(){var t=L.editor,e=d(t.helperPoints),n=H(t,e),r=w(t,e),a=Math.atan2(n.y-L.current.y,L.current.x-n.x);(a-=Math.atan2(n.y-L.start.y,L.start.x-n.x))<-Math.PI&&(a+=2*Math.PI),D(),t.selection.forEach((function(t){var e=L.matrix.get(t);l(t,e=_().translateSelf(r.x,r.y).rotateSelf(180*-a/Math.PI).translateSelf(-r.x,-r.y).multiplySelf(e))})),k(t,_().translateSelf(e.x,e.y).rotateSelf(180*-a/Math.PI).translateSelf(-e.x,-e.y))}function R(){var t,e,n,r=L.editor,a=d(r.helperPoints),o=H(r,a),i=w(r,a);if(D(),L.params.changeAspectRatio){if(1===r.selection.length){var c=L.matrix.get(r.selection[0]);n=180*Math.atan2(-c.b,c.a)/Math.PI}else n=0;var s=_().rotateSelf(n).translateSelf(-o.x,-o.y),u=f(L.current,s),g=f(L.start,s);t=u.x/g.x,e=u.y/g.y}else{var p=h(L.current,o),v=h(L.start,o);t=e=p/v,n=0}r.selection.forEach((function(r){var a=L.matrix.get(r);l(r,a=_().translateSelf(i.x,i.y).rotateSelf(-n).scaleSelf(t,e).rotateSelf(n).translateSelf(-i.x,-i.y).multiplySelf(a))})),k(r,_().translateSelf(a.x,a.y).rotateSelf(-n).scaleSelf(t,e).rotateSelf(n).translateSelf(-a.x,-a.y))}function j(t){var e=new Map;return(t||L.editor.selection).forEach((function(t){e.set(t,b(t))})),e}function D(){L.matrix||(L.matrix=j())}function k(t,e){S(t);var n=t.helperPoints.slice();n.forEach((function(t,r){n[r]=f(t,e)})),C(t,n)}function U(t,e,n){var r=j(e);e.forEach((function(t){l(t,_().multiplySelf(n).multiplySelf(r.get(t)))})),t.historyPush&&t.historyPush({undo:X,redo:q,prev:r,next:j(e)}),t.refreshHelper()}function X(t,e){e.prev.forEach((function(t,e){l(e,t)})),t.refreshHelper()}function q(t,e){e.next.forEach((function(t,e){l(e,t)})),t.refreshHelper()}function z(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function W(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var F=document,K=new Map,Y={base:"sse",createHelper:null};function $(t,e,n){var r=new CustomEvent(Y.base+e,{bubbles:!0,cancelable:!0,detail:Object.assign(n||{},{editor:t})});return t.root.dispatchEvent(r),r.defaultPrevented}function G(t,e){var n=Y.base;t.svg=e;var r=t.root=c("svg",!0,[n]);e.parentNode.replaceChild(t.root,e),r.appendChild(e),t.helpers=c("g",!0,["".concat(n,"__helpers")]),r.appendChild(t.helpers)}function J(t){var e=t.getBoundingClientRect();t.setAttribute("viewBox","0 0 ".concat(e.width," ").concat(e.height))}function Q(t,e){e.list.forEach((function(t){t.parent.insertBefore(t.element,t.before)})),t.selectElement(null),t.refreshHelper()}function tt(t,e){e.list.forEach((function(t){var e=t.element;e.parentNode.removeChild(e)})),t.selectElement(null),t.refreshHelper()}function et(){var t=F.addEventListener;t.call(F,"click",nt),t.call(F,"mousedown",rt),t.call(F,"touchstart",rt),t.call(window,"resize",at),function(){var t=T.addEventListener;t.call(T,"mousedown",P),t.call(T,"mousemove",O),t.call(T,"mouseup",V),t.call(T,"touchstart",P,{passive:!1}),t.call(T,"touchmove",O,!0),t.call(T,"touchend",V,!0)}()}function nt(t){var e="."+Y.base,n=a(t,e),r=n&&ot.getInstance(n);r&&(n=a(t,"".concat(e,"__delete")))&&r.deleteSelection()}function rt(t){var e=Y.base,n=a(t,"."+e),r=n&&ot.getInstance(n);if(r){var o=t.target;if(r.svg.contains(o)){"tspan"===o.nodeName&&(o=o.closest("text"));var i="data-".concat(e,"-editable"),c=o.closest("[".concat(i,"]"));"true"===(c=c&&c.getAttribute(i))||"1"===c?o.closest("foreignObject")||r.selectElement(o):r.selectElement(null)}o===n&&r.selectElement(null)}}function at(){K.forEach((function(t){J(t.root),t.refreshHelper()}))}var ot=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};z(this,t),G(this,e),K.set(this.root,this),this.helper=null,this.selection=[],et(),J(this.root),$(this,"Inited",n)}var e,n,r;return e=t,r=[{key:"getInstance",value:function(t){return K.get(t)}}],(n=[{key:"refresh",value:function(){J(this.root)}},{key:"destroy",value:function(){K.delete(this.root),this.root.parentNode.replaceChild(this.svg,this.root)}},{key:"triggerEvent",value:function(t,e){return $(this,t,e)}},{key:"selectElement",value:function(t){var e=t?[t]:[];$(this,"Select",{cur:this.selection,new:e})||(this.selection=e,this.refreshHelper())}},{key:"refreshHelper",value:function(){$(this,"RefreshHelper")||(S(this),M(this))}},{key:"transformElements",value:function(t,e){U(editor,t,e)}},{key:"transformSelection",value:function(t){U(editor,editor.selection,t)}},{key:"deleteElements",value:function(t){S(this);var e=[];t.forEach((function(t){e.push({element:t,parent:t.parentNode,before:t.nextSibling}),t.parentNode.removeChild(t)})),e=e.sort((function(t,e){return e.nextSibling===t?1:0})),this.historyPush&&this.historyPush({undo:Q,redo:tt,list:e}),this.selection=this.selection.filter((function(e){return-1===t.indexOf(e)})),this.refreshHelper()}},{key:"deleteSelection",value:function(){this.deleteElements(this.selection)}}])&&W(e.prototype,n),r&&W(e,r),t}();Y.createHelper=function(t,e){var n=Y.base,r=c("g",!0,["".concat(n,"__helper")]),a=g(e);e=function(t,e,n){var r=Math,a=r.atan2(t[0].y-t[1].y,t[1].x-t[0].x),o=r.max(h(t[1],t[0]),h(t[3],t[0]));o=r.min(r.max(e-o/2,0),n);var i=Math.PI/4,c=function(t,e){return u(t.x+o*r.cos(a+i*e),t.y-o*r.sin(a+i*e))},l=[];return l.push(c(t[0],3)),l.push(c(t[1],1)),l.push(c(t[2],-1)),l.push(c(t[3],-3)),l}(e,24,8);var o=t.selection[0],i='<polygon class="'.concat(n,"__rect ").concat(n,'__move" points="').concat(a.join(" "),'"/><g class="').concat(n,"__act _rotate ").concat(n,'__rotate"><circle cx="').concat(e[0].x,'" cy="').concat(e[0].y,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(e[0].x,"px,").concat(e[0].y,'px)"><path d="M4.75-3V-.75a0,0,0,0,1,0,0,.13.13,0,0,1,0,.06.09.09,0,0,1,0,.05s0,0,0,0h0l-.06,0a0,0,0,0,1,0,0H2.25A.25.25,0,0,1,2-.75.25.25,0,0,1,2.25-1H3.87L2.59-2.2A3.13,3.13,0,0,0,.82-3.09a3.08,3.08,0,0,0-1.95.36A3.09,3.09,0,0,0-2.47-1.28a3.11,3.11,0,0,0-.2,2,3.14,3.14,0,0,0,1,1.7A3.15,3.15,0,0,0,.2,3.12,3.11,3.11,0,0,0,2.11,2.6,3.07,3.07,0,0,0,3.32,1,.25.25,0,0,1,3.64.89a.26.26,0,0,1,.16.32A3.63,3.63,0,0,1,2.38,3a3.68,3.68,0,0,1-2,.61H.17A3.74,3.74,0,0,1-2,2.77,3.7,3.7,0,0,1-3.16.8a3.65,3.65,0,0,1,.23-2.28A3.56,3.56,0,0,1-1.37-3.17,3.62,3.62,0,0,1,.89-3.59a3.66,3.66,0,0,1,2.05,1L4.25-1.33V-3a.25.25,0,0,1,.25-.25A.25.25,0,0,1,4.75-3Z"/></g></g><g class="').concat(n,"__act _delete ").concat(n,'__delete"><circle cx="').concat(e[1].x,'" cy="').concat(e[1].y,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(e[1].x,"px,").concat(e[1].y,'px)"><path d="M.35,0,2.43-2.07a.27.27,0,0,0,0-.36.27.27,0,0,0-.36,0L0-.35-2.07-2.43a.27.27,0,0,0-.36,0,.27.27,0,0,0,0,.36L-.35,0-2.43,2.07a.27.27,0,0,0,0,.36.26.26,0,0,0,.18.07.26.26,0,0,0,.18-.07L0,.35,2.07,2.43a.27.27,0,0,0,.36,0,.27.27,0,0,0,0-.36Z"/></g></g><g class="').concat(n,"__act _scale ").concat(n,'__scale"><circle cx="').concat(e[2].x,'" cy="').concat(e[2].y,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(e[2].x,"px,").concat(e[2].y,'px)"><path d="M3.63,3.38a.29.29,0,0,1,0,.09.32.32,0,0,1-.14.14l-.09,0H1.13a.25.25,0,0,1-.25-.25.25.25,0,0,1,.25-.25H2.77L.57.93a.27.27,0,0,1,0-.36.27.27,0,0,1,.36,0l2.2,2.2V1.13A.25.25,0,0,1,3.38.88a.25.25,0,0,1,.25.25Zm-6.4-6.51h1.64a.25.25,0,0,0,.25-.25.25.25,0,0,0-.25-.25H-3.38l-.09,0a.32.32,0,0,0-.14.14.29.29,0,0,0,0,.09v2.25a.25.25,0,0,0,.25.25.25.25,0,0,0,.25-.25V-2.77l2.2,2.2A.26.26,0,0,0-.75-.5.26.26,0,0,0-.57-.57a.27.27,0,0,0,0-.36Z"/></g></g>');return o&&"text"===o.nodeName&&(i+='<g class="'.concat(n,"__act _text ").concat(n,'__text"><circle cx="').concat(e[3].x,'" cy="').concat(e[3].y,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(e[3].x,"px,").concat(e[3].y,'px)"><path d="M-1.5,3.63H-3.38a.26.26,0,0,1-.25-.25V1.5a.25.25,0,0,1,.08-.18L1.32-3.55a.25.25,0,0,1,.36,0L3.55-1.68a.25.25,0,0,1,0,.36L-1.32,3.55A.25.25,0,0,1-1.5,3.63Zm-1.63-.5H-1.6L3-1.5,1.5-3-3.13,1.6Z"/></g></g>')),r.innerHTML=i,r};var it,ct,lt=document,st=navigator.vendor&&navigator.vendor.indexOf("Apple")>-1;function ut(t){var e="."+Y.base,n=a(t,e),r=n&&ot.getInstance(n);r&&(n=a(t,"".concat(e,"__text")))&&function(t){var e=t.selection[0];e&&"text"===e.nodeName&&(!function(t,e){var n=Y.base,r=e.getBBox(),a=c("g",!0,["".concat(n,"__foreign")]),o=c("foreignObject",!0);["x","y","width","height"].forEach((function(t){o.setAttribute(t,r[t])}));var i=c("span",!1,["".concat(n,"__textarea")]);(function(t,e){e.innerHTML=t.innerHTML,function t(e){if("TSPAN"===e.nodeName)if("1em"===e.getAttribute("dy"))e.insertAdjacentHTML("afterend","<br/>"+e.innerHTML),e.parentNode.removeChild(e),e.innerHTML="";else{for(var n=document.createElement("span"),r=["x","y","dx","dy","fill"],a=0,o=e.attributes.length;a<o;a++){var i=e.attributes[a];-1===r.indexOf(i.name)&&n.setAttribute(i.name,i.value),"fill"===i.name&&(n.style.color=i.value)}e.style.fill&&(n.style.color=e.style.fill),n.innerHTML=e.innerHTML,e.parentNode.replaceChild(n,e),e=n}for(var c=0;c<e.childNodes.length;c++)t(e.childNodes[c])}(e)})(e,i),i.contentEditable=!0;var u=getComputedStyle(e),h=getComputedStyle(e.parentNode),f=["letter-spacing","opacity"];Object.values(u).forEach((function(t){"font-"!==t.slice(0,5)&&-1===f.indexOf(t)||u[t]!==h[t]&&(i.style[t]=u[t])})),a.appendChild(o),o.appendChild(i),e.insertAdjacentElement("afterend",a),function t(e){if("BR"===e.nodeName){var n=e.nextSibling,r=vt(n);if(r)e.parentNode.removeChild(e),vt(n).y!==r.y&&n.parentNode.insertBefore(e,n)}s(e.childNodes).forEach((function(e){t(e)}))}(i),l(a,u.transform),e.style.display="none",function(t){t.focus();var e=document.createRange();e.selectNodeContents(t);var n=window.getSelection();n.removeAllRanges(),n.addRange(e)}(i),t.foreign=o,t.textarea=i,t.text=e,t.triggerEvent("TextEdit")}(t,e),S(t),yt(t))}(r)}function ht(t){var e="."+Y.base,n=a(t,e),r=n&&ot.getInstance(n);r&&(t.target.closest("".concat(e,"__textarea"))&&xt(r))}function ft(t){var e=t.detail.editor;e.foreign&&function(t){var e=t.foreign,n=t.textarea,r=t.text,a=r.innerHTML,o=e.parentNode;l(o,""),function t(e){if(e.nodeType===Node.TEXT_NODE){var n=!1,r=null;s(pt(e)).forEach((function(t){null!==r&&t.y>r&&(n=!0),r=t.y})),n&&function(t){for(var e,n,r=t.textContent,a=lt.createRange(),o=[],i=0;i<r.length;i++)a.setStart(t,i),a.setEnd(t,i+1),n=a.getBoundingClientRect(),void 0===e&&(e=n.y),n.y!==e&&(o.push(i),e=n.y);o.reverse().forEach((function(e){a.setStart(t,e),a.setEnd(t,e),a.insertNode(c("br"))}))}(e)}s(e.childNodes).forEach((function(e){t(e)}));var a=null;s(e.childNodes).forEach((function(t){var n;t.nodeType===Node.TEXT_NODE&&""!==t.nodeValue.trim()&&(n=pt(t)[0]),t.nodeType===Node.ELEMENT_NODE&&("BR"===t.nodeName?a=null:n=t.getBoundingClientRect()),n&&(null!==a&&n.y>a.y&&n.width>0&&e.insertBefore(c("br"),t),a=n)}))}(n),function t(e){var n=[];s(e.childNodes).forEach((function(t,e){"BR"===t.nodeName?n.push([t]):n.length>0&&n[n.length-1].push(t)})),n.forEach((function(t){var n=c("div"),r=t.shift();e.replaceChild(n,r),t.forEach((function(t){n.appendChild(t)}))})),s(e.childNodes).forEach((function(e){t(e)}))}(n),function(t,e){(function t(e,n,r){if("DIV"===n.nodeName){var a=c("tspan");a.setAttribute("x",e.getAttribute("x")),a.setAttribute("dy","1em"),a.innerHTML=n.innerHTML,n.parentNode.replaceChild(a,n),n=a}if("SPAN"===n.nodeName&&!r){for(var o=c("tspan"),i=0,l=n.attributes.length;i<l;i++){var s=n.attributes[i];o.setAttribute(s.name,s.value)}n.style.color&&(o.style.fill=n.style.color),o.innerHTML=n.innerHTML,n.parentNode.replaceChild(o,n),n=o}for(var u=0;u<n.childNodes.length;u++)t(e,n.childNodes[u])})(t,e,!0),t.innerHTML=e.innerHTML}(r,n),r.style.display="",t.triggerEvent("TextApply"),o.parentNode.removeChild(o),t.foreign=null,t.textarea=null,t.text=null;var i=r.innerHTML;t.historyPush&&a!==i&&t.historyPush({undo:bt,redo:Et,text:r,prev:a,next:i})}(e)}function dt(t){var e="."+Y.base;a(t.detail.event,"".concat(e,"__text-width"))&&(t.detail.operation=mt)}function gt(t){var e=t.detail.editor;e.foreign&&(t.preventDefault(),xt(e))}function pt(t){var e=lt.createRange();return e.selectNodeContents(t),e.getClientRects()}function vt(t){return t.nodeType===Node.TEXT_NODE?pt(t)[0]:t.nodeType===Node.ELEMENT_NODE?t.getBoundingClientRect():null}function yt(t){var e=t.foreign,n=e.parentNode,r=st?n:e,a=t.helperPoints=N(t,n,r);!function(t,e){if(!Y.createTextHelper)throw new Error("createTextHelper is not set");var n=Y.createTextHelper(t,e);t.helper=n,t.helpers.appendChild(n)}(t,a)}function xt(t){S(t),t.foreign.setAttribute("height",t.textarea.clientHeight),yt(t)}function mt(t,e){var n=e.editor,r=d([n.helperPoints[0],n.helperPoints[3]]);r=H(n,r);var a=h(e.current,r)/h(e.start,r);if(void 0===e.initialWidth){var o=n.foreign.getBBox();e.initialWidth=o.width}n.foreign.setAttribute("width",e.initialWidth*a),xt(n)}function _t(t,e){var n=t.getAttribute("x");t.innerHTML="",e.split("\n").forEach((function(e,r){if(r>0){var a=c("tspan",!0);a.textContent=e,a.setAttribute("x",n),a.setAttribute("dy","1em"),t.appendChild(a)}else t.appendChild(lt.createTextNode(e))}))}function bt(t,e){e.text.innerHTML=e.prev,t.refreshHelper()}function Et(t,e){e.text.innerHTML=e.next,t.refreshHelper()}ot.prototype.textSet=function(t,e){var n=t.innerHTML;_t(t,e);var r=t.innerHTML;this.refreshHelper(),this.historyPush&&n!==r&&this.historyPush({undo:bt,redo:Et,text:t,prev:n,next:r})},it=Y.base,(ct=lt.addEventListener).call(lt,"click",ut),ct.call(lt,"input",ht),ct.call(lt,"".concat(it,"Select"),ft),ct.call(lt,"".concat(it,"DragStart"),dt),ct.call(lt,"".concat(it,"RefreshHelper"),gt);Y.createTextHelper=function(t,e){var n=Y.base,r=c("g",!0,["".concat(n,"__helper"),"_text"]),a=g(e),o=Math.atan2(e[0].y-e[1].y,e[1].x-e[0].x),i=24*Math.cos(o),l=-24*Math.sin(o),s=d([e[0],e[1]]),u=d([e[1],e[2]]);return r.innerHTML='<polygon class="sse__rect" points="'.concat(a.join(" "),'"/><g class="').concat(n,"__act _align-left ").concat(n,'__align-left"><circle cx="').concat(s.x-i,'" cy="').concat(s.y-l,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(s.x-i,"px,").concat(s.y-l,'px)"><path d="M1.13,1.13H-3.38v.75H1.13Zm0-3H-3.38v.75H1.13ZM-3.38.38H3.38V-.38H-3.38Zm0,3H3.38V2.63H-3.38Zm0-6.76v.75H3.38v-.75Z"/></g></g><g class="').concat(n,"__act _align-center ").concat(n,'__align-center"><circle cx="').concat(s.x,'" cy="').concat(s.y,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(s.x,"px,").concat(s.y,'px)"><path d="M-1.88,1.13v.75H1.88V1.13Zm-1.5,2.25H3.38V2.63H-3.38Zm0-3H3.38V-.38H-3.38Zm1.5-2.26v.75H1.88v-.75Zm-1.5-1.5v.75H3.38v-.75Z"/></g></g><g class="').concat(n,"__act _align-right ").concat(n,'__align-right"><circle cx="').concat(s.x+i,'" cy="').concat(s.y+l,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(s.x+i,"px,").concat(s.y+l,'px)"><path d="M-3.38,3.38H3.38V2.63H-3.38Zm2.25-1.5H3.38V1.13H-1.13ZM-3.38.38H3.38V-.38H-3.38Zm2.25-1.51H3.38v-.75H-1.13ZM-3.38-3.38v.75H3.38v-.75Z"/></g></g><g class="').concat(n,"__act _text-width ").concat(n,'__text-width"><circle cx="').concat(u.x,'" cy="').concat(u.y,'" r="8"/><g class="').concat(n,'__icon" style="transform:translate(').concat(u.x,"px,").concat(u.y,'px)"><path d="M-.68,0A.21.21,0,0,1-.89.21h-2.6l1,1a.21.21,0,0,1,0,.29.2.2,0,0,1-.15.06.2.2,0,0,1-.14-.06L-4.15.15h0l0-.06a.22.22,0,0,1,0-.16l0-.06h0l1.34-1.33a.21.21,0,0,1,.29,0,.22.22,0,0,1,0,.3l-1,1h2.6A.21.21,0,0,1-.68,0ZM4.19.08a.19.19,0,0,0,0-.08.19.19,0,0,0,0-.08.16.16,0,0,0,0-.07L2.81-1.48a.21.21,0,0,0-.29,0,.22.22,0,0,0,0,.3l1,1H.89A.21.21,0,0,0,.68,0,.21.21,0,0,0,.89.21h2.6l-1,1a.21.21,0,0,0,.15.35.2.2,0,0,0,.14-.06L4.15.15A.16.16,0,0,0,4.19.08Z"/></g></g>'),r};var Ht=document,wt={left:"start",center:"middle",right:"end"},At=Object.keys(wt).reduce((function(t,e){return t[wt[e]]=e,t}),{});function Mt(t){var e="."+Y.base,n=a(t,e),r=n&&ot.getInstance(n);r&&(a(t,"".concat(e,"__align-left"))&&(r.textarea.style.textAlign="left"),a(t,"".concat(e,"__align-center"))&&(r.textarea.style.textAlign="center"),a(t,"".concat(e,"__align-right"))&&(r.textarea.style.textAlign="right"))}function St(t){var e=t.detail.editor,n=getComputedStyle(e.text).textAnchor;e.textarea.style.textAlign=At[n]}function Nt(t){var e=t.detail.editor,n=e.text,r=getComputedStyle(n).textAnchor,a=e.textarea.style.textAlign||"left",o={start:0,middle:.5,end:1};if(r!==(a=wt[a])){var i=n.getBBox().width,c=o[a]-o[r];n.style.textAnchor=a,l(n,b(n).translateSelf(c*i,0))}}function Ct(t,e){e.element.parentNode.removeChild(e.element),t.selectElement(null),t.refreshHelper()}function Tt(t,e){e.context.appendChild(e.element),t.selectElement(null),t.refreshHelper()}function Lt(t,e){e.element.parentNode.removeChild(e.element),t.selectElement(null),t.refreshHelper()}function Pt(t,e){e.context.appendChild(e.element),t.selectElement(null),t.refreshHelper()}!function(){var t=Y.base,e=Ht.addEventListener;e.call(Ht,"click",Mt),e.call(Ht,"".concat(t,"TextEdit"),St),e.call(Ht,"".concat(t,"TextApply"),Nt)}(),ot.prototype.textSetStyle=function(t){var e=function(){for(var t=[],e=window.getSelection(),n=0;n<e.rangeCount;n++){var r=e.getRangeAt(n),a=r.startContainer;a===r.endContainer&&a.nodeType===Node.TEXT_NODE&&0===r.startOffset&&a.nodeValue.length===r.endOffset?t.push(a.parentNode):function(){var e=r.extractContents();s(e.childNodes).forEach((function(n){var r;n.nodeType===Node.TEXT_NODE&&(r=c("span"),e.replaceChild(r,n),r.appendChild(n)),n.nodeType===Node.ELEMENT_NODE&&(r=n),r&&t.push(r)})),r.insertNode(e)}()}return t}();e.forEach(t),function(t){var e=(t=t.slice())[t.length-1].nextSibling;e&&t.push(e),t.forEach((function(t){var e=t.previousSibling;e.nodeName===t.nodeName&&e.getAttribute("style")===t.getAttribute("style")&&(s(t.childNodes).forEach((function(t){e.appendChild(t)})),t.parentNode.removeChild(t))}))}(e)},ot.prototype.insertText=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this,r=c("text",!0);r.setAttribute("x",e.x||0),r.setAttribute("y",e.y||0),_t(r,t);var a=e.context||n.svg,o=e.beforeInsert;o&&o(image,a,e),a.appendChild(r);var i=e.bound;if(i){var l=r.getBBox(),s=i.x+(i.width-l.width)/2,u=i.y+(i.height-l.height)/2;r.setAttribute("x",s),r.setAttribute("y",u),r.querySelectorAll("tspan").forEach((function(t){t.setAttribute("x",s)}))}return n.selectElement(r),n.historyPush&&n.historyPush({undo:Ct,redo:Tt,element:r,context:a}),r},ot.prototype.insertImageUrl=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this,r=c("image",!0);return r.onload=function(){["x","y","width","height"].forEach((function(t){void 0!==e[t]&&r.setAttribute(t,e[t])}));var t=e.context||n.svg,a=e.beforeInsert;a&&a(r,t,e),t.appendChild(r);var o=e.bound;if(o){var i=r.getBBox(),c=Math.min(o.width/i.width,o.height/i.height),l=i.width*c,s=i.height*c,u=o.x+(o.width-l)/2,h=o.y+(o.height-s)/2;r.setAttribute("x",u),r.setAttribute("y",h),r.setAttribute("width",l),r.setAttribute("height",s)}n.selectElement(r),n.historyPush&&n.historyPush({undo:Lt,redo:Pt,element:r,context:t})},r.setAttribute("href",t),r},ot.prototype.insertImageUpload=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=c("input");n.type="file",n.onchange=function(){var r=n.files[0],a={file:r};if(t.triggerEvent("ImageUpload",a),r=a.file)if("string"==typeof r)t.insertImageUrl(r,e);else if(e.blobUrl)t.insertImageUrl(URL.createObjectURL(r),e);else{var o=new FileReader;o.onload=function(){t.insertImageUrl(o.result,e)},o.readAsDataURL(r)}},n.click()};var Ot=document;function Vt(t){var e="."+Y.base,n=a(t,e),r=n&&ot.getInstance(n);r&&((n=a(t,"".concat(e,"__insert-text")))&&r.insertText("text",Zt(e,r)),(n=a(t,"".concat(e,"__insert-image")))&&r.insertImageUpload(Zt(e,r)))}function Bt(t){var e=Y.base,n=t.detail,r=n.editor;if(!1!==n.insertWidget){var a=c("g",!0,["".concat(e,"__bottom")]),o='\n            <g class="'.concat(e,'__bottom-image">\n                <g class="').concat(e,"__act _insert-image ").concat(e,'__insert-image" tabindex="0">\n                    <circle r="20"/>\n                    <g class="').concat(e,'__icon">\n                        <path d="M7-9.5H-7A2.5,2.5,0,0,0-9.5-7V7A2.5,2.5,0,0,0-7,9.5H7A2.5,2.5,0,0,0,9.5,7V-7A2.5,2.5,0,0,0,7-9.5ZM-8.5,7V-7A1.5,1.5,0,0,1-7-8.5H7A1.5,1.5,0,0,1,8.5-7V1.79L4.35-2.35a.48.48,0,0,0-.7,0L-7.19,8.48A1.49,1.49,0,0,1-8.5,7ZM7,8.5H-5.79L4-1.29l4.5,4.5V7A1.5,1.5,0,0,1,7,8.5ZM-3.5-1.5a2,2,0,0,0,2-2,2,2,0,0,0-2-2,2,2,0,0,0-2,2A2,2,0,0,0-3.5-1.5Zm0-3a1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1A1,1,0,0,1-3.5-4.5Z"/>\n                    </g>\n                </g>\n            </g>\n            <g class="').concat(e,'__bottom-text">\n                <g class="').concat(e,"__act _insert-text ").concat(e,'__insert-text" tabindex="0">\n                    <circle r="20"/>\n                    <g class="').concat(e,'__icon">\n                        <path d="M8.5-8v3a.5.5,0,0,1-.5.5A.5.5,0,0,1,7.5-5V-7.5H.5v15H3a.5.5,0,0,1,0,1H-3A.5.5,0,0,1-3.5,8,.5.5,0,0,1-3,7.5H-.5v-15h-7V-5a.5.5,0,0,1-.5.5A.5.5,0,0,1-8.5-5V-8A.5.5,0,0,1-8-8.5H8A.5.5,0,0,1,8.5-8Z"/>\n                    </g>\n                </g>\n            </g>\n            <g class="').concat(e,'__act _insert" tabindex="0">\n                <circle r="30"/>\n                <g class="').concat(e,'__icon">\n                    <path d="M8.5,0A.5.5,0,0,1,8,.5H.5V8a.5.5,0,0,1-.5.5A.5.5,0,0,1-.5,8V.5H-8A.5.5,0,0,1-8.5,0,.5.5,0,0,1-8-.5H-.5V-8A.5.5,0,0,1,0-8.5.5.5,0,0,1,.5-8V-.5H8A.5.5,0,0,1,8.5,0Z"/>\n                </g>\n            </g>\n        ');r.historyPush&&(o+='\n                <g class="'.concat(e,'__bottom-undo">\n                    <g class="').concat(e,"__act _undo ").concat(e,'__undo" tabindex="0">\n                        <circle r="16"/>\n                        <g class="').concat(e,'__icon">\n                            <path d="M7,2a.51.51,0,0,1-.7-.11S3.3-2.27.05-2.27C-2.38-2.27-4.68,0-5.7,1.18h3.38a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H-6.77a.5.5,0,0,1-.5-.5V-2.77a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5V.32C-5.09-1-2.66-3.27.05-3.27c3.76,0,7,4.34,7.08,4.52A.51.51,0,0,1,7,2Z"/>\n                        </g>\n                    </g>\n                </g>\n                <g class="').concat(e,'__bottom-redo">\n                    <g class="').concat(e,"__act _redo ").concat(e,'__redo" tabindex="0">\n                        <circle r="16"/>\n                        <g class="').concat(e,'__icon">\n                            <path d="M7.28-2.72V1.71a.5.5,0,0,1-.5.5H2.35a.5.5,0,0,1,0-1H5.71C4.7.05,2.41-2.22,0-2.22c-3.23,0-6.21,4.05-6.24,4.09a.51.51,0,0,1-.7.11.51.51,0,0,1-.11-.7c.13-.18,3.31-4.5,7.05-4.5C2.69-3.22,5.1-1,6.28.35V-2.72a.5.5,0,0,1,.5-.5A.5.5,0,0,1,7.28-2.72Z"/>\n                        </g>\n                    </g>\n                </g>\n            ')),a.innerHTML=o,r.helpers.appendChild(a)}}function Zt(t,e){var n=e.svg.querySelector(t+"__zone");return{context:e.svg.querySelector(t+"__zone > g"),bound:n&&n.getBBox()}}!function(){var t=Y.base,e=Ot.addEventListener;e.call(Ot,"click",Vt),e.call(Ot,"".concat(t,"Inited"),Bt)}();var It=document;function Rt(t){var e="."+Y.base,n=a(t,e),r=n&&ot.getInstance(n);r&&((n=a(t,"".concat(e,"__undo")))&&r.undo(),(n=a(t,"".concat(e,"__redo")))&&r.redo())}ot.prototype.historyPush=function(t){var e=this._history||[],n=this._historyPos||0;e.splice(n),this._history=e,this._historyPos=e.push(t)},ot.prototype.undo=function(){var t=this._history[(this._historyPos||0)-1];t&&(t.undo(this,t),this._historyPos--)},ot.prototype.redo=function(){var t=this._history[this._historyPos||0];t&&(t.redo(this,t),this._historyPos++)},It.addEventListener("click",Rt),ot.prototype.alignSelection=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=A(this,m(this.selection)),a=n.context||this.svg.querySelector(".".concat(Y.base,"__area-zone"))||this.svg,o=n.bound||A(this,a.getBoundingClientRect()),i=o.x+t*(o.x+o.width-r.width-o.x)-r.x,c=o.y+e*(o.y+o.height-r.height-o.y)-r.y;this.transformSelection(_().translateSelf(i,c))},window.SimpleSvgEditor=ot}]);