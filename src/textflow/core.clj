(ns textflow.core
  (:use compojure.core
        hiccup.core
        hiccup.form
        hiccup.page
        hiccup.element)
  (:require [compojure.handler :as handler]
            [ring.middleware.resource :as resources]
            [compojure.route :as route]
            [ring.util.response :as ring-res]
            [ring.adapter.jetty :as ring-adpt]
            ))

(def *css* [:link {:type "text/css" :rel "stylesheet" :href "stylesheets/main.css"}])
(def *about*
     (html
      [:p] "tip: make sure to paste with Courier New or Consolas font, to keep spacing correct"
      [:hr]
      [:p"This is a toy service which come with NO warranties what so ever."]
      [:p"(str \"tzach.\"  \"livyatan\" \"@gmail.com\")"]
      [:p "v.2.0"]
      ))

(defn main-page []
  (html5
   [:head
    *css*
    [:h1 "Online generation of RFC like call flows"]
    [:h3 "a.k.a sequence diagrams"]]
   [:body
    [:p "update the text part"]
    [:p]
    [:textarea {:type "text" :cols "30" :rows "15" :id "intext"}]
    [:p]
    [:textarea {:type "text" :cols "60" :rows "20" :id "outtext"}]
    (include-js "http://code.jquery.com/jquery-1.8.2.min.js")
    (include-js "js/cljs.js")
    [:p]
    [:p]
    *about*
    ]))

(defroutes app-routes
  (GET "/" [] (main-page))
  (route/not-found "Not Found"))

;;(def app
;;  (handler/site app-routes))

(def app 
  (-> app-routes
    (resources/wrap-resource "public")))

(defn start [port]
  (ring-adpt/run-jetty app-routes {:port 8080 :join? false}))

(defn -main []
  (let [port (Integer. (System/getenv "PORT"))]
    (start port)))

    
