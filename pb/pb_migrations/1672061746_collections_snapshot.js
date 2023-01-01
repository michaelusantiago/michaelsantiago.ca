migrate((db) => {
  const snapshot = [
    {
      "id": "systemprofiles0",
      "created": "2022-11-19 01:20:51.785Z",
      "updated": "2022-12-07 20:47:18.183Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "pbfieldavatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif"
            ],
            "thumbs": null
          }
        },
        {
          "system": false,
          "id": "gyuki2vd",
          "name": "gender",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "Masculine",
              "Feminine"
            ]
          }
        },
        {
          "system": false,
          "id": "pbfieldname",
          "name": "first_name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "jnlostk2",
          "name": "last_name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "e4znfzfy",
          "name": "birth_date",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 25,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "u2ga3rai",
          "name": "role",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "jxkcery7",
          "name": "is_online",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "luqh3zqu",
          "name": "is_typing",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "obqm2zkl",
          "name": "is_chatting_to",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": false,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": true
      }
    },
    {
      "id": "jbs91u5dx70nfdj",
      "created": "2022-11-19 07:31:24.258Z",
      "updated": "2022-12-06 12:14:12.802Z",
      "name": "posts",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "csyiqjnf",
          "name": "content",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "hnwj3fbm",
          "name": "document",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/*",
              "application/*"
            ],
            "thumbs": []
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.role = 0",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "ngf3iu9xtw7w6fr",
      "created": "2022-11-24 13:00:58.933Z",
      "updated": "2022-12-06 12:14:12.802Z",
      "name": "chats",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "lgob2iiu",
          "name": "from",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ztrwdnxs",
          "name": "to",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "oehvlmwx",
          "name": "message",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 1000,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "yr4slm4j",
          "name": "read",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "8ztpd775t87m1m7",
      "created": "2022-12-02 01:44:08.614Z",
      "updated": "2022-12-06 12:14:12.802Z",
      "name": "utilities",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "lpaiqq7w",
          "name": "key",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "elw4z016",
          "name": "value",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "isyyouha",
          "name": "remarks",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
