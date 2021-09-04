'use scrict'

const moment = require('moment')

const formatDate = (value) => {
    return moment(value).format('YYYY-MM-DD')
}

const isValidDate = (value) => {
    return moment(value).isValid()
}

const conditionBetween = (value) => {
    return Array.isArray(value) && value.length === 2 && isValidDate(value[0]) && isValidDate(value[1])
}

const when = (Model) => {
  Model.queryMacro('when', function (value, callback) {
    if (value) {
      const query = this
      callback(query)
    }
    return this
  })
}

const whereBy = (Model) => {
  Model.queryMacro('whereBy', function (key, value, operator = '=') {
    this.when(value, query => {
      query.where(key, operator, value)
    })
    return this
  })
  Model.queryMacro('orWhereBy', function (key, value, operator = '=') {
    this.when(value, query => {
      query.orWhere(key, operator, value)
    })
    return this
  })
}

const whereDate = (Model) => {
  Model.queryMacro('whereDate', function (key, value, operator = '=') {
    this.when(value && isValidDate(value), query => {
      query.whereRaw(`DATE(${key}) ${operator} ?`, [formatDate(value)])
    })
    return this
  })
  Model.queryMacro('whereDateBetween', function (key, value) {
    this.when(conditionBetween(value), query => {
      query.whereRaw(`DATE(${key}) BETWEEN ? AND ?`, [formatDate(value[0]), formatDate(value[1])])
    })
    return this
  })
}

const whereHas = (Model) => {
  Model.queryMacro('whereHasBy', function (relation, key, value, operator = '=') {
    this.when(value, query => {
      query.whereHas(relation, query => {
        query.where(key, operator, value)
      })
    })
    return this
  })
  Model.queryMacro('orWhereHasBy', function (relation, key, value, operator = '=') {
    this.when(value, query => {
      query.orWhereHas(relation, query => {
        query.where(key, operator, value)
      })
    })
    return this
  })
}

module.exports = (Model) => {
  when(Model)
  whereBy(Model)
  whereDate(Model)
  whereHas(Model)
}