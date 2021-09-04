# Adonis Queries

Query builder lucid adonis.

This package adds a query builder for use in the adonis framework. These query builders include:
 - when
 - whereDate
 - whereBetween
 - whereBy and orWhereBy 
 - whereHasBy and orWhereHasBy

## Example:
### Query when

#### Before
```javascript
if (request.input('search')) {
  model.where('name', request.input('search'))
}
```
#### After
```javascript
model.when(request.input('search'), query => {
  query.where('name', request.input('search'))
})
```
### Query whereDate
#### Before
```javascript
if (request.input('date')) {
  model.whereRaw(`DATE(created_at) = ?`, [request.input('date')])
}
```
#### After
```javascript
# by default operator is '=', but use custom other operator '<', '>', '<=', '<>', '>='
model.whereDate('created_at', request.input('date'), operator)
```

### Query whereDateBetween
#### Before
```javascript
if (request.input('start_date') && request.input('end_date')) {
  model.whereRaw(`DATE(created_at) BETWEEN ? AND ?`, [request.input('start_date'), request.input('end_date')])
}
```
#### After
```javascript
model.whereDateBetween('created_at', [request.input('start_date'), request.input('end_date')])
```

### Query whereBy and orWhereBy
#### Before
```javascript
if (request.input('search')) {
  model.where('name', request.input('search'))
}
```
#### After
```javascript
# by default operator is '=', but use custom other operator '<', '>', '<=', '<>', '>=', 'like or ilike'
model.whereBy('name', request.input('search'), operator)
 .orWhereBy('username', request.input('search'), operator)
```
query whereHasBy and orWhereHasBy
#### Before
```javascript
if (request.input('search')) {
  model.whereHas('users', query => {
    query.where('name', request.input('search'))
  })
}
```
#### After
```javascript
# by default operator is '=', but use custom other operator '<', '>', '<=', '<>', '>=', 'like or ilike'
model.whereHasBy('users', 'name', request.input('search'), operator)
 .orWhereHasBy('users', 'username', request.input('search'), operator)
```

## How To Use
Installation
```bash
npm i adonis-queries --save
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
