goog.provide('textflow.utils');
goog.require('cljs.core');
/**
* returns a type 4 random UUID: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
* source: http://catamorphic.wordpress.com/2012/03/02/generating-a-random-uuid-in-clojurescript/
*/
textflow.utils.uuid = (function uuid(){
var r = cljs.core.repeatedly.cljs$lang$arity$2(30,(function (){
return cljs.core.rand_int(16).toString(16);
}));
return cljs.core.apply.cljs$lang$arity$2(cljs.core.str,cljs.core.concat.cljs$lang$arity$variadic(cljs.core.take(8,r),cljs.core.PersistentVector.fromArray(["-"], true),cljs.core.array_seq([cljs.core.take(4,cljs.core.drop(8,r)),cljs.core.PersistentVector.fromArray(["-4"], true),cljs.core.take(3,cljs.core.drop(12,r)),cljs.core.PersistentVector.fromArray(["-"], true),cljs.core.PersistentVector.fromArray([(8 | (3 & cljs.core.rand_int(15))).toString(16)], true),cljs.core.take(3,cljs.core.drop(15,r)),cljs.core.PersistentVector.fromArray(["-"], true),cljs.core.take(12,cljs.core.drop(18,r))], 0)));
});
