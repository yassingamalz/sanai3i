import{a as w}from"./chunk-QWLYJROW.js";import{$ as n,C as u,D as f,Fa as S,S as r,T as v,X as x,Y as g,_ as t,aa as s,da as b,ea as o,fa as l,ga as d,ha as m,wa as h,y as p,ya as y}from"./chunk-XOYOS3WC.js";function F(i,C){if(i&1&&(t(0,"div",5)(1,"div",6)(2,"div",7)(3,"div")(4,"h3",8),o(5),n(),t(6,"div",9),s(7,"i",10),o(8),n()(),t(9,"div",11),s(10,"i",12),t(11,"span"),o(12),n()()(),t(13,"div",13),s(14,"i",14),o(15),n(),t(16,"p",15),o(17),n(),t(18,"div",16)(19,"div",17),o(20),n(),t(21,"div",18),o(22),n()()(),t(23,"div",19)(24,"button",20),o(25),n(),t(26,"button",21),o(27," \u062A\u0641\u0627\u0648\u0636 "),n()()()),i&2){let e=C.$implicit,a=b();r(5),l(e.service),r(3),m(" ",e.location," \u2022 ",e.distance," \u0643\u0645 "),r(4),l(e.rating),r(3),m(" ",e.time," \u2022 ",e.date," "),r(2),l(e.description),r(3),d(" ",e.cost," \u062C\u0646\u064A\u0647 "),r(2),d(" ",e.completedJobs," \u062E\u062F\u0645\u0629 \u0645\u0646\u0641\u0630\u0629 "),r(3),d(" ",a.actionButtonLabel," ")}}var E=(()=>{class i{constructor(e){this.authService=e,this.proposals=[{id:1,service:"\u062A\u0635\u0644\u064A\u062D \u062A\u0643\u064A\u064A\u0641",location:"\u0627\u0644\u0645\u0639\u0627\u062F\u064A\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629",distance:"2.5",cost:350,description:"\u062A\u0643\u064A\u064A\u0641 \u0644\u0627 \u064A\u0628\u0631\u062F \u0628\u0634\u0643\u0644 \u062C\u064A\u062F",time:"15:30",date:"2024-11-12",rating:4.8,completedJobs:120},{id:2,service:"\u0635\u064A\u0627\u0646\u0629 \u0639\u0627\u0645\u0629",location:"\u0645\u062F\u064A\u0646\u0629 \u0646\u0635\u0631\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629",distance:"4.2",cost:250,description:"\u0635\u064A\u0627\u0646\u0629 \u062F\u0648\u0631\u064A\u0629",time:"14:00",date:"2024-11-12",rating:4.5,completedJobs:85}]}get userType(){return this.authService.getCurrentUser()?.type}get pageTitle(){return this.userType==="worker"?"\u062E\u062F\u0645\u0627\u062A\u064A":"\u0637\u0644\u0628\u0627\u062A\u064A"}get actionButtonLabel(){return this.userType==="worker"?"\u0642\u0628\u0648\u0644 \u0627\u0644\u0637\u0644\u0628":"\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628"}static{this.\u0275fac=function(a){return new(a||i)(v(w))}}static{this.\u0275cmp=u({type:i,selectors:[["app-services-list"]],decls:6,vars:2,consts:[[1,"pb-20"],[1,"bg-gradient-to-b","from-red-500","to-red-600","p-4"],[1,"text-white","mb-4","text-lg","font-bold"],[1,"p-4","space-y-4"],["class","bg-white rounded-lg shadow-sm overflow-hidden",4,"ngFor","ngForOf"],[1,"bg-white","rounded-lg","shadow-sm","overflow-hidden"],[1,"p-4"],[1,"flex","justify-between","items-start","mb-3"],[1,"font-bold","text-lg"],[1,"flex","items-center","text-sm","text-gray-600","mt-1"],[1,"fas","fa-map-marker-alt","w-4","h-4","ml-1"],[1,"flex","items-center"],[1,"fas","fa-star","w-4","h-4","text-yellow-400","ml-1"],[1,"flex","items-center","text-sm","text-gray-600","mb-3"],[1,"fas","fa-clock","w-4","h-4","ml-1"],[1,"text-gray-600","mb-3"],[1,"flex","justify-between","items-center"],[1,"font-bold","text-lg","text-red-500"],[1,"text-sm","text-gray-600"],[1,"border-t","border-gray-100","p-4","bg-gray-50","flex","justify-between"],[1,"bg-red-500","text-white","px-6","py-2","rounded-lg"],[1,"border","border-red-500","text-red-500","px-6","py-2","rounded-lg"]],template:function(a,c){a&1&&(t(0,"div",0)(1,"div",1)(2,"div",2),o(3),n()(),t(4,"div",3),x(5,F,28,10,"div",4),n()()),a&2&&(r(3),d(" ",c.pageTitle," "),r(2),g("ngForOf",c.proposals))},dependencies:[h],encapsulation:2})}}return i})();var A=(()=>{class i{static{this.\u0275fac=function(a){return new(a||i)}}static{this.\u0275mod=f({type:i})}static{this.\u0275inj=p({imports:[y,S.forChild([{path:"",component:E}])]})}}return i})();export{A as ServicesModule};
