(this["webpackJsonpreact-upload-download-files"]=this["webpackJsonpreact-upload-download-files"]||[]).push([[0],{225:function(e,t,a){e.exports=a(488)},278:function(e,t){},280:function(e,t){},289:function(e,t){},291:function(e,t){},316:function(e,t){},318:function(e,t){},319:function(e,t){},324:function(e,t){},326:function(e,t){},332:function(e,t){},334:function(e,t){},353:function(e,t){},365:function(e,t){},368:function(e,t){},394:function(e,t){},487:function(e,t,a){},488:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(78),c=a.n(l),o=a(67),s=a(13),i=a(19),u=a.n(i),m=a(41),p=a(79),d=a(121),f=a(20),b=(a(489),a(30)),h=a.n(b),E=a(492),v=a(491),g=a(221),w=a(493),j="http://localhost:3030",O=a(122);var y=function(e){var t=e.setUrl;return r.a.createElement("div",null,r.a.createElement(O.b,null),r.a.createElement(O.a,{sources:["local"],sourceKeys:{dropboxAppKey:"1dsf42dl1i2",instagramClientId:"d7aadf962m"},cloudName:"dcvjvqymt",uploadPreset:"lj3vitxo",buttonText:"Upload File",style:{color:"white",border:"none",width:"120px",backgroundColor:"#1890FF",borderRadius:"4px",height:"40px"},cropping:!1,onSuccess:function(e){console.log("result",e),t(e.info.secure_url)},onFailure:function(e){console.log("response",e)},logging:!1,customPublicId:"sample",eager:"w_400,h_300,c_pad|w_260,h_200,c_crop",use_filename:!0}))},x=function(e){var t=Object(n.useState)(null),a=Object(f.a)(t,2),l=(a[0],a[1],Object(n.useState)("")),c=Object(f.a)(l,2),o=c[0],s=c[1],i=Object(n.useState)(""),b=Object(f.a)(i,2),O=(b[0],b[1],Object(n.useState)({title:"",description:""})),x=Object(f.a)(O,2),k=x[0],S=x[1],N=Object(n.useState)(""),C=Object(f.a)(N,2),F=C[0],_=C[1],D=Object(n.useState)(!1),L=Object(f.a)(D,2),T=(L[0],L[1],Object(n.useRef)(),function(e){S(Object(d.a)(Object(d.a)({},k),{},Object(p.a)({},e.target.name,e.target.value)))}),A=function(){var t=Object(m.a)(u.a.mark((function t(a){var n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),console.log("why are you submitting"),t.prev=2,n=k.title,r=k.description,""===n.trim()||""===r.trim()){t.next=11;break}return _(""),t.next=8,h.a.post("".concat(j,"/upload"),{title:n,description:r,url:o});case 8:e.history.push("/list"),t.next=12;break;case 11:_("Please enter all the field values.");case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(2),t.t0.response&&_(t.t0.response.data);case 17:case"end":return t.stop()}}),t,null,[[2,14]])})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{setUrl:s}),r.a.createElement(E.a,{className:"search-form",onSubmit:function(e){return A(e)},style:{marginTop:"2rem"}},F&&r.a.createElement("p",{className:"errorMsg"},F),r.a.createElement(v.a,null,r.a.createElement(g.a,null,r.a.createElement(E.a.Group,{controlId:"title"},r.a.createElement(E.a.Control,{type:"text",name:"title",value:k.title||"",placeholder:"Enter title",onChange:T})))),r.a.createElement(v.a,null,r.a.createElement(g.a,null,r.a.createElement(E.a.Group,{controlId:"description"},r.a.createElement(E.a.Control,{type:"text",name:"description",value:k.description||"",placeholder:"Enter description",onChange:T})))),r.a.createElement("div",{className:"upload-section"}),r.a.createElement(w.a,{variant:"primary",type:"submit"},"Submit")))},k=function(){return r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"File Upload And Download"),r.a.createElement("nav",null,r.a.createElement(o.b,{activeClassName:"active",to:"/",exact:!0},"Home"),r.a.createElement(o.b,{activeClassName:"active",to:"/list"},"Files List")))},S=a(80),N=a.n(S);a(223);a(224),a(260);var C=function(){var e=Object(n.useState)([]),t=Object(f.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(""),o=Object(f.a)(c,2),s=o[0],i=o[1],p=Object(n.useState)(),d=Object(f.a)(p,2),b=(d[0],d[1]),E=Object(n.useState)(!1),v=Object(f.a)(E,2),g=v[0],w=v[1],O=Object(n.useState)(),y=Object(f.a)(O,2),x=y[0],k=y[1],S=Object(n.useState)({id:"",title:"",url:""}),C=Object(f.a)(S,2),F=C[0],_=C[1],D=Object(n.useState)(""),L=Object(f.a)(D,2),T=L[0],A=L[1],I=function(){var e=Object(m.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("url",t),e.prev=1,e.next=4,h.a.post("".concat(j,"/previewUrl"),{url:t}).then((function(e){console.log("res",e),k(e.data.preview.url)}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),e.t0.response&&400===e.t0.response.status&&i("Error while generating preview url");case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),U=r.a.useState(!1),P=Object(f.a)(U,2),R=P[0],B=P[1];Object(n.useEffect)((function(){(function(){var e=Object(m.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.get("".concat(j,"/getAllFiles"));case 3:t=e.sent,a=t.data,console.log("data",a),i(""),l(a),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),e.t0.response&&i(e.t0.response.data);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var M=function(){var e=Object(m.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.get("".concat(j,"/delete/").concat(t)).then((function(){"undefined"!==typeof window&&window.location.reload(!0)}));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),e.t0.response&&400===e.t0.response.status&&i("Error while deleting file. Try again later");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(m.a)(u.a.mark((function e(t,a,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _({id:t,title:a,url:n}),w(!0),e.prev=2,e.next=5,h.a.get("".concat(j,"/download/").concat(t),{responseType:"blob"});case 5:r=e.sent,b(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),e.t0.response&&400===e.t0.response.status&&i("Error while previewing file. Try again later");case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a,n){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"files-container"},r.a.createElement(N.a,{isOpen:R,onAfterOpen:function(){},onRequestClose:function(){b(),B(!1),w(!1)},style:{content:{top:"1%",left:"3%",width:"95%",height:"95vh",background:"white"}},contentLabel:"Example Modal"},r.a.createElement("a",{style:{float:"right",padding:"0.5rem 1rem",marginBottom:"1rem"},href:F.url,download:!0},"Download"),r.a.createElement("img",{src:x,alt:""})),r.a.createElement("div",{style:{marginBottom:"1rem"}},r.a.createElement("label",{style:{marginRight:"1rem",fontWeight:"bold"}},"Search"),r.a.createElement("input",{style:{paddingLeft:"0.5rem"},type:"text",onChange:function(e){return A(e.target.value.toLocaleLowerCase())}})),g?null:r.a.createElement(r.a.Fragment,null,s&&r.a.createElement("p",{className:"errorMsg"},s),r.a.createElement("table",{className:"files-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Description"),r.a.createElement("th",null,"File Name"),r.a.createElement("th",null,"Delete File"),r.a.createElement("th",null,"Download File"))),r.a.createElement("tbody",null,a.length>0?a.map((function(e){var t=e.url,a=e._id,n=e.title,l=e.description;if(n.toLowerCase().search(T)>-1||l.toLowerCase().search(T)>-1)return r.a.createElement("tr",{key:a},r.a.createElement("td",{className:"file-title"},n),r.a.createElement("td",{className:"file-description"},r.a.createElement("a",{href:"#/",onClick:function(){I(t),B(!0),q(a,n,t)}},l)),r.a.createElement("td",{className:"file-title"},n),r.a.createElement("td",null,r.a.createElement("a",{href:"#/",onClick:function(){return M(a)}},"Delete")),r.a.createElement("td",null,r.a.createElement("a",{href:t,download:!0},"Download")))})):r.a.createElement("tr",null,r.a.createElement("td",{colSpan:5,style:{fontWeight:"300"}},"No files found. Please add some."))))))},F=function(){return r.a.createElement(o.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(k,null),r.a.createElement("div",{className:"main-content"},r.a.createElement(s.c,null,r.a.createElement(s.a,{component:x,path:"/",exact:!0}),r.a.createElement(s.a,{component:C,path:"/list"})))))};a(486),a(487);N.a.setAppElement("body"),c.a.render(r.a.createElement(F,null),document.getElementById("root"))}},[[225,1,2]]]);
//# sourceMappingURL=main.5133aa1f.chunk.js.map