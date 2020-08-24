(function(e){function t(t){for(var n,o,i=t[0],u=t[1],c=t[2],h=0,p=[];h<i.length;h++)o=i[h],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(p.length)p.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],n=!0,i=1;i<a.length;i++){var u=a[i];0!==s[u]&&(n=!1)}n&&(r.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},s={app:0},r=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/albums-by-year/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var l=u;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"18d7":function(e,t,a){"use strict";var n=a("96c1"),s=a.n(n);s.a},"4a2f":function(e,t,a){"use strict";var n=a("94a6"),s=a.n(n);s.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:{app:!0,desktop:e.desktop}},[a("div",{staticClass:"header"},[e._v("Albums By Year")]),a("main",[e.authorised?a("Library",{attrs:{access_token:e.access_token}}):a("div",{staticClass:"login"},[a("h1",{staticClass:"title"},[e._v("Albums By Year")]),a("p",{staticClass:"preface"},[e._v("See your saved albums on spotify, categorised by year!")]),a("a",{staticClass:"auth",attrs:{href:e.authoriseURL,target:"_self"}},[e._v("LOG IN WITH SPOTIFY")])])],1),a("footer",[a("ul",[a("li",[a("font-awesome-icon",{staticClass:"icon",attrs:{icon:["fab","github"]}}),a("a",{attrs:{href:"https://github.com/TheTeaCat/albums-by-year/"}},[e._v("GitHub")])],1),e._m(0)])])])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[e._v("Made by "),a("a",{attrs:{href:"http://joshuarainbow.co.uk/"}},[e._v("Josh")])])}],o=(a("4160"),a("a15b"),a("d81d"),a("ac1f"),a("5319"),a("1276"),a("159b"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"library"},[e.loaded?a("div",[a("h1",{staticClass:"library-header"},[a("a",{staticClass:"username",attrs:{href:e.profile.external_urls.spotify}},[e._v(e._s(e.profile.display_name))]),e._v(e._s("s"==e.profile.display_name[e.profile.display_name.length-1]?"'":"'s")+" saved albums, by year"),a("span",[e._v("!")])]),a("ToggleGroup",{attrs:{options:e.album_types,title:"Release Types"}}),a("div",{staticClass:"searchbox-cont"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchBoxContent,expression:"searchBoxContent"}],class:{searchbox:!0,populated:""!=e.searchBoxContent},attrs:{placeholder:"Search..."},domProps:{value:e.searchBoxContent},on:{keyup:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateSearchQuery(t)},e.searchQueryChange],input:function(t){t.target.composing||(e.searchBoxContent=t.target.value)}}}),""==e.searchBoxContent?a("font-awesome-icon",{staticClass:"icon fa-fw",attrs:{icon:"search"},on:{click:e.updateSearchQuery}}):a("font-awesome-icon",{staticClass:"icon fa-fw",attrs:{icon:"times"},on:{click:e.clearSearchQuery}})],1),a("ol",e._l(e.sortedAlbumYears,(function(t){return a("Year",{key:t,attrs:{year:t,albums:e.albumsByYear[t].albums,album_types:e.album_types,search_query:e.search_query,access_token:e.access_token},on:{filtered:function(a){e.albumsByYear[t].empty=0==a,e.checkAlbumsShown()}}})})),1),a("h2",{directives:[{name:"show",rawName:"v-show",value:0==e.loadedAlbums.length,expression:"loadedAlbums.length == 0"}],staticClass:"empty-notice"},[e._v("You haven't got any saved albums!")]),a("h2",{directives:[{name:"show",rawName:"v-show",value:e.no_albums_shown,expression:"no_albums_shown"}],staticClass:"empty-notice"},[e._v("None of your albums match these filters!")])],1):a("div",{staticClass:"loading"},[a("h1",{staticClass:"loading-title"},[e._v("Loading")]),a("p",{staticClass:"album-count"},[e._v(e._s(e.loadedAlbums)+" albums")])])])}),i=[],u=(a("a623"),a("b64b"),a("498a"),a("b85c")),c=(a("96cf"),a("1da1")),l=a("bc3a"),h=a.n(l),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",e._l(Object.keys(e.options),(function(t){return a("li",{key:t},[a("Toggle",{staticClass:"toggle",attrs:{value:e.options[t].show},on:{change:function(a){e.options[t].show=!e.options[t].show}}}),e._v(" "+e._s(e.options[t].display)+" ")],1)})),0)},f=[],m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"switch"},[a("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{click:function(t){return e.$emit("change")}}}),a("span",{staticClass:"slider"})])},d=[],b={props:["value"]},v=b,_=(a("b203"),a("2877")),y=Object(_["a"])(v,m,d,!1,null,"42d3c72a",null),w=y.exports,g={components:{Toggle:w},props:["title","options"]},k=g,x=(a("5748"),Object(_["a"])(k,p,f,!1,null,"62e1868c",null)),C=x.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",{directives:[{name:"show",rawName:"v-show",value:e.visibleAlbums>0,expression:"visibleAlbums > 0"}],staticClass:"year"},[a("hr"),a("h2",{staticClass:"year-header",on:{click:function(t){e.expanded=!e.expanded}}},[a("font-awesome-icon",{class:{icon:!0,expanded:e.expanded},attrs:{icon:e.expanded?"minus":"plus"}}),e._v(" "+e._s(e.year)+" "),a("span",[e._v("("+e._s(e.visibleAlbums)+")")])],1),a("ol",{directives:[{name:"show",rawName:"v-show",value:e.expanded,expression:"expanded"}],staticClass:"albums-list"},e._l(e.sortedAlbums,(function(t){return a("Album",{directives:[{name:"show",rawName:"v-show",value:e.albumShown(t),expression:"albumShown(a)"}],key:t.album.id,attrs:{album:t}})})),1)])},j=[],A=(a("4de4"),a("caad"),a("fb6a"),a("45fc"),a("b0c0"),a("2532"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",{staticClass:"album"},[e.albumCover?a("img",{attrs:{src:e.albumCover}}):e._e(),a("div",{staticClass:"album-title"},[a("a",{attrs:{href:e.album.album.external_urls.spotify}},[e._v(e._s(e.album.album.name))])]),a("ul",{staticClass:"artists-list"},e._l(e.album.album.artists,(function(t){return a("li",{key:t.id},[a("a",{attrs:{href:t.external_urls.spotify}},[e._v(e._s(t.name))])])})),0),a("div",{staticClass:"album-release-date"},[e._v(e._s(e.album.album.release_date.replace(/-/g,"/")))])])}),S=[],B={props:["access_token","album"],data:function(){return{albumCover:null}},mounted:function(){this.album.album.images.sort((function(e,t){return t.width*t.height-e.width*e.height}))[0],this.albumCover=this.album.album.images[0].url}},Y=B,q=(a("4a2f"),Object(_["a"])(Y,A,S,!1,null,"4bdd8387",null)),T=q.exports,$={components:{Album:T},props:["access_token","year","albums","album_types","search_query"],data:function(){return{expanded:!1}},computed:{sortedAlbums:function(){return this.albums.slice().sort((function(e,t){var a=e.album.release_date,n=t.album.release_date;return a>n?-1:a<n?1:0}))},visibleAlbums:function(){var e=this,t=this.albums.filter((function(t){return e.albumShown(t)})).length;return this.$emit("filtered",t),t}},methods:{albumShown:function(e){var t=this;return this.album_types[e.album.album_type].show&&(""==this.search_query||e.album.name.toLowerCase().includes(this.search_query.toLowerCase())||e.album.artists.map((function(e){return e.name.toLowerCase().includes(t.search_query.toLowerCase())})).some((function(e){return e})))}}},N=$,E=(a("18d7"),Object(_["a"])(N,O,j,!1,null,"8975f206",null)),L=E.exports,P={components:{ToggleGroup:C,Year:L},props:["access_token"],data:function(){return{albumsByYear:null,profile:null,album_types:{album:{show:!0,display:"Albums"},single:{show:!1,display:"Singles"},compilation:{show:!1,display:"Compilations"}},loadedAlbums:0,search_query:"",searchBoxContent:"",no_albums_shown:!1}},computed:{albums_request_url:function(){return"https://api.spotify.com/v1/me/albums?access_token="+this.access_token+"&limit=50&offset=0"},profile_request_url:function(){return"https://api.spotify.com/v1/me/?access_token="+this.access_token},sortedAlbumYears:function(){return Object.keys(this.albumsByYear).sort((function(e,t){return t-e}))},loaded:function(){return this.albumsByYear&&this.profile}},methods:{updateSearchQuery:function(){this.search_query=this.searchBoxContent.trim()},searchQueryChange:function(e){var t=this,a=e.target.value;setTimeout((function(){a==t.searchBoxContent&&t.updateSearchQuery(e)}),1e3)},clearSearchQuery:function(){this.searchBoxContent="",this.search_query=""},checkAlbumsShown:function(){var e=this;this.no_albums_shown=Object.keys(this.albumsByYear).map((function(t){return e.albumsByYear[t].empty})).every((function(e){return e}))}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h.a.get(t).then(function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var s,r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loadedAlbums+=t.data.items.length,!t.data.next){e.next=4;break}return e.next=4,a(t.data.next+"&access_token="+this.access_token,n);case 4:t=t.data.items,s=Object(u["a"])(t);try{for(s.s();!(r=s.n()).done;)o=r.value,i=o["album"]["release_date"].split("-")[0],!n[i]&&(n[i]={year:i,albums:[]}),n[i]["albums"].push(o)}catch(c){s.e(c)}finally{s.f()}case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}().bind(this));case 2:return e.abrupt("return",n);case 3:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}().bind(e),t.next=3,a(e.albums_request_url,{});case 3:e.albumsByYear=t.sent,h.a.get(e.profile_request_url).then(function(e){this.profile=e.data}.bind(e));case 5:case"end":return t.stop()}}),t)})))()}},R=P,Q=(a("81b4"),Object(_["a"])(R,o,i,!1,null,"6f48874c",null)),M=Q.exports,G={components:{Library:M},data:function(){return{scopes:["user-library-read"],client_id:"8c00d93547824017b1854018ed35bdef",access_token:null}},computed:{authorised:function(){return!!this.access_token},authoriseURL:function(){return"https://accounts.spotify.com/authorize?client_id="+this.client_id+"&response_type=token&redirect_uri="+location.protocol+"//"+location.host+location.pathname+"&scope="+this.scopes.join("%20")},desktop:function(){return!/Mobi/i.test(window.navigator.userAgent)}},mounted:function(){var e={};this.$route.hash.split("&").map((function(e){return e.replace("#","")})).forEach((function(t){var a=t.split("=");e[a[0]]=a[1]})),this.access_token=e["access_token"],this.authorised&&this.$router.push(this.$route.path)}},F=G,I=(a("5c0b"),Object(_["a"])(F,s,r,!1,null,null,null)),J=I.exports,H=a("8c4f"),U=a("a7fe"),z=a.n(U),W=a("ecee"),D=a("ad3d"),K=a("f2d1"),V=a("c074");W["c"].add(K["a"]),W["c"].add(V["b"],V["a"],V["c"],V["d"]),n["a"].component("font-awesome-icon",D["a"]);var X=a("9483");Object(X["a"])("".concat("/albums-by-year/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),n["a"].use(H["a"]);var Z=new H["a"]({mode:"history",routes:[]});n["a"].use(z.a,h.a),n["a"].config.productionTip=!1,new n["a"]({router:Z,render:function(e){return e(J)}}).$mount("#app")},5748:function(e,t,a){"use strict";var n=a("c2a9"),s=a.n(n);s.a},"5c0b":function(e,t,a){"use strict";var n=a("9c0c"),s=a.n(n);s.a},"6fea":function(e,t,a){},"81b4":function(e,t,a){"use strict";var n=a("6fea"),s=a.n(n);s.a},"94a6":function(e,t,a){},"96c1":function(e,t,a){},"9c0c":function(e,t,a){},b203:function(e,t,a){"use strict";var n=a("e95b"),s=a.n(n);s.a},c2a9:function(e,t,a){},e95b:function(e,t,a){}});
//# sourceMappingURL=app.527c0601.js.map