goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('clojure.string');
goog.require('textflow.utils');
goog.require('textflow.logic');
goog.require('jayq.core');
textflow.client.$intext = jayq.core.$.call(null,"\uFDD0'#intext");
textflow.client.$outtext = jayq.core.$.call(null,"\uFDD0'#outtext");
textflow.client.$syntaxerror = jayq.core.$.call(null,"\uFDD0'#syntaxerror");
textflow.client.$validsyntax = jayq.core.$.call(null,"\uFDD0'#validsyntax");
textflow.client.$popedit = jayq.core.$.call(null,"\uFDD0'#popedit");
textflow.client.$popview = jayq.core.$.call(null,"\uFDD0'#popview");
textflow.client.$selectbtn = jayq.core.$.call(null,"\uFDD0'#selectbtn");
textflow.client.uuid_reg = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;
textflow.client.update_flow = (function update_flow(){
var temp__3971__auto__ = textflow.logic.write_or_err.call(null,jayq.core.val.call(null,textflow.client.$intext));
if(cljs.core.truth_(temp__3971__auto__))
{var vec__2869 = temp__3971__auto__;
var text = cljs.core.nth.call(null,vec__2869,0,null);
var len = cljs.core.nth.call(null,vec__2869,1,null);
var rows = cljs.core.nth.call(null,vec__2869,2,null);
jayq.core.val.call(null,textflow.client.$outtext,text);
jayq.core.css.call(null,textflow.client.$outtext,"\uFDD0'width",[cljs.core.str((15 + len)),cljs.core.str("ex")].join(''));
var h_2870 = [cljs.core.str(cljs.core.int$.call(null,(3.5 * (3 + rows)))),cljs.core.str("ex")].join('');
jayq.core.css.call(null,textflow.client.$outtext,"\uFDD0'height",h_2870);
jayq.core.css.call(null,textflow.client.$intext,"\uFDD0'height",h_2870);
jayq.core.css.call(null,textflow.client.$validsyntax,"\uFDD0'display","block");
return jayq.core.css.call(null,textflow.client.$syntaxerror,"\uFDD0'display","none");
} else
{jayq.core.css.call(null,textflow.client.$validsyntax,"\uFDD0'display","none");
return jayq.core.css.call(null,textflow.client.$syntaxerror,"\uFDD0'display","block");
}
});
textflow.client.clear_popups = (function clear_popups(){
jayq.core.css.call(null,textflow.client.$popedit,"\uFDD0'display","none");
return jayq.core.css.call(null,textflow.client.$popview,"\uFDD0'display","none");
});
textflow.client.path = (function path(){
return [cljs.core.str(window.location)].join('');
});
textflow.client.save_intext = (function save_intext(sid){
var url = sid;
console.log([cljs.core.str("post:"),cljs.core.str(url)].join(''));
return jayq.core.ajax.call(null,url,cljs.core.ObjMap.fromObject(["\uFDD0'contentType","\uFDD0'async","\uFDD0'type","\uFDD0'data"],{"\uFDD0'contentType":"text/plain","\uFDD0'async":true,"\uFDD0'type":"POST","\uFDD0'data":cljs.core.pr_str.call(null,jayq.core.val.call(null,textflow.client.$intext))}));
});
jayq.core.bind.call(null,textflow.client.$selectbtn,"click",(function (){
textflow.client.update_flow.call(null);
var id_2871 = textflow.utils.uuid.call(null);
var sid_2872 = [cljs.core.str(clojure.string.replace.call(null,textflow.client.path.call(null),textflow.client.uuid_reg,"")),cljs.core.str(id_2871)].join('');
textflow.client.save_intext.call(null,sid_2872);
jayq.core.val.call(null,textflow.client.$outtext,[cljs.core.str(jayq.core.val.call(null,textflow.client.$outtext)),cljs.core.str(cljs.core.reduce.call(null,cljs.core.str,cljs.core.repeat.call(null,4,"\n"))),cljs.core.str(sid_2872)].join(''));
return textflow.client.$outtext.select();
}));
if(cljs.core.empty_QMARK_.call(null,jayq.core.val.call(null,textflow.client.$intext)))
{jayq.core.val.call(null,textflow.client.$intext,textflow.logic._STAR_example_STAR_);
} else
{textflow.client.clear_popups.call(null);
}
jayq.core.bind.call(null,textflow.client.$intext,"input",(function (){
textflow.client.update_flow.call(null);
return textflow.client.clear_popups.call(null);
}));
textflow.client.update_flow.call(null);
