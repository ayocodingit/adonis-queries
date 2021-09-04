# Adonis Queries

Query builder lucid adonis.

This package adds a query builder for use in the adonis framework. These query builders include:
 - when
 - whereBy and orWhereBy
 - whereDate and whereBetween
 - whereHasBy and orWhereHasBy

## How To Use
Installation
```bash
npm i adonis-queries
```

Make trait Query
```javascript
adonis make:trait Query
```

Register adonis queries on trait Query
```javascript
const Queries = require('adonis-queries')

class Query {
  register (Model) {
    Queries(Model)
  }
}

module.exports = Query
```

Use to Model
```javascript
class User extends Model {
  static boot () {
    super.boot()
    this.addTrait('Query')
  }
}
```
