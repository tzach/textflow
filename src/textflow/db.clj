(ns textflow.db
  (:use [monger.core :only [get-db connect connect-via-uri]])
  (:require [monger.collection :as mc])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))


(defn init []
  (if-let [conn-url (System/getenv "MONGOLAB_URI")]
    (do
      (println "remote Mongo DB")
      (connect-via-uri conn-url))
    (do
      (println "local MongoDB")
      (get-db (connect) "test"))))
 
(defn put [key text]
  "insert text into DB, return id. will not update if key already exist"
  (mc/insert "documents" { :key key :intext text }))

(defn get-key [key]
  (try
    (mc/find-one-as-map "documents" { :key key })
    (catch Exception e
      (prn (str key " not found"))
      nil)))
