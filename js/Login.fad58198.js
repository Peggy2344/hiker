(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Login"],{a55b:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",{staticClass:"home vh-100",attrs:{app:""}},[r("Navbar"),r("v-container",{staticClass:"d-flex justify-center align-center flex-column vh-100"},[r("h3",{staticClass:"login mb-10"},[e._v("登入")]),r("v-form",{ref:"form",staticClass:"form-width",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{rules:e.nameRules,label:"請輸入你的帳號","validate-on-blur":"",outlined:"",clearable:"",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),r("v-text-field",{attrs:{rules:e.passwordRules,label:"請輸入你的密碼","validate-on-blur":"",type:"password",outlined:"",clearable:"",required:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitHandler(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("v-btn",{staticClass:"ma-auto",attrs:{disabled:e.pending,color:"primary",width:"100%",height:"50px"},on:{click:e.submitHandler}},[e._v(" "+e._s(e.pending?"登入中":"送出")+" ")])],1)],1)],1)},n=[],s=(r("7db0"),r("4160"),r("159b"),r("96cf"),r("1da1")),o=r("5530"),i=r("2f62"),u=r("1602"),c=r("d178"),d={components:{Navbar:c["a"]},data:function(){return{valid:!0,username:"",password:"",nameRules:[function(e){return!!e||"帳號名稱為必填"}],passwordRules:[function(e){return!!e||"密碼為必填"}],prevRoute:"",cart:[],pending:!1}},computed:Object(o["a"])({},Object(i["c"])(["user","orderId","cartList"])),methods:{validate:function(){this.$refs.form.validate()},submitHandler:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$refs.form.validate()){t.next=14;break}return e.pending=!0,t.prev=2,t.next=5,Object(u["i"])({username:e.username,password:e.password});case 5:r=t.sent,r.data.success?(e.$store.commit("login",r.data.user),e.$store.dispatch("fetchCartList").then(Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.cart){t.next=2;break}return t.abrupt("return");case 2:if(!e.orderId){t.next=6;break}e.cart.forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(r){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.cartList.find((function(e){return e.productId===r.productId})),!a){t.next=6;break}return t.next=4,Object(u["c"])({userId:e.user.id,orderId:e.orderId},{quantity:r.quantity+a.quantity,pId:a._id});case 4:t.next=8;break;case 6:return t.next=8,Object(u["l"])({userId:e.user.id,orderId:e.orderId},{order:r});case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=8;break;case 6:return t.next=8,Object(u["k"])({userId:e.user.id},{order:e.cart});case 8:localStorage.removeItem("hiker-cart");case 9:case"end":return t.stop()}}),t)})))),e.pending=!1,e.prevRoute&&e.prevRoute.params.productId?e.$router.go(-1):"admin"===r.data.user.role?e.$router.push("/admin/product-management"):e.$router.push("/")):(e.pending=!1,e.$swal({icon:"error",title:r.data.message})),t.next=14;break;case 9:t.prev=9,t.t0=t["catch"](2),e.pending=!1,console.log(t.t0),e.$swal({icon:"error",title:"發生錯誤",text:t.t0.response.data.message});case 14:case"end":return t.stop()}}),t,null,[[2,9]])})))()}},mounted:function(){this.cart=JSON.parse(window.localStorage.getItem("hiker-cart"))},beforeRouteEnter:function(e,t,r){r((function(e){e.prevRoute=t}))}},l=d,p=(r("d6db"),r("2877")),f=r("6544"),m=r.n(f),b=r("7496"),v=r("8336"),h=r("a523"),w=r("4bd4"),g=r("8654"),x=Object(p["a"])(l,a,n,!1,null,null,null);t["default"]=x.exports;m()(x,{VApp:b["a"],VBtn:v["a"],VContainer:h["a"],VForm:w["a"],VTextField:g["a"]})},d6db:function(e,t,r){"use strict";r("e67a")},e67a:function(e,t,r){}}]);
//# sourceMappingURL=Login.fad58198.js.map