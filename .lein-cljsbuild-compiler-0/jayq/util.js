goog.provide('jayq.util');
goog.require('cljs.core');
jayq.util.wait = (function wait(ms,func){
return setTimeout(func, ms);
});
/**
* @param {...*} var_args
*/
jayq.util.log = (function() { 
var log__delegate = function (v,text){
var vs = ((cljs.core.string_QMARK_(v))?cljs.core.apply.cljs$lang$arity$3(cljs.core.str,v,text):v);
return console.log(vs);
};
var log = function (v,var_args){
var text = null;
if (goog.isDef(var_args)) {
  text = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return log__delegate.call(this, v, text);
};
log.cljs$lang$maxFixedArity = 1;
log.cljs$lang$applyTo = (function (arglist__3603){
var v = cljs.core.first(arglist__3603);
var text = cljs.core.rest(arglist__3603);
return log__delegate(v, text);
});
log.cljs$lang$arity$variadic = log__delegate;
return log;
})()
;
