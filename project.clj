(defproject textflow "0.1.0-SNAPSHOT"
  :description "Online generation of RFC like call flows"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.3" :exclusions [ring/ring-core]]
                 [hiccup "1.0.2"]
                 [ring/ring-devel "1.1.6"]
                 [ring/ring-jetty-adapter "1.1.0"]
                 [jayq "2.0.0"]]
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
                       :prod {
                              :source-path "src-cljs"
                              :compiler
                              {
                               :output-to "resources/public/js/cljs.js"
                               :optimizations :advanced
                               :pretty-print false
                               :externs ["resources/public/js/jquery-1.8.2.min.js"
                                         "resources/public/js/bootstrap.min.js"]
                               }
                              }
                       }
              }
  :production {:misc "configuration"
               :offline true
               :mirrors {#"central|clojars"
                         "http://s3pository.herokuapp.com/clojure"}}
  :main textflow.server)

;; lein trampoline cljsbuild repl-rhino
;; lein cljsbuild once
