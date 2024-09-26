import{j as e,e as P,f as _,G as d,h as b,b as $,k as F,l as N,m as V,c as g,n as W,o as w,p as v,q as n,S as O,s as U,T as k,t as A,v as J,w as K,I as q}from"./index-7YwJOiqF.js";import{A as Q,D as X,G as C,T as M,d as Z,a as ee}from"./DataGrid-BmiEYi6k.js";import{u as te}from"./useTodo-Bca8PSIm.js";import"./Skeleton-7Wxbm9RT.js";const se=({control:c,name:o,label:u,options:j=[],getOptionLabel:D=l=>l.label||l,rules:f={},defaultValue:y=null,sx:x={},...i})=>e.jsx(P,{name:o,control:c,defaultValue:y||null,rules:f,render:({field:{onChange:l,onBlur:S,value:T,ref:r},fieldState:{error:m}})=>e.jsx(Q,{value:T,onChange:(p,h)=>{l(h?h.value:null)},sx:{...x,"& fieldset":{borderRadius:"12px"}},onBlur:S,options:j,getOptionLabel:D,renderInput:p=>e.jsx(_,{...p,label:u,inputRef:r,error:!!m,helperText:m?m.message:null}),...i})}),E=({disabled:c="false"})=>{const o=[{id:1,label:"todo",value:"todo"},{id:2,label:"In-Progress",value:"In-progress"},{id:3,label:"completed",value:"completed"},{id:4,label:"overDue",value:"overdue"}];return e.jsxs(d,{container:!0,spacing:3,children:[e.jsx(d,{item:!0,xs:12,children:e.jsx(b,{label:"Task Title",name:"title",required:!0,size:"small",fullWidth:!0,fontSize:"small"})}),e.jsx(d,{item:!0,xs:12,children:e.jsx(se,{name:"status",label:"Task Status",size:"small",options:o,disabled:c==="true"})}),e.jsx(d,{item:!0,xs:5.5,children:e.jsx(b,{label:"Start Time",name:"startTime",type:"datetime-local",size:"small"})}),e.jsx(d,{item:!0,xs:5.5,children:e.jsx(b,{label:"End Time",name:"endTime",type:"datetime-local",size:"small"})}),e.jsx(d,{item:!0,xs:12,children:e.jsx(b,{label:"Task Desription",name:"description",required:!0,multiline:!0,minRows:4,maxRows:4,fullWidth:!0})})]})},le=()=>{const c=$(t=>{var s,a;return(a=(s=t==null?void 0:t.userReducer)==null?void 0:s.user)==null?void 0:a._id}),{showModal:o,closeModal:u}=F(),j=N(),f=new URLSearchParams(j.search).get("search"),{addTodo:y,isAddingTodo:x,allTodo:i,updateTodo:l,deleteTodo:S,refetchTodo:T}=te(c,f||""),{showSnackbar:r}=V(),[m,p]=g.useState([]);g.useMemo(()=>{p(i==null?void 0:i.data)},[i]);const h=W().shape({title:w().required("Title is required"),status:w(),startTime:v().required("Start time is required").nullable().test("isAfter","You cannot select past dates",function(t){const s=n().subtract(1,"day");return n(t).isAfter(s)}),endTime:v().required("End time is required").nullable().test("isAfter","End time must be after start time",function(t){const{startTime:s}=this.parent;return n(t).isAfter(n(s))}),description:w().required("Description is required")}),I=[{field:"title",headerName:"Task Title",width:200,editable:!1},{field:"description",headerName:"Task Description",width:200,editable:!1},{field:"status",headerName:"Status",width:150,renderCell:t=>{let s="default",a="primary";switch(t.value){case"completed":s="#69f0ae",a="#00c853";break;case"In-progress":s="#90caf9",a="#1565c0";break;case"overDue":s="#ef9a9a",a="#c62828";break;default:s="#fff8e1",a="#ffc107"}return e.jsx(K,{variant:"filled",size:"small",label:t.value,sx:{bgcolor:s,color:a,borderColor:a}})}},{field:"actions",type:"actions",width:200,getActions:t=>[e.jsx(C,{icon:e.jsx(A,{children:e.jsx(M,{title:"edit",children:e.jsx(q,{onClick:()=>H(t.row),children:e.jsx(Z,{color:"primary"})})})}),label:"Edit",sx:{color:"lightgray"}}),e.jsx(C,{icon:e.jsx(A,{children:e.jsx(M,{title:"delete",children:e.jsx(q,{onClick:()=>B(t==null?void 0:t.row),children:e.jsx(ee,{color:"error"})})})}),label:"Delete",sx:{color:"lightgray"}})],renderHeader:()=>e.jsx(k,{children:"Action"})}],Y={title:"",description:"",status:"todo",startTime:n().format("YYYY-MM-DDTHH:mm"),endTime:n().add(1,"hour").format("YYYY-MM-DDTHH:mm")},R=async t=>{try{await y(t),r("Todo added successfully","success"),u()}catch(s){r(s.message,"error")}},z=()=>{o({title:"Add Todo",confirmText:"Save",onSubmit:R,content:e.jsx(E,{disabled:"true"}),isLoading:x,defaultValue:Y,validation:h})};g.useEffect(()=>{T()},[T,f]);const G=async t=>{try{await l(t),r("Todo updated successfully","success"),u()}catch(s){r(s.message,"error")}},H=t=>{o({title:"Edit Todo",confirmText:"Save",onSubmit:G,content:e.jsx(E,{disabled:"false"}),isLoading:x,defaultValue:t,validation:h})},B=t=>{o({title:"Delete Todo",confirmText:"Delete",onSubmit:L,defaultValue:t,content:e.jsx(k,{children:"Are you sure you want to delete this user?"})})},L=async t=>{try{await S(t._id),r("Todo deleted successfully","success"),u()}catch(s){r(s.message,"error")}};return e.jsx(O,{title:e.jsxs(U,{justifyContent:"space-between",direction:"row",alignItems:"center",children:[e.jsx(k,{variant:"h3",children:"To-do"}),e.jsx(A,{children:e.jsx(J,{variant:"contained",color:"secondary",onClick:z,children:"Add Todo +"})})]}),children:e.jsx(X,{columns:I,rows:m})})};export{le as default};
