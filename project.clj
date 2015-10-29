(defproject textflow "0.1.5"
  :description "Online generation of RFC like call flows"
  :url "https://github.com/tzach/textflow"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.4.0" :exclusions [ring/ring-core]]
                 [hiccup "1.0.5"]
                 [com.novemberain/monger "3.0.1"]
                 [ring/ring-devel "1.4.0"]
                 [ring/ring-jetty-adapter "1.4.0"]
                 [ring/ring-json "0.4.0"]
                 [jayq "2.5.4"]
;;                 [com.newrelic.agent.java/newrelic-api "2.17.2"]
                 [org.clojure/tools.reader "0.10.0"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-cljsbuild "1.1.0-SNAPSHOT"]]
;;  :hooks [leiningen.cljsbuild]
  :cljsbuild {:builds
              [{:source-paths ["src-cljs"],
                :id "dev",
                :compiler
                {:pretty-print true,
                 :output-to "resources/public/js/cljs.js",
                 :optimizations :whitespace}}
               {:source-paths ["src-cljs"],
                :id "production",
                :compiler
                {:pretty-print false,
                 :output-to "resources/public/js/cljs.js",
                 :externs
                 ["resources/public/js/jquery-1.8.2.min.js"
                  "resources/public/js/bootstrap.min.js"],
                 :optimizations :simple}}]
              }
  :production {:misc "configuration"
               :offline true
               :mirrors {#"central|clojars"
                         "http://s3pository.herokuapp.com/clojure"}}
  :main textflow.server
  )

 

  ;; usfull commands
  ;; lein trampoline cljsbuild repl-rhino
  ;; lein cljsbuild once dev
  ;; curl --request POST -H "Content-Type: application/json" --upload-file ~/textflow/test/textflow/put.json http://127.0.0.1:8080/115
  ;; curl --request GET -H "Content-Type: application/json" http://127.0.0.1:8020/15
  ;; interactive
  ;; lein trampoline cljsbuild repl-listen


  ;; compile results
  ;; 901034 Apr 15 16:31 cljs.js :optimizations :whitespace
  ;; 645821 Apr 15 21:06 cljs.js :optimizations :simple
