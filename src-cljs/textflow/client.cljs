(ns textflow.client
  (:use [jayq.core :only [$ delegate toggle val bind on attr css]])
  (:require [textflow.logic :as tf]))

(def $intext ($ :#intext))
(def $outtext ($ :#outtext))

(defn update-flow []
  (let [[text len rows] (tf/write-or-err (val $intext))]
    (do
      (val $outtext text)
      (css $outtext :width (str (+ 15 len) "ex"))
      (css $outtext :height (str (+ 5 (* 6 rows)) "ex")))))


(val $intext tf/*example*)
(bind $intext "input" update-flow)
(update-flow)