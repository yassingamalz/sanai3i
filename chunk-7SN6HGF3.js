import{a as I}from"./chunk-CGJAVHVL.js";import{A as f,F as g,G as x,Ha as _,Ia as w,Ja as M,Sa as C,U as v,W as i,X as h,ba as l,ca as o,fa as r,ga as n,ha as c,ka as m,oa as a,pa as p,qa as u,ra as y}from"./chunk-3M65KFUB.js";function k(t,d){if(t&1&&(r(0,"div",18),a(1),n()),t&2){let e=m().$implicit;i(),u(" ",e.unread," ")}}function T(t,d){if(t&1&&(r(0,"div",19),c(1,"i",20),a(2),n()),t&2){let e=m().$implicit;i(2),y(" ",e.rating," \u2022 ",e.service," ")}}function F(t,d){if(t&1&&(r(0,"div",21),a(1),n()),t&2){let e=m().$implicit;i(),u(" ",e.service," ")}}function j(t,d){if(t&1&&(r(0,"div",22),c(1,"i",23),a(2),n()),t&2){let e=m().$implicit;i(2),u(" ",e.address," ")}}function A(t,d){if(t&1&&(r(0,"div",7)(1,"div",2),c(2,"img",8),l(3,k,2,1,"div",9),n(),r(4,"div",10)(5,"div",11)(6,"div")(7,"h3",12),a(8),n(),l(9,T,3,2,"div",13)(10,F,2,1,"div",14),n(),r(11,"span",15),a(12),n()(),r(13,"p",16),a(14),n(),l(15,j,3,1,"div",17),n()()),t&2){let e=d.$implicit,s=m();i(2),o("src","/api/placeholder/48/48",v)("alt",e.name),i(),o("ngIf",e.unread>0),i(5),p(e.name),i(),o("ngIf",s.hasRating(e)),i(),o("ngIf",s.isWorkerView()),i(2),p(e.time),i(2),p(e.message),i(),o("ngIf",s.hasAddress(e))}}var b=(()=>{class t{constructor(e){this.authService=e,this.customerMessages=[{id:1,name:"\u0639\u0645 \u062D\u0633\u0646",message:"\u062D\u0627\u0643\u0648\u0646 \u0639\u0646\u062F\u0643 \u062E\u0644\u0627\u0644 \u0633\u0627\u0639\u0629",time:"12:30",unread:2,service:"\u0643\u0647\u0631\u0628\u0627\u0626\u064A",rating:4.8,isWorker:!0},{id:2,name:"\u0623\u0633\u062A\u0627\u0630 \u0645\u062D\u0645\u062F",message:"\u0634\u0643\u0631\u0627\u064B \u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0643",time:"11:45",unread:0,service:"\u0633\u0628\u0627\u0643",rating:4.9,isWorker:!0}],this.workerMessages=[{id:1,name:"\u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F",message:"\u0645\u062A\u0649 \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0642\u062F\u0648\u0645\u061F",time:"12:30",unread:1,address:"\u0627\u0644\u0645\u0639\u0627\u062F\u064A\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629",service:"\u062A\u0635\u0644\u064A\u062D \u062A\u0643\u064A\u064A\u0641"},{id:2,name:"\u0645\u062D\u0645\u0648\u062F \u0639\u0644\u064A",message:"\u0627\u0631\u064A\u062F \u0635\u064A\u0627\u0646\u0629 \u0639\u0627\u0645\u0629 \u0644\u0644\u0645\u0646\u0632\u0644",time:"11:45",unread:0,address:"\u0645\u062F\u064A\u0646\u0629 \u0646\u0635\u0631\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629",service:"\u0635\u064A\u0627\u0646\u0629 \u0639\u0627\u0645\u0629"}]}get userType(){return this.authService.getCurrentUser()?.type}get displayMessages(){return this.userType==="worker"?this.workerMessages:this.customerMessages}isWorkerView(){return this.userType==="worker"}hasRating(e){return e.rating!==void 0&&e.isWorker===!0}hasAddress(e){return e.address!==void 0}static{this.\u0275fac=function(s){return new(s||t)(h(I))}}static{this.\u0275cmp=g({type:t,selectors:[["app-messages"]],decls:7,vars:1,consts:[[1,"p-4","pb-20"],[1,"bg-white","p-4","shadow-sm","mb-4"],[1,"relative"],[1,"fas","fa-search","absolute","right-3","top-3","text-gray-400"],["type","text","placeholder","\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0627\u062A...",1,"w-full","p-2","pr-10","rounded-lg","border","border-gray-200"],[1,"space-y-4"],["class","bg-white p-4 rounded-lg shadow-sm flex items-center",4,"ngFor","ngForOf"],[1,"bg-white","p-4","rounded-lg","shadow-sm","flex","items-center"],[1,"w-12","h-12","rounded-full",3,"src","alt"],["class","absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs",4,"ngIf"],[1,"mr-4","flex-1"],[1,"flex","justify-between","items-start"],[1,"font-bold"],["class","text-sm text-gray-600 flex items-center",4,"ngIf"],["class","text-sm text-gray-600",4,"ngIf"],[1,"text-sm","text-gray-500"],[1,"text-sm","text-gray-600","mt-1"],["class","flex items-center text-sm text-gray-600 mt-1",4,"ngIf"],[1,"absolute","-top-1","-right-1","w-5","h-5","bg-red-500","rounded-full","flex","items-center","justify-center","text-white","text-xs"],[1,"text-sm","text-gray-600","flex","items-center"],[1,"fas","fa-star","w-3","h-3","text-yellow-400","ml-1"],[1,"text-sm","text-gray-600"],[1,"flex","items-center","text-sm","text-gray-600","mt-1"],[1,"fas","fa-map-marker-alt","w-4","h-4","ml-1"]],template:function(s,S){s&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),c(3,"i",3)(4,"input",4),n()(),r(5,"div",5),l(6,A,16,9,"div",6),n()()),s&2&&(i(6),o("ngForOf",S.displayMessages))},dependencies:[_,w]})}}return t})();var B=(()=>{class t{static{this.\u0275fac=function(s){return new(s||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=f({imports:[M,C.forChild([{path:"",component:b}])]})}}return t})();export{B as MessagesModule};