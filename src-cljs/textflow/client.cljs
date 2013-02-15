(ns textflow.client
  (:use [jayq.core :only [$ delegate toggle val bind on attr css ajax xhr]]
        [jayq.util :only [log]])
  (:require [textflow.logic :as tf]
            [textflow.utils :as utils]
            [clojure.string :as str]
            [clojure.browser.repl :as repl]
            ))

;; run REPL
(repl/connect "http://localhost:9000/repl")

;; utils
(def ^:dynamic uuid-reg #"#[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}")


;; bind to DOM
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

(defn clear-popups []
  (css $popedit :display "none")
  (css $popview :display "none"))
  

;; AJAX
(defn path [] (str (.-location js/window)))
(defn site [] (str/replace (path)  #"#.*" ""))
(defn get-win-hash [] (->> js/window.location.hash
                  rest
                  (apply str)))



(defn update-document [id body]
  (let [post-uri (str (site) id)]
    (ajax post-uri  {:async true
                     :type "PUT"
                     :dataType "json"
                     :data  (clj->js body)
                     })))



(defn get-document [id]
  (let [get-uri (str (site)  id)]
    (log (str "get-document:" get-uri))
    (xhr [:get get-uri] {}
         #(do (->> %
                   js->clj
                   ("intext")
                   (val $intext))
              (update-flow)
              ))))

;; working examples
;; (update-document 4459 {:intext "hello clojure!"})
;; (get-document 4459)

;; event binding
(bind $selectbtn "click"
      #(do
;         (update-flow)
         (let [id (utils/uuid)
               base (str/replace (path) uuid-reg "")
               hash-id (str "#" id)
               url (str base hash-id)]
           (update-document id {:intext (val $intext)})
           (set! js/window.location.hash hash-id)
           (val $outtext (str (val $outtext) (reduce str (repeat 4 "\n")) url))
           (.select $outtext))))
  
(bind $intext "input" #(do (update-flow)
                           (clear-popups)))

(bind ($ js/window) "hashchange"
      #(let [h (get-win-hash)]
         (do
           (log "hashchange changed to: " h)
           (when (seq h)
             (when-not
                 (when-let [rf (seq (re-find #"/#.*$" (val $outtext)))]
                   (= h (subs (apply str rf) 2)))
               (get-document h))
               ))))

;; exe when page loading
(let [h (get-win-hash)]
  (if (empty? h)
    (do
      (log "lets start with an example")
      (val $intext tf/*example*)
      (update-flow))
    (do (get-document h)
        (clear-popups))))
