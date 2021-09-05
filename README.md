# Adonis Queries

Query builder lucid adonis. this package is inspired by laravel query builder

This package adds a query builder for use in the adonis framework. These query builders include:
 - when
 - whereDate
 - whereBetween and whereNotBetween
 - whereBy and orWhereBy 
 - whereHasBy and orWhereHasBy
 - exists and doesntExist
 - value

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
model.whereDateNotBetween('created_at', [request.input('start_date'), request.input('end_date')])
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
### query whereHasBy and orWhereHasBy
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

### Addition

#### Exists and DoesntExist
```javascript
# return boolean true or false
model.exists()
model.doesntExist()
```

#### Value
```javascript
# return single field
model.value('email')
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
## License
Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
