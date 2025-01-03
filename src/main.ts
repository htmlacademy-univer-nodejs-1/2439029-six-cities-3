import 'reflect-metadata';
import {Container} from 'inversify';
import {createUserContainer} from "./shared/modules/user/index.js";
import {createOfferContainer} from "./shared/modules/offer/index.js";
import {createCommentContainer} from "./shared/modules/comments/index.js";
import {Application} from "express";
import {Component} from "./shared/types/index.js";
import {createRestApplicationContainer} from "./rest/index.js";

const mainContainer = Container.merge(createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer());
const application = mainContainer.get<Application>(Component.RestApplication);
await application.init();
