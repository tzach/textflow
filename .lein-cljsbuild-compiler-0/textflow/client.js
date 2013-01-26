goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('textflow.logic');
goog.require('jayq.core');
textflow.client.$intext = jayq.core.$.call(null,"\uFDD0'#intext");
textflow.client.$outtext = jayq.core.$.call(null,"\uFDD0'#outtext");
textflow.client.update_flow = (function update_flow(){
var vec__4744 = textflow.logic.write_or_err.call(null,jayq.core.val.call(null,textflow.client.$intext));
var text = cljs.core.nth.call(null,vec__4744,0,null);
var len = cljs.core.nth.call(null,vec__4744,1,null);
var rows = cljs.core.nth.call(null,vec__4744,2,null);
jayq.core.val.call(null,textflow.client.$outtext,text);
jayq.core.css.call(null,textflow.client.$outtext,"\uFDD0'width",[cljs.core.str((15 + len)),cljs.core.str("ex")].join(''));
return jayq.core.css.call(null,textflow.client.$outtext,"\uFDD0'height",[cljs.core.str((5 + (6 * rows))),cljs.core.str("ex")].join(''));
});
jayq.core.val.call(null,textflow.client.$intext,textflow.logic._STAR_example_STAR_);
jayq.core.bind.call(null,textflow.client.$intext,"input",textflow.client.update_flow);
textflow.client.update_flow.call(null);
