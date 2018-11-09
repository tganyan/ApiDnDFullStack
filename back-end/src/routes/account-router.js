'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const faker = require('faker');

const CLIENT_URL = 'http://localhost:8080';
const GOOGLE_BACKEND = 'https://www.googleapis.com/oauth2/v4/token';
const API_URL = 'http://localhost:4000/oauth/google';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

const Account = require('../models/account');
const logger = require('../lib/logger');
const Character = require('../models/character');
const premade = require('../lib/premade-class');
const dungeon = require('../lib/descriptions');
const basicAccountMiddleware = require('../lib/basic-account-middleware');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

// ============================================================================
// ACCOUNT SIGN-UP
// ============================================================================
router.post('/api/signup', jsonParser, (request, response, next) => {
  console.log('REQUEST BODY', request.body);
  let idToUser = 0;
  if (!request.body.password) {
    return next(new HttpError(401, ''));
  }

  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((createdAccount) => {
      delete request.body.password;
      return new Character({
        name: faker.name.firstName(),
        class: premade.fighter,
        currentRoom: dungeon.dungeonDescriptions[0],
        account: createdAccount._id,
      }).save()
        .then((character) => {
          createdAccount.character.push(character._id);
          idToUser = character._id;
          character.save();
          logger.log(logger.INFO, 'Creating token');
          return createdAccount.pCreateToken();
        });
    })
    .then((token) => {
      logger.log(logger.INFO, 'Responding with a 200 status code and a token');
      return response.json(
        {
          token,
          id: idToUser,
        },
      );
    })
    .catch(error => next(error));
});

// ===============================+=============================================
// ACCOUNT LOG-IN
// ============================================================================
router.get('/api/login', basicAccountMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'bad request'));
  }
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'responding with 200 status code and a token');
      return response.json({ token });
    })
    .catch(next);
});

// ===============================+=============================================
// GOOGLE LOG-IN
// ============================================================================

router.get('/oauth/google', (request, response) => {
  if (!request.query.code) {
    response.redirect(CLIENT_URL);
  } else {
    return superagent.post(GOOGLE_BACKEND)
        .type('form')
        .send({
          code: request.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: API_URL
        })
        .then(tokenResponse => {
          if (!tokenResponse.body.access_token) {
            response.redirect(CLIENT_URL);
          }

          const googleToken = tokenResponse.body.access_token;

          return superagent.get(OPEN_ID_URL)
              .set('Authorization', `Bearer ${googleToken}`);
        })
        .then(openIdResponse => {
          console.log(openIdResponse.body);


          response.cookie('APIDND-OAUTH-TOKEN', 'Token for brave warriors');
          response.redirect(CLIENT_URL);
        })
        .catch(error => {
          console.error(error);
          response.redirect(CLIENT_URL);
        });
  }
});
