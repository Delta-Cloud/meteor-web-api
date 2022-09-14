import { Meteor } from "meteor/meteor";
import apiController from "./apiController";
import bodyParser from "body-parser";

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    bodyParser.json()(req, res, next);
  });

  WebApp.connectHandlers.use("/hello", apiController.getHello);
  WebApp.connectHandlers.use("/links", apiController.manageLink);
});
