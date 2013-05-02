(defproject textflow "0.1.4"
  :description "Online generation of RFC like call flows"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.5" :exclusions [ring/ring-core]]
                 [hiccup "1.0.3"]
                 [com.novemberain/monger "1.5.0"]
                 [ring/ring-devel "1.1.8"]
                 [ring/ring-jetty-adapter "1.1.8"]
                 [ring/ring-json "0.2.0"]
                 [jayq "2.3.0"]
                 [com.newrelic.agent.java/newrelic-api "2.17.2"]
                 [org.clojure/tools.reader "0.7.0"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-cljsbuild "0.3.0"]]
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

  ;; todo
  ;; testing with midjet
  ;; https://github.com/marick/Midje

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
)