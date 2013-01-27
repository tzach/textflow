goog.provide('textflow.logic');
goog.require('cljs.core');
goog.require('cljs.reader');
/**
* Returns a lazy sequence of [index, item] pairs, where items come
* from 's' and indexes count up from zero.
* (indexed '(a b c d))  =>  ([0 a] [1 b] [2 c] [3 d])
*/
textflow.logic.indexed = (function indexed(s){
return cljs.core.map.cljs$lang$arity$3(cljs.core.vector,cljs.core.iterate(cljs.core.inc,0),s);
});
textflow.logic.get_pos = (function get_pos(elm,coll){
return cljs.core.first((function (){var iter__2495__auto__ = (function iter__2875(s__2876){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2876__$1 = s__2876;
while(true){
if(cljs.core.seq(s__2876__$1))
{var vec__2878 = cljs.core.first(s__2876__$1);
var idx = cljs.core.nth.cljs$lang$arity$3(vec__2878,0,null);
var elt = cljs.core.nth.cljs$lang$arity$3(vec__2878,1,null);
if(cljs.core._EQ_.cljs$lang$arity$2(elt,elm))
{return cljs.core.cons(idx,iter__2875(cljs.core.rest(s__2876__$1)));
} else
{{
var G__2879 = cljs.core.rest(s__2876__$1);
s__2876__$1 = G__2879;
continue;
}
}
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__(textflow.logic.indexed(coll));
})());
});
textflow.logic.mid = (function mid(len){
return (cljs.core.int$((len / 2)) + 1);
});
textflow.logic.rep_string = (function rep_string(astr,nstr,pos){
return [cljs.core.str(cljs.core.subs.cljs$lang$arity$3(astr,0,pos)),cljs.core.str(nstr),cljs.core.str(cljs.core.subs.cljs$lang$arity$2(astr,(pos + cljs.core.count(nstr))))].join('');
});
textflow.logic.abs = (function abs(x){
if((0 > x))
{return (- x);
} else
{return x;
}
});
textflow.logic.rec_to_strs = (function rec_to_strs(f){
return cljs.core.vec((function (){var iter__2495__auto__ = (function iter__2882(s__2883){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2883__$1 = s__2883;
while(true){
if(cljs.core.seq(s__2883__$1))
{var c = cljs.core.first(s__2883__$1);
return cljs.core.cons(((cljs.core.coll_QMARK_(c))?cljs.core.vec(rec_to_strs(c)):[cljs.core.str(c)].join('')),iter__2882(cljs.core.rest(s__2883__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__(f);
})());
});
textflow.logic.tail_cons = (function tail_cons(col,e){
return cljs.core.reverse(cljs.core.cons(e,cljs.core.reverse(col)));
});
textflow.logic.safe_nth = (function safe_nth(seq,num){
if((num >= cljs.core.count(seq)))
{return null;
} else
{return cljs.core.nth.cljs$lang$arity$2(seq,num);
}
});
textflow.logic._STAR_space_len_STAR_ = 20;
textflow.logic.fill_string = (function fill_string(times,char$){
return cljs.core.apply.cljs$lang$arity$2(cljs.core.str,(function (){var iter__2495__auto__ = (function iter__2886(s__2887){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2887__$1 = s__2887;
while(true){
if(cljs.core.seq(s__2887__$1))
{var _ = cljs.core.first(s__2887__$1);
return cljs.core.cons(char$,iter__2886(cljs.core.rest(s__2887__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__(cljs.core.range.cljs$lang$arity$1(times));
})());
});
textflow.logic.arrow_line = (function arrow_line(len){
return textflow.logic.fill_string(len,"-");
});
textflow.logic.right_arrow = (function right_arrow(len){
return [cljs.core.str(textflow.logic.arrow_line((len - 1))),cljs.core.str(">")].join('');
});
textflow.logic.left_arrow = (function left_arrow(len){
return [cljs.core.str("<"),cljs.core.str(textflow.logic.arrow_line((len - 1)))].join('');
});
textflow.logic.pos_in_pic = (function pos_in_pic(actor,actors){
var pos = textflow.logic.get_pos(actor,actors);
if(cljs.core.truth_(pos))
{return (textflow.logic._STAR_space_len_STAR_ * (pos + 1));
} else
{throw [cljs.core.str("actor "),cljs.core.str(actor),cljs.core.str(" not found")].join('');
}
});
textflow.logic.write_space = (function() {
var write_space = null;
var write_space__0 = (function (){
return write_space.cljs$lang$arity$1((textflow.logic._STAR_space_len_STAR_ - 1));
});
var write_space__1 = (function (len){
return textflow.logic.fill_string(len," ");
});
write_space = function(len){
switch(arguments.length){
case 0:
return write_space__0.call(this);
case 1:
return write_space__1.call(this,len);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
write_space.cljs$lang$arity$0 = write_space__0;
write_space.cljs$lang$arity$1 = write_space__1;
return write_space;
})()
;
textflow.logic.write_empty = (function write_empty(actors){
return textflow.logic.fill_string(cljs.core.count(actors),[cljs.core.str(textflow.logic.write_space.cljs$lang$arity$0()),cljs.core.str("|")].join(''));
});
textflow.logic.write_actors = (function write_actors(actors){
var s = [cljs.core.str(textflow.logic.write_empty(actors)),cljs.core.str(textflow.logic.fill_string(cljs.core.count(cljs.core.last(actors))," "))].join('');
var acs = actors;
while(true){
var a = cljs.core.first(acs);
if(cljs.core.empty_QMARK_(acs))
{return s;
} else
{{
var G__2888 = textflow.logic.rep_string(s,a,(textflow.logic.pos_in_pic(a,actors) - textflow.logic.mid(cljs.core.count(a))));
var G__2889 = cljs.core.rest(acs);
s = G__2888;
acs = G__2889;
continue;
}
}
break;
}
});
textflow.logic.err_msg = (function err_msg(msg,clg,cld,error){
return [cljs.core.str("Problem in message "),cljs.core.str(msg),cljs.core.str(" from "),cljs.core.str(clg),cljs.core.str(" to "),cljs.core.str(cld),cljs.core.str(": "),cljs.core.str(error)].join('');
});
textflow.logic.trimm = (function trimm(str,actors){
return cljs.core.subs.cljs$lang$arity$2(str,(textflow.logic._STAR_space_len_STAR_ - textflow.logic.mid(cljs.core.count(cljs.core.first(actors)))));
});
textflow.logic.write_msg = (function() {
var write_msg = null;
var write_msg__1 = (function (actors){
return textflow.logic.trimm(textflow.logic.write_empty(actors),actors);
});
var write_msg__4 = (function (actors,msg,clg,cld){
try{var f_pos = textflow.logic.pos_in_pic(clg,actors);
var t_pos = textflow.logic.pos_in_pic(cld,actors);
var start = ((f_pos < t_pos) ? f_pos : t_pos);
var text = ((start + textflow.logic.mid(textflow.logic._STAR_space_len_STAR_)) - textflow.logic.mid(cljs.core.count(msg)));
var len = (textflow.logic.abs((f_pos - t_pos)) - 1);
var arrow = (((f_pos < t_pos))?textflow.logic.right_arrow(len):textflow.logic.left_arrow(len));
return [cljs.core.str(cljs.core.println_str.cljs$lang$arity$variadic(cljs.core.array_seq([textflow.logic.trimm(textflow.logic.rep_string(textflow.logic.write_empty(actors),msg,text),actors)], 0))),cljs.core.str(textflow.logic.trimm(textflow.logic.rep_string(textflow.logic.write_empty(actors),arrow,start),actors))].join('');
}catch (e2893){if(cljs.core.instance_QMARK_(Object,e2893))
{var e = e2893;
throw textflow.logic.err_msg(msg,clg,cld,e.getMessage());
} else
{if("\uFDD0'else")
{throw e2893;
} else
{return null;
}
}
}});
write_msg = function(actors,msg,clg,cld){
switch(arguments.length){
case 1:
return write_msg__1.call(this,actors);
case 4:
return write_msg__4.call(this,actors,msg,clg,cld);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
write_msg.cljs$lang$arity$1 = write_msg__1;
write_msg.cljs$lang$arity$4 = write_msg__4;
return write_msg;
})()
;
textflow.logic.extract_actors = (function extract_actors(msgs){
return cljs.core.filter((function (p1__2890_SHARP_){
return !((p1__2890_SHARP_ == null));
}),cljs.core.distinct(cljs.core.concat.cljs$lang$arity$2(cljs.core.map.cljs$lang$arity$2(cljs.core.second,msgs),cljs.core.map.cljs$lang$arity$2((function (p1__2891_SHARP_){
return textflow.logic.safe_nth(p1__2891_SHARP_,2);
}),msgs))));
});
textflow.logic.write_flow = (function() {
var write_flow = null;
var write_flow__1 = (function (msgs){
return write_flow.cljs$lang$arity$2(textflow.logic.extract_actors(msgs),msgs);
});
var write_flow__2 = (function (actors,msgs){
var actor_str = cljs.core.println_str.cljs$lang$arity$variadic(cljs.core.array_seq([textflow.logic.trimm(textflow.logic.write_actors(actors),actors)], 0));
var messages = (function (){var iter__2495__auto__ = (function iter__2896(s__2897){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2897__$1 = s__2897;
while(true){
if(cljs.core.seq(s__2897__$1))
{var msg = cljs.core.first(s__2897__$1);
return cljs.core.cons(cljs.core.println_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$lang$arity$2(textflow.logic.write_msg,cljs.core.cons(actors,msg))], 0)),iter__2896(cljs.core.rest(s__2897__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__(msgs);
})();
var messages_str = cljs.core.reduce.cljs$lang$arity$2(cljs.core.str,messages);
var s = [cljs.core.str(actor_str),cljs.core.str(messages_str)].join('');
return cljs.core.PersistentVector.fromArray([s,cljs.core.count(actor_str),cljs.core.count(messages)], true);
});
write_flow = function(actors,msgs){
switch(arguments.length){
case 1:
return write_flow__1.call(this,actors);
case 2:
return write_flow__2.call(this,actors,msgs);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
write_flow.cljs$lang$arity$1 = write_flow__1;
write_flow.cljs$lang$arity$2 = write_flow__2;
return write_flow;
})()
;
/**
* @param {...*} var_args
*/
textflow.logic.write_msgs = (function() { 
var write_msgs__delegate = function (msgs){
return textflow.logic.write_flow.cljs$lang$arity$1(cljs.core.vec(msgs));
};
var write_msgs = function (var_args){
var msgs = null;
if (goog.isDef(var_args)) {
  msgs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return write_msgs__delegate.call(this, msgs);
};
write_msgs.cljs$lang$maxFixedArity = 0;
write_msgs.cljs$lang$applyTo = (function (arglist__2898){
var msgs = cljs.core.seq(arglist__2898);;
return write_msgs__delegate(msgs);
});
write_msgs.cljs$lang$arity$variadic = write_msgs__delegate;
return write_msgs;
})()
;
textflow.logic.write_or_err = (function write_or_err(req){
try{return textflow.logic.write_flow.cljs$lang$arity$1(textflow.logic.rec_to_strs(cljs.reader.read_string(req)));
}catch (e2900){if(cljs.core.instance_QMARK_(Object,e2900))
{var e = e2900;
return null;
} else
{if("\uFDD0'else")
{throw e2900;
} else
{return null;
}
}
}});
textflow.logic._STAR_example_STAR_ = [cljs.core.str("[\n"),cljs.core.str("[hi Tzach Amnon]\n"),cljs.core.str("[hello Amnon Shay]\n"),cljs.core.str("[\"New version?\" Shay Tzach]\n"),cljs.core.str("[]\n"),cljs.core.str("[\"ClojureScript!\" Tzach Shay]\n"),cljs.core.str("[Cool Amnon Tzach]\n"),cljs.core.str("]")].join('');
