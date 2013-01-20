goog.provide('textflow.client');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('textflow.logic');
goog.require('jayq.core');
textflow.client.$intext = jayq.core.$.cljs$lang$arity$1("\uFDD0'#intext");
textflow.client.$outtext = jayq.core.$.cljs$lang$arity$1("\uFDD0'#outtext");
textflow.client.update_flow = (function update_flow(){
return jayq.core.val.cljs$lang$arity$2(textflow.client.$outtext,(textflow.logic.write_or_err.cljs$lang$arity$1 ? textflow.logic.write_or_err.cljs$lang$arity$1(jayq.core.val.cljs$lang$arity$1(textflow.client.$intext)) : textflow.logic.write_or_err.call(null,jayq.core.val.cljs$lang$arity$1(textflow.client.$intext))));
});
jayq.core.val.cljs$lang$arity$2(textflow.client.$intext,textflow.logic._STAR_example_STAR_);
jayq.core.bind(textflow.client.$intext,"input",textflow.client.update_flow);
textflow.client.update_flow();
