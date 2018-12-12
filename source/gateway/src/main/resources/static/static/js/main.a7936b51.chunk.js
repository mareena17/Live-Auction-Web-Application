(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{154:function(e,t,a){e.exports=a(358)},320:function(e,t){},349:function(e,t){},350:function(e,t,a){},356:function(e,t,a){},358:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(29),s=a.n(o),i=a(28),c=a(23),l="SET_LOGIN_PENDING",m="SET_LOGIN_SUCCESS",d="SET_LOGIN_ERROR";function u(e){return{type:l,isLoginPending:e}}function p(e){return{type:m,isLoginSuccess:e}}function h(e){return{type:d,loginError:e}}var g,f=a(66),E={SET_AUTHENTICATION:"SET_AUTHENTICATION",FETCH_LOGIN_DETAILS_REQUESTED:"FETCH_LOGIN_DETAILS_REQUESTED",FETCH_LOGIN_DETAILS_SUCCEEDED:"FETCH_LOGIN_DETAILS_SUCCEEDED",FETCH_LOGIN_DETAILS_FAILURE:"FETCH_LOGIN_DETAILS_FAILURE",SET_USER_DETAILS:"SET_USER_DETAILS",USER_LOGOUT:"USER_LOGOUT",ITEMS_DIALOG_OPEN:"ITEMS_DIALOG_OPEN",ITEMS_DIALOG_CLOSE:"ITEMS_DIALOG_CLOSE"},w={email:"",firstName:"",lastName:""},b=a(25),y=a(367),v=a(362),x=a(35),O=a.n(x),C=Object(y.a)(E.SET_AUTHENTICATION),j={isAuthenticated:!1,accessToken:null,refreshToken:null},S=Object(v.a)((g={},Object(b.a)(g,E.SET_AUTHENTICATION,function(e,t){return t.error?e:O.a.merge({},e,t.payload)}),Object(b.a)(g,E.USER_LOGOUT,function(){return j}),g),j),N={itemsDialogOpen:!1},P=Object(c.c)({login:function(e,t){return function(a){a(u(!0)),a(p(!1)),a(h(null)),function(e,t,a){var n=this;setTimeout(function(){return e===n.state.email&&t===n.state.password?a(null):a(new Error("Invalid email and password"))},1e3)}(e,t,function(e){a(u(!1)),a(e?h(e):p(!0))})}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E.SET_CURRENT_USER:return Object(f.a)({},e,{email:t.payload.email,firstName:t.payload.firstName,lastName:t.payload.lastName});default:return e}},auth:S,items:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{itemsDefaults:N};switch((arguments.length>1?arguments[1]:void 0).type){case E.ITEMS_DIALOG_OPEN:return Object(f.a)({},e,{itemsDialogOpen:!0});case E.ITEMS_DIALOG_CLOSE:return Object(f.a)({},e,{itemsDialogOpen:!1});default:return e}}}),T=a(140),F=a(141),k=a.n(F),U=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||c.d,D=Object(c.e)(P,U(Object(c.a)(T.a,k.a))),I=a(8),L=a(9),_=a(11),B=a(10),A=a(12),M=a(364),W=a(365),R=a(361),G=a(363),H=a(15),q=a(5),z=a.n(q),V=a(26),J=a.n(V),Q=a(142),$=a.n(Q),X=function(e){function t(){var e,a;Object(I.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(_.a)(this,(e=Object(B.a)(t)).call.apply(e,[this].concat(r)))).goBack=function(){a.props.history&&a.props.history.goBack()},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.wrapper},r.a.createElement($.a,{color:"error",fontSize:"large",classes:{root:e.sad404}}),r.a.createElement(z.a,{variant:"h1",color:"primary",align:"center",classes:{root:e.notFound}},"404"),r.a.createElement(z.a,{variant:"body1",color:"primary",align:"center",classes:{root:e.notFound}},"We are sorry but the page you are looking for was not found..."),r.a.createElement(J.a,{className:e.backBtn,onClick:this.goBack,color:"secondary",variant:"contained"},"Go Back"))}}]),t}(n.Component),Y=Object(H.withStyles)(function(){return{wrapper:{display:"flex",flexDirection:"column",marginTop:"250px",justifyContent:"center"},sad404:{fontSize:100,margin:"auto"},notFound:{fontFamily:"Lucida Console, Monaco, monospace"},backBtn:{margin:"auto",marginTop:"15px",marginBottom:"15px",padding:"5px",textTransform:"none"}}})(X),K=a(366),Z=a(360),ee=a(22),te=a.n(ee),ae=a(143),ne=a.n(ae).a.create({headers:{"Content-Type":"application/json"}});ne.interceptors.request.use(function(e){var t;if((t=e.url,re.find(function(e){return-1!==t.indexOf(e)}))||e.headers.Authorization)return e.headers["Content-Type"]="application/x-www-form-urlencoded",e.headers.Authorization="Basic YnJvd3Nlcjo=",e;var a=D.getState().auth,n=O.a.get(a,"accessToken");return n&&(e.headers.Authorization="Bearer ".concat(n)),e},function(e){return Promise.reject(e)}),ne.interceptors.response.use();var re=["/uaa/oauth/token","/register","/resetPassword","/forgotPassword"];ne.interceptors.response.use(function(e){var t=O.a.get(e,"request.responseURL");if(t&&-1!==t.indexOf("/uaa/oauth/token")){var a=O.a.get(e,"data.access_token"),n=O.a.get(e,"data.refresh_token"),r=O.a.get(e,"data.expires_in"),o=O.a.get(e,"data.scope");D.dispatch(C({isAuthenticated:!0,expires:r,accessToken:a,refreshToken:n,scope:o}))}return e},function(e){var t=e.response;return t&&401===t.status&&D.dispatch(le()),Promise.reject(e)});var oe=ne;a(261);var se=function(e){return function(t){return function(e){var t=new URLSearchParams;return t.append("grant_type","password"),t.append("username",e.username),t.append("password",e.password),t.append("scope","ui"),oe.post("/uaa/oauth/token",t.toString())}(e).then(function(){t(ce())})}},ie=function(e,t,a){return function(e){return oe.post("/uaa/auth/register",{firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password})}(e).then(function(){t()}).catch(function(e){a(e)})},ce=function(){return function(e){return new Promise(function(t){return oe.get("/accounts/current").then(function(a){var n=a.data;return e({type:E.SET_CURRENT_USER,payload:n}),t(n)})})}},le=function(){return{type:E.USER_LOGOUT}},me=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.username,r=t.password;(0,a.props.loginUser)({username:n,password:r}).then(function(){return a.handleSuccess()}).catch(function(e){return a.handleError(e)})},a.handleSuccess=function(){a.resetForm();var e=a.props;e.location;e.history.push("/home")},a.handleError=function(e){a.setState({errorFlag:!0,errorMessage:"Username or Password is incorrect.  Please try again.",resendFlag:!1})},a.resetForm=function(){a.setState({username:"",password:"",errorFlag:!1,errorMessage:""})},a.handleChange=function(e){return function(t){a.setState(Object(b.a)({},e,t.target.value))}},a.state={username:"",password:"",errorFlag:!1,errorMessage:""},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.loginFormWrapper},r.a.createElement(z.a,{variant:"h1",color:"primary",align:"center",classes:{root:e.appName}},"BidBig"),r.a.createElement("form",{onSubmit:this.handleSubmit,className:e.loginForm},r.a.createElement(te.a,{id:"username",type:"text",label:"Username",value:this.state.username,required:!0,className:e.textField,onChange:this.handleChange("username")}),r.a.createElement(te.a,{id:"password",type:"password",label:"Password",value:this.state.password,required:!0,className:"".concat(e.textField," ","login-password"),onChange:this.handleChange("password")}),r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.loginBtn,type:"submit"}," ","Login")),this.state.errorFlag&&r.a.createElement(z.a,{variant:"body1",color:"error",align:"center"}," ",this.state.errorMessage,"  "),r.a.createElement(z.a,{variant:"body1",color:"inherit",align:"center"},"Don't have an account yet?"," ",r.a.createElement(Z.a,{to:"/register",style:{color:"inherit"}},"Register Here")),r.a.createElement(z.a,{variant:"body1",color:"inherit",align:"center"},"Forgot password?","  ",r.a.createElement(Z.a,{to:"/forgot-password",style:{color:"inherit"}},"Reset Password")))}}]),t}(n.Component),de=Object(K.a)(Object(H.withStyles)(function(){return{loginFormWrapper:{display:"flex",margin:"auto",marginTop:"20px",flexDirection:"column",width:"40vw",padding:15},loginForm:{display:"flex",margin:"auto",flexDirection:"column",width:"40vw"},appName:{fontFamily:"Lucida Console, Monaco, monospace"},textField:{margin:"auto",width:"30vw"},loginBtn:{margin:"auto",marginTop:"15px",marginBottom:"15px",padding:"5px",width:"30vw"}}})(Object(i.b)(function(e,t){return{}},function(e,t){return Object(c.b)({loginUser:se},e)})(me))),ue=(a(320),a(44)),pe=a.n(ue),he=a(65),ge=a.n(he),fe=a(43),Ee=a.n(fe),we=a(34),be=a.n(we),ye=a(55),ve=a.n(ye),xe=a(45),Oe=a.n(xe),Ce=a(57),je=a.n(Ce),Se=a(56),Ne=a.n(Se),Pe=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).resetForm=function(){a.setState({name:"",username:"",email:"",password:"",confirmPassword:"",showPassword:!1,showConfirmPassword:!1,passwordUnmatchError:!1,passwordUnmatchHelperText:"",registrationSuccessful:!1,signUpError:!1,signUpErrorText:""})},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.name,r=t.username,o=t.email,s=t.password;(0,a.props.registerUser)({name:n,username:r,email:o,password:s},a.handleSuccess,a.handleError).then(function(){return a.handleSuccess()}).catch(function(e){return a.handleError(e)})},a.handleSuccess=function(){a.resetForm(),a.setState({registrationSuccessful:!0})},a.handleError=function(e){console.log("Error in Sign Up. Please try again later. ",e),a.setState({signUpError:!0,signUpErrorText:"Error in Sign Up. Please try again later."})},a.handleClickShowPassword=function(){a.setState(function(e){return{showPassword:!e.showPassword}})},a.handleClickShowConfirmPassword=function(){a.setState(function(){return{showConfirmPassword:!a.state.showConfirmPassword}})},a.handleChange=function(e){return function(t){a.setState(Object(b.a)({},e,t.target.value))}},a.handlePasswordChange=function(e){a.setState({confirmPassword:e.target.value},a.checkIfPasswordsMatch)},a.state={name:"",username:"",email:"",password:"",confirmPassword:"",showPassword:!1,showConfirmPassword:!1,passwordUnmatchError:!1,passwordUnmatchHelperText:"",registrationSuccessful:!1,signUpError:!1,signUpErrorText:""},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"componentDidMount",value:function(){this.setState({registrationSuccessful:!1})}},{key:"checkIfPasswordsMatch",value:function(){var e=this.state;e.password!==e.confirmPassword?this.setState({passwordUnmatchError:!0,passwordUnmatchHelperText:"Passwords do not match."}):this.setState({passwordUnmatchError:!1,passwordUnmatchHelperText:""})}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.signupPage},r.a.createElement(z.a,{variant:"h1",color:"primary",align:"center",classes:{root:e.appName}},"BidBig"),this.state.registrationSuccessful?r.a.createElement(z.a,{variant:"h2",align:"center"},"Congratulations! You have been successfully registered.",r.a.createElement("br",null),r.a.createElement(Z.a,{to:"/login",style:{color:"inherit"}},"Login")," ","to get started."):r.a.createElement("div",null,r.a.createElement(z.a,{variant:"title",align:"center",classes:{root:e.signUpHeading}},"Create your BidBig Account"),r.a.createElement("form",{onSubmit:this.handleSubmit,className:e.signUpForm},r.a.createElement(te.a,{id:"name",type:"text",label:"Name",inputProps:{maxLength:255},value:this.state.name,required:!0,className:e.textField,onChange:this.handleChange("name")}),r.a.createElement(te.a,{id:"userame",type:"text",label:"Username",value:this.state.username,required:!0,className:e.textField,onChange:this.handleChange("username")}),r.a.createElement(te.a,{id:"email",type:"email",label:"Email",value:this.state.email,required:!0,className:"".concat(e.textField," ","login-email"),onChange:this.handleChange("email")}),r.a.createElement(pe.a,{className:"".concat(e.textField," ","signup-field"),required:!0,margin:"normal"},r.a.createElement(Ee.a,{htmlFor:"password"},"Password"),r.a.createElement(be.a,{id:"password",value:this.state.password,inputProps:{minLength:6},type:this.state.showPassword?"text":"password",onChange:this.handleChange("password"),endAdornment:r.a.createElement(ve.a,{position:"end"},r.a.createElement(Oe.a,{onClick:this.handleClickShowPassword},this.state.showPassword?r.a.createElement(Ne.a,null):r.a.createElement(je.a,null)))})),r.a.createElement(pe.a,{className:"".concat(e.textField," ","main-entry-signup-field"),required:!0,margin:"normal"},r.a.createElement(Ee.a,{htmlFor:"confirmPassword"},"Re-enter password"),r.a.createElement(be.a,{id:"confirmPassword",className:"entry-signup-confirmpassword",value:this.state.confirmPassword,inputProps:{minLength:6},type:this.state.showConfirmPassword?"text":"password",onChange:this.handlePasswordChange,endAdornment:r.a.createElement(ve.a,{position:"end"},r.a.createElement(Oe.a,{onClick:this.handleClickShowConfirmPassword},this.state.showConfirmPassword?r.a.createElement(Ne.a,null):r.a.createElement(je.a,null)))}),this.state.passwordUnmatchError&&r.a.createElement(ge.a,{error:!0}," ",this.state.passwordUnmatchHelperText," ")),r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.signUpBtn,type:"submit"}," ","Create Account")),r.a.createElement(z.a,{type:"body1",align:"center"},"Already have an account?"," ",r.a.createElement(Z.a,{to:"/login",style:{color:"inherit"}},"Sign In")),r.a.createElement(z.a,{type:"body1",align:"center",style:{paddingTop:"10px",color:"red"}},this.state.signUpError&&this.state.signUpErrorText)))}}]),t}(n.Component),Te=Object(K.a)(Object(H.withStyles)(function(){return{signupPage:{display:"flex",flexDirection:"column",alignItems:"center",alignSelf:"center",padding:15},signUpForm:{display:"flex",flexDirection:"column",flexWrap:"wrap",padding:"10px",alignItems:"center"},appName:{marginTop:20,fontFamily:"Lucida Console, Monaco, monospace"},signUpHeading:{marginTop:20,fontFamily:"Lucida Console, Monaco, monospace"},textField:{margin:"auto",width:"30vw"},signUpBtn:{margin:"auto",width:"30vw",marginTop:"15px",marginBottom:"15px",padding:"5px",textTransform:"none"}}})(Object(i.b)(function(e,t){return{}},function(e,t){return Object(c.b)({registerUser:ie},e)})(Pe))),Fe=a(145),ke=a.n(Fe),Ue=a(94),De=a.n(Ue),Ie=function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(ke.a,{className:e.header},r.a.createElement(De.a,{className:e.headerContent},r.a.createElement(Z.a,{to:"/home",style:{color:"transparent"}},r.a.createElement(z.a,{variant:"h3",color:"primary",align:"center",classes:{root:e.appName}},"BidBig")),r.a.createElement("div",{className:e.messageWrapper},r.a.createElement(z.a,{variant:"h6",color:"primary",align:"center",classes:{root:e.welcomeMessage}},"Welcome User"),r.a.createElement(Z.a,{to:"/logout",style:{color:"transparent"}},r.a.createElement(z.a,{variant:"h6",color:"secondary",align:"center",classes:{root:e.logout}},"Logout")))))}}]),t}(n.Component),Le=Object(H.withStyles)(function(){return{header:{},headerContent:{justifyContent:"space-between"},messageWrapper:{display:"flex",flexDirection:"row",justifyContent:"space-between"},appName:{color:"white",fontFamily:"Lucida Console, Monaco, monospace"},welcomeMessage:{color:"white",marginRight:20,fontFamily:"Lucida Console, Monaco, monospace"},logout:{fontFamily:"Lucida Console, Monaco, monospace"}}})(Object(i.b)(function(e,t){return{}},function(e,t){return Object(c.b)({},e)})(Ie)),_e=a(78),Be=a.n(_e),Ae=a(79),Me=a.n(Ae),We=a(38),Re=a.n(We),Ge=a(39),He=a.n(Ge),qe=a(146),ze=a.n(qe),Ve=function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.name,n=e.description,o=e.path;return r.a.createElement(Be.a,{className:t.card},r.a.createElement(Me.a,{classes:{root:t.cardContent}},r.a.createElement(z.a,{className:t.title,color:"textSecondary",variant:"h3"},a),r.a.createElement(z.a,{variant:"h6",className:t.description},n),r.a.createElement("div",{className:t.linkWrapper},r.a.createElement(Z.a,{to:o,style:{color:"orange"}},r.a.createElement(Re.a,{title:"Go to ".concat(a),"aria-label":"Go to ".concat(a)},r.a.createElement(He.a,{color:"primary",className:t.fab},r.a.createElement(ze.a,{classes:{root:t.goto}})))))))}}]),t}(n.Component),Je=Object(K.a)(Object(H.withStyles)(function(){return{card:{margin:10,maxWidth:280,background:"aliceblue",height:"100%"},cardContent:{display:"inline-block"},title:{fontFamily:"Lucida Console, Monaco, monospace"},description:{fontFamily:"Lucida Console, Monaco, monospace",marginBottom:20,marginTop:20},linkWrapper:{display:"flex",justifyContent:"center"}}})(Object(i.b)(function(e,t){return{}},function(e,t){return Object(c.b)({},e)})(Ve))),Qe=function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(n.Fragment,null,r.a.createElement(Le,null),r.a.createElement("div",{className:e.homeWrapper},r.a.createElement(Je,{name:"Profile",description:"View and Manage your profile",path:"/profile"}),r.a.createElement(Je,{name:"Items",description:"Post and Manage your items",path:"/items"}),r.a.createElement(Je,{name:"Auctions",description:"Manage Auction schedules",path:"/auctions"}),r.a.createElement(Je,{name:"Bids",description:"View Bid Details for an item",path:"/bids"}),r.a.createElement(Je,{name:"Live Bidding",description:"View and participate in live bidding",path:"/current-bidding"})))}}]),t}(n.Component),$e=Object(H.withStyles)(function(){return{homeWrapper:{display:"flex",flexWrap:"wrap",padding:"70px 50px 50px 50px"}}})(Qe),Xe=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault();var t=a.state.email;(0,a.props.loginUser)(t).then(function(){return a.handleSuccess()}).catch(function(e){return a.handleError(e)})},a.handleSuccess=function(){a.resetForm()},a.handleError=function(e){a.setState({errorFlag:!0,errorMessage:"Looks like this email is not registered. Please try again with a registered email.",resendFlag:!1})},a.resetForm=function(){a.setState({email:""})},a.handleChange=function(e){return function(t){a.setState(Object(b.a)({},e,t.target.value))}},a.state={email:""},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.formWrapper},r.a.createElement("form",{onSubmit:this.handleSubmit,className:e.forgotPasswordForm},r.a.createElement(z.a,{variant:"h1",color:"primary",align:"center",classes:{root:e.heading}},"BidBig"),r.a.createElement(z.a,{variant:"h5",align:"center",classes:{root:e.heading}},"Did you forget your password?"),r.a.createElement(z.a,{variant:"subheading",align:"center",classes:{root:e.heading}},"Provide your email address and we will send you a link to reset your password"),r.a.createElement(te.a,{id:"email",type:"email",label:"Email",value:this.state.email,required:!0,className:e.textField,onChange:this.handleChange("email")}),r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.resetBtn,type:"submit"},"Reset Password"),r.a.createElement(z.a,{variant:"body1",align:"center"},"Go back to"," ",r.a.createElement(Z.a,{to:"/login",style:{color:"inherit"}},"Login"))))}}]),t}(n.Component),Ye=Object(K.a)(Object(H.withStyles)(function(){return{formWrapper:{display:"flex",flexDirection:"column",justifyContent:"center"},forgotPasswordForm:{display:"flex",margin:"auto",flexDirection:"column",width:"40vw"},heading:{marginTop:20,fontFamily:"Lucida Console, Monaco, monospace"},textField:{margin:"auto",width:"30vw"},resetBtn:{margin:"auto",marginTop:"15px",marginBottom:"15px",padding:"5px",width:"30vw"}}})(Object(i.b)(function(e,t){return{}},function(e,t){return Object(c.b)({},e)})(Xe))),Ke=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handleClickShowPassword=function(){a.setState(function(e){return{showPassword:!e.showPassword}})},a.handleClickShowConfirmPassword=function(){a.setState(function(){return{showConfirmPassword:!a.state.showConfirmPassword}})},a.handleChange=function(e){return function(t){a.setState(Object(b.a)({},e,t.target.value))}},a.handlePasswordChange=function(e){a.setState({confirmPassword:e.target.value},a.checkIfPasswordsMatch)},a.handleSubmit=function(e){e.preventDefault()},a.state={showPassword:!1,showConfirmPassword:!1,passwordUnmatchError:!1,passwordUnmatchHelperText:"",passwordResetSuccessful:!1,signUpError:!1,signUpErrorText:""},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"checkIfPasswordsMatch",value:function(){var e=this.state;e.password!==e.confirmPassword?this.setState({passwordUnmatchError:!0,passwordUnmatchHelperText:"Passwords do not match."}):this.setState({passwordUnmatchError:!1,passwordUnmatchHelperText:""})}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.resetPasswordPage},r.a.createElement("form",{onSubmit:this.handleSubmit,className:e.resetForm},r.a.createElement(z.a,{variant:"h1",color:"primary",align:"center",classes:{root:e.heading}},"BidBig"),r.a.createElement(z.a,{variant:"h5",align:"center",classes:{root:e.heading}},"Reset your password"),r.a.createElement(pe.a,{className:"".concat(e.textField," ","signup-field"),required:!0,margin:"normal"},r.a.createElement(Ee.a,{htmlFor:"password"},"Password"),r.a.createElement(be.a,{id:"password",value:this.state.password,inputProps:{minLength:6},type:this.state.showPassword?"text":"password",onChange:this.handleChange("password"),endAdornment:r.a.createElement(ve.a,{position:"end"},r.a.createElement(Oe.a,{onClick:this.handleClickShowPassword},this.state.showPassword?r.a.createElement(Ne.a,null):r.a.createElement(je.a,null)))})),r.a.createElement(pe.a,{className:"".concat(e.textField," ","main-entry-signup-field"),required:!0,margin:"normal"},r.a.createElement(Ee.a,{htmlFor:"confirmPassword"},"Re-enter password"),r.a.createElement(be.a,{id:"confirmPassword",className:"entry-signup-confirmpassword",value:this.state.confirmPassword,inputProps:{minLength:6},type:this.state.showConfirmPassword?"text":"password",onChange:this.handlePasswordChange,endAdornment:r.a.createElement(ve.a,{position:"end"},r.a.createElement(Oe.a,{onClick:this.handleClickShowConfirmPassword},this.state.showConfirmPassword?r.a.createElement(Ne.a,null):r.a.createElement(je.a,null)))}),this.state.passwordUnmatchError&&r.a.createElement(ge.a,{error:!0}," ",this.state.passwordUnmatchHelperText," ")),r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.resetBtn,type:"submit"}," ","Reset Password")))}}]),t}(n.Component),Ze=Object(H.withStyles)(function(){return{resetPasswordPage:{display:"flex",flexDirection:"column",alignItems:"center",alignSelf:"center",padding:15},resetForm:{display:"flex",flexDirection:"column",flexWrap:"wrap",padding:"10px",alignItems:"center"},heading:{marginTop:20,fontFamily:"Lucida Console, Monaco, monospace"},textField:{margin:"auto",width:"30vw"},resetBtn:{margin:"auto",width:"30vw",marginTop:"15px",marginBottom:"15px",padding:"5px",textTransform:"none"}}})(Ke),et=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handleChange=function(e){return function(t){a.setState(Object(b.a)({},e,t.target.value))}},a.state={name:"",username:"",email:"",password:"",confirmPassword:"",showPassword:!1,showConfirmPassword:!1,passwordUnmatchError:!1,passwordUnmatchHelperText:""},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(n.Fragment,null,r.a.createElement(Le,null),r.a.createElement("div",{className:e.wrapper},r.a.createElement(z.a,{variant:"title",align:"left",classes:{root:e.profileHeading}},"My Profile"),r.a.createElement("form",{onSubmit:this.handleSubmit,className:e.userForm},r.a.createElement(te.a,{id:"username",type:"text",label:"Username",value:this.state.username,disabled:!0,className:e.textField,onChange:this.handleChange("username")}),r.a.createElement(te.a,{id:"name",type:"text",label:"Name",inputProps:{maxLength:255},value:this.state.name,required:!0,className:e.textField,onChange:this.handleChange("name")}),r.a.createElement(te.a,{id:"email",type:"email",label:"Email",value:this.state.email,required:!0,className:"".concat(e.textField," ","login-email"),onChange:this.handleChange("email")}),r.a.createElement("div",{className:e.btnWrapper},r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.profileBtn,type:"submit"},"Update Profile"),r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.profileBtn,type:"reset"},"Clear")))))}}]),t}(n.Component),tt=Object(H.withStyles)(function(){return{wrapper:{display:"flex",flexDirection:"column",padding:"70px 50px 50px 50px"},userForm:{display:"flex",flexDirection:"column",flexWrap:"wrap",padding:"10px",justifyContent:"flex-start"},profileHeading:{marginTop:20,fontFamily:"Lucida Console, Monaco, monospace"},textField:{width:"30vw"},btnWrapper:{display:"flex",flexDirection:"row",width:"30vw"},profileBtn:{margin:"15px 5px 15px 0",padding:"5px",textTransform:"none"}}})(et),at=function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.wrapper},"Live Bidding")}}]),t}(n.Component),nt=Object(H.withStyles)(function(){return{wrapper:{display:"flex",flexWrap:"wrap"}}})(at),rt=a(41),ot=a.n(rt),st=a(64),it=a.n(st),ct=a(53),lt=a.n(ct),mt=a(149),dt=a.n(mt),ut=a(150),pt=a.n(ut),ht=a(148),gt=a.n(ht),ft=a(147),Et=a.n(ft),wt=function(e){function t(){var e,a;Object(I.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(_.a)(this,(e=Object(B.a)(t)).call.apply(e,[this].concat(r)))).state={page:0,rowsPerPage:5},a.handleChangePage=function(e,t){a.setState({page:t})},a.handleChangeRowsPerPage=function(e){a.setState({rowsPerPage:e.target.value})},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.pageWrapper},r.a.createElement(Et.a,{classes:{root:e.pagination},component:"div",count:100,rowsPerPage:10,page:0,onChangePage:this.handleChangePage,onChangeRowsPerPage:this.handleChangeRowsPerPage,labelRowsPerPage:"Items per page"}),r.a.createElement("div",{className:e.root},[1,2,3,4,5,6,7,8,9,10].map(function(t){return r.a.createElement(it.a,{key:t,className:e.paper},r.a.createElement(ot.a,{container:!0,spacing:16},r.a.createElement(ot.a,{item:!0},r.a.createElement(lt.a,{className:e.image},r.a.createElement("img",{className:e.img,alt:"1030114",src:"/items/downloadImage/chair1543519143318_3.jpg"}))),r.a.createElement(ot.a,{item:!0,xs:12,sm:!0,container:!0},r.a.createElement(ot.a,{item:!0,xs:!0,container:!0,direction:"column",spacing:16},r.a.createElement(ot.a,{item:!0,xs:!0},r.a.createElement(z.a,{gutterBottom:!0,variant:"h4"},"Pepperfry Wooden Chair"),r.a.createElement(z.a,{variant:"h5",gutterBottom:!0},"A durable, brown colored wooden chair by Pepperfry"),r.a.createElement(z.a,{color:"textSecondary"},"ID: 1030114")),r.a.createElement(ot.a,{item:!0},r.a.createElement(z.a,{variant:"subtitle1"},"Minimum Bidding Price: $19.00"),r.a.createElement(z.a,{variant:"subtitle1"},"Date Added: 12/05/2018")),r.a.createElement(ot.a,{item:!0},r.a.createElement(Re.a,{title:"Schedule an Auction","aria-label":"Schedule this item for auction"},r.a.createElement(He.a,{color:"secondary",className:e.timer},r.a.createElement(gt.a,null))),r.a.createElement(Re.a,{title:"Edit","aria-label":"Edit"},r.a.createElement(He.a,{color:"secondary",className:e.edit},r.a.createElement(dt.a,null))),r.a.createElement(Re.a,{title:"Delete","aria-label":"Delete"},r.a.createElement(He.a,{color:"secondary",className:e.delete},r.a.createElement(pt.a,null))))))))})))}}]),t}(n.Component),bt=Object(H.withStyles)(function(){return{pageWrapper:{display:"flex",flexDirection:"column"},root:{display:"flex",flexWrap:"wrap",flexDirection:"row"},paper:{padding:20,margin:"40px 10px 10px 0",maxWidth:500},pagination:{display:"flex",justifyContent:"center"},image:{width:128,height:128},img:{margin:"auto",display:"block",maxWidth:"100%",maxHeight:"100%"},edit:{background:"#6fdc6f",marginRight:5},delete:{background:"#ff4d4d",marginRight:5},timer:{background:"#ffa31a",marginRight:5}}})(wt),yt=a(153),vt=a.n(yt),xt=a(93),Ot=a.n(xt),Ct=a(152),jt=a.n(Ct),St=a(151),Nt=a.n(St),Pt=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handleChange=function(e,t){a.setState(Object(b.a)({},t,e.target.value))},a.state={name:"",description:"",minBidPrice:"",image:null,heading:"Post New Item",buttonText:"Create"},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.onClose;return r.a.createElement("div",{className:a.paper},r.a.createElement(Be.a,{className:a.card},r.a.createElement(Nt.a,{subheader:this.state.heading,classes:{subheader:a.header}}),r.a.createElement(jt.a,null),r.a.createElement(Me.a,{classes:{root:a.cardContent}},r.a.createElement("form",{onSubmit:this.handleSubmit,className:a.itemForm},r.a.createElement(te.a,{id:"name",type:"text",label:"Name",inputProps:{maxLength:255},value:this.state.name,required:!0,className:a.textField,onChange:function(t){return e.handleChange(t,"name")}}),r.a.createElement(te.a,{id:"description",type:"text",label:"Description",required:!0,value:this.state.description,className:a.textField,onChange:function(t){return e.handleChange(t,"description")}}),r.a.createElement(te.a,{id:"minBidPrice",type:"number",step:"0.01",label:"Bidding Price ($)",value:this.state.minBidPrice,className:a.textField,onChange:function(t){return e.handleChange(t,"minBidPrice")}}),r.a.createElement("div",{className:a.btnWrapper},r.a.createElement(J.a,{variant:"contained",color:"primary",className:a.dialogBtn,type:"submit"},this.state.buttonText),r.a.createElement(J.a,{variant:"contained",color:"primary",className:a.dialogBtn,onClick:n},"Cancel"))))))}}]),t}(n.Component),Tt=Object(H.withStyles)(function(){return{paper:{position:"absolute",backgroundColor:"#FFF",padding:"0px",top:"50%",left:"50%",transform:"translate(-50%, -50%)",outline:"none",borderRadius:4},card:{background:"#FFF",outline:"none",overflow:"initial"},cardContent:{padding:"0 10px","&:last-child":{paddingBottom:0}},itemForm:{display:"flex",flexDirection:"column",flexWrap:"wrap",padding:"10px",justifyContent:"flex-start"},header:{fontFamily:"Lucida Console, Monaco, monospace",fontSize:20},textField:{width:"30vw"},btnWrapper:{display:"flex",flexDirection:"row",marginTop:20},dialogBtn:{margin:"15px 5px 15px 0",padding:"5px",textTransform:"none"}}})(Pt),Ft=function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props,t=e.itemsDialogOpen,a=e.closeItemsDialog;return r.a.createElement(Ot.a,{"aria-labelledby":"Items","aria-describedby":"Post a new Item",open:t||!1,onClose:a,disableAutoFocus:!0},r.a.createElement(Tt,{onClose:a}))}}]),t}(n.Component),kt=function(){return{type:E.ITEMS_DIALOG_OPEN}},Ut=function(){return{type:E.ITEMS_DIALOG_CLOSE}},Dt=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handlePostNewItem=function(){a.props.openItemsDialog()},a.state={open:!1},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.itemsDialogOpen,o=e.closeItemsDialog;return r.a.createElement(n.Fragment,null,r.a.createElement(Le,null),r.a.createElement("div",{className:t.wrapper},r.a.createElement("div",{className:t.titleBarWrapper},r.a.createElement(z.a,{variant:"h3",align:"left",classes:{root:t.title}},"My Items"),r.a.createElement(Re.a,{title:"Add New Item","aria-label":"Add New Item"},r.a.createElement(He.a,{color:"secondary",className:t.add},r.a.createElement(vt.a,{onClick:this.handlePostNewItem})))),r.a.createElement(bt,{openModal:this.openModal,closeModal:this.closeModal}),r.a.createElement(Ft,{itemsDialogOpen:a,closeItemsDialog:o})))}}]),t}(n.Component),It=Object(H.withStyles)(function(){return{wrapper:{display:"flex",padding:"70px 50px 50px 50px",flexDirection:"column"},titleBarWrapper:{display:"flex",flexDirection:"row",marginTop:20,justifyContent:"space-between"},title:{fontFamily:"Lucida Console, Monaco, monospace"},add:{background:"#0088cc"}}})(Object(i.b)(function(e){return{itemsDialogOpen:e.items.itemsDialogOpen}},function(e){return Object(c.b)({openItemsDialog:kt,closeItemsDialog:Ut},e)})(Dt)),Lt=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(_.a)(this,Object(B.a)(t).call(this,e))).handleChange=function(e){return function(t){a.setState(Object(b.a)({},e,t.target.value))}},a.state={date:"",startTime:"",endTime:"",slots:""},a}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.wrapper},r.a.createElement("div",{className:e.titleBarWrapper},r.a.createElement(z.a,{variant:"h3",align:"left",classes:{root:e.title}},"Manage Auction Schedule")),r.a.createElement("form",{onSubmit:this.handleSubmit,className:e.scheduleForm},r.a.createElement(te.a,{id:"date",type:"date",label:"Date",value:this.state.date,required:!0,className:e.textField,onChange:this.handleChange("date")}),r.a.createElement(te.a,{id:"startTime",type:"time",label:"Start Time",value:this.state.startTime,required:!0,className:e.textField,onChange:this.handleChange("startTime")}),r.a.createElement(te.a,{id:"endTime",type:"time",label:"End Time",value:this.state.startTime,required:!0,className:e.textField,onChange:this.handleChange("endTime")}),r.a.createElement(te.a,{id:"slots",type:"number",label:"Number of Slots",value:this.state.slots,required:!0,className:e.textField,onChange:this.handleChange("slots")}),r.a.createElement("div",{className:e.btnWrapper},r.a.createElement(J.a,{variant:"contained",color:"primary",className:e.saveBtn,type:"submit"},"Save Schedule"))))}}]),t}(n.Component),_t=Object(H.withStyles)(function(){return{wrapper:{display:"flex",padding:"70px 50px 50px 50px",flexDirection:"column"},scheduleForm:{display:"flex",flexDirection:"column",flexWrap:"wrap",padding:"10px",justifyContent:"flex-start"},titleBarWrapper:{display:"flex",flexDirection:"row",marginTop:20,justifyContent:"space-between"},title:{fontFamily:"Lucida Console, Monaco, monospace"},textField:{width:"30vw"},saveBtn:{margin:"15px 5px 15px 0",padding:"5px",textTransform:"none"}}})(Lt),Bt=(a(349),function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(n.Fragment,null,r.a.createElement(Le,null),r.a.createElement("div",{className:e.wrapper},r.a.createElement(_t,null)))}}]),t}(n.Component)),At=Object(H.withStyles)(function(){return{wrapper:{display:"flex",padding:"70px 50px 50px 50px",flexDirection:"column"}}})(Bt),Mt=function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.wrapper},"Bids")}}]),t}(n.Component),Wt=Object(H.withStyles)(function(){return{wrapper:{display:"flex",flexWrap:"wrap"}}})(Mt),Rt=(a(350),function(e){function t(){return Object(I.a)(this,t),Object(_.a)(this,Object(B.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(L.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("main",{className:"container"},r.a.createElement(M.a,null,r.a.createElement(W.a,null,r.a.createElement(R.a,{exact:!0,path:"/login",component:de}),r.a.createElement(R.a,{exact:!0,path:"/",render:function(){return r.a.createElement(G.a,{to:"/login"})}}),r.a.createElement(R.a,{path:"/logout",component:de}),r.a.createElement(R.a,{path:"/register",component:Te}),r.a.createElement(R.a,{path:"/forgot-password",component:Ye}),r.a.createElement(R.a,{path:"/reset-password",component:Ze}),r.a.createElement(R.a,{path:"/home",component:$e}),r.a.createElement(R.a,{path:"/profile",component:tt}),r.a.createElement(R.a,{path:"/items",component:It}),r.a.createElement(R.a,{path:"/auctions",component:At}),r.a.createElement(R.a,{path:"/bids",component:Wt}),r.a.createElement(R.a,{path:"/current-bidding",component:nt}),r.a.createElement(R.a,{path:"*",component:Y})))))}}]),t}(n.Component)),Gt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ht(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(352),a(354),a(356);var qt=D;s.a.render(r.a.createElement(i.a,{store:qt},r.a.createElement(Rt,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");Gt?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Ht(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):Ht(e)})}}()}},[[154,2,1]]]);
//# sourceMappingURL=main.a7936b51.chunk.js.map