(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Category"],{"0abe":function(t,e,i){"use strict";i("a1dd")},"2bc5":function(t,e,i){"use strict";i("a15b");var a=i("5530"),s=(i("abd3"),i("ade3")),n=i("1c87"),r=i("58df"),l=Object(r["a"])(n["a"]).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(s["a"])({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(t){var e=this.generateRouteLink(),i=e.tag,s=e.data;return t("li",[t(i,Object(a["a"])(Object(a["a"])({},s),{},{attrs:Object(a["a"])(Object(a["a"])({},s.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),c=i("80d2"),o=Object(c["i"])("v-breadcrumbs__divider","li"),u=i("7560");e["a"]=Object(r["a"])(u["a"]).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return Object(a["a"])({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(o,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var t=[],e=!!this.$scopedSlots.item,i=[],a=0;a<this.items.length;a++){var s=this.items[a];i.push(s.text),e?t.push(this.$scopedSlots.item({item:s})):t.push(this.$createElement(l,{key:i.join("."),props:s},[s.text])),a<this.items.length-1&&t.push(this.genDivider())}return t}},render:function(t){var e=this.$slots.default||this.genItems();return t("ul",{staticClass:"v-breadcrumbs",class:this.classes},e)}})},"33e9":function(t,e,i){},4886:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{staticClass:"home",attrs:{app:""}},[i("Navbar"),i("v-row",{staticClass:"ma-5 mt-5 d-flex transformY flex align-center justify-space-between"},[i("v-col",{staticClass:"col-lg-4 mr-auto px-0",attrs:{cols:"8"}},[t.products.length?i("v-breadcrumbs",{staticClass:"breadcrumbs",attrs:{items:t.items,large:""},scopedSlots:t._u([{key:"divider",fn:function(){return[i("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}],null,!1,3681283568)}):t._e()],1),t.range.length?i("v-col",{staticClass:"px-1 col-lg-8 d-flex justify-end relative zindex",attrs:{cols:"4"}},[i("div",{staticClass:"brightGray--text cursor",on:{click:function(e){t.filter=!t.filter}}},[t._v(" 篩選 "),i("v-icon",[t._v("mdi-chevron-down")])],1)]):t._e()],1),i("v-row",{staticClass:"ma-5 mt-15 d-flex flex mb-auto"},[t.isLoading?t._l(8,(function(t){return i("v-col",{key:t,staticClass:"col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom height_for_card",attrs:{cols:"6"}},[i("v-skeleton-loader",{attrs:{width:"80%",type:"card, article"}})],1)})):t.productsData.length?t._l(t.products,(function(t){return i("v-col",{key:t._id,staticClass:"col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom height_for_card",attrs:{cols:"6"}},[i("ProductCard",{staticClass:" index_above",attrs:{product:t}})],1)})):[i("v-col",{attrs:{cols:"12 d-flex justify-center"}},[i("div",[i("p",[t._v(" 目前沒有商品 ")])])])]],2),i("transition",{attrs:{name:"fadeIn"}},[t.filter?i("div",{staticClass:"col-10 col-lg-6 filter_box d-flex justify-lg-space-around flex-wrap zindex"},[i("div",{staticClass:"price col-12 col-lg-4"},[i("div",{staticClass:"col-12 pa-0"},[i("p",[t._v("價格")])]),i("div",{staticClass:"d-flex pa-0"},[i("v-text-field",{staticClass:"mt-0 mr-15 mb-5 pa-0 col-2",staticStyle:{width:"60px"},attrs:{"hide-details":"",value:t.range[0]},on:{change:function(e){return t.$set(t.range,0,e)}}}),i("v-text-field",{staticClass:"mt-0 ml-15 mb-5 pa-0 col-2",staticStyle:{width:"60px"},attrs:{"hide-details":"",value:t.range[1]},on:{change:function(e){return t.$set(t.range,1,e)}}})],1),i("div",{staticClass:"col-12 pa-0"},[i("v-range-slider",{staticClass:"align-center",attrs:{max:t.max,min:t.min,"hide-details":"",step:"1"},model:{value:t.range,callback:function(e){t.range=e},expression:"range"}})],1),i("div",{staticClass:"col-12 pa-0"},[i("v-btn",{staticClass:"mt-5",attrs:{small:"",color:"primary"},on:{click:t.applyPriceRange}},[t._v(" 更新 ")])],1)]),i("div",{staticClass:"brand col-12 col-lg-4"},[i("div",{staticClass:"col-12 pa-0"},[i("p",[t._v("品牌")])]),i("div",t._l(t.brands,(function(e){return i("v-checkbox",{key:e.brand,attrs:{label:e.brand+" ("+e.count+")",color:"primary",value:e.brand,"hide-details":""},model:{value:t.selectedBrand,callback:function(e){t.selectedBrand=e},expression:"selectedBrand"}})})),1)])]):t._e()]),t.isLoading?t._e():i("Footer",{staticClass:"mt-15"})],1)},s=[],n=(i("4de4"),i("c740"),i("4160"),i("d81d"),i("159b"),i("96cf"),i("1da1")),r=i("d178"),l=i("fd2d"),c=i("e915"),o=i("2c28"),u={components:{Navbar:r["a"],ProductCard:c["a"],Footer:l["a"]},data:function(){return{isLoading:!0,products:[],productsData:[],min:0,max:100,range:[0,100],selectedBrand:[],items:[{text:"首頁",disabled:!1,to:"/"},{text:"navigation",disabled:!1,to:"/:navigation",exact:!0},{text:"category",disabled:!0}],filter:!1}},methods:{fetchData:function(t,e){var i=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,s="","brand"!==t){a.next=8;break}return a.next=5,Object(o["a"])({brand:e});case 5:s=a.sent,a.next=11;break;case 8:return a.next=10,Object(o["b"])({navigation:t,category:e});case 10:s=a.sent;case 11:200===s.status&&s.data.result.length?(i.products=s.data.result,i.productsData=s.data.result,i.items[1].text=i.products[0].navigation,i.items[2].text=i.products[0].category,i.items[1].to={name:"Navigation",params:{navigation:t}},i.setPriceRange(),i.setBrand()):(i.products=[],i.productsData=[]),setTimeout((function(){i.isLoading=!1}),3e3),a.next=18;break;case 15:a.prev=15,a.t0=a["catch"](0),console.log(a.t0);case 18:case"end":return a.stop()}}),a,null,[[0,15]])})))()},setPriceRange:function(){var t=[];this.products.map((function(e){t.push(e.price)})),t.sort((function(t,e){return t-e})),this.min=t[0],this.max=t[t.length-1],this.range=[this.min,this.max]},setBrand:function(){var t=[];this.products.map((function(e){var i=t.findIndex((function(t){return t.brand===e.brand}));-1===i?t.push({brand:e.brand,count:1}):t[i].count++})),this.brands=t},applyPriceRange:function(){var t=this;this.products=this.productsData.filter((function(e){return e.price>=t.range[0]&&e.price<=t.range[1]}))}},watch:{selectedBrand:function(t){var e=this,i=[];this.selectedBrand.forEach((function(t){e.productsData.forEach((function(e){e.brand===t&&i.push(e)}))})),i.length?this.products=i:this.products=this.productsData}},mounted:function(){window.scrollTo(0,0);var t=this.$route.params,e=t.navigation,i=t.category;this.fetchData(e,i)},beforeRouteUpdate:function(t,e,i){var a=t.params,s=a.navigation,n=a.category;this.fetchData(s,n),i()}},h=u,d=(i("0abe"),i("2877")),v=i("6544"),m=i.n(v),p=i("7496"),b=i("2bc5"),f=i("8336"),g=i("ac7c"),y=i("62ad"),k=i("132d"),C=(i("99af"),i("a9e3"),i("2909")),x=i("ade3"),V=i("5530"),_=(i("33e9"),i("caad"),i("c975"),i("b680"),i("d3b7"),i("25f0"),i("2532"),i("498a"),i("9e29"),i("c37a")),$=i("0789"),T=i("58df"),w=i("297c"),S=i("a293"),j=i("80d2"),O=i("d9bd"),M=Object(T["a"])(_["a"],w["a"]).extend({name:"v-slider",directives:{ClickOutside:S["a"]},mixins:[w["a"]],props:{disabled:Boolean,inverseLabel:Boolean,max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:1},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:function(t){return"boolean"===typeof t||"always"===t}},thumbSize:{type:[Number,String],default:32},tickLabels:{type:Array,default:function(){return[]}},ticks:{type:[Boolean,String],default:!1,validator:function(t){return"boolean"===typeof t||"always"===t}},tickSize:{type:[Number,String],default:2},trackColor:String,trackFillColor:String,value:[Number,String],vertical:Boolean},data:function(){return{app:null,oldValue:null,keyPressed:0,isFocused:!1,isActive:!1,noClick:!1}},computed:{classes:function(){return Object(V["a"])(Object(V["a"])({},_["a"].options.computed.classes.call(this)),{},{"v-input__slider":!0,"v-input__slider--vertical":this.vertical,"v-input__slider--inverse-label":this.inverseLabel})},internalValue:{get:function(){return this.lazyValue},set:function(t){t=isNaN(t)?this.minValue:t;var e=this.roundValue(Math.min(Math.max(t,this.minValue),this.maxValue));e!==this.lazyValue&&(this.lazyValue=e,this.$emit("input",e))}},trackTransition:function(){return this.keyPressed>=2?"none":""},minValue:function(){return parseFloat(this.min)},maxValue:function(){return parseFloat(this.max)},stepNumeric:function(){return this.step>0?parseFloat(this.step):0},inputWidth:function(){return(this.roundValue(this.internalValue)-this.minValue)/(this.maxValue-this.minValue)*100},trackFillStyles:function(){var t,e=this.vertical?"bottom":"left",i=this.vertical?"top":"right",a=this.vertical?"height":"width",s=this.$vuetify.rtl?"auto":"0",n=this.$vuetify.rtl?"0":"auto",r=this.isDisabled?"calc(".concat(this.inputWidth,"% - 10px)"):"".concat(this.inputWidth,"%");return t={transition:this.trackTransition},Object(x["a"])(t,e,s),Object(x["a"])(t,i,n),Object(x["a"])(t,a,r),t},trackStyles:function(){var t,e=this.vertical?this.$vuetify.rtl?"bottom":"top":this.$vuetify.rtl?"left":"right",i=this.vertical?"height":"width",a="0px",s=this.isDisabled?"calc(".concat(100-this.inputWidth,"% - 10px)"):"calc(".concat(100-this.inputWidth,"%)");return t={transition:this.trackTransition},Object(x["a"])(t,e,a),Object(x["a"])(t,i,s),t},showTicks:function(){return this.tickLabels.length>0||!(this.isDisabled||!this.stepNumeric||!this.ticks)},numTicks:function(){return Math.ceil((this.maxValue-this.minValue)/this.stepNumeric)},showThumbLabel:function(){return!this.isDisabled&&!(!this.thumbLabel&&!this.$scopedSlots["thumb-label"])},computedTrackColor:function(){if(!this.isDisabled)return this.trackColor?this.trackColor:this.isDark?this.validationState:this.validationState||"primary lighten-3"},computedTrackFillColor:function(){if(!this.isDisabled)return this.trackFillColor?this.trackFillColor:this.validationState||this.computedColor},computedThumbColor:function(){return this.thumbColor?this.thumbColor:this.validationState||this.computedColor}},watch:{min:function(t){var e=parseFloat(t);e>this.internalValue&&this.$emit("input",e)},max:function(t){var e=parseFloat(t);e<this.internalValue&&this.$emit("input",e)},value:{handler:function(t){this.internalValue=t}}},beforeMount:function(){this.internalValue=this.value},mounted:function(){this.app=document.querySelector("[data-app]")||Object(O["c"])("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot:function(){var t=[this.genLabel()],e=this.genSlider();return this.inverseLabel?t.unshift(e):t.push(e),t.push(this.genProgress()),t},genSlider:function(){return this.$createElement("div",{class:Object(V["a"])({"v-slider":!0,"v-slider--horizontal":!this.vertical,"v-slider--vertical":this.vertical,"v-slider--focused":this.isFocused,"v-slider--active":this.isActive,"v-slider--disabled":this.isDisabled,"v-slider--readonly":this.isReadonly},this.themeClasses),directives:[{name:"click-outside",value:this.onBlur}],on:{click:this.onSliderClick}},this.genChildren())},genChildren:function(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isActive,this.isFocused,this.onThumbMouseDown,this.onFocus,this.onBlur)]},genInput:function(){return this.$createElement("input",{attrs:Object(V["a"])({value:this.internalValue,id:this.computedId,disabled:!0,readonly:!0,tabindex:-1},this.$attrs)})},genTrackContainer:function(){var t=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track-background",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedTrackFillColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},t)},genSteps:function(){var t=this;if(!this.step||!this.showTicks)return null;var e=parseFloat(this.tickSize),i=Object(j["h"])(this.numTicks+1),a=this.vertical?"bottom":this.$vuetify.rtl?"right":"left",s=this.vertical?this.$vuetify.rtl?"left":"right":"top";this.vertical&&i.reverse();var n=i.map((function(i){var n,r=[];t.tickLabels[i]&&r.push(t.$createElement("div",{staticClass:"v-slider__tick-label"},t.tickLabels[i]));var l=i*(100/t.numTicks),c=t.$vuetify.rtl?100-t.inputWidth<l:l<t.inputWidth;return t.$createElement("span",{key:i,staticClass:"v-slider__tick",class:{"v-slider__tick--filled":c},style:(n={width:"".concat(e,"px"),height:"".concat(e,"px")},Object(x["a"])(n,a,"calc(".concat(l,"% - ").concat(e/2,"px)")),Object(x["a"])(n,s,"calc(50% - ".concat(e/2,"px)")),n)},r)}));return this.$createElement("div",{staticClass:"v-slider__ticks-container",class:{"v-slider__ticks-container--always-show":"always"===this.ticks||this.tickLabels.length>0}},n)},genThumbContainer:function(t,e,i,a,s,n,r){var l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"thumb",c=[this.genThumb()],o=this.genThumbLabelContent(t);return this.showThumbLabel&&c.push(this.genThumbLabel(o)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{ref:l,key:l,staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--active":i,"v-slider__thumb-container--focused":a,"v-slider__thumb-container--show-label":this.showThumbLabel},style:this.getThumbContainerStyles(e),attrs:Object(V["a"])({role:"slider",tabindex:this.isDisabled?-1:this.$attrs.tabindex?this.$attrs.tabindex:0,"aria-label":this.label,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue,"aria-readonly":String(this.isReadonly),"aria-orientation":this.vertical?"vertical":"horizontal"},this.$attrs),on:{focus:n,blur:r,keydown:this.onKeyDown,keyup:this.onKeyUp,touchstart:s,mousedown:s}}),c)},genThumbLabelContent:function(t){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:t}):[this.$createElement("span",[String(t)])]},genThumbLabel:function(t){var e=Object(j["g"])(this.thumbSize),i=this.vertical?"translateY(20%) translateY(".concat(Number(this.thumbSize)/3-1,"px) translateX(55%) rotate(135deg)"):"translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)";return this.$createElement($["d"],{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label-container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:e,width:e,transform:i}}),[this.$createElement("div",t)])])])},genThumb:function(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},getThumbContainerStyles:function(t){var e=this.vertical?"top":"left",i=this.$vuetify.rtl?100-t:t;return i=this.vertical?100-i:i,Object(x["a"])({transition:this.trackTransition},e,"".concat(i,"%"))},onThumbMouseDown:function(t){t.preventDefault(),this.oldValue=this.internalValue,this.keyPressed=2,this.isActive=!0;var e=!j["C"]||{passive:!0,capture:!0},i=!!j["C"]&&{passive:!0};"touches"in t?(this.app.addEventListener("touchmove",this.onMouseMove,i),Object(j["a"])(this.app,"touchend",this.onSliderMouseUp,e)):(this.app.addEventListener("mousemove",this.onMouseMove,i),Object(j["a"])(this.app,"mouseup",this.onSliderMouseUp,e)),this.$emit("start",this.internalValue)},onSliderMouseUp:function(t){t.stopPropagation(),this.keyPressed=0;var e=!!j["C"]&&{passive:!0};this.app.removeEventListener("touchmove",this.onMouseMove,e),this.app.removeEventListener("mousemove",this.onMouseMove,e),this.$emit("mouseup",t),this.$emit("end",this.internalValue),Object(j["j"])(this.oldValue,this.internalValue)||(this.$emit("change",this.internalValue),this.noClick=!0),this.isActive=!1},onMouseMove:function(t){var e=this.parseMouseMove(t),i=e.value;this.internalValue=i},onKeyDown:function(t){if(this.isInteractive){var e=this.parseKeyDown(t,this.internalValue);null==e||e<this.minValue||e>this.maxValue||(this.internalValue=e,this.$emit("change",e))}},onKeyUp:function(){this.keyPressed=0},onSliderClick:function(t){if(this.noClick)this.noClick=!1;else{var e=this.$refs.thumb;e.focus(),this.onMouseMove(t),this.$emit("change",this.internalValue)}},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},parseMouseMove:function(t){var e=this.vertical?"top":"left",i=this.vertical?"height":"width",a=this.vertical?"clientY":"clientX",s=this.$refs.track.getBoundingClientRect(),n=s[e],r=s[i],l="touches"in t?t.touches[0][a]:t[a],c=Math.min(Math.max((l-n)/r,0),1)||0;this.vertical&&(c=1-c),this.$vuetify.rtl&&(c=1-c);var o=l>=n&&l<=n+r,u=parseFloat(this.min)+c*(this.maxValue-this.minValue);return{value:u,isInsideTrack:o}},parseKeyDown:function(t,e){if(this.isInteractive){var i=j["y"].pageup,a=j["y"].pagedown,s=j["y"].end,n=j["y"].home,r=j["y"].left,l=j["y"].right,c=j["y"].down,o=j["y"].up;if([i,a,s,n,r,l,c,o].includes(t.keyCode)){t.preventDefault();var u=this.stepNumeric||1,h=(this.maxValue-this.minValue)/u;if([r,l,c,o].includes(t.keyCode)){this.keyPressed+=1;var d=this.$vuetify.rtl?[r,o]:[l,o],v=d.includes(t.keyCode)?1:-1,m=t.shiftKey?3:t.ctrlKey?2:1;e+=v*u*m}else if(t.keyCode===n)e=this.minValue;else if(t.keyCode===s)e=this.maxValue;else{var p=t.keyCode===a?1:-1;e-=p*u*(h>100?h/10:10)}return e}}},roundValue:function(t){if(!this.stepNumeric)return t;var e=this.step.toString().trim(),i=e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0,a=this.minValue%this.stepNumeric,s=Math.round((t-a)/this.stepNumeric)*this.stepNumeric+a;return parseFloat(Math.min(s,this.maxValue).toFixed(i))}}}),D=M,F=D.extend({name:"v-range-slider",props:{value:{type:Array,default:function(){return[0,0]}}},data:function(){return{activeThumb:null,lazyValue:this.value}},computed:{classes:function(){return Object(V["a"])(Object(V["a"])({},D.options.computed.classes.call(this)),{},{"v-input--range-slider":!0})},internalValue:{get:function(){return this.lazyValue},set:function(t){var e=this,i=t.map((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return e.roundValue(Math.min(Math.max(t,e.minValue),e.maxValue))}));if(i[0]>i[1]||i[1]<i[0]){if(null!==this.activeThumb){var a=1===this.activeThumb?0:1,s=this.$refs["thumb_".concat(a)];s.focus()}i=[i[1],i[0]]}this.lazyValue=i,Object(j["j"])(i,this.value)||this.$emit("input",i),this.validate()}},inputWidth:function(){var t=this;return this.internalValue.map((function(e){return(t.roundValue(e)-t.minValue)/(t.maxValue-t.minValue)*100}))}},methods:{getTrackStyle:function(t,e){var i,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=this.vertical?this.$vuetify.rtl?"top":"bottom":this.$vuetify.rtl?"right":"left",r=this.vertical?"height":"width",l="calc(".concat(t,"% + ").concat(a,"px)"),c="calc(".concat(e,"% + ").concat(s,"px)");return i={transition:this.trackTransition},Object(x["a"])(i,n,l),Object(x["a"])(i,r,c),i},getIndexOfClosestValue:function(t,e){return Math.abs(t[0]-e)<Math.abs(t[1]-e)?0:1},genInput:function(){var t=this;return Object(j["h"])(2).map((function(e){var i=D.options.methods.genInput.call(t);return i.data=i.data||{},i.data.attrs=i.data.attrs||{},i.data.attrs.value=t.internalValue[e],i.data.attrs.id="input-".concat(e?"max":"min","-").concat(t._uid),i}))},genTrackContainer:function(){var t=this,e=[],i=this.isDisabled?10:0,a=[{class:"v-slider__track-background",color:this.computedTrackColor,styles:[0,this.inputWidth[0],0,-i]},{class:this.isDisabled?"v-slider__track-background":"v-slider__track-fill",color:this.isDisabled?this.computedTrackColor:this.computedTrackFillColor,styles:[this.inputWidth[0],Math.abs(this.inputWidth[1]-this.inputWidth[0]),i,-2*i]},{class:"v-slider__track-background",color:this.computedTrackColor,styles:[this.inputWidth[1],Math.abs(100-this.inputWidth[1]),i,-i]}];return this.$vuetify.rtl&&a.reverse(),e.push.apply(e,Object(C["a"])(a.map((function(e){return t.$createElement("div",t.setBackgroundColor(e.color,{staticClass:e.class,style:t.getTrackStyle.apply(t,Object(C["a"])(e.styles))}))})))),this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},e)},genChildren:function(){var t=this;return[this.genInput(),this.genTrackContainer(),this.genSteps(),Object(j["h"])(2).map((function(e){var i=t.internalValue[e],a=function(i){t.isActive=!0,t.activeThumb=e,t.onThumbMouseDown(i)},s=function(i){t.isFocused=!0,t.activeThumb=e,t.$emit("focus",i)},n=function(e){t.isFocused=!1,t.activeThumb=null,t.$emit("blur",e)},r=t.inputWidth[e],l=t.isActive&&t.activeThumb===e,c=t.isFocused&&t.activeThumb===e;return t.genThumbContainer(i,r,l,c,a,s,n,"thumb_".concat(e))}))]},onSliderClick:function(t){if(!this.isActive){if(this.noClick)return void(this.noClick=!1);var e=this.parseMouseMove(t),i=e.value,a=e.isInsideTrack;if(a){this.activeThumb=this.getIndexOfClosestValue(this.internalValue,i);var s="thumb_".concat(this.activeThumb),n=this.$refs[s];n.focus()}this.setInternalValue(i),this.$emit("change",this.internalValue)}},onMouseMove:function(t){var e=this.parseMouseMove(t),i=e.value,a=e.isInsideTrack;a&&null===this.activeThumb&&(this.activeThumb=this.getIndexOfClosestValue(this.internalValue,i)),this.setInternalValue(i)},onKeyDown:function(t){if(null!==this.activeThumb){var e=this.parseKeyDown(t,this.internalValue[this.activeThumb]);null!=e&&(this.setInternalValue(e),this.$emit("change",this.internalValue))}},setInternalValue:function(t){var e=this;this.internalValue=this.internalValue.map((function(i,a){return a===e.activeThumb?t:Number(i)}))}}}),L=i("0fd9"),B=i("3129"),E=i("8654"),I=Object(d["a"])(h,a,s,!1,null,"40c7028c",null);e["default"]=I.exports;m()(I,{VApp:p["a"],VBreadcrumbs:b["a"],VBtn:f["a"],VCheckbox:g["a"],VCol:y["a"],VIcon:k["a"],VRangeSlider:F,VRow:L["a"],VSkeletonLoader:B["a"],VTextField:E["a"]})},"9e29":function(t,e,i){},a1dd:function(t,e,i){},abd3:function(t,e,i){}}]);
//# sourceMappingURL=Category.8803b928.js.map