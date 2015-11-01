(ns textflow.db
  (:use [monger.core :only [get-db connect connect-via-uri]])
  (:require [monger.collection :as mc])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))

(def db (atom nil))

(defn init []
  (if-let [conn-url (System/getenv "MONGOLAB_URI")]
    (do
      (println "remote Mongo DB: " conn-url)
      (reset! db (connect-via-uri conn-url)))
    (do
      (println "local MongoDB")
      (reset! db (get-db (connect) "test")))))
 
(defn put [key text]
  "insert text into DB, return id. will not update if key already exist"
  (mc/insert @db "documents" { :key key :intext text }))

(defn get-key [key]
  (try
    (mc/find-one-as-map @db "documents" { :key (str key) })
    (catch Exception e
      (prn (str key " not found"))
      nil)))
