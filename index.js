'use scrict'

const moment = require('moment')

const formatDate = (value) => {
  return moment(value).format('YYYY-MM-DD')
}

const isValidDate = (value) => {
  return isNaN(new Date(value)) ? false : true
}

const conditionBetween = (value) => {
  return Array.isArray(value) && value.length === 2
}

const conditionDateBetween = (value) => {
  return conditionBetween(value) && isValidDate(value[0]) && isValidDate(value[1])
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
    this.when(conditionDateBetween(value), query => {
      query.whereRaw(`DATE(${key}) BETWEEN ? AND ?`, [formatDate(value[0]), formatDate(value[1])])
    })
    return this
  })
  Model.queryMacro('whereDateNotBetween', function (key, value) {
    this.when(conditionDateBetween(value), query => {
      query.whereRaw(`DATE(${key}) NOT BETWEEN ? AND ?`, [formatDate(value[0]), formatDate(value[1])])
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

const exists = (Model) => {
  Model.queryMacro('exists', async function () {
    const result = await this.first()
    if (result) return true
    return false
  })
  Model.queryMacro('doesntExist', async function () {
    const result = await this.first()
    if (result) return false
    return true
  })
}

const value = (Model) => {
  Model.queryMacro('value', async function (value) {
    const result = await this.first()
    return result && result[value] ? result[value] : null 
  })
}

module.exports = (Model) => {
  when(Model)
  whereBy(Model)
  whereDate(Model)
  whereHas(Model)
  exists(Model)
  value(Model)
}