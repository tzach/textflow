(ns textflow.client
  (:use [jayq.core :only [$ delegate toggle val bind on attr css ajax]])
  (:require [textflow.logic :as tf]
            [textflow.utils :as utils]
            [clojure.string :as str]
            ))



(def $intext ($ :#intext))
(def $outtext ($ :#outtext))
(def $syntaxerror ($ :#syntaxerror))
(def $validsyntax ($ :#validsyntax))
(def $popedit ($ :#popedit))
(def $popview ($ :#popview))
(def $selectbtn ($ :#selectbtn))

(def ^:dynamic uuid-reg #"[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}")

(defn update-flow []
  (if-let [[text len rows] (tf/write-or-err (val $intext))]
    (do
      (val $outtext text)
      (css $outtext :width (str (+ 15 len) "ex"))
      (let [h (str (int (* 3.5 (+ 3 rows))) "ex")]
        (css $outtext :height h)
        (css $intext  :height h))
      (css $validsyntax :display "block")
      (css $syntaxerror :display "none"))
    (do
      (css $validsyntax :display "none")
      (css $syntaxerror :display "block"))))

(defn clear-popups []
  (css $popedit :display "none")
  (css $popview :display "none"))
  
(defn path [] (str (.-location js/window)))

(defn save-intext [sid]
  (let [url sid]
    (.log js/console (str "post:" url))
    (ajax url {:contentType "text/plain" :async true :type "POST" :data (pr-str (val $intext))})
    ))

(bind $selectbtn "click"
      #(do
         (update-flow)
         (let [id (utils/uuid)
               sid (str (str/replace (path) uuid-reg "") id)]
           (save-intext sid)
           (val $outtext (str (val $outtext) (reduce str (repeat 4 "\n")) sid)))
         (.select $outtext)))

(if (empty? (val $intext))
  (val $intext tf/*example*)
  (clear-popups))
  

(bind $intext "input" #(do (update-flow)
                           (clear-popups)))
(update-flow)