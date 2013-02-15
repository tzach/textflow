goog.provide('textflow.logic');
goog.require('cljs.core');
goog.require('cljs.reader');
/**
* Returns a lazy sequence of [index, item] pairs, where items come
* from 's' and indexes count up from zero.
* (indexed '(a b c d))  =>  ([0 a] [1 b] [2 c] [3 d])
*/
textflow.logic.indexed = (function indexed(s){
return cljs.core.map.call(null,cljs.core.vector,cljs.core.iterate.call(null,cljs.core.inc,0),s);
});
textflow.logic.get_pos = (function get_pos(elm,coll){
return cljs.core.first.call(null,(function (){var iter__2495__auto__ = (function iter__2880(s__2881){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2881__$1 = s__2881;
while(true){
if(cljs.core.seq.call(null,s__2881__$1))
{var vec__2883 = cljs.core.first.call(null,s__2881__$1);
var idx = cljs.core.nth.call(null,vec__2883,0,null);
var elt = cljs.core.nth.call(null,vec__2883,1,null);
if(cljs.core._EQ_.call(null,elt,elm))
{return cljs.core.cons.call(null,idx,iter__2880.call(null,cljs.core.rest.call(null,s__2881__$1)));
} else
{{
var G__2884 = cljs.core.rest.call(null,s__2881__$1);
s__2881__$1 = G__2884;
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
return iter__2495__auto__.call(null,textflow.logic.indexed.call(null,coll));
})());
});
textflow.logic.mid = (function mid(len){
return (cljs.core.int$.call(null,(len / 2)) + 1);
});
textflow.logic.rep_string = (function rep_string(astr,nstr,pos){
return [cljs.core.str(cljs.core.subs.call(null,astr,0,pos)),cljs.core.str(nstr),cljs.core.str(cljs.core.subs.call(null,astr,(pos + cljs.core.count.call(null,nstr))))].join('');
});
textflow.logic.abs = (function abs(x){
if((0 > x))
{return (- x);
} else
{return x;
}
});
textflow.logic.rec_to_strs = (function rec_to_strs(f){
return cljs.core.vec.call(null,(function (){var iter__2495__auto__ = (function iter__2887(s__2888){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2888__$1 = s__2888;
while(true){
if(cljs.core.seq.call(null,s__2888__$1))
{var c = cljs.core.first.call(null,s__2888__$1);
return cljs.core.cons.call(null,((cljs.core.coll_QMARK_.call(null,c))?cljs.core.vec.call(null,rec_to_strs.call(null,c)):[cljs.core.str(c)].join('')),iter__2887.call(null,cljs.core.rest.call(null,s__2888__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__.call(null,f);
})());
});
textflow.logic.tail_cons = (function tail_cons(col,e){
return cljs.core.reverse.call(null,cljs.core.cons.call(null,e,cljs.core.reverse.call(null,col)));
});
textflow.logic.safe_nth = (function safe_nth(seq,num){
if((num >= cljs.core.count.call(null,seq)))
{return null;
} else
{return cljs.core.nth.call(null,seq,num);
}
});
textflow.logic._STAR_space_len_STAR_ = 20;
textflow.logic.fill_string = (function fill_string(times,char$){
return cljs.core.apply.call(null,cljs.core.str,(function (){var iter__2495__auto__ = (function iter__2891(s__2892){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2892__$1 = s__2892;
while(true){
if(cljs.core.seq.call(null,s__2892__$1))
{var _ = cljs.core.first.call(null,s__2892__$1);
return cljs.core.cons.call(null,char$,iter__2891.call(null,cljs.core.rest.call(null,s__2892__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__.call(null,cljs.core.range.call(null,times));
})());
});
textflow.logic.arrow_line = (function arrow_line(len){
return textflow.logic.fill_string.call(null,len,"-");
});
textflow.logic.right_arrow = (function right_arrow(len){
return [cljs.core.str(textflow.logic.arrow_line.call(null,(len - 1))),cljs.core.str(">")].join('');
});
textflow.logic.left_arrow = (function left_arrow(len){
return [cljs.core.str("<"),cljs.core.str(textflow.logic.arrow_line.call(null,(len - 1)))].join('');
});
textflow.logic.pos_in_pic = (function pos_in_pic(actor,actors){
var pos = textflow.logic.get_pos.call(null,actor,actors);
if(cljs.core.truth_(pos))
{return (textflow.logic._STAR_space_len_STAR_ * (pos + 1));
} else
{throw [cljs.core.str("actor "),cljs.core.str(actor),cljs.core.str(" not found")].join('');
}
});
textflow.logic.write_space = (function() {
var write_space = null;
var write_space__0 = (function (){
return write_space.call(null,(textflow.logic._STAR_space_len_STAR_ - 1));
});
var write_space__1 = (function (len){
return textflow.logic.fill_string.call(null,len," ");
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
return textflow.logic.fill_string.call(null,cljs.core.count.call(null,actors),[cljs.core.str(textflow.logic.write_space.call(null)),cljs.core.str("|")].join(''));
});
textflow.logic.write_actors = (function write_actors(actors){
var s = [cljs.core.str(textflow.logic.write_empty.call(null,actors)),cljs.core.str(textflow.logic.fill_string.call(null,cljs.core.count.call(null,cljs.core.last.call(null,actors))," "))].join('');
var acs = actors;
while(true){
var a = cljs.core.first.call(null,acs);
if(cljs.core.empty_QMARK_.call(null,acs))
{return s;
} else
{{
var G__2893 = textflow.logic.rep_string.call(null,s,a,(textflow.logic.pos_in_pic.call(null,a,actors) - textflow.logic.mid.call(null,cljs.core.count.call(null,a))));
var G__2894 = cljs.core.rest.call(null,acs);
s = G__2893;
acs = G__2894;
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
return cljs.core.subs.call(null,str,(textflow.logic._STAR_space_len_STAR_ - textflow.logic.mid.call(null,cljs.core.count.call(null,cljs.core.first.call(null,actors)))));
});
textflow.logic.write_msg = (function() {
var write_msg = null;
var write_msg__1 = (function (actors){
return textflow.logic.trimm.call(null,textflow.logic.write_empty.call(null,actors),actors);
});
var write_msg__4 = (function (actors,msg,clg,cld){
try{var f_pos = textflow.logic.pos_in_pic.call(null,clg,actors);
var t_pos = textflow.logic.pos_in_pic.call(null,cld,actors);
var start = ((f_pos < t_pos) ? f_pos : t_pos);
var text = ((start + textflow.logic.mid.call(null,textflow.logic._STAR_space_len_STAR_)) - textflow.logic.mid.call(null,cljs.core.count.call(null,msg)));
var len = (textflow.logic.abs.call(null,(f_pos - t_pos)) - 1);
var arrow = (((f_pos < t_pos))?textflow.logic.right_arrow.call(null,len):textflow.logic.left_arrow.call(null,len));
return [cljs.core.str(cljs.core.println_str.call(null,textflow.logic.trimm.call(null,textflow.logic.rep_string.call(null,textflow.logic.write_empty.call(null,actors),msg,text),actors))),cljs.core.str(textflow.logic.trimm.call(null,textflow.logic.rep_string.call(null,textflow.logic.write_empty.call(null,actors),arrow,start),actors))].join('');
}catch (e2898){if(cljs.core.instance_QMARK_.call(null,Object,e2898))
{var e = e2898;
throw textflow.logic.err_msg.call(null,msg,clg,cld,e.getMessage());
} else
{if("\uFDD0'else")
{throw e2898;
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
return cljs.core.filter.call(null,(function (p1__2895_SHARP_){
return !((p1__2895_SHARP_ == null));
}),cljs.core.distinct.call(null,cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.second,msgs),cljs.core.map.call(null,(function (p1__2896_SHARP_){
return textflow.logic.safe_nth.call(null,p1__2896_SHARP_,2);
}),msgs))));
});
textflow.logic.write_flow = (function() {
var write_flow = null;
var write_flow__1 = (function (msgs){
return write_flow.call(null,textflow.logic.extract_actors.call(null,msgs),msgs);
});
var write_flow__2 = (function (actors,msgs){
var actor_str = cljs.core.println_str.call(null,textflow.logic.trimm.call(null,textflow.logic.write_actors.call(null,actors),actors));
var messages = (function (){var iter__2495__auto__ = (function iter__2901(s__2902){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2902__$1 = s__2902;
while(true){
if(cljs.core.seq.call(null,s__2902__$1))
{var msg = cljs.core.first.call(null,s__2902__$1);
return cljs.core.cons.call(null,cljs.core.println_str.call(null,cljs.core.apply.call(null,textflow.logic.write_msg,cljs.core.cons.call(null,actors,msg))),iter__2901.call(null,cljs.core.rest.call(null,s__2902__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2495__auto__.call(null,msgs);
})();
var messages_str = cljs.core.reduce.call(null,cljs.core.str,messages);
var s = [cljs.core.str(actor_str),cljs.core.str(messages_str)].join('');
return cljs.core.PersistentVector.fromArray([s,cljs.core.count.call(null,actor_str),cljs.core.count.call(null,messages)], true);
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
return textflow.logic.write_flow.call(null,cljs.core.vec.call(null,msgs));
};
var write_msgs = function (var_args){
var msgs = null;
if (goog.isDef(var_args)) {
  msgs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return write_msgs__delegate.call(this, msgs);
};
write_msgs.cljs$lang$maxFixedArity = 0;
write_msgs.cljs$lang$applyTo = (function (arglist__2903){
var msgs = cljs.core.seq(arglist__2903);;
return write_msgs__delegate(msgs);
});
write_msgs.cljs$lang$arity$variadic = write_msgs__delegate;
return write_msgs;
})()
;
textflow.logic.write_or_err = (function write_or_err(req){
try{return textflow.logic.write_flow.call(null,textflow.logic.rec_to_strs.call(null,cljs.reader.read_string.call(null,req)));
}catch (e2905){if(cljs.core.instance_QMARK_.call(null,Object,e2905))
{var e = e2905;
return null;
} else
{if("\uFDD0'else")
{throw e2905;
} else
{return null;
}
}
}});
textflow.logic._STAR_example_STAR_ = [cljs.core.str("[\n"),cljs.core.str("[hi Tzach Amnon]\n"),cljs.core.str("[hello Amnon Shay]\n"),cljs.core.str("[\"New version?\" Shay Tzach]\n"),cljs.core.str("[]\n"),cljs.core.str("[\"ClojureScript!\" Tzach Shay]\n"),cljs.core.str("[Cool Amnon Tzach]\n"),cljs.core.str("]")].join('');
