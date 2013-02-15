(defproject textflow "0.1.0-SNAPSHOT"
  :description "Online generation of RFC like call flows"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.3" :exclusions [ring/ring-core]]
                 [hiccup "1.0.2"]
                 [com.novemberain/monger "1.4.2"]
                 [ring/ring-devel "1.1.6"]
                 [ring/ring-jetty-adapter "1.1.0"]
                 [jayq "2.0.0"]
                 [ring/ring-json "0.1.2"]
                 [liberator "0.8.0"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-cljsbuild "0.2.10"]]
  :hooks [leiningen.cljsbuild]
  :cljsbuild { 
              :builds {
                       :main {
                              :source-path "src-cljs"
                              :compiler
                              {
                               :output-to "resources/public/js/cljs.js"
                               :optimizations :whitespace
                               :pretty-print true
                               }
                              }
                       ;; :prod {
                       ;;        :source-path "src-cljs"
                       ;;        :compiler
                       ;;        {
                       ;;         :output-to "resources/public/js/cljs.js"
                       ;;         :optimizations :advanced
                       ;;         :pretty-print false
                       ;;         :externs ["resources/public/js/jquery-1.8.2.min.js"
                       ;;                   "resources/public/js/bootstrap.min.js"]
                       ;;         }
                       ;;        }
                       }
              }
  :production {:misc "configuration"
               :offline true
               :mirrors {#"central|clojars"
                         "http://s3pository.herokuapp.com/clojure"}}
  :main textflow.server)

;; todo
;; testing with midjet
;; https://github.com/marick/Midje

;; lein trampoline cljsbuild repl-rhino
;; lein cljsbuild once
;; curl --request POST -H "Content-Type: application/json" --upload-file ~/textflow/test/textflow/put.json http://127.0.0.1:8080/115
;; curl --request GET -H "Content-Type: application/json" http://127.0.0.1:8020/15
;; interactive
;; lein trampoline cljsbuild repl-listen