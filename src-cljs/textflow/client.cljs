(ns textflow.client
  (:use [jayq.core :only [$ delegate toggle val bind on]])
  (:require [textflow.logic :as tf]))

(def $intext ($ :#intext))
(def $outtext ($ :#outtext))

(defn update-flow []
  (val $outtext (tf/write-or-err (val $intext))))

(val $intext tf/*example*)
(bind $intext "input" update-flow)
(update-flow)