(ns textflow.client
  (:use [jayq.core :only [$ delegate toggle val bind on attr css]])
  (:require [textflow.logic :as tf]
            [textflow.utils :as utils]))



(def $intext ($ :#intext))
(def $outtext ($ :#outtext))
(def $syntaxerror ($ :#syntaxerror))
(def $validsyntax ($ :#validsyntax))
(def $popedit ($ :#popedit))
(def $popview ($ :#popview))
(def $selectbtn ($ :#selectbtn))

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

(defn update-flow-and-clear-popups []
  (css $popedit :display "none")
  (css $popview :display "none")
  (update-flow))

(defn path [] (.-location js/window))

(bind $selectbtn "click"
      #(do
         (update-flow)
         (val $outtext (str (val $outtext) (path) "/" (utils/uuid)))
         (.select $outtext)))

(val $intext tf/*example*)
(bind $intext "input" update-flow-and-clear-popups)
(update-flow)

