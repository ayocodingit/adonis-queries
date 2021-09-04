# Adonis Queries

query builder lucid adonis

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