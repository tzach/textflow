(ns textflow.db
  (:use [monger.core :only [connect! connect set-db! get-db connect-via-uri!]])
  (:require [monger.collection :as mc])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))


(if-let [conn-url (System/getenv "MONGOLAB_URI")]
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
