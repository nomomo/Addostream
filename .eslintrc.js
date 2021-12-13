module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals": {
        "$": true,
        "jQuery": true,
        "chat_manager": true,
        "GM_setting": true,
        "ADD_config": true, 
        "nomo_global": true,
        "chatlog_local": true,
        "nude": true, 
        "GM": true,
        "unsafeWindow": true, 
        "GM_addStyle": true,
        "GM_getTab": true,
        "GM_getTabs": true,
        "GM_saveTab": true,
        "GM_xmlhttpRequest": true, 
        "document": true, 
        "console": true, 
        "location": true, 
        "setInterval": true, 
        "setTimeout": true, 
        "clearInterval": true, 
        "page": true, 
        "ignores": true, 
        "exportFunction": true, 
        "dsStream": true, 
        "chat_manager_main": true, 
        "Autolinker": true
    },
    "rules": {
        //"prefer-template": 2,
        "no-global-assign": ["error", {"exceptions": ["page","ignores"]}],
        "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
        "no-console":0,
        "indent": [
            "error",
            4
        ],
        // "quotes": [
        //     "error",
        //     "double"
        // ],
        "semi": [
            "error",
            "always"
        ]
    }
};