import{S as Ne,i as Te,s as Pe,D as me,k as y,a as U,l as b,m as k,c as B,h,n as p,a1 as he,b as L,E as d,H as pe,I as ge,J as ve,f as F,t as J,q as M,r as C,p as ne,F as ae,T as Ve,d as ie,U as Ae,N as Fe,R as Q,V as se,o as He,j as je,e as oe,g as re,W as Le,w as Ue,x as Be,y as Me,z as Ce,X as le,u as K,Q as ce,a2 as qe,B as Je}from"../../../chunks/index-37f1e841.js";import{m as fe,A as Xe,l as ue,i as _e,u as Ye,h as Ze,k as Ke,j as Qe,o as We}from"../../../chunks/globalstore-e4075d3d.js";import{e as Oe,F as Ge,i as $e}from"../../../chunks/index-d7a3a3e5.js";import{e as xe}from"../../../chunks/env-public-1b9b25bc.js";const et=n=>({}),ye=n=>({}),tt=n=>({}),be=n=>({});function st(n){let e,s,l,t,a,i,u;const m=n[2].message,f=me(m,n,n[1],be),A=n[2]["chat-date"],c=me(A,n,n[1],ye);return{c(){e=y("main"),s=y("div"),l=y("div"),f&&f.c(),t=U(),a=y("p"),c&&c.c(),this.h()},l(o){e=b(o,"MAIN",{});var _=k(e);s=b(_,"DIV",{class:!0});var w=k(s);l=b(w,"DIV",{class:!0});var z=k(l);f&&f.l(z),t=B(z),a=b(z,"P",{class:!0});var D=k(a);c&&c.l(D),D.forEach(h),z.forEach(h),w.forEach(h),_.forEach(h),this.h()},h(){p(a,"class","chat-date svelte-t93svn"),p(l,"class","message svelte-t93svn"),p(s,"class",i=he(n[0])+" svelte-t93svn")},m(o,_){L(o,e,_),d(e,s),d(s,l),f&&f.m(l,null),d(l,t),d(l,a),c&&c.m(a,null),u=!0},p(o,[_]){f&&f.p&&(!u||_&2)&&pe(f,m,o,o[1],u?ve(m,o[1],_,tt):ge(o[1]),be),c&&c.p&&(!u||_&2)&&pe(c,A,o,o[1],u?ve(A,o[1],_,et):ge(o[1]),ye),(!u||_&1&&i!==(i=he(o[0])+" svelte-t93svn"))&&p(s,"class",i)},i(o){u||(F(f,o),F(c,o),u=!0)},o(o){J(f,o),J(c,o),u=!1},d(o){o&&h(e),f&&f.d(o),c&&c.d(o)}}}function lt(n,e,s){let{$$slots:l={},$$scope:t}=e,{source:a}=e;return n.$$set=i=>{"source"in i&&s(0,a=i.source),"$$scope"in i&&s(1,t=i.$$scope)},[a,t,l]}class nt extends Ne{constructor(e){super(),Te(this,e,lt,st,Pe,{source:0})}}const{Boolean:Re}=qe;function ke(n,e,s){const l=n.slice();l[33]=e[s];const t=l[33].is_online?"green":"lightgray";l[34]=t;const a=`${l[33].first_name} ${l[33].last_name}`;l[35]=a;const i=l[35].length>13?l[35].substring(0,13).padEnd(16,"."):l[35];return l[36]=i,l}function ze(n,e,s){const l=n.slice();return l[39]=e[s],l}function at(n){let e,s,l=n[6]?.first_name+"",t;return{c(){e=y("div"),s=M("You & "),t=M(l),this.h()},l(a){e=b(a,"DIV",{class:!0});var i=k(e);s=C(i,"You & "),t=C(i,l),i.forEach(h),this.h()},h(){p(e,"class","px-2 py-5 font-semibold")},m(a,i){L(a,e,i),d(e,s),d(e,t)},p(a,i){i[0]&64&&l!==(l=a[6]?.first_name+"")&&K(t,l)},d(a){a&&h(e)}}}function it(n){let e;function s(a,i){return a[1]?rt:ot}let l=s(n),t=l(n);return{c(){t.c(),e=oe()},l(a){t.l(a),e=oe()},m(a,i){t.m(a,i),L(a,e,i)},p(a,i){l===(l=s(a))&&t?t.p(a,i):(t.d(1),t=l(a),t&&(t.c(),t.m(e.parentNode,e)))},d(a){t.d(a),a&&h(e)}}}function ot(n){let e,s;return{c(){e=y("div"),s=M("Select a friend to chat"),this.h()},l(l){e=b(l,"DIV",{class:!0});var t=k(e);s=C(t,"Select a friend to chat"),t.forEach(h),this.h()},h(){p(e,"class","px-2 py-5 text-red-500")},m(l,t){L(l,e,t),d(e,s)},p:Je,d(l){l&&h(e)}}}function rt(n){let e,s,l=n[1]?.first_name+"",t;return{c(){e=y("div"),s=M("Me & "),t=M(l),this.h()},l(a){e=b(a,"DIV",{class:!0});var i=k(e);s=C(i,"Me & "),t=C(i,l),i.forEach(h),this.h()},h(){p(e,"class","px-2 py-5 font-semibold")},m(a,i){L(a,e,i),d(e,s),d(e,t)},p(a,i){i[0]&2&&l!==(l=a[1]?.first_name+"")&&K(t,l)},d(a){a&&h(e)}}}function Ee(n){let e,s,l=n[15],t=[];for(let i=0;i<l.length;i+=1)t[i]=we(ze(n,l,i));const a=i=>J(t[i],1,1,()=>{t[i]=null});return{c(){for(let i=0;i<t.length;i+=1)t[i].c();e=oe()},l(i){for(let u=0;u<t.length;u+=1)t[u].l(i);e=oe()},m(i,u){for(let m=0;m<t.length;m+=1)t[m].m(i,u);L(i,e,u),s=!0},p(i,u){if(u[0]&98305){l=i[15];let m;for(m=0;m<l.length;m+=1){const f=ze(i,l,m);t[m]?(t[m].p(f,u),F(t[m],1)):(t[m]=we(f),t[m].c(),F(t[m],1),t[m].m(e.parentNode,e))}for(re(),m=l.length;m<t.length;m+=1)a(m);ie()}},i(i){if(!s){for(let u=0;u<l.length;u+=1)F(t[u]);s=!0}},o(i){t=t.filter(Re);for(let u=0;u<t.length;u+=1)J(t[u]);s=!1},d(i){Le(t,i),i&&h(e)}}}function ct(n){let e,s=n[39].message+"",l;return{c(){e=y("span"),l=M(s),this.h()},l(t){e=b(t,"SPAN",{slot:!0,class:!0});var a=k(e);l=C(a,s),a.forEach(h),this.h()},h(){p(e,"slot","message"),p(e,"class","svelte-1s1zzmm")},m(t,a){L(t,e,a),d(e,l)},p(t,a){a[0]&32768&&s!==(s=t[39].message+"")&&K(l,s)},d(t){t&&h(e)}}}function ft(n){let e,s=new Date(n[39].created).toLocaleString("en-us",{timeZone:n[16],dateStyle:"medium",timeStyle:"long"})+"",l,t;return{c(){e=y("span"),l=M(s),t=U(),this.h()},l(a){e=b(a,"SPAN",{slot:!0,class:!0});var i=k(e);l=C(i,s),t=B(i),i.forEach(h),this.h()},h(){p(e,"slot","chat-date"),p(e,"class","svelte-1s1zzmm")},m(a,i){L(a,e,i),d(e,l),d(e,t)},p(a,i){i[0]&98304&&s!==(s=new Date(a[39].created).toLocaleString("en-us",{timeZone:a[16],dateStyle:"medium",timeStyle:"long"})+"")&&K(l,s)},d(a){a&&h(e)}}}function we(n){let e,s;return e=new nt({props:{source:n[0]?.user.id===n[39].from?"from":"to",$$slots:{"chat-date":[ft],message:[ct]},$$scope:{ctx:n}}}),{c(){Ue(e.$$.fragment)},l(l){Be(e.$$.fragment,l)},m(l,t){Me(e,l,t),s=!0},p(l,t){const a={};t[0]&32769&&(a.source=l[0]?.user.id===l[39].from?"from":"to"),t[0]&98304|t[1]&2048&&(a.$$scope={dirty:t,ctx:l}),e.$set(a)},i(l){s||(F(e.$$.fragment,l),s=!0)},o(l){J(e.$$.fragment,l),s=!1},d(l){Ce(e,l)}}}function ut(n){let e=n[6]?.first_name+"",s,l;return{c(){s=M(e),l=M(" is typing . . .")},l(t){s=C(t,e),l=C(t," is typing . . .")},m(t,a){L(t,s,a),L(t,l,a)},p(t,a){a[0]&64&&e!==(e=t[6]?.first_name+"")&&K(s,e)},d(t){t&&h(s),t&&h(l)}}}function _t(n){let e=n[1]?.first_name+"",s,l;return{c(){s=M(e),l=M(" is typing . . .")},l(t){s=C(t,e),l=C(t," is typing . . .")},m(t,a){L(t,s,a),L(t,l,a)},p(t,a){a[0]&2&&e!==(e=t[1]?.first_name+"")&&K(s,e)},d(t){t&&h(s),t&&h(l)}}}function Ie(n){let e,s,l,t,a,i,u,m=n[7],f=[];for(let c=0;c<m.length;c+=1)f[c]=De(ke(n,m,c));const A=c=>J(f[c],1,1,()=>{f[c]=null});return{c(){e=y("div"),s=y("h3"),l=M("Friend's List"),t=U(),a=y("div"),i=y("ul");for(let c=0;c<f.length;c+=1)f[c].c();this.h()},l(c){e=b(c,"DIV",{class:!0});var o=k(e);s=b(o,"H3",{class:!0});var _=k(s);l=C(_,"Friend's List"),_.forEach(h),t=B(o),a=b(o,"DIV",{class:!0});var w=k(a);i=b(w,"UL",{class:!0});var z=k(i);for(let D=0;D<f.length;D+=1)f[D].l(z);z.forEach(h),w.forEach(h),o.forEach(h),this.h()},h(){p(s,"class","text-[#222] text-sm svelte-1s1zzmm"),p(i,"class","svelte-1s1zzmm"),p(a,"class","friends-list-wrapper svelte-1s1zzmm"),p(e,"class","friends-list svelte-1s1zzmm")},m(c,o){L(c,e,o),d(e,s),d(s,l),d(e,t),d(e,a),d(a,i);for(let _=0;_<f.length;_+=1)f[_].m(i,null);u=!0},p(c,o){if(o[0]&305328){m=c[7];let _;for(_=0;_<m.length;_+=1){const w=ke(c,m,_);f[_]?(f[_].p(w,o),F(f[_],1)):(f[_]=De(w),f[_].c(),F(f[_],1),f[_].m(i,null))}for(re(),_=m.length;_<f.length;_+=1)A(_);ie()}},i(c){if(!u){for(let o=0;o<m.length;o+=1)F(f[o]);u=!0}},o(c){f=f.filter(Re);for(let o=0;o<f.length;o+=1)J(f[o]);u=!1},d(c){c&&h(e),Le(f,c)}}}function Se(n){let e,s=n[5][n[33].id]+"",l;return{c(){e=y("span"),l=M(s),this.h()},l(t){e=b(t,"SPAN",{class:!0});var a=k(e);l=C(a,s),a.forEach(h),this.h()},h(){p(e,"class","new-messages svelte-1s1zzmm")},m(t,a){L(t,e,a),d(e,l)},p(t,a){a[0]&160&&s!==(s=t[5][t[33].id]+"")&&K(l,s)},d(t){t&&h(e)}}}function De(n){let e,s,l,t,a,i,u=n[36]+"",m,f,A,c,o,_,w,z,D,V,T,Y;t=new Ge({props:{icon:$e,scale:"0.75",style:`color: ${n[34]}`}});let v=n[5][n[33].id]&&n[4]!==n[33].id&&Se(n);function X(...P){return n[26](n[33],...P)}return{c(){e=y("li"),s=y("form"),l=y("button"),Ue(t.$$.fragment),a=U(),i=y("span"),m=M(u),A=U(),v&&v.c(),c=U(),o=y("input"),z=U(),this.h()},l(P){e=b(P,"LI",{id:!0,class:!0});var E=k(e);s=b(E,"FORM",{method:!0,action:!0});var R=k(s);l=b(R,"BUTTON",{class:!0});var q=k(l);Be(t.$$.fragment,q),a=B(q),i=b(q,"SPAN",{title:!0});var Z=k(i);m=C(Z,u),Z.forEach(h),A=B(q),v&&v.l(q),q.forEach(h),c=B(R),o=b(R,"INPUT",{name:!0,type:!0,style:!0}),R.forEach(h),z=B(E),E.forEach(h),this.h()},h(){p(i,"title",f=n[35]),p(l,"class","svelte-1s1zzmm"),le(l,"online",n[33]?.is_online),p(o,"name","friend_id"),p(o,"type","text"),o.value=_=n[33].id,ne(o,"display","none"),p(s,"method","POST"),p(s,"action","?/get"),p(e,"id",D=n[33].id),p(e,"class","svelte-1s1zzmm"),le(e,"active",n[33].id===n[4])},m(P,E){L(P,e,E),d(e,s),d(s,l),Me(t,l,null),d(l,a),d(l,i),d(i,m),d(l,A),v&&v.m(l,null),d(s,c),d(s,o),d(e,z),V=!0,T||(Y=[ae(l,"click",X),Ve(w=Oe.call(null,s,n[27]))],T=!0)},p(P,E){n=P;const R={};E[0]&128&&(R.style=`color: ${n[34]}`),t.$set(R),(!V||E[0]&128)&&u!==(u=n[36]+"")&&K(m,u),(!V||E[0]&128&&f!==(f=n[35]))&&p(i,"title",f),n[5][n[33].id]&&n[4]!==n[33].id?v?v.p(n,E):(v=Se(n),v.c(),v.m(l,null)):v&&(v.d(1),v=null),(!V||E[0]&128)&&le(l,"online",n[33]?.is_online),(!V||E[0]&128&&_!==(_=n[33].id)&&o.value!==_)&&(o.value=_),w&&Ae(w.update)&&E[0]&43008&&w.update.call(null,n[27]),(!V||E[0]&128&&D!==(D=n[33].id))&&p(e,"id",D),(!V||E[0]&144)&&le(e,"active",n[33].id===n[4])},i(P){V||(F(t.$$.fragment,P),V=!0)},o(P){J(t.$$.fragment,P),V=!1},d(P){P&&h(e),Ce(t),v&&v.d(),T=!1,Fe(Y)}}}function dt(n){let e,s,l,t,a,i,u,m,f,A,c,o,_,w,z,D,V,T,Y,v,X,P,E,R,q;function Z(g,N){return g[3].role===0?it:at}let W=Z(n),H=W(n),I=n[15]&&Ee(n);function ee(g,N){return g[3]?.role===0?_t:ut}let G=ee(n),j=G(n),S=n[3]?.role==0&&Ie(n);return{c(){e=y("main"),s=y("form"),H.c(),l=U(),t=y("div"),a=y("div"),i=U(),u=y("div"),I&&I.c(),m=U(),f=y("div"),j.c(),A=U(),c=y("textarea"),o=U(),_=y("input"),w=U(),z=y("div"),D=y("span"),V=U(),T=y("button"),Y=M("SEND"),P=U(),S&&S.c(),this.h()},l(g){e=b(g,"MAIN",{class:!0});var N=k(e);s=b(N,"FORM",{class:!0,method:!0,action:!0});var r=k(s);H.l(r),l=B(r),t=b(r,"DIV",{class:!0});var O=k(t);a=b(O,"DIV",{}),k(a).forEach(h),i=B(O),u=b(O,"DIV",{class:!0});var $=k(u);I&&I.l($),$.forEach(h),O.forEach(h),m=B(r),f=b(r,"DIV",{class:!0});var x=k(f);j.l(x),x.forEach(h),A=B(r),c=b(r,"TEXTAREA",{class:!0,name:!0,placeholder:!0}),k(c).forEach(h),o=B(r),_=b(r,"INPUT",{name:!0,type:!0,style:!0}),w=B(r),z=b(r,"DIV",{class:!0});var te=k(z);D=b(te,"SPAN",{class:!0}),k(D).forEach(h),V=B(te),T=b(te,"BUTTON",{class:!0});var de=k(T);Y=C(de,"SEND"),de.forEach(h),te.forEach(h),r.forEach(h),P=B(N),S&&S.l(N),N.forEach(h),this.h()},h(){p(u,"class","messages-wrapper svelte-1s1zzmm"),p(t,"class","content svelte-1s1zzmm"),p(f,"class","friend-is-typing svelte-1s1zzmm"),ne(f,"visibility",n[14]?"visible":"hidden"),p(c,"class","new-message svelte-1s1zzmm"),p(c,"name","message"),p(c,"placeholder","type your message here"),p(_,"name","send_to_id"),p(_,"type","text"),_.value=n[4],ne(_,"display","none"),p(D,"class","svelte-1s1zzmm"),T.disabled=v=!n[12],p(T,"class","btn-send svelte-1s1zzmm"),p(z,"class","send-btn-wrapper svelte-1s1zzmm"),p(s,"class","chat-container svelte-1s1zzmm"),p(s,"method","POST"),p(s,"action","?/send"),p(e,"class","svelte-1s1zzmm")},m(g,N){L(g,e,N),d(e,s),H.m(s,null),d(s,l),d(s,t),d(t,a),d(t,i),d(t,u),I&&I.m(u,null),n[19](t),d(s,m),d(s,f),j.m(f,null),d(s,A),d(s,c),n[20](c),d(s,o),d(s,_),d(s,w),d(s,z),d(z,D),d(z,V),d(z,T),d(T,Y),n[24](T),d(e,P),S&&S.m(e,null),E=!0,R||(q=[ae(c,"input",n[21]),ae(c,"keypress",n[22]),ae(c,"keydown",n[23]),Ve(X=Oe.call(null,s,n[25]))],R=!0)},p(g,N){W===(W=Z(g))&&H?H.p(g,N):(H.d(1),H=W(g),H&&(H.c(),H.m(s,l))),g[15]?I?(I.p(g,N),N[0]&32768&&F(I,1)):(I=Ee(g),I.c(),F(I,1),I.m(u,null)):I&&(re(),J(I,1,1,()=>{I=null}),ie()),G===(G=ee(g))&&j?j.p(g,N):(j.d(1),j=G(g),j&&(j.c(),j.m(f,null))),N[0]&16384&&ne(f,"visibility",g[14]?"visible":"hidden"),(!E||N[0]&16&&_.value!==g[4])&&(_.value=g[4]),(!E||N[0]&4096&&v!==(v=!g[12]))&&(T.disabled=v),X&&Ae(X.update)&&N[0]&6656&&X.update.call(null,g[25]),g[3]?.role==0?S?(S.p(g,N),N[0]&8&&F(S,1)):(S=Ie(g),S.c(),F(S,1),S.m(e,null)):S&&(re(),J(S,1,1,()=>{S=null}),ie())},i(g){E||(F(I),F(S),E=!0)},o(g){J(I),J(S),E=!1},d(g){g&&h(e),H.d(),I&&I.d(),n[19](null),j.d(),n[20](null),n[24](null),S&&S.d(),R=!1,Fe(q)}}}function mt(n,e,s){let l,t,a,i,u,m,f;Q(n,Ye,r=>s(3,l=r)),Q(n,ue,r=>s(15,t=r)),Q(n,fe,r=>s(4,a=r)),Q(n,Ze,r=>s(5,i=r)),Q(n,Ke,r=>s(6,u=r)),Q(n,Qe,r=>s(7,m=r)),Q(n,We,r=>s(16,f=r));let{data:A}=e;se(fe,a=l?.role==1?u?.id:null,a);let c,o,_,w=!1,z=!1,D,V=null,T=!1,Y=!1;const v=new Xe(xe.PUBLIC_PB_URI),X=async r=>{try{(await v.collection("users").getOne(l?.id)).is_typing!==r&&await v.collection("users").update(l?.id,{is_typing:r})}catch(O){console.log(O)}},P=async()=>{const r=await v.collection("users").getFirstListItem("role = 0");return _e(await v.collection("chats").getFullList(200,{filter:`(from = "${l.id}" && to = "${r?.id}") || (from = "${r?.id}" && to = "${l.id}")`,sort:"+created"}))},E=async r=>{try{await v.collection("users").update(u.id,{is_chatting_to:r})}catch(O){console.log(O)}},R=async(r,O)=>{let $=null;try{O===0?$=_e(await v.collection("chats").getFullList(0,{filter:`(from = "${r}") && (to = "${u.id}") && (read = false)`,sort:"+created"})):$=_e(await v.collection("chats").getFullList(0,{filter:`(from = "${u.id}") && (to = "${l.id}") && (read = false)`,sort:"+created"}));for(let x of $)await v.collection("chats").update(x.id,{read:!0})}catch(x){console.log(x)}};async function q(r){se(fe,a=r,a),o&&s(12,z=Boolean(a&&o?.value))}const Z=()=>c.scrollTo(0,c.scrollHeight);He(async()=>{se(ue,t=l?.role===1?await P():[],t),c&&Z()}),je(()=>Z());function W(r){ce[r?"unshift":"push"](()=>{c=r,s(8,c)})}function H(r){ce[r?"unshift":"push"](()=>{o=r,s(9,o)})}const I=()=>{o&&s(12,z=Boolean(a&&o?.value))},ee=r=>{r.key=="Enter"||r.key=="Tab"||r.key=="Shift"||r.key=="Alt"||s(2,T=!0)},G=async r=>{z&&!(r.key=="Enter"&&r.shiftKey)&&r.key==="Enter"&&(await X(!1),_.click())};function j(r){ce[r?"unshift":"push"](()=>{_=r,s(10,_)})}const S=()=>(s(11,w=!0),async({result:r})=>{s(11,w=!1),s(9,o.value="",o),o.focus(),s(12,z=!1)}),g=(r,O)=>q(r.id),N=()=>(s(11,w=!0),async({result:r})=>{s(11,w=!1),s(13,D=r),se(ue,t=D?.data?.chats,t)});return n.$$set=r=>{"data"in r&&s(0,A=r.data)},n.$$.update=()=>{n.$$.dirty[0]&20&&a&&(T&&X(T),setTimeout(()=>{s(2,T=!1),X(T)},3e3)),n.$$.dirty[0]&218&&a&&(s(1,V=m.find(r=>r.id===a)),l.role===0?s(14,Y=V?.is_typing):l?.id===u?.is_chatting_to&&s(14,Y=u.is_typing)),n.$$.dirty[0]&56&&a&&(async()=>(l?.role==0&&await E(a),i[a]&&await R(a,l?.role)))()},[A,V,T,l,a,i,u,m,c,o,_,w,z,D,Y,t,f,X,q,W,H,I,ee,G,j,S,g,N]}class yt extends Ne{constructor(e){super(),Te(this,e,mt,dt,Pe,{data:0},null,[-1,-1])}}export{yt as default};
