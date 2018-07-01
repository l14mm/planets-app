module.exports = {
    "extends": "airbnb",
    "rules": { 
        "react/jsx-filename-extension": [0],
        "react/destructuring-assignment": [0],
        "react/jsx-no-undef": [0],
        "linebreak-style": ["error", "windows"]
    },
    "env": { 
        "browser": true,
        "jest": true
    },
    "globals":{
        "require": true
    }
};