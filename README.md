# Adonis Queries

Query builder lucid adonis.

This package adds a query builder for use in the adonis framework. These query builders include:
 - when
 - whereBy and orWhereBy
 - whereDate and whereBetween
 - whereHasBy and orWhereHasBy

How To Use
```bash
adonis make:trait Query
```

```bash
const Queries = require('adonis-queries')

class Query {
  register (Model) {
    Queries(Model)
  }
}

module.exports = Query
```

How To Use Model

```bash
class User extends Model {
  static boot () {
    super.boot()
    this.addTrait('Query')
  }
}
```
