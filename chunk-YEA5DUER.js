import{a as H}from"./chunk-YVZYUTZR.js";import{b as K,c as Q}from"./chunk-YPL5F3LP.js";import{a as W}from"./chunk-I5GBLPT4.js";import{c as Z,d as p,e as ee,f as te,i as ne,k as ie,l as oe,m as re,n as ae,o as se,p as ce,q as le,s as ue}from"./chunk-AH2J6Y2V.js";import{$,Aa as s,B as w,Ba as b,Ca as M,Da as G,F as j,Ka as U,L as E,La as J,R as _,S as x,Wa as I,Xa as R,a as S,b as P,ba as a,ca as C,g as k,gb as N,h as D,ia as g,j as q,ka as c,l as F,la as L,m as z,ma as O,oa as n,pa as i,qa as l,ra as X,sa as B,ta as y,ua as h,va as m,za as Y}from"./chunk-7CY22HRV.js";var T=(()=>{class o{constructor(){this.currentRequest=new D({}),this.steps=[{id:1,title:"\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629",subtitle:"\u0627\u062E\u062A\u0631 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",icon:"tools",completed:!1},{id:2,title:"\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",subtitle:"\u0627\u0636\u0641 \u0648\u0635\u0641 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0648\u0627\u0644\u0635\u0648\u0631",icon:"image",completed:!1},{id:3,title:"\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0648\u0642\u062A",subtitle:"\u062D\u062F\u062F \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0648\u0639\u062F \u0627\u0644\u062E\u062F\u0645\u0629",icon:"map-marker",completed:!1},{id:4,title:"\u0627\u0644\u062F\u0641\u0639",subtitle:"\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629",icon:"credit-card",completed:!1}],this.mockRequests=[{id:1,category:"electrician",service:"\u062A\u0635\u0644\u064A\u062D \u062A\u0643\u064A\u0641",description:"\u062A\u0643\u064A\u064A\u0641 \u0644\u0627 \u064A\u0628\u0631\u062F \u0628\u0634\u0643\u0644 \u062C\u064A\u062F",location:{address:"\u0627\u0644\u0645\u0639\u0627\u062F\u064A\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629",coordinates:[30.0444,31.2357]},scheduledDate:"2024-11-14",scheduledTime:"14:00",images:["/api/placeholder/200/200"],estimatedCost:250,paymentMethod:"cash",status:"pending",createdAt:"2024-11-14T10:00:00",customerId:1},{id:2,category:"plumber",service:"\u0633\u0628\u0627\u0643\u0647",description:"\u062A\u0633\u0631\u064A\u0628 \u0645\u064A\u0627\u0647 \u0641\u064A \u0627\u0644\u0645\u0637\u0628\u062E",location:{address:"\u0645\u062F\u064A\u0646\u0629 \u0646\u0635\u0631\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629",coordinates:[30.0511,31.2497]},scheduledDate:"2024-11-14",scheduledTime:"16:00",images:["/api/placeholder/200/200"],estimatedCost:150,paymentMethod:"card",status:"inProgress",createdAt:"2024-11-14T09:00:00",customerId:1,workerId:2}],this.categories=[{id:"electrician",name:"\u0643\u0647\u0631\u0628\u0627\u0626\u064A",icon:"\u26A1",services:[{id:"general",name:"\u0635\u064A\u0627\u0646\u0629 \u0639\u0627\u0645\u0629",basePrice:150},{id:"ac",name:"\u062A\u0635\u0644\u064A\u062D \u062A\u0643\u064A\u064A\u0641",basePrice:200},{id:"appliances",name:"\u062A\u0635\u0644\u064A\u062D \u0623\u062C\u0647\u0632\u0629",basePrice:180}]},{id:"plumber",name:"\u0633\u0628\u0627\u0643",icon:"\u{1F527}",services:[{id:"general",name:"\u0635\u064A\u0627\u0646\u0629 \u0639\u0627\u0645\u0629",basePrice:120},{id:"emergency",name:"\u0637\u0648\u0627\u0631\u0626",basePrice:250}]}],this.statusConfig={draft:{label:"\u0645\u0633\u0648\u062F\u0629",color:"gray",icon:"draft"},pending:{label:"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",color:"yellow",icon:"clock"},accepted:{label:"\u0645\u0642\u0628\u0648\u0644",color:"blue",icon:"check"},inProgress:{label:"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630",color:"blue",icon:"spinner"},completed:{label:"\u0645\u0643\u062A\u0645\u0644",color:"green",icon:"check-circle"},cancelled:{label:"\u0645\u0644\u063A\u064A",color:"red",icon:"times-circle"}},this.paymentMethods=[{id:"cash",name:"\u0646\u0642\u062F\u064A",icon:"money-bill"},{id:"card",name:"\u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062A\u0645\u0627\u0646",icon:"credit-card"}]}getCurrentRequest(){return this.currentRequest.asObservable()}updateCurrentRequest(e){this.currentRequest.next(S(S({},this.currentRequest.value),e))}getRequests(e){let t=this.mockRequests;return e&&(t=this.mockRequests.filter(r=>r.status===e)),q(t)}createRequest(e){let t=P(S({},e),{id:this.mockRequests.length+1,createdAt:new Date().toISOString(),status:"pending"});return q(t)}calculateEstimatedCost(e,t){let v=this.categories.find(f=>f.id===e)?.services.find(f=>f.id===t)?.basePrice||0;return Math.round(v+Math.random()*50)}getAvailableTimeSlots(e){return["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]}validateStep(e,t){return{1:()=>!!(t.category&&t.service),2:()=>t.description.length>=20,3:()=>!!(t.location&&t.scheduledDate&&t.scheduledTime),4:()=>!!t.paymentMethod}[e]?.()||!1}getStatusDetails(e){return this.statusConfig[e]}processPayment(e){return q(!0)}getServicesByCategory(e){return this.categories.find(t=>t.id===e)?.services||[]}static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275prov=j({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();function fe(o,u){if(o&1){let e=y();n(0,"button",13),h("click",function(){_(e);let r=m();return x(r.openNewRequest())}),l(1,"i",14),n(2,"span"),s(3,"\u0637\u0644\u0628 \u062C\u062F\u064A\u062F"),i()()}}function be(o,u){if(o&1){let e=y();n(0,"button",15),h("click",function(){let r=_(e).$implicit,d=m();return x(d.setStatus(r.id))}),l(1,"i"),n(2,"span"),s(3),i(),n(4,"span",16),s(5),i()()}if(o&2){let e=u.$implicit,t=m();L("active",t.currentStatus===e.id),a(),O(e.icon),a(2),b(e.label),a(2),b(e.count)}}function he(o,u){o&1&&(n(0,"span"),s(1,"\u2022"),i())}function _e(o,u){if(o&1&&(n(0,"span"),s(1),i()),o&2){let e=m().$implicit;a(),b(e.distance)}}function xe(o,u){if(o&1&&(n(0,"div",34)(1,"div",35),l(2,"i",36),n(3,"span"),s(4),i()(),n(5,"span",37),s(6),i()()),o&2){let e=m().$implicit;a(4),b(e.worker.rating),a(2),M(" ",e.worker.completedJobs," \u062E\u062F\u0645\u0629 \u0645\u0646\u0641\u0630\u0629 ")}}function ve(o,u){o&1&&(n(0,"button",38),l(1,"i",39),n(2,"span"),s(3,"\u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0648\u0642\u0639"),i()())}function Ce(o,u){if(o&1){let e=y();n(0,"div",17)(1,"div"),l(2,"i"),n(3,"span"),s(4),i()(),n(5,"div",18)(6,"div",19)(7,"div")(8,"h3",20),s(9),i(),n(10,"div",21),l(11,"i",22),n(12,"span"),s(13),i(),g(14,he,2,0,"span",23)(15,_e,2,1,"span",23),i()(),g(16,xe,7,2,"div",24),i(),n(17,"div",21),l(18,"i",25),n(19,"span"),s(20),i()(),n(21,"p",26),s(22),i(),n(23,"div",27)(24,"div",28),s(25),i(),g(26,ve,4,0,"button",29),i()(),n(27,"div",30)(28,"button",31),h("click",function(){let r=_(e).$implicit,d=m();return x(d.handleAction(r))}),l(29,"i"),n(30,"span"),s(31),i()(),n(32,"button",32),l(33,"i",33),n(34,"span"),s(35,"\u062A\u0641\u0627\u0648\u0636"),i()()()()}if(o&2){let e=u.$implicit,t=m();a(),O(t.getStatusClass(e.status)),a(),O(t.getStatusIcon(e.status)),a(2),b(t.getStatusLabel(e.status)),a(5),b(e.service),a(4),b(e.location.address),a(),c("ngIf",e.distance),a(),c("ngIf",e.distance),a(),c("ngIf",e.worker),a(4),G("",e.scheduledTime," \u2022 ",e.scheduledDate,""),a(2),b(e.description),a(3),M(" ",e.estimatedCost," \u062C\u0646\u064A\u0647 "),a(),c("ngIf",e.status==="inProgress"),a(3),O(t.getActionButtonIcon()),a(2),b(t.actionButtonLabel)}}var je=(()=>{class o{get orderStatuses(){let e={id:"all",label:"\u0627\u0644\u0643\u0644",icon:"fas fa-list",count:this.getTotalCount()},t=Object.entries(this.requestService.statusConfig).map(([r,d])=>({id:r,label:d.label,icon:`fas fa-${d.icon}`,count:this.getStatusCount(r)}));return[e,...t]}constructor(e,t,r,d){this.authService=e,this.requestService=t,this.workerService=r,this.router=d,this.destroy$=new k,this.currentStatus="inProgress",this.proposals=[]}ngOnInit(){this.loadRequests()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadRequests(){let e=this.requestService.getRequests(this.currentStatus==="all"?void 0:this.currentStatus),t=this.workerService.getWorkers();z([e,t]).pipe(F(([r,d])=>r.map(v=>{let f=v.workerId?d.find(V=>V.id===v.workerId):void 0;return P(S({},v),{worker:f?{name:f.name,rating:f.rating,completedJobs:f.completedJobs,image:f.image}:void 0,distance:f?this.calculateDistance(v.location.coordinates,f.position):void 0})})),w(this.destroy$)).subscribe(r=>{this.proposals=r})}get userType(){return this.authService.getCurrentUser()?.type}get pageTitle(){return this.userType==="worker"?"\u062E\u062F\u0645\u0627\u062A\u064A":"\u0637\u0644\u0628\u0627\u062A\u064A"}get actionButtonLabel(){return this.userType==="worker"?"\u0642\u0628\u0648\u0644 \u0627\u0644\u0637\u0644\u0628":"\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628"}setStatus(e){this.currentStatus=e,this.loadRequests()}getStatusClass(e){return`status-banner ${{pending:"bg-yellow-50 text-yellow-700",inProgress:"bg-blue-50 text-blue-700",completed:"bg-green-50 text-green-700",cancelled:"bg-red-50 text-red-700",accepted:"bg-indigo-50 text-indigo-700",draft:"bg-gray-50 text-gray-700"}[e]}`}getStatusIcon(e){let t=this.requestService.getStatusDetails(e),r={pending:"text-yellow-500",inProgress:"text-blue-500",completed:"text-green-500",cancelled:"text-red-500",accepted:"text-indigo-500",draft:"text-gray-500"};return`fas fa-${t.icon} ${r[e]}`}getStatusLabel(e){return this.requestService.getStatusDetails(e).label}getActionButtonIcon(){return this.userType==="worker"?"fas fa-check":"fas fa-info-circle"}openNewRequest(){this.router.navigate(["/requests/new-request"])}openFilters(){}handleAction(e){this.userType==="worker"?this.acceptRequest(e):this.viewRequestDetails(e)}acceptRequest(e){console.log("Accepting request:",e.id)}viewRequestDetails(e){this.router.navigate(["requests",e.id])}getTotalCount(){return this.proposals.length}getStatusCount(e){return this.proposals.filter(t=>t.status===e).length}calculateDistance(e,t){let d=this.deg2rad(t[0]-e[0]),v=this.deg2rad(t[1]-e[1]),f=Math.sin(d/2)*Math.sin(d/2)+Math.cos(this.deg2rad(e[0]))*Math.cos(this.deg2rad(t[0]))*Math.sin(v/2)*Math.sin(v/2),A=6371*(2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f)));return A<1?`${Math.round(A*1e3)} \u0645`:`${A.toFixed(1)} \u0643\u0645`}deg2rad(e){return e*(Math.PI/180)}static{this.\u0275fac=function(t){return new(t||o)(C(W),C(T),C(H),C(N))}}static{this.\u0275cmp=E({type:o,selectors:[["app-requests-list"]],decls:14,vars:4,consts:[[1,"pb-20"],[1,"header"],[1,"header-content"],[1,"title"],[1,"flex","items-center","gap-3"],[1,"filter-btn",3,"click"],[1,"fas","fa-filter"],["class","new-request-btn",3,"click",4,"ngIf"],[1,"tabs-container"],[1,"tabs-scroll","no-scrollbar"],["class","tab-btn",3,"active","click",4,"ngFor","ngForOf"],[1,"cards-container"],["class","request-card",4,"ngFor","ngForOf"],[1,"new-request-btn",3,"click"],[1,"fas","fa-plus"],[1,"tab-btn",3,"click"],[1,"counter"],[1,"request-card"],[1,"card-content"],[1,"card-header"],[1,"request-title"],[1,"info-text"],[1,"fas","fa-map-marker-alt"],[4,"ngIf"],["class","flex flex-col items-end",4,"ngIf"],[1,"fas","fa-clock"],[1,"description-text"],[1,"flex","justify-between","items-center"],[1,"price-text"],["class","track-location-btn",4,"ngIf"],[1,"actions-container"],[1,"primary-btn",3,"click"],[1,"secondary-btn"],[1,"fas","fa-comments"],[1,"flex","flex-col","items-end"],[1,"rating-badge"],[1,"fas","fa-star","text-yellow-500"],[1,"text-sm","text-gray-500","mt-1"],[1,"track-location-btn"],[1,"fas","fa-location-arrow","animate-pulse"]],template:function(t,r){t&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),s(4),i(),n(5,"div",4)(6,"button",5),h("click",function(){return r.openFilters()}),l(7,"i",6),i(),g(8,fe,4,0,"button",7),i()()(),n(9,"div",8)(10,"div",9),g(11,be,6,6,"button",10),i()(),n(12,"div",11),g(13,Ce,36,18,"div",12),i()()),t&2&&(a(4),b(r.pageTitle),a(4),c("ngIf",r.userType==="customer"),a(3),c("ngForOf",r.orderStatuses),a(2),c("ngForOf",r.proposals))},dependencies:[I,R],styles:["[_nghost-%COMP%]{display:block;width:100%;min-height:100vh;background-color:#f8f9fa}.header[_ngcontent-%COMP%]{background:linear-gradient(180deg,#ef4444 0% 100%);padding:1rem;position:sticky;top:0;z-index:50}.header-content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.header-content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#fff;font-size:1.25rem;font-weight:600}.filter-btn[_ngcontent-%COMP%]{width:2.5rem;height:2.5rem;border-radius:9999px;background-color:#ffffff1a;color:#fff;display:flex;align-items:center;justify-content:center;transition:all .2s ease;border:none}.filter-btn[_ngcontent-%COMP%]:hover{background-color:#fff3;transform:translateY(-1px)}.filter-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.new-request-btn[_ngcontent-%COMP%]{background-color:#fff;color:#ef4444;padding:.5rem 1rem;border-radius:9999px;font-size:.875rem;font-weight:500;display:flex;align-items:center;gap:.5rem;transition:all .2s ease;box-shadow:0 1px 2px #0000000d;border:none}.new-request-btn[_ngcontent-%COMP%]:hover{background-color:#fef2f2;transform:translateY(-1px);box-shadow:0 4px 6px #0000000d}.new-request-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.tabs-container[_ngcontent-%COMP%]{background-color:#fff;border-bottom:1px solid #e5e7eb;position:sticky;top:4rem;z-index:40}.tabs-scroll[_ngcontent-%COMP%]{display:flex;overflow-x:auto;gap:1rem;padding:.5rem 1rem}.tab-btn[_ngcontent-%COMP%]{padding:.75rem 1.25rem;display:flex;align-items:center;gap:.5rem;border-bottom:2px solid transparent;transition:all .2s ease;white-space:nowrap;font-size:.875rem;font-weight:500;color:#6b7280;background:none;border:none}.tab-btn.active[_ngcontent-%COMP%]{color:#ef4444;border-bottom-color:#ef4444}.tab-btn[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{background-color:#f3f4f6;color:#6b7280;padding:.125rem .5rem;border-radius:9999px;font-size:.75rem}.cards-container[_ngcontent-%COMP%]{padding:1rem;display:flex;flex-direction:column;gap:1rem}.request-card[_ngcontent-%COMP%]{background-color:#fff;border-radius:1rem;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 1px 3px #0000001a}.status-banner[_ngcontent-%COMP%]{padding:.5rem 1rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;justify-content:flex-end;gap:.5rem}.status-banner.pending[_ngcontent-%COMP%]{background-color:#fef3c7;color:#92400e}.status-banner.in-progress[_ngcontent-%COMP%]{background-color:#dbeafe;color:#1e40af}.status-banner.completed[_ngcontent-%COMP%]{background-color:#d1fae5;color:#065f46}.card-content[_ngcontent-%COMP%]{padding:1rem}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}.request-title[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;color:#111827;margin-bottom:.25rem}.rating-badge[_ngcontent-%COMP%]{background-color:#fef3c7;color:#92400e;padding:.25rem .75rem;border-radius:9999px;font-size:.875rem;display:flex;align-items:center;gap:.25rem}.actions-container[_ngcontent-%COMP%]{border-top:1px solid #e5e7eb;padding:1rem;display:flex;gap:.75rem;background-color:#f9fafb}.primary-btn[_ngcontent-%COMP%]{flex:1;background-color:#ef4444;color:#fff;padding:.75rem 1rem;border-radius:.75rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .2s ease;border:none;box-shadow:0 1px 2px #0000000d}.primary-btn[_ngcontent-%COMP%]:hover{background-color:#dc2626;transform:translateY(-1px);box-shadow:0 4px 6px #0000000d}.primary-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.secondary-btn[_ngcontent-%COMP%]{flex:1;background-color:transparent;border:1px solid #ef4444;color:#ef4444;padding:.75rem 1rem;border-radius:.75rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .2s ease}.secondary-btn[_ngcontent-%COMP%]:hover{background-color:#fef2f2;transform:translateY(-1px)}.secondary-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.track-location-btn[_ngcontent-%COMP%]{color:#ef4444;font-size:.875rem;display:flex;align-items:center;gap:.5rem;padding:.5rem;transition:all .2s ease;background:none;border:none}.track-location-btn[_ngcontent-%COMP%]:hover{color:#dc2626}.track-location-btn[_ngcontent-%COMP%]   .animate-pulse[_ngcontent-%COMP%]{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.info-text[_ngcontent-%COMP%]{color:#6b7280;font-size:.875rem;display:flex;align-items:center;gap:.5rem}.price-text[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;color:#ef4444}.description-text[_ngcontent-%COMP%]{color:#6b7280;font-size:.875rem;margin:1rem 0}"]})}}return o})();function ye(o,u){if(o&1&&(n(0,"option",23),s(1),i()),o&2){let e=u.$implicit;c("value",e.id),a(),M(" ",e.name," ")}}function Se(o,u){if(o&1&&(n(0,"option",23),s(1),i()),o&2){let e=u.$implicit;c("value",e.id),a(),M(" ",e.name," ")}}function Me(o,u){if(o&1&&(n(0,"div",16)(1,"label",17),s(2,"\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629"),i(),n(3,"select",18)(4,"option",19),s(5,"\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629"),i(),g(6,ye,2,2,"option",20),i(),n(7,"label",21),s(8,"\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),i(),n(9,"select",22)(10,"option",19),s(11,"\u0627\u062E\u062A\u0631 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),i(),g(12,Se,2,2,"option",20),i()()),o&2){let e=m();a(6),c("ngForOf",e.categories),a(6),c("ngForOf",e.selectedCategory==null?null:e.selectedCategory.services)}}function Oe(o,u){if(o&1){let e=y();n(0,"div",33),l(1,"img",34),U(2,"urlSanitizer"),n(3,"button",35),h("click",function(){let r=_(e).index,d=m(3);return x(d.removeImage(r))}),l(4,"i",36),i()()}if(o&2){let e=u.$implicit;a(),c("src",J(2,1,e),$)}}function Pe(o,u){if(o&1&&(n(0,"div",31),g(1,Oe,5,3,"div",32),i()),o&2){let e=m(2);a(),c("ngForOf",e.selectedImages)}}function we(o,u){if(o&1){let e=y();n(0,"div",24)(1,"div",16)(2,"label",17),s(3,"\u0648\u0635\u0641 \u0627\u0644\u0645\u0634\u0643\u0644\u0629"),i(),n(4,"textarea",25),s(5,"            "),i()(),n(6,"div",16)(7,"label",17),s(8,"\u0625\u0636\u0627\u0641\u0629 \u0635\u0648\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"),i(),n(9,"div",26)(10,"input",27,0),h("change",function(r){_(e);let d=m();return x(d.onImageSelected(r))}),i(),n(12,"button",28),h("click",function(){_(e);let r=Y(11);return x(r.click())}),l(13,"i",29),n(14,"span"),s(15,"\u0627\u062E\u062A\u0631 \u0635\u0648\u0631"),i()()(),g(16,Pe,2,1,"div",30),i()()}if(o&2){let e=m();a(16),c("ngIf",e.selectedImages.length)}}function ke(o,u){if(o&1&&(n(0,"div",24)(1,"div",16)(2,"label",17),s(3,"\u0627\u0644\u0645\u0648\u0642\u0639"),i(),n(4,"div",37),l(5,"input",38),n(6,"button",39),l(7,"i",40),i()()(),n(8,"div",16)(9,"label",17),s(10,"\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),i(),l(11,"input",41),i(),n(12,"div",16)(13,"label",17),s(14,"\u0627\u0644\u0648\u0642\u062A"),i(),l(15,"input",42),i()()),o&2){let e=m();a(11),c("min",e.today)}}function qe(o,u){o&1&&(X(0,53),n(1,"div",16)(2,"label",17),s(3,"\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),i(),l(4,"input",54),i(),n(5,"div",55)(6,"div",16)(7,"label",17),s(8,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"),i(),l(9,"input",56),i(),n(10,"div",16)(11,"label",17),s(12,"CVV"),i(),l(13,"input",57),i()(),n(14,"div",16)(15,"label",17),s(16,"\u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),i(),l(17,"input",58),i(),B())}function Ee(o,u){if(o&1&&(n(0,"div",24)(1,"div",43)(2,"span"),s(3,"\u0627\u0644\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629:"),i(),n(4,"span",44),s(5),i()(),n(6,"div",45)(7,"label",46),l(8,"input",47),n(9,"span",48),l(10,"i",49),n(11,"span"),s(12,"\u0627\u0644\u062F\u0641\u0639 \u0646\u0642\u062F\u0627\u064B"),i()()(),n(13,"label",46),l(14,"input",50),n(15,"span",48),l(16,"i",51),n(17,"span"),s(18,"\u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062A\u0645\u0627\u0646"),i()()()(),g(19,qe,18,0,"ng-container",52),i()),o&2){let e,t=m();a(5),M("",t.estimatedCost," \u062C\u0646\u064A\u0647"),a(14),c("ngIf",((e=t.form.get("paymentMethod"))==null?null:e.value)==="card")}}function Ie(o,u){if(o&1){let e=y();n(0,"button",59),h("click",function(){_(e);let r=m();return x(r.previousStep())}),s(1," \u0627\u0644\u0633\u0627\u0628\u0642 "),i()}}function Re(o,u){if(o&1){let e=y();n(0,"button",60),h("click",function(){_(e);let r=m();return x(r.nextStep())}),s(1," \u0627\u0644\u062A\u0627\u0644\u064A "),i()}if(o&2){let e=m();c("disabled",!e.isStepValid())}}function Ne(o,u){if(o&1&&(n(0,"button",61),s(1),i()),o&2){let e=m();c("disabled",!e.form.valid||e.loading),a(),M(" ",e.loading?"\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...":"\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628"," ")}}var We=(()=>{class o{get selectedCategory(){let e=this.form.get("category")?.value;return this.categories.find(t=>t.id===e)}get cardDetailsGroup(){return this.form.get("cardDetails")}constructor(e,t,r){this.fb=e,this.router=t,this.requestService=r,this.destroy$=new k,this.currentStep=1,this.loading=!1,this.steps=[],this.categories=this.requestService.categories,this.selectedImages=[],this.estimatedCost=0,this.today=new Date().toISOString().split("T")[0],this.initForm(),this.steps=this.requestService.steps}ngOnInit(){this.watchFormChanges()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initForm(){this.form=this.fb.group({category:["",p.required],service:["",p.required],description:["",[p.required,p.minLength(20)]],images:[[]],location:["",p.required],scheduledDate:["",p.required],scheduledTime:["",p.required],paymentMethod:["cash",p.required],cardDetails:this.fb.group({cardNumber:[""],expiryDate:[""],cvv:[""],nameOnCard:[""]})})}setCardValidators(){let e={cardNumber:[p.required,p.pattern(/^\d{16}$/)],expiryDate:[p.required,p.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],cvv:[p.required,p.pattern(/^\d{3}$/)],nameOnCard:[p.required]};Object.keys(e).forEach(t=>{let r=this.cardDetailsGroup.get(t);r&&(r.setValidators(e[t]),r.updateValueAndValidity())})}clearCardValidators(){Object.keys(this.cardDetailsGroup.controls).forEach(e=>{let t=this.cardDetailsGroup.get(e);t&&(t.clearValidators(),t.updateValueAndValidity())})}watchFormChanges(){this.form.get("category")?.valueChanges.pipe(w(this.destroy$)).subscribe(e=>{this.form.patchValue({service:""}),e&&this.form.get("service")?.value&&this.updateEstimatedCost()}),this.form.get("service")?.valueChanges.pipe(w(this.destroy$)).subscribe(e=>{e&&this.form.get("category")?.value&&this.updateEstimatedCost()})}updateEstimatedCost(){let e=this.form.get("category")?.value,t=this.form.get("service")?.value;e&&t&&(this.estimatedCost=this.requestService.calculateEstimatedCost(e,t))}isStepValid(){return this.requestService.validateStep(this.currentStep,this.form.value)}nextStep(){this.currentStep<this.steps.length&&this.isStepValid()&&(this.steps[this.currentStep-1].completed=!0,this.currentStep++,this.requestService.updateCurrentRequest(this.form.value))}previousStep(){this.currentStep>1&&this.currentStep--}onImageSelected(e){let t=e.target;if(t.files){let r=Array.from(t.files);this.selectedImages=[...this.selectedImages,...r].slice(0,5),this.form.patchValue({images:this.selectedImages})}}removeImage(e){this.selectedImages.splice(e,1),this.form.patchValue({images:this.selectedImages})}onSubmit(){if(this.form.valid&&!this.loading){this.loading=!0;let e=P(S({},this.form.value),{status:"pending",createdAt:new Date().toISOString(),customerId:1});this.requestService.createRequest(e).pipe(w(this.destroy$)).subscribe({next:()=>{this.router.navigate(["/requests"])},error:t=>{console.error("Error submitting request:",t),this.loading=!1}})}}static{this.\u0275fac=function(t){return new(t||o)(C(ue),C(N),C(T))}}static{this.\u0275cmp=E({type:o,selectors:[["app-new-request"]],decls:20,vars:13,consts:[["fileInput",""],[1,"register-container"],[1,"header"],["text","\u0631\u062C\u0648\u0639",3,"redirectUrl"],[1,"main-content"],[1,"title-section"],[1,"icon-circle"],[1,"title"],[1,"subtitle"],[1,"form-container",3,"ngSubmit","formGroup"],["class","form-group",4,"ngIf"],["class","form-groups",4,"ngIf"],[1,"buttons-container"],["type","button","class","back-button",3,"click",4,"ngIf"],["type","button","class","next-button",3,"disabled","click",4,"ngIf"],["type","submit","class","submit-button",3,"disabled",4,"ngIf"],[1,"form-group"],[1,"form-label"],["formControlName","category",1,"input-field"],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],[1,"form-label","mt-4"],["formControlName","service",1,"input-field"],[3,"value"],[1,"form-groups"],["formControlName","description","rows","4","placeholder","\u0627\u0634\u0631\u062D \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644...",1,"input-field"],[1,"image-upload-container"],["type","file","multiple","","accept","image/*",1,"hidden",3,"change"],["type","button",1,"upload-button",3,"click"],[1,"fas","fa-camera"],["class","images-preview",4,"ngIf"],[1,"images-preview"],["class","image-item",4,"ngFor","ngForOf"],[1,"image-item"],["alt","Preview",3,"src"],["type","button",1,"remove-image",3,"click"],[1,"fas","fa-times"],[1,"input-container"],["type","text","formControlName","location","placeholder","\u062D\u062F\u062F \u0645\u0648\u0642\u0639 \u0627\u0644\u062E\u062F\u0645\u0629",1,"input-field"],["type","button",1,"location-button"],[1,"fas","fa-map-marker-alt"],["type","date","formControlName","scheduledDate",1,"input-field",3,"min"],["type","time","formControlName","scheduledTime",1,"input-field"],[1,"estimated-cost"],[1,"cost"],[1,"payment-methods"],[1,"payment-method"],["type","radio","formControlName","paymentMethod","value","cash"],[1,"method-content"],[1,"fas","fa-money-bill-wave"],["type","radio","formControlName","paymentMethod","value","card"],[1,"fas","fa-credit-card"],["formGroupName","cardDetails",4,"ngIf"],["formGroupName","cardDetails"],["type","text","formControlName","cardNumber","placeholder","XXXX XXXX XXXX XXXX",1,"input-field"],[1,"form-row"],["type","text","formControlName","expiryDate","placeholder","MM/YY",1,"input-field"],["type","text","formControlName","cvv","placeholder","XXX",1,"input-field"],["type","text","formControlName","nameOnCard","placeholder","\u0627\u0644\u0627\u0633\u0645 \u0643\u0645\u0627 \u064A\u0638\u0647\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",1,"input-field"],["type","button",1,"back-button",3,"click"],["type","button",1,"next-button",3,"click","disabled"],["type","submit",1,"submit-button",3,"disabled"]],template:function(t,r){t&1&&(n(0,"div",1)(1,"header",2),l(2,"app-back-button",3),i(),n(3,"main",4)(4,"div",5)(5,"div",6),l(6,"i"),i(),n(7,"h1",7),s(8),i(),n(9,"p",8),s(10),i()(),n(11,"form",9),h("ngSubmit",function(){return r.onSubmit()}),g(12,Me,13,2,"div",10)(13,we,17,1,"div",11)(14,ke,16,1,"div",11)(15,Ee,20,2,"div",11),n(16,"div",12),g(17,Ie,2,0,"button",13)(18,Re,2,1,"button",14)(19,Ne,2,2,"button",15),i()()()()),t&2&&(a(2),c("redirectUrl","/requests"),a(4),O("fas fa-"+r.steps[r.currentStep-1].icon),a(2),b(r.steps[r.currentStep-1].title),a(2),b(r.steps[r.currentStep-1].subtitle),a(),c("formGroup",r.form),a(),c("ngIf",r.currentStep===1),a(),c("ngIf",r.currentStep===2),a(),c("ngIf",r.currentStep===3),a(),c("ngIf",r.currentStep===4),a(2),c("ngIf",r.currentStep>1),a(),c("ngIf",r.currentStep<r.steps.length),a(),c("ngIf",r.currentStep===r.steps.length))},dependencies:[I,R,K,ne,ce,le,Z,se,ie,ee,te,oe,ae,re,Q],styles:[".register-container[_ngcontent-%COMP%]{min-height:100vh;background-color:#fff;display:flex;flex-direction:column}.header[_ngcontent-%COMP%]{padding:1.25rem 1rem;background-color:#fff;border-bottom:1px solid rgba(229,231,235,.5)}.main-content[_ngcontent-%COMP%]{flex:1;padding:2rem 1rem;display:flex;flex-direction:column}.title-section[_ngcontent-%COMP%]{text-align:center;margin-bottom:3rem}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]{width:64px;height:64px;background-color:#ef44441a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.75rem;color:#ef4444}.title-section[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#ef4444;margin-bottom:.75rem}.title-section[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:1rem;color:#6b7280}.form-container[_ngcontent-%COMP%]{max-width:24rem;margin:0 auto;width:100%;display:flex;flex-direction:column;padding:0}.form-group[_ngcontent-%COMP%]{margin-bottom:1.5rem;width:100%}.form-groups[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.form-label[_ngcontent-%COMP%]{display:block;font-size:1rem;font-weight:500;color:#111827;margin-bottom:.75rem;text-align:right}.input-field[_ngcontent-%COMP%]{width:100%;height:3.75rem;border:2px solid #e5e7eb;border-radius:.75rem;font-size:1rem;color:#111827;background-color:#fff;transition:all .2s ease-in-out;text-align:right;padding:0 1rem;box-sizing:border-box}.input-field[_ngcontent-%COMP%]:focus{outline:none;border-color:#ef4444;box-shadow:0 0 0 2px #ef44441a}.input-field[_ngcontent-%COMP%]::placeholder{color:#9ca3af;opacity:1;text-align:right}.input-field[_ngcontent-%COMP%]:disabled{background-color:#f3f4f6;cursor:not-allowed}textarea.input-field[_ngcontent-%COMP%]{height:auto;resize:vertical;padding:1rem}.input-container[_ngcontent-%COMP%]{position:relative;width:100%;max-width:100%;display:flex;align-items:center}.location-button[_ngcontent-%COMP%]{position:absolute;left:0;top:50%;transform:translateY(-50%);width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;color:#6b7280;background:none;border:none;cursor:pointer;transition:color .2s ease}.location-button[_ngcontent-%COMP%]:hover{color:#374151}.location-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem}.image-upload-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:1.5rem}.upload-button[_ngcontent-%COMP%]{background-color:#ef4444;color:#fff;border:none;border-radius:.75rem;font-size:.95rem;font-weight:500;padding:.75rem 1.5rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;transition:all .2s ease-in-out}.upload-button[_ngcontent-%COMP%]:hover{background-color:#dc2626}.upload-button[_ngcontent-%COMP%]:active{transform:translateY(1px)}.images-preview[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center}.image-item[_ngcontent-%COMP%]{position:relative}.image-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:100px;object-fit:cover;border-radius:.5rem}.image-item[_ngcontent-%COMP%]   .remove-image[_ngcontent-%COMP%]{position:absolute;top:-.5rem;right:-.5rem;background-color:#fff;color:#ef4444;border:1px solid #ef4444;border-radius:50%;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.image-item[_ngcontent-%COMP%]   .remove-image[_ngcontent-%COMP%]:hover{background-color:#ef4444;color:#fff}.estimated-cost[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;background-color:#f3f4f6;padding:1rem;border-radius:.75rem;margin-bottom:1.5rem;font-weight:500}.estimated-cost[_ngcontent-%COMP%]   .cost[_ngcontent-%COMP%]{color:#ef4444;font-size:1.25rem;font-weight:700}.payment-methods[_ngcontent-%COMP%]{display:flex;gap:1rem;margin-bottom:1.5rem}.payment-method[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;cursor:pointer}.payment-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]{display:none}.payment-method[_ngcontent-%COMP%]   .method-content[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;gap:.5rem;border:2px solid #e5e7eb;border-radius:.75rem;padding:1rem;transition:all .2s ease-in-out}.payment-method[_ngcontent-%COMP%]   .method-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem;color:#6b7280}.payment-method[_ngcontent-%COMP%]   .method-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.payment-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:checked + .method-content[_ngcontent-%COMP%]{border-color:#ef4444;background-color:#ef44441a}.payment-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:checked + .method-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#ef4444}.form-row[_ngcontent-%COMP%]{display:flex;gap:1rem}.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{flex:1}.buttons-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-top:1.5rem}.back-button[_ngcontent-%COMP%], .next-button[_ngcontent-%COMP%], .submit-button[_ngcontent-%COMP%]{width:120px;height:44px;border-radius:.75rem;font-size:.95rem;font-weight:500;transition:all .2s ease-in-out;cursor:pointer}.back-button[_ngcontent-%COMP%]{background-color:#f3f4f6;color:#374151;border:none}.back-button[_ngcontent-%COMP%]:hover{background-color:#e5e7eb}.next-button[_ngcontent-%COMP%], .submit-button[_ngcontent-%COMP%]{background-color:#ef4444;color:#fff;border:none}.next-button[_ngcontent-%COMP%]:disabled, .submit-button[_ngcontent-%COMP%]:disabled{background-color:#fed7d7;cursor:not-allowed}.next-button[_ngcontent-%COMP%]:not(:disabled):hover, .submit-button[_ngcontent-%COMP%]:not(:disabled):hover{background-color:#dc2626}@media (max-width: 400px){.main-content[_ngcontent-%COMP%]{padding:1.5rem 1rem}.title-section[_ngcontent-%COMP%]{margin-bottom:2rem}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]{width:56px;height:56px}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}.title-section[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.25rem}.title-section[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:.875rem}}"]})}}return o})();export{je as a,We as b};