(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{226:function(t,e,i){"use strict";i.r(e);var o=i(0),s=i.n(o),n=i(74),r=i(221),a=i.n(r),h=i(222),l=i(220),c=i(24),d=(i(61),i(227)),u=i.n(d),p=i(81),f=i.n(p),b=i(82),g=i.n(b),m=(i(48),{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"}),v={zIndex:2,position:"absolute",top:0,bottom:0,transition:"transform .3s ease-out",WebkitTransition:"-webkit-transform .3s ease-out",willChange:"transform",overflowY:"auto"},S={position:"absolute",top:0,left:0,right:0,bottom:0,overflowY:"auto",WebkitOverflowScrolling:"touch",transition:"left .3s ease-out, right .3s ease-out"},y={zIndex:1,position:"fixed",top:0,left:0,right:0,bottom:0,opacity:0,visibility:"hidden",transition:"opacity .3s ease-out, visibility .3s ease-out",backgroundColor:"rgba(0,0,0,.3)"},T={zIndex:1,position:"fixed",top:0,bottom:0},X=function(t){function e(e){var i;return(i=t.call(this,e)||this).state={sidebarWidth:e.defaultSidebarWidth,touchIdentifier:null,touchStartX:null,touchCurrentX:null,dragSupported:!1},i.overlayClicked=i.overlayClicked.bind(g()(g()(i))),i.onTouchStart=i.onTouchStart.bind(g()(g()(i))),i.onTouchMove=i.onTouchMove.bind(g()(g()(i))),i.onTouchEnd=i.onTouchEnd.bind(g()(g()(i))),i.onScroll=i.onScroll.bind(g()(g()(i))),i.saveSidebarRef=i.saveSidebarRef.bind(g()(g()(i))),i}f()(e,t);var i=e.prototype;return i.componentDidMount=function(){var t=/iPad|iPhone|iPod/.test(navigator?navigator.userAgent:"");this.setState({dragSupported:"object"==typeof window&&"ontouchstart"in window&&!t}),this.saveSidebarWidth()},i.componentDidUpdate=function(){this.isTouching()||this.saveSidebarWidth()},i.onTouchStart=function(t){if(!this.isTouching()){var e=t.targetTouches[0];this.setState({touchIdentifier:e.identifier,touchStartX:e.clientX,touchCurrentX:e.clientX})}},i.onTouchMove=function(t){if(this.isTouching())for(var e=0;e<t.targetTouches.length;e++)if(t.targetTouches[e].identifier===this.state.touchIdentifier){this.setState({touchCurrentX:t.targetTouches[e].clientX});break}},i.onTouchEnd=function(){if(this.isTouching()){var t=this.touchSidebarWidth();(this.props.open&&t<this.state.sidebarWidth-this.props.dragToggleDistance||!this.props.open&&t>this.props.dragToggleDistance)&&this.props.onSetOpen(!this.props.open),this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}},i.onScroll=function(){this.isTouching()&&this.inCancelDistanceOnScroll()&&this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})},i.inCancelDistanceOnScroll=function(){return this.props.pullRight?Math.abs(this.state.touchCurrentX-this.state.touchStartX)<20:Math.abs(this.state.touchStartX-this.state.touchCurrentX)<20},i.isTouching=function(){return null!==this.state.touchIdentifier},i.overlayClicked=function(){this.props.open&&this.props.onSetOpen(!1)},i.saveSidebarWidth=function(){var t=this.sidebar.offsetWidth;t!==this.state.sidebarWidth&&this.setState({sidebarWidth:t})},i.saveSidebarRef=function(t){this.sidebar=t},i.touchSidebarWidth=function(){return this.props.pullRight?this.props.open&&window.innerWidth-this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth+this.state.touchStartX-this.state.touchCurrentX:this.state.sidebarWidth:Math.min(window.innerWidth-this.state.touchCurrentX,this.state.sidebarWidth):this.props.open&&this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth:this.state.sidebarWidth-this.state.touchStartX+this.state.touchCurrentX:Math.min(this.state.touchCurrentX,this.state.sidebarWidth)},i.render=function(){var t,e=u()({},v,this.props.styles.sidebar),i=u()({},S,this.props.styles.content),o=u()({},y,this.props.styles.overlay),n=this.state.dragSupported&&this.props.touch,r=this.isTouching(),a={className:this.props.rootClassName,style:u()({},m,this.props.styles.root),role:"navigation",id:this.props.rootId},h=this.props.shadow&&(r||this.props.open||this.props.docked);if(this.props.pullRight?(e.right=0,e.transform="translateX(100%)",e.WebkitTransform="translateX(100%)",h&&(e.boxShadow="-2px 2px 4px rgba(0, 0, 0, 0.15)")):(e.left=0,e.transform="translateX(-100%)",e.WebkitTransform="translateX(-100%)",h&&(e.boxShadow="2px 2px 4px rgba(0, 0, 0, 0.15)")),r){var l=this.touchSidebarWidth()/this.state.sidebarWidth;this.props.pullRight?(e.transform="translateX("+100*(1-l)+"%)",e.WebkitTransform="translateX("+100*(1-l)+"%)"):(e.transform="translateX(-"+100*(1-l)+"%)",e.WebkitTransform="translateX(-"+100*(1-l)+"%)"),o.opacity=l,o.visibility="visible"}else this.props.docked?(0!==this.state.sidebarWidth&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)"),this.props.pullRight?i.right=this.state.sidebarWidth+"px":i.left=this.state.sidebarWidth+"px"):this.props.open&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)",o.opacity=1,o.visibility="visible");if(!r&&this.props.transitions||(e.transition="none",e.WebkitTransition="none",i.transition="none",o.transition="none"),n)if(this.props.open)a.onTouchStart=this.onTouchStart,a.onTouchMove=this.onTouchMove,a.onTouchEnd=this.onTouchEnd,a.onTouchCancel=this.onTouchEnd,a.onScroll=this.onScroll;else{var c=u()({},T,this.props.styles.dragHandle);c.width=this.props.touchHandleWidth,this.props.pullRight?c.right=0:c.left=0,t=s.a.createElement("div",{style:c,onTouchStart:this.onTouchStart,onTouchMove:this.onTouchMove,onTouchEnd:this.onTouchEnd,onTouchCancel:this.onTouchEnd})}return s.a.createElement("div",a,s.a.createElement("div",{className:this.props.sidebarClassName,style:e,ref:this.saveSidebarRef,id:this.props.sidebarId},this.props.sidebar),s.a.createElement("div",{className:this.props.overlayClassName,style:o,onClick:this.overlayClicked,id:this.props.overlayId}),s.a.createElement("div",{className:this.props.contentClassName,style:i,id:this.props.contentId},t,this.props.children))},e}(o.Component);X.defaultProps={docked:!1,open:!1,transitions:!0,touch:!0,touchHandleWidth:20,pullRight:!1,shadow:!0,dragToggleDistance:30,onSetOpen:function(){},styles:{},defaultSidebarWidth:0};var W=X;i.d(e,"pageQuery",(function(){return C}));var w={content:{padding:"16px",height:"100%",backgroundColor:"white"},sidebar:{padding:"16px",background:"white",width:"20%"}},k=function(t){var e,i;function o(){return t.apply(this,arguments)||this}return i=t,(e=o).prototype=Object.create(i.prototype),e.prototype.constructor=e,e.__proto__=i,o.prototype.render=function(){var t=this.props.data,e=t.site.siteMetadata.title,i=t.site.siteMetadata.description,o=t.allMarkdownRemark.edges,r=(o.map((function(t){var e=t.node,i=e.frontmatter.title||e.fields.slug;return s.a.createElement("div",{key:e.fields.slug},s.a.createElement(n.Link,{style:{boxShadow:"none"},to:e.fields.slug},i))})),s.a.createElement("div",null,s.a.createElement(h.a,null)));return s.a.createElement(W,{sidebar:r,docked:!0,styles:w},s.a.createElement(l.a,{location:this.props.location,title:e},s.a.createElement(a.a,{htmlAttributes:{lang:"en"},meta:[{name:"description",content:i}],title:e}),o.map((function(t){var e=t.node,i=e.frontmatter.title||e.fields.slug;return s.a.createElement("div",{key:e.fields.slug},s.a.createElement("h3",{style:{marginBottom:Object(c.a)(.25)}},s.a.createElement(n.Link,{style:{boxShadow:"none"},to:e.fields.slug},i)),s.a.createElement("small",null,e.frontmatter.date),s.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}}))}))))},o}(s.a.Component),C=(e.default=k,"2584137191")},227:function(t,e,i){var o=i(83);t.exports=function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},s=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(i).filter((function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable})))),s.forEach((function(e){o(t,e,i[e])}))}return t}}}]);
//# sourceMappingURL=component---src-pages-index-js-177fbbabe4dc19846e8b.js.map