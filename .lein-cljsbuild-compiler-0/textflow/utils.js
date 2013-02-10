goog.provide('textflow.utils');
goog.require('cljs.core');
/**
* returns a type 4 random UUID: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
* source: http://catamorphic.wordpress.com/2012/03/02/generating-a-random-uuid-in-clojurescript/
*/
textflow.utils.uuid = (function uuid(){
var r = cljs.core.repeatedly.call(null,30,(function (){
return cljs.core.rand_int.call(null,16).toString(16);
}));
return cljs.core.apply.call(null,cljs.core.str,cljs.core.concat.call(null,cljs.core.take.call(null,8,r),cljs.core.PersistentVector.fromArray(["-"], true),cljs.core.take.call(null,4,cljs.core.drop.call(null,8,r)),cljs.core.PersistentVector.fromArray(["-4"], true),cljs.core.take.call(null,3,cljs.core.drop.call(null,12,r)),cljs.core.PersistentVector.fromArray(["-"], true),cljs.core.PersistentVector.fromArray([(8 | (3 & cljs.core.rand_int.call(null,15))).toString(16)], true),cljs.core.take.call(null,3,cljs.core.drop.call(null,15,r)),cljs.core.PersistentVector.fromArray(["-"], true),cljs.core.take.call(null,12,cljs.core.drop.call(null,18,r))));
});
