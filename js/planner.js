/* المرحلة الثانية: تخطيط محلي بقواعد واضحة، لا يحتاج مفتاح API. */
const PLACE_SOURCE = 'https://www.visitsaudi.com/en/aseer/stories/aseer-top-trending-places';
const LOCAL_PLACES = [
 {id:'muftaha',name:{en:'Al Muftaha Village',ar:'قرية المفتاحة'},tags:['heritage','art'],mood:'calm',effort:'light',minutes:60,spend:25,x:48,y:45,desc:{en:'Discover local architecture and the arts in the heart of Abha.',ar:'اكتشف العمارة المحلية والفنون في قلب أبها.'},source:'https://www.visitsaudi.com/ar/aseer/attractions/almuftaha-village',wish:['تراث','تاريخ','فن','قصة','قصص',"heritage","history","art","craft","story"],symbol:'◈'},
 {id:'art',name:{en:'Art Street',ar:'شارع الفن'},tags:['art','market'],mood:'social',effort:'light',minutes:60,spend:35,x:56,y:37,desc:{en:'Explore a creative setting and stop at a cafe of your choice.',ar:'استكشف بيئة إبداعية وتوقف في مقهى تختاره.'},source:'https://www.visitsaudi.com/en/aseer/attractions/art-street-in-abha',wish:['فن','قهو','تصوير','ألوان',"art","coffee","photo","color"],symbol:'✦'},
 {id:'lake',name:{en:'Abha Dam Lake',ar:'بحيرة سد أبها'},tags:['nature'],mood:'calm',effort:'light',minutes:60,spend:15,x:25,y:53,desc:{en:'Enjoy lake views from an available spot that suits your group.',ar:'استمتع بمناظر البحيرة من مكان مناسب لمجموعتك.'},source:'https://discoveraseer.com/ar/attractions/abha-dam-lake',wish:['منظر','طبيع','بحير','هدوء',"lake","view","nature","quiet"],symbol:'≈'},
 {id:'park',name:{en:'Abu Khayal Park',ar:'منتزه أبو خيال'},tags:['nature','adventure'],mood:'calm',effort:'medium',minutes:75,spend:20,x:44,y:76,desc:{en:'Enjoy green surroundings and choose a walk that suits everyone.',ar:'استمتع بمحيط أخضر واختر مشيًا يناسب الجميع.'},source:PLACE_SOURCE,wish:['طبيع','مشي','منظر','خضر',"nature","walk","green","active","outdoor","challenge"],symbol:'♧'},
 {id:'castle',name:{en:'Shamsan Castle',ar:'قلعة شمسان'},tags:['heritage','adventure'],mood:'calm',effort:'high',minutes:60,spend:15,x:70,y:19,desc:{en:'A historic landmark overlooking the city. Check access and walking conditions before visiting.',ar:'معلم تاريخي يطل على المدينة. تحقق من إمكانية الوصول وحالة المشي قبل الزيارة.'},source:PLACE_SOURCE,wish:['تاريخ','تراث','قلع','مرتفع','عالي',"history","heritage","castle","high","view"],symbol:'▥'},
 {id:'high',name:{en:'High City',ar:'المدينة العالية'},tags:['nature','market'],mood:'social',effort:'light',minutes:75,spend:50,x:33,y:84,desc:{en:'A stop for views and a break, with spending tailored to your budget.',ar:'محطة للمناظر واستراحة، بإنفاق يناسب ميزانيتك.'},source:PLACE_SOURCE,wish:['غروب','مرتفع','عالي','منظر','قهو',"sunset","view","high","coffee"],symbol:'△'},
 {id:'market',name:{en:'Tuesday Market',ar:'سوق الثلاثاء'},tags:['market','heritage'],mood:'social',effort:'medium',minutes:60,spend:40,x:60,y:49,desc:{en:'Discover local products and crafts. Check market activity times before visiting.',ar:'اكتشف المنتجات والحِرف المحلية. تحقق من أوقات نشاط السوق قبل الزيارة.'},source:'https://saudipedia.com/قرية-المفتاحة',wish:['سوق','أكل','اكل','محلي','حرف','تسوق',"market","food","local","craft","shop"],symbol:'▧'}
];
const CATEGORIES={nature:{en:'Nature',ar:'الطبيعة'},heritage:{en:'Heritage',ar:'التراث'},art:{en:'Art',ar:'الفن'},market:{en:'Markets and flavors',ar:'الأسواق والنكهات'},adventure:{en:'Activity and discovery',ar:'النشاط والاكتشاف'}};
function normalizedWish(s){return (s||'').toLowerCase().replace(/[أإآ]/g,'ا').replace(/ى/g,'ي');}
function wishMatches(p,l){const t=normalizedWish(p.wish);return l.wish.some(w=>t.includes(normalizedWish(w)));}
function interestMatches(p,l){return l.tags.includes(p.answers.q1);}
function eligiblePlaces(participants){
 const limited=participants.some(p=>(p.needs||[]).some(n=>['no-long-walk','no-stairs','wheelchair'].includes(n))||p.answers.q3==='light');
 return LOCAL_PLACES.filter(l=>!limited||l.effort!=='high');
}
function rankScore(l,participants,selected){
 return participants.reduce((sum,p)=>{
 const represented=selected.some(s=>interestMatches(p,s));
 return sum+(interestMatches(p,l)?(represented?3:12):0)+(wishMatches(p,l)?5:0)+(p.answers.q2===l.mood?1:0)+(p.answers.q3===l.effort?1:0)+(p.answers.q1==='unknown'?2:0);
 },0)+(selected.some(s=>s.tags[0]===l.tags[0])?0:1);
}
function makePlan(participants){
 const pool=eligiblePlaces(participants);let best=[],bestValue=-Infinity;
 // Compare complete three-stop combinations so earlier choices cannot crowd out a person.
 for(let a=0;a<pool.length;a++)for(let b=a+1;b<pool.length;b++)for(let c=b+1;c<pool.length;c++){
  const group=[pool[a],pool[b],pool[c]];
  const represented=participants.filter(p=>p.answers.q1==='unknown'||group.some(l=>interestMatches(p,l))).length;
  const preferences=group.reduce((v,l)=>v+rankScore(l,participants,group.filter(x=>x!==l)),0);
  const cost=group.reduce((v,l)=>v+l.spend,0)*participants.length;
  const budget=Number(state.trip.budget)||0;
  const value=represented*1000+preferences-Math.max(0,cost-budget)/20;
  if(value>bestValue){bestValue=value;best=group;}
 }
 return best.map(l=>l.id);
}
function suggestedStart(people){
 const early=people.filter(p=>p.answers.q4==='early').length;
 return early>people.length/2?'09:00':'10:00';
}
function durationLabel(minutes){return Math.floor(minutes/60)+' hr'+(minutes%60?' '+minutes%60+' min':'');}
let mapFocusId=null;
window.mountPlanner=function(){
 const host=document.getElementById('summaryContainer');
 const signature=JSON.stringify([state.participants,state.trip]);
 if(!state.planner||state.planner.signature!==signature){state.planner={signature,ids:makePlan(state.participants),open:false,start:suggestedStart(state.participants),quizDone:false};saveState();}
 const solo=state.participants.length===1;
 const intro=document.createElement('div');intro.className='darb-invite';
 intro.innerHTML=`<div><span class="eyebrow">${t(solo?'soloInviteEyebrow':'inviteEyebrow')}</span><h3>${t(solo?'soloInviteTitle':'inviteTitle')}</h3><p>${t(solo?'soloInviteText':'inviteText')}</p></div><button class="btn btn-primary" id="openPlan" aria-controls="plannerPanel">${t('openPlanBtn')}</button>`;
 host.prepend(intro);
 const panel=document.createElement('section');panel.id='plannerPanel';panel.hidden=!state.planner.open;intro.after(panel);
 document.getElementById('openPlan').setAttribute('aria-expanded',String(state.planner.open));
 document.getElementById('openPlan').onclick=()=>{state.planner.open=!state.planner.open;saveState();panel.hidden=!state.planner.open;document.getElementById('openPlan').setAttribute('aria-expanded',String(state.planner.open));if(!panel.hidden){drawPlanner();panel.scrollIntoView({behavior:'smooth',block:'start'});}};
 if(state.planner.open)drawPlanner();
};
function selectedPlaces(){return state.planner.ids.map(id=>LOCAL_PLACES.find(l=>l.id===id)).filter(Boolean);}
// Keep the map query pinned to the canonical English place name + the Arabic
// "Abha" suffix — this combination is what was verified to return correct
// Google Maps results, regardless of the UI language currently shown.
function mapsLink(l){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(l.name.en+' أبها');}
function timing(n){return String(Math.floor(n/60)%24).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function drawPlanner(){
 const panel=document.getElementById('plannerPanel'),chosen=selectedPlaces(),people=state.participants,needs=people.flatMap(p=>p.needs||[]);
 const needsNotice=needs.length?t('needsNoticeWithNeeds'):t('needsNoticeDefault');
 const spend=chosen.reduce((v,l)=>v+l.spend,0)*people.length;
 const budget=Number(state.trip.budget),excess=spend>budget;
 const signature=escapeHtml(state.trip.name);
 let minute=state.planner.start.split(':').reduce((h,m)=>Number(h)*60+Number(m));
 const cards=chosen.map((l,idx)=>{
 const begin=minute;minute+=l.minutes;const end=minute;minute+=30;
 const names=people.filter(p=>interestMatches(p,l)).map(p=>p.name);
 const wishes=people.filter(p=>wishMatches(p,l)).map(p=>p.name);
 const placeName=L(l.name);
 const reason=(names.length?fmt('stopReasonMatch',{names:escapeHtml(names.join(', '))}):t('stopReasonVariety'))+(wishes.length?fmt('stopReasonWishSuffix',{names:escapeHtml(wishes.join(', '))}):'');
 return `<article class="stop-card" id="stop-${l.id}"><div class="stop-head"><span class="stop-num">${idx+1}</span><div><span class="eyebrow">${fmt('stopTimeLabel',{begin:timing(begin),end:timing(end),minutes:l.minutes})}</span><h3>${placeName}</h3></div><span class="place-symbol">${l.symbol}</span></div><p>${L(l.desc)}</p><div class="reason">${reason}</div><p class="small">${fmt('spendNote',{amount:l.spend*people.length})}</p><div class="stop-actions"><button class="btn btn-secondary" data-focus="${l.id}">${t('viewOnMap')}</button><a class="btn btn-secondary" href="${mapsLink(l)}" target="_blank" rel="noopener">${t('locationDirections')}</a><a class="source-link" href="${l.source}" target="_blank" rel="noopener">${t('aboutThisPlace')}</a></div><label class="replace-label">${t('swapLabel')} <select data-replace="${idx}" aria-label="${fmt('replaceAria',{name:placeName})}">${eligiblePlaces(people).filter(a=>a.id===l.id||!state.planner.ids.includes(a.id)).map(a=>`<option value="${a.id}" ${a.id===l.id?'selected':''}>${L(a.name)}</option>`).join('')}</select></label></article>${idx<chosen.length-1?'<p class="transfer">'+t('transferNote')+'</p>':''}`;
 }).join('');
 const coverage=people.map(p=>{const matches=chosen.filter(l=>interestMatches(p,l));const text=p.answers.q1==='unknown'?t('coverageUnknown'):matches.length?fmt('coverageMatches',{n:matches.length}):t('coverageNoMatch');return `<div class="coverage-item"><strong>${escapeHtml(p.name)}</strong><span>${text}</span></div>`;}).join('');
 const metricsText=excess?fmt('overBudgetText',{amount:spend-budget}):fmt('underBudgetText',{amount:budget-spend});
 panel.innerHTML=`<div class="plan-title"><div><span class="eyebrow">${t('planEyebrow')}</span><h2>${signature}</h2></div><button class="btn btn-secondary" id="printPlan">${t('printPlan')}</button></div><div class="plan-notice">${needsNotice}</div><div class="plan-metrics"><div><strong>${chosen.length}</strong><span>${t('metricStops')}</span></div><div><strong>${durationLabel(minute-30-(Number(state.planner.start.slice(0,2))*60+Number(state.planner.start.slice(3))))}</strong><span>${t('metricDuration')}</span></div><div class="${excess?'over-budget':''}"><strong>${spend} SAR</strong><span>${t('metricSpend')}</span></div></div><p class="small">${metricsText} ${t('estimateNote')}</p><div class="plan-controls"><label>${t('suggestedStartLabel')} <input id="planStart" type="time" value="${state.planner.start}"></label><button class="btn btn-secondary" id="resetPlan">${t('rebalanceBtn')}</button></div><p class="small">${fmt('startingPointNote',{point:escapeHtml(state.trip.startPoint)})}</p><h3 class="coverage-title">${t('coverageTitle')}</h3><div class="coverage">${coverage}</div><div class="plan-layout"><div class="stops">${cards}</div><aside class="map-side"><div class="map-card"><h3>${t('exploreStopsHeading')}</h3><p class="small">${t('schematicNote')}</p><div id="sketchMap"></div><div class="map-key"><span>${t('mapKeyIn')}</span><span>${t('mapKeyOut')}</span></div><p id="mapCaption" class="small" aria-live="polite">${t('mapCaptionDefault')}</p><div id="realMap"></div></div><div class="discovery-card"><span class="eyebrow">${t('storiesEyebrow')}</span><h3>${t('discoverTogetherTitle')}</h3><p>${t('discoverTogetherText')}</p><button class="btn btn-primary" id="playQuiz">${state.planner.quizDone?t('playAgain'):t('playQuiz')}</button><div id="quizArea">${state.planner.quizResult?`<p class="saved-score">${fmt('lastScore',{score:state.planner.quizResult.score,total:STORY_QUIZ.length})}</p>`:""}</div></div></aside></div><details class="plan-sources"><summary>${t('sourcesDetailsSummary')}</summary><p>${t('sourcesP1')}</p><p>${t('sourcesP2')}</p></details>`;
 panel.querySelectorAll('[data-replace]').forEach(s=>s.onchange=()=>{state.planner.ids[Number(s.dataset.replace)]=s.value;saveState();drawPlanner();});
 panel.querySelectorAll('[data-focus]').forEach(b=>b.onclick=()=>focusPlace(b.dataset.focus));
 document.getElementById('planStart').onchange=e=>{if(e.target.value){state.planner.start=e.target.value;saveState();drawPlanner();}};
 document.getElementById('resetPlan').onclick=()=>{state.planner.ids=makePlan(people);saveState();drawPlanner();};
 document.getElementById('printPlan').onclick=()=>window.print();
 document.getElementById('playQuiz').onclick=startQuiz;
 drawSketch();
}
function drawSketch(){
 const selected=selectedPlaces();
 const lines=selected.map(l=>(l.x*5)+','+(l.y*4)).join(' ');
 document.getElementById('sketchMap').innerHTML=`<svg viewBox="0 0 500 400" role="img" aria-label="Schematic of places to explore in Abha"><rect width="500" height="400" rx="22" fill="#e9eddf"/><path d="M0 270 Q140 120 210 280 T500 230 M0 120 Q100 20 280 120 T500 40" fill="none" stroke="#d5ddc6" stroke-width="35"/><path d="M10 210 Q140 280 145 390" fill="none" stroke="#a5c3c3" stroke-width="16"/><polyline points="${lines}" fill="none" stroke="#aa683e" stroke-width="3" stroke-dasharray="7 7"/>${LOCAL_PLACES.map(l=>{const ix=state.planner.ids.indexOf(l.id);const placeName=L(l.name);return `<g role="button" tabindex="0" data-pin="${l.id}" aria-label="${placeName}"><circle cx="${l.x*5}" cy="${l.y*4}" r="${ix<0?13:18}" fill="${ix<0?'#fffdf8':'#2f4a3c'}" stroke="#2f4a3c" stroke-width="2"/><text x="${l.x*5}" y="${l.y*4+5}" text-anchor="middle" fill="${ix<0?'#2f4a3c':'white'}" font-size="14">${ix<0?'+':ix+1}</text><text x="${l.x*5}" y="${l.y*4-25}" text-anchor="middle" font-size="13" fill="#263e31">${placeName}</text></g>`;}).join('')}</svg>`;
 document.querySelectorAll('[data-pin]').forEach(p=>{p.onclick=()=>focusPlace(p.dataset.pin);p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();focusPlace(p.dataset.pin);}};});
}
function focusPlace(id){
 const l=LOCAL_PLACES.find(l=>l.id===id);mapFocusId=id;const box=document.getElementById('realMap');
 const placeName=L(l.name);
 document.getElementById('mapCaption').textContent=placeName+' — '+L(l.desc);
 // Map query stays pinned to the canonical English name + Arabic "Abha" suffix (see mapsLink above).
 box.innerHTML=`<iframe title="${fmt('mapIframeTitle',{name:placeName})}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(l.name.en+' أبها')}&output=embed"></iframe><a class="source-link" href="${mapsLink(l)}" target="_blank" rel="noopener">${fmt('openMapLink',{name:placeName})}</a><p class="small">${t('mapNeedsInternet')}</p>`;
 box.scrollIntoView({behavior:'smooth',block:'nearest'});
}
const STORY_QUIZ=[
 {q:{en:'What is Al Muftaha best known for?',ar:'بماذا تشتهر قرية المفتاحة؟'},answers:[{en:'Arts, heritage and crafts',ar:'الفنون والتراث والحِرف'},{en:'Shipbuilding',ar:'بناء السفن'},{en:'Winter sports',ar:'الرياضات الشتوية'}],correct:0,story:{en:'Al Muftaha is a cultural center in Abha for traditional and visual arts, photography and crafts.',ar:'المفتاحة مركز ثقافي في أبها للفنون التقليدية والبصرية والتصوير والحِرف.'},source:'https://saudipedia.com/قرية-المفتاحة'},
 {q:{en:'How was Abha Dam Lake formed?',ar:'كيف تكوّنت بحيرة سد أبها؟'},answers:[{en:'A volcanic crater',ar:'فوهة بركانية'},{en:'Construction of the dam',ar:'بناء السد'},{en:'Melting snow',ar:'ذوبان الثلوج'}],correct:1,story:{en:'The lake formed with the construction of Abha Dam during the reign of King Faisal.',ar:'تكوّنت البحيرة مع بناء سد أبها في عهد الملك فيصل.'},source:'https://discoveraseer.com/ar/attractions/abha-dam-lake'}
];
function startQuiz(){
 let step=0,score=0;const area=document.getElementById('quizArea');
 function show(){
  const q=STORY_QUIZ[step];
  area.innerHTML=`<h4>${fmt('quizProgress',{step:step+1,total:STORY_QUIZ.length,question:L(q.q)})}</h4><div class="quiz-options">${q.answers.map((a,i)=>`<button class="btn btn-secondary" data-answer="${i}">${L(a)}</button>`).join('')}</div><div id="quizFeedback" aria-live="polite"></div>`;
  area.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
   const ok=Number(b.dataset.answer)===q.correct;if(b.disabled)return;if(ok)score++;
   area.querySelectorAll('[data-answer]').forEach(x=>{x.disabled=true;x.classList.toggle('answer-correct',Number(x.dataset.answer)===q.correct);x.classList.toggle('answer-wrong',x===b&&!ok);});
   document.getElementById('quizFeedback').innerHTML=`<p>${ok?t('correctAnswer'):fmt('correctAnswerWas',{answer:L(q.answers[q.correct])})}</p><p>${L(q.story)}</p><a href="${q.source}" target="_blank" rel="noopener">${t('storySource')}</a><button class="btn btn-primary" id="quizNext">${step===STORY_QUIZ.length-1?t('seeResults'):t('nextQuestion')}</button>`;
   document.getElementById('quizNext').onclick=()=>{
    step++;
    if(step<STORY_QUIZ.length)show();
    else{
     state.planner.quizDone=true;state.planner.quizResult={score};saveState();
     area.innerHTML=`<div class="quiz-finish">${t('storyExplorerBadge')}<p>${fmt('challengeComplete',{score,total:STORY_QUIZ.length})}</p><small>${t('badgeNote')}</small></div>`;
     document.getElementById('playQuiz').textContent=t('playAgain');
    }
   };
  });
 }
 show();
}
