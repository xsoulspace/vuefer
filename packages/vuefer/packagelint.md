```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,,tsx,vue}": "eslint --fix",
    "*": "prettier -w -u"
  }
```
