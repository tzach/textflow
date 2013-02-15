goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.util');
goog.require('jayq.core');
goog.require('clojure.browser.repl');
goog.require('clojure.string');
goog.require('textflow.utils');
goog.require('textflow.logic');
goog.require('jayq.util');
goog.require('jayq.core');
clojure.browser.repl.connect.call(null,"http://localhost:9000/repl");
textflow.client.uuid_reg = /#[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;
textflow.client.$intext = jayq.core.$.call(null,"\uFDD0'#intext");
textflow.client.$outtext = jayq.core.$.call(null,"\uFDD0'#outtext");
textflow.client.$syntaxerror = jayq.core.$.call(null,"\uFDD0'#syntaxerror");
textflow.client.$validsyntax = jayq.core.$.call(null,"\uFDD0'#validsyntax");
textflow.client.$popedit = jayq.core.$.call(null,"\uFDD0'#popedit");
textflow.client.$popview = jayq.core.$.call(null,"\uFDD0'#popview");
textflow.client.$selectbtn = jayq.core.$.call(null,"\uFDD0'#selectbtn");
textflow.client.update_flow = (function update_flow(){
var temp__3971__auto__ = textflow.logic.write_or_err.call(null,jayq.core.val.call(null,textflow.client.$intext));
if(cljs.core.truth_(temp__3971__auto__))
{var vec__6753 = temp__3971__auto__;
var text = cljs.core.nth.call(null,vec__6753,0,null);
var len = cljs.core.nth.call(null,vec__6753,1,null);
var rows = cljs.core.nth.call(null,vec__6753,2,null);
jayq.core.val.call(null,textflow.client.$outtext,text);
jayq.core.css.call(null,textflow.client.$outtext,"\uFDD0'width",[cljs.core.str((15 + len)),cljs.core.str("ex")].join(''));
var h_6754 = [cljs.core.str(cljs.core.int$.call(null,(3.5 * (3 + rows)))),cljs.core.str("ex")].join('');
jayq.core.css.call(null,textflow.client.$outtext,"\uFDD0'height",h_6754);
jayq.core.css.call(null,textflow.client.$intext,"\uFDD0'height",h_6754);
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
textflow.client.site = (function site(){
return clojure.string.replace.call(null,textflow.client.path.call(null),/#.*/,"");
});
textflow.client.get_win_hash = (function get_win_hash(){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.rest.call(null,window.location.hash));
});
textflow.client.update_document = (function update_document(id,body){
var post_uri = [cljs.core.str(textflow.client.site.call(null)),cljs.core.str(id)].join('');
return jayq.core.ajax.call(null,post_uri,cljs.core.ObjMap.fromObject(["\uFDD0'async","\uFDD0'type","\uFDD0'dataType","\uFDD0'data"],{"\uFDD0'async":true,"\uFDD0'type":"PUT","\uFDD0'dataType":"json","\uFDD0'data":cljs.core.clj__GT_js.call(null,body)}));
});
textflow.client.get_document = (function get_document(id){
var get_uri = [cljs.core.str(textflow.client.site.call(null)),cljs.core.str(id)].join('');
jayq.util.log.call(null,[cljs.core.str("get-document:"),cljs.core.str(get_uri)].join(''));
return jayq.core.xhr.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'get",get_uri], true),cljs.core.ObjMap.EMPTY,(function (p1__6755_SHARP_){
jayq.core.val.call(null,textflow.client.$intext,"intext".call(null,cljs.core.js__GT_clj.call(null,p1__6755_SHARP_)));
return textflow.client.update_flow.call(null);
}));
});
jayq.core.bind.call(null,textflow.client.$selectbtn,"click",(function (){
var id = textflow.utils.uuid.call(null);
var base = clojure.string.replace.call(null,textflow.client.path.call(null),textflow.client.uuid_reg,"");
var hash_id = [cljs.core.str("#"),cljs.core.str(id)].join('');
var url = [cljs.core.str(base),cljs.core.str(hash_id)].join('');
textflow.client.update_document.call(null,id,cljs.core.ObjMap.fromObject(["\uFDD0'intext"],{"\uFDD0'intext":jayq.core.val.call(null,textflow.client.$intext)}));
window.location.hash = hash_id;
jayq.core.val.call(null,textflow.client.$outtext,[cljs.core.str(jayq.core.val.call(null,textflow.client.$outtext)),cljs.core.str(cljs.core.reduce.call(null,cljs.core.str,cljs.core.repeat.call(null,4,"\n"))),cljs.core.str(url)].join(''));
return textflow.client.$outtext.select();
}));
jayq.core.bind.call(null,textflow.client.$intext,"input",(function (){
textflow.client.update_flow.call(null);
return textflow.client.clear_popups.call(null);
}));
jayq.core.bind.call(null,jayq.core.$.call(null,window),"hashchange",(function (){
var h = textflow.client.get_win_hash.call(null);
jayq.util.log.call(null,"hashchange changed to: ",h);
if(cljs.core.seq.call(null,h))
{if(cljs.core.truth_((function (){var temp__3974__auto__ = cljs.core.seq.call(null,cljs.core.re_find.call(null,/\/#.*$/,jayq.core.val.call(null,textflow.client.$outtext)));
if(temp__3974__auto__)
{var rf = temp__3974__auto__;
return cljs.core._EQ_.call(null,h,cljs.core.subs.call(null,cljs.core.apply.call(null,cljs.core.str,rf),2));
} else
{return null;
}
})()))
{return null;
} else
{return textflow.client.get_document.call(null,h);
}
} else
{return null;
}
}));
var h_6756 = textflow.client.get_win_hash.call(null);
if(cljs.core.empty_QMARK_.call(null,h_6756))
{jayq.util.log.call(null,"lets start with an example");
jayq.core.val.call(null,textflow.client.$intext,textflow.logic._STAR_example_STAR_);
textflow.client.update_flow.call(null);
} else
{textflow.client.get_document.call(null,h_6756);
textflow.client.clear_popups.call(null);
}
