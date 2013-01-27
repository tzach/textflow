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
   [:div.about
    [:p] "tip: make sure to paste with Courier New or Consolas font, to keep spacing correct"
    [:hr]
    [:p (link-to "https://github.com/tzach/textflow" "source")]
    [:p "v.2.1"]]
    ))

(def ^:dynamic *popedit* 
        [:div#popedit {:class "popover fade right in" :style "top: 230px; left: 225px; display: block;"}
         [:div.arrow]
         [:div.popover-inner
          [:h3.popover-title "Edit"]
          [:div.popover-content "Write Call Flow text here"]
          ]])


(def ^:dynamic *popview*
       [:divv#popview {:class "popover fade left in" :style "top: 325px; left: 350px; display: block;"}
        [:div.arrow]
        [:div.popover-inner
         [:h3.popover-title "View"]
         [:div.popover-content "See Call Flow result here"]
         ]])  

(def ^:dynamic *syntaxerror*
  [:div#syntaxerror.row [:div.span4 [:div {:class "alert alert-error"}
                                     [:button.close {:type "button" :data-dismiss "alert"} "x"]
                                     [:strong "Syntax Error"]]]])

(def ^:dynamic *validsyntax*
  [:div#validsyntax.row [:div.span4 [:div {:class "alert alert-success"}
                                     [:button.close {:type "button" :data-dismiss "alert"} "x"]
                                     [:strong "Valid Syntax"]]]])
  
(defn main-page []
  (html5 {:lang "en"}
   [:head
    *bootstrap-css*
    *my-css*]
   [:body
    [:div.container-fluid
     [:div.header 
      [:h2 "Online generation of RFC like call flows"]
      [:h3 "a.k.a sequence diagrams"]]
     [:div.row-fluid
      [:div.span4
       [:textarea {:type "text" :rows "12" :class "intext" :id "intext"}]
       *popedit*
       *syntaxerror*
       *validsyntax*
       ]
      [:div.span8
       [:textarea {:type "text" :class "outtext" :id "outtext"}]
       *popview*
       ]]
     
     [:div.row
      [:div.span5  *about*]]
    
    (include-js "http://code.jquery.com/jquery-1.8.2.min.js")
    (include-js "js/cljs.js")
    (include-js "js/bootstrap.js")
    ]]
   ))

(defroutes app-routes
  (GET "/" [] (main-page))
  (route/not-found "Not Found"))

;;(def app
;;  (handler/site app-routes))

(def app 
  (-> app-routes
    (resources/wrap-resource "public")))

(defn start [port]
  (ring-adpt/run-jetty #'app {:port port :join? false}))

(defn -main ([port]
                (ring-adpt/run-jetty app {:port (Integer. port)}))
  ([] (-main 8080)))


