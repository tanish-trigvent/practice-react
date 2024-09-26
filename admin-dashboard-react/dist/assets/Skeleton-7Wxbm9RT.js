import{N as j,K as F,O as T,a9 as E,aa as D,_ as n,a4 as f,aR as w,aS as I,aT as O,c as u,V as P,W as G,aU as _,au as H,a7 as K,j as x,X as $,Y as L,aV as W,aB as z,aW as S}from"./index-7YwJOiqF.js";function Y(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function q(t){return parseFloat(t)}function J(t){return F("MuiMenuItem",t)}const p=j("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),Q=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],Z=(t,a)=>{const{ownerState:e}=t;return[a.root,e.dense&&a.dense,e.divider&&a.divider,!e.disableGutters&&a.gutters]},tt=t=>{const{disabled:a,dense:e,divider:s,disableGutters:o,selected:r,classes:i}=t,l=L({root:["root",e&&"dense",a&&"disabled",!o&&"gutters",s&&"divider",r&&"selected"]},J,i);return n({},i,l)},at=T(E,{shouldForwardProp:t=>D(t)||t==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:Z})(({theme:t,ownerState:a})=>n({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${p.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:f(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${p.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:f(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${p.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:f(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:f(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${p.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${p.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity},[`& + .${w.root}`]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},[`& + .${w.inset}`]:{marginLeft:52},[`& .${I.root}`]:{marginTop:0,marginBottom:0},[`& .${I.inset}`]:{paddingLeft:36},[`& .${O.root}`]:{minWidth:36}},!a.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&n({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{[`& .${O.root} svg`]:{fontSize:"1.25rem"}}))),dt=u.forwardRef(function(a,e){const s=P({props:a,name:"MuiMenuItem"}),{autoFocus:o=!1,component:r="li",dense:i=!1,divider:d=!1,disableGutters:l=!1,focusVisibleClassName:v,role:m="menuitem",tabIndex:c,className:g}=s,h=G(s,Q),k=u.useContext(_),R=u.useMemo(()=>({dense:i||k.dense||!1,disableGutters:l}),[k.dense,i,l]),C=u.useRef(null);H(()=>{o&&C.current&&C.current.focus()},[o]);const X=n({},s,{dense:R.dense,divider:d,disableGutters:l}),y=tt(s),A=K(C,e);let M;return s.disabled||(M=c!==void 0?c:-1),x.jsx(_.Provider,{value:R,children:x.jsx(at,n({ref:A,role:m,tabIndex:M,component:r,focusVisibleClassName:$(y.focusVisible,v),className:$(y.root,g)},h,{ownerState:X,classes:y}))})});function et(t){return F("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const st=["animation","className","component","height","style","variant","width"];let b=t=>t,B,N,U,V;const ot=t=>{const{classes:a,variant:e,animation:s,hasChildren:o,width:r,height:i}=t;return L({root:["root",e,s,o&&"withChildren",o&&!r&&"fitContent",o&&!i&&"heightAuto"]},et,a)},it=W(B||(B=b`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),nt=W(N||(N=b`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),rt=T("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=Y(t.shape.borderRadius)||"px",s=q(t.shape.borderRadius);return n({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:z(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${e}/${Math.round(s/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&S(U||(U=b`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),it),({ownerState:t,theme:a})=>t.animation==="wave"&&S(V||(V=b`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),nt,(a.vars||a).palette.action.hover)),ct=u.forwardRef(function(a,e){const s=P({props:a,name:"MuiSkeleton"}),{animation:o="pulse",className:r,component:i="span",height:d,style:l,variant:v="text",width:m}=s,c=G(s,st),g=n({},s,{animation:o,component:i,variant:v,hasChildren:!!c.children}),h=ot(g);return x.jsx(rt,n({as:i,ref:e,className:$(h.root,r),ownerState:g},c,{style:n({width:m,height:d},l)}))});export{dt as M,ct as S};
