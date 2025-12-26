// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = import.meta.require;

// node_modules/@duckdb/node-bindings-darwin-arm64/duckdb.node
var require_duckdb = __commonJS((exports, module) => {
  module.exports = __require("./duckdb-q2swtjpw.node");
});

// node_modules/@duckdb/node-bindings/duckdb.js
var require_duckdb2 = __commonJS((exports, module) => {
  var getRuntimePlatformArch = () => `${process.platform}-${process.arch}`;
  var mod = require_duckdb();
  var getNativeNodeBinding = (runtimePlatformArch) => {
    return mod;
  };
  module.exports = getNativeNodeBinding(getRuntimePlatformArch());
});

// node_modules/@duckdb/node-api/lib/configurationOptionDescriptions.js
var require_configurationOptionDescriptions = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.configurationOptionDescriptions = configurationOptionDescriptions;
  var node_bindings_1 = __importDefault(require_duckdb2());
  function configurationOptionDescriptions() {
    const descriptions = {};
    const count = node_bindings_1.default.config_count();
    for (let i = 0;i < count; i++) {
      const { name, description } = node_bindings_1.default.get_config_flag(i);
      descriptions[name] = description;
    }
    return descriptions;
  }
});

// node_modules/@duckdb/node-api/lib/createDuckDBValueConverter.js
var require_createDuckDBValueConverter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createDuckDBValueConverter = createDuckDBValueConverter;
  function createDuckDBValueConverter(convertersByTypeId) {
    return (value, type, converter) => {
      if (value == null) {
        return null;
      }
      const converterForTypeId = convertersByTypeId[type.typeId];
      if (!converterForTypeId) {
        throw new Error(`No converter for typeId: ${type.typeId}`);
      }
      return converterForTypeId(value, type, converter);
    };
  }
});

// node_modules/@duckdb/node-api/lib/DuckDBTypeId.js
var require_DuckDBTypeId = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTypeId = undefined;
  var DuckDBTypeId;
  (function(DuckDBTypeId2) {
    DuckDBTypeId2[DuckDBTypeId2["INVALID"] = 0] = "INVALID";
    DuckDBTypeId2[DuckDBTypeId2["BOOLEAN"] = 1] = "BOOLEAN";
    DuckDBTypeId2[DuckDBTypeId2["TINYINT"] = 2] = "TINYINT";
    DuckDBTypeId2[DuckDBTypeId2["SMALLINT"] = 3] = "SMALLINT";
    DuckDBTypeId2[DuckDBTypeId2["INTEGER"] = 4] = "INTEGER";
    DuckDBTypeId2[DuckDBTypeId2["BIGINT"] = 5] = "BIGINT";
    DuckDBTypeId2[DuckDBTypeId2["UTINYINT"] = 6] = "UTINYINT";
    DuckDBTypeId2[DuckDBTypeId2["USMALLINT"] = 7] = "USMALLINT";
    DuckDBTypeId2[DuckDBTypeId2["UINTEGER"] = 8] = "UINTEGER";
    DuckDBTypeId2[DuckDBTypeId2["UBIGINT"] = 9] = "UBIGINT";
    DuckDBTypeId2[DuckDBTypeId2["FLOAT"] = 10] = "FLOAT";
    DuckDBTypeId2[DuckDBTypeId2["DOUBLE"] = 11] = "DOUBLE";
    DuckDBTypeId2[DuckDBTypeId2["TIMESTAMP"] = 12] = "TIMESTAMP";
    DuckDBTypeId2[DuckDBTypeId2["DATE"] = 13] = "DATE";
    DuckDBTypeId2[DuckDBTypeId2["TIME"] = 14] = "TIME";
    DuckDBTypeId2[DuckDBTypeId2["INTERVAL"] = 15] = "INTERVAL";
    DuckDBTypeId2[DuckDBTypeId2["HUGEINT"] = 16] = "HUGEINT";
    DuckDBTypeId2[DuckDBTypeId2["UHUGEINT"] = 32] = "UHUGEINT";
    DuckDBTypeId2[DuckDBTypeId2["VARCHAR"] = 17] = "VARCHAR";
    DuckDBTypeId2[DuckDBTypeId2["BLOB"] = 18] = "BLOB";
    DuckDBTypeId2[DuckDBTypeId2["DECIMAL"] = 19] = "DECIMAL";
    DuckDBTypeId2[DuckDBTypeId2["TIMESTAMP_S"] = 20] = "TIMESTAMP_S";
    DuckDBTypeId2[DuckDBTypeId2["TIMESTAMP_MS"] = 21] = "TIMESTAMP_MS";
    DuckDBTypeId2[DuckDBTypeId2["TIMESTAMP_NS"] = 22] = "TIMESTAMP_NS";
    DuckDBTypeId2[DuckDBTypeId2["ENUM"] = 23] = "ENUM";
    DuckDBTypeId2[DuckDBTypeId2["LIST"] = 24] = "LIST";
    DuckDBTypeId2[DuckDBTypeId2["STRUCT"] = 25] = "STRUCT";
    DuckDBTypeId2[DuckDBTypeId2["MAP"] = 26] = "MAP";
    DuckDBTypeId2[DuckDBTypeId2["ARRAY"] = 33] = "ARRAY";
    DuckDBTypeId2[DuckDBTypeId2["UUID"] = 27] = "UUID";
    DuckDBTypeId2[DuckDBTypeId2["UNION"] = 28] = "UNION";
    DuckDBTypeId2[DuckDBTypeId2["BIT"] = 29] = "BIT";
    DuckDBTypeId2[DuckDBTypeId2["TIME_TZ"] = 30] = "TIME_TZ";
    DuckDBTypeId2[DuckDBTypeId2["TIMESTAMP_TZ"] = 31] = "TIMESTAMP_TZ";
    DuckDBTypeId2[DuckDBTypeId2["ANY"] = 34] = "ANY";
    DuckDBTypeId2[DuckDBTypeId2["BIGNUM"] = 35] = "BIGNUM";
    DuckDBTypeId2[DuckDBTypeId2["SQLNULL"] = 36] = "SQLNULL";
  })(DuckDBTypeId || (exports.DuckDBTypeId = DuckDBTypeId = {}));
});

// node_modules/@duckdb/node-api/lib/sql.js
var require_sql = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.quotedString = quotedString;
  exports.quotedIdentifier = quotedIdentifier;
  function quotedString(input) {
    return `'${input.replaceAll(`'`, `''`)}'`;
  }
  function quotedIdentifier(input) {
    return `"${input.replaceAll(`"`, `""`)}"`;
  }
});

// node_modules/@duckdb/node-api/lib/conversion/displayStringForDuckDBValue.js
var require_displayStringForDuckDBValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.displayStringForDuckDBValue = displayStringForDuckDBValue;
  var sql_1 = require_sql();
  function displayStringForDuckDBValue(value) {
    if (value == null) {
      return "NULL";
    }
    if (typeof value === "string") {
      return (0, sql_1.quotedString)(value);
    }
    return value.toString();
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBArrayValue.js
var require_DuckDBArrayValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBArrayValue = undefined;
  exports.arrayValue = arrayValue;
  var displayStringForDuckDBValue_1 = require_displayStringForDuckDBValue();

  class DuckDBArrayValue {
    items;
    constructor(items) {
      this.items = items;
    }
    toString() {
      return `[${this.items.map(displayStringForDuckDBValue_1.displayStringForDuckDBValue).join(", ")}]`;
    }
  }
  exports.DuckDBArrayValue = DuckDBArrayValue;
  function arrayValue(items) {
    return new DuckDBArrayValue(items);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBBitValue.js
var require_DuckDBBitValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBBitValue = undefined;
  exports.bitValue = bitValue;

  class DuckDBBitValue {
    data;
    constructor(data) {
      this.data = data;
    }
    padding() {
      return this.data[0];
    }
    get length() {
      return (this.data.length - 1) * 8 - this.padding();
    }
    getBool(index) {
      const offset = index + this.padding();
      const dataIndex = Math.floor(offset / 8) + 1;
      const byte = this.data[dataIndex] >> 7 - offset % 8;
      return (byte & 1) !== 0;
    }
    toBools() {
      const bools = [];
      const length = this.length;
      for (let i = 0;i < length; i++) {
        bools.push(this.getBool(i));
      }
      return bools;
    }
    getBit(index) {
      return this.getBool(index) ? 1 : 0;
    }
    toBits() {
      const bits = [];
      const length = this.length;
      for (let i = 0;i < length; i++) {
        bits.push(this.getBit(i));
      }
      return bits;
    }
    toString() {
      const length = this.length;
      const chars = Array.from({ length });
      for (let i = 0;i < length; i++) {
        chars[i] = this.getBool(i) ? "1" : "0";
      }
      return chars.join("");
    }
    static fromString(str, on = "1") {
      return DuckDBBitValue.fromLengthAndPredicate(str.length, (i) => str[i] === on);
    }
    static fromBits(bits, on = 1) {
      return DuckDBBitValue.fromLengthAndPredicate(bits.length, (i) => bits[i] === on);
    }
    static fromBools(bools) {
      return DuckDBBitValue.fromLengthAndPredicate(bools.length, (i) => bools[i]);
    }
    static fromLengthAndPredicate(length, predicate) {
      const byteCount = Math.ceil(length / 8) + 1;
      const paddingBitCount = (8 - length % 8) % 8;
      const data = new Uint8Array(byteCount);
      let byteIndex = 0;
      data[byteIndex++] = paddingBitCount;
      let byte = 0;
      let byteBit = 0;
      while (byteBit < paddingBitCount) {
        byte <<= 1;
        byte |= 1;
        byteBit++;
      }
      let bitIndex = 0;
      while (byteIndex < byteCount) {
        while (byteBit < 8) {
          byte <<= 1;
          if (predicate(bitIndex++)) {
            byte |= 1;
          }
          byteBit++;
        }
        data[byteIndex++] = byte;
        byte = 0;
        byteBit = 0;
      }
      return new DuckDBBitValue(data);
    }
  }
  exports.DuckDBBitValue = DuckDBBitValue;
  function bitValue(input) {
    if (typeof input === "string") {
      return DuckDBBitValue.fromString(input);
    }
    if (input.length > 0) {
      if (typeof input[0] === "boolean") {
        return DuckDBBitValue.fromBools(input);
      } else if (typeof input[0] === "number") {
        return DuckDBBitValue.fromBits(input);
      }
    }
    return DuckDBBitValue.fromLengthAndPredicate(0, (_) => false);
  }
});

// node_modules/@duckdb/node-api/lib/conversion/bytesFromString.js
var require_bytesFromString = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.bytesFromString = bytesFromString;
  var textEncoder = new TextEncoder;
  function bytesFromString(str) {
    return textEncoder.encode(str);
  }
});

// node_modules/@duckdb/node-api/lib/conversion/stringFromBlob.js
var require_stringFromBlob = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.stringFromBlob = stringFromBlob;
  exports.stringFromBlobStringConcat = stringFromBlobStringConcat;
  exports.stringFromBlobArrayJoin = stringFromBlobArrayJoin;
  function stringFromBlob(bytes) {
    if (bytes.length <= 65536) {
      return stringFromBlobStringConcat(bytes);
    }
    return stringFromBlobArrayJoin(bytes);
  }
  function stringFromBlobStringConcat(bytes) {
    let byteString = "";
    for (const byte of bytes) {
      if (byte <= 31 || byte === 34 || byte === 39 || byte >= 127) {
        byteString += `\\x${byte.toString(16).toUpperCase().padStart(2, "0")}`;
      } else {
        byteString += String.fromCharCode(byte);
      }
    }
    return byteString;
  }
  function stringFromBlobArrayJoin(bytes) {
    const byteStrings = [];
    for (const byte of bytes) {
      if (byte <= 31 || byte === 34 || byte === 39 || byte >= 127) {
        byteStrings.push(`\\x${byte.toString(16).toUpperCase().padStart(2, "0")}`);
      } else {
        byteStrings.push(String.fromCharCode(byte));
      }
    }
    return byteStrings.join("");
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBBlobValue.js
var require_DuckDBBlobValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBBlobValue = undefined;
  exports.blobValue = blobValue;
  var bytesFromString_1 = require_bytesFromString();
  var stringFromBlob_1 = require_stringFromBlob();

  class DuckDBBlobValue {
    bytes;
    constructor(bytes) {
      this.bytes = bytes;
    }
    toString() {
      return (0, stringFromBlob_1.stringFromBlob)(this.bytes);
    }
    static fromString(str) {
      return new DuckDBBlobValue(Buffer.from((0, bytesFromString_1.bytesFromString)(str)));
    }
  }
  exports.DuckDBBlobValue = DuckDBBlobValue;
  function blobValue(input) {
    if (typeof input === "string") {
      return DuckDBBlobValue.fromString(input);
    }
    return new DuckDBBlobValue(input);
  }
});

// node_modules/@duckdb/node-api/lib/conversion/dateTimeStringConversion.js
var require_dateTimeStringConversion = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getDuckDBDateStringFromYearMonthDay = getDuckDBDateStringFromYearMonthDay;
  exports.getDuckDBDateStringFromDays = getDuckDBDateStringFromDays;
  exports.getTimezoneOffsetString = getTimezoneOffsetString;
  exports.getAbsoluteOffsetStringFromParts = getAbsoluteOffsetStringFromParts;
  exports.getOffsetStringFromAbsoluteSeconds = getOffsetStringFromAbsoluteSeconds;
  exports.getOffsetStringFromSeconds = getOffsetStringFromSeconds;
  exports.getDuckDBTimeStringFromParts = getDuckDBTimeStringFromParts;
  exports.getDuckDBTimeStringFromPartsNS = getDuckDBTimeStringFromPartsNS;
  exports.getDuckDBTimeStringFromPositiveMicroseconds = getDuckDBTimeStringFromPositiveMicroseconds;
  exports.getDuckDBTimeStringFromPositiveNanoseconds = getDuckDBTimeStringFromPositiveNanoseconds;
  exports.getDuckDBTimeStringFromMicrosecondsInDay = getDuckDBTimeStringFromMicrosecondsInDay;
  exports.getDuckDBTimeStringFromNanosecondsInDay = getDuckDBTimeStringFromNanosecondsInDay;
  exports.getDuckDBTimeStringFromMicroseconds = getDuckDBTimeStringFromMicroseconds;
  exports.getDuckDBTimestampStringFromDaysAndMicroseconds = getDuckDBTimestampStringFromDaysAndMicroseconds;
  exports.getDuckDBTimestampStringFromDaysAndNanoseconds = getDuckDBTimestampStringFromDaysAndNanoseconds;
  exports.getDuckDBTimestampStringFromMicroseconds = getDuckDBTimestampStringFromMicroseconds;
  exports.getDuckDBTimestampStringFromSeconds = getDuckDBTimestampStringFromSeconds;
  exports.getDuckDBTimestampStringFromMilliseconds = getDuckDBTimestampStringFromMilliseconds;
  exports.getDuckDBTimestampStringFromNanoseconds = getDuckDBTimestampStringFromNanoseconds;
  exports.getDuckDBIntervalString = getDuckDBIntervalString;
  var DAYS_IN_400_YEARS = 146097;
  var MILLISECONDS_PER_DAY_NUM = 86400000;
  var MICROSECONDS_PER_SECOND = 1000000n;
  var MICROSECONDS_PER_MILLISECOND = 1000n;
  var NANOSECONDS_PER_SECOND = 1000000000n;
  var SECONDS_PER_MINUTE = 60n;
  var MINUTES_PER_HOUR = 60n;
  var MICROSECONDS_PER_DAY = 86400000000n;
  var NANOSECONDS_PER_DAY = 86400000000000n;
  var NEGATIVE_INFINITY_TIMESTAMP = -9223372036854775807n;
  var POSITIVE_INFINITY_TIMESTAMP = 9223372036854775807n;
  function getDuckDBDateStringFromYearMonthDay(year, month, dayOfMonth) {
    const yearStr = String(Math.abs(year)).padStart(4, "0");
    const monthStr = String(month).padStart(2, "0");
    const dayOfMonthStr = String(dayOfMonth).padStart(2, "0");
    return `${yearStr}-${monthStr}-${dayOfMonthStr}${year < 0 ? " (BC)" : ""}`;
  }
  function getDuckDBDateStringFromDays(days) {
    const absDays = Math.abs(days);
    const sign = days < 0 ? -1 : 1;
    const num400YearIntervals = Math.floor(absDays / DAYS_IN_400_YEARS);
    const yearsFrom400YearIntervals = sign * num400YearIntervals * 400;
    const absDaysFromRemainingInterval = absDays % DAYS_IN_400_YEARS;
    const millisecondsFromRemainingInterval = sign * absDaysFromRemainingInterval * MILLISECONDS_PER_DAY_NUM;
    const date = new Date(millisecondsFromRemainingInterval);
    let year = yearsFrom400YearIntervals + date.getUTCFullYear();
    if (year < 0) {
      year--;
    }
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();
    return getDuckDBDateStringFromYearMonthDay(year, month, dayOfMonth);
  }
  function getTimezoneOffsetString(timezoneOffsetInMinutes) {
    if (timezoneOffsetInMinutes === undefined) {
      return;
    }
    const negative = timezoneOffsetInMinutes < 0;
    const positiveMinutes = Math.abs(timezoneOffsetInMinutes);
    const minutesPart = positiveMinutes % 60;
    const hoursPart = Math.floor(positiveMinutes / 60);
    const minutesStr = minutesPart !== 0 ? String(minutesPart).padStart(2, "0") : "";
    const hoursStr = String(hoursPart).padStart(2, "0");
    return `${negative ? "-" : "+"}${hoursStr}${minutesStr ? `:${minutesStr}` : ""}`;
  }
  function getAbsoluteOffsetStringFromParts(hoursPart, minutesPart, secondsPart) {
    const hoursStr = String(hoursPart).padStart(2, "0");
    const minutesStr = minutesPart !== 0 || secondsPart !== 0 ? String(minutesPart).padStart(2, "0") : "";
    const secondsStr = secondsPart !== 0 ? String(secondsPart).padStart(2, "0") : "";
    let result = hoursStr;
    if (minutesStr) {
      result += `:${minutesStr}`;
      if (secondsStr) {
        result += `:${secondsStr}`;
      }
    }
    return result;
  }
  function getOffsetStringFromAbsoluteSeconds(absoluteOffsetInSeconds) {
    const secondsPart = absoluteOffsetInSeconds % 60;
    const minutes = Math.floor(absoluteOffsetInSeconds / 60);
    const minutesPart = minutes % 60;
    const hoursPart = Math.floor(minutes / 60);
    return getAbsoluteOffsetStringFromParts(hoursPart, minutesPart, secondsPart);
  }
  function getOffsetStringFromSeconds(offsetInSeconds) {
    const negative = offsetInSeconds < 0;
    const absoluteOffsetInSeconds = negative ? -offsetInSeconds : offsetInSeconds;
    const absoluteString = getOffsetStringFromAbsoluteSeconds(absoluteOffsetInSeconds);
    return `${negative ? "-" : "+"}${absoluteString}`;
  }
  function getDuckDBTimeStringFromParts(hoursPart, minutesPart, secondsPart, microsecondsPart) {
    const hoursStr = String(hoursPart).padStart(2, "0");
    const minutesStr = String(minutesPart).padStart(2, "0");
    const secondsStr = String(secondsPart).padStart(2, "0");
    const microsecondsStr = String(microsecondsPart).padStart(6, "0").replace(/0+$/, "");
    return `${hoursStr}:${minutesStr}:${secondsStr}${microsecondsStr.length > 0 ? `.${microsecondsStr}` : ""}`;
  }
  function getDuckDBTimeStringFromPartsNS(hoursPart, minutesPart, secondsPart, nanosecondsPart) {
    const hoursStr = String(hoursPart).padStart(2, "0");
    const minutesStr = String(minutesPart).padStart(2, "0");
    const secondsStr = String(secondsPart).padStart(2, "0");
    const nanosecondsStr = String(nanosecondsPart).padStart(9, "0").replace(/0+$/, "");
    return `${hoursStr}:${minutesStr}:${secondsStr}${nanosecondsStr.length > 0 ? `.${nanosecondsStr}` : ""}`;
  }
  function getDuckDBTimeStringFromPositiveMicroseconds(positiveMicroseconds) {
    const microsecondsPart = positiveMicroseconds % MICROSECONDS_PER_SECOND;
    const seconds = positiveMicroseconds / MICROSECONDS_PER_SECOND;
    const secondsPart = seconds % SECONDS_PER_MINUTE;
    const minutes = seconds / SECONDS_PER_MINUTE;
    const minutesPart = minutes % MINUTES_PER_HOUR;
    const hoursPart = minutes / MINUTES_PER_HOUR;
    return getDuckDBTimeStringFromParts(hoursPart, minutesPart, secondsPart, microsecondsPart);
  }
  function getDuckDBTimeStringFromPositiveNanoseconds(positiveNanoseconds) {
    const nanosecondsPart = positiveNanoseconds % NANOSECONDS_PER_SECOND;
    const seconds = positiveNanoseconds / NANOSECONDS_PER_SECOND;
    const secondsPart = seconds % SECONDS_PER_MINUTE;
    const minutes = seconds / SECONDS_PER_MINUTE;
    const minutesPart = minutes % MINUTES_PER_HOUR;
    const hoursPart = minutes / MINUTES_PER_HOUR;
    return getDuckDBTimeStringFromPartsNS(hoursPart, minutesPart, secondsPart, nanosecondsPart);
  }
  function getDuckDBTimeStringFromMicrosecondsInDay(microsecondsInDay) {
    const positiveMicroseconds = microsecondsInDay < 0 ? microsecondsInDay + MICROSECONDS_PER_DAY : microsecondsInDay;
    return getDuckDBTimeStringFromPositiveMicroseconds(positiveMicroseconds);
  }
  function getDuckDBTimeStringFromNanosecondsInDay(nanosecondsInDay) {
    const positiveNanoseconds = nanosecondsInDay < 0 ? nanosecondsInDay + NANOSECONDS_PER_DAY : nanosecondsInDay;
    return getDuckDBTimeStringFromPositiveNanoseconds(positiveNanoseconds);
  }
  function getDuckDBTimeStringFromMicroseconds(microseconds) {
    const negative = microseconds < 0;
    const positiveMicroseconds = negative ? -microseconds : microseconds;
    const positiveString = getDuckDBTimeStringFromPositiveMicroseconds(positiveMicroseconds);
    return negative ? `-${positiveString}` : positiveString;
  }
  function getDuckDBTimestampStringFromDaysAndMicroseconds(days, microsecondsInDay, timezonePart) {
    const dateStr = getDuckDBDateStringFromDays(Number(days));
    const timeStr = getDuckDBTimeStringFromMicrosecondsInDay(microsecondsInDay);
    return `${dateStr} ${timeStr}${timezonePart ?? ""}`;
  }
  function getDuckDBTimestampStringFromDaysAndNanoseconds(days, nanosecondsInDay) {
    const dateStr = getDuckDBDateStringFromDays(Number(days));
    const timeStr = getDuckDBTimeStringFromNanosecondsInDay(nanosecondsInDay);
    return `${dateStr} ${timeStr}`;
  }
  function getDuckDBTimestampStringFromMicroseconds(microseconds, timezoneOffsetInMinutes) {
    if (microseconds === NEGATIVE_INFINITY_TIMESTAMP) {
      return "-infinity";
    }
    if (microseconds === POSITIVE_INFINITY_TIMESTAMP) {
      return "infinity";
    }
    const offsetMicroseconds = timezoneOffsetInMinutes !== undefined ? microseconds + BigInt(timezoneOffsetInMinutes) * MICROSECONDS_PER_SECOND * SECONDS_PER_MINUTE : microseconds;
    let days = offsetMicroseconds / MICROSECONDS_PER_DAY;
    let microsecondsPart = offsetMicroseconds % MICROSECONDS_PER_DAY;
    if (microsecondsPart < 0) {
      days--;
      microsecondsPart += MICROSECONDS_PER_DAY;
    }
    return getDuckDBTimestampStringFromDaysAndMicroseconds(days, microsecondsPart, getTimezoneOffsetString(timezoneOffsetInMinutes));
  }
  function getDuckDBTimestampStringFromSeconds(seconds) {
    return getDuckDBTimestampStringFromMicroseconds(seconds * MICROSECONDS_PER_SECOND);
  }
  function getDuckDBTimestampStringFromMilliseconds(milliseconds) {
    return getDuckDBTimestampStringFromMicroseconds(milliseconds * MICROSECONDS_PER_MILLISECOND);
  }
  function getDuckDBTimestampStringFromNanoseconds(nanoseconds) {
    let days = nanoseconds / NANOSECONDS_PER_DAY;
    let nanosecondsPart = nanoseconds % NANOSECONDS_PER_DAY;
    if (nanosecondsPart < 0) {
      days--;
      nanosecondsPart += NANOSECONDS_PER_DAY;
    }
    return getDuckDBTimestampStringFromDaysAndNanoseconds(days, nanosecondsPart);
  }
  function numberAndUnit(value, baseUnit) {
    return `${value} ${baseUnit}${Math.abs(value) !== 1 ? "s" : ""}`;
  }
  function getDuckDBIntervalString(months, days, microseconds) {
    const parts = [];
    if (months !== 0) {
      const sign = months < 0 ? -1 : 1;
      const absMonths = Math.abs(months);
      const absYears = Math.floor(absMonths / 12);
      const years = sign * absYears;
      const extraMonths = sign * (absMonths - absYears * 12);
      if (years !== 0) {
        parts.push(numberAndUnit(years, "year"));
      }
      if (extraMonths !== 0) {
        parts.push(numberAndUnit(extraMonths, "month"));
      }
    }
    if (days !== 0) {
      parts.push(numberAndUnit(days, "day"));
    }
    if (microseconds !== 0n) {
      parts.push(getDuckDBTimeStringFromMicroseconds(microseconds));
    }
    if (parts.length > 0) {
      return parts.join(" ");
    }
    return "00:00:00";
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBDateValue.js
var require_DuckDBDateValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBDateValue = undefined;
  exports.dateValue = dateValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();

  class DuckDBDateValue {
    days;
    constructor(days) {
      this.days = days;
    }
    get isFinite() {
      return node_bindings_1.default.is_finite_date(this);
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBDateStringFromDays)(this.days);
    }
    toParts() {
      return node_bindings_1.default.from_date(this);
    }
    static fromParts(parts) {
      return new DuckDBDateValue(node_bindings_1.default.to_date(parts).days);
    }
    static Epoch = new DuckDBDateValue(0);
    static Max = new DuckDBDateValue(2 ** 31 - 2);
    static Min = new DuckDBDateValue(-(2 ** 31 - 2));
    static PosInf = new DuckDBDateValue(2 ** 31 - 1);
    static NegInf = new DuckDBDateValue(-(2 ** 31 - 1));
  }
  exports.DuckDBDateValue = DuckDBDateValue;
  function dateValue(daysOrParts) {
    if (typeof daysOrParts === "number") {
      return new DuckDBDateValue(daysOrParts);
    }
    return DuckDBDateValue.fromParts(daysOrParts);
  }
});

// node_modules/@duckdb/node-api/lib/conversion/stringFromDecimal.js
var require_stringFromDecimal = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.stringFromDecimal = stringFromDecimal;
  function getDecimalSeparator(locales) {
    const decimalSeparator = new Intl.NumberFormat(locales, { useGrouping: false }).formatToParts(0.1).find((part) => part.type === "decimal")?.value ?? ".";
    return decimalSeparator;
  }
  var cachedDecimalSeparators = {};
  function getCachedDecimalSeparator(locales) {
    const cacheKey = JSON.stringify(locales);
    if (cacheKey in cachedDecimalSeparators) {
      return cachedDecimalSeparators[cacheKey];
    }
    const decimalSeparator = getDecimalSeparator(locales);
    cachedDecimalSeparators[cacheKey] = decimalSeparator;
    return decimalSeparator;
  }
  function formatWholePart(localeOptions, val) {
    if (localeOptions) {
      const { minimumFractionDigits: _minFD, maximumFractionDigits: _maxFD, ...restOptions } = localeOptions.options ?? {};
      return val.toLocaleString(localeOptions?.locales, restOptions);
    }
    return String(val);
  }
  function formatFractionalPart(localeOptions, val, scale) {
    const fractionalPartStr = String(val).padStart(scale, "0");
    if (!localeOptions) {
      return fractionalPartStr;
    }
    const minFracDigits = localeOptions?.options?.minimumFractionDigits ?? 0;
    const maxFracDigits = localeOptions?.options?.maximumFractionDigits ?? 20;
    return fractionalPartStr.padEnd(minFracDigits, "0").slice(0, maxFracDigits);
  }
  function stringFromDecimal(scaledValue, scale, localeOptions) {
    if (scale > 0) {
      const scaleFactor = BigInt(10) ** BigInt(scale);
      const absScaledValue = scaledValue < 0 ? -scaledValue : scaledValue;
      const prefix = scaledValue < 0 ? "-" : "";
      const wholePartNum = absScaledValue / scaleFactor;
      const wholePartStr = formatWholePart(localeOptions, wholePartNum);
      const fractionalPartNum = absScaledValue % scaleFactor;
      const fractionalPartStr = formatFractionalPart(localeOptions, fractionalPartNum, scale);
      const decimalSeparatorStr = localeOptions ? getCachedDecimalSeparator(localeOptions.locales) : ".";
      return `${prefix}${wholePartStr}${decimalSeparatorStr}${fractionalPartStr}`;
    }
    if (localeOptions) {
      return scaledValue.toLocaleString(localeOptions?.locales, localeOptions?.options);
    }
    return String(scaledValue);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBDecimalValue.js
var require_DuckDBDecimalValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBDecimalValue = undefined;
  exports.decimalValue = decimalValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var stringFromDecimal_1 = require_stringFromDecimal();

  class DuckDBDecimalValue {
    width;
    scale;
    value;
    constructor(value, width, scale) {
      this.width = width;
      this.scale = scale;
      this.value = value;
    }
    toString() {
      return (0, stringFromDecimal_1.stringFromDecimal)(this.value, this.scale);
    }
    toDouble() {
      return node_bindings_1.default.decimal_to_double(this);
    }
    static fromDouble(double, width, scale) {
      const decimal = node_bindings_1.default.double_to_decimal(double, width, scale);
      return new DuckDBDecimalValue(decimal.value, decimal.width, decimal.scale);
    }
  }
  exports.DuckDBDecimalValue = DuckDBDecimalValue;
  function decimalValue(value, width, scale) {
    if (typeof value === "number") {
      return DuckDBDecimalValue.fromDouble(value, width, scale);
    }
    return new DuckDBDecimalValue(value, width, scale);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBIntervalValue.js
var require_DuckDBIntervalValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBIntervalValue = undefined;
  exports.intervalValue = intervalValue;
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();

  class DuckDBIntervalValue {
    months;
    days;
    micros;
    constructor(months, days, micros) {
      this.months = months;
      this.days = days;
      this.micros = micros;
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBIntervalString)(this.months, this.days, this.micros);
    }
  }
  exports.DuckDBIntervalValue = DuckDBIntervalValue;
  function intervalValue(months, days, micros) {
    return new DuckDBIntervalValue(months, days, micros);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBListValue.js
var require_DuckDBListValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBListValue = undefined;
  exports.listValue = listValue;
  var displayStringForDuckDBValue_1 = require_displayStringForDuckDBValue();

  class DuckDBListValue {
    items;
    constructor(items) {
      this.items = items;
    }
    toString() {
      return `[${this.items.map(displayStringForDuckDBValue_1.displayStringForDuckDBValue).join(", ")}]`;
    }
  }
  exports.DuckDBListValue = DuckDBListValue;
  function listValue(items) {
    return new DuckDBListValue(items);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBMapValue.js
var require_DuckDBMapValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBMapValue = undefined;
  exports.mapValue = mapValue;
  var displayStringForDuckDBValue_1 = require_displayStringForDuckDBValue();

  class DuckDBMapValue {
    entries;
    constructor(entries) {
      this.entries = entries;
    }
    toString() {
      return `{${this.entries.map(({ key, value }) => `${(0, displayStringForDuckDBValue_1.displayStringForDuckDBValue)(key)}: ${(0, displayStringForDuckDBValue_1.displayStringForDuckDBValue)(value)}`).join(", ")}}`;
    }
  }
  exports.DuckDBMapValue = DuckDBMapValue;
  function mapValue(entries) {
    return new DuckDBMapValue(entries);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBStructValue.js
var require_DuckDBStructValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBStructValue = undefined;
  exports.structValue = structValue;
  var displayStringForDuckDBValue_1 = require_displayStringForDuckDBValue();

  class DuckDBStructValue {
    entries;
    constructor(entries) {
      this.entries = entries;
    }
    toString() {
      const parts = [];
      for (const name in this.entries) {
        parts.push(`${(0, displayStringForDuckDBValue_1.displayStringForDuckDBValue)(name)}: ${(0, displayStringForDuckDBValue_1.displayStringForDuckDBValue)(this.entries[name])}`);
      }
      return `{${parts.join(", ")}}`;
    }
  }
  exports.DuckDBStructValue = DuckDBStructValue;
  function structValue(entries) {
    return new DuckDBStructValue(entries);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimestampSecondsValue.js
var require_DuckDBTimestampSecondsValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimestampSecondsValue = undefined;
  exports.timestampSecondsValue = timestampSecondsValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();

  class DuckDBTimestampSecondsValue {
    seconds;
    constructor(seconds) {
      this.seconds = seconds;
    }
    get isFinite() {
      return node_bindings_1.default.is_finite_timestamp_s(this);
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBTimestampStringFromSeconds)(this.seconds);
    }
    static Epoch = new DuckDBTimestampSecondsValue(0n);
    static Max = new DuckDBTimestampSecondsValue(9223372036854n);
    static Min = new DuckDBTimestampSecondsValue(-9223372022400n);
    static PosInf = new DuckDBTimestampSecondsValue(2n ** 63n - 1n);
    static NegInf = new DuckDBTimestampSecondsValue(-(2n ** 63n - 1n));
  }
  exports.DuckDBTimestampSecondsValue = DuckDBTimestampSecondsValue;
  function timestampSecondsValue(seconds) {
    return new DuckDBTimestampSecondsValue(seconds);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimestampMillisecondsValue.js
var require_DuckDBTimestampMillisecondsValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimestampMillisecondsValue = undefined;
  exports.timestampMillisValue = timestampMillisValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();
  var DuckDBTimestampSecondsValue_1 = require_DuckDBTimestampSecondsValue();

  class DuckDBTimestampMillisecondsValue {
    millis;
    constructor(millis) {
      this.millis = millis;
    }
    get isFinite() {
      return node_bindings_1.default.is_finite_timestamp_ms(this);
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBTimestampStringFromMilliseconds)(this.millis);
    }
    static Epoch = new DuckDBTimestampMillisecondsValue(0n);
    static Max = new DuckDBTimestampMillisecondsValue((2n ** 63n - 2n) / 1000n);
    static Min = new DuckDBTimestampMillisecondsValue(DuckDBTimestampSecondsValue_1.DuckDBTimestampSecondsValue.Min.seconds * 1000n);
    static PosInf = new DuckDBTimestampMillisecondsValue(2n ** 63n - 1n);
    static NegInf = new DuckDBTimestampMillisecondsValue(-(2n ** 63n - 1n));
  }
  exports.DuckDBTimestampMillisecondsValue = DuckDBTimestampMillisecondsValue;
  function timestampMillisValue(millis) {
    return new DuckDBTimestampMillisecondsValue(millis);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimestampNanosecondsValue.js
var require_DuckDBTimestampNanosecondsValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimestampNanosecondsValue = undefined;
  exports.timestampNanosValue = timestampNanosValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();

  class DuckDBTimestampNanosecondsValue {
    nanos;
    constructor(nanos) {
      this.nanos = nanos;
    }
    get isFinite() {
      return node_bindings_1.default.is_finite_timestamp_ns(this);
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBTimestampStringFromNanoseconds)(this.nanos);
    }
    static Epoch = new DuckDBTimestampNanosecondsValue(0n);
    static Max = new DuckDBTimestampNanosecondsValue(2n ** 63n - 2n);
    static Min = new DuckDBTimestampNanosecondsValue(-9223286400000000000n);
    static PosInf = new DuckDBTimestampNanosecondsValue(2n ** 63n - 1n);
    static NegInf = new DuckDBTimestampNanosecondsValue(-(2n ** 63n - 1n));
  }
  exports.DuckDBTimestampNanosecondsValue = DuckDBTimestampNanosecondsValue;
  function timestampNanosValue(nanos) {
    return new DuckDBTimestampNanosecondsValue(nanos);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimestampValue.js
var require_DuckDBTimestampValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimestampMicrosecondsValue = exports.DuckDBTimestampValue = undefined;
  exports.timestampValue = timestampValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();
  var DuckDBTimestampMillisecondsValue_1 = require_DuckDBTimestampMillisecondsValue();

  class DuckDBTimestampValue {
    micros;
    constructor(micros) {
      this.micros = micros;
    }
    get isFinite() {
      return node_bindings_1.default.is_finite_timestamp(this);
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBTimestampStringFromMicroseconds)(this.micros);
    }
    toParts() {
      return node_bindings_1.default.from_timestamp(this);
    }
    static fromParts(parts) {
      return new DuckDBTimestampValue(node_bindings_1.default.to_timestamp(parts).micros);
    }
    static Epoch = new DuckDBTimestampValue(0n);
    static Max = new DuckDBTimestampValue(2n ** 63n - 2n);
    static Min = new DuckDBTimestampValue(DuckDBTimestampMillisecondsValue_1.DuckDBTimestampMillisecondsValue.Min.millis * 1000n);
    static PosInf = new DuckDBTimestampValue(2n ** 63n - 1n);
    static NegInf = new DuckDBTimestampValue(-(2n ** 63n - 1n));
  }
  exports.DuckDBTimestampValue = DuckDBTimestampValue;
  exports.DuckDBTimestampMicrosecondsValue = DuckDBTimestampValue;
  function timestampValue(microsOrParts) {
    if (typeof microsOrParts === "bigint") {
      return new DuckDBTimestampValue(microsOrParts);
    }
    return DuckDBTimestampValue.fromParts(microsOrParts);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimestampTZValue.js
var require_DuckDBTimestampTZValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimestampTZValue = undefined;
  exports.timestampTZValue = timestampTZValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();
  var DuckDBTimestampValue_1 = require_DuckDBTimestampValue();

  class DuckDBTimestampTZValue {
    static timezoneOffsetInMinutes = -new Date().getTimezoneOffset();
    micros;
    constructor(micros) {
      this.micros = micros;
    }
    get isFinite() {
      return node_bindings_1.default.is_finite_timestamp(this);
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBTimestampStringFromMicroseconds)(this.micros, DuckDBTimestampTZValue.timezoneOffsetInMinutes);
    }
    toParts() {
      return node_bindings_1.default.from_timestamp(this);
    }
    static fromParts(parts) {
      return new DuckDBTimestampTZValue(node_bindings_1.default.to_timestamp(parts).micros);
    }
    static Epoch = new DuckDBTimestampTZValue(0n);
    static Max = new DuckDBTimestampTZValue(DuckDBTimestampValue_1.DuckDBTimestampValue.Max.micros);
    static Min = new DuckDBTimestampTZValue(DuckDBTimestampValue_1.DuckDBTimestampValue.Min.micros);
    static PosInf = new DuckDBTimestampTZValue(DuckDBTimestampValue_1.DuckDBTimestampValue.PosInf.micros);
    static NegInf = new DuckDBTimestampTZValue(DuckDBTimestampValue_1.DuckDBTimestampValue.NegInf.micros);
  }
  exports.DuckDBTimestampTZValue = DuckDBTimestampTZValue;
  function timestampTZValue(microsOrParts) {
    if (typeof microsOrParts === "bigint") {
      return new DuckDBTimestampTZValue(microsOrParts);
    }
    return DuckDBTimestampTZValue.fromParts(microsOrParts);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimeTZValue.js
var require_DuckDBTimeTZValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimeTZValue = undefined;
  exports.timeTZValue = timeTZValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();

  class DuckDBTimeTZValue {
    bits;
    micros;
    offset;
    constructor(bits, micros, offset) {
      this.bits = bits;
      this.micros = micros;
      this.offset = offset;
    }
    toString() {
      return `${(0, dateTimeStringConversion_1.getDuckDBTimeStringFromMicrosecondsInDay)(this.micros)}${(0, dateTimeStringConversion_1.getOffsetStringFromSeconds)(this.offset)}`;
    }
    toParts() {
      return node_bindings_1.default.from_time_tz(this);
    }
    static TimeBits = 40;
    static OffsetBits = 24;
    static MaxOffset = 16 * 60 * 60 - 1;
    static MinOffset = -DuckDBTimeTZValue.MaxOffset;
    static MaxMicros = 24n * 60n * 60n * 1000n * 1000n;
    static MinMicros = 0n;
    static fromBits(bits) {
      const micros = BigInt.asUintN(DuckDBTimeTZValue.TimeBits, bits >> BigInt(DuckDBTimeTZValue.OffsetBits));
      const offset = DuckDBTimeTZValue.MaxOffset - Number(BigInt.asUintN(DuckDBTimeTZValue.OffsetBits, bits));
      return new DuckDBTimeTZValue(bits, micros, offset);
    }
    static fromMicrosAndOffset(micros, offset) {
      const bits = BigInt.asUintN(DuckDBTimeTZValue.TimeBits, micros) << BigInt(DuckDBTimeTZValue.OffsetBits) | BigInt.asUintN(DuckDBTimeTZValue.OffsetBits, BigInt(DuckDBTimeTZValue.MaxOffset - offset));
      return new DuckDBTimeTZValue(bits, micros, offset);
    }
    static fromParts(parts) {
      return DuckDBTimeTZValue.fromMicrosAndOffset(node_bindings_1.default.to_time(parts.time).micros, parts.offset);
    }
    static Max = DuckDBTimeTZValue.fromMicrosAndOffset(DuckDBTimeTZValue.MaxMicros, DuckDBTimeTZValue.MinOffset);
    static Min = DuckDBTimeTZValue.fromMicrosAndOffset(DuckDBTimeTZValue.MinMicros, DuckDBTimeTZValue.MaxOffset);
  }
  exports.DuckDBTimeTZValue = DuckDBTimeTZValue;
  function timeTZValue(micros, offset) {
    return DuckDBTimeTZValue.fromMicrosAndOffset(micros, offset);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBTimeValue.js
var require_DuckDBTimeValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBTimeValue = undefined;
  exports.timeValue = timeValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var dateTimeStringConversion_1 = require_dateTimeStringConversion();

  class DuckDBTimeValue {
    micros;
    constructor(micros) {
      this.micros = micros;
    }
    toString() {
      return (0, dateTimeStringConversion_1.getDuckDBTimeStringFromMicrosecondsInDay)(this.micros);
    }
    toParts() {
      return node_bindings_1.default.from_time(this);
    }
    static fromParts(parts) {
      return new DuckDBTimeValue(node_bindings_1.default.to_time(parts).micros);
    }
    static Max = new DuckDBTimeValue(24n * 60n * 60n * 1000n * 1000n);
    static Min = new DuckDBTimeValue(0n);
  }
  exports.DuckDBTimeValue = DuckDBTimeValue;
  function timeValue(microsOrParts) {
    if (typeof microsOrParts === "bigint") {
      return new DuckDBTimeValue(microsOrParts);
    }
    return DuckDBTimeValue.fromParts(microsOrParts);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBUnionValue.js
var require_DuckDBUnionValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBUnionValue = undefined;
  exports.unionValue = unionValue;

  class DuckDBUnionValue {
    tag;
    value;
    constructor(tag, value) {
      this.tag = tag;
      this.value = value;
    }
    toString() {
      if (this.value == null) {
        return "NULL";
      }
      return this.value.toString();
    }
  }
  exports.DuckDBUnionValue = DuckDBUnionValue;
  function unionValue(tag, value) {
    return new DuckDBUnionValue(tag, value);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBUUIDValue.js
var require_DuckDBUUIDValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBUUIDValue = undefined;
  exports.uuidValue = uuidValue;

  class DuckDBUUIDValue {
    hugeint;
    constructor(hugeint) {
      this.hugeint = hugeint;
    }
    toUint128() {
      return (this.hugeint ^ 0x80000000000000000000000000000000n) & 0xffffffffffffffffffffffffffffffffn;
    }
    toString() {
      const hex = (this.toUint128() | 0x100000000000000000000000000000000n).toString(16);
      return `${hex.substring(1, 9)}-${hex.substring(9, 13)}-${hex.substring(13, 17)}-${hex.substring(17, 21)}-${hex.substring(21, 33)}`;
    }
    static fromUint128(uint128) {
      return new DuckDBUUIDValue((uint128 ^ 0x80000000000000000000000000000000n) & 0xffffffffffffffffffffffffffffffffn);
    }
    static fromStoredHugeInt(hugeint) {
      return new DuckDBUUIDValue(hugeint);
    }
    static Max = new DuckDBUUIDValue(2n ** 127n - 1n);
    static Min = new DuckDBUUIDValue(-(2n ** 127n));
  }
  exports.DuckDBUUIDValue = DuckDBUUIDValue;
  function uuidValue(uint128) {
    return DuckDBUUIDValue.fromUint128(uint128);
  }
});

// node_modules/@duckdb/node-api/lib/values/DuckDBValue.js
var require_DuckDBValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
});

// node_modules/@duckdb/node-api/lib/values/index.js
var require_values = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(require_DuckDBArrayValue(), exports);
  __exportStar(require_DuckDBBitValue(), exports);
  __exportStar(require_DuckDBBlobValue(), exports);
  __exportStar(require_DuckDBDateValue(), exports);
  __exportStar(require_DuckDBDecimalValue(), exports);
  __exportStar(require_DuckDBIntervalValue(), exports);
  __exportStar(require_DuckDBListValue(), exports);
  __exportStar(require_DuckDBMapValue(), exports);
  __exportStar(require_DuckDBStructValue(), exports);
  __exportStar(require_DuckDBTimestampMillisecondsValue(), exports);
  __exportStar(require_DuckDBTimestampNanosecondsValue(), exports);
  __exportStar(require_DuckDBTimestampSecondsValue(), exports);
  __exportStar(require_DuckDBTimestampTZValue(), exports);
  __exportStar(require_DuckDBTimestampValue(), exports);
  __exportStar(require_DuckDBTimeTZValue(), exports);
  __exportStar(require_DuckDBTimeValue(), exports);
  __exportStar(require_DuckDBUnionValue(), exports);
  __exportStar(require_DuckDBUUIDValue(), exports);
  __exportStar(require_DuckDBValue(), exports);
});

// node_modules/@duckdb/node-api/lib/createValue.js
var require_createValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createValue = createValue;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBTypeId_1 = require_DuckDBTypeId();
  var values_1 = require_values();
  function createValue(type, input) {
    if (input === null) {
      return node_bindings_1.default.create_null_value();
    }
    const { typeId } = type;
    switch (typeId) {
      case DuckDBTypeId_1.DuckDBTypeId.BOOLEAN:
        if (typeof input === "boolean") {
          return node_bindings_1.default.create_bool(input);
        }
        throw new Error(`input is not a boolean`);
      case DuckDBTypeId_1.DuckDBTypeId.TINYINT:
        if (typeof input === "number") {
          return node_bindings_1.default.create_int8(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.SMALLINT:
        if (typeof input === "number") {
          return node_bindings_1.default.create_int16(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.INTEGER:
        if (typeof input === "number") {
          return node_bindings_1.default.create_int32(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.BIGINT:
        if (typeof input === "bigint") {
          return node_bindings_1.default.create_int64(input);
        }
        throw new Error(`input is not a bigint`);
      case DuckDBTypeId_1.DuckDBTypeId.UTINYINT:
        if (typeof input === "number") {
          return node_bindings_1.default.create_uint8(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.USMALLINT:
        if (typeof input === "number") {
          return node_bindings_1.default.create_uint16(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.UINTEGER:
        if (typeof input === "number") {
          return node_bindings_1.default.create_uint32(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.UBIGINT:
        if (typeof input === "bigint") {
          return node_bindings_1.default.create_uint64(input);
        }
        throw new Error(`input is not a bigint`);
      case DuckDBTypeId_1.DuckDBTypeId.FLOAT:
        if (typeof input === "number") {
          return node_bindings_1.default.create_float(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.DOUBLE:
        if (typeof input === "number") {
          return node_bindings_1.default.create_double(input);
        }
        throw new Error(`input is not a number`);
      case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP:
        if (input instanceof values_1.DuckDBTimestampValue) {
          return node_bindings_1.default.create_timestamp(input);
        }
        throw new Error(`input is not a DuckDBTimestampValue`);
      case DuckDBTypeId_1.DuckDBTypeId.DATE:
        if (input instanceof values_1.DuckDBDateValue) {
          return node_bindings_1.default.create_date(input);
        }
        throw new Error(`input is not a DuckDBDateValue`);
      case DuckDBTypeId_1.DuckDBTypeId.TIME:
        if (input instanceof values_1.DuckDBTimeValue) {
          return node_bindings_1.default.create_time(input);
        }
        throw new Error(`input is not a DuckDBTimeValue`);
      case DuckDBTypeId_1.DuckDBTypeId.INTERVAL:
        if (input instanceof values_1.DuckDBIntervalValue) {
          return node_bindings_1.default.create_interval(input);
        }
        throw new Error(`input is not a DuckDBIntervalValue`);
      case DuckDBTypeId_1.DuckDBTypeId.HUGEINT:
        if (typeof input === "bigint") {
          return node_bindings_1.default.create_hugeint(input);
        }
        throw new Error(`input is not a bigint`);
      case DuckDBTypeId_1.DuckDBTypeId.UHUGEINT:
        if (typeof input === "bigint") {
          return node_bindings_1.default.create_uhugeint(input);
        }
        throw new Error(`input is not a bigint`);
      case DuckDBTypeId_1.DuckDBTypeId.VARCHAR:
        if (typeof input === "string") {
          return node_bindings_1.default.create_varchar(input);
        }
        throw new Error(`input is not a string`);
      case DuckDBTypeId_1.DuckDBTypeId.BLOB:
        if (input instanceof values_1.DuckDBBlobValue) {
          return node_bindings_1.default.create_blob(input.bytes);
        }
        throw new Error(`input is not a DuckDBBlobValue`);
      case DuckDBTypeId_1.DuckDBTypeId.DECIMAL:
        if (input instanceof values_1.DuckDBDecimalValue) {
          return node_bindings_1.default.create_decimal(input);
        }
        throw new Error(`input is not a DuckDBDecimalValue`);
      case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_S:
        if (input instanceof values_1.DuckDBTimestampSecondsValue) {
          return node_bindings_1.default.create_timestamp_s(input);
        }
        throw new Error(`input is not a DuckDBTimestampSecondsValue`);
      case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_MS:
        if (input instanceof values_1.DuckDBTimestampMillisecondsValue) {
          return node_bindings_1.default.create_timestamp_ms(input);
        }
        throw new Error(`input is not a DuckDBTimestampMillisecondsValue`);
      case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_NS:
        if (input instanceof values_1.DuckDBTimestampNanosecondsValue) {
          return node_bindings_1.default.create_timestamp_ns(input);
        }
        throw new Error(`input is not a DuckDBTimestampNanosecondsValue`);
      case DuckDBTypeId_1.DuckDBTypeId.ENUM:
        if (typeof input === "string") {
          return node_bindings_1.default.create_enum_value(type.toLogicalType().logical_type, type.indexForValue(input));
        }
        throw new Error(`input is not a string`);
      case DuckDBTypeId_1.DuckDBTypeId.LIST:
        if (input instanceof values_1.DuckDBListValue) {
          if (type.valueType.typeId === DuckDBTypeId_1.DuckDBTypeId.ANY) {
            throw new Error("Cannot create lists with item type of ANY. Specify a specific type.");
          }
          return node_bindings_1.default.create_list_value(type.valueType.toLogicalType().logical_type, input.items.map((item) => createValue(type.valueType, item)));
        }
        throw new Error(`input is not a DuckDBListValue`);
      case DuckDBTypeId_1.DuckDBTypeId.STRUCT:
        if (input instanceof values_1.DuckDBStructValue) {
          if (type.entryTypes.find((entryType) => entryType.typeId === DuckDBTypeId_1.DuckDBTypeId.ANY)) {
            throw new Error("Cannot create structs with an entry type of ANY. Specify a specific type.");
          }
          return node_bindings_1.default.create_struct_value(type.toLogicalType().logical_type, Object.values(input.entries).map((value, i) => createValue(type.entryTypes[i], value)));
        }
        throw new Error(`input is not a DuckDBStructValue`);
      case DuckDBTypeId_1.DuckDBTypeId.MAP:
        if (input instanceof values_1.DuckDBMapValue) {
          if (type.keyType.typeId === DuckDBTypeId_1.DuckDBTypeId.ANY) {
            throw new Error("Cannot create maps with key type of ANY. Specify a specific type.");
          }
          if (type.valueType.typeId === DuckDBTypeId_1.DuckDBTypeId.ANY) {
            throw new Error("Cannot create maps with value type of ANY. Specify a specific type.");
          }
          return node_bindings_1.default.create_map_value(type.toLogicalType().logical_type, input.entries.map((entry) => createValue(type.keyType, entry.key)), input.entries.map((entry) => createValue(type.valueType, entry.value)));
        }
        throw new Error(`input is not a DuckDBMapValue`);
      case DuckDBTypeId_1.DuckDBTypeId.ARRAY:
        if (input instanceof values_1.DuckDBArrayValue) {
          if (type.valueType.typeId === DuckDBTypeId_1.DuckDBTypeId.ANY) {
            throw new Error("Cannot create arrays with item type of ANY. Specify a specific type.");
          }
          return node_bindings_1.default.create_array_value(type.valueType.toLogicalType().logical_type, input.items.map((item) => createValue(type.valueType, item)));
        }
        throw new Error(`input is not a DuckDBArrayValue`);
      case DuckDBTypeId_1.DuckDBTypeId.UUID:
        if (input instanceof values_1.DuckDBUUIDValue) {
          return node_bindings_1.default.create_uuid(input.toUint128());
        }
        throw new Error(`input is not a bigint`);
      case DuckDBTypeId_1.DuckDBTypeId.UNION:
        if (input instanceof values_1.DuckDBUnionValue) {
          const tagIndex = type.memberIndexForTag(input.tag);
          const memberType = type.memberTypes[tagIndex];
          if (memberType.typeId === DuckDBTypeId_1.DuckDBTypeId.ANY) {
            throw new Error("Cannot create union values with type of ANY.");
          }
          return node_bindings_1.default.create_union_value(type.toLogicalType().logical_type, tagIndex, createValue(memberType, input.value));
        }
        throw new Error(`input is not a DuckDBUnionValue`);
      case DuckDBTypeId_1.DuckDBTypeId.BIT:
        if (input instanceof values_1.DuckDBBitValue) {
          return node_bindings_1.default.create_bit(input.data);
        }
        throw new Error(`input is not a DuckDBBitValue`);
      case DuckDBTypeId_1.DuckDBTypeId.TIME_TZ:
        if (input instanceof values_1.DuckDBTimeTZValue) {
          return node_bindings_1.default.create_time_tz_value(input);
        }
        throw new Error(`input is not a DuckDBTimeTZValue`);
      case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_TZ:
        if (input instanceof values_1.DuckDBTimestampTZValue) {
          return node_bindings_1.default.create_timestamp_tz(input);
        }
        throw new Error(`input is not a DuckDBTimestampTZValue`);
      case DuckDBTypeId_1.DuckDBTypeId.ANY:
        throw new Error(`Cannot create values of type ANY. Specify a specific type.`);
      case DuckDBTypeId_1.DuckDBTypeId.BIGNUM:
        if (typeof input === "bigint") {
          return node_bindings_1.default.create_bignum(input);
        }
        throw new Error(`input is not a bigint`);
      case DuckDBTypeId_1.DuckDBTypeId.SQLNULL:
        return node_bindings_1.default.create_null_value();
      default:
        throw new Error(`unrecognized type id ${typeId}`);
    }
  }
});

// node_modules/@duckdb/node-api/lib/DuckDBType.js
var require_DuckDBType = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBStructType = exports.DuckDBListType = exports.DuckDBEnumType = exports.TIMESTAMP_NS = exports.DuckDBTimestampNanosecondsType = exports.TIMESTAMP_MS = exports.DuckDBTimestampMillisecondsType = exports.TIMESTAMP_S = exports.DuckDBTimestampSecondsType = exports.DuckDBDecimalType = exports.BLOB = exports.DuckDBBlobType = exports.VARCHAR = exports.DuckDBVarCharType = exports.UHUGEINT = exports.DuckDBUHugeIntType = exports.HUGEINT = exports.DuckDBHugeIntType = exports.INTERVAL = exports.DuckDBIntervalType = exports.TIME = exports.DuckDBTimeType = exports.DATE = exports.DuckDBDateType = exports.DuckDBTimestampMicrosecondsType = exports.TIMESTAMP = exports.DuckDBTimestampType = exports.DOUBLE = exports.DuckDBDoubleType = exports.FLOAT = exports.DuckDBFloatType = exports.UBIGINT = exports.DuckDBUBigIntType = exports.UINTEGER = exports.DuckDBUIntegerType = exports.USMALLINT = exports.DuckDBUSmallIntType = exports.UTINYINT = exports.DuckDBUTinyIntType = exports.BIGINT = exports.DuckDBBigIntType = exports.INTEGER = exports.DuckDBIntegerType = exports.SMALLINT = exports.DuckDBSmallIntType = exports.TINYINT = exports.DuckDBTinyIntType = exports.BOOLEAN = exports.DuckDBBooleanType = exports.BaseDuckDBType = undefined;
  exports.SQLNULL = exports.DuckDBSQLNullType = exports.BIGNUM = exports.DuckDBBigNumType = exports.ANY = exports.DuckDBAnyType = exports.TIMESTAMPTZ = exports.DuckDBTimestampTZType = exports.TIMETZ = exports.DuckDBTimeTZType = exports.BIT = exports.DuckDBBitType = exports.DuckDBUnionType = exports.UUID = exports.DuckDBUUIDType = exports.DuckDBArrayType = exports.DuckDBMapType = undefined;
  exports.DECIMAL = DECIMAL;
  exports.ENUM8 = ENUM8;
  exports.ENUM16 = ENUM16;
  exports.ENUM32 = ENUM32;
  exports.ENUM = ENUM;
  exports.LIST = LIST;
  exports.STRUCT = STRUCT;
  exports.MAP = MAP;
  exports.ARRAY = ARRAY;
  exports.UNION = UNION;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBLogicalType_1 = require_DuckDBLogicalType();
  var DuckDBTypeId_1 = require_DuckDBTypeId();
  var sql_1 = require_sql();
  var values_1 = require_values();

  class BaseDuckDBType {
    typeId;
    alias;
    constructor(typeId, alias) {
      this.typeId = typeId;
      this.alias = alias;
    }
    toString() {
      return DuckDBTypeId_1.DuckDBTypeId[this.typeId];
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.create(node_bindings_1.default.create_logical_type(this.typeId));
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.BaseDuckDBType = BaseDuckDBType;

  class DuckDBBooleanType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.BOOLEAN, alias);
    }
    static instance = new DuckDBBooleanType;
    static create(alias) {
      return alias ? new DuckDBBooleanType(alias) : DuckDBBooleanType.instance;
    }
  }
  exports.DuckDBBooleanType = DuckDBBooleanType;
  exports.BOOLEAN = DuckDBBooleanType.instance;

  class DuckDBTinyIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TINYINT, alias);
    }
    static instance = new DuckDBTinyIntType;
    static create(alias) {
      return alias ? new DuckDBTinyIntType(alias) : DuckDBTinyIntType.instance;
    }
    static Max = 2 ** 7 - 1;
    static Min = -(2 ** 7);
    get max() {
      return DuckDBTinyIntType.Max;
    }
    get min() {
      return DuckDBTinyIntType.Min;
    }
  }
  exports.DuckDBTinyIntType = DuckDBTinyIntType;
  exports.TINYINT = DuckDBTinyIntType.instance;

  class DuckDBSmallIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.SMALLINT, alias);
    }
    static instance = new DuckDBSmallIntType;
    static create(alias) {
      return alias ? new DuckDBSmallIntType(alias) : DuckDBSmallIntType.instance;
    }
    static Max = 2 ** 15 - 1;
    static Min = -(2 ** 15);
    get max() {
      return DuckDBSmallIntType.Max;
    }
    get min() {
      return DuckDBSmallIntType.Min;
    }
  }
  exports.DuckDBSmallIntType = DuckDBSmallIntType;
  exports.SMALLINT = DuckDBSmallIntType.instance;

  class DuckDBIntegerType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.INTEGER, alias);
    }
    static instance = new DuckDBIntegerType;
    static create(alias) {
      return alias ? new DuckDBIntegerType(alias) : DuckDBIntegerType.instance;
    }
    static Max = 2 ** 31 - 1;
    static Min = -(2 ** 31);
    get max() {
      return DuckDBIntegerType.Max;
    }
    get min() {
      return DuckDBIntegerType.Min;
    }
  }
  exports.DuckDBIntegerType = DuckDBIntegerType;
  exports.INTEGER = DuckDBIntegerType.instance;

  class DuckDBBigIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.BIGINT, alias);
    }
    static instance = new DuckDBBigIntType;
    static create(alias) {
      return alias ? new DuckDBBigIntType(alias) : DuckDBBigIntType.instance;
    }
    static Max = 2n ** 63n - 1n;
    static Min = -(2n ** 63n);
    get max() {
      return DuckDBBigIntType.Max;
    }
    get min() {
      return DuckDBBigIntType.Min;
    }
  }
  exports.DuckDBBigIntType = DuckDBBigIntType;
  exports.BIGINT = DuckDBBigIntType.instance;

  class DuckDBUTinyIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.UTINYINT, alias);
    }
    static instance = new DuckDBUTinyIntType;
    static create(alias) {
      return alias ? new DuckDBUTinyIntType(alias) : DuckDBUTinyIntType.instance;
    }
    static Max = 2 ** 8 - 1;
    static Min = 0;
    get max() {
      return DuckDBUTinyIntType.Max;
    }
    get min() {
      return DuckDBUTinyIntType.Min;
    }
  }
  exports.DuckDBUTinyIntType = DuckDBUTinyIntType;
  exports.UTINYINT = DuckDBUTinyIntType.instance;

  class DuckDBUSmallIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.USMALLINT, alias);
    }
    static instance = new DuckDBUSmallIntType;
    static create(alias) {
      return alias ? new DuckDBUSmallIntType(alias) : DuckDBUSmallIntType.instance;
    }
    static Max = 2 ** 16 - 1;
    static Min = 0;
    get max() {
      return DuckDBUSmallIntType.Max;
    }
    get min() {
      return DuckDBUSmallIntType.Min;
    }
  }
  exports.DuckDBUSmallIntType = DuckDBUSmallIntType;
  exports.USMALLINT = DuckDBUSmallIntType.instance;

  class DuckDBUIntegerType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.UINTEGER, alias);
    }
    static instance = new DuckDBUIntegerType;
    static create(alias) {
      return alias ? new DuckDBUIntegerType(alias) : DuckDBUIntegerType.instance;
    }
    static Max = 2 ** 32 - 1;
    static Min = 0;
    get max() {
      return DuckDBUIntegerType.Max;
    }
    get min() {
      return DuckDBUIntegerType.Min;
    }
  }
  exports.DuckDBUIntegerType = DuckDBUIntegerType;
  exports.UINTEGER = DuckDBUIntegerType.instance;

  class DuckDBUBigIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.UBIGINT, alias);
    }
    static instance = new DuckDBUBigIntType;
    static create(alias) {
      return alias ? new DuckDBUBigIntType(alias) : DuckDBUBigIntType.instance;
    }
    static Max = 2n ** 64n - 1n;
    static Min = 0n;
    get max() {
      return DuckDBUBigIntType.Max;
    }
    get min() {
      return DuckDBUBigIntType.Min;
    }
  }
  exports.DuckDBUBigIntType = DuckDBUBigIntType;
  exports.UBIGINT = DuckDBUBigIntType.instance;

  class DuckDBFloatType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.FLOAT, alias);
    }
    static instance = new DuckDBFloatType;
    static create(alias) {
      return alias ? new DuckDBFloatType(alias) : DuckDBFloatType.instance;
    }
    static Max = Math.fround(340282350000000000000000000000000000000);
    static Min = Math.fround(-340282350000000000000000000000000000000);
    get max() {
      return DuckDBFloatType.Max;
    }
    get min() {
      return DuckDBFloatType.Min;
    }
  }
  exports.DuckDBFloatType = DuckDBFloatType;
  exports.FLOAT = DuckDBFloatType.instance;

  class DuckDBDoubleType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.DOUBLE, alias);
    }
    static instance = new DuckDBDoubleType;
    static create(alias) {
      return alias ? new DuckDBDoubleType(alias) : DuckDBDoubleType.instance;
    }
    static Max = Number.MAX_VALUE;
    static Min = -Number.MAX_VALUE;
    get max() {
      return DuckDBDoubleType.Max;
    }
    get min() {
      return DuckDBDoubleType.Min;
    }
  }
  exports.DuckDBDoubleType = DuckDBDoubleType;
  exports.DOUBLE = DuckDBDoubleType.instance;

  class DuckDBTimestampType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP, alias);
    }
    static instance = new DuckDBTimestampType;
    static create(alias) {
      return alias ? new DuckDBTimestampType(alias) : DuckDBTimestampType.instance;
    }
    get epoch() {
      return values_1.DuckDBTimestampValue.Epoch;
    }
    get max() {
      return values_1.DuckDBTimestampValue.Max;
    }
    get min() {
      return values_1.DuckDBTimestampValue.Min;
    }
    get posInf() {
      return values_1.DuckDBTimestampValue.PosInf;
    }
    get negInf() {
      return values_1.DuckDBTimestampValue.NegInf;
    }
  }
  exports.DuckDBTimestampType = DuckDBTimestampType;
  exports.TIMESTAMP = DuckDBTimestampType.instance;
  exports.DuckDBTimestampMicrosecondsType = DuckDBTimestampType;

  class DuckDBDateType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.DATE, alias);
    }
    static instance = new DuckDBDateType;
    static create(alias) {
      return alias ? new DuckDBDateType(alias) : DuckDBDateType.instance;
    }
    get epoch() {
      return values_1.DuckDBDateValue.Epoch;
    }
    get max() {
      return values_1.DuckDBDateValue.Max;
    }
    get min() {
      return values_1.DuckDBDateValue.Min;
    }
    get posInf() {
      return values_1.DuckDBDateValue.PosInf;
    }
    get negInf() {
      return values_1.DuckDBDateValue.NegInf;
    }
  }
  exports.DuckDBDateType = DuckDBDateType;
  exports.DATE = DuckDBDateType.instance;

  class DuckDBTimeType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIME, alias);
    }
    static instance = new DuckDBTimeType;
    static create(alias) {
      return alias ? new DuckDBTimeType(alias) : DuckDBTimeType.instance;
    }
    get max() {
      return values_1.DuckDBTimeValue.Max;
    }
    get min() {
      return values_1.DuckDBTimeValue.Min;
    }
  }
  exports.DuckDBTimeType = DuckDBTimeType;
  exports.TIME = DuckDBTimeType.instance;

  class DuckDBIntervalType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.INTERVAL, alias);
    }
    static instance = new DuckDBIntervalType;
    static create(alias) {
      return alias ? new DuckDBIntervalType(alias) : DuckDBIntervalType.instance;
    }
  }
  exports.DuckDBIntervalType = DuckDBIntervalType;
  exports.INTERVAL = DuckDBIntervalType.instance;

  class DuckDBHugeIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.HUGEINT, alias);
    }
    static instance = new DuckDBHugeIntType;
    static create(alias) {
      return alias ? new DuckDBHugeIntType(alias) : DuckDBHugeIntType.instance;
    }
    static Max = 2n ** 127n - 1n;
    static Min = -(2n ** 127n);
    get max() {
      return DuckDBHugeIntType.Max;
    }
    get min() {
      return DuckDBHugeIntType.Min;
    }
  }
  exports.DuckDBHugeIntType = DuckDBHugeIntType;
  exports.HUGEINT = DuckDBHugeIntType.instance;

  class DuckDBUHugeIntType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.UHUGEINT, alias);
    }
    static instance = new DuckDBUHugeIntType;
    static create(alias) {
      return alias ? new DuckDBUHugeIntType(alias) : DuckDBUHugeIntType.instance;
    }
    static Max = 2n ** 128n - 1n;
    static Min = 0n;
    get max() {
      return DuckDBUHugeIntType.Max;
    }
    get min() {
      return DuckDBUHugeIntType.Min;
    }
  }
  exports.DuckDBUHugeIntType = DuckDBUHugeIntType;
  exports.UHUGEINT = DuckDBUHugeIntType.instance;

  class DuckDBVarCharType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.VARCHAR, alias);
    }
    static instance = new DuckDBVarCharType;
    static create(alias) {
      return alias ? new DuckDBVarCharType(alias) : DuckDBVarCharType.instance;
    }
  }
  exports.DuckDBVarCharType = DuckDBVarCharType;
  exports.VARCHAR = DuckDBVarCharType.instance;

  class DuckDBBlobType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.BLOB, alias);
    }
    static instance = new DuckDBBlobType;
    static create(alias) {
      return alias ? new DuckDBBlobType(alias) : DuckDBBlobType.instance;
    }
  }
  exports.DuckDBBlobType = DuckDBBlobType;
  exports.BLOB = DuckDBBlobType.instance;

  class DuckDBDecimalType extends BaseDuckDBType {
    width;
    scale;
    constructor(width, scale, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.DECIMAL, alias);
      this.width = width;
      this.scale = scale;
    }
    toString() {
      return `DECIMAL(${this.width},${this.scale})`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createDecimal(this.width, this.scale);
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        width: this.width,
        scale: this.scale,
        ...this.alias ? { alias: this.alias } : {}
      };
    }
    static default = new DuckDBDecimalType(18, 3);
  }
  exports.DuckDBDecimalType = DuckDBDecimalType;
  function DECIMAL(width, scale, alias) {
    if (width === undefined) {
      return DuckDBDecimalType.default;
    }
    if (scale === undefined) {
      return new DuckDBDecimalType(width, 0);
    }
    return new DuckDBDecimalType(width, scale, alias);
  }

  class DuckDBTimestampSecondsType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_S, alias);
    }
    static instance = new DuckDBTimestampSecondsType;
    static create(alias) {
      return alias ? new DuckDBTimestampSecondsType(alias) : DuckDBTimestampSecondsType.instance;
    }
    get epoch() {
      return values_1.DuckDBTimestampSecondsValue.Epoch;
    }
    get max() {
      return values_1.DuckDBTimestampSecondsValue.Max;
    }
    get min() {
      return values_1.DuckDBTimestampSecondsValue.Min;
    }
    get posInf() {
      return values_1.DuckDBTimestampSecondsValue.PosInf;
    }
    get negInf() {
      return values_1.DuckDBTimestampSecondsValue.NegInf;
    }
  }
  exports.DuckDBTimestampSecondsType = DuckDBTimestampSecondsType;
  exports.TIMESTAMP_S = DuckDBTimestampSecondsType.instance;

  class DuckDBTimestampMillisecondsType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_MS, alias);
    }
    static instance = new DuckDBTimestampMillisecondsType;
    static create(alias) {
      return alias ? new DuckDBTimestampMillisecondsType(alias) : DuckDBTimestampMillisecondsType.instance;
    }
    get epoch() {
      return values_1.DuckDBTimestampMillisecondsValue.Epoch;
    }
    get max() {
      return values_1.DuckDBTimestampMillisecondsValue.Max;
    }
    get min() {
      return values_1.DuckDBTimestampMillisecondsValue.Min;
    }
    get posInf() {
      return values_1.DuckDBTimestampMillisecondsValue.PosInf;
    }
    get negInf() {
      return values_1.DuckDBTimestampMillisecondsValue.NegInf;
    }
  }
  exports.DuckDBTimestampMillisecondsType = DuckDBTimestampMillisecondsType;
  exports.TIMESTAMP_MS = DuckDBTimestampMillisecondsType.instance;

  class DuckDBTimestampNanosecondsType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_NS, alias);
    }
    static instance = new DuckDBTimestampNanosecondsType;
    static create(alias) {
      return alias ? new DuckDBTimestampNanosecondsType(alias) : DuckDBTimestampNanosecondsType.instance;
    }
    get epoch() {
      return values_1.DuckDBTimestampNanosecondsValue.Epoch;
    }
    get max() {
      return values_1.DuckDBTimestampNanosecondsValue.Max;
    }
    get min() {
      return values_1.DuckDBTimestampNanosecondsValue.Min;
    }
    get posInf() {
      return values_1.DuckDBTimestampNanosecondsValue.PosInf;
    }
    get negInf() {
      return values_1.DuckDBTimestampNanosecondsValue.NegInf;
    }
  }
  exports.DuckDBTimestampNanosecondsType = DuckDBTimestampNanosecondsType;
  exports.TIMESTAMP_NS = DuckDBTimestampNanosecondsType.instance;

  class DuckDBEnumType extends BaseDuckDBType {
    values;
    valueIndexes;
    internalTypeId;
    constructor(values, internalTypeId, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.ENUM, alias);
      this.values = values;
      const valueIndexes = {};
      for (let i = 0;i < values.length; i++) {
        valueIndexes[values[i]] = i;
      }
      this.valueIndexes = valueIndexes;
      this.internalTypeId = internalTypeId;
    }
    indexForValue(value) {
      return this.valueIndexes[value];
    }
    toString() {
      return `ENUM(${this.values.map(sql_1.quotedString).join(", ")})`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createEnum(this.values);
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        values: [...this.values],
        internalTypeId: this.internalTypeId,
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.DuckDBEnumType = DuckDBEnumType;
  function ENUM8(values, alias) {
    return new DuckDBEnumType(values, DuckDBTypeId_1.DuckDBTypeId.UTINYINT, alias);
  }
  function ENUM16(values, alias) {
    return new DuckDBEnumType(values, DuckDBTypeId_1.DuckDBTypeId.USMALLINT, alias);
  }
  function ENUM32(values, alias) {
    return new DuckDBEnumType(values, DuckDBTypeId_1.DuckDBTypeId.UINTEGER, alias);
  }
  function ENUM(values, alias) {
    if (values.length < 256) {
      return ENUM8(values, alias);
    } else if (values.length < 65536) {
      return ENUM16(values, alias);
    } else if (values.length < 4294967296) {
      return ENUM32(values, alias);
    } else {
      throw new Error(`ENUM types cannot have more than 4294967295 values; received ${values.length}`);
    }
  }

  class DuckDBListType extends BaseDuckDBType {
    valueType;
    constructor(valueType, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.LIST, alias);
      this.valueType = valueType;
    }
    toString() {
      return `${this.valueType}[]`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createList(this.valueType.toLogicalType());
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        valueType: this.valueType.toJson(),
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.DuckDBListType = DuckDBListType;
  function LIST(valueType, alias) {
    return new DuckDBListType(valueType, alias);
  }

  class DuckDBStructType extends BaseDuckDBType {
    entryNames;
    entryTypes;
    entryIndexes;
    constructor(entryNames, entryTypes, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.STRUCT, alias);
      if (entryNames.length !== entryTypes.length) {
        throw new Error(`Could not create DuckDBStructType:         entryNames length (${entryNames.length}) does not match entryTypes length (${entryTypes.length})`);
      }
      this.entryNames = entryNames;
      this.entryTypes = entryTypes;
      const entryIndexes = {};
      for (let i = 0;i < entryNames.length; i++) {
        entryIndexes[entryNames[i]] = i;
      }
      this.entryIndexes = entryIndexes;
    }
    get entryCount() {
      return this.entryNames.length;
    }
    indexForEntry(entryName) {
      return this.entryIndexes[entryName];
    }
    typeForEntry(entryName) {
      return this.entryTypes[this.entryIndexes[entryName]];
    }
    toString() {
      const parts = [];
      for (let i = 0;i < this.entryNames.length; i++) {
        parts.push(`${(0, sql_1.quotedIdentifier)(this.entryNames[i])} ${this.entryTypes[i]}`);
      }
      return `STRUCT(${parts.join(", ")})`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createStruct(this.entryNames, this.entryTypes.map((t) => t.toLogicalType()));
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        entryNames: [...this.entryNames],
        entryTypes: this.entryTypes.map((t) => t.toJson()),
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.DuckDBStructType = DuckDBStructType;
  function STRUCT(entries, alias) {
    const entryNames = Object.keys(entries);
    const entryTypes = Object.values(entries);
    return new DuckDBStructType(entryNames, entryTypes, alias);
  }

  class DuckDBMapType extends BaseDuckDBType {
    keyType;
    valueType;
    constructor(keyType, valueType, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.MAP, alias);
      this.keyType = keyType;
      this.valueType = valueType;
    }
    toString() {
      return `MAP(${this.keyType}, ${this.valueType})`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createMap(this.keyType.toLogicalType(), this.valueType.toLogicalType());
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        keyType: this.keyType.toJson(),
        valueType: this.valueType.toJson(),
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.DuckDBMapType = DuckDBMapType;
  function MAP(keyType, valueType, alias) {
    return new DuckDBMapType(keyType, valueType, alias);
  }

  class DuckDBArrayType extends BaseDuckDBType {
    valueType;
    length;
    constructor(valueType, length, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.ARRAY, alias);
      this.valueType = valueType;
      this.length = length;
    }
    toString() {
      return `${this.valueType}[${this.length}]`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createArray(this.valueType.toLogicalType(), this.length);
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        valueType: this.valueType.toJson(),
        length: this.length,
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.DuckDBArrayType = DuckDBArrayType;
  function ARRAY(valueType, length, alias) {
    return new DuckDBArrayType(valueType, length, alias);
  }

  class DuckDBUUIDType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.UUID, alias);
    }
    static instance = new DuckDBUUIDType;
    static create(alias) {
      return alias ? new DuckDBUUIDType(alias) : DuckDBUUIDType.instance;
    }
    get max() {
      return values_1.DuckDBUUIDValue.Max;
    }
    get min() {
      return values_1.DuckDBUUIDValue.Min;
    }
  }
  exports.DuckDBUUIDType = DuckDBUUIDType;
  exports.UUID = DuckDBUUIDType.instance;

  class DuckDBUnionType extends BaseDuckDBType {
    memberTags;
    tagMemberIndexes;
    memberTypes;
    constructor(memberTags, memberTypes, alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.UNION, alias);
      if (memberTags.length !== memberTypes.length) {
        throw new Error(`Could not create DuckDBUnionType:         tags length (${memberTags.length}) does not match valueTypes length (${memberTypes.length})`);
      }
      this.memberTags = memberTags;
      const tagMemberIndexes = {};
      for (let i = 0;i < memberTags.length; i++) {
        tagMemberIndexes[memberTags[i]] = i;
      }
      this.tagMemberIndexes = tagMemberIndexes;
      this.memberTypes = memberTypes;
    }
    memberIndexForTag(tag) {
      return this.tagMemberIndexes[tag];
    }
    memberTypeForTag(tag) {
      return this.memberTypes[this.tagMemberIndexes[tag]];
    }
    get memberCount() {
      return this.memberTags.length;
    }
    toString() {
      const parts = [];
      for (let i = 0;i < this.memberTags.length; i++) {
        parts.push(`${(0, sql_1.quotedIdentifier)(this.memberTags[i])} ${this.memberTypes[i]}`);
      }
      return `UNION(${parts.join(", ")})`;
    }
    toLogicalType() {
      const logicalType = DuckDBLogicalType_1.DuckDBLogicalType.createUnion(this.memberTags, this.memberTypes.map((t) => t.toLogicalType()));
      if (this.alias) {
        logicalType.alias = this.alias;
      }
      return logicalType;
    }
    toJson() {
      return {
        typeId: this.typeId,
        memberTags: [...this.memberTags],
        memberTypes: this.memberTypes.map((t) => t.toJson()),
        ...this.alias ? { alias: this.alias } : {}
      };
    }
  }
  exports.DuckDBUnionType = DuckDBUnionType;
  function UNION(members, alias) {
    const memberTags = Object.keys(members);
    const memberTypes = Object.values(members);
    return new DuckDBUnionType(memberTags, memberTypes, alias);
  }

  class DuckDBBitType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.BIT, alias);
    }
    static instance = new DuckDBBitType;
    static create(alias) {
      return alias ? new DuckDBBitType(alias) : DuckDBBitType.instance;
    }
  }
  exports.DuckDBBitType = DuckDBBitType;
  exports.BIT = DuckDBBitType.instance;

  class DuckDBTimeTZType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIME_TZ, alias);
    }
    toString() {
      return "TIME WITH TIME ZONE";
    }
    static instance = new DuckDBTimeTZType;
    static create(alias) {
      return alias ? new DuckDBTimeTZType(alias) : DuckDBTimeTZType.instance;
    }
    get max() {
      return values_1.DuckDBTimeTZValue.Max;
    }
    get min() {
      return values_1.DuckDBTimeTZValue.Min;
    }
  }
  exports.DuckDBTimeTZType = DuckDBTimeTZType;
  exports.TIMETZ = DuckDBTimeTZType.instance;

  class DuckDBTimestampTZType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_TZ, alias);
    }
    toString() {
      return "TIMESTAMP WITH TIME ZONE";
    }
    static instance = new DuckDBTimestampTZType;
    static create(alias) {
      return alias ? new DuckDBTimestampTZType(alias) : DuckDBTimestampTZType.instance;
    }
    get epoch() {
      return values_1.DuckDBTimestampTZValue.Epoch;
    }
    get max() {
      return values_1.DuckDBTimestampTZValue.Max;
    }
    get min() {
      return values_1.DuckDBTimestampTZValue.Min;
    }
    get posInf() {
      return values_1.DuckDBTimestampTZValue.PosInf;
    }
    get negInf() {
      return values_1.DuckDBTimestampTZValue.NegInf;
    }
  }
  exports.DuckDBTimestampTZType = DuckDBTimestampTZType;
  exports.TIMESTAMPTZ = DuckDBTimestampTZType.instance;

  class DuckDBAnyType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.ANY, alias);
    }
    static instance = new DuckDBAnyType;
    static create(alias) {
      return alias ? new DuckDBAnyType(alias) : DuckDBAnyType.instance;
    }
  }
  exports.DuckDBAnyType = DuckDBAnyType;
  exports.ANY = DuckDBAnyType.instance;

  class DuckDBBigNumType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.BIGNUM, alias);
    }
    static instance = new DuckDBBigNumType;
    static create(alias) {
      return alias ? new DuckDBBigNumType(alias) : DuckDBBigNumType.instance;
    }
    static Max = 179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368n;
    static Min = -179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368n;
    get max() {
      return DuckDBBigNumType.Max;
    }
    get min() {
      return DuckDBBigNumType.Min;
    }
  }
  exports.DuckDBBigNumType = DuckDBBigNumType;
  exports.BIGNUM = DuckDBBigNumType.instance;

  class DuckDBSQLNullType extends BaseDuckDBType {
    constructor(alias) {
      super(DuckDBTypeId_1.DuckDBTypeId.SQLNULL, alias);
    }
    static instance = new DuckDBSQLNullType;
    static create(alias) {
      return alias ? new DuckDBSQLNullType(alias) : DuckDBSQLNullType.instance;
    }
  }
  exports.DuckDBSQLNullType = DuckDBSQLNullType;
  exports.SQLNULL = DuckDBSQLNullType.instance;
});

// node_modules/@duckdb/node-api/lib/DuckDBLogicalType.js
var require_DuckDBLogicalType = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBUnionLogicalType = exports.DuckDBArrayLogicalType = exports.DuckDBMapLogicalType = exports.DuckDBStructLogicalType = exports.DuckDBListLogicalType = exports.DuckDBEnumLogicalType = exports.DuckDBDecimalLogicalType = exports.DuckDBLogicalType = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBType_1 = require_DuckDBType();
  var DuckDBTypeId_1 = require_DuckDBTypeId();

  class DuckDBLogicalType {
    logical_type;
    constructor(logical_type) {
      this.logical_type = logical_type;
    }
    static create(logical_type) {
      switch (node_bindings_1.default.get_type_id(logical_type)) {
        case node_bindings_1.default.Type.DECIMAL:
          return new DuckDBDecimalLogicalType(logical_type);
        case node_bindings_1.default.Type.ENUM:
          return new DuckDBEnumLogicalType(logical_type);
        case node_bindings_1.default.Type.LIST:
          return new DuckDBListLogicalType(logical_type);
        case node_bindings_1.default.Type.STRUCT:
          return new DuckDBStructLogicalType(logical_type);
        case node_bindings_1.default.Type.MAP:
          return new DuckDBMapLogicalType(logical_type);
        case node_bindings_1.default.Type.ARRAY:
          return new DuckDBArrayLogicalType(logical_type);
        case node_bindings_1.default.Type.UNION:
          return new DuckDBUnionLogicalType(logical_type);
        default:
          return new DuckDBLogicalType(logical_type);
      }
    }
    static createDecimal(width, scale) {
      return new DuckDBDecimalLogicalType(node_bindings_1.default.create_decimal_type(width, scale));
    }
    static createEnum(member_names) {
      return new DuckDBEnumLogicalType(node_bindings_1.default.create_enum_type(member_names));
    }
    static createList(valueType) {
      return new DuckDBListLogicalType(node_bindings_1.default.create_list_type(valueType.logical_type));
    }
    static createStruct(entryNames, entryLogicalTypes) {
      const length = entryNames.length;
      if (length !== entryLogicalTypes.length) {
        throw new Error(`Could not create struct:         entryNames length (${entryNames.length}) does not match entryLogicalTypes length (${entryLogicalTypes.length})`);
      }
      const member_types = [];
      const member_names = [];
      for (let i = 0;i < length; i++) {
        member_types.push(entryLogicalTypes[i].logical_type);
        member_names.push(entryNames[i]);
      }
      return new DuckDBStructLogicalType(node_bindings_1.default.create_struct_type(member_types, member_names));
    }
    static createMap(keyType, valueType) {
      return new DuckDBMapLogicalType(node_bindings_1.default.create_map_type(keyType.logical_type, valueType.logical_type));
    }
    static createArray(valueType, length) {
      return new DuckDBArrayLogicalType(node_bindings_1.default.create_array_type(valueType.logical_type, length));
    }
    static createUnion(memberTags, memberLogicalTypes) {
      const length = memberTags.length;
      if (length !== memberLogicalTypes.length) {
        throw new Error(`Could not create union:         memberTags length (${memberTags.length}) does not match memberLogicalTypes length (${memberLogicalTypes.length})`);
      }
      const member_types = [];
      const member_names = [];
      for (let i = 0;i < length; i++) {
        member_types.push(memberLogicalTypes[i].logical_type);
        member_names.push(memberTags[i]);
      }
      return new DuckDBUnionLogicalType(node_bindings_1.default.create_union_type(member_types, member_names));
    }
    get typeId() {
      return node_bindings_1.default.get_type_id(this.logical_type);
    }
    get alias() {
      return node_bindings_1.default.logical_type_get_alias(this.logical_type) || undefined;
    }
    set alias(newAlias) {
      node_bindings_1.default.logical_type_set_alias(this.logical_type, newAlias || "");
    }
    asType() {
      const alias = this.alias;
      switch (this.typeId) {
        case DuckDBTypeId_1.DuckDBTypeId.BOOLEAN:
          return DuckDBType_1.DuckDBBooleanType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TINYINT:
          return DuckDBType_1.DuckDBTinyIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.SMALLINT:
          return DuckDBType_1.DuckDBSmallIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.INTEGER:
          return DuckDBType_1.DuckDBIntegerType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.BIGINT:
          return DuckDBType_1.DuckDBBigIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.UTINYINT:
          return DuckDBType_1.DuckDBUTinyIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.USMALLINT:
          return DuckDBType_1.DuckDBUSmallIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.UINTEGER:
          return DuckDBType_1.DuckDBUIntegerType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.UBIGINT:
          return DuckDBType_1.DuckDBUBigIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.FLOAT:
          return DuckDBType_1.DuckDBFloatType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.DOUBLE:
          return DuckDBType_1.DuckDBDoubleType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP:
          return DuckDBType_1.DuckDBTimestampType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.DATE:
          return DuckDBType_1.DuckDBDateType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TIME:
          return DuckDBType_1.DuckDBTimeType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.INTERVAL:
          return DuckDBType_1.DuckDBIntervalType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.HUGEINT:
          return DuckDBType_1.DuckDBHugeIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.UHUGEINT:
          return DuckDBType_1.DuckDBUHugeIntType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.VARCHAR:
          return DuckDBType_1.DuckDBVarCharType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.BLOB:
          return DuckDBType_1.DuckDBBlobType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.DECIMAL:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_S:
          return DuckDBType_1.DuckDBTimestampSecondsType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_MS:
          return DuckDBType_1.DuckDBTimestampMillisecondsType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_NS:
          return DuckDBType_1.DuckDBTimestampNanosecondsType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.ENUM:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.LIST:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.STRUCT:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.MAP:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.ARRAY:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.UUID:
          return DuckDBType_1.DuckDBUUIDType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.UNION:
          throw new Error("Expected override");
        case DuckDBTypeId_1.DuckDBTypeId.BIT:
          return DuckDBType_1.DuckDBBitType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TIME_TZ:
          return DuckDBType_1.DuckDBTimeTZType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_TZ:
          return DuckDBType_1.DuckDBTimestampTZType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.ANY:
          return DuckDBType_1.DuckDBAnyType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.BIGNUM:
          return DuckDBType_1.DuckDBBigNumType.create(alias);
        case DuckDBTypeId_1.DuckDBTypeId.SQLNULL:
          return DuckDBType_1.DuckDBSQLNullType.create(alias);
        default:
          throw new Error(`Unexpected type id: ${this.typeId}`);
      }
    }
  }
  exports.DuckDBLogicalType = DuckDBLogicalType;

  class DuckDBDecimalLogicalType extends DuckDBLogicalType {
    get width() {
      return node_bindings_1.default.decimal_width(this.logical_type);
    }
    get scale() {
      return node_bindings_1.default.decimal_scale(this.logical_type);
    }
    get internalTypeId() {
      return node_bindings_1.default.decimal_internal_type(this.logical_type);
    }
    asType() {
      return new DuckDBType_1.DuckDBDecimalType(this.width, this.scale, this.alias);
    }
  }
  exports.DuckDBDecimalLogicalType = DuckDBDecimalLogicalType;

  class DuckDBEnumLogicalType extends DuckDBLogicalType {
    get valueCount() {
      return node_bindings_1.default.enum_dictionary_size(this.logical_type);
    }
    value(index) {
      return node_bindings_1.default.enum_dictionary_value(this.logical_type, index);
    }
    values() {
      const values = [];
      const count = this.valueCount;
      for (let i = 0;i < count; i++) {
        values.push(this.value(i));
      }
      return values;
    }
    get internalTypeId() {
      return node_bindings_1.default.enum_internal_type(this.logical_type);
    }
    asType() {
      return new DuckDBType_1.DuckDBEnumType(this.values(), this.internalTypeId, this.alias);
    }
  }
  exports.DuckDBEnumLogicalType = DuckDBEnumLogicalType;

  class DuckDBListLogicalType extends DuckDBLogicalType {
    get valueType() {
      return DuckDBLogicalType.create(node_bindings_1.default.list_type_child_type(this.logical_type));
    }
    asType() {
      return new DuckDBType_1.DuckDBListType(this.valueType.asType(), this.alias);
    }
  }
  exports.DuckDBListLogicalType = DuckDBListLogicalType;

  class DuckDBStructLogicalType extends DuckDBLogicalType {
    get entryCount() {
      return node_bindings_1.default.struct_type_child_count(this.logical_type);
    }
    entryName(index) {
      return node_bindings_1.default.struct_type_child_name(this.logical_type, index);
    }
    entryLogicalType(index) {
      return DuckDBLogicalType.create(node_bindings_1.default.struct_type_child_type(this.logical_type, index));
    }
    entryType(index) {
      return this.entryLogicalType(index).asType();
    }
    entryNames() {
      const names = [];
      const count = this.entryCount;
      for (let i = 0;i < count; i++) {
        names.push(this.entryName(i));
      }
      return names;
    }
    entryLogicalTypes() {
      const valueTypes = [];
      const count = this.entryCount;
      for (let i = 0;i < count; i++) {
        valueTypes.push(this.entryLogicalType(i));
      }
      return valueTypes;
    }
    entryTypes() {
      const valueTypes = [];
      const count = this.entryCount;
      for (let i = 0;i < count; i++) {
        valueTypes.push(this.entryType(i));
      }
      return valueTypes;
    }
    asType() {
      return new DuckDBType_1.DuckDBStructType(this.entryNames(), this.entryTypes(), this.alias);
    }
  }
  exports.DuckDBStructLogicalType = DuckDBStructLogicalType;

  class DuckDBMapLogicalType extends DuckDBLogicalType {
    get keyType() {
      return DuckDBLogicalType.create(node_bindings_1.default.map_type_key_type(this.logical_type));
    }
    get valueType() {
      return DuckDBLogicalType.create(node_bindings_1.default.map_type_value_type(this.logical_type));
    }
    asType() {
      return new DuckDBType_1.DuckDBMapType(this.keyType.asType(), this.valueType.asType(), this.alias);
    }
  }
  exports.DuckDBMapLogicalType = DuckDBMapLogicalType;

  class DuckDBArrayLogicalType extends DuckDBLogicalType {
    get valueType() {
      return DuckDBLogicalType.create(node_bindings_1.default.array_type_child_type(this.logical_type));
    }
    get length() {
      return node_bindings_1.default.array_type_array_size(this.logical_type);
    }
    asType() {
      return new DuckDBType_1.DuckDBArrayType(this.valueType.asType(), this.length, this.alias);
    }
  }
  exports.DuckDBArrayLogicalType = DuckDBArrayLogicalType;

  class DuckDBUnionLogicalType extends DuckDBLogicalType {
    get memberCount() {
      return node_bindings_1.default.union_type_member_count(this.logical_type);
    }
    memberTag(index) {
      return node_bindings_1.default.union_type_member_name(this.logical_type, index);
    }
    memberLogicalType(index) {
      return DuckDBLogicalType.create(node_bindings_1.default.union_type_member_type(this.logical_type, index));
    }
    memberType(index) {
      return this.memberLogicalType(index).asType();
    }
    memberTags() {
      const tags = [];
      const count = this.memberCount;
      for (let i = 0;i < count; i++) {
        tags.push(this.memberTag(i));
      }
      return tags;
    }
    memberLogicalTypes() {
      const valueTypes = [];
      const count = this.memberCount;
      for (let i = 0;i < count; i++) {
        valueTypes.push(this.memberLogicalType(i));
      }
      return valueTypes;
    }
    memberTypes() {
      const valueTypes = [];
      const count = this.memberCount;
      for (let i = 0;i < count; i++) {
        valueTypes.push(this.memberType(i));
      }
      return valueTypes;
    }
    asType() {
      return new DuckDBType_1.DuckDBUnionType(this.memberTags(), this.memberTypes(), this.alias);
    }
  }
  exports.DuckDBUnionLogicalType = DuckDBUnionLogicalType;
});

// node_modules/@duckdb/node-api/lib/typeForValue.js
var require_typeForValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.typeForValue = typeForValue;
  var DuckDBType_1 = require_DuckDBType();
  var values_1 = require_values();
  function typeForValue(value) {
    if (value === null) {
      return DuckDBType_1.SQLNULL;
    } else {
      switch (typeof value) {
        case "boolean":
          return DuckDBType_1.BOOLEAN;
        case "number":
          if (Math.round(value) === value) {
            return DuckDBType_1.INTEGER;
          } else {
            return DuckDBType_1.DOUBLE;
          }
        case "bigint":
          return DuckDBType_1.HUGEINT;
        case "string":
          return DuckDBType_1.VARCHAR;
        case "object":
          if (value instanceof values_1.DuckDBArrayValue) {
            return (0, DuckDBType_1.ARRAY)(typeForValue(value.items[0]), value.items.length);
          } else if (value instanceof values_1.DuckDBBitValue) {
            return DuckDBType_1.BIT;
          } else if (value instanceof values_1.DuckDBBlobValue) {
            return DuckDBType_1.BLOB;
          } else if (value instanceof values_1.DuckDBDateValue) {
            return DuckDBType_1.DATE;
          } else if (value instanceof values_1.DuckDBDecimalValue) {
            return (0, DuckDBType_1.DECIMAL)(value.width, value.scale);
          } else if (value instanceof values_1.DuckDBIntervalValue) {
            return DuckDBType_1.INTERVAL;
          } else if (value instanceof values_1.DuckDBListValue) {
            return (0, DuckDBType_1.LIST)(typeForValue(value.items[0]));
          } else if (value instanceof values_1.DuckDBMapValue) {
            return (0, DuckDBType_1.MAP)(typeForValue(value.entries[0].key), typeForValue(value.entries[0].value));
          } else if (value instanceof values_1.DuckDBStructValue) {
            const entryTypes = {};
            for (const key in value.entries) {
              entryTypes[key] = typeForValue(value.entries[key]);
            }
            return (0, DuckDBType_1.STRUCT)(entryTypes);
          } else if (value instanceof values_1.DuckDBTimestampMillisecondsValue) {
            return DuckDBType_1.TIMESTAMP_MS;
          } else if (value instanceof values_1.DuckDBTimestampNanosecondsValue) {
            return DuckDBType_1.TIMESTAMP_NS;
          } else if (value instanceof values_1.DuckDBTimestampSecondsValue) {
            return DuckDBType_1.TIMESTAMP_S;
          } else if (value instanceof values_1.DuckDBTimestampTZValue) {
            return DuckDBType_1.TIMESTAMPTZ;
          } else if (value instanceof values_1.DuckDBTimestampValue) {
            return DuckDBType_1.TIMESTAMP;
          } else if (value instanceof values_1.DuckDBTimeTZValue) {
            return DuckDBType_1.TIMETZ;
          } else if (value instanceof values_1.DuckDBTimeValue) {
            return DuckDBType_1.TIME;
          } else if (value instanceof values_1.DuckDBUnionValue) {
            return (0, DuckDBType_1.UNION)({ [value.tag]: typeForValue(value.value) });
          } else if (value instanceof values_1.DuckDBUUIDValue) {
            return DuckDBType_1.UUID;
          }
          break;
      }
    }
    return DuckDBType_1.ANY;
  }
});

// node_modules/@duckdb/node-api/lib/DuckDBAppender.js
var require_DuckDBAppender = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBAppender = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var createValue_1 = require_createValue();
  var DuckDBLogicalType_1 = require_DuckDBLogicalType();
  var DuckDBType_1 = require_DuckDBType();
  var typeForValue_1 = require_typeForValue();
  var values_1 = require_values();

  class DuckDBAppender {
    appender;
    constructor(appender) {
      this.appender = appender;
    }
    closeSync() {
      node_bindings_1.default.appender_close_sync(this.appender);
    }
    flushSync() {
      node_bindings_1.default.appender_flush_sync(this.appender);
    }
    get columnCount() {
      return node_bindings_1.default.appender_column_count(this.appender);
    }
    columnType(columnIndex) {
      return DuckDBLogicalType_1.DuckDBLogicalType.create(node_bindings_1.default.appender_column_type(this.appender, columnIndex)).asType();
    }
    endRow() {
      node_bindings_1.default.appender_end_row(this.appender);
    }
    appendDefault() {
      node_bindings_1.default.append_default(this.appender);
    }
    appendBoolean(value) {
      node_bindings_1.default.append_bool(this.appender, value);
    }
    appendTinyInt(value) {
      node_bindings_1.default.append_int8(this.appender, value);
    }
    appendSmallInt(value) {
      node_bindings_1.default.append_int16(this.appender, value);
    }
    appendInteger(value) {
      node_bindings_1.default.append_int32(this.appender, value);
    }
    appendBigInt(value) {
      node_bindings_1.default.append_int64(this.appender, value);
    }
    appendHugeInt(value) {
      node_bindings_1.default.append_hugeint(this.appender, value);
    }
    appendUTinyInt(value) {
      node_bindings_1.default.append_uint8(this.appender, value);
    }
    appendUSmallInt(value) {
      node_bindings_1.default.append_uint16(this.appender, value);
    }
    appendUInteger(value) {
      node_bindings_1.default.append_uint32(this.appender, value);
    }
    appendUBigInt(value) {
      node_bindings_1.default.append_uint64(this.appender, value);
    }
    appendUHugeInt(value) {
      node_bindings_1.default.append_uhugeint(this.appender, value);
    }
    appendDecimal(value) {
      this.appendValue(value, (0, DuckDBType_1.DECIMAL)(value.width, value.scale));
    }
    appendFloat(value) {
      node_bindings_1.default.append_float(this.appender, value);
    }
    appendDouble(value) {
      node_bindings_1.default.append_double(this.appender, value);
    }
    appendDate(value) {
      node_bindings_1.default.append_date(this.appender, value);
    }
    appendTime(value) {
      node_bindings_1.default.append_time(this.appender, value);
    }
    appendTimeTZ(value) {
      this.appendValue(value, DuckDBType_1.TIMETZ);
    }
    appendTimestamp(value) {
      node_bindings_1.default.append_timestamp(this.appender, value);
    }
    appendTimestampTZ(value) {
      this.appendValue(value, DuckDBType_1.TIMESTAMPTZ);
    }
    appendTimestampSeconds(value) {
      this.appendValue(value, DuckDBType_1.TIMESTAMP_S);
    }
    appendTimestampMilliseconds(value) {
      this.appendValue(value, DuckDBType_1.TIMESTAMP_MS);
    }
    appendTimestampNanoseconds(value) {
      this.appendValue(value, DuckDBType_1.TIMESTAMP_NS);
    }
    appendInterval(value) {
      node_bindings_1.default.append_interval(this.appender, value);
    }
    appendVarchar(value) {
      node_bindings_1.default.append_varchar(this.appender, value);
    }
    appendBlob(value) {
      node_bindings_1.default.append_blob(this.appender, value);
    }
    appendEnum(value, type) {
      this.appendValue(value, type);
    }
    appendList(value, type) {
      this.appendValue(value instanceof values_1.DuckDBListValue ? value : (0, values_1.listValue)(value), type);
    }
    appendStruct(value, type) {
      this.appendValue(value instanceof values_1.DuckDBStructValue ? value : (0, values_1.structValue)(value), type);
    }
    appendMap(value, type) {
      this.appendValue(value, type);
    }
    appendArray(value, type) {
      this.appendValue(value instanceof values_1.DuckDBArrayValue ? value : (0, values_1.arrayValue)(value), type);
    }
    appendUnion(value, type) {
      this.appendValue(value, type);
    }
    appendUUID(value) {
      this.appendValue(value, DuckDBType_1.UUID);
    }
    appendBit(value) {
      this.appendValue(value, DuckDBType_1.BIT);
    }
    appendBigNum(value) {
      this.appendValue(value, DuckDBType_1.BIGNUM);
    }
    appendNull() {
      node_bindings_1.default.append_null(this.appender);
    }
    appendValue(value, type) {
      node_bindings_1.default.append_value(this.appender, (0, createValue_1.createValue)(type ? type : (0, typeForValue_1.typeForValue)(value), value));
    }
    appendDataChunk(dataChunk) {
      node_bindings_1.default.append_data_chunk(this.appender, dataChunk.chunk);
    }
  }
  exports.DuckDBAppender = DuckDBAppender;
});

// node_modules/@duckdb/node-api/lib/DuckDBVector.js
var require_DuckDBVector = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBBigNumVector = exports.DuckDBTimestampTZVector = exports.DuckDBTimeTZVector = exports.DuckDBBitVector = exports.DuckDBUnionVector = exports.DuckDBUUIDVector = exports.DuckDBArrayVector = exports.DuckDBMapVector = exports.DuckDBStructVector = exports.DuckDBListVector = exports.DuckDBEnum32Vector = exports.DuckDBEnum16Vector = exports.DuckDBEnum8Vector = exports.DuckDBTimestampNanosecondsVector = exports.DuckDBTimestampMillisecondsVector = exports.DuckDBTimestampSecondsVector = exports.DuckDBDecimal128Vector = exports.DuckDBDecimal64Vector = exports.DuckDBDecimal32Vector = exports.DuckDBDecimal16Vector = exports.DuckDBBlobVector = exports.DuckDBVarCharVector = exports.DuckDBUHugeIntVector = exports.DuckDBHugeIntVector = exports.DuckDBIntervalVector = exports.DuckDBTimeVector = exports.DuckDBDateVector = exports.DuckDBTimestampVector = exports.DuckDBDoubleVector = exports.DuckDBFloatVector = exports.DuckDBUBigIntVector = exports.DuckDBUIntegerVector = exports.DuckDBUSmallIntVector = exports.DuckDBUTinyIntVector = exports.DuckDBBigIntVector = exports.DuckDBIntegerVector = exports.DuckDBSmallIntVector = exports.DuckDBTinyIntVector = exports.DuckDBBooleanVector = exports.DuckDBVector = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var os_1 = __importDefault(__require("os"));
  var DuckDBLogicalType_1 = require_DuckDBLogicalType();
  var DuckDBType_1 = require_DuckDBType();
  var DuckDBTypeId_1 = require_DuckDBTypeId();
  var values_1 = require_values();
  var littleEndian = os_1.default.endianness() === "LE";
  function getUInt8(dataView, offset) {
    return dataView.getUint8(offset);
  }
  function getInt16(dataView, offset) {
    return dataView.getInt16(offset, littleEndian);
  }
  function getUInt16(dataView, offset) {
    return dataView.getUint16(offset, littleEndian);
  }
  function getInt32(dataView, offset) {
    return dataView.getInt32(offset, littleEndian);
  }
  function getUInt32(dataView, offset) {
    return dataView.getUint32(offset, littleEndian);
  }
  function getInt64(dataView, offset) {
    return dataView.getBigInt64(offset, littleEndian);
  }
  function getUInt64(dataView, offset) {
    return dataView.getBigUint64(offset, littleEndian);
  }
  function getInt128(dataView, offset) {
    const lower = getUInt64(dataView, offset);
    const upper = getInt64(dataView, offset + 8);
    return (upper << BigInt(64)) + lower;
  }
  function getUInt128(dataView, offset) {
    const lower = getUInt64(dataView, offset);
    const upper = getUInt64(dataView, offset + 8);
    return BigInt.asUintN(64, upper) << BigInt(64) | BigInt.asUintN(64, lower);
  }
  function getStringBytes(dataView, offset) {
    const lengthInBytes = dataView.getUint32(offset, true);
    if (lengthInBytes <= 12) {
      return new Uint8Array(dataView.buffer, dataView.byteOffset + offset + 4, lengthInBytes);
    } else {
      return node_bindings_1.default.get_data_from_pointer(dataView.buffer, dataView.byteOffset + offset + 8, lengthInBytes);
    }
  }
  var textDecoder = new TextDecoder;
  function getString(dataView, offset) {
    const stringBytes = getStringBytes(dataView, offset);
    return textDecoder.decode(stringBytes);
  }
  function getBuffer(dataView, offset) {
    const stringBytes = getStringBytes(dataView, offset);
    return Buffer.from(stringBytes);
  }
  function getBigNumFromBytes(bytes) {
    const firstByte = bytes[0];
    const positive = (firstByte & 128) > 0;
    const uint64Mask = positive ? 0n : 0xffffffffffffffffn;
    const uint8Mask = positive ? 0 : 255;
    const dv = new DataView(bytes.buffer, bytes.byteOffset + 3, bytes.byteLength - 3);
    const lastUint64Offset = dv.byteLength - 8;
    let offset = 0;
    let result = 0n;
    while (offset <= lastUint64Offset) {
      result = result << 64n | dv.getBigUint64(offset) ^ uint64Mask;
      offset += 8;
    }
    while (offset < dv.byteLength) {
      result = result << 8n | BigInt(dv.getUint8(offset) ^ uint8Mask);
      offset += 1;
    }
    return positive ? result : -result;
  }
  function getBytesFromBigNum(bignum) {
    const numberBytes = [];
    const negative = bignum < 0;
    if (bignum === 0n) {
      numberBytes.push(0);
    } else {
      let vi = bignum < 0 ? -bignum : bignum;
      while (vi !== 0n) {
        numberBytes.push(Number(BigInt.asUintN(8, vi)));
        vi >>= 8n;
      }
    }
    const bigNumBytes = new Uint8Array(3 + numberBytes.length);
    let header = 8388608 | numberBytes.length;
    if (negative) {
      header = ~header;
    }
    bigNumBytes[0] = 255 & header >> 16;
    bigNumBytes[1] = 255 & header >> 8;
    bigNumBytes[2] = 255 & header;
    for (let i = 0;i < numberBytes.length; i++) {
      const byte = numberBytes[numberBytes.length - 1 - i];
      bigNumBytes[3 + i] = negative ? ~byte : byte;
    }
    return bigNumBytes;
  }
  function getBoolean1(dataView, offset) {
    return getUInt8(dataView, offset) !== 0;
  }
  function getBoolean2(dataView, offset) {
    return getUInt16(dataView, offset) !== 0;
  }
  function getBoolean4(dataView, offset) {
    return getUInt32(dataView, offset) !== 0;
  }
  function getBoolean8(dataView, offset) {
    return getUInt64(dataView, offset) !== BigInt(0);
  }
  function makeGetBoolean() {
    switch (node_bindings_1.default.sizeof_bool) {
      case 1:
        return getBoolean1;
      case 2:
        return getBoolean2;
      case 4:
        return getBoolean4;
      case 8:
        return getBoolean8;
      default:
        throw new Error(`Unsupported boolean size: ${node_bindings_1.default.sizeof_bool}`);
    }
  }
  var getBoolean = makeGetBoolean();
  function setUInt8(dataView, offset, value) {
    dataView.setUint8(offset, value);
  }
  function setInt16(dataView, offset, value) {
    dataView.setInt16(offset, value, littleEndian);
  }
  function setUInt16(dataView, offset, value) {
    dataView.setUint16(offset, value, littleEndian);
  }
  function setInt32(dataView, offset, value) {
    dataView.setInt32(offset, value, littleEndian);
  }
  function setUInt32(dataView, offset, value) {
    dataView.setUint32(offset, value, littleEndian);
  }
  function setInt64(dataView, offset, value) {
    dataView.setBigInt64(offset, value, littleEndian);
  }
  function setUInt64(dataView, offset, value) {
    dataView.setBigUint64(offset, value, littleEndian);
  }
  function setInt128(dataView, offset, value) {
    const lower = BigInt.asUintN(64, value);
    const upper = BigInt.asIntN(64, value >> BigInt(64));
    dataView.setBigUint64(offset, lower, littleEndian);
    dataView.setBigInt64(offset + 8, upper, littleEndian);
  }
  function setUInt128(dataView, offset, value) {
    const lower = BigInt.asUintN(64, value);
    const upper = BigInt.asUintN(64, value >> BigInt(64));
    dataView.setBigUint64(offset, lower, littleEndian);
    dataView.setBigUint64(offset + 8, upper, littleEndian);
  }
  function setBoolean1(dataView, offset, value) {
    setUInt8(dataView, offset, value ? 1 : 0);
  }
  function setBoolean2(dataView, offset, value) {
    setUInt16(dataView, offset, value ? 1 : 0);
  }
  function setBoolean4(dataView, offset, value) {
    setUInt32(dataView, offset, value ? 1 : 0);
  }
  function setBoolean8(dataView, offset, value) {
    setUInt64(dataView, offset, value ? BigInt(1) : BigInt(0));
  }
  function makeSetBoolean() {
    switch (node_bindings_1.default.sizeof_bool) {
      case 1:
        return setBoolean1;
      case 2:
        return setBoolean2;
      case 4:
        return setBoolean4;
      case 8:
        return setBoolean8;
      default:
        throw new Error(`Unsupported boolean size: ${node_bindings_1.default.sizeof_bool}`);
    }
  }
  var setBoolean = makeSetBoolean();
  function getDecimal16(dataView, offset, type) {
    const value = getInt16(dataView, offset);
    return new values_1.DuckDBDecimalValue(BigInt(value), type.width, type.scale);
  }
  function getDecimal32(dataView, offset, type) {
    const value = getInt32(dataView, offset);
    return new values_1.DuckDBDecimalValue(BigInt(value), type.width, type.scale);
  }
  function getDecimal64(dataView, offset, type) {
    const value = getInt64(dataView, offset);
    return new values_1.DuckDBDecimalValue(value, type.width, type.scale);
  }
  function getDecimal128(dataView, offset, type) {
    const value = getInt128(dataView, offset);
    return new values_1.DuckDBDecimalValue(value, type.width, type.scale);
  }
  function vectorData(vector, byteCount) {
    return node_bindings_1.default.vector_get_data(vector, byteCount);
  }

  class DuckDBValidity {
    data;
    offset;
    itemCount;
    constructor(data, offset, itemCount) {
      this.data = data;
      this.offset = offset;
      this.itemCount = itemCount;
    }
    static fromVector(vector, itemCount) {
      const uint64Count = Math.ceil(itemCount / 64);
      const bytes = node_bindings_1.default.vector_get_validity(vector, uint64Count * 8);
      if (!bytes) {
        return new DuckDBValidity(null, 0, itemCount);
      }
      const bigints = new BigUint64Array(bytes.buffer, bytes.byteOffset, uint64Count);
      return new DuckDBValidity(bigints, 0, itemCount);
    }
    itemValid(itemIndex) {
      if (!this.data) {
        return true;
      }
      const bit = this.offset + itemIndex;
      return (this.data[Math.floor(bit / 64)] & BigInt(1) << BigInt(bit % 64)) !== BigInt(0);
    }
    setItemValid(itemIndex, valid) {
      if (!this.data && !valid) {
        const uint64Count = Math.ceil(this.itemCount / 64);
        const buffer = new ArrayBuffer(uint64Count * 8);
        this.data = new BigUint64Array(buffer, 0, uint64Count);
        for (let i = 0;i < this.data.length; i++) {
          this.data[i] = 0xffffffffffffffffn;
        }
      }
      if (this.data) {
        const bit = this.offset + itemIndex;
        const uint64Index = Math.floor(bit / 64);
        const uint64WithBitSet = BigInt(1) << BigInt(bit % 64);
        if (valid) {
          if ((this.data[uint64Index] & uint64WithBitSet) === 0n) {
            this.data[uint64Index] |= uint64WithBitSet;
          }
        } else {
          if ((this.data[uint64Index] & uint64WithBitSet) !== 0n) {
            this.data[uint64Index] &= ~uint64WithBitSet;
          }
        }
      }
    }
    flush(vector) {
      if (this.data) {
        node_bindings_1.default.vector_ensure_validity_writable(vector);
        node_bindings_1.default.copy_data_to_vector_validity(vector, 0, this.data.buffer, this.data.byteOffset, this.data.byteLength);
      }
    }
    slice(offset, itemCount) {
      return new DuckDBValidity(this.data, this.offset + offset, itemCount);
    }
  }

  class DuckDBVector {
    static standardSize() {
      return node_bindings_1.default.vector_size();
    }
    static create(vector, itemCount, knownType) {
      const vectorType = knownType ? knownType : DuckDBLogicalType_1.DuckDBLogicalType.create(node_bindings_1.default.vector_get_column_type(vector)).asType();
      switch (vectorType.typeId) {
        case DuckDBTypeId_1.DuckDBTypeId.BOOLEAN:
          return DuckDBBooleanVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TINYINT:
          return DuckDBTinyIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.SMALLINT:
          return DuckDBSmallIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.INTEGER:
          return DuckDBIntegerVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.BIGINT:
          return DuckDBBigIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.UTINYINT:
          return DuckDBUTinyIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.USMALLINT:
          return DuckDBUSmallIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.UINTEGER:
          return DuckDBUIntegerVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.UBIGINT:
          return DuckDBUBigIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.FLOAT:
          return DuckDBFloatVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.DOUBLE:
          return DuckDBDoubleVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP:
          return DuckDBTimestampVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.DATE:
          return DuckDBDateVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TIME:
          return DuckDBTimeVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.INTERVAL:
          return DuckDBIntervalVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.HUGEINT:
          return DuckDBHugeIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.UHUGEINT:
          return DuckDBUHugeIntVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.VARCHAR:
          return DuckDBVarCharVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.BLOB:
          return DuckDBBlobVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.DECIMAL:
          if (vectorType instanceof DuckDBType_1.DuckDBDecimalType) {
            const { width } = vectorType;
            if (width <= 0) {
              throw new Error(`DECIMAL width not positive: ${width}`);
            } else if (width <= 4) {
              return DuckDBDecimal16Vector.fromRawVector(vectorType, vector, itemCount);
            } else if (width <= 9) {
              return DuckDBDecimal32Vector.fromRawVector(vectorType, vector, itemCount);
            } else if (width <= 18) {
              return DuckDBDecimal64Vector.fromRawVector(vectorType, vector, itemCount);
            } else if (width <= 38) {
              return DuckDBDecimal128Vector.fromRawVector(vectorType, vector, itemCount);
            } else {
              throw new Error(`DECIMAL width too large: ${width}`);
            }
          }
          throw new Error("DuckDBType has DECIMAL type id but is not an instance of DuckDBDecimalType");
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_S:
          return DuckDBTimestampSecondsVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_MS:
          return DuckDBTimestampMillisecondsVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_NS:
          return DuckDBTimestampNanosecondsVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.ENUM:
          if (vectorType instanceof DuckDBType_1.DuckDBEnumType) {
            const { internalTypeId } = vectorType;
            switch (internalTypeId) {
              case DuckDBTypeId_1.DuckDBTypeId.UTINYINT:
                return DuckDBEnum8Vector.fromRawVector(vectorType, vector, itemCount);
              case DuckDBTypeId_1.DuckDBTypeId.USMALLINT:
                return DuckDBEnum16Vector.fromRawVector(vectorType, vector, itemCount);
              case DuckDBTypeId_1.DuckDBTypeId.UINTEGER:
                return DuckDBEnum32Vector.fromRawVector(vectorType, vector, itemCount);
              default:
                throw new Error(`unsupported ENUM internal type: ${internalTypeId}`);
            }
          }
          throw new Error("DuckDBType has ENUM type id but is not an instance of DuckDBEnumType");
        case DuckDBTypeId_1.DuckDBTypeId.LIST:
          if (vectorType instanceof DuckDBType_1.DuckDBListType) {
            return DuckDBListVector.fromRawVector(vectorType, vector, itemCount);
          }
          throw new Error("DuckDBType has LIST type id but is not an instance of DuckDBListType");
        case DuckDBTypeId_1.DuckDBTypeId.STRUCT:
          if (vectorType instanceof DuckDBType_1.DuckDBStructType) {
            return DuckDBStructVector.fromRawVector(vectorType, vector, itemCount);
          }
          throw new Error("DuckDBType has STRUCT type id but is not an instance of DuckDBStructType");
        case DuckDBTypeId_1.DuckDBTypeId.MAP:
          if (vectorType instanceof DuckDBType_1.DuckDBMapType) {
            return DuckDBMapVector.fromRawVector(vectorType, vector, itemCount);
          }
          throw new Error("DuckDBType has MAP type id but is not an instance of DuckDBMapType");
        case DuckDBTypeId_1.DuckDBTypeId.ARRAY:
          if (vectorType instanceof DuckDBType_1.DuckDBArrayType) {
            return DuckDBArrayVector.fromRawVector(vectorType, vector, itemCount);
          }
          throw new Error("DuckDBType has ARRAY type id but is not an instance of DuckDBArrayType");
        case DuckDBTypeId_1.DuckDBTypeId.UUID:
          return DuckDBUUIDVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.UNION:
          if (vectorType instanceof DuckDBType_1.DuckDBUnionType) {
            return DuckDBUnionVector.fromRawVector(vectorType, vector, itemCount);
          }
          throw new Error("DuckDBType has UNION type id but is not an instance of DuckDBUnionType");
        case DuckDBTypeId_1.DuckDBTypeId.BIT:
          return DuckDBBitVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TIME_TZ:
          return DuckDBTimeTZVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_TZ:
          return DuckDBTimestampTZVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.ANY:
          throw new Error(`Invalid vector type: ANY`);
        case DuckDBTypeId_1.DuckDBTypeId.BIGNUM:
          return DuckDBBigNumVector.fromRawVector(vector, itemCount);
        case DuckDBTypeId_1.DuckDBTypeId.SQLNULL:
          throw new Error(`Invalid vector type: SQLNULL`);
        default:
          throw new Error(`Invalid type id: ${vectorType.typeId}`);
      }
    }
    toArray() {
      const items = [];
      for (let i = 0;i < this.itemCount; i++) {
        items.push(this.getItem(i));
      }
      return items;
    }
  }
  exports.DuckDBVector = DuckDBVector;

  class DuckDBBooleanVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(dataView, validity, vector, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * node_bindings_1.default.sizeof_bool);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBBooleanVector(dataView, validity, vector, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBBooleanType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getBoolean(this.dataView, itemIndex * node_bindings_1.default.sizeof_bool) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setBoolean(this.dataView, itemIndex * node_bindings_1.default.sizeof_bool, value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBBooleanVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * node_bindings_1.default.sizeof_bool, length * node_bindings_1.default.sizeof_bool), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBBooleanVector = DuckDBBooleanVector;

  class DuckDBTinyIntVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Int8Array.BYTES_PER_ELEMENT);
      const items = new Int8Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTinyIntVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTinyIntType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTinyIntVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTinyIntVector = DuckDBTinyIntVector;

  class DuckDBSmallIntVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Int16Array.BYTES_PER_ELEMENT);
      const items = new Int16Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBSmallIntVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBSmallIntType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBSmallIntVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBSmallIntVector = DuckDBSmallIntVector;

  class DuckDBIntegerVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Int32Array.BYTES_PER_ELEMENT);
      const items = new Int32Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBIntegerVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBIntegerType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBIntegerVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBIntegerVector = DuckDBIntegerVector;

  class DuckDBBigIntVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBBigIntVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBBigIntType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBBigIntVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBBigIntVector = DuckDBBigIntVector;

  class DuckDBUTinyIntVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Uint8Array.BYTES_PER_ELEMENT);
      const items = new Uint8Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBUTinyIntVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBUTinyIntType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBUTinyIntVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBUTinyIntVector = DuckDBUTinyIntVector;

  class DuckDBUSmallIntVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Uint16Array.BYTES_PER_ELEMENT);
      const items = new Uint16Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBUSmallIntVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBUSmallIntType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBUSmallIntVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBUSmallIntVector = DuckDBUSmallIntVector;

  class DuckDBUIntegerVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Uint32Array.BYTES_PER_ELEMENT);
      const items = new Uint32Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBUIntegerVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBUIntegerType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBUIntegerVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBUIntegerVector = DuckDBUIntegerVector;

  class DuckDBUBigIntVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigUint64Array.BYTES_PER_ELEMENT);
      const items = new BigUint64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBUBigIntVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBUBigIntType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBUBigIntVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBUBigIntVector = DuckDBUBigIntVector;

  class DuckDBFloatVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Float32Array.BYTES_PER_ELEMENT);
      const items = new Float32Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBFloatVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBFloatType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBFloatVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBFloatVector = DuckDBFloatVector;

  class DuckDBDoubleVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Float64Array.BYTES_PER_ELEMENT);
      const items = new Float64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBDoubleVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBDoubleType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.items[itemIndex] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBDoubleVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBDoubleVector = DuckDBDoubleVector;

  class DuckDBTimestampVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimestampVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimestampType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBTimestampValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.micros;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimestampVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimestampVector = DuckDBTimestampVector;

  class DuckDBDateVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * Int32Array.BYTES_PER_ELEMENT);
      const items = new Int32Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBDateVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBDateType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBDateValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.days;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBDateVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBDateVector = DuckDBDateVector;

  class DuckDBTimeVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimeVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimeType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBTimeValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.micros;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimeVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimeVector = DuckDBTimeVector;

  class DuckDBIntervalVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(dataView, validity, vector, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBIntervalVector(dataView, validity, vector, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBIntervalType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      const itemStart = itemIndex * 16;
      const months = getInt32(this.dataView, itemStart);
      const days = getInt32(this.dataView, itemStart + 4);
      const micros = getInt64(this.dataView, itemStart + 8);
      return new values_1.DuckDBIntervalValue(months, days, micros);
    }
    setItem(itemIndex, value) {
      if (value != null) {
        const itemStart = itemIndex * 16;
        setInt32(this.dataView, itemStart, value.months);
        setInt32(this.dataView, itemStart + 4, value.days);
        setInt64(this.dataView, itemStart + 8, value.micros);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBIntervalVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBIntervalVector = DuckDBIntervalVector;

  class DuckDBHugeIntVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(dataView, validity, vector, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBHugeIntVector(dataView, validity, vector, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBHugeIntType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getInt128(this.dataView, itemIndex * 16) : null;
    }
    getDouble(itemIndex) {
      return this.validity.itemValid(itemIndex) ? node_bindings_1.default.hugeint_to_double(getInt128(this.dataView, itemIndex * 16)) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setInt128(this.dataView, itemIndex * 16, value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBHugeIntVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBHugeIntVector = DuckDBHugeIntVector;

  class DuckDBUHugeIntVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(dataView, validity, vector, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBUHugeIntVector(dataView, validity, vector, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBUHugeIntType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getUInt128(this.dataView, itemIndex * 16) : null;
    }
    getDouble(itemIndex) {
      return this.validity.itemValid(itemIndex) ? node_bindings_1.default.uhugeint_to_double(getUInt128(this.dataView, itemIndex * 16)) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setUInt128(this.dataView, itemIndex * 16, value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBUHugeIntVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBUHugeIntVector = DuckDBUHugeIntVector;

  class DuckDBVarCharVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    itemOffset;
    _itemCount;
    itemCache;
    itemCacheDirty;
    constructor(dataView, validity, vector, itemOffset, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this.itemOffset = itemOffset;
      this._itemCount = itemCount;
      this.itemCache = [];
      this.itemCacheDirty = [];
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBVarCharVector(dataView, validity, vector, 0, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBVarCharType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      const cachedItem = this.itemCache[itemIndex];
      if (cachedItem !== undefined) {
        return cachedItem;
      }
      const item = this.validity.itemValid(itemIndex) ? getString(this.dataView, itemIndex * 16) : null;
      this.itemCache[itemIndex] = item;
      return item;
    }
    setItem(itemIndex, value) {
      this.itemCache[itemIndex] = value;
      this.validity.setItemValid(itemIndex, value != null);
      this.itemCacheDirty[itemIndex] = true;
    }
    flush() {
      for (let itemIndex = 0;itemIndex < this._itemCount; itemIndex++) {
        if (this.itemCacheDirty[itemIndex]) {
          const cachedItem = this.itemCache[itemIndex];
          if (cachedItem !== undefined && cachedItem !== null) {
            node_bindings_1.default.vector_assign_string_element(this.vector, this.itemOffset + itemIndex, cachedItem);
          }
          this.itemCacheDirty[itemIndex] = false;
        }
      }
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBVarCharVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, offset, length);
    }
  }
  exports.DuckDBVarCharVector = DuckDBVarCharVector;

  class DuckDBBlobVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    itemOffset;
    _itemCount;
    itemCache;
    itemCacheDirty;
    constructor(dataView, validity, vector, itemOffset, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this.itemOffset = itemOffset;
      this._itemCount = itemCount;
      this.itemCache = [];
      this.itemCacheDirty = [];
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBBlobVector(dataView, validity, vector, 0, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBBlobType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBBlobValue(getBuffer(this.dataView, itemIndex * 16)) : null;
    }
    setItem(itemIndex, value) {
      this.itemCache[itemIndex] = value;
      this.validity.setItemValid(itemIndex, value != null);
      this.itemCacheDirty[itemIndex] = true;
    }
    flush() {
      for (let itemIndex = 0;itemIndex < this._itemCount; itemIndex++) {
        if (this.itemCacheDirty[itemIndex]) {
          const cachedItem = this.itemCache[itemIndex];
          if (cachedItem !== undefined && cachedItem !== null) {
            node_bindings_1.default.vector_assign_string_element_len(this.vector, this.itemOffset + itemIndex, cachedItem.bytes);
          }
          this.itemCacheDirty[itemIndex] = false;
        }
      }
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBBlobVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, offset, length);
    }
  }
  exports.DuckDBBlobVector = DuckDBBlobVector;

  class DuckDBDecimal16Vector extends DuckDBVector {
    decimalType;
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(decimalType, dataView, validity, vector, itemCount) {
      super();
      this.decimalType = decimalType;
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(decimalType, vector, itemCount) {
      const data = vectorData(vector, itemCount * 2);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBDecimal16Vector(decimalType, dataView, validity, vector, itemCount);
    }
    get type() {
      return this.decimalType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getDecimal16(this.dataView, itemIndex * 2, this.decimalType) : null;
    }
    getScaledValue(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getInt16(this.dataView, itemIndex * 2) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setInt16(this.dataView, itemIndex * 2, Number(value.value));
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBDecimal16Vector(this.decimalType, new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 2, length * 2), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBDecimal16Vector = DuckDBDecimal16Vector;

  class DuckDBDecimal32Vector extends DuckDBVector {
    decimalType;
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(decimalType, dataView, validity, vector, itemCount) {
      super();
      this.decimalType = decimalType;
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(decimalType, vector, itemCount) {
      const data = vectorData(vector, itemCount * 4);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBDecimal32Vector(decimalType, dataView, validity, vector, itemCount);
    }
    get type() {
      return this.decimalType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getDecimal32(this.dataView, itemIndex * 4, this.decimalType) : null;
    }
    getScaledValue(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getInt32(this.dataView, itemIndex * 4) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setInt32(this.dataView, itemIndex * 4, Number(value.value));
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBDecimal32Vector(this.decimalType, new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 4, length * 4), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBDecimal32Vector = DuckDBDecimal32Vector;

  class DuckDBDecimal64Vector extends DuckDBVector {
    decimalType;
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(decimalType, dataView, validity, vector, itemCount) {
      super();
      this.decimalType = decimalType;
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(decimalType, vector, itemCount) {
      const data = vectorData(vector, itemCount * 8);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBDecimal64Vector(decimalType, dataView, validity, vector, itemCount);
    }
    get type() {
      return this.decimalType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getDecimal64(this.dataView, itemIndex * 8, this.decimalType) : null;
    }
    getScaledValue(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getInt64(this.dataView, itemIndex * 8) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setInt64(this.dataView, itemIndex * 8, value.value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBDecimal64Vector(this.decimalType, new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 8, length * 8), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBDecimal64Vector = DuckDBDecimal64Vector;

  class DuckDBDecimal128Vector extends DuckDBVector {
    decimalType;
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(decimalType, dataView, validity, vector, itemCount) {
      super();
      this.decimalType = decimalType;
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(decimalType, vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBDecimal128Vector(decimalType, dataView, validity, vector, itemCount);
    }
    get type() {
      return this.decimalType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getDecimal128(this.dataView, itemIndex * 16, this.decimalType) : null;
    }
    getScaledValue(itemIndex) {
      return this.validity.itemValid(itemIndex) ? getInt128(this.dataView, itemIndex * 16) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setInt128(this.dataView, itemIndex * 16, value.value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBDecimal128Vector(this.decimalType, new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBDecimal128Vector = DuckDBDecimal128Vector;

  class DuckDBTimestampSecondsVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimestampSecondsVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimestampSecondsType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBTimestampSecondsValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.seconds;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimestampSecondsVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimestampSecondsVector = DuckDBTimestampSecondsVector;

  class DuckDBTimestampMillisecondsVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimestampMillisecondsVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimestampMillisecondsType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBTimestampMillisecondsValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.millis;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimestampMillisecondsVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimestampMillisecondsVector = DuckDBTimestampMillisecondsVector;

  class DuckDBTimestampNanosecondsVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimestampNanosecondsVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimestampNanosecondsType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBTimestampNanosecondsValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.nanos;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimestampNanosecondsVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimestampNanosecondsVector = DuckDBTimestampNanosecondsVector;

  class DuckDBEnum8Vector extends DuckDBVector {
    enumType;
    items;
    validity;
    vector;
    constructor(enumType, items, validity, vector) {
      super();
      this.enumType = enumType;
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(enumType, vector, itemCount) {
      const data = vectorData(vector, itemCount);
      const items = new Uint8Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBEnum8Vector(enumType, items, validity, vector);
    }
    get type() {
      return this.enumType;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.enumType.values[this.items[itemIndex]] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = this.enumType.indexForValue(value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBEnum8Vector(this.enumType, this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBEnum8Vector = DuckDBEnum8Vector;

  class DuckDBEnum16Vector extends DuckDBVector {
    enumType;
    items;
    validity;
    vector;
    constructor(enumType, items, validity, vector) {
      super();
      this.enumType = enumType;
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(enumType, vector, itemCount) {
      const data = vectorData(vector, itemCount * 2);
      const items = new Uint16Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBEnum16Vector(enumType, items, validity, vector);
    }
    get type() {
      return this.enumType;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.enumType.values[this.items[itemIndex]] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = this.enumType.indexForValue(value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBEnum16Vector(this.enumType, this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBEnum16Vector = DuckDBEnum16Vector;

  class DuckDBEnum32Vector extends DuckDBVector {
    enumType;
    items;
    validity;
    vector;
    constructor(enumType, items, validity, vector) {
      super();
      this.enumType = enumType;
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(enumType, vector, itemCount) {
      const data = vectorData(vector, itemCount * 4);
      const items = new Uint32Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBEnum32Vector(enumType, items, validity, vector);
    }
    get type() {
      return this.enumType;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? this.enumType.values[this.items[itemIndex]] : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = this.enumType.indexForValue(value);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBEnum32Vector(this.enumType, this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBEnum32Vector = DuckDBEnum32Vector;

  class DuckDBListVector extends DuckDBVector {
    parentList;
    listType;
    entryData;
    validity;
    vector;
    childData;
    itemOffset;
    _itemCount;
    itemCache;
    constructor(parentList, listType, entryData, validity, vector, childData, itemOffset, itemCount) {
      super();
      this.parentList = parentList;
      this.listType = listType;
      this.entryData = entryData;
      this.validity = validity;
      this.vector = vector;
      this.childData = childData;
      this.itemOffset = itemOffset, this._itemCount = itemCount;
      this.itemCache = [];
    }
    static fromRawVector(listType, vector, itemCount) {
      const data = vectorData(vector, itemCount * BigUint64Array.BYTES_PER_ELEMENT * 2);
      const entryData = new BigUint64Array(data.buffer, data.byteOffset, itemCount * 2);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      const child_vector = node_bindings_1.default.list_vector_get_child(vector);
      const child_vector_size = node_bindings_1.default.list_vector_get_size(vector);
      const childData = DuckDBVector.create(child_vector, child_vector_size, listType.valueType);
      return new DuckDBListVector(null, listType, entryData, validity, vector, childData, 0, itemCount);
    }
    get type() {
      return this.listType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItemVector(itemIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      const entryDataStartIndex = itemIndex * 2;
      const offset = Number(this.entryData[entryDataStartIndex]);
      const length = Number(this.entryData[entryDataStartIndex + 1]);
      return this.childData.slice(offset, length);
    }
    getItem(itemIndex) {
      const cachedItem = this.itemCache[itemIndex];
      if (cachedItem !== undefined) {
        return cachedItem;
      }
      const vector = this.getItemVector(itemIndex);
      if (!vector) {
        return null;
      }
      const item = new values_1.DuckDBListValue(vector.toArray());
      this.itemCache[itemIndex] = item;
      return item;
    }
    setItem(itemIndex, value) {
      this.itemCache[itemIndex] = value;
      if (this.parentList) {
        this.parentList.setItem(this.itemOffset + itemIndex, value);
      } else {
        this.validity.setItemValid(itemIndex, value != null);
      }
    }
    flush() {
      if (this.parentList) {
        this.parentList.flush();
        for (let i = 0;i < this.itemCount; i++) {
          this.itemCache[i] = undefined;
        }
      } else {
        let totalLength = 0;
        for (let itemIndex = 0;itemIndex < this._itemCount; itemIndex++) {
          const entryDataStartIndex = itemIndex * 2;
          this.entryData[entryDataStartIndex] = BigInt(totalLength);
          const item = this.getItem(itemIndex);
          if (item) {
            this.entryData[entryDataStartIndex + 1] = BigInt(item.items.length);
            totalLength += item.items.length;
          } else {
            this.entryData[entryDataStartIndex + 1] = 0n;
          }
        }
        node_bindings_1.default.list_vector_set_size(this.vector, totalLength);
        const child_vector = node_bindings_1.default.list_vector_get_child(this.vector);
        const child_vector_size = node_bindings_1.default.list_vector_get_size(this.vector);
        this.childData = DuckDBVector.create(child_vector, child_vector_size, this.listType.valueType);
        let childItemAbsoluteIndex = 0;
        for (let listIndex = 0;listIndex < this._itemCount; listIndex++) {
          const list = this.getItem(listIndex);
          if (list) {
            for (let childItemRelativeIndex = 0;childItemRelativeIndex < list.items.length; childItemRelativeIndex++) {
              this.childData.setItem(childItemAbsoluteIndex++, list.items[childItemRelativeIndex]);
            }
          }
        }
        this.childData.flush();
        node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.entryData.buffer, this.entryData.byteOffset, this.entryData.byteLength);
        this.validity.flush(this.vector);
      }
    }
    slice(offset, length) {
      const entryDataStartIndex = offset * 2;
      return new DuckDBListVector(this, this.listType, this.entryData.slice(entryDataStartIndex, entryDataStartIndex + length * 2), this.validity.slice(offset, length), this.vector, this.childData, offset, length);
    }
  }
  exports.DuckDBListVector = DuckDBListVector;

  class DuckDBStructVector extends DuckDBVector {
    structType;
    _itemCount;
    entryVectors;
    validity;
    vector;
    constructor(structType, itemCount, entryVectors, validity, vector) {
      super();
      this.structType = structType;
      this._itemCount = itemCount;
      this.entryVectors = entryVectors;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(structType, vector, itemCount) {
      const entryCount = structType.entryCount;
      const entryVectors = [];
      for (let i = 0;i < entryCount; i++) {
        const child_vector = node_bindings_1.default.struct_vector_get_child(vector, i);
        entryVectors.push(DuckDBVector.create(child_vector, itemCount, structType.entryTypes[i]));
      }
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBStructVector(structType, itemCount, entryVectors, validity, vector);
    }
    get type() {
      return this.structType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      const entries = {};
      const entryCount = this.structType.entryCount;
      for (let i = 0;i < entryCount; i++) {
        entries[this.structType.entryNames[i]] = this.entryVectors[i].getItem(itemIndex);
      }
      return new values_1.DuckDBStructValue(entries);
    }
    getItemValue(itemIndex, entryIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      return this.entryVectors[entryIndex].getItem(itemIndex);
    }
    setItem(itemIndex, value) {
      if (value != null) {
        const entryCount = this.structType.entryCount;
        for (let i = 0;i < entryCount; i++) {
          this.entryVectors[i].setItem(itemIndex, value.entries[this.structType.entryNames[i]]);
        }
        this.validity.setItemValid(itemIndex, true);
      } else {
        const entryCount = this.structType.entryCount;
        for (let i = 0;i < entryCount; i++) {
          this.entryVectors[i].setItem(itemIndex, null);
        }
        this.validity.setItemValid(itemIndex, false);
      }
    }
    setItemValue(itemIndex, entryIndex, value) {
      return this.entryVectors[entryIndex].setItem(itemIndex, value);
    }
    flush() {
      for (const entryVector of this.entryVectors) {
        entryVector.flush();
      }
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBStructVector(this.structType, length, this.entryVectors.map((entryVector) => entryVector.slice(offset, length)), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBStructVector = DuckDBStructVector;

  class DuckDBMapVector extends DuckDBVector {
    mapType;
    listVector;
    constructor(mapType, listVector) {
      super();
      this.mapType = mapType;
      this.listVector = listVector;
    }
    static fromRawVector(mapType, vector, itemCount) {
      const listVectorType = new DuckDBType_1.DuckDBListType(new DuckDBType_1.DuckDBStructType(["key", "value"], [mapType.keyType, mapType.valueType]));
      return new DuckDBMapVector(mapType, DuckDBListVector.fromRawVector(listVectorType, vector, itemCount));
    }
    get type() {
      return this.mapType;
    }
    get itemCount() {
      return this.listVector.itemCount;
    }
    getItem(itemIndex) {
      const itemVector = this.listVector.getItemVector(itemIndex);
      if (!itemVector) {
        return null;
      }
      if (!(itemVector instanceof DuckDBStructVector)) {
        throw new Error("item in map list vector is not a struct");
      }
      const entries = [];
      const itemEntryCount = itemVector.itemCount;
      for (let i = 0;i < itemEntryCount; i++) {
        const key = itemVector.getItemValue(i, 0);
        const value = itemVector.getItemValue(i, 1);
        entries.push({ key, value });
      }
      return new values_1.DuckDBMapValue(entries);
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.listVector.setItem(itemIndex, (0, values_1.listValue)(value.entries.map((entry) => (0, values_1.structValue)({ key: entry.key, value: entry.value }))));
      } else {
        this.listVector.setItem(itemIndex, null);
      }
    }
    flush() {
      this.listVector.flush();
    }
    slice(offset, length) {
      return new DuckDBMapVector(this.mapType, this.listVector.slice(offset, length));
    }
  }
  exports.DuckDBMapVector = DuckDBMapVector;

  class DuckDBArrayVector extends DuckDBVector {
    arrayType;
    validity;
    vector;
    childData;
    _itemCount;
    constructor(arrayType, validity, vector, childData, itemCount) {
      super();
      this.arrayType = arrayType;
      this.validity = validity;
      this.vector = vector;
      this.childData = childData;
      this._itemCount = itemCount;
    }
    static fromRawVector(arrayType, vector, itemCount) {
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      const child_vector = node_bindings_1.default.array_vector_get_child(vector);
      const childItemsPerArray = DuckDBArrayVector.itemSize(arrayType) * arrayType.length;
      const childData = DuckDBVector.create(child_vector, itemCount * childItemsPerArray, arrayType.valueType);
      return new DuckDBArrayVector(arrayType, validity, vector, childData, itemCount);
    }
    static itemSize(arrayType) {
      if (arrayType.valueType instanceof DuckDBType_1.DuckDBArrayType) {
        return DuckDBArrayVector.itemSize(arrayType.valueType);
      } else {
        return 1;
      }
    }
    get type() {
      return this.arrayType;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      return new values_1.DuckDBArrayValue(this.childData.slice(itemIndex * this.arrayType.length, this.arrayType.length).toArray());
    }
    setItem(itemIndex, value) {
      if (value != null) {
        const startIndex = itemIndex * this.arrayType.length;
        for (let i = 0;i < this.arrayType.length; i++) {
          this.childData.setItem(startIndex + i, value.items[i]);
        }
        this.validity.setItemValid(itemIndex, true);
      } else {
        const startIndex = itemIndex * this.arrayType.length;
        for (let i = 0;i < this.arrayType.length; i++) {
          this.childData.setItem(startIndex + i, null);
        }
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      this.childData.flush();
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBArrayVector(this.arrayType, this.validity.slice(offset, length), this.vector, this.childData.slice(offset * this.arrayType.length, length * this.arrayType.length), length);
    }
  }
  exports.DuckDBArrayVector = DuckDBArrayVector;

  class DuckDBUUIDVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    _itemCount;
    constructor(dataView, validity, vector, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this._itemCount = itemCount;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBUUIDVector(dataView, validity, vector, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBUUIDType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? values_1.DuckDBUUIDValue.fromStoredHugeInt(getInt128(this.dataView, itemIndex * 16)) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        setInt128(this.dataView, itemIndex * 16, value.hugeint);
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.dataView.buffer, this.dataView.byteOffset, this.dataView.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBUUIDVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, length);
    }
  }
  exports.DuckDBUUIDVector = DuckDBUUIDVector;

  class DuckDBUnionVector extends DuckDBVector {
    unionType;
    structVector;
    constructor(unionType, structVector) {
      super();
      this.unionType = unionType;
      this.structVector = structVector;
    }
    static fromRawVector(unionType, vector, itemCount) {
      const entryNames = ["tag"];
      const entryTypes = [DuckDBType_1.DuckDBUTinyIntType.instance];
      const memberCount = unionType.memberCount;
      for (let i = 0;i < memberCount; i++) {
        entryNames.push(unionType.memberTags[i]);
        entryTypes.push(unionType.memberTypes[i]);
      }
      const structVectorType = new DuckDBType_1.DuckDBStructType(entryNames, entryTypes);
      return new DuckDBUnionVector(unionType, DuckDBStructVector.fromRawVector(structVectorType, vector, itemCount));
    }
    get type() {
      return this.unionType;
    }
    get itemCount() {
      return this.structVector.itemCount;
    }
    getItem(itemIndex) {
      const tagValue = this.structVector.getItemValue(itemIndex, 0);
      if (tagValue == null) {
        return null;
      }
      const memberIndex = Number(tagValue);
      const tag = this.unionType.memberTags[memberIndex];
      const entryIndex = memberIndex + 1;
      const value = this.structVector.getItemValue(itemIndex, entryIndex);
      return new values_1.DuckDBUnionValue(tag, value);
    }
    setItem(itemIndex, value) {
      if (value != null) {
        const memberIndex = this.unionType.memberIndexForTag(value.tag);
        this.structVector.setItemValue(itemIndex, 0, memberIndex);
        const entryIndex = memberIndex + 1;
        this.structVector.setItemValue(itemIndex, entryIndex, value.value);
        for (let i = 1;i <= this.unionType.memberCount; i++) {
          if (i !== entryIndex) {
            this.structVector.setItemValue(itemIndex, i, null);
          }
        }
      } else {
        for (let i = 0;i <= this.unionType.memberCount; i++) {
          this.structVector.setItemValue(itemIndex, i, null);
        }
      }
    }
    flush() {
      this.structVector.flush();
    }
    slice(offset, length) {
      return new DuckDBUnionVector(this.unionType, this.structVector.slice(offset, length));
    }
  }
  exports.DuckDBUnionVector = DuckDBUnionVector;

  class DuckDBBitVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    itemOffset;
    _itemCount;
    itemCache;
    itemCacheDirty;
    constructor(dataView, validity, vector, itemOffset, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this.itemOffset = itemOffset;
      this._itemCount = itemCount;
      this.itemCache = [];
      this.itemCacheDirty = [];
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBBitVector(dataView, validity, vector, 0, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBBitType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      const bytes = getStringBytes(this.dataView, itemIndex * 16);
      return bytes ? new values_1.DuckDBBitValue(bytes) : null;
    }
    setItem(itemIndex, value) {
      this.itemCache[itemIndex] = value;
      this.validity.setItemValid(itemIndex, value != null);
      this.itemCacheDirty[itemIndex] = true;
    }
    flush() {
      for (let itemIndex = 0;itemIndex < this._itemCount; itemIndex++) {
        if (this.itemCacheDirty[itemIndex]) {
          const cachedItem = this.itemCache[itemIndex];
          if (cachedItem !== undefined && cachedItem !== null) {
            node_bindings_1.default.vector_assign_string_element_len(this.vector, this.itemOffset + itemIndex, cachedItem.data);
          }
          this.itemCacheDirty[itemIndex] = false;
        }
      }
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBBitVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, offset, length);
    }
  }
  exports.DuckDBBitVector = DuckDBBitVector;

  class DuckDBTimeTZVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigUint64Array.BYTES_PER_ELEMENT);
      const items = new BigUint64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimeTZVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimeTZType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? values_1.DuckDBTimeTZValue.fromBits(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.bits;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimeTZVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimeTZVector = DuckDBTimeTZVector;

  class DuckDBTimestampTZVector extends DuckDBVector {
    items;
    validity;
    vector;
    constructor(items, validity, vector) {
      super();
      this.items = items;
      this.validity = validity;
      this.vector = vector;
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * BigInt64Array.BYTES_PER_ELEMENT);
      const items = new BigInt64Array(data.buffer, data.byteOffset, itemCount);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBTimestampTZVector(items, validity, vector);
    }
    get type() {
      return DuckDBType_1.DuckDBTimestampTZType.instance;
    }
    get itemCount() {
      return this.items.length;
    }
    getItem(itemIndex) {
      return this.validity.itemValid(itemIndex) ? new values_1.DuckDBTimestampTZValue(this.items[itemIndex]) : null;
    }
    setItem(itemIndex, value) {
      if (value != null) {
        this.items[itemIndex] = value.micros;
        this.validity.setItemValid(itemIndex, true);
      } else {
        this.validity.setItemValid(itemIndex, false);
      }
    }
    flush() {
      node_bindings_1.default.copy_data_to_vector(this.vector, 0, this.items.buffer, this.items.byteOffset, this.items.byteLength);
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBTimestampTZVector(this.items.slice(offset, offset + length), this.validity.slice(offset, length), this.vector);
    }
  }
  exports.DuckDBTimestampTZVector = DuckDBTimestampTZVector;

  class DuckDBBigNumVector extends DuckDBVector {
    dataView;
    validity;
    vector;
    itemOffset;
    _itemCount;
    itemCache;
    itemCacheDirty;
    constructor(dataView, validity, vector, itemOffset, itemCount) {
      super();
      this.dataView = dataView;
      this.validity = validity;
      this.vector = vector;
      this.itemOffset = itemOffset;
      this._itemCount = itemCount;
      this.itemCache = [];
      this.itemCacheDirty = [];
    }
    static fromRawVector(vector, itemCount) {
      const data = vectorData(vector, itemCount * 16);
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const validity = DuckDBValidity.fromVector(vector, itemCount);
      return new DuckDBBigNumVector(dataView, validity, vector, 0, itemCount);
    }
    get type() {
      return DuckDBType_1.DuckDBBigNumType.instance;
    }
    get itemCount() {
      return this._itemCount;
    }
    getItem(itemIndex) {
      if (!this.validity.itemValid(itemIndex)) {
        return null;
      }
      const bytes = getStringBytes(this.dataView, itemIndex * 16);
      return bytes ? getBigNumFromBytes(bytes) : null;
    }
    setItem(itemIndex, value) {
      this.itemCache[itemIndex] = value;
      this.validity.setItemValid(itemIndex, value != null);
      this.itemCacheDirty[itemIndex] = true;
    }
    flush() {
      for (let itemIndex = 0;itemIndex < this._itemCount; itemIndex++) {
        if (this.itemCacheDirty[itemIndex]) {
          const cachedItem = this.itemCache[itemIndex];
          if (cachedItem !== undefined && cachedItem !== null) {
            node_bindings_1.default.vector_assign_string_element_len(this.vector, this.itemOffset + itemIndex, getBytesFromBigNum(cachedItem));
          }
          this.itemCacheDirty[itemIndex] = false;
        }
      }
      this.validity.flush(this.vector);
    }
    slice(offset, length) {
      return new DuckDBBigNumVector(new DataView(this.dataView.buffer, this.dataView.byteOffset + offset * 16, length * 16), this.validity.slice(offset, length), this.vector, offset, length);
    }
  }
  exports.DuckDBBigNumVector = DuckDBBigNumVector;
});

// node_modules/@duckdb/node-api/lib/DuckDBDataChunk.js
var require_DuckDBDataChunk = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBDataChunk = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBVector_1 = require_DuckDBVector();

  class DuckDBDataChunk {
    chunk;
    vectors = [];
    constructor(chunk) {
      this.chunk = chunk;
    }
    static create(types, rowCount) {
      const chunk = new DuckDBDataChunk(node_bindings_1.default.create_data_chunk(types.map((t) => t.toLogicalType().logical_type)));
      if (rowCount != null) {
        chunk.rowCount = rowCount;
      }
      return chunk;
    }
    reset() {
      node_bindings_1.default.data_chunk_reset(this.chunk);
    }
    get columnCount() {
      return node_bindings_1.default.data_chunk_get_column_count(this.chunk);
    }
    get rowCount() {
      return node_bindings_1.default.data_chunk_get_size(this.chunk);
    }
    set rowCount(count) {
      const maxRowCount = node_bindings_1.default.vector_size();
      if (count > maxRowCount) {
        throw new Error(`A data chunk cannot have more than ${maxRowCount} rows`);
      }
      node_bindings_1.default.data_chunk_set_size(this.chunk, count);
    }
    getColumnVector(columnIndex) {
      if (this.vectors[columnIndex]) {
        return this.vectors[columnIndex];
      }
      const vector = DuckDBVector_1.DuckDBVector.create(node_bindings_1.default.data_chunk_get_vector(this.chunk, columnIndex), this.rowCount);
      this.vectors[columnIndex] = vector;
      return vector;
    }
    visitColumnValues(columnIndex, visitValue) {
      const vector = this.getColumnVector(columnIndex);
      const type = vector.type;
      for (let rowIndex = 0;rowIndex < vector.itemCount; rowIndex++) {
        visitValue(vector.getItem(rowIndex), rowIndex, columnIndex, type);
      }
    }
    appendColumnValues(columnIndex, values) {
      this.visitColumnValues(columnIndex, (value) => values.push(value));
    }
    getColumnValues(columnIndex) {
      const values = [];
      this.appendColumnValues(columnIndex, values);
      return values;
    }
    convertColumnValues(columnIndex, converter) {
      const convertedValues = [];
      this.visitColumnValues(columnIndex, (value, _r, _c, type) => convertedValues.push(converter(value, type, converter)));
      return convertedValues;
    }
    setColumnValues(columnIndex, values) {
      const vector = this.getColumnVector(columnIndex);
      if (vector.itemCount !== values.length) {
        throw new Error(`number of values must equal chunk row count`);
      }
      for (let i = 0;i < values.length; i++) {
        vector.setItem(i, values[i]);
      }
      vector.flush();
    }
    visitColumns(visitColumn) {
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        visitColumn(this.getColumnValues(columnIndex), columnIndex, this.getColumnVector(columnIndex).type);
      }
    }
    appendToColumns(columns) {
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        let column = columns[columnIndex];
        if (!column) {
          column = [];
          columns[columnIndex] = column;
        }
        this.appendColumnValues(columnIndex, column);
      }
    }
    getColumns() {
      const columns = [];
      this.visitColumns((column) => columns.push(column));
      return columns;
    }
    convertColumns(converter) {
      const convertedColumns = [];
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        convertedColumns.push(this.convertColumnValues(columnIndex, converter));
      }
      return convertedColumns;
    }
    setColumns(columns) {
      if (columns.length > 0) {
        this.rowCount = columns[0].length;
      }
      for (let columnIndex = 0;columnIndex < columns.length; columnIndex++) {
        this.setColumnValues(columnIndex, columns[columnIndex]);
      }
    }
    appendToColumnsObject(columnNames, columnsObject) {
      const columnCount = this.columnCount;
      if (columnNames.length !== columnCount) {
        throw new Error(`Provided number of column names (${columnNames.length}) does not match column count (${this.columnCount})`);
      }
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        const columnName = columnNames[columnIndex];
        let columnValues = columnsObject[columnName];
        if (!columnValues) {
          columnValues = [];
          columnsObject[columnName] = columnValues;
        }
        this.appendColumnValues(columnIndex, columnValues);
      }
    }
    getColumnsObject(columnNames) {
      const columnsObject = {};
      this.appendToColumnsObject(columnNames, columnsObject);
      return columnsObject;
    }
    visitColumnMajor(visitValue) {
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        this.visitColumnValues(columnIndex, visitValue);
      }
    }
    visitRowValues(rowIndex, visitValue) {
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        const vector = this.getColumnVector(columnIndex);
        visitValue(vector.getItem(rowIndex), rowIndex, columnIndex, vector.type);
      }
    }
    appendRowValues(rowIndex, values) {
      this.visitRowValues(rowIndex, (value) => values.push(value));
    }
    getRowValues(rowIndex) {
      const values = [];
      this.appendRowValues(rowIndex, values);
      return values;
    }
    convertRowValues(rowIndex, converter) {
      const convertedValues = [];
      this.visitRowValues(rowIndex, (value, _, columnIndex) => convertedValues.push(converter(value, this.getColumnVector(columnIndex).type, converter)));
      return convertedValues;
    }
    visitRows(visitRow) {
      const rowCount = this.rowCount;
      for (let rowIndex = 0;rowIndex < rowCount; rowIndex++) {
        visitRow(this.getRowValues(rowIndex), rowIndex);
      }
    }
    appendToRows(rows) {
      this.visitRows((row) => rows.push(row));
    }
    getRows() {
      const rows = [];
      this.appendToRows(rows);
      return rows;
    }
    convertRows(converter) {
      const convertedRows = [];
      const rowCount = this.rowCount;
      for (let rowIndex = 0;rowIndex < rowCount; rowIndex++) {
        convertedRows.push(this.convertRowValues(rowIndex, converter));
      }
      return convertedRows;
    }
    setRows(rows) {
      this.rowCount = rows.length;
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        const vector = this.getColumnVector(columnIndex);
        for (let rowIndex = 0;rowIndex < rows.length; rowIndex++) {
          vector.setItem(rowIndex, rows[rowIndex][columnIndex]);
        }
        vector.flush();
      }
    }
    appendToRowObjects(columnNames, rowObjects) {
      const columnCount = this.columnCount;
      if (columnNames.length !== columnCount) {
        throw new Error(`Provided number of column names (${columnNames.length}) does not match column count (${this.columnCount})`);
      }
      const rowCount = this.rowCount;
      for (let rowIndex = 0;rowIndex < rowCount; rowIndex++) {
        let rowObject = {};
        this.visitRowValues(rowIndex, (value, _, columnIndex) => {
          rowObject[columnNames[columnIndex]] = value;
        });
        rowObjects.push(rowObject);
      }
    }
    getRowObjects(columnNames) {
      const rowObjects = [];
      this.appendToRowObjects(columnNames, rowObjects);
      return rowObjects;
    }
    visitRowMajor(visitValue) {
      const rowCount = this.rowCount;
      const columnCount = this.columnCount;
      for (let rowIndex = 0;rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
          const vector = this.getColumnVector(columnIndex);
          visitValue(vector.getItem(rowIndex), rowIndex, columnIndex, vector.type);
        }
      }
    }
  }
  exports.DuckDBDataChunk = DuckDBDataChunk;
});

// node_modules/@duckdb/node-api/lib/DuckDBValueConverters.js
var require_DuckDBValueConverters = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.unsupportedConverter = unsupportedConverter;
  exports.nullConverter = nullConverter;
  exports.booleanFromValue = booleanFromValue;
  exports.numberFromValue = numberFromValue;
  exports.jsonNumberFromValue = jsonNumberFromValue;
  exports.bigintFromBigIntValue = bigintFromBigIntValue;
  exports.stringFromValue = stringFromValue;
  exports.bytesFromBlobValue = bytesFromBlobValue;
  exports.bytesFromBitValue = bytesFromBitValue;
  exports.dateFromDateValue = dateFromDateValue;
  exports.bigintFromTimeValue = bigintFromTimeValue;
  exports.dateFromTimestampValue = dateFromTimestampValue;
  exports.dateFromTimestampSecondsValue = dateFromTimestampSecondsValue;
  exports.dateFromTimestampMillisecondsValue = dateFromTimestampMillisecondsValue;
  exports.dateFromTimestampNanosecondsValue = dateFromTimestampNanosecondsValue;
  exports.objectFromTimeTZValue = objectFromTimeTZValue;
  exports.dateFromTimestampTZValue = dateFromTimestampTZValue;
  exports.objectFromIntervalValue = objectFromIntervalValue;
  exports.jsonObjectFromIntervalValue = jsonObjectFromIntervalValue;
  exports.doubleFromDecimalValue = doubleFromDecimalValue;
  exports.arrayFromListValue = arrayFromListValue;
  exports.objectFromStructValue = objectFromStructValue;
  exports.objectArrayFromMapValue = objectArrayFromMapValue;
  exports.arrayFromArrayValue = arrayFromArrayValue;
  exports.objectFromUnionValue = objectFromUnionValue;
  var DuckDBType_1 = require_DuckDBType();
  var values_1 = require_values();
  var MIN_DATE_DAYS = -1e8;
  var MAX_DATE_DAYS = 1e8;
  var MIN_DATE_MILLIS = -8640000000000000;
  var MAX_DATE_MILLIS = 8640000000000000;
  var MILLS_PER_DAY = 24 * 60 * 60 * 1000;
  function unsupportedConverter(_, type) {
    throw new Error(`Unsupported type: ${type}`);
  }
  function nullConverter(_) {
    return null;
  }
  function booleanFromValue(value) {
    return Boolean(value);
  }
  function numberFromValue(value) {
    return Number(value);
  }
  function jsonNumberFromValue(value) {
    if (Number.isFinite(value)) {
      return Number(value);
    }
    return String(value);
  }
  function bigintFromBigIntValue(value, type) {
    if (typeof value === "bigint") {
      return value;
    }
    throw new Error(`Expected bigint value for type ${type}`);
  }
  function stringFromValue(value) {
    return String(value);
  }
  function bytesFromBlobValue(value) {
    if (value instanceof values_1.DuckDBBlobValue) {
      return value.bytes;
    }
    throw new Error(`Expected DuckDBBlobValue`);
  }
  function bytesFromBitValue(value) {
    if (value instanceof values_1.DuckDBBitValue) {
      return value.data;
    }
    throw new Error(`Expected DuckDBBitValue`);
  }
  function dateFromDateValue(value) {
    if (value instanceof values_1.DuckDBDateValue) {
      if (MIN_DATE_DAYS <= value.days && value.days <= MAX_DATE_DAYS) {
        return new Date(value.days * MILLS_PER_DAY);
      }
      throw new Error(`DATE value out of range for JS Date: ${value.days} days`);
    }
    throw new Error(`Expected DuckDBDateValue`);
  }
  function bigintFromTimeValue(value) {
    if (value instanceof values_1.DuckDBTimeValue) {
      return value.micros;
    }
    throw new Error(`Expected DuckDBTimeValue`);
  }
  function dateFromTimestampValue(value) {
    if (value instanceof values_1.DuckDBTimestampValue) {
      const millis = value.micros / 1000n;
      if (MIN_DATE_MILLIS <= millis && millis <= MAX_DATE_MILLIS) {
        return new Date(Number(millis));
      }
      throw new Error(`TIMESTAMP value out of range for JS Date: ${value.micros} micros`);
    }
    throw new Error(`Expected DuckDBTimestampValue`);
  }
  function dateFromTimestampSecondsValue(value) {
    if (value instanceof values_1.DuckDBTimestampSecondsValue) {
      const millis = value.seconds * 1000n;
      if (MIN_DATE_MILLIS <= millis && millis <= MAX_DATE_MILLIS) {
        return new Date(Number(millis));
      }
      throw new Error(`TIMESTAMP_S value out of range for JS Date: ${value.seconds} seconds`);
    }
    throw new Error(`Expected DuckDBTimestampSecondsValue`);
  }
  function dateFromTimestampMillisecondsValue(value) {
    if (value instanceof values_1.DuckDBTimestampMillisecondsValue) {
      const millis = value.millis;
      if (MIN_DATE_MILLIS <= millis && millis <= MAX_DATE_MILLIS) {
        return new Date(Number(millis));
      }
      throw new Error(`TIMESTAMP_MS value out of range for JS Date: ${value.millis} millis`);
    }
    throw new Error(`Expected DuckDBTimestampMillisecondsValue`);
  }
  function dateFromTimestampNanosecondsValue(value) {
    if (value instanceof values_1.DuckDBTimestampNanosecondsValue) {
      const millis = value.nanos / 1000000n;
      if (MIN_DATE_MILLIS <= millis && millis <= MAX_DATE_MILLIS) {
        return new Date(Number(millis));
      }
      throw new Error(`TIMESTAMP_NS value out of range for JS Date: ${value.nanos} nanos`);
    }
    throw new Error(`Expected DuckDBTimestampNanosecondsValue`);
  }
  function objectFromTimeTZValue(value) {
    if (value instanceof values_1.DuckDBTimeTZValue) {
      return {
        micros: value.micros,
        offset: value.offset
      };
    }
    throw new Error(`Expected DuckDBTimeTZValue`);
  }
  function dateFromTimestampTZValue(value) {
    if (value instanceof values_1.DuckDBTimestampTZValue) {
      const millis = value.micros / 1000n;
      if (MIN_DATE_MILLIS <= millis && millis <= MAX_DATE_MILLIS) {
        return new Date(Number(millis));
      }
      throw new Error(`TIMESTAMPTZ value out of range for JS Date: ${value.micros} micros`);
    }
    throw new Error(`Expected DuckDBTimestampTZValue`);
  }
  function objectFromIntervalValue(value) {
    if (value instanceof values_1.DuckDBIntervalValue) {
      return {
        months: value.months,
        days: value.days,
        micros: value.micros
      };
    }
    throw new Error(`Expected DuckDBIntervalValue`);
  }
  function jsonObjectFromIntervalValue(value) {
    if (value instanceof values_1.DuckDBIntervalValue) {
      return {
        months: value.months,
        days: value.days,
        micros: String(value.micros)
      };
    }
    throw new Error(`Expected DuckDBIntervalValue`);
  }
  function doubleFromDecimalValue(value) {
    if (value instanceof values_1.DuckDBDecimalValue) {
      return value.toDouble();
    }
    throw new Error(`Expected DuckDBDecimalValue`);
  }
  function arrayFromListValue(value, type, converter) {
    if (value instanceof values_1.DuckDBListValue && type instanceof DuckDBType_1.DuckDBListType) {
      return value.items.map((v) => converter(v, type.valueType, converter));
    }
    throw new Error(`Expected DuckDBListValue and DuckDBListType`);
  }
  function objectFromStructValue(value, type, converter) {
    if (value instanceof values_1.DuckDBStructValue && type instanceof DuckDBType_1.DuckDBStructType) {
      const result = {};
      for (const key in value.entries) {
        result[key] = converter(value.entries[key], type.typeForEntry(key), converter);
      }
      return result;
    }
    throw new Error(`Expected DuckDBStructValue and DuckDBStructType`);
  }
  function objectArrayFromMapValue(value, type, converter) {
    if (value instanceof values_1.DuckDBMapValue && type instanceof DuckDBType_1.DuckDBMapType) {
      return value.entries.map((entry) => ({
        key: converter(entry.key, type.keyType, converter),
        value: converter(entry.value, type.valueType, converter)
      }));
    }
    throw new Error(`Expected DuckDBMapValue and DuckDBMapType`);
  }
  function arrayFromArrayValue(value, type, converter) {
    if (value instanceof values_1.DuckDBArrayValue && type instanceof DuckDBType_1.DuckDBArrayType) {
      return value.items.map((v) => converter(v, type.valueType, converter));
    }
    throw new Error(`Expected DuckDBArrayValue and DuckDBArrayType`);
  }
  function objectFromUnionValue(value, type, converter) {
    if (value instanceof values_1.DuckDBUnionValue && type instanceof DuckDBType_1.DuckDBUnionType) {
      return {
        tag: value.tag,
        value: converter(value.value, type.memberTypeForTag(value.tag), converter)
      };
    }
    throw new Error(`Expected DuckDBUnionValue and DuckDBUnionType`);
  }
});

// node_modules/@duckdb/node-api/lib/JSDuckDBValueConverter.js
var require_JSDuckDBValueConverter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.JSDuckDBValueConverter = undefined;
  var createDuckDBValueConverter_1 = require_createDuckDBValueConverter();
  var DuckDBTypeId_1 = require_DuckDBTypeId();
  var DuckDBValueConverters_1 = require_DuckDBValueConverters();
  var JSConvertersByTypeId = {
    [DuckDBTypeId_1.DuckDBTypeId.INVALID]: DuckDBValueConverters_1.unsupportedConverter,
    [DuckDBTypeId_1.DuckDBTypeId.BOOLEAN]: DuckDBValueConverters_1.booleanFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TINYINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.SMALLINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.INTEGER]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.BIGINT]: DuckDBValueConverters_1.bigintFromBigIntValue,
    [DuckDBTypeId_1.DuckDBTypeId.UTINYINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.USMALLINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UINTEGER]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UBIGINT]: DuckDBValueConverters_1.bigintFromBigIntValue,
    [DuckDBTypeId_1.DuckDBTypeId.FLOAT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.DOUBLE]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP]: DuckDBValueConverters_1.dateFromTimestampValue,
    [DuckDBTypeId_1.DuckDBTypeId.DATE]: DuckDBValueConverters_1.dateFromDateValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIME]: DuckDBValueConverters_1.bigintFromTimeValue,
    [DuckDBTypeId_1.DuckDBTypeId.INTERVAL]: DuckDBValueConverters_1.objectFromIntervalValue,
    [DuckDBTypeId_1.DuckDBTypeId.HUGEINT]: DuckDBValueConverters_1.bigintFromBigIntValue,
    [DuckDBTypeId_1.DuckDBTypeId.UHUGEINT]: DuckDBValueConverters_1.bigintFromBigIntValue,
    [DuckDBTypeId_1.DuckDBTypeId.VARCHAR]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.BLOB]: DuckDBValueConverters_1.bytesFromBlobValue,
    [DuckDBTypeId_1.DuckDBTypeId.DECIMAL]: DuckDBValueConverters_1.doubleFromDecimalValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_S]: DuckDBValueConverters_1.dateFromTimestampSecondsValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_MS]: DuckDBValueConverters_1.dateFromTimestampMillisecondsValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_NS]: DuckDBValueConverters_1.dateFromTimestampNanosecondsValue,
    [DuckDBTypeId_1.DuckDBTypeId.ENUM]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.LIST]: DuckDBValueConverters_1.arrayFromListValue,
    [DuckDBTypeId_1.DuckDBTypeId.STRUCT]: DuckDBValueConverters_1.objectFromStructValue,
    [DuckDBTypeId_1.DuckDBTypeId.MAP]: DuckDBValueConverters_1.objectArrayFromMapValue,
    [DuckDBTypeId_1.DuckDBTypeId.ARRAY]: DuckDBValueConverters_1.arrayFromArrayValue,
    [DuckDBTypeId_1.DuckDBTypeId.UUID]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UNION]: DuckDBValueConverters_1.objectFromUnionValue,
    [DuckDBTypeId_1.DuckDBTypeId.BIT]: DuckDBValueConverters_1.bytesFromBitValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIME_TZ]: DuckDBValueConverters_1.objectFromTimeTZValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_TZ]: DuckDBValueConverters_1.dateFromTimestampTZValue,
    [DuckDBTypeId_1.DuckDBTypeId.ANY]: DuckDBValueConverters_1.unsupportedConverter,
    [DuckDBTypeId_1.DuckDBTypeId.BIGNUM]: DuckDBValueConverters_1.bigintFromBigIntValue,
    [DuckDBTypeId_1.DuckDBTypeId.SQLNULL]: DuckDBValueConverters_1.nullConverter
  };
  exports.JSDuckDBValueConverter = (0, createDuckDBValueConverter_1.createDuckDBValueConverter)(JSConvertersByTypeId);
});

// node_modules/@duckdb/node-api/lib/JsonDuckDBValueConverter.js
var require_JsonDuckDBValueConverter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.JsonDuckDBValueConverter = undefined;
  var createDuckDBValueConverter_1 = require_createDuckDBValueConverter();
  var DuckDBTypeId_1 = require_DuckDBTypeId();
  var DuckDBValueConverters_1 = require_DuckDBValueConverters();
  var JsonConvertersByTypeId = {
    [DuckDBTypeId_1.DuckDBTypeId.INVALID]: DuckDBValueConverters_1.unsupportedConverter,
    [DuckDBTypeId_1.DuckDBTypeId.BOOLEAN]: DuckDBValueConverters_1.booleanFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TINYINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.SMALLINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.INTEGER]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.BIGINT]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UTINYINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.USMALLINT]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UINTEGER]: DuckDBValueConverters_1.numberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UBIGINT]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.FLOAT]: DuckDBValueConverters_1.jsonNumberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.DOUBLE]: DuckDBValueConverters_1.jsonNumberFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.DATE]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIME]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.INTERVAL]: DuckDBValueConverters_1.jsonObjectFromIntervalValue,
    [DuckDBTypeId_1.DuckDBTypeId.HUGEINT]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UHUGEINT]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.VARCHAR]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.BLOB]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.DECIMAL]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_S]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_MS]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_NS]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.ENUM]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.LIST]: DuckDBValueConverters_1.arrayFromListValue,
    [DuckDBTypeId_1.DuckDBTypeId.STRUCT]: DuckDBValueConverters_1.objectFromStructValue,
    [DuckDBTypeId_1.DuckDBTypeId.MAP]: DuckDBValueConverters_1.objectArrayFromMapValue,
    [DuckDBTypeId_1.DuckDBTypeId.ARRAY]: DuckDBValueConverters_1.arrayFromArrayValue,
    [DuckDBTypeId_1.DuckDBTypeId.UUID]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.UNION]: DuckDBValueConverters_1.objectFromUnionValue,
    [DuckDBTypeId_1.DuckDBTypeId.BIT]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIME_TZ]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.TIMESTAMP_TZ]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.ANY]: DuckDBValueConverters_1.unsupportedConverter,
    [DuckDBTypeId_1.DuckDBTypeId.BIGNUM]: DuckDBValueConverters_1.stringFromValue,
    [DuckDBTypeId_1.DuckDBTypeId.SQLNULL]: DuckDBValueConverters_1.nullConverter
  };
  exports.JsonDuckDBValueConverter = (0, createDuckDBValueConverter_1.createDuckDBValueConverter)(JsonConvertersByTypeId);
});

// node_modules/@duckdb/node-api/lib/convertColumnsFromChunks.js
var require_convertColumnsFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.convertColumnsFromChunks = convertColumnsFromChunks;
  function convertColumnsFromChunks(chunks, converter) {
    if (chunks.length === 0) {
      return [];
    }
    const convertedColumns = chunks[0].convertColumns(converter);
    for (let chunkIndex = 1;chunkIndex < chunks.length; chunkIndex++) {
      for (let columnIndex = 0;columnIndex < convertedColumns.length; columnIndex++) {
        const chunk = chunks[chunkIndex];
        chunk.visitColumnValues(columnIndex, (value, _rowIndex, _columnIndex, type) => convertedColumns[columnIndex].push(converter(value, type, converter)));
      }
    }
    return convertedColumns;
  }
});

// node_modules/@duckdb/node-api/lib/convertColumnsObjectFromChunks.js
var require_convertColumnsObjectFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.convertColumnsObjectFromChunks = convertColumnsObjectFromChunks;
  function convertColumnsObjectFromChunks(chunks, columnNames, converter) {
    const convertedColumnsObject = {};
    for (const columnName of columnNames) {
      convertedColumnsObject[columnName] = [];
    }
    if (chunks.length === 0) {
      return convertedColumnsObject;
    }
    const columnCount = chunks[0].columnCount;
    for (let chunkIndex = 0;chunkIndex < chunks.length; chunkIndex++) {
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        chunks[chunkIndex].visitColumnValues(columnIndex, (value, _rowIndex, _columnIndex, type) => convertedColumnsObject[columnNames[columnIndex]].push(converter(value, type, converter)));
      }
    }
    return convertedColumnsObject;
  }
});

// node_modules/@duckdb/node-api/lib/convertRowObjectsFromChunks.js
var require_convertRowObjectsFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.convertRowObjectsFromChunks = convertRowObjectsFromChunks;
  function convertRowObjectsFromChunks(chunks, columnNames, converter) {
    const rowObjects = [];
    for (const chunk of chunks) {
      const rowCount = chunk.rowCount;
      for (let rowIndex = 0;rowIndex < rowCount; rowIndex++) {
        const rowObject = {};
        chunk.visitRowValues(rowIndex, (value, _rowIndex, columnIndex, type) => {
          rowObject[columnNames[columnIndex]] = converter(value, type, converter);
        });
        rowObjects.push(rowObject);
      }
    }
    return rowObjects;
  }
});

// node_modules/@duckdb/node-api/lib/convertRowsFromChunks.js
var require_convertRowsFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.convertRowsFromChunks = convertRowsFromChunks;
  function convertRowsFromChunks(chunks, converter) {
    const rows = [];
    for (const chunk of chunks) {
      const rowCount = chunk.rowCount;
      for (let rowIndex = 0;rowIndex < rowCount; rowIndex++) {
        rows.push(chunk.convertRowValues(rowIndex, converter));
      }
    }
    return rows;
  }
});

// node_modules/@duckdb/node-api/lib/getColumnsFromChunks.js
var require_getColumnsFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getColumnsFromChunks = getColumnsFromChunks;
  function getColumnsFromChunks(chunks) {
    const columns = [];
    for (const chunk of chunks) {
      chunk.appendToColumns(columns);
    }
    return columns;
  }
});

// node_modules/@duckdb/node-api/lib/getColumnsObjectFromChunks.js
var require_getColumnsObjectFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getColumnsObjectFromChunks = getColumnsObjectFromChunks;
  function getColumnsObjectFromChunks(chunks, columnNames) {
    const columnsObject = {};
    for (const chunk of chunks) {
      chunk.appendToColumnsObject(columnNames, columnsObject);
    }
    return columnsObject;
  }
});

// node_modules/@duckdb/node-api/lib/getRowObjectsFromChunks.js
var require_getRowObjectsFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getRowObjectsFromChunks = getRowObjectsFromChunks;
  function getRowObjectsFromChunks(chunks, columnNames) {
    const rowObjects = [];
    for (const chunk of chunks) {
      chunk.appendToRowObjects(columnNames, rowObjects);
    }
    return rowObjects;
  }
});

// node_modules/@duckdb/node-api/lib/getRowsFromChunks.js
var require_getRowsFromChunks = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getRowsFromChunks = getRowsFromChunks;
  function getRowsFromChunks(chunks) {
    const rows = [];
    for (const chunk of chunks) {
      chunk.appendToRows(rows);
    }
    return rows;
  }
});

// node_modules/@duckdb/node-api/lib/DuckDBResult.js
var require_DuckDBResult = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBResult = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBDataChunk_1 = require_DuckDBDataChunk();
  var DuckDBLogicalType_1 = require_DuckDBLogicalType();
  var JSDuckDBValueConverter_1 = require_JSDuckDBValueConverter();
  var JsonDuckDBValueConverter_1 = require_JsonDuckDBValueConverter();
  var convertColumnsFromChunks_1 = require_convertColumnsFromChunks();
  var convertColumnsObjectFromChunks_1 = require_convertColumnsObjectFromChunks();
  var convertRowObjectsFromChunks_1 = require_convertRowObjectsFromChunks();
  var convertRowsFromChunks_1 = require_convertRowsFromChunks();
  var getColumnsFromChunks_1 = require_getColumnsFromChunks();
  var getColumnsObjectFromChunks_1 = require_getColumnsObjectFromChunks();
  var getRowObjectsFromChunks_1 = require_getRowObjectsFromChunks();
  var getRowsFromChunks_1 = require_getRowsFromChunks();

  class DuckDBResult {
    result;
    constructor(result) {
      this.result = result;
    }
    get returnType() {
      return node_bindings_1.default.result_return_type(this.result);
    }
    get statementType() {
      return node_bindings_1.default.result_statement_type(this.result);
    }
    get columnCount() {
      return node_bindings_1.default.column_count(this.result);
    }
    columnName(columnIndex) {
      return node_bindings_1.default.column_name(this.result, columnIndex);
    }
    columnNames() {
      const columnNames = [];
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        columnNames.push(this.columnName(columnIndex));
      }
      return columnNames;
    }
    deduplicatedColumnNames() {
      const outputColumnNames = [];
      const columnCount = this.columnCount;
      const columnNameCount = {};
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        const inputColumnName = this.columnName(columnIndex);
        const nameCount = (columnNameCount[inputColumnName] || 0) + 1;
        columnNameCount[inputColumnName] = nameCount;
        if (nameCount > 1) {
          outputColumnNames.push(`${inputColumnName}:${nameCount - 1}`);
        } else {
          outputColumnNames.push(inputColumnName);
        }
      }
      return outputColumnNames;
    }
    columnTypeId(columnIndex) {
      return node_bindings_1.default.column_type(this.result, columnIndex);
    }
    columnLogicalType(columnIndex) {
      return DuckDBLogicalType_1.DuckDBLogicalType.create(node_bindings_1.default.column_logical_type(this.result, columnIndex));
    }
    columnType(columnIndex) {
      return DuckDBLogicalType_1.DuckDBLogicalType.create(node_bindings_1.default.column_logical_type(this.result, columnIndex)).asType();
    }
    columnTypeJson(columnIndex) {
      return this.columnType(columnIndex).toJson();
    }
    columnTypes() {
      const columnTypes = [];
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        columnTypes.push(this.columnType(columnIndex));
      }
      return columnTypes;
    }
    columnTypesJson() {
      const columnTypesJson = [];
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        columnTypesJson.push(this.columnTypeJson(columnIndex));
      }
      return columnTypesJson;
    }
    columnNamesAndTypesJson() {
      return {
        columnNames: this.columnNames(),
        columnTypes: this.columnTypesJson()
      };
    }
    columnNameAndTypeObjectsJson() {
      const columnNameAndTypeObjects = [];
      const columnCount = this.columnCount;
      for (let columnIndex = 0;columnIndex < columnCount; columnIndex++) {
        columnNameAndTypeObjects.push({
          columnName: this.columnName(columnIndex),
          columnType: this.columnTypeJson(columnIndex)
        });
      }
      return columnNameAndTypeObjects;
    }
    get isStreaming() {
      return node_bindings_1.default.result_is_streaming(this.result);
    }
    get rowsChanged() {
      return node_bindings_1.default.rows_changed(this.result);
    }
    async fetchChunk() {
      const chunk = await node_bindings_1.default.fetch_chunk(this.result);
      return chunk ? new DuckDBDataChunk_1.DuckDBDataChunk(chunk) : null;
    }
    async fetchAllChunks() {
      const chunks = [];
      while (true) {
        const chunk = await this.fetchChunk();
        if (!chunk || chunk.rowCount === 0) {
          return chunks;
        }
        chunks.push(chunk);
      }
    }
    async getColumns() {
      const chunks = await this.fetchAllChunks();
      return (0, getColumnsFromChunks_1.getColumnsFromChunks)(chunks);
    }
    async convertColumns(converter) {
      const chunks = await this.fetchAllChunks();
      return (0, convertColumnsFromChunks_1.convertColumnsFromChunks)(chunks, converter);
    }
    async getColumnsJS() {
      return this.convertColumns(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    async getColumnsJson() {
      return this.convertColumns(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    async getColumnsObject() {
      const chunks = await this.fetchAllChunks();
      return (0, getColumnsObjectFromChunks_1.getColumnsObjectFromChunks)(chunks, this.deduplicatedColumnNames());
    }
    async convertColumnsObject(converter) {
      const chunks = await this.fetchAllChunks();
      return (0, convertColumnsObjectFromChunks_1.convertColumnsObjectFromChunks)(chunks, this.deduplicatedColumnNames(), converter);
    }
    async getColumnsObjectJS() {
      return this.convertColumnsObject(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    async getColumnsObjectJson() {
      return this.convertColumnsObject(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    async getRows() {
      const chunks = await this.fetchAllChunks();
      return (0, getRowsFromChunks_1.getRowsFromChunks)(chunks);
    }
    async convertRows(converter) {
      const chunks = await this.fetchAllChunks();
      return (0, convertRowsFromChunks_1.convertRowsFromChunks)(chunks, converter);
    }
    async getRowsJS() {
      return this.convertRows(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    async getRowsJson() {
      return this.convertRows(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    async getRowObjects() {
      const chunks = await this.fetchAllChunks();
      return (0, getRowObjectsFromChunks_1.getRowObjectsFromChunks)(chunks, this.deduplicatedColumnNames());
    }
    async convertRowObjects(converter) {
      const chunks = await this.fetchAllChunks();
      return (0, convertRowObjectsFromChunks_1.convertRowObjectsFromChunks)(chunks, this.deduplicatedColumnNames(), converter);
    }
    async getRowObjectsJS() {
      return this.convertRowObjects(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    async getRowObjectsJson() {
      return this.convertRowObjects(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    async* [Symbol.asyncIterator]() {
      while (true) {
        const chunk = await this.fetchChunk();
        if (chunk && chunk.rowCount > 0) {
          yield chunk;
        } else {
          break;
        }
      }
    }
    async* yieldRows() {
      for await (const chunk of this) {
        yield (0, getRowsFromChunks_1.getRowsFromChunks)([chunk]);
      }
    }
    async* yieldRowObjects() {
      const deduplicatedColumnNames = this.deduplicatedColumnNames();
      for await (const chunk of this) {
        yield (0, getRowObjectsFromChunks_1.getRowObjectsFromChunks)([chunk], deduplicatedColumnNames);
      }
    }
    async* yieldConvertedRows(converter) {
      for await (const chunk of this) {
        yield (0, convertRowsFromChunks_1.convertRowsFromChunks)([chunk], converter);
      }
    }
    async* yieldConvertedRowObjects(converter) {
      const deduplicatedColumnNames = this.deduplicatedColumnNames();
      for await (const chunk of this) {
        yield (0, convertRowObjectsFromChunks_1.convertRowObjectsFromChunks)([chunk], deduplicatedColumnNames, converter);
      }
    }
    yieldRowsJs() {
      return this.yieldConvertedRows(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    yieldRowsJson() {
      return this.yieldConvertedRows(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    yieldRowObjectJs() {
      return this.yieldConvertedRowObjects(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    yieldRowObjectJson() {
      return this.yieldConvertedRowObjects(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
  }
  exports.DuckDBResult = DuckDBResult;
});

// node_modules/@duckdb/node-api/lib/DuckDBMaterializedResult.js
var require_DuckDBMaterializedResult = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBMaterializedResult = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBDataChunk_1 = require_DuckDBDataChunk();
  var DuckDBResult_1 = require_DuckDBResult();

  class DuckDBMaterializedResult extends DuckDBResult_1.DuckDBResult {
    constructor(result) {
      super(result);
    }
    get rowCount() {
      return node_bindings_1.default.row_count(this.result);
    }
    get chunkCount() {
      return node_bindings_1.default.result_chunk_count(this.result);
    }
    getChunk(chunkIndex) {
      return new DuckDBDataChunk_1.DuckDBDataChunk(node_bindings_1.default.result_get_chunk(this.result, chunkIndex));
    }
  }
  exports.DuckDBMaterializedResult = DuckDBMaterializedResult;
});

// node_modules/@duckdb/node-api/lib/createResult.js
var require_createResult = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createResult = createResult;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBMaterializedResult_1 = require_DuckDBMaterializedResult();
  var DuckDBResult_1 = require_DuckDBResult();
  function createResult(result) {
    if (node_bindings_1.default.result_is_streaming(result)) {
      return new DuckDBResult_1.DuckDBResult(result);
    } else {
      return new DuckDBMaterializedResult_1.DuckDBMaterializedResult(result);
    }
  }
});

// node_modules/@duckdb/node-api/lib/DuckDBResultReader.js
var require_DuckDBResultReader = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBResultReader = undefined;
  var convertColumnsFromChunks_1 = require_convertColumnsFromChunks();
  var convertColumnsObjectFromChunks_1 = require_convertColumnsObjectFromChunks();
  var convertRowObjectsFromChunks_1 = require_convertRowObjectsFromChunks();
  var convertRowsFromChunks_1 = require_convertRowsFromChunks();
  var getColumnsFromChunks_1 = require_getColumnsFromChunks();
  var getColumnsObjectFromChunks_1 = require_getColumnsObjectFromChunks();
  var getRowObjectsFromChunks_1 = require_getRowObjectsFromChunks();
  var getRowsFromChunks_1 = require_getRowsFromChunks();
  var JSDuckDBValueConverter_1 = require_JSDuckDBValueConverter();
  var JsonDuckDBValueConverter_1 = require_JsonDuckDBValueConverter();

  class DuckDBResultReader {
    result;
    chunks;
    chunkSizeRuns;
    currentRowCount_;
    done_;
    constructor(result) {
      this.result = result;
      this.chunks = [];
      this.chunkSizeRuns = [];
      this.currentRowCount_ = 0;
      this.done_ = false;
    }
    get returnType() {
      return this.result.returnType;
    }
    get statementType() {
      return this.result.statementType;
    }
    get columnCount() {
      return this.result.columnCount;
    }
    columnName(columnIndex) {
      return this.result.columnName(columnIndex);
    }
    columnNames() {
      return this.result.columnNames();
    }
    deduplicatedColumnNames() {
      return this.result.deduplicatedColumnNames();
    }
    columnTypeId(columnIndex) {
      return this.result.columnTypeId(columnIndex);
    }
    columnLogicalType(columnIndex) {
      return this.result.columnLogicalType(columnIndex);
    }
    columnType(columnIndex) {
      return this.result.columnType(columnIndex);
    }
    columnTypeJson(columnIndex) {
      return this.result.columnTypeJson(columnIndex);
    }
    columnTypes() {
      return this.result.columnTypes();
    }
    columnTypesJson() {
      return this.result.columnTypesJson();
    }
    columnNamesAndTypesJson() {
      return this.result.columnNamesAndTypesJson();
    }
    columnNameAndTypeObjectsJson() {
      return this.result.columnNameAndTypeObjectsJson();
    }
    get rowsChanged() {
      return this.result.rowsChanged;
    }
    get currentRowCount() {
      return this.currentRowCount_;
    }
    get done() {
      return this.done_;
    }
    value(columnIndex, rowIndex) {
      if (this.currentRowCount_ === 0) {
        throw Error(`No rows have been read`);
      }
      let chunkIndex = 0;
      let currentRowIndex = rowIndex;
      for (const run of this.chunkSizeRuns) {
        if (currentRowIndex < run.rowCount) {
          chunkIndex += Math.floor(currentRowIndex / run.chunkSize);
          const rowIndexInChunk = currentRowIndex % run.chunkSize;
          const chunk = this.chunks[chunkIndex];
          return chunk.getColumnVector(columnIndex).getItem(rowIndexInChunk);
        }
        chunkIndex += run.chunkCount;
        currentRowIndex -= run.rowCount;
      }
      throw Error(`Row index ${rowIndex} requested, but only ${this.currentRowCount_} row have been read so far.`);
    }
    async readAll() {
      return this.fetchChunks();
    }
    async readUntil(targetRowCount) {
      return this.fetchChunks(targetRowCount);
    }
    async fetchChunks(targetRowCount) {
      while (!(this.done_ || targetRowCount !== undefined && this.currentRowCount_ >= targetRowCount)) {
        const chunk = await this.result.fetchChunk();
        if (chunk && chunk.rowCount > 0) {
          this.updateChunkSizeRuns(chunk);
          this.chunks.push(chunk);
          this.currentRowCount_ += chunk.rowCount;
        } else {
          this.done_ = true;
        }
      }
    }
    updateChunkSizeRuns(chunk) {
      if (this.chunkSizeRuns.length > 0) {
        const lastRun = this.chunkSizeRuns[this.chunkSizeRuns.length - 1];
        if (lastRun.chunkSize === chunk.rowCount) {
          lastRun.chunkCount += 1;
          lastRun.rowCount += lastRun.chunkSize;
          return;
        }
      }
      this.chunkSizeRuns.push({
        chunkCount: 1,
        chunkSize: chunk.rowCount,
        rowCount: chunk.rowCount
      });
    }
    getColumns() {
      return (0, getColumnsFromChunks_1.getColumnsFromChunks)(this.chunks);
    }
    convertColumns(converter) {
      return (0, convertColumnsFromChunks_1.convertColumnsFromChunks)(this.chunks, converter);
    }
    getColumnsJS() {
      return this.convertColumns(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    getColumnsJson() {
      return this.convertColumns(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    getColumnsObject() {
      return (0, getColumnsObjectFromChunks_1.getColumnsObjectFromChunks)(this.chunks, this.deduplicatedColumnNames());
    }
    convertColumnsObject(converter) {
      return (0, convertColumnsObjectFromChunks_1.convertColumnsObjectFromChunks)(this.chunks, this.deduplicatedColumnNames(), converter);
    }
    getColumnsObjectJS() {
      return this.convertColumnsObject(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    getColumnsObjectJson() {
      return this.convertColumnsObject(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    getRows() {
      return (0, getRowsFromChunks_1.getRowsFromChunks)(this.chunks);
    }
    convertRows(converter) {
      return (0, convertRowsFromChunks_1.convertRowsFromChunks)(this.chunks, converter);
    }
    getRowsJS() {
      return this.convertRows(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    getRowsJson() {
      return this.convertRows(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
    getRowObjects() {
      return (0, getRowObjectsFromChunks_1.getRowObjectsFromChunks)(this.chunks, this.deduplicatedColumnNames());
    }
    convertRowObjects(converter) {
      return (0, convertRowObjectsFromChunks_1.convertRowObjectsFromChunks)(this.chunks, this.deduplicatedColumnNames(), converter);
    }
    getRowObjectsJS() {
      return this.convertRowObjects(JSDuckDBValueConverter_1.JSDuckDBValueConverter);
    }
    getRowObjectsJson() {
      return this.convertRowObjects(JsonDuckDBValueConverter_1.JsonDuckDBValueConverter);
    }
  }
  exports.DuckDBResultReader = DuckDBResultReader;
});

// node_modules/@duckdb/node-api/lib/DuckDBPendingResult.js
var require_DuckDBPendingResult = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBPendingResult = exports.DuckDBPendingResultState = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var createResult_1 = require_createResult();
  var DuckDBResultReader_1 = require_DuckDBResultReader();
  var DuckDBPendingResultState;
  (function(DuckDBPendingResultState2) {
    DuckDBPendingResultState2[DuckDBPendingResultState2["RESULT_READY"] = 0] = "RESULT_READY";
    DuckDBPendingResultState2[DuckDBPendingResultState2["RESULT_NOT_READY"] = 1] = "RESULT_NOT_READY";
    DuckDBPendingResultState2[DuckDBPendingResultState2["NO_TASKS_AVAILABLE"] = 3] = "NO_TASKS_AVAILABLE";
  })(DuckDBPendingResultState || (exports.DuckDBPendingResultState = DuckDBPendingResultState = {}));

  class DuckDBPendingResult {
    pending_result;
    constructor(pending_result) {
      this.pending_result = pending_result;
    }
    runTask() {
      const pending_state = node_bindings_1.default.pending_execute_task(this.pending_result);
      switch (pending_state) {
        case node_bindings_1.default.PendingState.RESULT_READY:
          return DuckDBPendingResultState.RESULT_READY;
        case node_bindings_1.default.PendingState.RESULT_NOT_READY:
          return DuckDBPendingResultState.RESULT_NOT_READY;
        case node_bindings_1.default.PendingState.ERROR:
          throw new Error(`Failure running pending result task: ${node_bindings_1.default.pending_error(this.pending_result)}`);
        case node_bindings_1.default.PendingState.NO_TASKS_AVAILABLE:
          return DuckDBPendingResultState.NO_TASKS_AVAILABLE;
        default:
          throw new Error(`Unexpected pending state: ${pending_state}`);
      }
    }
    async getResult() {
      return (0, createResult_1.createResult)(await node_bindings_1.default.execute_pending(this.pending_result));
    }
    async read() {
      return new DuckDBResultReader_1.DuckDBResultReader(await this.getResult());
    }
    async readAll() {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.getResult());
      await reader.readAll();
      return reader;
    }
    async readUntil(targetRowCount) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.getResult());
      await reader.readUntil(targetRowCount);
      return reader;
    }
  }
  exports.DuckDBPendingResult = DuckDBPendingResult;
});

// node_modules/@duckdb/node-api/lib/DuckDBPreparedStatement.js
var require_DuckDBPreparedStatement = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBPreparedStatement = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var createValue_1 = require_createValue();
  var DuckDBLogicalType_1 = require_DuckDBLogicalType();
  var DuckDBMaterializedResult_1 = require_DuckDBMaterializedResult();
  var DuckDBPendingResult_1 = require_DuckDBPendingResult();
  var DuckDBResult_1 = require_DuckDBResult();
  var DuckDBResultReader_1 = require_DuckDBResultReader();
  var DuckDBType_1 = require_DuckDBType();
  var typeForValue_1 = require_typeForValue();
  var values_1 = require_values();

  class DuckDBPreparedStatement {
    prepared_statement;
    constructor(prepared_statement) {
      this.prepared_statement = prepared_statement;
    }
    destroySync() {
      return node_bindings_1.default.destroy_prepare_sync(this.prepared_statement);
    }
    get statementType() {
      return node_bindings_1.default.prepared_statement_type(this.prepared_statement);
    }
    get parameterCount() {
      return node_bindings_1.default.nparams(this.prepared_statement);
    }
    parameterName(parameterIndex) {
      return node_bindings_1.default.parameter_name(this.prepared_statement, parameterIndex);
    }
    parameterTypeId(parameterIndex) {
      return node_bindings_1.default.param_type(this.prepared_statement, parameterIndex);
    }
    parameterType(parameterIndex) {
      return DuckDBLogicalType_1.DuckDBLogicalType.create(node_bindings_1.default.param_logical_type(this.prepared_statement, parameterIndex)).asType();
    }
    clearBindings() {
      node_bindings_1.default.clear_bindings(this.prepared_statement);
    }
    parameterIndex(parameterName) {
      return node_bindings_1.default.bind_parameter_index(this.prepared_statement, parameterName);
    }
    bindBoolean(parameterIndex, value) {
      node_bindings_1.default.bind_boolean(this.prepared_statement, parameterIndex, value);
    }
    bindTinyInt(parameterIndex, value) {
      node_bindings_1.default.bind_int8(this.prepared_statement, parameterIndex, value);
    }
    bindSmallInt(parameterIndex, value) {
      node_bindings_1.default.bind_int16(this.prepared_statement, parameterIndex, value);
    }
    bindInteger(parameterIndex, value) {
      node_bindings_1.default.bind_int32(this.prepared_statement, parameterIndex, value);
    }
    bindBigInt(parameterIndex, value) {
      node_bindings_1.default.bind_int64(this.prepared_statement, parameterIndex, value);
    }
    bindHugeInt(parameterIndex, value) {
      node_bindings_1.default.bind_hugeint(this.prepared_statement, parameterIndex, value);
    }
    bindUTinyInt(parameterIndex, value) {
      node_bindings_1.default.bind_uint8(this.prepared_statement, parameterIndex, value);
    }
    bindUSmallInt(parameterIndex, value) {
      node_bindings_1.default.bind_uint16(this.prepared_statement, parameterIndex, value);
    }
    bindUInteger(parameterIndex, value) {
      node_bindings_1.default.bind_uint32(this.prepared_statement, parameterIndex, value);
    }
    bindUBigInt(parameterIndex, value) {
      node_bindings_1.default.bind_uint64(this.prepared_statement, parameterIndex, value);
    }
    bindUHugeInt(parameterIndex, value) {
      node_bindings_1.default.bind_uhugeint(this.prepared_statement, parameterIndex, value);
    }
    bindBigNum(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.BIGNUM);
    }
    bindDecimal(parameterIndex, value) {
      node_bindings_1.default.bind_decimal(this.prepared_statement, parameterIndex, value);
    }
    bindFloat(parameterIndex, value) {
      node_bindings_1.default.bind_float(this.prepared_statement, parameterIndex, value);
    }
    bindDouble(parameterIndex, value) {
      node_bindings_1.default.bind_double(this.prepared_statement, parameterIndex, value);
    }
    bindDate(parameterIndex, value) {
      node_bindings_1.default.bind_date(this.prepared_statement, parameterIndex, value);
    }
    bindTime(parameterIndex, value) {
      node_bindings_1.default.bind_time(this.prepared_statement, parameterIndex, value);
    }
    bindTimeTZ(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.TIMETZ);
    }
    bindTimestamp(parameterIndex, value) {
      node_bindings_1.default.bind_timestamp(this.prepared_statement, parameterIndex, value);
    }
    bindTimestampTZ(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.TIMESTAMPTZ);
    }
    bindTimestampSeconds(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.TIMESTAMP_S);
    }
    bindTimestampMilliseconds(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.TIMESTAMP_MS);
    }
    bindTimestampNanoseconds(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.TIMESTAMP_NS);
    }
    bindInterval(parameterIndex, value) {
      node_bindings_1.default.bind_interval(this.prepared_statement, parameterIndex, value);
    }
    bindVarchar(parameterIndex, value) {
      node_bindings_1.default.bind_varchar(this.prepared_statement, parameterIndex, value);
    }
    bindBlob(parameterIndex, value) {
      node_bindings_1.default.bind_blob(this.prepared_statement, parameterIndex, value);
    }
    bindEnum(parameterIndex, value, type) {
      this.bindValue(parameterIndex, value, type);
    }
    bindArray(parameterIndex, value, type) {
      this.bindValue(parameterIndex, value instanceof values_1.DuckDBArrayValue ? value : (0, values_1.arrayValue)(value), type);
    }
    bindList(parameterIndex, value, type) {
      this.bindValue(parameterIndex, value instanceof values_1.DuckDBListValue ? value : (0, values_1.listValue)(value), type);
    }
    bindStruct(parameterIndex, value, type) {
      this.bindValue(parameterIndex, value instanceof values_1.DuckDBStructValue ? value : (0, values_1.structValue)(value), type);
    }
    bindMap(parameterIndex, value, type) {
      this.bindValue(parameterIndex, value, type);
    }
    bindUnion(parameterIndex, value, type) {
      this.bindValue(parameterIndex, value, type);
    }
    bindUUID(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.UUID);
    }
    bindBit(parameterIndex, value) {
      this.bindValue(parameterIndex, value, DuckDBType_1.BIT);
    }
    bindNull(parameterIndex) {
      node_bindings_1.default.bind_null(this.prepared_statement, parameterIndex);
    }
    bindValue(parameterIndex, value, type) {
      node_bindings_1.default.bind_value(this.prepared_statement, parameterIndex, (0, createValue_1.createValue)(type ? type : (0, typeForValue_1.typeForValue)(value), value));
    }
    bind(values, types) {
      if (Array.isArray(values)) {
        const typesIsArray = Array.isArray(types);
        for (let i = 0;i < values.length; i++) {
          this.bindValue(i + 1, values[i], typesIsArray ? types[i] : undefined);
        }
      } else {
        const typesIsRecord = types && !Array.isArray(types);
        for (const key in values) {
          this.bindValue(this.parameterIndex(key), values[key], typesIsRecord ? types[key] : undefined);
        }
      }
    }
    async run() {
      return new DuckDBMaterializedResult_1.DuckDBMaterializedResult(await node_bindings_1.default.execute_prepared(this.prepared_statement));
    }
    async runAndRead() {
      return new DuckDBResultReader_1.DuckDBResultReader(await this.run());
    }
    async runAndReadAll() {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.run());
      await reader.readAll();
      return reader;
    }
    async runAndReadUntil(targetRowCount) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.run());
      await reader.readUntil(targetRowCount);
      return reader;
    }
    async stream() {
      return new DuckDBResult_1.DuckDBResult(await node_bindings_1.default.execute_prepared_streaming(this.prepared_statement));
    }
    async streamAndRead() {
      return new DuckDBResultReader_1.DuckDBResultReader(await this.stream());
    }
    async streamAndReadAll() {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.stream());
      await reader.readAll();
      return reader;
    }
    async streamAndReadUntil(targetRowCount) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.stream());
      await reader.readUntil(targetRowCount);
      return reader;
    }
    start() {
      return new DuckDBPendingResult_1.DuckDBPendingResult(node_bindings_1.default.pending_prepared(this.prepared_statement));
    }
    startStream() {
      return new DuckDBPendingResult_1.DuckDBPendingResult(node_bindings_1.default.pending_prepared_streaming(this.prepared_statement));
    }
  }
  exports.DuckDBPreparedStatement = DuckDBPreparedStatement;
});

// node_modules/@duckdb/node-api/lib/DuckDBExtractedStatements.js
var require_DuckDBExtractedStatements = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBExtractedStatements = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBPreparedStatement_1 = require_DuckDBPreparedStatement();

  class DuckDBExtractedStatements {
    connection;
    extracted_statements;
    statement_count;
    preparedStatements;
    constructor(connection, extracted_statements, statement_count, preparedStatements) {
      this.connection = connection;
      this.extracted_statements = extracted_statements;
      this.statement_count = statement_count;
      this.preparedStatements = preparedStatements;
    }
    get count() {
      return this.statement_count;
    }
    async prepare(index) {
      const prepared = new DuckDBPreparedStatement_1.DuckDBPreparedStatement(await node_bindings_1.default.prepare_extracted_statement(this.connection, this.extracted_statements, index));
      if (this.preparedStatements) {
        this.preparedStatements.add(prepared);
      }
      return prepared;
    }
  }
  exports.DuckDBExtractedStatements = DuckDBExtractedStatements;
});

// node_modules/@duckdb/node-api/lib/createConfig.js
var require_createConfig = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createConfig = createConfig;
  var node_bindings_1 = __importDefault(require_duckdb2());
  function createConfig(options) {
    const config = node_bindings_1.default.create_config();
    node_bindings_1.default.set_config(config, "duckdb_api", "node-neo-api");
    if (options) {
      for (const optionName in options) {
        const optionValue = String(options[optionName]);
        node_bindings_1.default.set_config(config, optionName, optionValue);
      }
    }
    return config;
  }
});

// node_modules/@duckdb/node-api/lib/DuckDBInstanceCache.js
var require_DuckDBInstanceCache = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBInstanceCache = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBInstance_1 = require_DuckDBInstance();
  var createConfig_1 = require_createConfig();

  class DuckDBInstanceCache {
    cache;
    constructor() {
      this.cache = node_bindings_1.default.create_instance_cache();
    }
    async getOrCreateInstance(path, options) {
      const config = (0, createConfig_1.createConfig)(options);
      const db = await node_bindings_1.default.get_or_create_from_cache(this.cache, path, config);
      return new DuckDBInstance_1.DuckDBInstance(db);
    }
    static singletonInstance;
    static get singleton() {
      if (!DuckDBInstanceCache.singletonInstance) {
        DuckDBInstanceCache.singletonInstance = new DuckDBInstanceCache;
      }
      return DuckDBInstanceCache.singletonInstance;
    }
  }
  exports.DuckDBInstanceCache = DuckDBInstanceCache;
});

// node_modules/@duckdb/node-api/lib/DuckDBInstance.js
var require_DuckDBInstance = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBInstance = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var createConfig_1 = require_createConfig();
  var DuckDBConnection_1 = require_DuckDBConnection();
  var DuckDBInstanceCache_1 = require_DuckDBInstanceCache();

  class DuckDBInstance {
    db;
    constructor(db) {
      this.db = db;
    }
    static async create(path, options) {
      const config = (0, createConfig_1.createConfig)(options);
      return new DuckDBInstance(await node_bindings_1.default.open(path, config));
    }
    static async fromCache(path, options) {
      return DuckDBInstanceCache_1.DuckDBInstanceCache.singleton.getOrCreateInstance(path, options);
    }
    async connect() {
      return new DuckDBConnection_1.DuckDBConnection(await node_bindings_1.default.connect(this.db));
    }
    closeSync() {
      node_bindings_1.default.close_sync(this.db);
    }
  }
  exports.DuckDBInstance = DuckDBInstance;
});

// node_modules/@duckdb/node-api/lib/DuckDBPreparedStatementWeakRefCollection.js
var require_DuckDBPreparedStatementWeakRefCollection = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBPreparedStatementWeakRefCollection = undefined;

  class DuckDBPreparedStatementWeakRefCollection {
    preparedStatements = [];
    lastPruneTime = 0;
    add(prepared) {
      const now = performance.now();
      if (now - this.lastPruneTime > 1000) {
        this.lastPruneTime = now;
        this.prune();
      }
      this.preparedStatements.push(new WeakRef(prepared));
    }
    destroySync() {
      for (const preparedRef of this.preparedStatements) {
        const prepared = preparedRef.deref();
        if (prepared) {
          prepared.destroySync();
        }
      }
      this.preparedStatements = [];
    }
    prune() {
      this.preparedStatements = this.preparedStatements.filter((ref) => !!ref.deref());
    }
  }
  exports.DuckDBPreparedStatementWeakRefCollection = DuckDBPreparedStatementWeakRefCollection;
});

// node_modules/@duckdb/node-api/lib/DuckDBConnection.js
var require_DuckDBConnection = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBConnection = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBAppender_1 = require_DuckDBAppender();
  var DuckDBExtractedStatements_1 = require_DuckDBExtractedStatements();
  var DuckDBInstance_1 = require_DuckDBInstance();
  var DuckDBMaterializedResult_1 = require_DuckDBMaterializedResult();
  var DuckDBPreparedStatement_1 = require_DuckDBPreparedStatement();
  var DuckDBPreparedStatementWeakRefCollection_1 = require_DuckDBPreparedStatementWeakRefCollection();
  var DuckDBResultReader_1 = require_DuckDBResultReader();

  class DuckDBConnection {
    connection;
    preparedStatements;
    constructor(connection) {
      this.connection = connection;
      this.preparedStatements = new DuckDBPreparedStatementWeakRefCollection_1.DuckDBPreparedStatementWeakRefCollection;
    }
    static async create(instance) {
      if (instance) {
        return instance.connect();
      }
      return (await DuckDBInstance_1.DuckDBInstance.fromCache()).connect();
    }
    closeSync() {
      this.disconnectSync();
    }
    disconnectSync() {
      this.preparedStatements.destroySync();
      node_bindings_1.default.disconnect_sync(this.connection);
    }
    interrupt() {
      node_bindings_1.default.interrupt(this.connection);
    }
    get progress() {
      return node_bindings_1.default.query_progress(this.connection);
    }
    async run(sql, values, types) {
      if (values) {
        const prepared = await this.runUntilLast(sql);
        try {
          prepared.bind(values, types);
          const result = await prepared.run();
          return result;
        } finally {
          prepared.destroySync();
        }
      } else {
        return new DuckDBMaterializedResult_1.DuckDBMaterializedResult(await node_bindings_1.default.query(this.connection, sql));
      }
    }
    async runAndRead(sql, values, types) {
      return new DuckDBResultReader_1.DuckDBResultReader(await this.run(sql, values, types));
    }
    async runAndReadAll(sql, values, types) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.run(sql, values, types));
      await reader.readAll();
      return reader;
    }
    async runAndReadUntil(sql, targetRowCount, values, types) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.run(sql, values, types));
      await reader.readUntil(targetRowCount);
      return reader;
    }
    async stream(sql, values, types) {
      const prepared = await this.runUntilLast(sql);
      try {
        if (values) {
          prepared.bind(values, types);
        }
        const result = await prepared.stream();
        return result;
      } finally {
        prepared.destroySync();
      }
    }
    async streamAndRead(sql, values, types) {
      return new DuckDBResultReader_1.DuckDBResultReader(await this.stream(sql, values, types));
    }
    async streamAndReadAll(sql, values, types) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.stream(sql, values, types));
      await reader.readAll();
      return reader;
    }
    async streamAndReadUntil(sql, targetRowCount, values, types) {
      const reader = new DuckDBResultReader_1.DuckDBResultReader(await this.stream(sql, values, types));
      await reader.readUntil(targetRowCount);
      return reader;
    }
    async start(sql, values, types) {
      const prepared = await this.runUntilLast(sql);
      try {
        if (values) {
          prepared.bind(values, types);
        }
        return prepared.start();
      } finally {
        prepared.destroySync();
      }
    }
    async startStream(sql, values, types) {
      const prepared = await this.runUntilLast(sql);
      try {
        if (values) {
          prepared.bind(values, types);
        }
        return prepared.startStream();
      } finally {
        prepared.destroySync();
      }
    }
    async prepare(sql) {
      const prepared = await this.createPrepared(sql);
      this.preparedStatements.add(prepared);
      return prepared;
    }
    async createPrepared(sql) {
      return new DuckDBPreparedStatement_1.DuckDBPreparedStatement(await node_bindings_1.default.prepare(this.connection, sql));
    }
    async extractStatements(sql) {
      const { extracted_statements, statement_count } = await node_bindings_1.default.extract_statements(this.connection, sql);
      if (statement_count === 0) {
        throw new Error(`Failed to extract statements: ${node_bindings_1.default.extract_statements_error(extracted_statements)}`);
      }
      return new DuckDBExtractedStatements_1.DuckDBExtractedStatements(this.connection, extracted_statements, statement_count, this.preparedStatements);
    }
    async runUntilLast(sql) {
      const extractedStatements = await this.extractStatements(sql);
      const statementCount = extractedStatements.count;
      if (statementCount > 1) {
        for (let i = 0;i < statementCount - 1; i++) {
          const prepared = await extractedStatements.prepare(i);
          try {
            await prepared.run();
          } finally {
            prepared.destroySync();
          }
        }
      }
      return extractedStatements.prepare(statementCount - 1);
    }
    async createAppender(table, schema, catalog) {
      return new DuckDBAppender_1.DuckDBAppender(node_bindings_1.default.appender_create_ext(this.connection, catalog ?? null, schema ?? null, table));
    }
    registerScalarFunction(scalarFunction) {
      node_bindings_1.default.register_scalar_function(this.connection, scalarFunction.scalar_function);
    }
  }
  exports.DuckDBConnection = DuckDBConnection;
});

// node_modules/@duckdb/node-api/lib/DuckDBFunctionInfo.js
var require_DuckDBFunctionInfo = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBFunctionInfo = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());

  class DuckDBFunctionInfo {
    function_info;
    constructor(function_info) {
      this.function_info = function_info;
    }
    getExtraInfo() {
      return node_bindings_1.default.scalar_function_get_extra_info(this.function_info);
    }
    setError(error) {
      node_bindings_1.default.scalar_function_set_error(this.function_info, error);
    }
  }
  exports.DuckDBFunctionInfo = DuckDBFunctionInfo;
});

// node_modules/@duckdb/node-api/lib/DuckDBPreparedStatementCollection.js
var require_DuckDBPreparedStatementCollection = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
});

// node_modules/@duckdb/node-api/lib/DuckDBScalarFunction.js
var require_DuckDBScalarFunction = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DuckDBScalarFunction = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  var DuckDBDataChunk_1 = require_DuckDBDataChunk();
  var DuckDBFunctionInfo_1 = require_DuckDBFunctionInfo();
  var DuckDBVector_1 = require_DuckDBVector();

  class DuckDBScalarFunction {
    scalar_function;
    constructor() {
      this.scalar_function = node_bindings_1.default.create_scalar_function();
    }
    static create({ name, mainFunction, returnType, parameterTypes, varArgsType, specialHandling, volatile, extraInfo }) {
      const scalarFunction = new DuckDBScalarFunction;
      scalarFunction.setName(name);
      scalarFunction.setMainFunction(mainFunction);
      scalarFunction.setReturnType(returnType);
      if (parameterTypes) {
        for (const parameterType of parameterTypes) {
          scalarFunction.addParameter(parameterType);
        }
      }
      if (varArgsType) {
        scalarFunction.setVarArgs(varArgsType);
      }
      if (specialHandling) {
        scalarFunction.setSpecialHandling();
      }
      if (volatile) {
        scalarFunction.setVolatile();
      }
      if (extraInfo) {
        scalarFunction.setExtraInfo(extraInfo);
      }
      return scalarFunction;
    }
    destroySync() {
      node_bindings_1.default.destroy_scalar_function_sync(this.scalar_function);
    }
    setName(name) {
      node_bindings_1.default.scalar_function_set_name(this.scalar_function, name);
    }
    setMainFunction(mainFunction) {
      node_bindings_1.default.scalar_function_set_function(this.scalar_function, (info, input, output) => {
        const functionInfo = new DuckDBFunctionInfo_1.DuckDBFunctionInfo(info);
        const inputDataChunk = new DuckDBDataChunk_1.DuckDBDataChunk(input);
        const outputVector = DuckDBVector_1.DuckDBVector.create(output, inputDataChunk.rowCount);
        mainFunction(functionInfo, inputDataChunk, outputVector);
      });
    }
    setReturnType(returnType) {
      node_bindings_1.default.scalar_function_set_return_type(this.scalar_function, returnType.toLogicalType().logical_type);
    }
    addParameter(parameterType) {
      node_bindings_1.default.scalar_function_add_parameter(this.scalar_function, parameterType.toLogicalType().logical_type);
    }
    setVarArgs(varArgsType) {
      node_bindings_1.default.scalar_function_set_varargs(this.scalar_function, varArgsType.toLogicalType().logical_type);
    }
    setSpecialHandling() {
      node_bindings_1.default.scalar_function_set_special_handling(this.scalar_function);
    }
    setVolatile() {
      node_bindings_1.default.scalar_function_set_volatile(this.scalar_function);
    }
    setExtraInfo(extraInfo) {
      node_bindings_1.default.scalar_function_set_extra_info(this.scalar_function, extraInfo);
    }
  }
  exports.DuckDBScalarFunction = DuckDBScalarFunction;
});

// node_modules/@duckdb/node-api/lib/DuckDBValueConverter.js
var require_DuckDBValueConverter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
});

// node_modules/@duckdb/node-api/lib/enums.js
var require_enums = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.StatementType = exports.ResultReturnType = undefined;
  var node_bindings_1 = __importDefault(require_duckdb2());
  exports.ResultReturnType = node_bindings_1.default.ResultType;
  exports.StatementType = node_bindings_1.default.StatementType;
});

// node_modules/@duckdb/node-api/lib/JS.js
var require_JS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
});

// node_modules/@duckdb/node-api/lib/Json.js
var require_Json = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
});

// node_modules/@duckdb/node-api/lib/version.js
var require_version = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.version = version;
  var node_bindings_1 = __importDefault(require_duckdb2());
  function version() {
    return node_bindings_1.default.library_version();
  }
});

// node_modules/@duckdb/node-api/lib/duckdb.js
var require_duckdb3 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.uhugeint_to_double = exports.hugeint_to_double = exports.double_to_uhugeint = exports.double_to_hugeint = undefined;
  var node_bindings_1 = require_duckdb2();
  Object.defineProperty(exports, "double_to_hugeint", { enumerable: true, get: function() {
    return node_bindings_1.double_to_hugeint;
  } });
  Object.defineProperty(exports, "double_to_uhugeint", { enumerable: true, get: function() {
    return node_bindings_1.double_to_uhugeint;
  } });
  Object.defineProperty(exports, "hugeint_to_double", { enumerable: true, get: function() {
    return node_bindings_1.hugeint_to_double;
  } });
  Object.defineProperty(exports, "uhugeint_to_double", { enumerable: true, get: function() {
    return node_bindings_1.uhugeint_to_double;
  } });
  __exportStar(require_configurationOptionDescriptions(), exports);
  __exportStar(require_createDuckDBValueConverter(), exports);
  __exportStar(require_DuckDBAppender(), exports);
  __exportStar(require_DuckDBConnection(), exports);
  __exportStar(require_DuckDBDataChunk(), exports);
  __exportStar(require_DuckDBExtractedStatements(), exports);
  __exportStar(require_DuckDBFunctionInfo(), exports);
  __exportStar(require_DuckDBInstance(), exports);
  __exportStar(require_DuckDBInstanceCache(), exports);
  __exportStar(require_DuckDBLogicalType(), exports);
  __exportStar(require_DuckDBMaterializedResult(), exports);
  __exportStar(require_DuckDBPendingResult(), exports);
  __exportStar(require_DuckDBPreparedStatement(), exports);
  __exportStar(require_DuckDBPreparedStatementCollection(), exports);
  __exportStar(require_DuckDBResult(), exports);
  __exportStar(require_DuckDBResultReader(), exports);
  __exportStar(require_DuckDBScalarFunction(), exports);
  __exportStar(require_DuckDBType(), exports);
  __exportStar(require_DuckDBTypeId(), exports);
  __exportStar(require_DuckDBValueConverter(), exports);
  __exportStar(require_DuckDBValueConverters(), exports);
  __exportStar(require_DuckDBVector(), exports);
  __exportStar(require_enums(), exports);
  __exportStar(require_JS(), exports);
  __exportStar(require_JSDuckDBValueConverter(), exports);
  __exportStar(require_Json(), exports);
  __exportStar(require_JsonDuckDBValueConverter(), exports);
  __exportStar(require_sql(), exports);
  __exportStar(require_values(), exports);
  __exportStar(require_version(), exports);
});

// node_modules/@duckdb/node-api/lib/index.js
var require_lib = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function() {
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2)
          if (Object.prototype.hasOwnProperty.call(o2, k))
            ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0;i < k.length; i++)
          if (k[i] !== "default")
            __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  }();
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var duckdb = __importStar(require_duckdb3());
  exports.default = duckdb;
  __exportStar(require_duckdb3(), exports);
});

// cli.ts
var import_node_api = __toESM(require_lib(), 1);
var {serve, file, Glob, argv } = globalThis.Bun;
import { join } from "path";
import { parseArgs } from "util";
process.env.DUCKDB_HTTPSERVER_FOREGROUND = "1";
async function getAssets(distDir) {
  const scanner = new Glob("**/*");
  const assets = {};
  for (const relativePath of scanner.scanSync(distDir)) {
    const filePath = join(distDir, relativePath);
    const f = file(filePath);
    assets["/" + relativePath] = Buffer.from(await f.arrayBuffer()).toString("base64");
  }
  return assets;
}
var assetsBase64 = await getAssets(join(import.meta.dir, "..", "demo", "dist"));
var assets = Object.fromEntries(Object.entries(assetsBase64).map(([k, v]) => [k, Buffer.from(v, "base64")]));
var { values } = parseArgs({
  args: argv,
  options: {
    port: {
      type: "string",
      short: "p",
      default: "3000"
    },
    help: {
      type: "boolean",
      short: "h",
      default: false
    }
  },
  strict: false,
  allowPositionals: true
});
if (values.help) {
  console.log(`Usage: bun run serve-static.ts [options]

Options:
  -p, --port <port>  Port to run the server on (default: 3000)
  -h, --help         Show this help message`);
  process.exit(0);
}
var port = parseInt(values.port ?? "3000", 10);
var instance = await import_node_api.DuckDBInstance.create(":memory:");
var connection = await instance.connect();
var initSql = `
INSTALL hostfs FROM community; 
LOAD hostfs;
INSTALL httpserver FROM community;
LOAD httpserver; 
SELECT httpserve_start('0.0.0.0', 9998, '');
`;
console.log("[DuckDB] Initializing...");
await connection.run(initSql);
console.log("[DuckDB] HTTP server started on port 9998");
var getMimeType = (filePath) => {
  const ext = filePath.split(".").pop()?.toLowerCase() || "";
  const mimeTypes = {
    html: "text/html",
    js: "application/javascript",
    json: "application/json",
    css: "text/css",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    ico: "image/x-icon",
    wasm: "application/wasm"
  };
  return mimeTypes[ext] || "application/octet-stream";
};
var addSecurityHeaders = (res) => {
  res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  return res;
};
var routes = {};
for (const [routePath, content] of Object.entries(assets)) {
  routes[routePath] = () => {
    const res = new Response(content, {
      headers: {
        "Content-Type": getMimeType(routePath)
      }
    });
    return addSecurityHeaders(res);
  };
  if (routePath === "/index.html") {
    routes["/"] = () => {
      const res = new Response(content, {
        headers: {
          "Content-Type": "text/html"
        }
      });
      return addSecurityHeaders(res);
    };
  }
}
serve({
  port,
  routes,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith("/duckdb")) {
      const targetUrl = new URL(req.url);
      targetUrl.protocol = "http:";
      targetUrl.host = "localhost:9998";
      targetUrl.pathname = pathname.replace(/^\/duckdb/, "");
      if (targetUrl.pathname === "")
        targetUrl.pathname = "/";
      console.log(`[Proxy] ${req.method} ${pathname} -> ${targetUrl.toString()}`);
      return fetch(new Request(targetUrl.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body,
        duplex: "half"
      }));
    }
    return new Response("Not Found", { status: 404 });
  }
});
console.log(`
\uD83D\uDE80 Inlined server running at http://localhost:${port}/`);
console.log(`\uFFFD Embedded assets: ${Object.keys(assets).length} files`);
export {
  getAssets
};
