(this["webpackJsonp@cosmofund/cosmoswap-frontend"]=this["webpackJsonp@cosmofund/cosmoswap-frontend"]||[]).push([[36],{1061:function(e,t,a){"use strict";(function(e){var c=a(270),n=a(5),s=a(6),i=a(16),r=a(10),j=a(11),o=a(2),l=a.n(o),b=a(513),d=a(1445),h=a(178),O=a(21),m=a(664),u=a(508),x=a(560),p=a(1451),g=a(505),f=a(1453),v=a(264),C=a(179),I=a(63),k=a(13),y=function(e){Object(r.a)(a,e);var t=Object(j.a)(a);function a(e){var c;return Object(n.a)(this,a),(c=t.call(this)).state={email:"",password:"",parent:e.parent,agree:!1,hidden:!0},c.handleChange=c.handleChange.bind(Object(i.a)(c)),c.handleSubmit=c.handleSubmit.bind(Object(i.a)(c)),c.showPassword=c.showPassword.bind(Object(i.a)(c)),c}return Object(s.a)(a,[{key:"handleChange",value:function(e,t){var a=t.name,n=t.value;"agree"===a?this.setState((function(e){return{agree:!e.agree}})):(n=n.trim(),this.setState(Object(c.a)({},a,n)))}},{key:"handleSubmit",value:function(e){this.state.agree?this.props.signUp(this.state):alert(this.props.t("You do not agree with the CosmoSwap Terms of Use and Privacy Policy"))}},{key:"showPassword",value:function(e){e.preventDefault(),this.setState((function(e){return{hidden:!e.hidden}}))}},{key:"componentDidMount",value:function(){this.props.isAuthenticated&&this.props.history.push("/my")}},{key:"componentDidUpdate",value:function(){this.props.isAuthenticated&&this.props.history.push("/my")}},{key:"render",value:function(){var e=this.handleChange,t=this.handleSubmit,a=this.showPassword,c=this.state,n=c.email,s=c.password,i=c.parent,r=c.agree,j=c.hidden,o=this.props.t;return Object(k.jsx)(m.a,{textAlign:"center",verticalAlign:"middle",children:Object(k.jsxs)(m.a.Column,{style:{maxWidth:450},children:[Object(k.jsx)(u.a,{as:"h2",textAlign:"center",children:" Sing Up"}),Object(k.jsxs)(x.a,{textAlign:"left",basic:!0,children:[Object(k.jsx)(p.a,{size:"large",onSubmit:t,children:Object(k.jsxs)(x.a,{stacked:!0,children:[Object(k.jsx)(p.a.Input,{required:!0,type:"email",id:"email",name:"email",label:o("Email"),placeholder:"my@email.com",fluid:!0,icon:"user",iconPosition:"left",value:n,onChange:e}),Object(k.jsx)(p.a.Input,{required:!0,type:j?"password":"text",id:"password",name:"password",label:o("Password"),placeholder:"Password",fluid:!0,icon:"lock",iconPosition:"left",action:{icon:j?"eye slash":"eye",onClick:a},pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",minLength:8,value:s,onChange:e,title:o("Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters")}),Object(k.jsx)(p.a.Input,{type:"number",min:"0",id:"parent",name:"parent",label:o("Referral ID (Optional)"),placeholder:"12345",fluid:!0,icon:"sitemap",iconPosition:"left",value:i,onChange:e}),Object(k.jsx)(p.a.Checkbox,{required:!0,id:"agree",name:"agree",label:o("I am over 18 years old, and I agree to CosmoSwap Terms of Use and Privacy Policy"),checked:r,onChange:e}),Object(k.jsx)(g.a,{type:"submit",fluid:!0,size:"large",children:o("Create account")})]})}),Object(k.jsx)(f.a,{children:Object(k.jsxs)("b",{children:[o("Already have a CosmoSwap account"),"? ",Object(k.jsx)(v.b,{to:"/signin",children:o("Sign In")})]})})]})]})})}}]),a}(l.a.Component);t.a=Object(h.b)((function(e){return{isAuthenticated:C.d.isAuthenticated(e),parent:C.d.getParent(e)}}),(function(e){return{signUp:function(t){return e(I.d.signUp(t))}}}))(Object(O.i)(Object(d.a)()(Object(b.hot)(e)(y))))}).call(this,a(268)(e))},1446:function(e,t,a){"use strict";a.r(t),function(e){var c=a(5),n=a(6),s=a(10),i=a(11),r=a(2),j=a(513),o=a(1445),l=a(502),b=a(521),d=a(1061),h=a(13),O=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.t;return Object(h.jsx)(b.a,{title:e("Sign Up")+" - CosmoSwap",children:Object(h.jsx)(l.a,{textAlign:"center",style:{padding:"5em 0em"},children:Object(h.jsx)(d.a,{})})})}}]),a}(r.Component);t.default=Object(j.hot)(e)(Object(o.a)()(O))}.call(this,a(268)(e))},514:function(e,t,a){"use strict";t.a=function(){return{target:"_blank",rel:"noreferrer noopener"}}},521:function(e,t,a){"use strict";var c=a(2),n=a(465),s=a(539),i=a(29),r=a(264),j=a(43),o=a(262),l=a(502),b=a(664),d=a(1452),h=a(266),O=a(237),m=a(514),u=(a(523),a(13)),x=function(){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("a",Object(i.a)(Object(i.a)({href:"https://t.me/CosmoFundChannel"},Object(m.a)()),{},{children:Object(u.jsx)(o.a,{src:"/icons/telegram.png",inline:!0})})),Object(u.jsx)("a",Object(i.a)(Object(i.a)({href:"https://twitter.com/CosmoFund"},Object(m.a)()),{},{children:Object(u.jsx)(o.a,{src:"/icons/twitter.png",inline:!0})})),Object(u.jsx)("a",Object(i.a)(Object(i.a)({href:"https://medium.com/@CosmoFund"},Object(m.a)()),{},{children:Object(u.jsx)(o.a,{src:"/icons/medium.png",inline:!0})}))]})},p=function(){var e=Object(h.useMediaPredicate)(O.b),t=Object(n.a)(),a=t.i18n,c=t.t;return Object(u.jsx)("footer",{className:Object(O.a)("footer",e),children:Object(u.jsx)("div",{className:"footer__bg",children:Object(u.jsxs)(l.a,{children:[Object(u.jsx)("div",{className:"footer__icons",children:Object(u.jsx)(x,{})}),Object(u.jsx)("div",{className:"footer__links",children:Object(u.jsxs)(b.a,{columns:5,stackable:!0,padded:!0,children:[Object(u.jsxs)(b.a.Column,{children:[Object(u.jsx)("b",{children:c("Farms")}),Object(u.jsxs)(d.a,{link:!0,children:[Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:r.b,to:j.a.bscFarm},Object(m.a)()),{},{children:c("Binance Farms")})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:r.b,to:j.a.ethFarm},Object(m.a)()),{},{children:c("Ethereum Farms")}))]})]}),Object(u.jsxs)(b.a.Column,{children:[Object(u.jsx)("b",{children:c("Services")}),Object(u.jsxs)(d.a,{link:!0,children:[Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:r.b,to:j.a.exchange},Object(m.a)()),{},{children:c("Exchange")})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:r.b,to:j.a.bridge},Object(m.a)()),{},{children:c("Cross-chain Bridge")})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:r.b,to:j.a.cupToken},Object(m.a)()),{},{children:"Cosmo Universal Power (CUP)"}))]})]}),Object(u.jsxs)(b.a.Column,{children:[Object(u.jsx)("b",{children:"CosmoFund NFTs"}),Object(u.jsxs)(d.a,{link:!0,children:[Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"https://opensea.io/assets/cosmomasks-main-collection"},Object(m.a)()),{},{children:"CosmoMasks"})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"https://opensea.io/assets/cosmobugs"},Object(m.a)()),{},{children:"CosmoBugs"})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"https://opensea.io/collection/cosmodoodle"},Object(m.a)()),{},{children:"CosmoDoodle"})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"https://opensea.io/collection/cosmoart"},Object(m.a)()),{},{children:"CosmoArt"})),Object(u.jsxs)(d.a.Item,Object(i.a)(Object(i.a)({as:r.b,to:j.a.nft},Object(m.a)()),{},{children:[c("More"),"..."]}))]})]}),Object(u.jsxs)(b.a.Column,{children:[Object(u.jsx)("b",{children:c("Info")}),Object(u.jsxs)(d.a,{link:!0,children:[Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("About")}),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"/cosmofund_whitepaper.pdf"},Object(m.a)()),{},{children:c("Whitepaper")})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"/"+a.language+"/cosmofund_roadmap.pdf"},Object(m.a)()),{},{children:c("Roadmap")})),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"/cosmofund_marketing_plan.pdf"},Object(m.a)()),{},{children:c("Marketing plan")})),Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("Tokenomics")}),Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("FAQ")}),Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("Smart Contracts")})]})]})]})}),Object(u.jsx)("div",{className:"footer__banner",children:Object(u.jsxs)("div",{className:"footer__copyright",children:[Object(u.jsx)(d.a,{link:!0,horizontal:!e,children:Object(u.jsxs)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"https://cosmofund.space/"},Object(m.a)()),{},{children:[c("copyright",{year:(new Date).getFullYear()}),"\xa0 "]}))}),Object(u.jsxs)(d.a,{link:!0,horizontal:!e,children:[Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("Terms and Conditions")}),Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("Privacy Policy")}),Object(u.jsx)(d.a.Item,Object(i.a)(Object(i.a)({as:"a",href:"mailto:support@cosmofund.space"},Object(m.a)()),{},{children:c("Contact Us")})),Object(u.jsx)(d.a.Item,{as:r.b,to:"#",children:c("Disclaimer")})]})]})})]})})})},g=a(159),f=a(178),v=a(663),C=a(1450),I=a(1455),k=a(179),y=a(63),w=function(){var e=Object(n.a)().t;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(v.a.Item,{header:!0,as:r.c,to:j.a.nft,children:"NFT"}),Object(u.jsx)(v.a.Item,{header:!0,as:r.c,to:j.a.farming,children:e("Farming")}),Object(u.jsx)(v.a.Item,{header:!0,as:r.c,exact:!0,to:j.a.exchange,children:e("Exchange")}),Object(u.jsx)(v.a.Item,{header:!0,as:r.c,to:j.a.bridge,children:e("Bridge")}),Object(u.jsx)(v.a.Item,{header:!0,as:r.c,to:j.a.cupToken,children:"CUP"}),Object(u.jsx)(v.a.Item,{header:!0,as:r.c,to:j.a.cosmovirtual,children:"CosmoVirtual"})]})},S=function(){var e=Object(n.a)().t,t=Object(f.c)();return Object(f.d)(k.d.isAuthenticated)?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(v.a.Item,{header:!0,as:r.b,exact:!0,to:j.a.dashboard,children:e("Dashboard")}),Object(u.jsx)(C.a.Divider,{}),Object(u.jsx)(C.a.Item,{as:"a",onClick:function(){t(y.d.signOut())},children:e("Sign Out")})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(v.a.Item,{header:!0,as:r.b,to:j.a.signin,children:e("Sign In")}),Object(u.jsx)(v.a.Item,{header:!0,as:r.b,to:j.a.signup,children:e("Sign Up")})]})},F=[{key:"en",value:"en",text:"EN"},{key:"cn",value:"cn",text:"CN"},{key:"ru",value:"ru",text:"RU"}],N=function(){var e=Object(c.useState)(!1),t=Object(g.a)(e,2),a=t[0],s=t[1],i=Object(h.useMediaPredicate)(O.b),b=Object(n.a)(),d=b.i18n,m=b.t,x=function(){s(!a)},p=function(e,t){d.changeLanguage(t.value)};return Object(f.d)(k.d.isAuthenticated)?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(v.a,{fixed:"top",size:"large",className:Object(O.a)("main-menu",i),children:Object(u.jsxs)(l.a,{children:[Object(u.jsxs)(v.a.Item,{header:!0,as:r.b,to:j.a.main,className:"logo",children:[Object(u.jsx)(o.a,{src:"/images/layout/logo.png",spaced:"right"}),m("projectTitle")]}),i?Object(u.jsxs)(v.a.Item,{onClick:x,position:"right",children:[Object(u.jsx)(C.a,{name:"lang",pointing:!0,className:"link item",options:F,value:d.language,onChange:p}),Object(u.jsx)(o.a,{src:"/icons/menu.png",inline:!0})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(w,{}),Object(u.jsxs)(v.a.Menu,{position:"right",children:[Object(u.jsx)(C.a,{text:m("Profile"),pointing:!0,className:"link item",children:Object(u.jsx)(C.a.Menu,{children:Object(u.jsx)(S,{})})}),Object(u.jsx)(C.a,{name:"lang",pointing:!0,className:"link item",options:F,value:d.language,onChange:p})]})]})]})}),i&&Object(u.jsxs)(I.a,{as:v.a,animation:"overlay",inverted:!0,onHide:function(){return s(!1)},vertical:!0,visible:a,children:[Object(u.jsx)(w,{}),Object(u.jsx)(S,{})]})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(v.a,{fixed:"top",size:"large",className:Object(O.a)("main-menu",i),children:Object(u.jsxs)(l.a,{children:[Object(u.jsxs)(v.a.Item,{header:!0,as:r.b,to:j.a.main,className:"logo",children:[Object(u.jsx)(o.a,{src:"/images/layout/logo.png",spaced:"right"}),m("projectTitle")]}),i?Object(u.jsxs)(v.a.Item,{onClick:x,position:"right",children:[Object(u.jsx)(C.a,{name:"lang",pointing:!0,className:"link item",options:F,value:d.language,onChange:p}),Object(u.jsx)(o.a,{src:"/icons/menu.png",inline:!0})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(w,{}),Object(u.jsxs)(v.a.Menu,{position:"right",children:[Object(u.jsx)(v.a.Item,{header:!0,as:r.b,to:j.a.signin,children:m("Sign In")}),Object(u.jsx)(C.a,{name:"lang",pointing:!0,className:"link item",options:F,value:d.language,onChange:p})]})]})]})}),i&&Object(u.jsxs)(I.a,{as:v.a,animation:"overlay",inverted:!0,onHide:function(){return s(!1)},vertical:!0,visible:a,children:[Object(u.jsx)(w,{}),Object(u.jsx)(S,{})]})]})},P=a(21),A=function(){var e=Object(P.h)(),t=Object(c.useState)(!1),a=Object(g.a)(t,2),n=a[0],s=a[1];Object(c.useEffect)((function(){i()}),[e]);var i=function(){window.scroll({top:0,left:0,behavior:"smooth"})};return window.onscroll=function(){var e=window.scrollY;s(e>600)},n?Object(u.jsx)(o.a,{src:"/images/layout/top.png",onClick:i,className:"scrollTop"}):null};t.a=function(e){var t=e.title,a=e.children,c=e.isEmpty,i=e.className,r=Object(n.a)().i18n;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(s.a,{children:[Object(u.jsx)("html",{lang:r.language}),Object(u.jsx)("meta",{charSet:"utf-8"}),Object(u.jsx)("title",{children:t})]}),!c&&Object(u.jsx)(N,{}),Object(u.jsx)("main",{className:i,children:a}),!c&&Object(u.jsx)(p,{}),Object(u.jsx)(A,{})]})}},523:function(e,t,a){}}]);
//# sourceMappingURL=36.40972ba0.chunk.js.map