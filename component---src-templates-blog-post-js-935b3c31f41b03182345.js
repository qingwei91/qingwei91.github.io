(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"8+s/":function(t,e,n){"use strict";function r(t){return t&&"object"==typeof t&&"default"in t?t.default:t}n("V+eJ"),n("bWfx"),n("f3/d"),n("hHhE"),n("HAE/");var o=n("q1tI"),a=r(o),i=r(n("Gytx"));function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,n){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var l,T=[];function s(){l=t(T.map((function(t){return t.props}))),f.canUseDOM?e(l):n&&(l=n(l))}var f=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,o.peek=function(){return l},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=l;return l=void 0,T=[],t};var u=o.prototype;return u.shouldComponentUpdate=function(t){return!i(t,this.props)},u.componentWillMount=function(){T.push(this),s()},u.componentDidUpdate=function(){s()},u.componentWillUnmount=function(){var t=T.indexOf(this);T.splice(t,1),s()},u.render=function(){return a.createElement(r,this.props)},o}(o.Component);return u(f,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(r)+")"),u(f,"canUseDOM",c),f}}},Gytx:function(t,e,n){n("2Spj"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),t.exports=function(t,e,n,r){var o=n?n.call(r,t,e):void 0;if(void 0!==o)return!!o;if(t===e)return!0;if("object"!=typeof t||!t||"object"!=typeof e||!e)return!1;var a=Object.keys(t),i=Object.keys(e);if(a.length!==i.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(e),c=0;c<a.length;c++){var l=a[c];if(!u(l))return!1;var T=t[l],s=e[l];if(!1===(o=n?n.call(r,T,s,l):void 0)||void 0===o&&T!==s)return!1}return!0}},SbOt:function(t,e,n){"use strict";var r=n("q1tI"),o=n.n(r),a=(n("tb+u"),n("GevN"),n("tmc/")),i=n.n(a),u=n("p3AD");var c=function(t){var e,n;function r(){return t.apply(this,arguments)||this}return n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,r.prototype.render=function(){return o.a.createElement("div",null,o.a.createElement("img",{src:i.a,alt:"profile-pic"}),o.a.createElement("div",{style:{display:"flex",marginBottom:Object(u.a)(2.5)}},o.a.createElement("div",null,"I like to talk about stuff I have no idea about. Sometimes I even write about them.")))},r}(o.a.Component);e.a=c},TJpk:function(t,e,n){n("LK8F"),n("dZ+Y"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("8+KV"),n("/SS/"),n("hHhE"),n("V+eJ"),n("HAE/"),n("91GP"),e.__esModule=!0,e.Helmet=void 0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=s(n("q1tI")),i=s(n("17x9")),u=s(n("8+s/")),c=s(n("bmMU")),l=n("v1p5"),T=n("hFT/");function s(t){return t&&t.__esModule?t:{default:t}}function f(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}var p,E,d,A=(0,u.default)(l.reducePropsToState,l.handleClientStateChange,l.mapStateOnServer)((function(){return null})),S=(p=A,d=E=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!(0,c.default)(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case T.TAG_NAMES.SCRIPT:case T.TAG_NAMES.NOSCRIPT:return{innerHTML:e};case T.TAG_NAMES.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,n=t.child,o=t.arrayTypeChildren,a=t.newChildProps,i=t.nestedChildren;return r({},o,((e={})[n.type]=[].concat(o[n.type]||[],[r({},a,this.mapNestedChildrenToProps(n,i))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,n,o=t.child,a=t.newProps,i=t.newChildProps,u=t.nestedChildren;switch(o.type){case T.TAG_NAMES.TITLE:return r({},a,((e={})[o.type]=u,e.titleAttributes=r({},i),e));case T.TAG_NAMES.BODY:return r({},a,{bodyAttributes:r({},i)});case T.TAG_NAMES.HTML:return r({},a,{htmlAttributes:r({},i)})}return r({},a,((n={})[o.type]=r({},i),n))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var n=r({},e);return Object.keys(t).forEach((function(e){var o;n=r({},n,((o={})[e]=t[e],o))})),n},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var n=this,r={};return a.default.Children.forEach(t,(function(t){if(t&&t.props){var o=t.props,a=o.children,i=f(o,["children"]),u=(0,l.convertReactPropstoHtmlAttributes)(i);switch(n.warnOnInvalidChildren(t,a),t.type){case T.TAG_NAMES.LINK:case T.TAG_NAMES.META:case T.TAG_NAMES.NOSCRIPT:case T.TAG_NAMES.SCRIPT:case T.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:t,arrayTypeChildren:r,newChildProps:u,nestedChildren:a});break;default:e=n.mapObjectTypeChildren({child:t,newProps:e,newChildProps:u,nestedChildren:a})}}})),e=this.mapArrayTypeChildrenToProps(r,e)},e.prototype.render=function(){var t=this.props,e=t.children,n=f(t,["children"]),o=r({},n);return e&&(o=this.mapChildrenToProps(e,o)),a.default.createElement(p,o)},o(e,null,[{key:"canUseDOM",set:function(t){p.canUseDOM=t}}]),e}(a.default.Component),E.propTypes={base:i.default.object,bodyAttributes:i.default.object,children:i.default.oneOfType([i.default.arrayOf(i.default.node),i.default.node]),defaultTitle:i.default.string,defer:i.default.bool,encodeSpecialCharacters:i.default.bool,htmlAttributes:i.default.object,link:i.default.arrayOf(i.default.object),meta:i.default.arrayOf(i.default.object),noscript:i.default.arrayOf(i.default.object),onChangeClientState:i.default.func,script:i.default.arrayOf(i.default.object),style:i.default.arrayOf(i.default.object),title:i.default.string,titleAttributes:i.default.object,titleTemplate:i.default.string},E.defaultProps={defer:!0,encodeSpecialCharacters:!0},E.peek=p.peek,E.rewind=function(){var t=p.rewind();return t||(t=(0,l.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},d);S.renderStatic=S.rewind,e.Helmet=S,e.default=S},"hFT/":function(t,e,n){n("DNiP"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("bWfx"),e.__esModule=!0;e.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var r=e.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},o=(e.VALID_TAG_NAMES=Object.keys(r).map((function(t){return r[t]})),e.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},e.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});e.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},e.HTML_TAG_MAP=Object.keys(o).reduce((function(t,e){return t[o[e]]=e,t}),{}),e.SELF_CLOSING_TAGS=[r.NOSCRIPT,r.SCRIPT,r.STYLE],e.HELMET_ATTRIBUTE="data-react-helmet"},"tmc/":function(t,e,n){t.exports=n.p+"static/profile-pic-9bfd53bbb1672cec59deaee918e5c18f.jpg"},v1p5:function(t,e,n){(function(t){n("dZ+Y"),n("KKXr"),n("eM6i"),n("8+KV"),n("LK8F"),n("V+eJ"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("0l/t"),n("bWfx"),n("DNiP"),n("pIFo"),n("91GP"),n("rE2o"),n("ioFf"),e.__esModule=!0,e.warn=e.requestAnimationFrame=e.reducePropsToState=e.mapStateOnServer=e.handleClientStateChange=e.convertReactPropstoHtmlAttributes=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=c(n("q1tI")),i=c(n("MgzW")),u=n("hFT/");function c(t){return t&&t.__esModule?t:{default:t}}var l,T=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},s=function(t){var e=A(t,u.TAG_NAMES.TITLE),n=A(t,u.HELMET_PROPS.TITLE_TEMPLATE);if(n&&e)return n.replace(/%s/g,(function(){return e}));var r=A(t,u.HELMET_PROPS.DEFAULT_TITLE);return e||r||void 0},f=function(t){return A(t,u.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},p=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return o({},t,e)}),{})},E=function(t,e){return e.filter((function(t){return void 0!==t[u.TAG_NAMES.BASE]})).map((function(t){return t[u.TAG_NAMES.BASE]})).reverse().reduce((function(e,n){if(!e.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o].toLowerCase();if(-1!==t.indexOf(a)&&n[a])return e.concat(n)}return e}),[])},d=function(t,e,n){var o={};return n.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&_("Helmet: "+t+' should be of type "Array". Instead found type "'+r(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,n){var r={};n.filter((function(t){for(var n=void 0,a=Object.keys(t),i=0;i<a.length;i++){var c=a[i],l=c.toLowerCase();-1===e.indexOf(l)||n===u.TAG_PROPERTIES.REL&&"canonical"===t[n].toLowerCase()||l===u.TAG_PROPERTIES.REL&&"stylesheet"===t[l].toLowerCase()||(n=l),-1===e.indexOf(c)||c!==u.TAG_PROPERTIES.INNER_HTML&&c!==u.TAG_PROPERTIES.CSS_TEXT&&c!==u.TAG_PROPERTIES.ITEM_PROP||(n=c)}if(!n||!t[n])return!1;var T=t[n].toLowerCase();return o[n]||(o[n]={}),r[n]||(r[n]={}),!o[n][T]&&(r[n][T]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var a=Object.keys(r),c=0;c<a.length;c++){var l=a[c],T=(0,i.default)({},o[l],r[l]);o[l]=T}return t}),[]).reverse()},A=function(t,e){for(var n=t.length-1;n>=0;n--){var r=t[n];if(r.hasOwnProperty(e))return r[e]}return null},S=(l=Date.now(),function(t){var e=Date.now();e-l>16?(l=e,t(e)):setTimeout((function(){S(t)}),0)}),y=function(t){return clearTimeout(t)},h="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||S:t.requestAnimationFrame||S,m="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||y:t.cancelAnimationFrame||y,_=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},b=null,v=function(t,e){var n=t.baseTag,r=t.bodyAttributes,o=t.htmlAttributes,a=t.linkTags,i=t.metaTags,c=t.noscriptTags,l=t.onChangeClientState,T=t.scriptTags,s=t.styleTags,f=t.title,p=t.titleAttributes;P(u.TAG_NAMES.BODY,r),P(u.TAG_NAMES.HTML,o),O(f,p);var E={baseTag:M(u.TAG_NAMES.BASE,n),linkTags:M(u.TAG_NAMES.LINK,a),metaTags:M(u.TAG_NAMES.META,i),noscriptTags:M(u.TAG_NAMES.NOSCRIPT,c),scriptTags:M(u.TAG_NAMES.SCRIPT,T),styleTags:M(u.TAG_NAMES.STYLE,s)},d={},A={};Object.keys(E).forEach((function(t){var e=E[t],n=e.newTags,r=e.oldTags;n.length&&(d[t]=n),r.length&&(A[t]=E[t].oldTags)})),e&&e(),l(t,d,A)},R=function(t){return Array.isArray(t)?t.join(""):t},O=function(t,e){void 0!==t&&document.title!==t&&(document.title=R(t)),P(u.TAG_NAMES.TITLE,e)},P=function(t,e){var n=document.getElementsByTagName(t)[0];if(n){for(var r=n.getAttribute(u.HELMET_ATTRIBUTE),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(e),c=0;c<i.length;c++){var l=i[c],T=e[l]||"";n.getAttribute(l)!==T&&n.setAttribute(l,T),-1===o.indexOf(l)&&o.push(l);var s=a.indexOf(l);-1!==s&&a.splice(s,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);o.length===a.length?n.removeAttribute(u.HELMET_ATTRIBUTE):n.getAttribute(u.HELMET_ATTRIBUTE)!==i.join(",")&&n.setAttribute(u.HELMET_ATTRIBUTE,i.join(","))}},M=function(t,e){var n=document.head||document.querySelector(u.TAG_NAMES.HEAD),r=n.querySelectorAll(t+"["+u.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return e&&e.length&&e.forEach((function(e){var n=document.createElement(t);for(var r in e)if(e.hasOwnProperty(r))if(r===u.TAG_PROPERTIES.INNER_HTML)n.innerHTML=e.innerHTML;else if(r===u.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText));else{var c=void 0===e[r]?"":e[r];n.setAttribute(r,c)}n.setAttribute(u.HELMET_ATTRIBUTE,"true"),o.some((function(t,e){return i=e,n.isEqualNode(t)}))?o.splice(i,1):a.push(n)})),o.forEach((function(t){return t.parentNode.removeChild(t)})),a.forEach((function(t){return n.appendChild(t)})),{oldTags:o,newTags:a}},I=function(t){return Object.keys(t).reduce((function(e,n){var r=void 0!==t[n]?n+'="'+t[n]+'"':""+n;return e?e+" "+r:r}),"")},C=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[u.REACT_TAG_MAP[n]||n]=t[n],e}),e)},g=function(t,e,n){switch(t){case u.TAG_NAMES.TITLE:return{toComponent:function(){return t=e.title,n=e.titleAttributes,(r={key:t})[u.HELMET_ATTRIBUTE]=!0,o=C(n,r),[a.default.createElement(u.TAG_NAMES.TITLE,o,t)];var t,n,r,o},toString:function(){return function(t,e,n,r){var o=I(n),a=R(e);return o?"<"+t+" "+u.HELMET_ATTRIBUTE+'="true" '+o+">"+T(a,r)+"</"+t+">":"<"+t+" "+u.HELMET_ATTRIBUTE+'="true">'+T(a,r)+"</"+t+">"}(t,e.title,e.titleAttributes,n)}};case u.ATTRIBUTE_NAMES.BODY:case u.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return C(e)},toString:function(){return I(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,n){var r,o=((r={key:n})[u.HELMET_ATTRIBUTE]=!0,r);return Object.keys(e).forEach((function(t){var n=u.REACT_TAG_MAP[t]||t;if(n===u.TAG_PROPERTIES.INNER_HTML||n===u.TAG_PROPERTIES.CSS_TEXT){var r=e.innerHTML||e.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=e[t]})),a.default.createElement(t,o)}))}(t,e)},toString:function(){return function(t,e,n){return e.reduce((function(e,r){var o=Object.keys(r).filter((function(t){return!(t===u.TAG_PROPERTIES.INNER_HTML||t===u.TAG_PROPERTIES.CSS_TEXT)})).reduce((function(t,e){var o=void 0===r[e]?e:e+'="'+T(r[e],n)+'"';return t?t+" "+o:o}),""),a=r.innerHTML||r.cssText||"",i=-1===u.SELF_CLOSING_TAGS.indexOf(t);return e+"<"+t+" "+u.HELMET_ATTRIBUTE+'="true" '+o+(i?"/>":">"+a+"</"+t+">")}),"")}(t,e,n)}}}};e.convertReactPropstoHtmlAttributes=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[u.HTML_TAG_MAP[n]||n]=t[n],e}),e)},e.handleClientStateChange=function(t){b&&m(b),t.defer?b=h((function(){v(t,(function(){b=null}))})):(v(t),b=null)},e.mapStateOnServer=function(t){var e=t.baseTag,n=t.bodyAttributes,r=t.encode,o=t.htmlAttributes,a=t.linkTags,i=t.metaTags,c=t.noscriptTags,l=t.scriptTags,T=t.styleTags,s=t.title,f=void 0===s?"":s,p=t.titleAttributes;return{base:g(u.TAG_NAMES.BASE,e,r),bodyAttributes:g(u.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:g(u.ATTRIBUTE_NAMES.HTML,o,r),link:g(u.TAG_NAMES.LINK,a,r),meta:g(u.TAG_NAMES.META,i,r),noscript:g(u.TAG_NAMES.NOSCRIPT,c,r),script:g(u.TAG_NAMES.SCRIPT,l,r),style:g(u.TAG_NAMES.STYLE,T,r),title:g(u.TAG_NAMES.TITLE,{title:f,titleAttributes:p},r)}},e.reducePropsToState=function(t){return{baseTag:E([u.TAG_PROPERTIES.HREF],t),bodyAttributes:p(u.ATTRIBUTE_NAMES.BODY,t),defer:A(t,u.HELMET_PROPS.DEFER),encode:A(t,u.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:p(u.ATTRIBUTE_NAMES.HTML,t),linkTags:d(u.TAG_NAMES.LINK,[u.TAG_PROPERTIES.REL,u.TAG_PROPERTIES.HREF],t),metaTags:d(u.TAG_NAMES.META,[u.TAG_PROPERTIES.NAME,u.TAG_PROPERTIES.CHARSET,u.TAG_PROPERTIES.HTTPEQUIV,u.TAG_PROPERTIES.PROPERTY,u.TAG_PROPERTIES.ITEM_PROP],t),noscriptTags:d(u.TAG_NAMES.NOSCRIPT,[u.TAG_PROPERTIES.INNER_HTML],t),onChangeClientState:f(t),scriptTags:d(u.TAG_NAMES.SCRIPT,[u.TAG_PROPERTIES.SRC,u.TAG_PROPERTIES.INNER_HTML],t),styleTags:d(u.TAG_NAMES.STYLE,[u.TAG_PROPERTIES.CSS_TEXT],t),title:s(t),titleAttributes:p(u.ATTRIBUTE_NAMES.TITLE,t)}},e.requestAnimationFrame=h,e.warn=_}).call(this,n("yLpj"))},yZlL:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",(function(){return f}));n("91GP");var r=n("q1tI"),o=n.n(r),a=n("TJpk"),i=n.n(a),u=n("Wbzz"),c=n("SbOt"),l=n("7oih"),T=n("p3AD");var s=function(t){var e,n;function r(){return t.apply(this,arguments)||this}return n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,r.prototype.render=function(){var t=this.props.data.markdownRemark,e=this.props.data.site.siteMetadata.title,n=t.excerpt,r=this.props.pageContext,a=r.previous,s=r.next;return o.a.createElement(l.a,{location:this.props.location,title:e},o.a.createElement(i.a,{htmlAttributes:{lang:"en"},meta:[{name:"description",content:n}],title:t.frontmatter.title+" | "+e}),o.a.createElement("h1",null,t.frontmatter.title),o.a.createElement("p",{style:Object.assign({},Object(T.b)(-.2),{display:"block",marginBottom:Object(T.a)(1),marginTop:Object(T.a)(-1)})},t.frontmatter.date),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}),o.a.createElement("hr",{style:{marginBottom:Object(T.a)(1)}}),o.a.createElement(c.a,null),o.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},o.a.createElement("li",null,a&&o.a.createElement(u.Link,{to:a.fields.slug,rel:"prev"},"← ",a.frontmatter.title)),o.a.createElement("li",null,s&&o.a.createElement(u.Link,{to:s.fields.slug,rel:"next"},s.frontmatter.title," →"))))},r}(o.a.Component);e.default=s;var f="3804820323"}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-935b3c31f41b03182345.js.map