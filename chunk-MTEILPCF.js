import{a as U,b as W}from"./chunk-PCNM6O25.js";import{a as V}from"./chunk-WODIECBD.js";import{c as Y,g as $,i as N}from"./chunk-2GP3RJEL.js";import"./chunk-VSLMR3JL.js";import{h as D,j,m as L}from"./chunk-2PEKHVDX.js";import{Ab as C,Bc as B,Cb as p,Db as g,G as S,Jb as o,Kb as c,Lb as u,Mb as z,Ua as P,W as k,X as M,Za as a,_a as f,ba as E,l as w,la as I,ma as A,n as q,ob as _,p as y,qb as d,sb as O,t as x,tb as R,ua as b,va as h,vb as n,wb as i,xb as l,xc as T,yc as F}from"./chunk-DL6C3EJT.js";function H(s,v){if(s&1){let t=C();n(0,"img",57),p("load",function(){let e=b(t).$implicit,m=g();return h(m.onImageLoad(e))}),i()}if(s&2){let t=v.$implicit,r=g();O("loading",r.imageLoadingStates[t])("loaded",!r.imageLoadingStates[t]),d("src",t,P)("alt",r.request==null?null:r.request.service)}}function K(s,v){if(s&1){let t=C();n(0,"button",58),p("click",function(){b(t);let e=g();return h(e.toggleTracking())}),l(1,"i",59),n(2,"span"),o(3,"\u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0648\u0642\u0639"),i()()}if(s&2){let t=g();O("active",t.isTrackingActive)}}function Q(s,v){if(s&1){let t=C();n(0,"button",60),p("click",function(){b(t);let e=g();return h(e.handleAction("cancel"))}),o(1," \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628 "),i()}}var J=(()=>{class s{constructor(t,r,e,m){this.route=t,this.router=r,this.requestService=e,this.workerService=m,this.destroy$=new w,this.request=null,this.worker=null,this.costBreakdown=null,this.isLoading=!0,this.error=null,this.isTrackingActive=!1,this.imageLoadingStates={},this.expandedImage=null}ngOnInit(){this.loadRequestData()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadRequestData(){this.route.params.pipe(x(t=>Number(t.id)),k(t=>this.requestService.getRequest(t).pipe(k(r=>r.workerId?this.workerService.getWorkerById(r.workerId).pipe(x(e=>({request:r,worker:e}))):y({request:r,worker:null})))),M(this.destroy$),S(t=>(this.handleError("Failed to load request details"),q))).subscribe({next:({request:t,worker:r})=>{this.request=t,this.worker=r,this.calculateCosts(),this.initializeImageStates(),this.isLoading=!1},error:t=>{this.handleError("An error occurred while loading the request details"),this.isLoading=!1}})}calculateCosts(){if(this.request?.estimatedCost){let t=this.request.estimatedCost,r=this.requestService.calculateVAT(t),e=this.requestService.getServiceFee(),m=this.requestService.getDiscount();this.costBreakdown={basePrice:t,vat:r,serviceFee:e,discount:m,total:this.requestService.calculateTotalCost(t,r,e,m)}}}initializeImageStates(){this.request?.images&&this.request.images.forEach(t=>{this.imageLoadingStates[t]=!0})}handleAction(t){try{switch(t){case"call":this.worker?.name&&console.log("Calling worker:",this.worker.name);break;case"chat":this.request?.id&&this.router.navigate(["/chat"],{queryParams:{requestId:this.request.id}});break;case"support":console.log("Contacting support...");break;case"cancel":confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628\u061F")&&this.cancelRequest();break}}catch{this.handleError("Failed to perform action")}}cancelRequest(){this.request?.id&&this.requestService.updateRequestStatus(this.request.id,"cancelled").pipe(M(this.destroy$)).subscribe({next:()=>{this.request.status="cancelled"},error:()=>{this.handleError("Failed to cancel request")}})}getStatusLabel(t){return t?this.requestService.getStatusDetails(t).label:"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631"}getStatusClass(t){return t?`status-${this.requestService.getStatusDetails(t).color}`:"status-pending"}getPaymentMethodLabel(t){return t&&this.requestService.paymentMethods.find(e=>e.id===t)?.name||"\u0646\u0642\u062F\u064A"}toggleTracking(){this.isTrackingActive=!this.isTrackingActive,console.log("Tracking toggled:",this.isTrackingActive)}onImageLoad(t){this.imageLoadingStates[t]=!1}handleImageError(t){this.imageLoadingStates[t]=!1,this.request?.images&&(this.request.images=this.request.images.map(r=>r===t?"/assets/images/placeholder.jpg":r))}expandImage(t){this.expandedImage=t}closeExpandedImage(){this.expandedImage=null}goBack(){this.router.navigate(["/requests"])}handleError(t){this.error=t,console.error(t)}trackByFn(t){return t}get showTrackingButton(){return this.request?.status==="inProgress"}get canCancel(){return this.request?.status==="pending"||this.request?.status==="accepted"}get isRequestActive(){return this.request?.status==="pending"||this.request?.status==="accepted"||this.request?.status==="inProgress"}static{this.\u0275fac=function(r){return new(r||s)(f(D),f(j),f($),f(V))}}static{this.\u0275cmp=I({type:s,selectors:[["app-request-details"]],decls:121,vars:30,consts:[[1,"min-h-screen","bg-gray-50","pb-24"],[1,"header"],[1,"header-content"],["text","\u0631\u062C\u0648\u0639",3,"redirectUrl"],[1,"title"],[1,"content-wrapper"],[1,"custom-card"],[1,"status-banner"],[1,"card-content"],[1,"flex","justify-between","items-start","mb-4"],[1,"service-title"],[1,"info-text"],[1,"fas","fa-map-marker-alt"],[1,"info-text","mt-2"],[1,"fas","fa-clock"],[1,"text-left"],[1,"rating-badge"],[1,"fas","fa-star"],[1,"completed-jobs"],[1,"description"],[1,"photos-grid"],["class","photo-item",3,"src","alt","loading","loaded","load",4,"ngFor","ngForOf","ngForTrackBy"],[1,"flex","justify-between","items-center","mt-4"],[1,"price-text"],["class","location-btn",3,"active","click",4,"ngIf"],[1,"custom-card","mt-4"],[1,"section-title"],[1,"provider-header"],[1,"provider-image",3,"src","alt"],[1,"flex-1"],[1,"provider-name"],[1,"provider-bio"],[1,"stats-grid"],[1,"stat-item"],[1,"fas","fa-star","text-yellow-400"],[1,"stat-value"],[1,"stat-label"],[1,"fas","fa-award","text-blue-400"],[1,"fas","fa-comment","text-green-400"],[1,"contact-buttons"],[1,"contact-btn",3,"click"],[1,"fas","fa-phone"],[1,"fas","fa-comment"],[1,"cost-summary"],[1,"cost-item"],[1,"cost-item","discount"],[1,"total-section"],[1,"total-label"],[1,"total-subtitle"],[1,"total-amount"],[1,"payment-method"],[1,"payment-type"],[1,"fas","fa-money-bill"],[1,"bottom-actions"],[1,"action-btn","primary",3,"click"],[1,"fas","fa-headset"],["class","action-btn secondary",3,"click",4,"ngIf"],[1,"photo-item",3,"load","src","alt"],[1,"location-btn",3,"click"],[1,"fas","fa-location-arrow"],[1,"action-btn","secondary",3,"click"]],template:function(r,e){r&1&&(n(0,"div",0)(1,"header",1)(2,"div",2),l(3,"app-back-button",3),n(4,"h1",4),o(5),i()()(),n(6,"div",5)(7,"div",6)(8,"div",7),o(9),i(),n(10,"div",8)(11,"div",9)(12,"div")(13,"h3",10),o(14),i(),n(15,"div",11),l(16,"i",12),o(17),i(),n(18,"div",13),l(19,"i",14),o(20),i()(),n(21,"div",15)(22,"div",16),l(23,"i",17),n(24,"span"),o(25),i()(),n(26,"div",18),o(27),i()()(),n(28,"p",19),o(29),i(),n(30,"div",20),_(31,H,1,6,"img",21),i(),n(32,"div",22)(33,"div",23),o(34),i(),_(35,K,4,2,"button",24),i()()(),n(36,"div",25)(37,"div",8)(38,"h3",26),o(39,"\u0645\u0642\u062F\u0645 \u0627\u0644\u062E\u062F\u0645\u0629"),i(),n(40,"div",27),l(41,"img",28),n(42,"div",29)(43,"h4",30),o(44),i(),n(45,"p",31),o(46),i()()(),n(47,"div",32)(48,"div",33),l(49,"i",34),n(50,"div",35),o(51),i(),n(52,"div",36),o(53,"\u0627\u0644\u062A\u0642\u064A\u064A\u0645"),i()(),n(54,"div",33),l(55,"i",37),n(56,"div",35),o(57),i(),n(58,"div",36),o(59,"\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0643\u0645\u0627\u0644"),i()(),n(60,"div",33),l(61,"i",38),n(62,"div",35),o(63),i(),n(64,"div",36),o(65,"\u0646\u0633\u0628\u0629 \u0627\u0644\u0631\u062F"),i()()(),n(66,"div",39)(67,"button",40),p("click",function(){return e.handleAction("call")}),l(68,"i",41),n(69,"span"),o(70,"\u0627\u062A\u0635\u0627\u0644"),i()(),n(71,"button",40),p("click",function(){return e.handleAction("chat")}),l(72,"i",42),n(73,"span"),o(74,"\u0645\u062D\u0627\u062F\u062B\u0629"),i()()()()(),n(75,"div",25)(76,"div",8)(77,"h3",26),o(78,"\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641"),i(),n(79,"div",43)(80,"div",44)(81,"span"),o(82,"\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u062E\u062F\u0645\u0629"),i(),n(83,"span"),o(84),i()(),n(85,"div",44)(86,"span"),o(87,"\u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 (14%)"),i(),n(88,"span"),o(89),i()(),n(90,"div",44)(91,"span"),o(92,"\u0631\u0633\u0648\u0645 \u0627\u0644\u062E\u062F\u0645\u0629"),i(),n(93,"span"),o(94),i()(),n(95,"div",45)(96,"span"),o(97,"\u062E\u0635\u0645"),i(),n(98,"span"),o(99),i()()(),n(100,"div",46)(101,"div")(102,"h4",47),o(103,"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A"),i(),n(104,"p",48),o(105,"\u0634\u0627\u0645\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u0629"),i()(),n(106,"span",49),o(107),i()(),n(108,"div",50)(109,"span"),o(110,"\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639"),i(),n(111,"div",51),l(112,"i",52),n(113,"span"),o(114),i()()()()()(),n(115,"div",53)(116,"button",54),p("click",function(){return e.handleAction("support")}),l(117,"i",55),n(118,"span"),o(119,"\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062F\u0639\u0645"),i()(),_(120,Q,2,0,"button",56),i()()),r&2&&(a(3),d("redirectUrl","/requests"),a(2),u("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628 #",e.request==null?null:e.request.id,""),a(3),R(e.getStatusClass(e.request==null?null:e.request.status)),a(),u(" ",e.getStatusLabel(e.request==null?null:e.request.status)," "),a(5),c(e.request==null?null:e.request.service),a(3),u(" ",e.request==null||e.request.location==null?null:e.request.location.address," "),a(3),z(" ",e.request==null?null:e.request.scheduledTime," \u2022 ",e.request==null?null:e.request.scheduledDate," "),a(5),c(e.worker==null?null:e.worker.rating),a(2),u(" ",e.worker==null?null:e.worker.completedJobs," \u062E\u062F\u0645\u0629 \u0645\u0646\u0641\u0630\u0629 "),a(2),c(e.request==null?null:e.request.description),a(2),d("ngForOf",e.request==null?null:e.request.images)("ngForTrackBy",e.trackByFn),a(3),u("",e.request==null?null:e.request.estimatedCost," \u062C\u0646\u064A\u0647"),a(),d("ngIf",e.showTrackingButton),a(6),d("src",e.worker==null?null:e.worker.image,P)("alt",e.worker==null?null:e.worker.name),a(3),c(e.worker==null?null:e.worker.name),a(2),c(e.worker==null?null:e.worker.about),a(5),c(e.worker==null?null:e.worker.rating),a(6),c(e.worker==null?null:e.worker.completionRate),a(6),c(e.worker==null?null:e.worker.responseRate),a(21),u("",e.costBreakdown==null?null:e.costBreakdown.basePrice," \u062C\u0646\u064A\u0647"),a(5),u("",e.costBreakdown==null?null:e.costBreakdown.vat," \u062C\u0646\u064A\u0647"),a(5),u("",e.costBreakdown==null?null:e.costBreakdown.serviceFee," \u062C\u0646\u064A\u0647"),a(5),u("-",e.costBreakdown==null?null:e.costBreakdown.discount," \u062C\u0646\u064A\u0647"),a(8),u("",e.costBreakdown==null?null:e.costBreakdown.total," \u062C\u0646\u064A\u0647"),a(7),c(e.getPaymentMethodLabel(e.request==null?null:e.request.paymentMethod)),a(6),d("ngIf",e.canCancel))},dependencies:[T,F,Y],styles:['[_nghost-%COMP%]{display:block;min-height:100vh;background-color:#f8f9fa;padding-bottom:env(safe-area-inset-bottom)}.header[_ngcontent-%COMP%]{background:#ef4444;padding:2rem 1.5rem 6rem;position:relative;margin-bottom:-4rem}.header[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;left:0;right:0;height:2rem;background:linear-gradient(to bottom right,#ef4444 50%,transparent 50%)}.header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]{position:relative;max-width:640px;margin:0 auto;z-index:2}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#fff;font-size:1.5rem;font-weight:600;text-align:center;padding:0 3rem}.content-wrapper[_ngcontent-%COMP%]{padding:0 1rem;position:relative;z-index:1;max-width:640px;margin:0 auto;padding-bottom:180px}.custom-card[_ngcontent-%COMP%]{background:#fff;border-radius:1rem;overflow:hidden;border:none;box-shadow:0 1px 3px #0000000d,0 1px 2px #0000001a;transition:transform .2s ease,box-shadow .2s ease;margin-bottom:1rem}.custom-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]{padding:1.25rem}.custom-card[_ngcontent-%COMP%]:hover{box-shadow:0 4px 6px #0000000d,0 2px 4px #0000000d}.section-title[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;color:#1f2937;margin-bottom:1rem}.status-banner[_ngcontent-%COMP%]{padding:.75rem 1rem;font-size:.875rem;font-weight:500;text-align:center}.status-banner.status-pending[_ngcontent-%COMP%]{background-color:#fef3c7;color:#92400e}.status-banner.status-in-progress[_ngcontent-%COMP%]{background-color:#dbeafe;color:#1e40af}.status-banner.status-completed[_ngcontent-%COMP%]{background-color:#d1fae5;color:#065f46}.status-banner.status-cancelled[_ngcontent-%COMP%]{background-color:#fee2e2;color:#991b1b}.info-text[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;color:#6b7280;font-size:.875rem}.info-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#9ca3af}.rating-badge[_ngcontent-%COMP%]{background:#fef3c7;color:#92400e;padding:.25rem .75rem;border-radius:9999px;display:inline-flex;align-items:center;gap:.25rem;box-shadow:0 1px 2px #0000000d}.rating-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#f59e0b}.completed-jobs[_ngcontent-%COMP%]{font-size:.75rem;color:#6b7280;margin-top:.25rem;text-align:center}.photos-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin:1rem 0}.photo-item[_ngcontent-%COMP%]{width:100%;height:5rem;object-fit:cover;border-radius:.75rem;transition:all .3s ease;box-shadow:0 1px 2px #0000001a}.photo-item.loading[_ngcontent-%COMP%]{opacity:0;transform:scale(.95)}.photo-item.loaded[_ngcontent-%COMP%]{opacity:1;transform:scale(1)}.photo-item[_ngcontent-%COMP%]:hover{transform:scale(1.02);box-shadow:0 2px 4px #00000026}.provider-header[_ngcontent-%COMP%]{display:flex;gap:1rem;margin-bottom:1.5rem;align-items:center}.provider-image[_ngcontent-%COMP%]{width:4rem;height:4rem;border-radius:9999px;object-fit:cover;box-shadow:0 2px 4px #0000001a}.provider-name[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;color:#1f2937;margin-bottom:.25rem}.provider-bio[_ngcontent-%COMP%]{font-size:.875rem;color:#6b7280;line-height:1.4}.stats-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1.5rem}.stat-item[_ngcontent-%COMP%]{background:#f9fafb;padding:1rem .75rem;border-radius:.75rem;text-align:center;transition:all .2s ease;border:1px solid #e5e7eb}.stat-item[_ngcontent-%COMP%]:hover{background:#fff;box-shadow:0 2px 4px #0000001a;transform:translateY(-1px)}.stat-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem;margin-bottom:.5rem}.stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;color:#1f2937;margin-bottom:.25rem}.stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%]{font-size:.75rem;color:#6b7280}.contact-buttons[_ngcontent-%COMP%]{display:flex;gap:.75rem}.contact-btn[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex:1;gap:.5rem;height:2.75rem;background:#f8fafc;color:#4b5563;border-radius:.75rem;font-size:.875rem;transition:all .2s ease;border:1px solid #e5e7eb}.contact-btn[_ngcontent-%COMP%]:hover{background:#f1f5f9;transform:translateY(-1px);box-shadow:0 2px 4px #0000001a}.contact-btn[_ngcontent-%COMP%]:active{transform:translateY(1px)}.contact-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.125rem}.location-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;padding:.5rem 1rem;background:#fff;color:#ef4444;border:1px solid #ef4444;border-radius:.75rem;font-size:.875rem;transition:all .2s ease}.location-btn[_ngcontent-%COMP%]:hover{background:#ef44440d;transform:translateY(-1px)}.location-btn.active[_ngcontent-%COMP%]{background:#ef44441a;animation:_ngcontent-%COMP%_pulse 2s infinite}.location-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem}.price-text[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;color:#ef4444}.cost-summary[_ngcontent-%COMP%]   .cost-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:.75rem 0;color:#374151}.cost-summary[_ngcontent-%COMP%]   .cost-item.discount[_ngcontent-%COMP%]{color:#22c55e}.total-section[_ngcontent-%COMP%]{border-top:1px dashed #e5e7eb;margin-top:1.5rem;padding-top:1.5rem;display:flex;justify-content:space-between;align-items:flex-end}.total-section[_ngcontent-%COMP%]   .total-label[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;color:#1f2937}.total-section[_ngcontent-%COMP%]   .total-subtitle[_ngcontent-%COMP%]{font-size:.875rem;color:#6b7280;margin-top:.25rem}.total-section[_ngcontent-%COMP%]   .total-amount[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#ef4444}.payment-method[_ngcontent-%COMP%]{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;color:#6b7280}.payment-method[_ngcontent-%COMP%]   .payment-type[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;color:#1f2937;font-weight:500}.payment-method[_ngcontent-%COMP%]   .payment-type[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#9ca3af}.bottom-actions[_ngcontent-%COMP%]{position:fixed;bottom:80px;left:0;right:0;z-index:40;background:#fff;padding:1rem;display:flex;flex-direction:column;gap:.75rem;border-top:1px solid #e5e7eb;box-shadow:0 -1px 2px #0000000d}.bottom-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]{width:100%;padding:.875rem;border-radius:.75rem;font-weight:500;display:flex;align-items:center;justify-content:center;gap:.75rem;transition:all .2s ease}.bottom-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem}.bottom-actions[_ngcontent-%COMP%]   .action-btn.primary[_ngcontent-%COMP%]{background:#ef4444;color:#fff;border:none;box-shadow:0 2px 4px #ef444433}.bottom-actions[_ngcontent-%COMP%]   .action-btn.primary[_ngcontent-%COMP%]:hover{background:#eb1515;transform:translateY(-1px);box-shadow:0 4px 6px #ef444440}.bottom-actions[_ngcontent-%COMP%]   .action-btn.primary[_ngcontent-%COMP%]:active{transform:translateY(1px)}.bottom-actions[_ngcontent-%COMP%]   .action-btn.secondary[_ngcontent-%COMP%]{background:#fff;color:#ef4444;border:2px solid #ef4444}.bottom-actions[_ngcontent-%COMP%]   .action-btn.secondary[_ngcontent-%COMP%]:hover{background:#ef44440d;transform:translateY(-1px)}.bottom-actions[_ngcontent-%COMP%]   .action-btn.secondary[_ngcontent-%COMP%]:active{transform:translateY(1px)}@keyframes _ngcontent-%COMP%_pulse{0%{transform:scale(1);opacity:1}50%{transform:scale(1.05);opacity:.7}to{transform:scale(1);opacity:1}}@media (max-width: 640px){.header[_ngcontent-%COMP%]{padding:1.5rem 1rem 5rem}.content-wrapper[_ngcontent-%COMP%]{padding:0 1rem}.photos-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(3,1fr)}.stats-grid[_ngcontent-%COMP%]{gap:.5rem}.stat-item[_ngcontent-%COMP%]{padding:.75rem .5rem}.bottom-actions[_ngcontent-%COMP%]{padding:.75rem 1rem}}  app-back-button .back-button{background:transparent!important;color:#fff!important}  app-back-button .back-button:hover{opacity:.9}  app-back-button .back-button:active{opacity:.8}  app-back-button .back-button .icon{color:#fff!important}  app-back-button .back-button span{color:#fff!important}']})}}return s})();var de=(()=>{class s{static{this.\u0275fac=function(r){return new(r||s)}}static{this.\u0275mod=A({type:s})}static{this.\u0275inj=E({imports:[B,N,L.forChild([{path:"",component:U},{path:"new-request",component:W},{path:":id",component:J}])]})}}return s})();export{de as RequestsModule};
