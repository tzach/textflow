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

(defn source-link [name] (link-to "https://github.com/tzach/textflow" name))
(def ^:dynamic *description* "Text Flow Online is a small utility which allow you to create simple text
like call flows (sequence diagrams) on the fly, much like call flows in RFCs")


(def ^:dynamic *about*
  (html
   [:a {:name "about"}]
    [:h4 "About"]
    [:p *description*]
    [:p "Implemented using Clojure, Clojurescript and Bootstrap"]))

(def ^:dynamic *contact*
  (html
   [:a {:name "contact"}]
   [:h4 "Contact"]
   [:p "Create by Tzach Livyatan. You can contact me via the project " (source-link "Github")]))

(def ^:dynamic *popedit* 
  [:div#popedit {:class "popover fade right in" :style "top: 230px; left: 225px; display: block;"}
   [:div.arrow]
   [:div.popover-inner
    [:h3.popover-title "Edit"]
    [:div.popover-content "Write Call Flow text here"]
    ]])


(def ^:dynamic *popview*
  [:divv#popview {:class "popover fade left in" :style "top: 325px; left: 375px; display: block;"}
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

(def ^:dynamic *menu*
          [:div {:class "navbar navbar-inverse navbar-fixed-top"}
           [:div {:class "navbar-inner"}
             [:a {:class "btn btn-navbar" :data-toggle "collapse" :data-target ".nav-collapse"}
              [:span {:class "icon-bar"} ]
              [:span {:class "icon-bar"} ]
              [:span {:class "icon-bar"} ]
              ]
             [:a {:class "brand" :href "#"} "Text Flow" ]
             [:div {:class "nav-collapse collapse"}]
             [:ul {:class "nav"} 
              [:li [:a {:href "#about"} "About"]]
              [:li [:a {:href "#contact"} "Contact"]]
              [:li (source-link "Source")]
              ]]])

(defn main-page []
  (html5 {:lang "en"}
         [:head
          [:meta {:charset "utf-8"}]
          [:title "Text Flow"]
          [:viewport { :content "width=device-width" :initial-scale "1.0"} ]
          [:description *description*]
          [:meta {:name "Tzach Livyatan"} ]
          *bootstrap-css*
          *my-css*]
         [:body
          *menu*
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
           [:p][:p][:p][:hr]
           [:div.row
            [:div.span10  *about*]]
           [:div.row
            [:div.span10  *contact*]]
           (include-js "http://code.jquery.com/jquery-1.8.2.min.js")
           (include-js "js/cljs.js")
           (include-js "js/bootstrap.min.js")
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


