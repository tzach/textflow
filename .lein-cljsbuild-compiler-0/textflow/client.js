goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.core');
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
textflow.client.update_flow_and_clear_popups = (function update_flow_and_clear_popups(){
jayq.core.css.call(null,textflow.client.$popedit,"\uFDD0'display","none");
jayq.core.css.call(null,textflow.client.$popview,"\uFDD0'display","none");
return textflow.client.update_flow.call(null);
});
textflow.client.path = (function path(){
return window.location;
});
jayq.core.bind.call(null,textflow.client.$selectbtn,"click",(function (){
textflow.client.update_flow.call(null);
jayq.core.val.call(null,textflow.client.$outtext,[cljs.core.str(jayq.core.val.call(null,textflow.client.$outtext)),cljs.core.str(textflow.client.path.call(null)),cljs.core.str("/"),cljs.core.str(textflow.utils.uuid.call(null))].join(''));
return textflow.client.$outtext.select();
}));
jayq.core.val.call(null,textflow.client.$intext,textflow.logic._STAR_example_STAR_);
jayq.core.bind.call(null,textflow.client.$intext,"input",textflow.client.update_flow_and_clear_popups);
textflow.client.update_flow.call(null);
