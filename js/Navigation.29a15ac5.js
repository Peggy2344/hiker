(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Navigation"],{"0ac6":function(t,e,a){t.exports=a.p+"img/mammut.fcb82026.jpg"},"2bc5":function(t,e,a){"use strict";a("a15b");var s=a("5530"),r=(a("abd3"),a("ade3")),i=a("1c87"),n=a("58df"),c=Object(n["a"])(i["a"]).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(r["a"])({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(t){var e=this.generateRouteLink(),a=e.tag,r=e.data;return t("li",[t(a,Object(s["a"])(Object(s["a"])({},r),{},{attrs:Object(s["a"])(Object(s["a"])({},r.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),o=a("80d2"),d=Object(o["i"])("v-breadcrumbs__divider","li"),u=a("7560");e["a"]=Object(n["a"])(u["a"]).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return Object(s["a"])({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(d,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var t=[],e=!!this.$scopedSlots.item,a=[],s=0;s<this.items.length;s++){var r=this.items[s];a.push(r.text),e?t.push(this.$scopedSlots.item({item:r})):t.push(this.$createElement(c,{key:a.join("."),props:r},[r.text])),s<this.items.length-1&&t.push(this.genDivider())}return t}},render:function(t){var e=this.$slots.default||this.genItems();return t("ul",{staticClass:"v-breadcrumbs",class:this.classes},e)}})},"2da7":function(t,e,a){"use strict";a("669c")},"4a17":function(t,e,a){t.exports=a.p+"img/womenBg.cb13ef19.jpg"},"669c":function(t,e,a){},"72ed":function(t,e,a){t.exports=a.p+"img/plain.f9f6d02f.png"},"74ae":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{staticClass:"home",attrs:{app:""}},[a("Navbar"),a("div",{staticClass:"pa-0 ma-0 vw-100"},[a("div",{staticClass:"vw-100 relative"},[a("div",{staticClass:"vw-100 relative mb-15 mb-sm-5"},[a("img",{staticClass:"vw-100 contain",attrs:{src:t.img[t.index].src||"@/assets/plain.png",rel:"preload"}}),a("div",{staticClass:"absolute category text-left"},[a("p",{directives:[{name:"clock",rawName:"v-clock"}],staticClass:"text-blue font-weight-bold ml-5"},[t._v(t._s(t.items[1].text))]),a("div",{staticClass:"box d-flex align-center justify-space-around"},t._l(t.category,(function(e){return a("router-link",{key:e.name,staticClass:"text+lg-h5 text-size text-orange-link",attrs:{to:{name:"Category",params:{category:e.route}},append:""}},[t._v(t._s(e.name))])})),1)])]),a("v-row",{staticClass:"ma-auto margin-lg pa-sm-10"},[a("v-col",{attrs:{cols:"12"}},[t.products.length?a("v-breadcrumbs",{staticClass:"breadcrumbs",attrs:{items:t.items,large:""},scopedSlots:t._u([{key:"divider",fn:function(){return[a("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}],null,!1,3681283568)}):t._e()],1),t.isLoading?t._l(8,(function(t){return a("v-col",{key:t,staticClass:"col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom",attrs:{cols:"6"}},[a("v-skeleton-loader",{staticClass:"mb-3",attrs:{width:"100%",type:"card-avatar, article"}})],1)})):t._l(t.products,(function(t){return a("v-col",{key:t._id,staticClass:"col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom height_for_card",attrs:{cols:"6"}},[a("ProductCard",{attrs:{product:t}})],1)}))],2)],1)]),a("Footer")],1)},r=[],i=(a("d81d"),a("45fc"),a("b0c0"),a("96cf"),a("1da1")),n=a("2c28"),c=a("d178"),o=a("e915"),d=a("fd2d"),u={components:{Navbar:c["a"],ProductCard:o["a"],Footer:d["a"]},data:function(){return{isLoading:!0,products:[],items:[{text:"首頁",disabled:!1,to:"/"},{text:"",disabled:!1,to:"/:navigation",exact:!0}],img:[{src:a("72ed")},{src:a("0ac6")},{src:a("4a17")},{src:a("f3e4")}],index:0}},computed:{category:function(){var t=[];return this.products&&this.products.map((function(e){if(!t.some((function(t){return t.name===e.category}))){var a={};a.name=e.category,a.route=e.categoryRoute,t.push(a)}})),t}},methods:{fetchData:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(n["g"])({navigation:t});case 3:s=a.sent,200===s.status&&(e.products=s.data.result,e.items[1].text=e.products[0].navigation,e.items[1].to={name:"Navigation",params:{navigation:t}},console.log(t),e.index="men"===t?1:"women"===t?2:3),e.isLoading=!1,a.next=11;break;case 8:a.prev=8,a.t0=a["catch"](0),console.log(a.t0);case 11:case"end":return a.stop()}}),a,null,[[0,8]])})))()}},beforeRouteUpdate:function(t,e,a){var s=t.params.navigation;this.fetchData(s),a()},mounted:function(){var t=this.$route.params.navigation;this.fetchData(t)}},l=u,m=(a("2da7"),a("2877")),p=a("6544"),v=a.n(p),f=a("7496"),b=a("2bc5"),g=a("62ad"),h=a("132d"),x=a("0fd9"),y=a("3129"),C=Object(m["a"])(l,s,r,!1,null,"70e5310e",null);e["default"]=C.exports;v()(C,{VApp:f["a"],VBreadcrumbs:b["a"],VCol:g["a"],VIcon:h["a"],VRow:x["a"],VSkeletonLoader:y["a"]})},abd3:function(t,e,a){},f3e4:function(t,e,a){t.exports=a.p+"img/equipment.9dca172d.jpg"}}]);
//# sourceMappingURL=Navigation.29a15ac5.js.map