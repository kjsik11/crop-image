// import pino from 'pino';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko');

// export function getLogger(
//   name: string,
//   options?: pino.LoggerOptions,
//   properties?: pino.Bindings,
// ): pino.Logger {
//   const logger = pino({
//     base: {},
//     name,
//     messageKey: 'message', // g for datadog
//     timestamp: pino.stdTimeFunctions.isoTime,
//     formatters: {
//       level(level) {
//         return { level };
//       },
//     },
//     ...options,
//   });

//   if (properties) {
//     return logger.child(properties);
//   }

//   return logger;
// }

type Fn = () => any;
type LoggerOptions = {
  messageKey: string;
  timeFn: Fn;
};
type LoggerProps = { [key: string]: string | Fn };
type LoggerStrProps = { [key: string]: string };
type LoggerFnProps = { [key: string]: Fn };

const DEFAULT_MESSAGE_KEY = 'message';
const DEFAULT_TIME_FN = () => moment().format();

export class JsonLoggerBuidler {
  options: LoggerOptions;
  properties: LoggerProps;

  constructor() {
    this.options = {
      messageKey: DEFAULT_MESSAGE_KEY,
      timeFn: DEFAULT_TIME_FN,
    };
    this.properties = {};
  }

  withName(name: string): JsonLoggerBuidler {
    this.withProps({ name });
    return this;
  }

  withMessageKey(key: string): JsonLoggerBuidler {
    this.options.messageKey = key;
    return this;
  }

  withTimeFn(fn: Fn): JsonLoggerBuidler {
    this.options.timeFn = fn;
    return this;
  }

  withProps(props: LoggerProps): JsonLoggerBuidler {
    this.properties = {
      ...this.properties,
      ...props,
    };
    return this;
  }

  build(): JsonLogger {
    const logger = new JsonLogger(this.options, this.properties);
    return logger;
  }
}

export class JsonLogger {
  options: LoggerOptions;
  strProperties: LoggerStrProps;
  fnProperfies: LoggerFnProps;

  constructor(options: LoggerOptions, properties: LoggerProps) {
    this.options = options;
    this.strProperties = {};
    this.fnProperfies = {};

    Object.entries(properties).forEach(([k, v]) => {
      if (typeof v === 'function') {
        this.fnProperfies[k] = v;
      } else {
        this.strProperties[k] = v;
      }
    });
  }

  trace(value: any) {
    this.__log('trace', value);
  }

  debug(value: any) {
    this.__log('debug', value);
  }

  info(value: any) {
    this.__log('info', value);
  }

  warn(value: any) {
    this.__log('warn', value);
  }

  error(value: any) {
    this.__log('error', value);
  }

  __log(level: string, value: any) {
    console.log(
      JSON.stringify({
        level,
        [this.options.messageKey]: value,
        ...this.__getProperties(),
      }),
    );
  }

  __getProperties(): { [key: string]: string } {
    return {
      time: this.options.timeFn(),
      ...this.strProperties,
      ...Object.fromEntries(
        Object.entries(this.fnProperfies).map(([k, v]) => {
          return [k, v()];
        }),
      ),
    };
  }
}

export const defaulLogger = new JsonLoggerBuidler().build();
