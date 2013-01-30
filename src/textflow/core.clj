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
(def ^:dynamic *description*
  "Text Flow Online is a small utility which allow you to create simple text
like call flows (sequence diagrams) on the fly, much like call flows in RFCs")

(defn doc-section [name h & rest]
  (html
   [:a {:name name}]
    [:h4 h]
    [:p rest]))

(def ^:dynamic *about*
  (doc-section "about" "About" (str *description* ". Implemented using Clojure, Clojurescript and Bootstrap")))

(def ^:dynamic *contact*
  (doc-section "contact" "Contact" "Create by Tzach Livyatan. You can contact me via the project " (source-link "Github")))


(defn popup [id class [x y] h text]
  [:div {:id id :class class :style (str "top: " x "px; left: " y "px; display: block;")}
   [:div.arrow]
   [:div.popover-inner
    [:h3.popover-title h]
    [:div.popover-content text]
    ]])
  
(def ^:dynamic *popedit*
  (popup "popedit" "popover fade right in" [210 225] "Edit"  "Write Text here"))

(def ^:dynamic  *popview*
  (popup "popview" "popover fade left in" [325 375] "View" "View Call Flow here"))
  
(defn syntax [id class text]
  [:div.row {:id id} [:div.span8 [:div {:class class}
                                     [:button.close {:type "button" :data-dismiss "alert"} "x"]
                                  [:strong text]]]])

(def ^:dynamic *syntaxerror* (syntax "syntaxerror" "alert alert-error" "Syntax Error"))
(def ^:dynamic *validsyntax* (syntax "validsyntax" "alert alert-success" "Valid Syntax"))

(def ^:dynamic *select*
  [:div#select.row [:div.span8 [:button#selectbtn.btn {:rel "tooltip" :title "use Ctrl+C to copy after select"} "Select"]]])

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
             [:textarea {:type "text" :class "outtext" :id "outtext" :readonly "true"}]
             *popview*
             *select*
             ]]
           [:p][:p][:p][:hr]
           [:div.row
            [:div.span10  *about*]]
           [:div.row
            [:div.span10  *contact*]]
           (include-js "js/jquery-1.8.2.min.js")
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


