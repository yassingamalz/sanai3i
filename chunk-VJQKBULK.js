import{a as U}from"./chunk-66OUK6NL.js";import{b as J,c as W,d as H,e as N,f as le}from"./chunk-LL3DEEXM.js";import{a as B}from"./chunk-I4DRQR4T.js";import{c as K,d as g,e as Q,f as Z,i as ee,k as te,l as ne,m as ie,n as oe,o as re,p as ae,q as se,u as ce}from"./chunk-F2NDTPPK.js";import{g as R}from"./chunk-2OXZLMJU.js";import{Ab as m,Fb as L,Gb as s,Hb as f,Ib as M,Jb as X,Rb as Y,Sb as G,Ta as D,W as S,Xa as a,Ya as C,a as w,b as P,ka as q,l as k,mb as p,ob as c,pb as z,qb as O,sb as t,t as A,ta as _,tb as n,tc as E,u as F,ua as h,ub as l,uc as I,vb as $,wb as j,xb as v,zb as b}from"./chunk-V2S6RPXY.js";function ge(r,u){if(r&1){let e=v();t(0,"button",13),b("click",function(){_(e);let i=m();return h(i.openNewRequest())}),l(1,"i",14),t(2,"span"),s(3,"\u0637\u0644\u0628 \u062C\u062F\u064A\u062F"),n()()}}function fe(r,u){if(r&1){let e=v();t(0,"button",15),b("click",function(){let i=_(e).$implicit,d=m();return h(d.setStatus(i.id))}),l(1,"i"),t(2,"span"),s(3),n(),t(4,"span",16),s(5),n()()}if(r&2){let e=u.$implicit,o=m();z("active",o.currentStatus===e.id),a(),O(e.icon),a(2),f(e.label),a(2),f(e.count)}}function be(r,u){r&1&&(t(0,"span"),s(1,"\u2022"),n())}function _e(r,u){if(r&1&&(t(0,"span"),s(1),n()),r&2){let e=m().$implicit;a(),f(e.distance)}}function he(r,u){if(r&1&&(t(0,"div",33)(1,"div",34),l(2,"i",35),t(3,"span"),s(4),n()(),t(5,"span",36),s(6),n()()),r&2){let e=m().$implicit;a(4),f(e.worker.rating),a(2),M(" ",e.worker.completedJobs," \u062E\u062F\u0645\u0629 \u0645\u0646\u0641\u0630\u0629 ")}}function xe(r,u){r&1&&(t(0,"button",37),l(1,"i",38),t(2,"span"),s(3,"\u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0648\u0642\u0639"),n()())}function Ce(r,u){if(r&1){let e=v();t(0,"button",39),b("click",function(){_(e);let i=m().$implicit,d=m();return h(d.openNegotiation(i))}),l(1,"i",40),t(2,"span"),s(3,"\u062A\u0641\u0627\u0648\u0636"),n()()}}function ve(r,u){if(r&1){let e=v();t(0,"div",17)(1,"div"),l(2,"i"),t(3,"span"),s(4),n()(),t(5,"div",18)(6,"div",19)(7,"div")(8,"h3",20),s(9),n(),t(10,"div",21),l(11,"i",22),t(12,"span"),s(13),n(),p(14,be,2,0,"span",23)(15,_e,2,1,"span",23),n()(),p(16,he,7,2,"div",24),n(),t(17,"div",21),l(18,"i",25),t(19,"span"),s(20),n()(),t(21,"p",26),s(22),n(),t(23,"div",27)(24,"div",28),s(25),n(),p(26,xe,4,0,"button",29),n()(),t(27,"div",30)(28,"button",31),b("click",function(){let i=_(e).$implicit,d=m();return h(d.handleAction(i))}),l(29,"i"),t(30,"span"),s(31),n()(),p(32,Ce,4,0,"button",32),n()()}if(r&2){let e=u.$implicit,o=m();a(),O(o.getStatusClass(e.status)),a(),O(o.getStatusIcon(e.status)),a(2),f(o.getStatusLabel(e.status)),a(5),f(e.service),a(4),f(e.location.address),a(),c("ngIf",e.distance),a(),c("ngIf",e.distance),a(),c("ngIf",e.worker),a(4),X("",e.scheduledTime," \u2022 ",e.scheduledDate,""),a(2),f(e.description),a(3),M(" ",e.estimatedCost," \u062C\u0646\u064A\u0647 "),a(),c("ngIf",e.status==="inProgress"),a(3),O(o.getActionButtonIcon()),a(2),f(o.actionButtonLabel),a(),c("ngIf",o.canNegotiate(e))}}var $e=(()=>{class r{get orderStatuses(){let e={id:"all",label:"\u0627\u0644\u0643\u0644",icon:"fas fa-list",count:this.getTotalCount()},o=Object.entries(this.requestService.statusConfig).map(([i,d])=>({id:i,label:d.label,icon:`fas fa-${d.icon}`,count:this.getStatusCount(i)}));return[e,...o]}constructor(e,o,i,d,y){this.authService=e,this.requestService=o,this.workerService=i,this.router=d,this.dialog=y,this.destroy$=new k,this.currentStatus="inProgress",this.proposals=[],this.isLoading=!0}ngOnInit(){this.loadRequests()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadRequests(){this.isLoading=!0;let e=this.requestService.getRequests(this.currentStatus==="all"?void 0:this.currentStatus),o=this.workerService.getWorkers();F([e,o]).pipe(A(([i,d])=>i.map(y=>{let x=y.workerId?d.find(V=>V.id===y.workerId):void 0;return P(w({},y),{worker:x?{name:x.name,rating:x.rating,completedJobs:x.completedJobs,image:x.image}:void 0,distance:x?this.calculateDistance(y.location.coordinates,x.position):void 0})})),S(this.destroy$)).subscribe({next:i=>{this.proposals=i,this.isLoading=!1},error:i=>{console.error("Error loading requests:",i),this.isLoading=!1}})}openNegotiation(e){this.dialog.open(le,{data:{requestId:e.id,originalPrice:e.estimatedCost,serviceName:e.service},width:"360px",maxWidth:"95vw",panelClass:["custom-negotiation-dialog"],hasBackdrop:!0,backdropClass:"dialog-backdrop",autoFocus:!1}).afterClosed().pipe(S(this.destroy$)).subscribe(i=>{i?.accepted&&i.price&&this.requestService.updateRequestPrice(e.id||0,{price:i.price,message:i.message}).pipe(S(this.destroy$)).subscribe({next:()=>{this.loadRequests()},error:d=>{console.error("Error updating price:",d)}})})}get userType(){return this.authService.getCurrentUser()?.type}get pageTitle(){return this.userType==="worker"?"\u062E\u062F\u0645\u0627\u062A\u064A":"\u0637\u0644\u0628\u0627\u062A\u064A"}get actionButtonLabel(){return this.userType==="worker"?"\u0642\u0628\u0648\u0644 \u0627\u0644\u0637\u0644\u0628":"\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628"}setStatus(e){this.currentStatus=e,this.loadRequests()}getStatusClass(e){return`status-banner ${{pending:"bg-yellow-50 text-yellow-700",inProgress:"bg-blue-50 text-blue-700",completed:"bg-green-50 text-green-700",cancelled:"bg-red-50 text-red-700",accepted:"bg-indigo-50 text-indigo-700",draft:"bg-gray-50 text-gray-700"}[e]}`}getStatusIcon(e){let o=this.requestService.getStatusDetails(e),i={pending:"text-yellow-500",inProgress:"text-blue-500",completed:"text-green-500",cancelled:"text-red-500",accepted:"text-indigo-500",draft:"text-gray-500"};return`fas fa-${o.icon} ${i[e]}`}getStatusLabel(e){return this.requestService.getStatusDetails(e).label}getActionButtonIcon(){return this.userType==="worker"?"fas fa-check":"fas fa-info-circle"}canNegotiate(e){return this.userType==="worker"&&e.status==="pending"}openNewRequest(){this.router.navigate(["/requests/new-request"])}openFilters(){}handleAction(e){this.userType==="worker"?e.status==="pending"?this.acceptRequest(e):this.openNegotiation(e):this.viewRequestDetails(e)}acceptRequest(e){e.status==="pending"&&this.requestService.updateRequestStatus(e.id||0,"accepted").pipe(S(this.destroy$)).subscribe({next:()=>{this.loadRequests()},error:o=>{console.error("Error accepting request:",o)}})}viewRequestDetails(e){this.router.navigate(["requests",e.id])}getTotalCount(){return this.proposals.length}getStatusCount(e){return this.proposals.filter(o=>o.status===e).length}calculateDistance(e,o){let d=this.deg2rad(o[0]-e[0]),y=this.deg2rad(o[1]-e[1]),x=Math.sin(d/2)*Math.sin(d/2)+Math.cos(this.deg2rad(e[0]))*Math.cos(this.deg2rad(o[0]))*Math.sin(y/2)*Math.sin(y/2),T=6371*(2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)));return T<1?`${Math.round(T*1e3)} \u0645`:`${T.toFixed(1)} \u0643\u0645`}deg2rad(e){return e*(Math.PI/180)}static{this.\u0275fac=function(o){return new(o||r)(C(B),C(N),C(U),C(R),C(H))}}static{this.\u0275cmp=q({type:r,selectors:[["app-requests-list"]],decls:14,vars:4,consts:[[1,"pb-20"],[1,"header"],[1,"header-content"],[1,"title"],[1,"flex","items-center","gap-3"],[1,"filter-btn",3,"click"],[1,"fas","fa-filter"],["class","new-request-btn",3,"click",4,"ngIf"],[1,"tabs-container"],[1,"tabs-scroll","no-scrollbar"],["class","tab-btn",3,"active","click",4,"ngFor","ngForOf"],[1,"cards-container"],["class","request-card",4,"ngFor","ngForOf"],[1,"new-request-btn",3,"click"],[1,"fas","fa-plus"],[1,"tab-btn",3,"click"],[1,"counter"],[1,"request-card"],[1,"card-content"],[1,"card-header"],[1,"request-title"],[1,"info-text"],[1,"fas","fa-map-marker-alt"],[4,"ngIf"],["class","flex flex-col items-end",4,"ngIf"],[1,"fas","fa-clock"],[1,"description-text"],[1,"flex","justify-between","items-center"],[1,"price-text"],["class","track-location-btn",4,"ngIf"],[1,"actions-container"],[1,"primary-btn",3,"click"],["class","secondary-btn",3,"click",4,"ngIf"],[1,"flex","flex-col","items-end"],[1,"rating-badge"],[1,"fas","fa-star","text-yellow-500"],[1,"text-sm","text-gray-500","mt-1"],[1,"track-location-btn"],[1,"fas","fa-location-arrow","animate-pulse"],[1,"secondary-btn",3,"click"],[1,"fas","fa-comments"]],template:function(o,i){o&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),s(4),n(),t(5,"div",4)(6,"button",5),b("click",function(){return i.openFilters()}),l(7,"i",6),n(),p(8,ge,4,0,"button",7),n()()(),t(9,"div",8)(10,"div",9),p(11,fe,6,6,"button",10),n()(),t(12,"div",11),p(13,ve,33,19,"div",12),n()()),o&2&&(a(4),f(i.pageTitle),a(4),c("ngIf",i.userType==="customer"),a(3),c("ngForOf",i.orderStatuses),a(2),c("ngForOf",i.proposals))},dependencies:[E,I],styles:["[_nghost-%COMP%]{display:block;width:100%;min-height:100vh;background-color:#f8f9fa}.header[_ngcontent-%COMP%]{background:linear-gradient(180deg,#ef4444 0% 100%);padding:1rem;position:sticky;top:0;z-index:50}.header-content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.header-content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#fff;font-size:1.25rem;font-weight:600}.filter-btn[_ngcontent-%COMP%]{width:2.5rem;height:2.5rem;border-radius:9999px;background-color:#ffffff1a;color:#fff;display:flex;align-items:center;justify-content:center;transition:all .2s ease;border:none}.filter-btn[_ngcontent-%COMP%]:hover{background-color:#fff3;transform:translateY(-1px)}.filter-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.new-request-btn[_ngcontent-%COMP%]{background-color:#fff;color:#ef4444;padding:.5rem 1rem;border-radius:9999px;font-size:.875rem;font-weight:500;display:flex;align-items:center;gap:.5rem;transition:all .2s ease;box-shadow:0 1px 2px #0000000d;border:none}.new-request-btn[_ngcontent-%COMP%]:hover{background-color:#fef2f2;transform:translateY(-1px);box-shadow:0 4px 6px #0000000d}.new-request-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.tabs-container[_ngcontent-%COMP%]{background-color:#fff;border-bottom:1px solid #e5e7eb;position:sticky;top:4rem;z-index:40}.tabs-scroll[_ngcontent-%COMP%]{display:flex;overflow-x:auto;gap:1rem;padding:.5rem 1rem}.tab-btn[_ngcontent-%COMP%]{padding:.75rem 1.25rem;display:flex;align-items:center;gap:.5rem;border-bottom:2px solid transparent;transition:all .2s ease;white-space:nowrap;font-size:.875rem;font-weight:500;color:#6b7280;background:none;border:none}.tab-btn.active[_ngcontent-%COMP%]{color:#ef4444;border-bottom-color:#ef4444}.tab-btn[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{background-color:#f3f4f6;color:#6b7280;padding:.125rem .5rem;border-radius:9999px;font-size:.75rem}.cards-container[_ngcontent-%COMP%]{padding:1rem;display:flex;flex-direction:column;gap:1rem}.request-card[_ngcontent-%COMP%]{background-color:#fff;border-radius:1rem;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 1px 3px #0000001a}.status-banner[_ngcontent-%COMP%]{padding:.5rem 1rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;justify-content:flex-end;gap:.5rem}.status-banner.pending[_ngcontent-%COMP%]{background-color:#fef3c7;color:#92400e}.status-banner.in-progress[_ngcontent-%COMP%]{background-color:#dbeafe;color:#1e40af}.status-banner.completed[_ngcontent-%COMP%]{background-color:#d1fae5;color:#065f46}.card-content[_ngcontent-%COMP%]{padding:1rem}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}.request-title[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;color:#111827;margin-bottom:.25rem}.rating-badge[_ngcontent-%COMP%]{background-color:#fef3c7;color:#92400e;padding:.25rem .75rem;border-radius:9999px;font-size:.875rem;display:flex;align-items:center;gap:.25rem}.actions-container[_ngcontent-%COMP%]{border-top:1px solid #e5e7eb;padding:1rem;display:flex;gap:.75rem;background-color:#f9fafb}.primary-btn[_ngcontent-%COMP%]{flex:1;background-color:#ef4444;color:#fff;padding:.75rem 1rem;border-radius:.75rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .2s ease;border:none;box-shadow:0 1px 2px #0000000d}.primary-btn[_ngcontent-%COMP%]:hover{background-color:#dc2626;transform:translateY(-1px);box-shadow:0 4px 6px #0000000d}.primary-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.secondary-btn[_ngcontent-%COMP%]{flex:1;background-color:transparent;border:1px solid #ef4444;color:#ef4444;padding:.75rem 1rem;border-radius:.75rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .2s ease}.secondary-btn[_ngcontent-%COMP%]:hover{background-color:#fef2f2;transform:translateY(-1px)}.secondary-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.track-location-btn[_ngcontent-%COMP%]{color:#ef4444;font-size:.875rem;display:flex;align-items:center;gap:.5rem;padding:.5rem;transition:all .2s ease;background:none;border:none}.track-location-btn[_ngcontent-%COMP%]:hover{color:#dc2626}.track-location-btn[_ngcontent-%COMP%]   .animate-pulse[_ngcontent-%COMP%]{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.info-text[_ngcontent-%COMP%]{color:#6b7280;font-size:.875rem;display:flex;align-items:center;gap:.5rem}.price-text[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;color:#ef4444}.description-text[_ngcontent-%COMP%]{color:#6b7280;font-size:.875rem;margin:1rem 0}"]})}}return r})();function ye(r,u){if(r&1&&(t(0,"option",23),s(1),n()),r&2){let e=u.$implicit;c("value",e.id),a(),M(" ",e.name," ")}}function Se(r,u){if(r&1&&(t(0,"option",23),s(1),n()),r&2){let e=u.$implicit;c("value",e.id),a(),M(" ",e.name," ")}}function Me(r,u){if(r&1&&(t(0,"div",16)(1,"label",17),s(2,"\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629"),n(),t(3,"select",18)(4,"option",19),s(5,"\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629"),n(),p(6,ye,2,2,"option",20),n(),t(7,"label",21),s(8,"\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),n(),t(9,"select",22)(10,"option",19),s(11,"\u0627\u062E\u062A\u0631 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),n(),p(12,Se,2,2,"option",20),n()()),r&2){let e=m();a(6),c("ngForOf",e.categories),a(6),c("ngForOf",e.selectedCategory==null?null:e.selectedCategory.services)}}function Oe(r,u){if(r&1){let e=v();t(0,"div",33),l(1,"img",34),Y(2,"urlSanitizer"),t(3,"button",35),b("click",function(){let i=_(e).index,d=m(3);return h(d.removeImage(i))}),l(4,"i",36),n()()}if(r&2){let e=u.$implicit;a(),c("src",G(2,1,e),D)}}function we(r,u){if(r&1&&(t(0,"div",31),p(1,Oe,5,3,"div",32),n()),r&2){let e=m(2);a(),c("ngForOf",e.selectedImages)}}function Pe(r,u){if(r&1){let e=v();t(0,"div",24)(1,"div",16)(2,"label",17),s(3,"\u0648\u0635\u0641 \u0627\u0644\u0645\u0634\u0643\u0644\u0629"),n(),t(4,"textarea",25),s(5,"            "),n()(),t(6,"div",16)(7,"label",17),s(8,"\u0625\u0636\u0627\u0641\u0629 \u0635\u0648\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"),n(),t(9,"div",26)(10,"input",27,0),b("change",function(i){_(e);let d=m();return h(d.onImageSelected(i))}),n(),t(12,"button",28),b("click",function(){_(e);let i=L(11);return h(i.click())}),l(13,"i",29),t(14,"span"),s(15,"\u0627\u062E\u062A\u0631 \u0635\u0648\u0631"),n()()(),p(16,we,2,1,"div",30),n()()}if(r&2){let e=m();a(16),c("ngIf",e.selectedImages.length)}}function ke(r,u){if(r&1&&(t(0,"div",24)(1,"div",16)(2,"label",17),s(3,"\u0627\u0644\u0645\u0648\u0642\u0639"),n(),t(4,"div",37),l(5,"input",38),t(6,"button",39),l(7,"i",40),n()()(),t(8,"div",16)(9,"label",17),s(10,"\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),n(),l(11,"input",41),n(),t(12,"div",16)(13,"label",17),s(14,"\u0627\u0644\u0648\u0642\u062A"),n(),l(15,"input",42),n()()),r&2){let e=m();a(11),c("min",e.today)}}function qe(r,u){r&1&&($(0,53),t(1,"div",16)(2,"label",17),s(3,"\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),n(),l(4,"input",54),n(),t(5,"div",55)(6,"div",16)(7,"label",17),s(8,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"),n(),l(9,"input",56),n(),t(10,"div",16)(11,"label",17),s(12,"CVV"),n(),l(13,"input",57),n()(),t(14,"div",16)(15,"label",17),s(16,"\u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"),n(),l(17,"input",58),n(),j())}function Ee(r,u){if(r&1&&(t(0,"div",24)(1,"div",43)(2,"span"),s(3,"\u0627\u0644\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629:"),n(),t(4,"span",44),s(5),n()(),t(6,"div",45)(7,"label",46),l(8,"input",47),t(9,"span",48),l(10,"i",49),t(11,"span"),s(12,"\u0627\u0644\u062F\u0641\u0639 \u0646\u0642\u062F\u0627\u064B"),n()()(),t(13,"label",46),l(14,"input",50),t(15,"span",48),l(16,"i",51),t(17,"span"),s(18,"\u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062A\u0645\u0627\u0646"),n()()()(),p(19,qe,18,0,"ng-container",52),n()),r&2){let e,o=m();a(5),M("",o.estimatedCost," \u062C\u0646\u064A\u0647"),a(14),c("ngIf",((e=o.form.get("paymentMethod"))==null?null:e.value)==="card")}}function Ie(r,u){if(r&1){let e=v();t(0,"button",59),b("click",function(){_(e);let i=m();return h(i.previousStep())}),s(1," \u0627\u0644\u0633\u0627\u0628\u0642 "),n()}}function Re(r,u){if(r&1){let e=v();t(0,"button",60),b("click",function(){_(e);let i=m();return h(i.nextStep())}),s(1," \u0627\u0644\u062A\u0627\u0644\u064A "),n()}if(r&2){let e=m();c("disabled",!e.isStepValid())}}function Ne(r,u){if(r&1&&(t(0,"button",61),s(1),n()),r&2){let e=m();c("disabled",!e.form.valid||e.loading),a(),M(" ",e.loading?"\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...":"\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628"," ")}}var We=(()=>{class r{get selectedCategory(){let e=this.form.get("category")?.value;return this.categories.find(o=>o.id===e)}get cardDetailsGroup(){return this.form.get("cardDetails")}constructor(e,o,i){this.fb=e,this.router=o,this.requestService=i,this.destroy$=new k,this.currentStep=1,this.loading=!1,this.steps=[],this.categories=this.requestService.categories,this.selectedImages=[],this.estimatedCost=0,this.today=new Date().toISOString().split("T")[0],this.initForm(),this.steps=this.requestService.steps}ngOnInit(){this.watchFormChanges()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initForm(){this.form=this.fb.group({category:["",g.required],service:["",g.required],description:["",[g.required,g.minLength(20)]],images:[[]],location:["",g.required],scheduledDate:["",g.required],scheduledTime:["",g.required],paymentMethod:["cash",g.required],cardDetails:this.fb.group({cardNumber:[""],expiryDate:[""],cvv:[""],nameOnCard:[""]})})}setCardValidators(){let e={cardNumber:[g.required,g.pattern(/^\d{16}$/)],expiryDate:[g.required,g.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],cvv:[g.required,g.pattern(/^\d{3}$/)],nameOnCard:[g.required]};Object.keys(e).forEach(o=>{let i=this.cardDetailsGroup.get(o);i&&(i.setValidators(e[o]),i.updateValueAndValidity())})}clearCardValidators(){Object.keys(this.cardDetailsGroup.controls).forEach(e=>{let o=this.cardDetailsGroup.get(e);o&&(o.clearValidators(),o.updateValueAndValidity())})}watchFormChanges(){this.form.get("category")?.valueChanges.pipe(S(this.destroy$)).subscribe(e=>{this.form.patchValue({service:""}),e&&this.form.get("service")?.value&&this.updateEstimatedCost()}),this.form.get("service")?.valueChanges.pipe(S(this.destroy$)).subscribe(e=>{e&&this.form.get("category")?.value&&this.updateEstimatedCost()})}updateEstimatedCost(){let e=this.form.get("category")?.value,o=this.form.get("service")?.value;e&&o&&(this.estimatedCost=this.requestService.calculateEstimatedCost(e,o))}isStepValid(){return this.requestService.validateStep(this.currentStep,this.form.value)}nextStep(){this.currentStep<this.steps.length&&this.isStepValid()&&(this.steps[this.currentStep-1].completed=!0,this.currentStep++,this.requestService.updateCurrentRequest(this.form.value))}previousStep(){this.currentStep>1&&this.currentStep--}onImageSelected(e){let o=e.target;if(o.files){let i=Array.from(o.files);this.selectedImages=[...this.selectedImages,...i].slice(0,5),this.form.patchValue({images:this.selectedImages})}}removeImage(e){this.selectedImages.splice(e,1),this.form.patchValue({images:this.selectedImages})}onSubmit(){if(this.form.valid&&!this.loading){this.loading=!0;let e=P(w({},this.form.value),{status:"pending",createdAt:new Date().toISOString(),customerId:1});this.requestService.createRequest(e).pipe(S(this.destroy$)).subscribe({next:()=>{this.router.navigate(["/requests"])},error:o=>{console.error("Error submitting request:",o),this.loading=!1}})}}static{this.\u0275fac=function(o){return new(o||r)(C(ce),C(R),C(N))}}static{this.\u0275cmp=q({type:r,selectors:[["app-new-request"]],decls:20,vars:13,consts:[["fileInput",""],[1,"register-container"],[1,"header"],["text","\u0631\u062C\u0648\u0639",3,"redirectUrl"],[1,"main-content"],[1,"title-section"],[1,"icon-circle"],[1,"title"],[1,"subtitle"],[1,"form-container",3,"ngSubmit","formGroup"],["class","form-group",4,"ngIf"],["class","form-groups",4,"ngIf"],[1,"buttons-container"],["type","button","class","back-button",3,"click",4,"ngIf"],["type","button","class","next-button",3,"disabled","click",4,"ngIf"],["type","submit","class","submit-button",3,"disabled",4,"ngIf"],[1,"form-group"],[1,"form-label"],["formControlName","category",1,"input-field"],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],[1,"form-label","mt-4"],["formControlName","service",1,"input-field"],[3,"value"],[1,"form-groups"],["formControlName","description","rows","4","placeholder","\u0627\u0634\u0631\u062D \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644...",1,"input-field"],[1,"image-upload-container"],["type","file","multiple","","accept","image/*",1,"hidden",3,"change"],["type","button",1,"upload-button",3,"click"],[1,"fas","fa-camera"],["class","images-preview",4,"ngIf"],[1,"images-preview"],["class","image-item",4,"ngFor","ngForOf"],[1,"image-item"],["alt","Preview",3,"src"],["type","button",1,"remove-image",3,"click"],[1,"fas","fa-times"],[1,"input-container"],["type","text","formControlName","location","placeholder","\u062D\u062F\u062F \u0645\u0648\u0642\u0639 \u0627\u0644\u062E\u062F\u0645\u0629",1,"input-field"],["type","button",1,"location-button"],[1,"fas","fa-map-marker-alt"],["type","date","formControlName","scheduledDate",1,"input-field",3,"min"],["type","time","formControlName","scheduledTime",1,"input-field"],[1,"estimated-cost"],[1,"cost"],[1,"payment-methods"],[1,"payment-method"],["type","radio","formControlName","paymentMethod","value","cash"],[1,"method-content"],[1,"fas","fa-money-bill-wave"],["type","radio","formControlName","paymentMethod","value","card"],[1,"fas","fa-credit-card"],["formGroupName","cardDetails",4,"ngIf"],["formGroupName","cardDetails"],["type","text","formControlName","cardNumber","placeholder","XXXX XXXX XXXX XXXX",1,"input-field"],[1,"form-row"],["type","text","formControlName","expiryDate","placeholder","MM/YY",1,"input-field"],["type","text","formControlName","cvv","placeholder","XXX",1,"input-field"],["type","text","formControlName","nameOnCard","placeholder","\u0627\u0644\u0627\u0633\u0645 \u0643\u0645\u0627 \u064A\u0638\u0647\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",1,"input-field"],["type","button",1,"back-button",3,"click"],["type","button",1,"next-button",3,"click","disabled"],["type","submit",1,"submit-button",3,"disabled"]],template:function(o,i){o&1&&(t(0,"div",1)(1,"header",2),l(2,"app-back-button",3),n(),t(3,"main",4)(4,"div",5)(5,"div",6),l(6,"i"),n(),t(7,"h1",7),s(8),n(),t(9,"p",8),s(10),n()(),t(11,"form",9),b("ngSubmit",function(){return i.onSubmit()}),p(12,Me,13,2,"div",10)(13,Pe,17,1,"div",11)(14,ke,16,1,"div",11)(15,Ee,20,2,"div",11),t(16,"div",12),p(17,Ie,2,0,"button",13)(18,Re,2,1,"button",14)(19,Ne,2,2,"button",15),n()()()()),o&2&&(a(2),c("redirectUrl","/requests"),a(4),O("fas fa-"+i.steps[i.currentStep-1].icon),a(2),f(i.steps[i.currentStep-1].title),a(2),f(i.steps[i.currentStep-1].subtitle),a(),c("formGroup",i.form),a(),c("ngIf",i.currentStep===1),a(),c("ngIf",i.currentStep===2),a(),c("ngIf",i.currentStep===3),a(),c("ngIf",i.currentStep===4),a(2),c("ngIf",i.currentStep>1),a(),c("ngIf",i.currentStep<i.steps.length),a(),c("ngIf",i.currentStep===i.steps.length))},dependencies:[E,I,J,ee,ae,se,K,re,te,Q,Z,ne,oe,ie,W],styles:[".register-container[_ngcontent-%COMP%]{min-height:100vh;background-color:#fff;display:flex;flex-direction:column}.header[_ngcontent-%COMP%]{padding:1.25rem 1rem;background-color:#fff;border-bottom:1px solid rgba(229,231,235,.5)}.main-content[_ngcontent-%COMP%]{flex:1;padding:2rem 1rem;display:flex;flex-direction:column}.title-section[_ngcontent-%COMP%]{text-align:center;margin-bottom:3rem}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]{width:64px;height:64px;background-color:#ef44441a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.75rem;color:#ef4444}.title-section[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#ef4444;margin-bottom:.75rem}.title-section[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:1rem;color:#6b7280}.form-container[_ngcontent-%COMP%]{max-width:24rem;margin:0 auto;width:100%;display:flex;flex-direction:column;padding:0}.form-group[_ngcontent-%COMP%]{margin-bottom:1.5rem;width:100%}.form-groups[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.form-label[_ngcontent-%COMP%]{display:block;font-size:1rem;font-weight:500;color:#111827;margin-bottom:.75rem;text-align:right}.input-field[_ngcontent-%COMP%]{width:100%;height:3.75rem;border:2px solid #e5e7eb;border-radius:.75rem;font-size:1rem;color:#111827;background-color:#fff;transition:all .2s ease-in-out;text-align:right;padding:0 1rem;box-sizing:border-box}.input-field[_ngcontent-%COMP%]:focus{outline:none;border-color:#ef4444;box-shadow:0 0 0 2px #ef44441a}.input-field[_ngcontent-%COMP%]::placeholder{color:#9ca3af;opacity:1;text-align:right}.input-field[_ngcontent-%COMP%]:disabled{background-color:#f3f4f6;cursor:not-allowed}textarea.input-field[_ngcontent-%COMP%]{height:auto;resize:vertical;padding:1rem}.input-container[_ngcontent-%COMP%]{position:relative;width:100%;max-width:100%;display:flex;align-items:center}.location-button[_ngcontent-%COMP%]{position:absolute;left:0;top:50%;transform:translateY(-50%);width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;color:#6b7280;background:none;border:none;cursor:pointer;transition:color .2s ease}.location-button[_ngcontent-%COMP%]:hover{color:#374151}.location-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem}.image-upload-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:1.5rem}.upload-button[_ngcontent-%COMP%]{background-color:#ef4444;color:#fff;border:none;border-radius:.75rem;font-size:.95rem;font-weight:500;padding:.75rem 1.5rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;transition:all .2s ease-in-out}.upload-button[_ngcontent-%COMP%]:hover{background-color:#dc2626}.upload-button[_ngcontent-%COMP%]:active{transform:translateY(1px)}.images-preview[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center}.image-item[_ngcontent-%COMP%]{position:relative}.image-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:100px;object-fit:cover;border-radius:.5rem}.image-item[_ngcontent-%COMP%]   .remove-image[_ngcontent-%COMP%]{position:absolute;top:-.5rem;right:-.5rem;background-color:#fff;color:#ef4444;border:1px solid #ef4444;border-radius:50%;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.image-item[_ngcontent-%COMP%]   .remove-image[_ngcontent-%COMP%]:hover{background-color:#ef4444;color:#fff}.estimated-cost[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;background-color:#f3f4f6;padding:1rem;border-radius:.75rem;margin-bottom:1.5rem;font-weight:500}.estimated-cost[_ngcontent-%COMP%]   .cost[_ngcontent-%COMP%]{color:#ef4444;font-size:1.25rem;font-weight:700}.payment-methods[_ngcontent-%COMP%]{display:flex;gap:1rem;margin-bottom:1.5rem}.payment-method[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;cursor:pointer}.payment-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]{display:none}.payment-method[_ngcontent-%COMP%]   .method-content[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;gap:.5rem;border:2px solid #e5e7eb;border-radius:.75rem;padding:1rem;transition:all .2s ease-in-out}.payment-method[_ngcontent-%COMP%]   .method-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem;color:#6b7280}.payment-method[_ngcontent-%COMP%]   .method-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.payment-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:checked + .method-content[_ngcontent-%COMP%]{border-color:#ef4444;background-color:#ef44441a}.payment-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:checked + .method-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#ef4444}.form-row[_ngcontent-%COMP%]{display:flex;gap:1rem}.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{flex:1}.buttons-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-top:1.5rem}.back-button[_ngcontent-%COMP%], .next-button[_ngcontent-%COMP%], .submit-button[_ngcontent-%COMP%]{width:120px;height:44px;border-radius:.75rem;font-size:.95rem;font-weight:500;transition:all .2s ease-in-out;cursor:pointer}.back-button[_ngcontent-%COMP%]{background-color:#f3f4f6;color:#374151;border:none}.back-button[_ngcontent-%COMP%]:hover{background-color:#e5e7eb}.next-button[_ngcontent-%COMP%], .submit-button[_ngcontent-%COMP%]{background-color:#ef4444;color:#fff;border:none}.next-button[_ngcontent-%COMP%]:disabled, .submit-button[_ngcontent-%COMP%]:disabled{background-color:#fed7d7;cursor:not-allowed}.next-button[_ngcontent-%COMP%]:not(:disabled):hover, .submit-button[_ngcontent-%COMP%]:not(:disabled):hover{background-color:#dc2626}@media (max-width: 400px){.main-content[_ngcontent-%COMP%]{padding:1.5rem 1rem}.title-section[_ngcontent-%COMP%]{margin-bottom:2rem}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]{width:56px;height:56px}.title-section[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}.title-section[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.25rem}.title-section[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:.875rem}}"]})}}return r})();export{$e as a,We as b};
