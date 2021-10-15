import path from "path";
import express, { Router } from "express";

export const router = Router().use("/api", (req, res) =>
  res.json({ hello: "Hello" })
);

class Server {
  options: Object;

  constructor(options = {}) {
    this.options = options;

    if (typeof options.setupExitSignals === "undefined") {
      options.setupExitSignals = true;
    }
  }

  // static async getHostname(hostname) {
  //   if (hostname === "local-ip") {
  //     return (await internalIp.v4()) || (await internalIp.v6()) || "0.0.0.0";
  //   } else if (hostname === "local-ipv4") {
  //     return (await internalIp.v4()) || "0.0.0.0";
  //   } else if (hostname === "local-ipv6") {
  //     return (await internalIp.v6()) || "::";
  //   }

  //   return hostname;
  // }

  // static async getFreePort(port) {
  //   if (typeof port !== "undefined" && port !== null && port !== "auto") {
  //     return port;
  //   }

  //   const pRetry = require("p-retry");
  //   const portfinder = require("portfinder");

  //   portfinder.basePort = process.env.WEBPACK_DEV_SERVER_BASE_PORT || 8080;

  //   // Try to find unused port and listen on it for 3 times,
  //   // if port is not specified in options.
  //   const defaultPortRetry =
  //     parseInt(process.env.WEBPACK_DEV_SERVER_PORT_RETRY, 10) || 3;

  //   return pRetry(() => portfinder.getPortPromise(), {
  //     retries: defaultPortRetry,
  //   });
  // }

  async initialize() {
    // this.setupHooks();
    this.setupApp();
    // this.setupHostHeaderCheck();
    // this.setupDevMiddleware();
    // // Should be after `webpack-dev-middleware`, otherwise other middlewares might rewrite response
    // this.setupBuiltInRoutes();
    // this.setupWatchFiles();
    this.setupFeatures();
    this.createServer();

    if (this.options.setupExitSignals) {
      const signals = ["SIGINT", "SIGTERM"];

      let needForceShutdown = false;

      const exitProcess = () => {
        // eslint-disable-next-line no-process-exit
        process.exit();
      };

      signals.forEach((signal) => {
        process.on(signal, () => {
          if (needForceShutdown) {
            exitProcess();
          }

          this.logger.info(
            "Gracefully shutting down. To force exit, press ^C again. Please wait..."
          );

          needForceShutdown = true;

          this.stopCallback(() => {
            // if (typeof this.compiler.close === "function") {
            //   this.compiler.close(exitProcess);
            // } else {
            exitProcess();
            // }
          });
        });
      });
    }
  }

  setupApp() {
    // Init express server
    // eslint-disable-next-line new-cap
    this.app = new express();
  }

  setupStaticFeature() {
    this.options.static.forEach((staticOption) => {
      staticOption.publicPath.forEach((publicPath) => {
        this.app.use(
          publicPath,
          express.static(staticOption.directory, staticOption.staticOptions)
        );
      });
    });
  }

  // setupStaticServeIndexFeature() {
  //   const serveIndex = require("serve-index");

  //   this.options.static.forEach((staticOption) => {
  //     staticOption.publicPath.forEach((publicPath) => {
  //       if (staticOption.serveIndex) {
  //         this.app.use(publicPath, (req, res, next) => {
  //           // serve-index doesn't fallthrough non-get/head request to next middleware
  //           if (req.method !== "GET" && req.method !== "HEAD") {
  //             return next();
  //           }

  //           serveIndex(staticOption.directory, staticOption.serveIndex)(
  //             req,
  //             res,
  //             next
  //           );
  //         });
  //       }
  //     });
  //   });
  // }

  setupOnBeforeSetupMiddlewareFeature() {
    this.options.onBeforeSetupMiddleware(this);
  }

  setupFeatures() {
    const features = {
      // compress: () => {
      //   if (this.options.compress) {
      //     this.setupCompressFeature();
      //   }
      // },
      // proxy: () => {
      //   if (this.options.proxy) {
      //     this.setupProxyFeature();
      //   }
      // },
      // historyApiFallback: () => {
      //   if (this.options.historyApiFallback) {
      //     this.setupHistoryApiFallbackFeature();
      //   }
      // },
      static: () => {
        this.setupStaticFeature();
      },
      // staticServeIndex: () => {
      //   this.setupStaticServeIndexFeature();
      // },
      // staticWatch: () => {
      //   this.setupStaticWatchFeature();
      // },
      onBeforeSetupMiddleware: () => {
        if (typeof this.options.onBeforeSetupMiddleware === "function") {
          this.setupOnBeforeSetupMiddlewareFeature();
        }
      },
      // onAfterSetupMiddleware: () => {
      //   if (typeof this.options.onAfterSetupMiddleware === "function") {
      //     this.setupOnAfterSetupMiddlewareFeature();
      //   }
      // },
      // middleware: () => {
      //   // include our middleware to ensure
      //   // it is able to handle '/index.html' request after redirect
      //   this.setupMiddleware();
      // },
      // headers: () => {
      //   this.setupHeadersFeature();
      // },
      // magicHtml: () => {
      //   this.setupMagicHtmlFeature();
      // },
    };

    const runnableFeatures = [];

    // // compress is placed last and uses unshift so that it will be the first middleware used
    // if (this.options.compress) {
    //   runnableFeatures.push("compress");
    // }

    if (this.options.onBeforeSetupMiddleware) {
      runnableFeatures.push("onBeforeSetupMiddleware");
    }

    // runnableFeatures.push("headers", "middleware");

    // if (this.options.proxy) {
    //   runnableFeatures.push("proxy", "middleware");
    // }

    if (this.options.static) {
      runnableFeatures.push("static");
    }

    // if (this.options.historyApiFallback) {
    //   runnableFeatures.push("historyApiFallback", "middleware");

    //   if (this.options.static) {
    //     runnableFeatures.push("static");
    //   }
    // }

    // if (this.options.static) {
    //   runnableFeatures.push("staticServeIndex", "staticWatch");
    // }

    // if (this.options.magicHtml) {
    //   runnableFeatures.push("magicHtml");
    // }

    // if (this.options.onAfterSetupMiddleware) {
    //   runnableFeatures.push("onAfterSetupMiddleware");
    // }

    runnableFeatures.forEach((feature) => {
      features[feature]();
    });
  }

  createServer() {
    const http = require("http");

    this.server = http.createServer(this.app);

    this.server.on("connection", (socket) => {
      // // Add socket to list
      // this.sockets.push(socket);
      // socket.once("close", () => {
      //   // Remove socket from list
      //   this.sockets.splice(this.sockets.indexOf(socket), 1);
      // });
    });

    this.server.on("error", (error) => {
      throw error;
    });
  }

  async start() {
    this.logger = console;

    await this.initialize();

    // this.options.host = await Server.getHostname(this.options.host);
    // this.options.port = await Server.getFreePort(this.options.port);

    const listenOptions = { host: this.options.host, port: this.options.port };

    await new Promise((resolve) => {
      this.server.listen(listenOptions, () => {
        resolve();
      });
    });

    // if (this.options.webSocketServer) {
    //   this.createWebSocketServer();
    // }

    // if (this.options.bonjour) {
    //   this.runBonjour();
    // }

    // this.logStatus();

    if (typeof this.options.onListening === "function") {
      this.options.onListening(this);
    }
  }

  async stop() {
    // if (this.webSocketServer) {
    //   await new Promise((resolve) => {
    //     this.webSocketServer.implementation.close(() => {
    //       this.webSocketServer = null;

    //       resolve();
    //     });

    //     for (const client of this.webSocketServer.clients) {
    //       client.terminate();
    //     }

    //     this.webSocketServer.clients = [];
    //   });
    // }

    if (this.server) {
      await new Promise((resolve) => {
        this.server.close(() => {
          this.server = null;

          resolve();
        });

        for (const socket of this.sockets) {
          socket.destroy();
        }

        this.sockets = [];
      });

      if (this.middleware) {
        await new Promise((resolve, reject) => {
          this.middleware.close((error) => {
            if (error) {
              reject(error);

              return;
            }

            resolve();
          });
        });

        this.middleware = null;
      }
    }
  }

  stopCallback(callback) {
    this.stop().then(() => callback(null), callback);
  }
}

// https://stackoverflow.com/questions/6398196/detect-if-called-through-require-or-directly-by-command-line
if (process.mainModule.filename === __filename) {
  const defaultOptionsForStatic = {
    directory: path.join(process.cwd(), "public"),
    staticOptions: {},
    publicPath: ["/"],
    serveIndex: { icons: true },
    // // Respect options from compiler watchOptions
    // watch: watchOptions,
  };

  const middleware = router;

  const server = new Server({
    port: 8080,
    static: [defaultOptionsForStatic],
    onBeforeSetupMiddleware: async function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      console.log(["onBeforeSetupMiddleware"]);
      devServer.app.use(require("morgan")("combined")).use(middleware);
    },
  });

  server.start();
}
