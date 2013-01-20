goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('textflow.logic');
goog.require('jayq.core');
textflow.client.$intext = jayq.core.$.call(null,"\uFDD0'#intext");
textflow.client.$outtext = jayq.core.$.call(null,"\uFDD0'#outtext");
textflow.client.update_flow = (function update_flow(){
return jayq.core.val.call(null,textflow.client.$outtext,textflow.logic.write_or_err.call(null,jayq.core.val.call(null,textflow.client.$intext)));
});
jayq.core.val.call(null,textflow.client.$intext,textflow.logic._STAR_example_STAR_);
jayq.core.bind.call(null,textflow.client.$intext,"input",textflow.client.update_flow);
textflow.client.update_flow.call(null);
