(ns textflow.logic
  (:require [cljs.reader :as reader]))

(defn indexed ;; copy from clojure.contrib.seq
  "Returns a lazy sequence of [index, item] pairs, where items come
  from 's' and indexes count up from zero.
  (indexed '(a b c d))  =>  ([0 a] [1 b] [2 c] [3 d])"
  [s]
  (map vector (iterate inc 0) s))

(defn get-pos [elm coll]
  "return the position of elm in coll"
  (first (for [[idx elt] (indexed coll) :when (= elt elm)] idx)))
  
(defn mid [len]
   (inc (int (/ len 2))))

(defn rep-string [astr nstr pos]
  "replace a substiring of astr with nstr starting at position pos"
  (str (subs astr 0 pos) nstr (subs astr (+ pos (count nstr)))))

(defn abs [x]
  (if (> 0 x) (- x) x))

(defn rec-to-strs [f]
  "recursively change parameters to strings"
  (vec (for [c f] 
    (if (coll? c)
        (vec (rec-to-strs c)) 
        (str c)))))

;;(defmacro rec-to-strs-mac [f]
;;  (rec-to-strs f))

(defn tail-cons [col e]
  (reverse (cons e (reverse col))))

(defn safe-nth [seq num]
  (if (>= num (count seq)) nil (nth seq num)))

;;;;;
(def *space-len* 20)

(defn fill-string [times char]
  "create a string from repeating char times times"
   (apply str (for [_ (range times )] char)))

(defn arrow-line [len]
  (fill-string len "-"))

(defn right-arrow [len]
  (str (arrow-line (dec len)) ">"))

(defn left-arrow [len]
  (str "<" (arrow-line (dec len))))
  
(defn pos-in-pic [actor actors]
  (let [pos (get-pos actor actors)]
    (if pos (* *space-len* (inc pos))
            (throw (str "actor " actor " not found")))))

(defn write-space 
  ([] (write-space (dec *space-len*)))
  ([len] (fill-string len " ")))


(defn write-empty [actors]
  (fill-string (count actors) (str (write-space) "|")))

(defn write-actors [actors]
  "return a string of actors name with appropriate spaces between them"
  (loop [s (str (write-empty actors) (fill-string (count (last actors)) " ")) acs actors]
    (let [a (first acs)]
      (if (empty? acs) s
	  (recur (rep-string s a (- (pos-in-pic a actors) (mid (count a)))) (rest acs)))
      )))

(defn err-msg [msg clg cld error]
  (str "Problem in message " msg 
          " from " clg 
          " to " cld 
          ": " error))

(defn trimm [str actors]
  (subs str (- *space-len* (mid (count (first actors))))))

(defn write-msg 
  ([actors msg clg cld]
    (try
      (let [f-pos (pos-in-pic clg actors)
	    t-pos (pos-in-pic cld actors)
	    start (min f-pos t-pos)
	    text (- (+ start (mid *space-len*)) (mid (count msg)))
	    len (dec (abs (- f-pos t-pos)))
	    arrow (if (< f-pos t-pos) (right-arrow len) (left-arrow len))]
	(str (println-str (trimm (rep-string (write-empty actors) msg text) actors))
	     (trimm (rep-string (write-empty actors) arrow start) actors)))
      (catch js/Object e
        (throw 
         (err-msg msg clg cld (. e getMessage))))))
  ([actors]
     (trimm (write-empty actors) actors)))

(defn extract-actors [msgs]
  (filter #(not (nil? %))
    (distinct 
       (concat 
        (map second msgs) 
        (map #(safe-nth % 2) msgs)))))

(defn write-flow 
  ([actors msgs]
     (str
      (println-str (trimm (write-actors actors) actors))
      (reduce str
	      (for [msg msgs]
		(println-str (apply write-msg (cons actors msg)))))))
  ([msgs] (write-flow (extract-actors msgs) msgs)))

(defn write-msgs [ & msgs]
  (write-flow (vec msgs)))


(defn write-or-err [req]
  "parse request, return error if fail"
  (try
    (write-flow (rec-to-strs (reader/read-string req)))
    (catch js/Object e (str "Fail to generate flow\n" e))))


(def *example*
     (str
      "[[hi Tzach Amnon]\n"
      "[hello Amnon Shay]\n"
      "[\"New version?\" Shay Tzach]\n"
      "[]\n"
      "[\"ClojureScript!\" Tzach Shay]\n"
      "[Cool Amnon Tzach]]\n"))
