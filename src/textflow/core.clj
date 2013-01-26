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

(def ^:dynamic *bootstrap-css* [:link { :href "stylesheets/bootstrap.css" :rel "stylesheet" :media "screen"}])
(def ^:dynamic *my-css*  [:link {:type "text/css" :rel "stylesheet" :href "stylesheets/main.css"}])

(def ^:dynamic *about*
     (html
      [:p] "tip: make sure to paste with Courier New or Consolas font, to keep spacing correct"
      [:hr]
      [:p (link-to "https://github.com/tzach/textflow" "source")]
      [:p "v.2.0"]
      ))

(defn main-page []
  (html5
   [:head
    *bootstrap-css*
    *my-css*
    [:h1 "Online generation of RFC like call flows"]
    [:h3 "a.k.a sequence diagrams"]]
   [:body
    [:p "update the text part"]
    [:p]
    [:textarea {:type "text" :cols "30" :rows "15" :class "intext" :id "intext"}]
    [:p]
    [:textarea {:type "text" :class "outtext" :id "outtext"}]
    (include-js "http://code.jquery.com/jquery-1.8.2.min.js")
    (include-js "js/cljs.js")
    (include-js "js/bootstrap.js")
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
  (ring-adpt/run-jetty #'app {:port 8080 :join? false}))

(defn -main ([port]
                (ring-adpt/run-jetty app {:port (Integer. port)}))
  ([] (-main 8080)))


