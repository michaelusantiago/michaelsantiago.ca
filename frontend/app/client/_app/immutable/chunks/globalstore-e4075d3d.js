import{w as f,e as D}from"./env-public-1b9b25bc.js";var T=function(r,o){return T=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},T(r,o)};function p(r,o){if(typeof o!="function"&&o!==null)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function t(){this.constructor=r}T(r,o),r.prototype=o===null?Object.create(o):(t.prototype=o.prototype,new t)}var E=function(){return E=Object.assign||function(r){for(var o,t=1,e=arguments.length;t<e;t++)for(var n in o=arguments[t])Object.prototype.hasOwnProperty.call(o,n)&&(r[n]=o[n]);return r},E.apply(this,arguments)};function v(r,o,t,e){return new(t||(t=Promise))(function(n,i){function s(h){try{c(e.next(h))}catch(u){i(u)}}function a(h){try{c(e.throw(h))}catch(u){i(u)}}function c(h){var u;h.done?n(h.value):(u=h.value,u instanceof t?u:new t(function(l){l(u)})).then(s,a)}c((e=e.apply(r,o||[])).next())})}function m(r,o){var t,e,n,i,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function a(c){return function(h){return function(u){if(t)throw new TypeError("Generator is already executing.");for(;s;)try{if(t=1,e&&(n=2&u[0]?e.return:u[0]?e.throw||((n=e.return)&&n.call(e),0):e.next)&&!(n=n.call(e,u[1])).done)return n;switch(e=0,n&&(u=[2&u[0],n.value]),u[0]){case 0:case 1:n=u;break;case 4:return s.label++,{value:u[1],done:!1};case 5:s.label++,e=u[1],u=[0];continue;case 7:u=s.ops.pop(),s.trys.pop();continue;default:if(n=s.trys,!((n=n.length>0&&n[n.length-1])||u[0]!==6&&u[0]!==2)){s=0;continue}if(u[0]===3&&(!n||u[1]>n[0]&&u[1]<n[3])){s.label=u[1];break}if(u[0]===6&&s.label<n[1]){s.label=n[1],n=u;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(u);break}n[2]&&s.ops.pop(),s.trys.pop();continue}u=o.call(r,s)}catch(l){u=[6,l],e=0}finally{t=n=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([c,h])}}}var L,_=function(r){function o(t){var e,n=this;return(n=r.call(this,"ClientResponseError")||this).url="",n.status=0,n.data={},n.isAbort=!1,n.originalError=null,Object.setPrototypeOf(n,o.prototype),t instanceof o||(n.originalError=t),t!==null&&typeof t=="object"&&(n.url=typeof t.url=="string"?t.url:"",n.status=typeof t.status=="number"?t.status:0,n.data=t.data!==null&&typeof t.data=="object"?t.data:{}),typeof DOMException<"u"&&t instanceof DOMException&&(n.isAbort=!0),n.name="ClientResponseError "+n.status,n.message=(e=n.data)===null||e===void 0?void 0:e.message,n.message||(n.message=n.isAbort?"The request was autocancelled. More info you could find in https://github.com/pocketbase/js-sdk#auto-cancellation.":"Something went wrong while processing your request."),n}return p(o,r),o.prototype.toJSON=function(){return E({},this)},o}(Error),I=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function j(r,o,t){var e=Object.assign({},t||{}),n=e.encode||G;if(!I.test(r))throw new TypeError("argument name is invalid");var i=n(o);if(i&&!I.test(i))throw new TypeError("argument val is invalid");var s=r+"="+i;if(e.maxAge!=null){var a=e.maxAge-0;if(isNaN(a)||!isFinite(a))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(a)}if(e.domain){if(!I.test(e.domain))throw new TypeError("option domain is invalid");s+="; Domain="+e.domain}if(e.path){if(!I.test(e.path))throw new TypeError("option path is invalid");s+="; Path="+e.path}if(e.expires){if(!function(c){return Object.prototype.toString.call(c)==="[object Date]"||c instanceof Date}(e.expires)||isNaN(e.expires.valueOf()))throw new TypeError("option expires is invalid");s+="; Expires="+e.expires.toUTCString()}if(e.httpOnly&&(s+="; HttpOnly"),e.secure&&(s+="; Secure"),e.priority)switch(typeof e.priority=="string"?e.priority.toLowerCase():e.priority){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}if(e.sameSite)switch(typeof e.sameSite=="string"?e.sameSite.toLowerCase():e.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;case"none":s+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return s}function F(r){return r.indexOf("%")!==-1?decodeURIComponent(r):r}function G(r){return encodeURIComponent(r)}function N(r){if(r)try{var o=decodeURIComponent(L(r.split(".")[1]).split("").map(function(t){return"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(o)||{}}catch{}return{}}L=typeof atob=="function"?atob:function(r){var o=String(r).replace(/=+$/,"");if(o.length%4==1)throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");for(var t,e,n=0,i=0,s="";e=o.charAt(i++);~e&&(t=n%4?64*t+e:e,n++%4)?s+=String.fromCharCode(255&t>>(-2*n&6)):0)e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e);return s};var C=function(){function r(o){o===void 0&&(o={}),this.load(o||{})}return r.prototype.load=function(o){for(var t=0,e=Object.entries(o);t<e.length;t++){var n=e[t],i=n[0],s=n[1];this[i]=s}this.id=o.id!==void 0?o.id:"",this.created=o.created!==void 0?o.created:"",this.updated=o.updated!==void 0?o.updated:""},Object.defineProperty(r.prototype,"isNew",{get:function(){return!this.id},enumerable:!1,configurable:!0}),r.prototype.clone=function(){return new this.constructor(JSON.parse(JSON.stringify(this)))},r.prototype.export=function(){return Object.assign({},this)},r}(),P=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.load=function(t){r.prototype.load.call(this,t),this.collectionId=typeof t.collectionId=="string"?t.collectionId:"",this.collectionName=typeof t.collectionName=="string"?t.collectionName:"",this.expand=typeof t.expand=="object"&&t.expand!==null?t.expand:{}},o}(C),A=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.load=function(t){r.prototype.load.call(this,t),this.avatar=typeof t.avatar=="number"?t.avatar:0,this.email=typeof t.email=="string"?t.email:""},o}(C),Y=function(){function r(){this.baseToken="",this.baseModel=null,this._onChangeCallbacks=[]}return Object.defineProperty(r.prototype,"token",{get:function(){return this.baseToken},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"model",{get:function(){return this.baseModel},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"isValid",{get:function(){return!function(o,t){t===void 0&&(t=0);var e=N(o);return!(Object.keys(e).length>0&&(!e.exp||e.exp-t>Date.now()/1e3))}(this.token)},enumerable:!1,configurable:!0}),r.prototype.save=function(o,t){this.baseToken=o||"",this.baseModel=t!==null&&typeof t=="object"?t.collectionId!==void 0?new P(t):new A(t):null,this.triggerChange()},r.prototype.clear=function(){this.baseToken="",this.baseModel=null,this.triggerChange()},r.prototype.loadFromCookie=function(o,t){t===void 0&&(t="pb_auth");var e=function(i,s){var a={};if(typeof i!="string")return a;for(var c=Object.assign({},s||{}).decode||F,h=0;h<i.length;){var u=i.indexOf("=",h);if(u===-1)break;var l=i.indexOf(";",h);if(l===-1)l=i.length;else if(l<u){h=i.lastIndexOf(";",u-1)+1;continue}var d=i.slice(h,u).trim();if(a[d]===void 0){var y=i.slice(u+1,l).trim();y.charCodeAt(0)===34&&(y=y.slice(1,-1));try{a[d]=c(y)}catch{a[d]=y}}h=l+1}return a}(o||"")[t]||"",n={};try{(typeof(n=JSON.parse(e))===null||typeof n!="object"||Array.isArray(n))&&(n={})}catch{}this.save(n.token||"",n.model||null)},r.prototype.exportToCookie=function(o,t){var e,n,i;t===void 0&&(t="pb_auth");var s={secure:!0,sameSite:!0,httpOnly:!0,path:"/"},a=N(this.token);a?.exp?s.expires=new Date(1e3*a.exp):s.expires=new Date("1970-01-01"),o=Object.assign({},s,o);var c={token:this.token,model:((e=this.model)===null||e===void 0?void 0:e.export())||null},h=j(t,JSON.stringify(c),o),u=typeof Blob<"u"?new Blob([h]).size:h.length;return c.model&&u>4096&&(c.model={id:(n=c?.model)===null||n===void 0?void 0:n.id,email:(i=c?.model)===null||i===void 0?void 0:i.email},this.model instanceof P&&(c.model.username=this.model.username,c.model.verified=this.model.verified,c.model.collectionId=this.model.collectionId),h=j(t,JSON.stringify(c),o)),h},r.prototype.onChange=function(o,t){var e=this;return t===void 0&&(t=!1),this._onChangeCallbacks.push(o),t&&o(this.token,this.model),function(){for(var n=e._onChangeCallbacks.length-1;n>=0;n--)if(e._onChangeCallbacks[n]==o)return delete e._onChangeCallbacks[n],void e._onChangeCallbacks.splice(n,1)}},r.prototype.triggerChange=function(){for(var o=0,t=this._onChangeCallbacks;o<t.length;o++){var e=t[o];e&&e(this.token,this.model)}},r}(),H=function(r){function o(t){t===void 0&&(t="pocketbase_auth");var e=r.call(this)||this;return e.storageFallback={},e.storageKey=t,e}return p(o,r),Object.defineProperty(o.prototype,"token",{get:function(){return(this._storageGet(this.storageKey)||{}).token||""},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"model",{get:function(){var t,e=this._storageGet(this.storageKey)||{};return e===null||typeof e!="object"||e.model===null||typeof e.model!="object"?null:((t=e.model)===null||t===void 0?void 0:t.collectionId)===void 0?new A(e.model):new P(e.model)},enumerable:!1,configurable:!0}),o.prototype.save=function(t,e){this._storageSet(this.storageKey,{token:t,model:e}),r.prototype.save.call(this,t,e)},o.prototype.clear=function(){this._storageRemove(this.storageKey),r.prototype.clear.call(this)},o.prototype._storageGet=function(t){if(typeof window<"u"&&window?.localStorage){var e=window.localStorage.getItem(t)||"";try{return JSON.parse(e)}catch{return e}}return this.storageFallback[t]},o.prototype._storageSet=function(t,e){if(typeof window<"u"&&window?.localStorage){var n=e;typeof e!="string"&&(n=JSON.stringify(e)),window.localStorage.setItem(t,n)}else this.storageFallback[t]=e},o.prototype._storageRemove=function(t){var e;typeof window<"u"&&window?.localStorage&&((e=window.localStorage)===null||e===void 0||e.removeItem(t)),delete this.storageFallback[t]},o}(Y),O=function(r){this.client=r},J=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.getAll=function(t){return t===void 0&&(t={}),this.client.send("/api/settings",{method:"GET",params:t}).then(function(e){return e||{}})},o.prototype.update=function(t,e){return t===void 0&&(t={}),e===void 0&&(e={}),this.client.send("/api/settings",{method:"PATCH",params:e,body:t}).then(function(n){return n||{}})},o.prototype.testS3=function(t){return t===void 0&&(t={}),this.client.send("/api/settings/test/s3",{method:"POST",params:t}).then(function(){return!0})},o.prototype.testEmail=function(t,e,n){n===void 0&&(n={});var i={email:t,template:e};return this.client.send("/api/settings/test/email",{method:"POST",params:n,body:i}).then(function(){return!0})},o}(O),M=function(r,o,t,e,n){this.page=r>0?r:1,this.perPage=o>=0?o:0,this.totalItems=t>=0?t:0,this.totalPages=e>=0?e:0,this.items=n||[]},R=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.getFullList=function(t,e){return t===void 0&&(t=200),e===void 0&&(e={}),this._getFullList(this.baseCrudPath,t,e)},o.prototype.getList=function(t,e,n){return t===void 0&&(t=1),e===void 0&&(e=30),n===void 0&&(n={}),this._getList(this.baseCrudPath,t,e,n)},o.prototype.getFirstListItem=function(t,e){return e===void 0&&(e={}),this._getFirstListItem(this.baseCrudPath,t,e)},o.prototype.getOne=function(t,e){return e===void 0&&(e={}),this._getOne(this.baseCrudPath,t,e)},o.prototype.create=function(t,e){return t===void 0&&(t={}),e===void 0&&(e={}),this._create(this.baseCrudPath,t,e)},o.prototype.update=function(t,e,n){return e===void 0&&(e={}),n===void 0&&(n={}),this._update(this.baseCrudPath,t,e,n)},o.prototype.delete=function(t,e){return e===void 0&&(e={}),this._delete(this.baseCrudPath,t,e)},o}(function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype._getFullList=function(t,e,n){var i=this;e===void 0&&(e=100),n===void 0&&(n={});var s=[],a=function(c){return v(i,void 0,void 0,function(){return m(this,function(h){return[2,this._getList(t,c,e,n).then(function(u){var l=u,d=l.items,y=l.totalItems;return s=s.concat(d),d.length&&y>s.length?a(c+1):s})]})})};return a(1)},o.prototype._getList=function(t,e,n,i){var s=this;return e===void 0&&(e=1),n===void 0&&(n=30),i===void 0&&(i={}),i=Object.assign({page:e,perPage:n},i),this.client.send(t,{method:"GET",params:i}).then(function(a){var c=[];if(a?.items){a.items=a.items||[];for(var h=0,u=a.items;h<u.length;h++){var l=u[h];c.push(s.decode(l))}}return new M(a?.page||1,a?.perPage||0,a?.totalItems||0,a?.totalPages||0,c)})},o.prototype._getOne=function(t,e,n){var i=this;return n===void 0&&(n={}),this.client.send(t+"/"+encodeURIComponent(e),{method:"GET",params:n}).then(function(s){return i.decode(s)})},o.prototype._getFirstListItem=function(t,e,n){return n===void 0&&(n={}),n=Object.assign({filter:e,$cancelKey:"one_by_filter_"+t+"_"+e},n),this._getList(t,1,1,n).then(function(i){var s;if(!(!((s=i?.items)===null||s===void 0)&&s.length))throw new _({status:404,data:{code:404,message:"The requested resource wasn't found.",data:{}}});return i.items[0]})},o.prototype._create=function(t,e,n){var i=this;return e===void 0&&(e={}),n===void 0&&(n={}),this.client.send(t,{method:"POST",params:n,body:e}).then(function(s){return i.decode(s)})},o.prototype._update=function(t,e,n,i){var s=this;return n===void 0&&(n={}),i===void 0&&(i={}),this.client.send(t+"/"+encodeURIComponent(e),{method:"PATCH",params:i,body:n}).then(function(a){return s.decode(a)})},o.prototype._delete=function(t,e,n){return n===void 0&&(n={}),this.client.send(t+"/"+encodeURIComponent(e),{method:"DELETE",params:n}).then(function(){return!0})},o}(O)),K=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.decode=function(t){return new A(t)},Object.defineProperty(o.prototype,"baseCrudPath",{get:function(){return"/api/admins"},enumerable:!1,configurable:!0}),o.prototype.update=function(t,e,n){var i=this;return e===void 0&&(e={}),n===void 0&&(n={}),r.prototype.update.call(this,t,e,n).then(function(s){var a,c;return i.client.authStore.model&&((a=i.client.authStore.model)===null||a===void 0?void 0:a.collectionId)===void 0&&((c=i.client.authStore.model)===null||c===void 0?void 0:c.id)===s?.id&&i.client.authStore.save(i.client.authStore.token,s),s})},o.prototype.delete=function(t,e){var n=this;return e===void 0&&(e={}),r.prototype.delete.call(this,t,e).then(function(i){var s,a;return i&&n.client.authStore.model&&((s=n.client.authStore.model)===null||s===void 0?void 0:s.collectionId)===void 0&&((a=n.client.authStore.model)===null||a===void 0?void 0:a.id)===t&&n.client.authStore.clear(),i})},o.prototype.authResponse=function(t){var e=this.decode(t?.admin||{});return t?.token&&t?.admin&&this.client.authStore.save(t.token,e),Object.assign({},t,{token:t?.token||"",admin:e})},o.prototype.authWithPassword=function(t,e,n,i){return n===void 0&&(n={}),i===void 0&&(i={}),n=Object.assign({identity:t,password:e},n),this.client.send(this.baseCrudPath+"/auth-with-password",{method:"POST",params:i,body:n,headers:{Authorization:""}}).then(this.authResponse.bind(this))},o.prototype.authRefresh=function(t,e){return t===void 0&&(t={}),e===void 0&&(e={}),this.client.send(this.baseCrudPath+"/auth-refresh",{method:"POST",params:e,body:t}).then(this.authResponse.bind(this))},o.prototype.requestPasswordReset=function(t,e,n){return e===void 0&&(e={}),n===void 0&&(n={}),e=Object.assign({email:t},e),this.client.send(this.baseCrudPath+"/request-password-reset",{method:"POST",params:n,body:e}).then(function(){return!0})},o.prototype.confirmPasswordReset=function(t,e,n,i,s){return i===void 0&&(i={}),s===void 0&&(s={}),i=Object.assign({token:t,password:e,passwordConfirm:n},i),this.client.send(this.baseCrudPath+"/confirm-password-reset",{method:"POST",params:s,body:i}).then(function(){return!0})},o}(R),B=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.load=function(t){r.prototype.load.call(this,t),this.recordId=typeof t.recordId=="string"?t.recordId:"",this.collectionId=typeof t.collectionId=="string"?t.collectionId:"",this.provider=typeof t.provider=="string"?t.provider:"",this.providerId=typeof t.providerId=="string"?t.providerId:""},o}(C),W=function(r){function o(t,e){var n=r.call(this,t)||this;return n.collectionIdOrName=e,n}return p(o,r),o.prototype.decode=function(t){return new P(t)},Object.defineProperty(o.prototype,"baseCrudPath",{get:function(){return this.baseCollectionPath+"/records"},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"baseCollectionPath",{get:function(){return"/api/collections/"+encodeURIComponent(this.collectionIdOrName)},enumerable:!1,configurable:!0}),o.prototype.subscribeOne=function(t,e){return v(this,void 0,void 0,function(){return m(this,function(n){return console.warn("PocketBase: subscribeOne(recordId, callback) is deprecated. Please replace it with subscribe(recordId, callback)."),[2,this.client.realtime.subscribe(this.collectionIdOrName+"/"+t,e)]})})},o.prototype.subscribe=function(t,e){return v(this,void 0,void 0,function(){var n;return m(this,function(i){if(typeof t=="function")return console.warn("PocketBase: subscribe(callback) is deprecated. Please replace it with subscribe('*', callback)."),[2,this.client.realtime.subscribe(this.collectionIdOrName,t)];if(!e)throw new Error("Missing subscription callback.");if(t==="")throw new Error("Missing topic.");return n=this.collectionIdOrName,t!=="*"&&(n+="/"+t),[2,this.client.realtime.subscribe(n,e)]})})},o.prototype.unsubscribe=function(t){return v(this,void 0,void 0,function(){return m(this,function(e){return t==="*"?[2,this.client.realtime.unsubscribe(this.collectionIdOrName)]:t?[2,this.client.realtime.unsubscribe(this.collectionIdOrName+"/"+t)]:[2,this.client.realtime.unsubscribeByPrefix(this.collectionIdOrName)]})})},o.prototype.getFullList=function(t,e){return t===void 0&&(t=200),e===void 0&&(e={}),r.prototype.getFullList.call(this,t,e)},o.prototype.getList=function(t,e,n){return t===void 0&&(t=1),e===void 0&&(e=30),n===void 0&&(n={}),r.prototype.getList.call(this,t,e,n)},o.prototype.getFirstListItem=function(t,e){return e===void 0&&(e={}),r.prototype.getFirstListItem.call(this,t,e)},o.prototype.getOne=function(t,e){return e===void 0&&(e={}),r.prototype.getOne.call(this,t,e)},o.prototype.create=function(t,e){return t===void 0&&(t={}),e===void 0&&(e={}),r.prototype.create.call(this,t,e)},o.prototype.update=function(t,e,n){var i=this;return e===void 0&&(e={}),n===void 0&&(n={}),r.prototype.update.call(this,t,e,n).then(function(s){var a,c;return((a=i.client.authStore.model)===null||a===void 0?void 0:a.collectionId)!==void 0&&((c=i.client.authStore.model)===null||c===void 0?void 0:c.id)===s?.id&&i.client.authStore.save(i.client.authStore.token,s),s})},o.prototype.delete=function(t,e){var n=this;return e===void 0&&(e={}),r.prototype.delete.call(this,t,e).then(function(i){var s,a;return i&&((s=n.client.authStore.model)===null||s===void 0?void 0:s.collectionId)!==void 0&&((a=n.client.authStore.model)===null||a===void 0?void 0:a.id)===t&&n.client.authStore.clear(),i})},o.prototype.authResponse=function(t){var e=this.decode(t?.record||{});return this.client.authStore.save(t?.token,e),Object.assign({},t,{token:t?.token||"",record:e})},o.prototype.listAuthMethods=function(t){return t===void 0&&(t={}),this.client.send(this.baseCollectionPath+"/auth-methods",{method:"GET",params:t}).then(function(e){return Object.assign({},e,{usernamePassword:!!e?.usernamePassword,emailPassword:!!e?.emailPassword,authProviders:Array.isArray(e?.authProviders)?e?.authProviders:[]})})},o.prototype.authWithPassword=function(t,e,n,i){var s=this;return n===void 0&&(n={}),i===void 0&&(i={}),n=Object.assign({identity:t,password:e},n),this.client.send(this.baseCollectionPath+"/auth-with-password",{method:"POST",params:i,body:n,headers:{Authorization:""}}).then(function(a){return s.authResponse(a)})},o.prototype.authWithOAuth2=function(t,e,n,i,s,a,c){var h=this;return s===void 0&&(s={}),a===void 0&&(a={}),c===void 0&&(c={}),a=Object.assign({provider:t,code:e,codeVerifier:n,redirectUrl:i,createData:s},a),this.client.send(this.baseCollectionPath+"/auth-with-oauth2",{method:"POST",params:c,body:a}).then(function(u){return h.authResponse(u)})},o.prototype.authRefresh=function(t,e){var n=this;return t===void 0&&(t={}),e===void 0&&(e={}),this.client.send(this.baseCollectionPath+"/auth-refresh",{method:"POST",params:e,body:t}).then(function(i){return n.authResponse(i)})},o.prototype.requestPasswordReset=function(t,e,n){return e===void 0&&(e={}),n===void 0&&(n={}),e=Object.assign({email:t},e),this.client.send(this.baseCollectionPath+"/request-password-reset",{method:"POST",params:n,body:e}).then(function(){return!0})},o.prototype.confirmPasswordReset=function(t,e,n,i,s){return i===void 0&&(i={}),s===void 0&&(s={}),i=Object.assign({token:t,password:e,passwordConfirm:n},i),this.client.send(this.baseCollectionPath+"/confirm-password-reset",{method:"POST",params:s,body:i}).then(function(){return!0})},o.prototype.requestVerification=function(t,e,n){return e===void 0&&(e={}),n===void 0&&(n={}),e=Object.assign({email:t},e),this.client.send(this.baseCollectionPath+"/request-verification",{method:"POST",params:n,body:e}).then(function(){return!0})},o.prototype.confirmVerification=function(t,e,n){return e===void 0&&(e={}),n===void 0&&(n={}),e=Object.assign({token:t},e),this.client.send(this.baseCollectionPath+"/confirm-verification",{method:"POST",params:n,body:e}).then(function(){return!0})},o.prototype.requestEmailChange=function(t,e,n){return e===void 0&&(e={}),n===void 0&&(n={}),e=Object.assign({newEmail:t},e),this.client.send(this.baseCollectionPath+"/request-email-change",{method:"POST",params:n,body:e}).then(function(){return!0})},o.prototype.confirmEmailChange=function(t,e,n,i){return n===void 0&&(n={}),i===void 0&&(i={}),n=Object.assign({token:t,password:e},n),this.client.send(this.baseCollectionPath+"/confirm-email-change",{method:"POST",params:i,body:n}).then(function(){return!0})},o.prototype.listExternalAuths=function(t,e){return e===void 0&&(e={}),this.client.send(this.baseCrudPath+"/"+encodeURIComponent(t)+"/external-auths",{method:"GET",params:e}).then(function(n){var i=[];if(Array.isArray(n))for(var s=0,a=n;s<a.length;s++){var c=a[s];i.push(new B(c))}return i})},o.prototype.unlinkExternalAuth=function(t,e,n){return n===void 0&&(n={}),this.client.send(this.baseCrudPath+"/"+encodeURIComponent(t)+"/external-auths/"+encodeURIComponent(e),{method:"DELETE",params:n}).then(function(){return!0})},o}(R),z=function(){function r(o){o===void 0&&(o={}),this.load(o||{})}return r.prototype.load=function(o){this.id=o.id!==void 0?o.id:"",this.name=o.name!==void 0?o.name:"",this.type=o.type!==void 0?o.type:"text",this.system=!!o.system,this.required=!!o.required,this.unique=!!o.unique,this.options=typeof o.options=="object"&&o.options!==null?o.options:{}},r}(),V=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.load=function(t){r.prototype.load.call(this,t),this.system=!!t.system,this.name=typeof t.name=="string"?t.name:"",this.type=typeof t.type=="string"?t.type:"base",this.options=t.options!==void 0?t.options:{},this.listRule=typeof t.listRule=="string"?t.listRule:null,this.viewRule=typeof t.viewRule=="string"?t.viewRule:null,this.createRule=typeof t.createRule=="string"?t.createRule:null,this.updateRule=typeof t.updateRule=="string"?t.updateRule:null,this.deleteRule=typeof t.deleteRule=="string"?t.deleteRule:null,t.schema=Array.isArray(t.schema)?t.schema:[],this.schema=[];for(var e=0,n=t.schema;e<n.length;e++){var i=n[e];this.schema.push(new z(i))}},Object.defineProperty(o.prototype,"isBase",{get:function(){return this.type==="base"},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"isAuth",{get:function(){return this.type==="auth"},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"isSingle",{get:function(){return this.type==="single"},enumerable:!1,configurable:!0}),o}(C),$=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.decode=function(t){return new V(t)},Object.defineProperty(o.prototype,"baseCrudPath",{get:function(){return"/api/collections"},enumerable:!1,configurable:!0}),o.prototype.import=function(t,e,n){return e===void 0&&(e=!1),n===void 0&&(n={}),v(this,void 0,void 0,function(){return m(this,function(i){return[2,this.client.send(this.baseCrudPath+"/import",{method:"PUT",params:n,body:{collections:t,deleteMissing:e}}).then(function(){return!0})]})})},o}(R),x=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.load=function(t){r.prototype.load.call(this,t),t.remoteIp=t.remoteIp||t.ip,this.url=typeof t.url=="string"?t.url:"",this.method=typeof t.method=="string"?t.method:"GET",this.status=typeof t.status=="number"?t.status:200,this.auth=typeof t.auth=="string"?t.auth:"guest",this.remoteIp=typeof t.remoteIp=="string"?t.remoteIp:"",this.userIp=typeof t.userIp=="string"?t.userIp:"",this.referer=typeof t.referer=="string"?t.referer:"",this.userAgent=typeof t.userAgent=="string"?t.userAgent:"",this.meta=typeof t.meta=="object"&&t.meta!==null?t.meta:{}},o}(C),Q=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.getRequestsList=function(t,e,n){return t===void 0&&(t=1),e===void 0&&(e=30),n===void 0&&(n={}),n=Object.assign({page:t,perPage:e},n),this.client.send("/api/logs/requests",{method:"GET",params:n}).then(function(i){var s=[];if(i?.items){i.items=i?.items||[];for(var a=0,c=i.items;a<c.length;a++){var h=c[a];s.push(new x(h))}}return new M(i?.page||1,i?.perPage||0,i?.totalItems||0,i?.totalPages||0,s)})},o.prototype.getRequest=function(t,e){return e===void 0&&(e={}),this.client.send("/api/logs/requests/"+encodeURIComponent(t),{method:"GET",params:e}).then(function(n){return new x(n)})},o.prototype.getRequestsStats=function(t){return t===void 0&&(t={}),this.client.send("/api/logs/requests/stats",{method:"GET",params:t}).then(function(e){return e})},o}(O),X=function(r){function o(){var t=r!==null&&r.apply(this,arguments)||this;return t.clientId="",t.eventSource=null,t.subscriptions={},t.lastSentTopics=[],t.maxConnectTimeout=1e4,t.reconnectAttempts=0,t.maxReconnectAttempts=1/0,t.predefinedReconnectIntervals=[200,300,500,1e3,1200,1500,2e3],t.pendingConnects=[],t}return p(o,r),Object.defineProperty(o.prototype,"isConnected",{get:function(){return!!this.eventSource&&!!this.clientId&&!this.pendingConnects.length},enumerable:!1,configurable:!0}),o.prototype.subscribe=function(t,e){var n;return v(this,void 0,void 0,function(){var i,s=this;return m(this,function(a){switch(a.label){case 0:if(!t)throw new Error("topic must be set.");return i=function(c){var h,u=c;try{h=JSON.parse(u?.data)}catch{}e(h||{})},this.subscriptions[t]||(this.subscriptions[t]=[]),this.subscriptions[t].push(i),this.isConnected?[3,2]:[4,this.connect()];case 1:return a.sent(),[3,5];case 2:return this.subscriptions[t].length!==1?[3,4]:[4,this.submitSubscriptions()];case 3:return a.sent(),[3,5];case 4:(n=this.eventSource)===null||n===void 0||n.addEventListener(t,i),a.label=5;case 5:return[2,function(){return v(s,void 0,void 0,function(){return m(this,function(c){return[2,this.unsubscribeByTopicAndListener(t,i)]})})}]}})})},o.prototype.unsubscribe=function(t){var e;return v(this,void 0,void 0,function(){var n,i,s;return m(this,function(a){switch(a.label){case 0:if(!this.hasSubscriptionListeners(t))return[2];if(t){for(n=0,i=this.subscriptions[t];n<i.length;n++)s=i[n],(e=this.eventSource)===null||e===void 0||e.removeEventListener(t,s);delete this.subscriptions[t]}else this.subscriptions={};return this.hasSubscriptionListeners()?[3,1]:(this.disconnect(),[3,3]);case 1:return this.hasSubscriptionListeners(t)?[3,3]:[4,this.submitSubscriptions()];case 2:a.sent(),a.label=3;case 3:return[2]}})})},o.prototype.unsubscribeByPrefix=function(t){var e;return v(this,void 0,void 0,function(){var n,i,s,a,c;return m(this,function(h){switch(h.label){case 0:for(i in n=!1,this.subscriptions)if(i.startsWith(t)){for(n=!0,s=0,a=this.subscriptions[i];s<a.length;s++)c=a[s],(e=this.eventSource)===null||e===void 0||e.removeEventListener(i,c);delete this.subscriptions[i]}return n?this.hasSubscriptionListeners()?[4,this.submitSubscriptions()]:[3,2]:[2];case 1:return h.sent(),[3,3];case 2:this.disconnect(),h.label=3;case 3:return[2]}})})},o.prototype.unsubscribeByTopicAndListener=function(t,e){var n;return v(this,void 0,void 0,function(){var i,s;return m(this,function(a){switch(a.label){case 0:if(!Array.isArray(this.subscriptions[t])||!this.subscriptions[t].length)return[2];for(i=!1,s=this.subscriptions[t].length-1;s>=0;s--)this.subscriptions[t][s]===e&&(i=!0,delete this.subscriptions[t][s],this.subscriptions[t].splice(s,1),(n=this.eventSource)===null||n===void 0||n.removeEventListener(t,e));return i?(this.subscriptions[t].length||delete this.subscriptions[t],this.hasSubscriptionListeners()?[3,1]:(this.disconnect(),[3,3])):[2];case 1:return this.hasSubscriptionListeners(t)?[3,3]:[4,this.submitSubscriptions()];case 2:a.sent(),a.label=3;case 3:return[2]}})})},o.prototype.hasSubscriptionListeners=function(t){var e,n;if(this.subscriptions=this.subscriptions||{},t)return!!(!((e=this.subscriptions[t])===null||e===void 0)&&e.length);for(var i in this.subscriptions)if(!((n=this.subscriptions[i])===null||n===void 0)&&n.length)return!0;return!1},o.prototype.submitSubscriptions=function(){return v(this,void 0,void 0,function(){return m(this,function(t){return this.clientId?(this.addAllSubscriptionListeners(),this.lastSentTopics=this.getNonEmptySubscriptionTopics(),[2,this.client.send("/api/realtime",{method:"POST",body:{clientId:this.clientId,subscriptions:this.lastSentTopics},params:{$cancelKey:"realtime_"+this.clientId}}).catch(function(e){if(!e?.isAbort)throw e})]):[2]})})},o.prototype.getNonEmptySubscriptionTopics=function(){var t=[];for(var e in this.subscriptions)this.subscriptions[e].length&&t.push(e);return t},o.prototype.addAllSubscriptionListeners=function(){if(this.eventSource)for(var t in this.removeAllSubscriptionListeners(),this.subscriptions)for(var e=0,n=this.subscriptions[t];e<n.length;e++){var i=n[e];this.eventSource.addEventListener(t,i)}},o.prototype.removeAllSubscriptionListeners=function(){if(this.eventSource)for(var t in this.subscriptions)for(var e=0,n=this.subscriptions[t];e<n.length;e++){var i=n[e];this.eventSource.removeEventListener(t,i)}},o.prototype.connect=function(){return v(this,void 0,void 0,function(){var t=this;return m(this,function(e){return this.reconnectAttempts>0?[2]:[2,new Promise(function(n,i){t.pendingConnects.push({resolve:n,reject:i}),t.pendingConnects.length>1||t.initConnect()})]})})},o.prototype.initConnect=function(){var t=this;this.disconnect(!0),clearTimeout(this.connectTimeoutId),this.connectTimeoutId=setTimeout(function(){t.connectErrorHandler(new Error("EventSource connect took too long."))},this.maxConnectTimeout),this.eventSource=new EventSource(this.client.buildUrl("/api/realtime")),this.eventSource.onerror=function(e){t.connectErrorHandler(new Error("Failed to establish realtime connection."))},this.eventSource.addEventListener("PB_CONNECT",function(e){var n=e;t.clientId=n?.lastEventId,t.submitSubscriptions().then(function(){return v(t,void 0,void 0,function(){var i;return m(this,function(s){switch(s.label){case 0:i=3,s.label=1;case 1:return this.hasUnsentSubscriptions()&&i>0?(i--,[4,this.submitSubscriptions()]):[3,3];case 2:return s.sent(),[3,1];case 3:return[2]}})})}).then(function(){for(var i=0,s=t.pendingConnects;i<s.length;i++)s[i].resolve();t.pendingConnects=[],t.reconnectAttempts=0,clearTimeout(t.reconnectTimeoutId),clearTimeout(t.connectTimeoutId)}).catch(function(i){t.clientId="",t.connectErrorHandler(i)})})},o.prototype.hasUnsentSubscriptions=function(){var t=this.getNonEmptySubscriptionTopics();if(t.length!=this.lastSentTopics.length)return!0;for(var e=0,n=t;e<n.length;e++){var i=n[e];if(!this.lastSentTopics.includes(i))return!0}return!1},o.prototype.connectErrorHandler=function(t){var e=this;if(clearTimeout(this.connectTimeoutId),clearTimeout(this.reconnectTimeoutId),!this.clientId&&!this.reconnectAttempts||this.reconnectAttempts>this.maxReconnectAttempts){for(var n=0,i=this.pendingConnects;n<i.length;n++)i[n].reject(new _(t));this.disconnect()}else{this.disconnect(!0);var s=this.predefinedReconnectIntervals[this.reconnectAttempts]||this.predefinedReconnectIntervals[this.predefinedReconnectIntervals.length-1];this.reconnectAttempts++,this.reconnectTimeoutId=setTimeout(function(){e.initConnect()},s)}},o.prototype.disconnect=function(t){var e;if(t===void 0&&(t=!1),clearTimeout(this.connectTimeoutId),clearTimeout(this.reconnectTimeoutId),this.removeAllSubscriptionListeners(),(e=this.eventSource)===null||e===void 0||e.close(),this.eventSource=null,this.clientId="",!t){this.reconnectAttempts=0;for(var n=new _(new Error("Realtime disconnected.")),i=0,s=this.pendingConnects;i<s.length;i++)s[i].reject(n);this.pendingConnects=[]}},o}(O),Z=function(r){function o(){return r!==null&&r.apply(this,arguments)||this}return p(o,r),o.prototype.check=function(t){return t===void 0&&(t={}),this.client.send("/api/health",{method:"GET",params:t})},o}(O),tt=function(){function r(o,t,e){o===void 0&&(o="/"),e===void 0&&(e="en-US"),this.cancelControllers={},this.recordServices={},this.enableAutoCancellation=!0,this.baseUrl=o,this.lang=e,this.authStore=t||new H,this.admins=new K(this),this.collections=new $(this),this.logs=new Q(this),this.settings=new J(this),this.realtime=new X(this),this.health=new Z(this)}return r.prototype.collection=function(o){return this.recordServices[o]||(this.recordServices[o]=new W(this,o)),this.recordServices[o]},r.prototype.autoCancellation=function(o){return this.enableAutoCancellation=!!o,this},r.prototype.cancelRequest=function(o){return this.cancelControllers[o]&&(this.cancelControllers[o].abort(),delete this.cancelControllers[o]),this},r.prototype.cancelAllRequests=function(){for(var o in this.cancelControllers)this.cancelControllers[o].abort();return this.cancelControllers={},this},r.prototype.send=function(o,t){var e,n,i,s,a,c,h,u;return v(this,void 0,void 0,function(){var l,d,y,g,k,q=this;return m(this,function(at){return(l=Object.assign({method:"GET"},t)).body&&l.body.constructor.name!=="FormData"&&(typeof l.body!="string"&&(l.body=JSON.stringify(l.body)),((e=l?.headers)===null||e===void 0?void 0:e["Content-Type"])===void 0&&(l.headers=Object.assign({},l.headers,{"Content-Type":"application/json"}))),((n=l?.headers)===null||n===void 0?void 0:n["Accept-Language"])===void 0&&(l.headers=Object.assign({},l.headers,{"Accept-Language":this.lang})),!((i=this.authStore)===null||i===void 0)&&i.token&&((s=l?.headers)===null||s===void 0?void 0:s.Authorization)===void 0&&(l.headers=Object.assign({},l.headers,{Authorization:this.authStore.token})),this.enableAutoCancellation&&((a=l.params)===null||a===void 0?void 0:a.$autoCancel)!==!1&&(d=((c=l.params)===null||c===void 0?void 0:c.$cancelKey)||(l.method||"GET")+o,this.cancelRequest(d),y=new AbortController,this.cancelControllers[d]=y,l.signal=y.signal),(h=l.params)===null||h===void 0||delete h.$autoCancel,(u=l.params)===null||u===void 0||delete u.$cancelKey,g=this.buildUrl(o),l.params!==void 0&&((k=this.serializeQueryParams(l.params))&&(g+=(g.includes("?")?"&":"?")+k),delete l.params),this.beforeSend&&(l=Object.assign({},this.beforeSend(g,l))),[2,fetch(g,l).then(function(b){return v(q,void 0,void 0,function(){var w;return m(this,function(S){switch(S.label){case 0:w={},S.label=1;case 1:return S.trys.push([1,3,,4]),[4,b.json()];case 2:return w=S.sent(),[3,4];case 3:return S.sent(),[3,4];case 4:if(this.afterSend&&(w=this.afterSend(b,w)),b.status>=400)throw new _({url:b.url,status:b.status,data:w});return[2,w]}})})}).catch(function(b){throw new _(b)})]})})},r.prototype.getFileUrl=function(o,t,e){e===void 0&&(e={});var n=[];n.push("api"),n.push("files"),n.push(encodeURIComponent(o.collectionId||o.collectionName)),n.push(encodeURIComponent(o.id)),n.push(encodeURIComponent(t));var i=this.buildUrl(n.join("/"));if(Object.keys(e).length){var s=new URLSearchParams(e);i+=(i.includes("?")?"&":"?")+s}return i},r.prototype.buildUrl=function(o){var t=this.baseUrl+(this.baseUrl.endsWith("/")?"":"/");return o&&(t+=o.startsWith("/")?o.substring(1):o),t},r.prototype.serializeQueryParams=function(o){var t=[];for(var e in o)if(o[e]!==null){var n=o[e],i=encodeURIComponent(e);if(Array.isArray(n))for(var s=0,a=n;s<a.length;s++){var c=a[s];t.push(i+"="+encodeURIComponent(c))}else n instanceof Date?t.push(i+"="+encodeURIComponent(n.toISOString())):typeof n!==null&&typeof n=="object"?t.push(i+"="+encodeURIComponent(JSON.stringify(n))):t.push(i+"="+encodeURIComponent(n))}return t.join("&")},r}();function ut(r){const h=new Date(r).getTime();let l=new Date().getTime()-h,d={year:0,months_over:0,weeks_over:0,days_over:0};return d.year=Math.trunc(l/315576e5),l-=d.year*315576e5,d.months_over=Math.trunc(l/26298e5),l-=d.months_over*26298e5,d.weeks_over=Math.trunc(l/6048e5),l-=d.weeks_over*6048e5,d.days_over=Math.trunc(l/864e5),d}const et=r=>r?JSON.parse(JSON.stringify(r)):null;let U;U=localStorage.getItem("theme")||"light";const nt=f(U),ot=f("UTC");{nt.subscribe(r=>localStorage.setItem("theme",r));try{fetch("https://ipwho.is").then(r=>r.json()).then(r=>{r.success&&ot.set(r.timezone.id)})}catch(r){console.log(r)}}const lt=f(),ht=f([]);let it=D.PUBLIC_PB_URI;const rt=new tt(it),st=et(await rt.collection("users").getFullList(200,{filter:"role = 0"}))[0],dt=f(st),pt=f([]),ft=f([]),vt=f(""),mt=f("dashboard"),yt=f("projects"),bt=f(!1),gt=f(!1),wt=f(!1),St=f(!1),_t=f(!1),Ct=f(!1);export{tt as A,_t as a,Ct as b,wt as c,St as d,bt as e,mt as f,yt as g,ft as h,et as i,ht as j,dt as k,pt as l,vt as m,ut as n,ot as o,gt as s,nt as t,lt as u};