goog.provide('clojure.string');
goog.require('cljs.core');
goog.require('goog.string.StringBuffer');
goog.require('goog.string');
clojure.string.seq_reverse = (function seq_reverse(coll){
return cljs.core.reduce.cljs$lang$arity$3(cljs.core.conj,cljs.core.List.EMPTY,coll);
});
/**
* Returns s with its characters reversed.
*/
clojure.string.reverse = (function reverse(s){
return s.split("").reverse().join("");
});
/**
* Replaces all instance of match with replacement in s.
* match/replacement can be:
* 
* string / string
* pattern / (string or function of match).
*/
clojure.string.replace = (function replace(s,match,replacement){
if(cljs.core.string_QMARK_(match))
{return s.replace((new RegExp(goog.string.regExpEscape(match),"g")),replacement);
} else
{if(cljs.core.truth_(match.hasOwnProperty("source")))
{return s.replace((new RegExp(match.source,"g")),replacement);
} else
{if("\uFDD0'else")
{throw [cljs.core.str("Invalid match arg: "),cljs.core.str(match)].join('');
} else
{return null;
}
}
}
});
/**
* Replaces the first instance of match with replacement in s.
* match/replacement can be:
* 
* string / string
* pattern / (string or function of match).
*/
clojure.string.replace_first = (function replace_first(s,match,replacement){
return s.replace(match,replacement);
});
/**
* Returns a string of all elements in coll, as returned by (seq coll),
* separated by an optional separator.
*/
clojure.string.join = (function() {
var join = null;
var join__1 = (function (coll){
return cljs.core.apply.cljs$lang$arity$2(cljs.core.str,coll);
});
var join__2 = (function (separator,coll){
return cljs.core.apply.cljs$lang$arity$2(cljs.core.str,cljs.core.interpose(separator,coll));
});
join = function(separator,coll){
switch(arguments.length){
case 1:
return join__1.call(this,separator);
case 2:
return join__2.call(this,separator,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
join.cljs$lang$arity$1 = join__1;
join.cljs$lang$arity$2 = join__2;
return join;
})()
;
/**
* Converts string to all upper-case.
*/
clojure.string.upper_case = (function upper_case(s){
return s.toUpperCase();
});
/**
* Converts string to all lower-case.
*/
clojure.string.lower_case = (function lower_case(s){
return s.toLowerCase();
});
/**
* Converts first character of the string to upper-case, all other
* characters to lower-case.
*/
clojure.string.capitalize = (function capitalize(s){
if((cljs.core.count(s) < 2))
{return clojure.string.upper_case(s);
} else
{return [cljs.core.str(clojure.string.upper_case(cljs.core.subs.cljs$lang$arity$3(s,0,1))),cljs.core.str(clojure.string.lower_case(cljs.core.subs.cljs$lang$arity$2(s,1)))].join('');
}
});
/**
* Splits string on a regular expression. Optional argument limit is
* the maximum number of splits. Not lazy. Returns vector of the splits.
*/
clojure.string.split = (function() {
var split = null;
var split__2 = (function (s,re){
return cljs.core.vec([cljs.core.str(s)].join('').split(re));
});
var split__3 = (function (s,re,limit){
if((limit < 1))
{return cljs.core.vec([cljs.core.str(s)].join('').split(re));
} else
{var s__$1 = s;
var limit__$1 = limit;
var parts = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core._EQ_.cljs$lang$arity$2(limit__$1,1))
{return cljs.core.conj.cljs$lang$arity$2(parts,s__$1);
} else
{var temp__3971__auto__ = cljs.core.re_find(re,s__$1);
if(cljs.core.truth_(temp__3971__auto__))
{var m = temp__3971__auto__;
var index = s__$1.indexOf(m);
{
var G__3619 = s__$1.substring((index + cljs.core.count(m)));
var G__3620 = (limit__$1 - 1);
var G__3621 = cljs.core.conj.cljs$lang$arity$2(parts,s__$1.substring(0,index));
s__$1 = G__3619;
limit__$1 = G__3620;
parts = G__3621;
continue;
}
} else
{return cljs.core.conj.cljs$lang$arity$2(parts,s__$1);
}
}
break;
}
}
});
split = function(s,re,limit){
switch(arguments.length){
case 2:
return split__2.call(this,s,re);
case 3:
return split__3.call(this,s,re,limit);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$lang$arity$2 = split__2;
split.cljs$lang$arity$3 = split__3;
return split;
})()
;
/**
* Splits s on
* or
* .
*/
clojure.string.split_lines = (function split_lines(s){
return clojure.string.split.cljs$lang$arity$2(s,/\n|\r\n/);
});
/**
* Removes whitespace from both ends of string.
*/
clojure.string.trim = (function trim(s){
return goog.string.trim(s);
});
/**
* Removes whitespace from the left side of string.
*/
clojure.string.triml = (function triml(s){
return goog.string.trimLeft(s);
});
/**
* Removes whitespace from the right side of string.
*/
clojure.string.trimr = (function trimr(s){
return goog.string.trimRight(s);
});
/**
* Removes all trailing newline \n or return \r characters from
* string.  Similar to Perl's chomp.
*/
clojure.string.trim_newline = (function trim_newline(s){
var index = s.length;
while(true){
if((index === 0))
{return "";
} else
{var ch = cljs.core._lookup.cljs$lang$arity$3(s,(index - 1),null);
if((function (){var or__3824__auto__ = cljs.core._EQ_.cljs$lang$arity$2(ch,"\n");
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core._EQ_.cljs$lang$arity$2(ch,"\r");
}
})())
{{
var G__3622 = (index - 1);
index = G__3622;
continue;
}
} else
{return s.substring(0,index);
}
}
break;
}
});
/**
* True is s is nil, empty, or contains only whitespace.
*/
clojure.string.blank_QMARK_ = (function blank_QMARK_(s){
return goog.string.isEmptySafe(s);
});
/**
* Return a new string, using cmap to escape each character ch
* from s as follows:
* 
* If (cmap ch) is nil, append ch to the new string.
* If (cmap ch) is non-nil, append (str (cmap ch)) instead.
*/
clojure.string.escape = (function escape(s,cmap){
var buffer = (new goog.string.StringBuffer());
var length = s.length;
var index = 0;
while(true){
if(cljs.core._EQ_.cljs$lang$arity$2(length,index))
{return buffer.toString();
} else
{var ch = s.charAt(index);
var temp__3971__auto___3623 = cljs.core._lookup.cljs$lang$arity$3(cmap,ch,null);
if(cljs.core.truth_(temp__3971__auto___3623))
{var replacement_3624 = temp__3971__auto___3623;
buffer.append([cljs.core.str(replacement_3624)].join(''));
} else
{buffer.append(ch);
}
{
var G__3625 = (index + 1);
index = G__3625;
continue;
}
}
break;
}
});
