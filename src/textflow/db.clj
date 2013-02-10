(ns textflow.db
  (:use [monger.core :only [connect! connect set-db! get-db connect-via-uri!]])
  (:require [monger.collection :as mc])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))


(if-let [conn-url (System/getenv "MONGOHQ_URL")]
  (connect-via-uri! conn-url)
  (do
    (connect!)
    (set-db! (monger.core/get-db "test"))))

(defn put [key text]
  "insert text into DB, return id"
  (mc/insert "documents" { :key key :intext text }))

(defn get [key]
  (try
    (mc/find-one-as-map "documents" { :key key })
    (catch Exception e
      (prn (str key " not found"))
      nil)))


;; (put "1fea999c0364d8e880c05157" "horray!")
;; (get "1fea999c0364d8e880c05157")