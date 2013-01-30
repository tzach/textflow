goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('textflow.logic');
goog.require('jayq.core');
textflow.client.$intext = jayq.core.$.cljs$lang$arity$1("\uFDD0'#intext");
textflow.client.$outtext = jayq.core.$.cljs$lang$arity$1("\uFDD0'#outtext");
textflow.client.$syntaxerror = jayq.core.$.cljs$lang$arity$1("\uFDD0'#syntaxerror");
textflow.client.$validsyntax = jayq.core.$.cljs$lang$arity$1("\uFDD0'#validsyntax");
textflow.client.$popedit = jayq.core.$.cljs$lang$arity$1("\uFDD0'#popedit");
textflow.client.$popview = jayq.core.$.cljs$lang$arity$1("\uFDD0'#popview");
textflow.client.$selectbtn = jayq.core.$.cljs$lang$arity$1("\uFDD0'#selectbtn");
textflow.client.update_flow = (function update_flow(){
var temp__3971__auto__ = (textflow.logic.write_or_err.cljs$lang$arity$1 ? textflow.logic.write_or_err.cljs$lang$arity$1(jayq.core.val.cljs$lang$arity$1(textflow.client.$intext)) : textflow.logic.write_or_err.call(null,jayq.core.val.cljs$lang$arity$1(textflow.client.$intext)));
if(cljs.core.truth_(temp__3971__auto__))
{var vec__2869 = temp__3971__auto__;
var text = cljs.core.nth.cljs$lang$arity$3(vec__2869,0,null);
var len = cljs.core.nth.cljs$lang$arity$3(vec__2869,1,null);
var rows = cljs.core.nth.cljs$lang$arity$3(vec__2869,2,null);
jayq.core.val.cljs$lang$arity$2(textflow.client.$outtext,text);
jayq.core.css.cljs$lang$arity$3(textflow.client.$outtext,"\uFDD0'width",[cljs.core.str((15 + len)),cljs.core.str("ex")].join(''));
var h_2870 = [cljs.core.str(cljs.core.int$((3.5 * (3 + rows)))),cljs.core.str("ex")].join('');
jayq.core.css.cljs$lang$arity$3(textflow.client.$outtext,"\uFDD0'height",h_2870);
jayq.core.css.cljs$lang$arity$3(textflow.client.$intext,"\uFDD0'height",h_2870);
jayq.core.css.cljs$lang$arity$3(textflow.client.$validsyntax,"\uFDD0'display","block");
return jayq.core.css.cljs$lang$arity$3(textflow.client.$syntaxerror,"\uFDD0'display","none");
} else
{jayq.core.css.cljs$lang$arity$3(textflow.client.$validsyntax,"\uFDD0'display","none");
return jayq.core.css.cljs$lang$arity$3(textflow.client.$syntaxerror,"\uFDD0'display","block");
}
});
textflow.client.update_flow_and_clear_popups = (function update_flow_and_clear_popups(){
jayq.core.css.cljs$lang$arity$3(textflow.client.$popedit,"\uFDD0'display","none");
jayq.core.css.cljs$lang$arity$3(textflow.client.$popview,"\uFDD0'display","none");
return textflow.client.update_flow();
});
jayq.core.bind(textflow.client.$selectbtn,"click",(function (){
return textflow.client.$outtext.select();
}));
jayq.core.val.cljs$lang$arity$2(textflow.client.$intext,textflow.logic._STAR_example_STAR_);
jayq.core.bind(textflow.client.$intext,"input",textflow.client.update_flow_and_clear_popups);
textflow.client.update_flow();
