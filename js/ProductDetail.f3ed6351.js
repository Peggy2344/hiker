(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ProductDetail"],{"1bfb":function(t,e,s){},"2bc5":function(t,e,s){"use strict";s("a15b");var i=s("5530"),r=(s("abd3"),s("ade3")),a=s("1c87"),n=s("58df"),o=Object(n["a"])(a["a"]).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(r["a"])({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(t){var e=this.generateRouteLink(),s=e.tag,r=e.data;return t("li",[t(s,Object(i["a"])(Object(i["a"])({},r),{},{attrs:Object(i["a"])(Object(i["a"])({},r.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),l=s("80d2"),c=Object(l["i"])("v-breadcrumbs__divider","li"),u=s("7560");e["a"]=Object(n["a"])(u["a"]).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return Object(i["a"])({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(c,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var t=[],e=!!this.$scopedSlots.item,s=[],i=0;i<this.items.length;i++){var r=this.items[i];s.push(r.text),e?t.push(this.$scopedSlots.item({item:r})):t.push(this.$createElement(o,{key:s.join("."),props:r},[r.text])),i<this.items.length-1&&t.push(this.genDivider())}return t}},render:function(t){var e=this.$slots.default||this.genItems();return t("ul",{staticClass:"v-breadcrumbs",class:this.classes},e)}})},4208:function(t,e,s){!function(e,s){t.exports=s()}(0,(function(){"use strict";return function(t,e,s){t=t||{};var i=e.prototype,r={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(t,e,s,r){return i.fromToBase(t,e,s,r)}s.en.relativeTime=r,i.fromToBase=function(e,i,a,n,o){for(var l,c,u,d=a.$locale().relativeTime||r,h=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,f=0;f<m;f+=1){var p=h[f];p.d&&(l=n?s(e).diff(a,p.d,!0):a.diff(e,p.d,!0));var v=(t.rounding||Math.round)(Math.abs(l));if(u=l>0,v<=p.r||!p.r){v<=1&&f>0&&(p=h[f-1]);var g=d[p.l];o&&(v=o(""+v)),c="string"==typeof g?g.replace("%d",v):g(v,i,p.l,u);break}}if(i)return c;var b=u?d.future:d.past;return"function"==typeof b?b(c):b.replace("%s",c)},i.to=function(t,e){return a(t,e,this,!0)},i.from=function(t,e){return a(t,e,this)};var n=function(t){return t.$u?s.utc():s()};i.toNow=function(t){return this.to(n(this),t)},i.fromNow=function(t){return this.from(n(this),t)}}}))},5087:function(t,e,s){!function(e,i){t.exports=i(s("5a0c"))}(0,(function(t){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;var e={name:"zh-tw",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(t){return t+"日"},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日 HH:mm",LLLL:"YYYY年M月D日dddd HH:mm",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}};return t.locale(e,null,!0),e}))},"5f47":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{staticClass:"home",attrs:{app:""}},[s("Navbar"),s("v-row",{staticClass:"d-flex justify-space-around align-start flex ma-0 mx-lg-10 mt-15"},[s("v-col",{staticClass:"h-10 mt-5",attrs:{cols:"12"}},[t.links[3].text?s("v-breadcrumbs",{attrs:{items:t.links,large:""},scopedSlots:t._u([{key:"divider",fn:function(){return[s("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}],null,!1,3681283568)}):t._e()],1),t.isLoading?s("v-container",{staticClass:"progress"},[s("v-progress-circular",{attrs:{size:50,color:"primary",indeterminate:""}})],1):[s("v-col",{staticClass:"col-md-4 col-sm-6 img_height d-flex justify-center ml-lg-5",attrs:{cols:"8"}},[[s("ProductImage",{staticClass:"h-100 w-80",attrs:{product:t.product}})]],2),s("v-col",{staticClass:"col-md-7 d-flex flex-column align-center",attrs:{cols:"12"}},[s("v-col",{staticClass:"d-flex flex-column align-center align-lg-start",attrs:{cols:"8"}},[s("div",[s("p",{staticClass:"text-subtitle"},[t._v(t._s(t.product.brand))])]),s("div",[s("p",{staticClass:"text-h5 text-lg-h4 font-weight-bold"},[t._v(t._s(t.product.productName))])]),t.comments.length?[s("div",{staticClass:"d-flex justify-center align-center mb-5 flex-wrap"},[s("span",{staticClass:"text-h5 words--text py-5 mr-3"},[t._v(t._s(t.rating))]),s("v-rating",{attrs:{value:t.rating,"background-color":"primary lighten-3",color:"primary",size:"25","half-increments":"",readonly:""}}),s("div",[s("a",{staticClass:"link words--text text-lg-subtitle-1 text-subtitle-2 pa-3",attrs:{href:"#review"}},[s("span",{staticClass:"highlight"},[t._v(t._s(t.comments.length)+"則評論")])])])],1)]:t._e(),s("div",[s("p",{staticClass:"text-subtitle font-weight-bold primary--text"},[t._v("$"+t._s(t.product.price))])])],2),s("v-col",{staticClass:"d-flex flex-wrap pa-0 justify-center py-0",attrs:{cols:"12"}},[t.details.length?[s("v-col",{staticClass:"col-lg-4 pa-0 mx-3",attrs:{cols:"4"}},[s("v-select",{attrs:{items:t.color,label:"請選擇顏色",outlined:""},model:{value:t.selectedColor,callback:function(e){t.selectedColor=e},expression:"selectedColor"}})],1),t.size.length?s("v-col",{staticClass:"col-lg-4 pa-0 mx-3",attrs:{cols:"4"}},[s("v-select",{attrs:{items:t.size,label:"請選擇尺寸",outlined:""},model:{value:t.selectedSize,callback:function(e){t.selectedSize=e},expression:"selectedSize"}})],1):t._e()]:t._e(),s("v-col",{staticClass:"px-0 mx-3 d-flex justify-center",attrs:{cols:"8"}},[s("div",{staticClass:"col-10 col-lg-6"},[s("v-text-field",{staticClass:"centered-input",attrs:{"hide-details":"",outlined:"",label:"數量"},model:{value:t.quantity,callback:function(e){t.quantity=t._n(e)},expression:"quantity"}},[s("v-icon",{attrs:{slot:"prepend-inner"},on:{click:t.minusCount},slot:"prepend-inner"},[t._v(" mdi-minus ")]),s("v-icon",{attrs:{slot:"append"},on:{click:function(e){t.quantity++}},slot:"append"},[t._v(" mdi-plus ")])],1)],1)]),s("v-col",{staticClass:"col-lg-8 px-0 mx-3 mt-lg-10 text-center",attrs:{cols:"10"}},[s("v-btn",{attrs:{depressed:"",color:"primary",width:"80%",height:"50px",disabled:t.pending},on:{click:t.submitHandler}},[t._v(" "+t._s(t.pending?"加入中":"加入購物車")+" ")])],1)],2)],1)]],2),t.isLoading?t._e():s("v-container",{staticClass:"d-flex justify-center align-center flex-column py-lg-15 px-lg-15 mx-auto my-15",attrs:{id:"review"}},[s("v-col",{staticClass:"d-flex flex-wrap",attrs:{cols:"12"}},[s("div",{staticClass:"left"}),s("div",{staticClass:"d-flex col-12 col-md-6 justify-center align-center flex-wrap"},[s("span",{staticClass:"text-lg-h3 text-sm-h4 text-h5 words--text mx-5"},[t._v(t._s(t.rating))]),s("v-rating",{attrs:{value:t.rating,"background-color":"brightGray lighten-3",color:"brightGray",size:"25","half-increments":"",readonly:""}}),s("span",{staticClass:"words--text text-lg-subtitle-1 text-subtitle-2 pa-3"},[t._v(t._s(t.comments.length)+"則評論")])],1),s("div",{staticClass:"right d-flex col-12 col-md-4 justify-center"},[s("v-btn",t._b({staticClass:"ma-2 outlineBtn",attrs:{outlined:"",color:"primary"},on:{click:t.commentHandler}},"v-btn",t.ratingSize,!1),[t._v(" 發表評論 ")]),s("v-btn",t._b({staticClass:"ma-2 outlineBtn",attrs:{outlined:"",color:"brightGray"},on:{click:function(e){t.showQuestionForm=!0}}},"v-btn",t.ratingSize,!1),[t._v(" 發問 ")])],1)]),s("v-col",{staticClass:"col-lg-10 d-flex flex-column align-center py-10",attrs:{cols:"12"}},[s("v-tabs",{attrs:{"background-color":"transparent"},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[s("v-tab",{attrs:{href:"#comment"}},[t._v("評論("+t._s(t.comments.length)+")")]),s("v-tab",{attrs:{href:"#question"}},[t._v("問題("+t._s(t.questions.length)+")")])],1),s("v-row",{staticClass:"d-flex justify-center align-start ma-auto w100 min-height"},[t.comments.length&&"comment"===t.tabs?t._l(t.comments,(function(e){return s("CommentCard",{key:e._id,staticClass:"bordertop",attrs:{comment:e._id,productId:t.product._id}})})):t.questions.length&&"question"===t.tabs?t._l(t.questions,(function(e){return s("QuestionCard",{key:e.id,staticClass:"bordertop",attrs:{question:e,productId:t.product._id}})})):"comment"===t.tabs?[s("div",{staticClass:"mt-15"},[t._v(" 目前還沒有評價 ")])]:[s("div",{staticClass:"mt-15"},[t._v(" 目前還沒有人發問 ")])]],2)],1),s("transition",{attrs:{name:"fade"}},[s("v-dialog",{attrs:{width:"600",color:"#333"},model:{value:t.showCommentForm,callback:function(e){t.showCommentForm=e},expression:"showCommentForm"}},[s("CommentForm",{attrs:{productId:t.product._id},on:{"after-comment":t.afterComment,"close-form":function(e){t.showCommentForm=!1}}})],1)],1),s("transition",{attrs:{name:"fade"}},[s("v-dialog",{attrs:{width:"600",color:"#333"},model:{value:t.showQuestionForm,callback:function(e){t.showQuestionForm=e},expression:"showQuestionForm"}},[s("QuestionForm",{attrs:{productId:t.product._id},on:{"after-question":t.afterAsk,"close-form":function(e){t.showCommentForm=!1}}})],1)],1)],1),s("transition",{attrs:{name:"fade"}},[s("v-snackbar",{staticClass:"col-12 col-lg-4",attrs:{top:"",right:!t.$vuetify.breakpoint.mobile,light:"",flat:"",color:"transparent",elevation:"0",timeout:t.timeout},model:{value:t.showOrder,callback:function(e){t.showOrder=e},expression:"showOrder"}},[s("div",{staticClass:"col-12 col-lg-8 ordercard"},[s("v-btn",{staticClass:"close_btn",attrs:{icon:""},on:{click:function(e){t.showOrder=!t.showOrder}}},[s("v-icon",{attrs:{color:"primary",small:""}},[t._v(" mdi-close ")])],1),t.orderData?s("PopUpCard",{attrs:{product:t.orderData}}):t._e()],1)])],1)],1)},r=[],a=(s("4de4"),s("7db0"),s("4160"),s("d81d"),s("b0c0"),s("a9e3"),s("c35a"),s("b680"),s("159b"),s("96cf"),s("1da1")),n=s("ade3"),o=s("5530"),l=s("d178"),c=s("17f8"),u=s("fdea"),d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"d-flex flex-wrap justify-center align-center w-100"},[t.isLoading?s("v-container",{staticClass:"d-flex justify-center"},[s("v-progress-circular",{attrs:{size:50,color:"primary",indeterminate:""}})],1):[s("v-col",{staticClass:"col-lg-2",attrs:{cols:"2"}},[t._v(" "+t._s(t.commentData.userName)+" ")]),s("v-col",{staticClass:"col-lg-6 d-flex flex-column ml-10 ml-lg-0",attrs:{cols:"8"}},[s("v-rating",{staticClass:"py-lg-3 mb-2",attrs:{value:t.commentData.star,"background-color":"primary lighten-3",color:"primary",size:"25","half-increments":"",readonly:""}}),s("p",{staticClass:"px-3 font-weight-bold mb-2"},[t._v(t._s(t.commentData.title))]),s("p",{staticClass:"px-3 mb-2"},[t._v(t._s(t.commentData.message))])],1),s("v-col",{staticClass:"col-lg-3 ml-10 ml-lg-0 py-0",attrs:{cols:"6"}},[s("span",{staticClass:"words--text text-lg-subtitle-1 text-subtitle-2 pa-3"},[t._v(" "+t._s(t.getTimeFromNow(t.commentData.releaseDate))+" ")])])]],2)},h=[],m=s("2c28"),f=s("5a0c"),p=s.n(f),v=s("4208"),g=s.n(v);p.a.extend(g.a);var b={props:["comment","productId"],data:function(){return{commentData:{},isLoading:!0}},methods:{getTimeFromNow:function(t){return p()(t).locale("zh-tw").fromNow()},fetchComment:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["d"])({productId:t.productId,commentId:t.comment});case 2:s=e.sent,t.commentData=s.data.result,t.isLoading=!1;case 5:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.fetchComment()}},x=b,w=(s("ac34"),s("2877")),C=s("6544"),_=s.n(C),y=s("62ad"),k=s("a523"),O=s("490a"),$=s("1d4d"),j=Object(w["a"])(x,d,h,!1,null,null,null),I=j.exports;_()(j,{VCol:y["a"],VContainer:k["a"],VProgressCircular:O["a"],VRating:$["a"]});var S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"formContainer rounded-lg pa-10 pa-sm-15 pb-sm-10"},[s("form",{staticClass:"py-5"},[s("v-rating",{staticClass:"mb-5 mx-lg-3",attrs:{hover:"",length:"5",size:"30","background-color":"primary lighten-3",color:"primary",value:t.comment.star},model:{value:t.comment.star,callback:function(e){t.$set(t.comment,"star",e)},expression:"comment.star"}}),s("v-text-field",{staticClass:"mx-sm-5",attrs:{outlined:"",label:"請填寫評論標題","validate-on-blur":"",rules:t.titleRules,required:""},model:{value:t.comment.title,callback:function(e){t.$set(t.comment,"title",e)},expression:"comment.title"}}),s("v-textarea",{staticClass:"mx-sm-5",attrs:{outlined:"",name:"input-7-4",label:"撰寫你的評論","validate-on-blur":"",rules:t.messageRules},model:{value:t.comment.message,callback:function(e){t.$set(t.comment,"message",e)},expression:"comment.message"}}),s("div",{staticClass:"ma-sm-5"},[s("v-btn",{attrs:{depressed:"",color:"primary",height:"35px",width:"100%",disabled:t.isLoading},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.submitHandler()}}},[t._v(" "+t._s(t.isLoading?"送出中":"送出")+" ")])],1)],1)])},q=[],z={props:["productId"],data:function(){return{comment:{star:0,title:"",message:""},titleRules:[function(t){return!!t||"文章標題為必填"}],messageRules:[function(t){return!!t||"評論內容為必填"}],isLoading:!1}},computed:{user:function(){return this.$store.state.user}},methods:{submitHandler:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.isLoading=!0,t.comment.u_id=t.user.id,s=Object(o["a"])({},t.comment),e.next=6,Object(m["l"])({productId:t.productId},s);case 6:if(i=e.sent,200===i.status){e.next=9;break}throw new Error(i.data.message);case 9:t.isLoading=!1,t.$emit("after-comment",i.data.comments),t.$swal({icon:"success",text:"感謝你的評論"}),t.comment.star=0,t.comment.title="",t.comment.message="",e.next=21;break;case 17:e.prev=17,e.t0=e["catch"](0),t.isLoading=!1,t.$swal({icon:"error",text:e.t0.response.data.message}).then((function(){t.$emit("close-form")}));case 21:case"end":return e.stop()}}),e,null,[[0,17]])})))()}}},T=z,D=(s("a9e2"),s("8336")),L=s("8654"),R=s("a844"),N=Object(w["a"])(T,S,q,!1,null,null,null),B=N.exports;_()(N,{VBtn:D["a"],VRating:$["a"],VTextField:L["a"],VTextarea:R["a"]});var V=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"d-flex flex-column justify-center align-center pa-0 px-sm-10 py-sm-5"},[s("v-row",{staticClass:"w100 flex-row flex-wrap justify-start align-center px-0",attrs:{cols:"12"}},[t.isLoading?s("v-container",{staticClass:"d-flex justify-center"},[s("v-progress-circular",{attrs:{size:50,color:"primary",indeterminate:""}})],1):[s("v-col",{staticClass:"col-lg-2 d-flex align-center",attrs:{cols:"4"}},[s("p",{staticClass:"ma-0"},[t._v(t._s(t.questionData.userName))])]),s("v-col",{staticClass:"col-lg-8 d-flex align-center",attrs:{cols:"8"}},[s("p",{staticClass:"ma-0"},[s("span",{staticClass:"font-weight-bold mr-10"},[t._v("Q:")]),t._v(t._s(t.questionData.message))])]),s("v-col",{staticClass:"col-lg-2 d-flex align-center",attrs:{cols:"5"}},[s("span",{staticClass:"words--text text-lg-subtitle-1 text-caption pa-0"},[t._v(" "+t._s(t.getTimeFromNow(t.questionData.releaseDate))+" ")])]),t.questionData.reply?s("v-row",{staticClass:"w100 d-flex flex-row flex-wrap align-center px-0",attrs:{cols:"12"}},[s("v-col",{staticClass:"col-lg-2 d-flex flex-column",attrs:{cols:"4"}},[s("div",{staticClass:"overline qcard mb-1 col-6 col-lg-2 pa-0"},[s("span",{staticClass:"highlight"},[t._v("Hiker")])]),s("div",{staticClass:"overline qcard mb-1 col-6 col-lg-2 pa-0"},[s("span",{staticClass:"highlight"},[t._v("Group")])])]),s("v-col",{staticClass:"col-lg-8 d-flex align-center",attrs:{cols:"8"}},[s("div",{staticClass:"d-flex align-center"},[s("p",{staticClass:"pa-0"},[s("span",{staticClass:"font-weight-bold mr-10"},[t._v("A:")]),t._v(t._s(t.questionData.reply))])])]),s("v-col",{staticClass:"col-lg-2",attrs:{cols:"5"}},[s("span",{staticClass:"words--text text-lg-subtitle-1 text-caption pa-0"},[t._v(" "+t._s(t.getTimeFromNow(t.questionData.replyDate))+" ")])])],1):t._e()]],2)],1)},A=[];s("5087");p.a.extend(g.a);var M={props:["question","productId"],data:function(){return{isLoading:!0,questionData:{}}},methods:{getTimeFromNow:function(t){return p()(t).locale("zh-tw").fromNow()},fetchQuestion:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["j"])({productId:t.productId,questionId:t.question._id});case 2:s=e.sent,t.questionData=s.data.result,t.isLoading=!1;case 5:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.fetchQuestion()}},F=M,Y=(s("6921"),s("0fd9")),E=Object(w["a"])(F,V,A,!1,null,null,null),H=E.exports;_()(E,{VCol:y["a"],VContainer:k["a"],VProgressCircular:O["a"],VRow:Y["a"]});var P=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"formContainer rounded-lg pa-10 pa-sm-15 pb-sm-10"},[s("form",{staticClass:"py-5"},[s("v-text-field",{staticClass:"mx-sm-5",attrs:{outlined:"",label:"請填寫你的姓名","validate-on-blur":"",rules:t.userNameRules,required:""},model:{value:t.question.userName,callback:function(e){t.$set(t.question,"userName",e)},expression:"question.userName"}}),s("v-textarea",{staticClass:"mx-sm-5",attrs:{outlined:"",name:"input-7-4",label:"填寫你的問題","validate-on-blur":"",rules:t.messageRules},model:{value:t.question.message,callback:function(e){t.$set(t.question,"message",e)},expression:"question.message"}}),s("div",{staticClass:"ma-sm-5"},[s("v-btn",{attrs:{depressed:"",color:"primary",height:"35px",width:"100%",disabled:t.isLoading},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.submitHandler()}}},[t._v(" "+t._s(t.isLoading?"送出中":"送出")+" ")])],1)],1)])},W=[],Q={props:["productId"],data:function(){return{question:{userName:"",message:""},userNameRules:[function(t){return!!t||"文章標題為必填"}],messageRules:[function(t){return!!t||"評論內容為必填"}],isLoading:!1}},methods:{submitHandler:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.isLoading=!0,s=Object(o["a"])({},t.question),e.next=5,Object(m["m"])({productId:t.productId},s);case 5:if(i=e.sent,200===i.status){e.next=8;break}throw new Error(i.data.message);case 8:t.isLoading=!1,t.$emit("after-question",i.data.questions),t.$swal({icon:"success",text:"感謝你的問題，我們會盡快回覆"}),t.question.userName="",t.question.message="",e.next=19;break;case 15:e.prev=15,e.t0=e["catch"](0),t.isLoading=!1,t.$swal({icon:"error",text:e.t0.response.data.message}).then((function(){t.$emit("close-form")}));case 19:case"end":return e.stop()}}),e,null,[[0,15]])})))()}}},U=Q,X=(s("79d2"),Object(w["a"])(U,P,W,!1,null,null,null)),G=X.exports;_()(X,{VBtn:D["a"],VTextField:L["a"],VTextarea:R["a"]});var J=s("2f62"),K=s("1602"),Z={components:{ProductImage:u["a"],Navbar:l["a"],PopUpCard:c["a"],CommentCard:I,CommentForm:B,QuestionCard:H,QuestionForm:G},data:function(){return{timeout:3e3,showOrder:!1,orderData:{},tabs:"",comments:[],questions:[],showCommentForm:!1,showQuestionForm:!1,isLoading:!0,product:"",details:[],color:[],selectedColor:"",size:[],selectedSize:"",quantity:1,links:[{text:"首頁",disabled:!1,to:"/"},{text:"navigation",disabled:!1,to:"/:navigation",exact:!0},{text:"category",disabled:!1,to:"/:category",exact:!0},{text:"",disabled:!0}],timer:"",pending:!1}},computed:Object(o["a"])(Object(o["a"])({},Object(J["c"])(["user","cartList","orderId"])),{},{detailId:function(){var t=this,e="";return this.size.length&&this.color.length?e=this.details.find((function(e){return e.color===t.selectedColor&&e.size===t.selectedSize})):this.size.length?e=this.details.find((function(e){return e.size===t.selectedSize})):this.color.length&&(e=this.details.find((function(e){return e.color===t.selectedColor}))),e?e._id:""},rating:function(){if(this.comments){var t=0;return this.comments.length?(this.comments.map((function(e){t+=e.star})),Number.parseFloat((t/this.comments.length).toFixed(1))):0}},ratingSize:function(){var t={xs:"small",lg:"large",xl:"x-large"}[this.$vuetify.breakpoint.name];return t?Object(n["a"])({},t,!0):{}}}),methods:{fetchData:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){var i,r,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,Object(m["h"])({productId:t});case 3:return i=s.sent,s.next=6,Object(m["e"])({productId:t});case 6:return r=s.sent,s.next=9,Object(m["k"])({productId:t});case 9:if(a=s.sent,e.comments=r.data.result,e.comments=e.comments.filter((function(t){return t.display})),e.questions=a.data.result,i.data.success){s.next=15;break}throw new Error(i.message);case 15:e.product=i.data.result[0],e.setDetails(),e.setRoute(),e.isLoading=!1,s.next=24;break;case 21:s.prev=21,s.t0=s["catch"](0),console.log(s.t0);case 24:case"end":return s.stop()}}),s,null,[[0,21]])})))()},setDetails:function(){var t=this;this.product.details.length&&(this.details=this.product.details,this.details.forEach((function(e){e.color&&t.color.push(e.color),e.size&&t.size.push(e.size)})))},setRoute:function(){var t=this.product;this.links[1].text=t.navigation,this.links[1].to={name:"Navigation",params:{navigation:t.navigationRoute}},this.links[2].text=this.product.category,this.links[2].to={name:"Category",params:{navigation:t.navigationRoute,category:t.categoryRoute}},this.links[3].text=this.product.productName},minusCount:function(){this.quantity<=1||this.quantity--},commentHandler:function(){var t=this;this.user.id?this.showCommentForm=!0:this.$swal.fire({reverseButtons:!0,title:"請先登入再留言!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#ed5e68",cancelButtonColor:"#8388a4",confirmButtonText:"登入",cancelButtonText:"取消"}).then((function(e){e.isConfirmed&&t.$router.push({name:"Login"})}))},afterComment:function(t){this.comments=t,this.showCommentForm=!1},afterAsk:function(t){console.log(t),this.questions=t,this.showQuestionForm=!1},submitHandler:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s,i,r,a,n,o,l,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.size.length){e.next=4;break}if(t.selectedSize){e.next=4;break}return t.$swal({icon:"error",title:"請選擇商品尺寸"}),e.abrupt("return");case 4:if(!t.color.length){e.next=8;break}if(t.selectedColor){e.next=8;break}return t.$swal({icon:"error",title:"請選擇商品顏色"}),e.abrupt("return");case 8:if(t.pending=!0,s={},i={},t.detailId?(i={productId:t.product._id,detailId:t.detailId,quantity:t.quantity},s=t.cartList.find((function(e){return e.productId===t.product._id&&e.detailId===t.detailId}))):(i={productId:t.product._id,quantity:t.quantity},s=t.cartList.find((function(e){return e.productId===t.product._id}))),e.prev=12,!(t.user.id&&t.orderId&&s)){e.next=19;break}return r={pId:s._id,quantity:s.quantity+t.quantity},e.next=17,Object(K["c"])({userId:t.user.id,orderId:t.orderId},r);case 17:e.next=27;break;case 19:if(!t.user.id||!t.orderId){e.next=24;break}return e.next=22,Object(K["l"])({userId:t.user.id,orderId:t.orderId},{order:i});case 22:e.next=27;break;case 24:if(!t.user.id){e.next=27;break}return e.next=27,Object(K["k"])({userId:t.user.id},{order:[i]});case 27:a=t.product,n=a.productName,o=a.brand,l=a.productImg,c=a.price,t.detailId?t.orderData=Object.assign({productName:n,brand:o,productImg:l,price:c},{quantity:t.quantity,detail:{color:t.selectedColor,size:t.selectedSize}}):t.orderData=Object.assign({productName:n,brand:o,productImg:l,price:c},{quantity:t.quantity}),t.pending=!1,t.showOrder=!0,t.$store.commit("ADD_CART",i),e.next=37;break;case 34:e.prev=34,e.t0=e["catch"](12),alert("加入失敗，請稍後再試");case 37:case"end":return e.stop()}}),e,null,[[12,34]])})))()}},watch:{selectedColor:function(t){var e=this;if(this.size.length){this.size=[],this.selectedSize="";var s=this.details.filter((function(e){return e.color===t}));s.map((function(t){e.size.push(t.size)}))}}},mounted:function(){var t=this.$route.params.productId;this.fetchData(t)},beforeRouteUpdate:function(t,e,s){var i=t.params.productId;this.fetchData(i),s()}},tt=Z,et=(s("be1a"),s("7496")),st=s("2bc5"),it=s("169a"),rt=s("132d"),at=s("b974"),nt=s("2db4"),ot=(s("c975"),s("ac1f"),s("5319"),s("4e82")),lt=s("1c87"),ct=s("7560"),ut=s("80d2"),dt=s("58df"),ht=Object(dt["a"])(lt["a"],Object(ot["a"])("tabsBar"),ct["a"]),mt=ht.extend().extend().extend({name:"v-tab",props:{ripple:{type:[Boolean,Object],default:!0}},data:function(){return{proxyClass:"v-tab--active"}},computed:{classes:function(){return Object(o["a"])(Object(o["a"])({"v-tab":!0},lt["a"].options.computed.classes.call(this)),{},{"v-tab--disabled":this.disabled},this.groupClasses)},value:function(){var t=this.to||this.href||"";if(this.$router&&this.to===Object(this.to)){var e=this.$router.resolve(this.to,this.$route,this.append);t=e.href}return t.replace("#","")}},mounted:function(){this.onRouteChange()},methods:{click:function(t){this.href&&this.href.indexOf("#")>-1&&t.preventDefault(),t.detail&&this.$el.blur(),this.$emit("click",t),this.to||this.toggle()}},render:function(t){var e=this,s=this.generateRouteLink(),i=s.tag,r=s.data;return r.attrs=Object(o["a"])(Object(o["a"])({},r.attrs),{},{"aria-selected":String(this.isActive),role:"tab",tabindex:0}),r.on=Object(o["a"])(Object(o["a"])({},r.on),{},{keydown:function(t){t.keyCode===ut["y"].enter&&e.click(t),e.$emit("keydown",t)}}),t(i,r,this.$slots.default)}}),ft=(s("1bfb"),s("b85c")),pt=(s("99af"),s("caad"),s("fb6a"),s("608c"),s("9d26")),vt=s("0789"),gt=s("604c"),bt=s("e4cd"),xt=s("dc22"),wt=s("c3f0"),Ct=Object(dt["a"])(gt["a"],bt["a"]).extend({name:"base-slide-group",directives:{Resize:xt["a"],Touch:wt["a"]},props:{activeClass:{type:String,default:"v-slide-item--active"},centerActive:Boolean,nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},showArrows:{type:[Boolean,String],validator:function(t){return"boolean"===typeof t||["always","desktop","mobile"].includes(t)}}},data:function(){return{internalItemsLength:0,isOverflowing:!1,resizeTimeout:0,startX:0,scrollOffset:0,widths:{content:0,wrapper:0}}},computed:{__cachedNext:function(){return this.genTransition("next")},__cachedPrev:function(){return this.genTransition("prev")},classes:function(){return Object(o["a"])(Object(o["a"])({},gt["a"].options.computed.classes.call(this)),{},{"v-slide-group":!0,"v-slide-group--has-affixes":this.hasAffixes,"v-slide-group--is-overflowing":this.isOverflowing})},hasAffixes:function(){switch(this.showArrows){case"always":return!0;case"desktop":return!this.isMobile;case!0:return this.isOverflowing;case"mobile":return this.isMobile||this.isOverflowing;default:return!this.isMobile&&this.isOverflowing}},hasNext:function(){if(!this.hasAffixes)return!1;var t=this.widths,e=t.content,s=t.wrapper;return e>Math.abs(this.scrollOffset)+s},hasPrev:function(){return this.hasAffixes&&0!==this.scrollOffset}},watch:{internalValue:"setWidths",isOverflowing:"setWidths",scrollOffset:function(t){this.$refs.content.style.transform="translateX(".concat(-t,"px)")}},beforeUpdate:function(){this.internalItemsLength=(this.$children||[]).length},updated:function(){this.internalItemsLength!==(this.$children||[]).length&&this.setWidths()},methods:{genNext:function(){var t=this,e=this.$scopedSlots.next?this.$scopedSlots.next({}):this.$slots.next||this.__cachedNext;return this.$createElement("div",{staticClass:"v-slide-group__next",class:{"v-slide-group__next--disabled":!this.hasNext},on:{click:function(){return t.onAffixClick("next")}},key:"next"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-slide-group__content",ref:"content"},this.$slots.default)},genData:function(){return{class:this.classes,directives:[{name:"resize",value:this.onResize}]}},genIcon:function(t){var e=t;this.$vuetify.rtl&&"prev"===t?e="next":this.$vuetify.rtl&&"next"===t&&(e="prev");var s="".concat(t[0].toUpperCase()).concat(t.slice(1)),i=this["has".concat(s)];return this.showArrows||i?this.$createElement(pt["a"],{props:{disabled:!i}},this["".concat(e,"Icon")]):null},genPrev:function(){var t=this,e=this.$scopedSlots.prev?this.$scopedSlots.prev({}):this.$slots.prev||this.__cachedPrev;return this.$createElement("div",{staticClass:"v-slide-group__prev",class:{"v-slide-group__prev--disabled":!this.hasPrev},on:{click:function(){return t.onAffixClick("prev")}},key:"prev"},[e])},genTransition:function(t){return this.$createElement(vt["c"],[this.genIcon(t)])},genWrapper:function(){var t=this;return this.$createElement("div",{staticClass:"v-slide-group__wrapper",directives:[{name:"touch",value:{start:function(e){return t.overflowCheck(e,t.onTouchStart)},move:function(e){return t.overflowCheck(e,t.onTouchMove)},end:function(e){return t.overflowCheck(e,t.onTouchEnd)}}}],ref:"wrapper"},[this.genContent()])},calculateNewOffset:function(t,e,s,i){var r=s?-1:1,a=r*i+("prev"===t?-1:1)*e.wrapper;return r*Math.max(Math.min(a,e.content-e.wrapper),0)},onAffixClick:function(t){this.$emit("click:".concat(t)),this.scrollTo(t)},onResize:function(){this._isDestroyed||this.setWidths()},onTouchStart:function(t){var e=this.$refs.content;this.startX=this.scrollOffset+t.touchstartX,e.style.setProperty("transition","none"),e.style.setProperty("willChange","transform")},onTouchMove:function(t){this.scrollOffset=this.startX-t.touchmoveX},onTouchEnd:function(){var t=this.$refs,e=t.content,s=t.wrapper,i=e.clientWidth-s.clientWidth;e.style.setProperty("transition",null),e.style.setProperty("willChange",null),this.$vuetify.rtl?this.scrollOffset>0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset<=-i&&(this.scrollOffset=-i):this.scrollOffset<0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset>=i&&(this.scrollOffset=i)},overflowCheck:function(t,e){t.stopPropagation(),this.isOverflowing&&e(t)},scrollIntoView:function(){this.selectedItem&&(0===this.selectedIndex||!this.centerActive&&!this.isOverflowing?this.scrollOffset=0:this.centerActive?this.scrollOffset=this.calculateCenteredOffset(this.selectedItem.$el,this.widths,this.$vuetify.rtl):this.isOverflowing&&(this.scrollOffset=this.calculateUpdatedOffset(this.selectedItem.$el,this.widths,this.$vuetify.rtl,this.scrollOffset)))},calculateUpdatedOffset:function(t,e,s,i){var r=t.clientWidth,a=s?e.content-t.offsetLeft-r:t.offsetLeft;s&&(i=-i);var n=e.wrapper+i,o=r+a,l=.4*r;return a<=i?i=Math.max(a-l,0):n<=o&&(i=Math.min(i-(n-o-l),e.content-e.wrapper)),s?-i:i},calculateCenteredOffset:function(t,e,s){var i=t.offsetLeft,r=t.clientWidth;if(s){var a=e.content-i-r/2-e.wrapper/2;return-Math.min(e.content-e.wrapper,Math.max(0,a))}var n=i+r/2-e.wrapper/2;return Math.min(e.content-e.wrapper,Math.max(0,n))},scrollTo:function(t){this.scrollOffset=this.calculateNewOffset(t,{content:this.$refs.content?this.$refs.content.clientWidth:0,wrapper:this.$refs.wrapper?this.$refs.wrapper.clientWidth:0},this.$vuetify.rtl,this.scrollOffset)},setWidths:function(){var t=this;window.requestAnimationFrame((function(){var e=t.$refs,s=e.content,i=e.wrapper;t.widths={content:s?s.clientWidth:0,wrapper:i?i.clientWidth:0},t.isOverflowing=t.widths.wrapper<t.widths.content,t.scrollIntoView()}))}},render:function(t){return t("div",this.genData(),[this.genPrev(),this.genWrapper(),this.genNext()])}}),_t=(Ct.extend({name:"v-slide-group",provide:function(){return{slideGroup:this}}}),s("d10f")),yt=Object(dt["a"])(Ct,_t["a"],ct["a"]).extend({name:"v-tabs-bar",provide:function(){return{tabsBar:this}},computed:{classes:function(){return Object(o["a"])(Object(o["a"])({},Ct.options.computed.classes.call(this)),{},{"v-tabs-bar":!0,"v-tabs-bar--is-mobile":this.isMobile,"v-tabs-bar--show-arrows":this.showArrows},this.themeClasses)}},watch:{items:"callSlider",internalValue:"callSlider",$route:"onRouteChange"},methods:{callSlider:function(){this.isBooted&&this.$emit("call:slider")},genContent:function(){var t=Ct.options.methods.genContent.call(this);return t.data=t.data||{},t.data.staticClass+=" v-tabs-bar__content",t},onRouteChange:function(t,e){if(!this.mandatory){var s,i=this.items,r=t.path,a=e.path,n=!1,o=!1,l=Object(ft["a"])(i);try{for(l.s();!(s=l.n()).done;){var c=s.value;if(c.to===r?n=!0:c.to===a&&(o=!0),n&&o)break}}catch(u){l.e(u)}finally{l.f()}!n&&o&&(this.internalValue=void 0)}}},render:function(t){var e=Ct.options.render.call(this,t);return e.data.attrs={role:"tablist"},e}}),kt=s("f665"),Ot=kt["a"].extend({name:"v-tabs-items",props:{mandatory:{type:Boolean,default:!1}},computed:{classes:function(){return Object(o["a"])(Object(o["a"])({},kt["a"].options.computed.classes.call(this)),{},{"v-tabs-items":!0})},isDark:function(){return this.rootIsDark}},methods:{getValue:function(t,e){return t.id||gt["a"].options.methods.getValue.call(this,t,e)}}}),$t=s("a9ad"),jt=Object(dt["a"])($t["a"]).extend({name:"v-tabs-slider",render:function(t){return t("div",this.setBackgroundColor(this.color,{staticClass:"v-tabs-slider"}))}}),It=s("a452"),St=Object(dt["a"])($t["a"],It["a"],ct["a"]),qt=St.extend().extend({name:"v-tabs",directives:{Resize:xt["a"]},props:{activeClass:{type:String,default:""},alignWithTitle:Boolean,backgroundColor:String,centerActive:Boolean,centered:Boolean,fixedTabs:Boolean,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,iconsAndText:Boolean,mobileBreakpoint:[String,Number],nextIcon:{type:String,default:"$next"},optional:Boolean,prevIcon:{type:String,default:"$prev"},right:Boolean,showArrows:[Boolean,String],sliderColor:String,sliderSize:{type:[Number,String],default:2},vertical:Boolean},data:function(){return{resizeTimeout:0,slider:{height:null,left:null,right:null,top:null,width:null},transitionTime:300}},computed:{classes:function(){return Object(o["a"])({"v-tabs--align-with-title":this.alignWithTitle,"v-tabs--centered":this.centered,"v-tabs--fixed-tabs":this.fixedTabs,"v-tabs--grow":this.grow,"v-tabs--icons-and-text":this.iconsAndText,"v-tabs--right":this.right,"v-tabs--vertical":this.vertical},this.themeClasses)},isReversed:function(){return this.$vuetify.rtl&&this.vertical},sliderStyles:function(){return{height:Object(ut["g"])(this.slider.height),left:this.isReversed?void 0:Object(ut["g"])(this.slider.left),right:this.isReversed?Object(ut["g"])(this.slider.right):void 0,top:this.vertical?Object(ut["g"])(this.slider.top):void 0,transition:null!=this.slider.left?null:"none",width:Object(ut["g"])(this.slider.width)}},computedColor:function(){return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"}},watch:{alignWithTitle:"callSlider",centered:"callSlider",centerActive:"callSlider",fixedTabs:"callSlider",grow:"callSlider",iconsAndText:"callSlider",right:"callSlider",showArrows:"callSlider",vertical:"callSlider","$vuetify.application.left":"onResize","$vuetify.application.right":"onResize","$vuetify.rtl":"onResize"},mounted:function(){var t=this;this.$nextTick((function(){window.setTimeout(t.callSlider,30)}))},methods:{callSlider:function(){var t=this;return!this.hideSlider&&this.$refs.items&&this.$refs.items.selectedItems.length?(this.$nextTick((function(){var e=t.$refs.items.selectedItems[0];if(!e||!e.$el)return t.slider.width=0,void(t.slider.left=0);var s=e.$el;t.slider={height:t.vertical?s.scrollHeight:Number(t.sliderSize),left:t.vertical?0:s.offsetLeft,right:t.vertical?0:s.offsetLeft+s.offsetWidth,top:s.offsetTop,width:t.vertical?Number(t.sliderSize):s.scrollWidth}})),!0):(this.slider.width=0,!1)},genBar:function(t,e){var s=this,i={style:{height:Object(ut["g"])(this.height)},props:{activeClass:this.activeClass,centerActive:this.centerActive,dark:this.dark,light:this.light,mandatory:!this.optional,mobileBreakpoint:this.mobileBreakpoint,nextIcon:this.nextIcon,prevIcon:this.prevIcon,showArrows:this.showArrows,value:this.internalValue},on:{"call:slider":this.callSlider,change:function(t){s.internalValue=t}},ref:"items"};return this.setTextColor(this.computedColor,i),this.setBackgroundColor(this.backgroundColor,i),this.$createElement(yt,i,[this.genSlider(e),t])},genItems:function(t,e){var s=this;return t||(e.length?this.$createElement(Ot,{props:{value:this.internalValue},on:{change:function(t){s.internalValue=t}}},e):null)},genSlider:function(t){return this.hideSlider?null:(t||(t=this.$createElement(jt,{props:{color:this.sliderColor}})),this.$createElement("div",{staticClass:"v-tabs-slider-wrapper",style:this.sliderStyles},[t]))},onResize:function(){this._isDestroyed||(clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.callSlider,0))},parseNodes:function(){for(var t=null,e=null,s=[],i=[],r=this.$slots.default||[],a=r.length,n=0;n<a;n++){var o=r[n];if(o.componentOptions)switch(o.componentOptions.Ctor.options.name){case"v-tabs-slider":e=o;break;case"v-tabs-items":t=o;break;case"v-tab-item":s.push(o);break;default:i.push(o)}else i.push(o)}return{tab:i,slider:e,items:t,item:s}}},render:function(t){var e=this.parseNodes(),s=e.tab,i=e.slider,r=e.items,a=e.item;return t("div",{staticClass:"v-tabs",class:this.classes,directives:[{name:"resize",modifiers:{quiet:!0},value:this.onResize}]},[this.genBar(s,i),this.genItems(r,a)])}}),zt=Object(w["a"])(tt,i,r,!1,null,null,null);e["default"]=zt.exports;_()(zt,{VApp:et["a"],VBreadcrumbs:st["a"],VBtn:D["a"],VCol:y["a"],VContainer:k["a"],VDialog:it["a"],VIcon:rt["a"],VProgressCircular:O["a"],VRating:$["a"],VRow:Y["a"],VSelect:at["a"],VSnackbar:nt["a"],VTab:mt,VTabs:qt,VTextField:L["a"]})},"608c":function(t,e,s){},6921:function(t,e,s){"use strict";s("d1f8")},"708c":function(t,e,s){},"79d2":function(t,e,s){"use strict";s("708c")},"7e12":function(t,e,s){var i=s("da84"),r=s("58a8").trim,a=s("5899"),n=i.parseFloat,o=1/n(a+"-0")!==-1/0;t.exports=o?function(t){var e=r(String(t)),s=n(e);return 0===s&&"-"==e.charAt(0)?-0:s}:n},"8f80":function(t,e,s){},a9e2:function(t,e,s){"use strict";s("f580")},abd3:function(t,e,s){},ac34:function(t,e,s){"use strict";s("8f80")},be1a:function(t,e,s){"use strict";s("ed8b")},c35a:function(t,e,s){var i=s("23e7"),r=s("7e12");i({target:"Number",stat:!0,forced:Number.parseFloat!=r},{parseFloat:r})},d1f8:function(t,e,s){},ed8b:function(t,e,s){},f580:function(t,e,s){}}]);
//# sourceMappingURL=ProductDetail.f3ed6351.js.map