(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{MVZn:function(t,e,i){var o=i("lSNA");t.exports=function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?Object(arguments[e]):{},s=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&s.push.apply(s,Object.getOwnPropertySymbols(i).filter((function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),s.forEach((function(e){o(t,e,i[e])}))}return t},t.exports.__esModule=!0,t.exports.default=t.exports},RXBc:function(t,e,i){"use strict";i.r(e);var o=i("dI71"),s=i("q1tI"),n=i.n(s),r=i("Wbzz"),a=i("TJpk"),h=i.n(a),l=i("SbOt"),u=i("7oih"),d=i("p3AD"),c=i("MVZn"),p=i.n(c),f=i("VbXa"),b=i.n(f),g=i("PJYZ"),m=i.n(g),v={position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"},S={zIndex:2,position:"absolute",top:0,bottom:0,transition:"transform .3s ease-out",WebkitTransition:"-webkit-transform .3s ease-out",willChange:"transform",overflowY:"auto"},T={position:"absolute",top:0,left:0,right:0,bottom:0,overflowY:"auto",WebkitOverflowScrolling:"touch",transition:"left .3s ease-out, right .3s ease-out"},y={zIndex:1,position:"fixed",top:0,left:0,right:0,bottom:0,opacity:0,visibility:"hidden",transition:"opacity .3s ease-out, visibility .3s ease-out",backgroundColor:"rgba(0,0,0,.3)"},X={zIndex:1,position:"fixed",top:0,bottom:0},W=function(t){function e(e){var i;return(i=t.call(this,e)||this).state={sidebarWidth:e.defaultSidebarWidth,touchIdentifier:null,touchStartX:null,touchCurrentX:null,dragSupported:!1},i.overlayClicked=i.overlayClicked.bind(m()(m()(i))),i.onTouchStart=i.onTouchStart.bind(m()(m()(i))),i.onTouchMove=i.onTouchMove.bind(m()(m()(i))),i.onTouchEnd=i.onTouchEnd.bind(m()(m()(i))),i.onScroll=i.onScroll.bind(m()(m()(i))),i.saveSidebarRef=i.saveSidebarRef.bind(m()(m()(i))),i}b()(e,t);var i=e.prototype;return i.componentDidMount=function(){var t=/iPad|iPhone|iPod/.test(navigator?navigator.userAgent:"");this.setState({dragSupported:"object"==typeof window&&"ontouchstart"in window&&!t}),this.saveSidebarWidth()},i.componentDidUpdate=function(){this.isTouching()||this.saveSidebarWidth()},i.onTouchStart=function(t){if(!this.isTouching()){var e=t.targetTouches[0];this.setState({touchIdentifier:e.identifier,touchStartX:e.clientX,touchCurrentX:e.clientX})}},i.onTouchMove=function(t){if(this.isTouching())for(var e=0;e<t.targetTouches.length;e++)if(t.targetTouches[e].identifier===this.state.touchIdentifier){this.setState({touchCurrentX:t.targetTouches[e].clientX});break}},i.onTouchEnd=function(){if(this.isTouching()){var t=this.touchSidebarWidth();(this.props.open&&t<this.state.sidebarWidth-this.props.dragToggleDistance||!this.props.open&&t>this.props.dragToggleDistance)&&this.props.onSetOpen(!this.props.open),this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}},i.onScroll=function(){this.isTouching()&&this.inCancelDistanceOnScroll()&&this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})},i.inCancelDistanceOnScroll=function(){return this.props.pullRight?Math.abs(this.state.touchCurrentX-this.state.touchStartX)<20:Math.abs(this.state.touchStartX-this.state.touchCurrentX)<20},i.isTouching=function(){return null!==this.state.touchIdentifier},i.overlayClicked=function(){this.props.open&&this.props.onSetOpen(!1)},i.saveSidebarWidth=function(){var t=this.sidebar.offsetWidth;t!==this.state.sidebarWidth&&this.setState({sidebarWidth:t})},i.saveSidebarRef=function(t){this.sidebar=t},i.touchSidebarWidth=function(){return this.props.pullRight?this.props.open&&window.innerWidth-this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth+this.state.touchStartX-this.state.touchCurrentX:this.state.sidebarWidth:Math.min(window.innerWidth-this.state.touchCurrentX,this.state.sidebarWidth):this.props.open&&this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth:this.state.sidebarWidth-this.state.touchStartX+this.state.touchCurrentX:Math.min(this.state.touchCurrentX,this.state.sidebarWidth)},i.render=function(){var t,e=p()({},S,this.props.styles.sidebar),i=p()({},T,this.props.styles.content),o=p()({},y,this.props.styles.overlay),s=this.state.dragSupported&&this.props.touch,r=this.isTouching(),a={className:this.props.rootClassName,style:p()({},v,this.props.styles.root),role:"navigation",id:this.props.rootId},h=this.props.shadow&&(r||this.props.open||this.props.docked);if(this.props.pullRight?(e.right=0,e.transform="translateX(100%)",e.WebkitTransform="translateX(100%)",h&&(e.boxShadow="-2px 2px 4px rgba(0, 0, 0, 0.15)")):(e.left=0,e.transform="translateX(-100%)",e.WebkitTransform="translateX(-100%)",h&&(e.boxShadow="2px 2px 4px rgba(0, 0, 0, 0.15)")),r){var l=this.touchSidebarWidth()/this.state.sidebarWidth;this.props.pullRight?(e.transform="translateX("+100*(1-l)+"%)",e.WebkitTransform="translateX("+100*(1-l)+"%)"):(e.transform="translateX(-"+100*(1-l)+"%)",e.WebkitTransform="translateX(-"+100*(1-l)+"%)"),o.opacity=l,o.visibility="visible"}else this.props.docked?(0!==this.state.sidebarWidth&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)"),this.props.pullRight?i.right=this.state.sidebarWidth+"px":i.left=this.state.sidebarWidth+"px"):this.props.open&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)",o.opacity=1,o.visibility="visible");if(!r&&this.props.transitions||(e.transition="none",e.WebkitTransition="none",i.transition="none",o.transition="none"),s)if(this.props.open)a.onTouchStart=this.onTouchStart,a.onTouchMove=this.onTouchMove,a.onTouchEnd=this.onTouchEnd,a.onTouchCancel=this.onTouchEnd,a.onScroll=this.onScroll;else{var u=p()({},X,this.props.styles.dragHandle);u.width=this.props.touchHandleWidth,this.props.pullRight?u.right=0:u.left=0,t=n.a.createElement("div",{style:u,onTouchStart:this.onTouchStart,onTouchMove:this.onTouchMove,onTouchEnd:this.onTouchEnd,onTouchCancel:this.onTouchEnd})}return n.a.createElement("div",a,n.a.createElement("div",{className:this.props.sidebarClassName,style:e,ref:this.saveSidebarRef,id:this.props.sidebarId},this.props.sidebar),n.a.createElement("div",{className:this.props.overlayClassName,style:o,onClick:this.overlayClicked,id:this.props.overlayId}),n.a.createElement("div",{className:this.props.contentClassName,style:i,id:this.props.contentId},t,this.props.children))},e}(s.Component);W.defaultProps={docked:!1,open:!1,transitions:!0,touch:!0,touchHandleWidth:20,pullRight:!1,shadow:!0,dragToggleDistance:30,onSetOpen:function(){},styles:{},defaultSidebarWidth:0};var w=W,k={content:{padding:"16px",height:"100%",backgroundColor:"white"},sidebar:{padding:"16px",background:"white",width:"20%"}},C=function(t){function e(){return t.apply(this,arguments)||this}return Object(o.a)(e,t),e.prototype.render=function(){var t=this.props.data,e=t.site.siteMetadata.title,i=t.site.siteMetadata.description,o=t.allMarkdownRemark.edges,s=(o.map((function(t){var e=t.node,i=e.frontmatter.title||e.fields.slug;return n.a.createElement("div",{key:e.fields.slug},n.a.createElement(r.Link,{style:{boxShadow:"none"},to:e.fields.slug},i))})),n.a.createElement("div",null,n.a.createElement(l.a,null)));return n.a.createElement(w,{sidebar:s,docked:!0,styles:k},n.a.createElement(u.a,{location:this.props.location,title:e},n.a.createElement(h.a,{htmlAttributes:{lang:"en"},meta:[{name:"description",content:i}],title:e}),o.filter((function(t){return"WIP"!==t.node.frontmatter.status})).map((function(t){var e=t.node,i=e.frontmatter.title||e.fields.slug;return n.a.createElement("div",{key:e.fields.slug},n.a.createElement("h3",{style:{marginBottom:Object(d.a)(1/4)}},n.a.createElement(r.Link,{style:{boxShadow:"none"},to:e.fields.slug},i)),n.a.createElement("small",null,e.frontmatter.date))}))))},e}(n.a.Component);e.default=C},lSNA:function(t,e){t.exports=function(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t},t.exports.__esModule=!0,t.exports.default=t.exports}}]);
//# sourceMappingURL=component---src-pages-index-js-243e2cf5c8f74f961173.js.map