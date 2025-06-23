# Select

### unique

```js
f.select(geo => p.id)
```

### array

```js
f.select(geo => [geo.lat, geo.lng])
```

### props

```js
f.select('lat', 'lng')
```

### obj

```js
f.select(geo => ({
    title: geo.name + ' ' + geo,
}))
```

- (TODO) Chained Select

# Expression

### template string

```js
f.select(geo => `${geo.whatever}__${geo.lat.upper()}`)
```

### operation

```js
f.select(geo => geo.lat / geo.lng + 123)
```

### concatenations

```js
f.select(geo => geo.lng + ', ' + geo.lat)
```

### ternaries

```js
f.select(geo => geo.lng ? geo.lng.round(2) : 0)
```

### Coalesce operator

```js
f.select(geo => geo.lat ?? 42))
```

# Lambda

- .map/.filter/...
- array_transform

# Exclude/Replace

- Omit Pattern
- Replace pattern

# Closures

- context
- statements

# distinctOn

- basic cae

# SetOperations

- union
- except
- intersect

# CopyTo

- bucket ex
- options

# Update

# Arrays

- elements[1.]
- elements[0.5]
- (TODO) - map/filter

# Records/Struct/Json

- access nested props
- D.Json({ field: e.function_name }).json_extract('$.field')

# Functions

- methods type
- scalar functions (D)

# Joins

- ON as a callback
- default alias & named alias
- named join
- INNER/LEFT/RIGHT ETC

# WHERE

- || && clause
- type comparaison
- ternaries
- orWhere
- chaining where
- Between
- Negation
- where with string

# Pattern Matching

- Native Regexp
- Regexp Flag
- Similar to
- Like
- IsNull / === null

# OrderBY

- fn
- str
- ASC/DESC

# GroupBy

- Basic Case
- Having
- rollup/CUBE whatever
- (TODO) count(filter)

# CASTING

- D.Varchar(12)
- .as('Decimal(1, 4)')
- .as('Varchar')
- D.Cast()

# SHORTCUTS

- maxBy
- minBy
- countBy
- keyBy

# Cli Usage

- Buck() constructor
- extensions
- settings
- attach

# execute

- stream
- native

# JS Languagetic

- (TODO) .length

# Table Functions

read_csv/read_json ...
