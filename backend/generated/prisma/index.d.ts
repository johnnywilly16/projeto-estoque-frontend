
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model ServiceOrders
 * 
 */
export type ServiceOrders = $Result.DefaultSelection<Prisma.$ServiceOrdersPayload>
/**
 * Model Products
 * 
 */
export type Products = $Result.DefaultSelection<Prisma.$ProductsPayload>
/**
 * Model ServiceOrdersCost
 * 
 */
export type ServiceOrdersCost = $Result.DefaultSelection<Prisma.$ServiceOrdersCostPayload>
/**
 * Model StockMovements
 * 
 */
export type StockMovements = $Result.DefaultSelection<Prisma.$StockMovementsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ServiceOrderStatus: {
  pending: 'pending',
  inProgress: 'inProgress',
  completed: 'completed',
  cancelled: 'cancelled'
};

export type ServiceOrderStatus = (typeof ServiceOrderStatus)[keyof typeof ServiceOrderStatus]


export const ReferenceType: {
  serviceOrder: 'serviceOrder',
  purchase: 'purchase'
};

export type ReferenceType = (typeof ReferenceType)[keyof typeof ReferenceType]


export const MovementType: {
  addition: 'addition',
  removal: 'removal'
};

export type MovementType = (typeof MovementType)[keyof typeof MovementType]


export const CostType: {
  stockProduct: 'stockProduct',
  externalService: 'externalService'
};

export type CostType = (typeof CostType)[keyof typeof CostType]

}

export type ServiceOrderStatus = $Enums.ServiceOrderStatus

export const ServiceOrderStatus: typeof $Enums.ServiceOrderStatus

export type ReferenceType = $Enums.ReferenceType

export const ReferenceType: typeof $Enums.ReferenceType

export type MovementType = $Enums.MovementType

export const MovementType: typeof $Enums.MovementType

export type CostType = $Enums.CostType

export const CostType: typeof $Enums.CostType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceOrders`: Exposes CRUD operations for the **ServiceOrders** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceOrders
    * const serviceOrders = await prisma.serviceOrders.findMany()
    * ```
    */
  get serviceOrders(): Prisma.ServiceOrdersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.products`: Exposes CRUD operations for the **Products** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.products.findMany()
    * ```
    */
  get products(): Prisma.ProductsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceOrdersCost`: Exposes CRUD operations for the **ServiceOrdersCost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceOrdersCosts
    * const serviceOrdersCosts = await prisma.serviceOrdersCost.findMany()
    * ```
    */
  get serviceOrdersCost(): Prisma.ServiceOrdersCostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockMovements`: Exposes CRUD operations for the **StockMovements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockMovements
    * const stockMovements = await prisma.stockMovements.findMany()
    * ```
    */
  get stockMovements(): Prisma.StockMovementsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Users: 'Users',
    ServiceOrders: 'ServiceOrders',
    Products: 'Products',
    ServiceOrdersCost: 'ServiceOrdersCost',
    StockMovements: 'StockMovements'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "serviceOrders" | "products" | "serviceOrdersCost" | "stockMovements"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      ServiceOrders: {
        payload: Prisma.$ServiceOrdersPayload<ExtArgs>
        fields: Prisma.ServiceOrdersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceOrdersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceOrdersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>
          }
          findFirst: {
            args: Prisma.ServiceOrdersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceOrdersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>
          }
          findMany: {
            args: Prisma.ServiceOrdersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>[]
          }
          create: {
            args: Prisma.ServiceOrdersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>
          }
          createMany: {
            args: Prisma.ServiceOrdersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceOrdersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>[]
          }
          delete: {
            args: Prisma.ServiceOrdersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>
          }
          update: {
            args: Prisma.ServiceOrdersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>
          }
          deleteMany: {
            args: Prisma.ServiceOrdersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceOrdersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceOrdersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>[]
          }
          upsert: {
            args: Prisma.ServiceOrdersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersPayload>
          }
          aggregate: {
            args: Prisma.ServiceOrdersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceOrders>
          }
          groupBy: {
            args: Prisma.ServiceOrdersGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceOrdersGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceOrdersCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceOrdersCountAggregateOutputType> | number
          }
        }
      }
      Products: {
        payload: Prisma.$ProductsPayload<ExtArgs>
        fields: Prisma.ProductsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>
          }
          findFirst: {
            args: Prisma.ProductsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>
          }
          findMany: {
            args: Prisma.ProductsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>[]
          }
          create: {
            args: Prisma.ProductsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>
          }
          createMany: {
            args: Prisma.ProductsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>[]
          }
          delete: {
            args: Prisma.ProductsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>
          }
          update: {
            args: Prisma.ProductsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>
          }
          deleteMany: {
            args: Prisma.ProductsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>[]
          }
          upsert: {
            args: Prisma.ProductsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductsPayload>
          }
          aggregate: {
            args: Prisma.ProductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducts>
          }
          groupBy: {
            args: Prisma.ProductsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductsCountArgs<ExtArgs>
            result: $Utils.Optional<ProductsCountAggregateOutputType> | number
          }
        }
      }
      ServiceOrdersCost: {
        payload: Prisma.$ServiceOrdersCostPayload<ExtArgs>
        fields: Prisma.ServiceOrdersCostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceOrdersCostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceOrdersCostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>
          }
          findFirst: {
            args: Prisma.ServiceOrdersCostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceOrdersCostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>
          }
          findMany: {
            args: Prisma.ServiceOrdersCostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>[]
          }
          create: {
            args: Prisma.ServiceOrdersCostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>
          }
          createMany: {
            args: Prisma.ServiceOrdersCostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceOrdersCostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>[]
          }
          delete: {
            args: Prisma.ServiceOrdersCostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>
          }
          update: {
            args: Prisma.ServiceOrdersCostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>
          }
          deleteMany: {
            args: Prisma.ServiceOrdersCostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceOrdersCostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceOrdersCostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>[]
          }
          upsert: {
            args: Prisma.ServiceOrdersCostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrdersCostPayload>
          }
          aggregate: {
            args: Prisma.ServiceOrdersCostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceOrdersCost>
          }
          groupBy: {
            args: Prisma.ServiceOrdersCostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceOrdersCostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceOrdersCostCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceOrdersCostCountAggregateOutputType> | number
          }
        }
      }
      StockMovements: {
        payload: Prisma.$StockMovementsPayload<ExtArgs>
        fields: Prisma.StockMovementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockMovementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockMovementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>
          }
          findFirst: {
            args: Prisma.StockMovementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockMovementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>
          }
          findMany: {
            args: Prisma.StockMovementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>[]
          }
          create: {
            args: Prisma.StockMovementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>
          }
          createMany: {
            args: Prisma.StockMovementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockMovementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>[]
          }
          delete: {
            args: Prisma.StockMovementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>
          }
          update: {
            args: Prisma.StockMovementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>
          }
          deleteMany: {
            args: Prisma.StockMovementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockMovementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockMovementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>[]
          }
          upsert: {
            args: Prisma.StockMovementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementsPayload>
          }
          aggregate: {
            args: Prisma.StockMovementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockMovements>
          }
          groupBy: {
            args: Prisma.StockMovementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockMovementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockMovementsCountArgs<ExtArgs>
            result: $Utils.Optional<StockMovementsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: UsersOmit
    serviceOrders?: ServiceOrdersOmit
    products?: ProductsOmit
    serviceOrdersCost?: ServiceOrdersCostOmit
    stockMovements?: StockMovementsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ServiceOrdersCountOutputType
   */

  export type ServiceOrdersCountOutputType = {
    ServiceOrdersCost: number
  }

  export type ServiceOrdersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrdersCost?: boolean | ServiceOrdersCountOutputTypeCountServiceOrdersCostArgs
  }

  // Custom InputTypes
  /**
   * ServiceOrdersCountOutputType without action
   */
  export type ServiceOrdersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCountOutputType
     */
    select?: ServiceOrdersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceOrdersCountOutputType without action
   */
  export type ServiceOrdersCountOutputTypeCountServiceOrdersCostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrdersCostWhereInput
  }


  /**
   * Count Type ProductsCountOutputType
   */

  export type ProductsCountOutputType = {
    ServiceOrdersCost: number
    StockMovements: number
  }

  export type ProductsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrdersCost?: boolean | ProductsCountOutputTypeCountServiceOrdersCostArgs
    StockMovements?: boolean | ProductsCountOutputTypeCountStockMovementsArgs
  }

  // Custom InputTypes
  /**
   * ProductsCountOutputType without action
   */
  export type ProductsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductsCountOutputType
     */
    select?: ProductsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductsCountOutputType without action
   */
  export type ProductsCountOutputTypeCountServiceOrdersCostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrdersCostWhereInput
  }

  /**
   * ProductsCountOutputType without action
   */
  export type ProductsCountOutputTypeCountStockMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    externalId: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    externalId: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    externalId: number
    name: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    externalId: string
    name: string | null
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    externalId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "name" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["users"]>

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      externalId: string
      name: string | null
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UsersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'Int'>
    readonly externalId: FieldRef<"Users", 'String'>
    readonly name: FieldRef<"Users", 'String'>
    readonly email: FieldRef<"Users", 'String'>
    readonly passwordHash: FieldRef<"Users", 'String'>
    readonly createdAt: FieldRef<"Users", 'DateTime'>
    readonly updatedAt: FieldRef<"Users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users updateManyAndReturn
   */
  export type UsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
  }


  /**
   * Model ServiceOrders
   */

  export type AggregateServiceOrders = {
    _count: ServiceOrdersCountAggregateOutputType | null
    _avg: ServiceOrdersAvgAggregateOutputType | null
    _sum: ServiceOrdersSumAggregateOutputType | null
    _min: ServiceOrdersMinAggregateOutputType | null
    _max: ServiceOrdersMaxAggregateOutputType | null
  }

  export type ServiceOrdersAvgAggregateOutputType = {
    id: number | null
    price: Decimal | null
  }

  export type ServiceOrdersSumAggregateOutputType = {
    id: number | null
    price: Decimal | null
  }

  export type ServiceOrdersMinAggregateOutputType = {
    id: number | null
    externalId: string | null
    customerName: string | null
    customerContact: string | null
    price: Decimal | null
    description: string | null
    status: $Enums.ServiceOrderStatus | null
    completionDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceOrdersMaxAggregateOutputType = {
    id: number | null
    externalId: string | null
    customerName: string | null
    customerContact: string | null
    price: Decimal | null
    description: string | null
    status: $Enums.ServiceOrderStatus | null
    completionDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceOrdersCountAggregateOutputType = {
    id: number
    externalId: number
    customerName: number
    customerContact: number
    price: number
    description: number
    status: number
    completionDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceOrdersAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type ServiceOrdersSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type ServiceOrdersMinAggregateInputType = {
    id?: true
    externalId?: true
    customerName?: true
    customerContact?: true
    price?: true
    description?: true
    status?: true
    completionDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceOrdersMaxAggregateInputType = {
    id?: true
    externalId?: true
    customerName?: true
    customerContact?: true
    price?: true
    description?: true
    status?: true
    completionDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceOrdersCountAggregateInputType = {
    id?: true
    externalId?: true
    customerName?: true
    customerContact?: true
    price?: true
    description?: true
    status?: true
    completionDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceOrdersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceOrders to aggregate.
     */
    where?: ServiceOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrdersOrderByWithRelationInput | ServiceOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceOrders
    **/
    _count?: true | ServiceOrdersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceOrdersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceOrdersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceOrdersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceOrdersMaxAggregateInputType
  }

  export type GetServiceOrdersAggregateType<T extends ServiceOrdersAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceOrders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceOrders[P]>
      : GetScalarType<T[P], AggregateServiceOrders[P]>
  }




  export type ServiceOrdersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrdersWhereInput
    orderBy?: ServiceOrdersOrderByWithAggregationInput | ServiceOrdersOrderByWithAggregationInput[]
    by: ServiceOrdersScalarFieldEnum[] | ServiceOrdersScalarFieldEnum
    having?: ServiceOrdersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceOrdersCountAggregateInputType | true
    _avg?: ServiceOrdersAvgAggregateInputType
    _sum?: ServiceOrdersSumAggregateInputType
    _min?: ServiceOrdersMinAggregateInputType
    _max?: ServiceOrdersMaxAggregateInputType
  }

  export type ServiceOrdersGroupByOutputType = {
    id: number
    externalId: string
    customerName: string
    customerContact: string
    price: Decimal
    description: string
    status: $Enums.ServiceOrderStatus
    completionDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceOrdersCountAggregateOutputType | null
    _avg: ServiceOrdersAvgAggregateOutputType | null
    _sum: ServiceOrdersSumAggregateOutputType | null
    _min: ServiceOrdersMinAggregateOutputType | null
    _max: ServiceOrdersMaxAggregateOutputType | null
  }

  type GetServiceOrdersGroupByPayload<T extends ServiceOrdersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceOrdersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceOrdersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceOrdersGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceOrdersGroupByOutputType[P]>
        }
      >
    >


  export type ServiceOrdersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    customerName?: boolean
    customerContact?: boolean
    price?: boolean
    description?: boolean
    status?: boolean
    completionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ServiceOrdersCost?: boolean | ServiceOrders$ServiceOrdersCostArgs<ExtArgs>
    _count?: boolean | ServiceOrdersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrders"]>

  export type ServiceOrdersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    customerName?: boolean
    customerContact?: boolean
    price?: boolean
    description?: boolean
    status?: boolean
    completionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceOrders"]>

  export type ServiceOrdersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    customerName?: boolean
    customerContact?: boolean
    price?: boolean
    description?: boolean
    status?: boolean
    completionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceOrders"]>

  export type ServiceOrdersSelectScalar = {
    id?: boolean
    externalId?: boolean
    customerName?: boolean
    customerContact?: boolean
    price?: boolean
    description?: boolean
    status?: boolean
    completionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOrdersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "customerName" | "customerContact" | "price" | "description" | "status" | "completionDate" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceOrders"]>
  export type ServiceOrdersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrdersCost?: boolean | ServiceOrders$ServiceOrdersCostArgs<ExtArgs>
    _count?: boolean | ServiceOrdersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceOrdersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceOrdersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceOrdersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceOrders"
    objects: {
      ServiceOrdersCost: Prisma.$ServiceOrdersCostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      externalId: string
      customerName: string
      customerContact: string
      price: Prisma.Decimal
      description: string
      status: $Enums.ServiceOrderStatus
      completionDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceOrders"]>
    composites: {}
  }

  type ServiceOrdersGetPayload<S extends boolean | null | undefined | ServiceOrdersDefaultArgs> = $Result.GetResult<Prisma.$ServiceOrdersPayload, S>

  type ServiceOrdersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceOrdersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceOrdersCountAggregateInputType | true
    }

  export interface ServiceOrdersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceOrders'], meta: { name: 'ServiceOrders' } }
    /**
     * Find zero or one ServiceOrders that matches the filter.
     * @param {ServiceOrdersFindUniqueArgs} args - Arguments to find a ServiceOrders
     * @example
     * // Get one ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceOrdersFindUniqueArgs>(args: SelectSubset<T, ServiceOrdersFindUniqueArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceOrders that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceOrdersFindUniqueOrThrowArgs} args - Arguments to find a ServiceOrders
     * @example
     * // Get one ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceOrdersFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceOrdersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersFindFirstArgs} args - Arguments to find a ServiceOrders
     * @example
     * // Get one ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceOrdersFindFirstArgs>(args?: SelectSubset<T, ServiceOrdersFindFirstArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceOrders that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersFindFirstOrThrowArgs} args - Arguments to find a ServiceOrders
     * @example
     * // Get one ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceOrdersFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceOrdersFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.findMany()
     * 
     * // Get first 10 ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceOrdersWithIdOnly = await prisma.serviceOrders.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceOrdersFindManyArgs>(args?: SelectSubset<T, ServiceOrdersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceOrders.
     * @param {ServiceOrdersCreateArgs} args - Arguments to create a ServiceOrders.
     * @example
     * // Create one ServiceOrders
     * const ServiceOrders = await prisma.serviceOrders.create({
     *   data: {
     *     // ... data to create a ServiceOrders
     *   }
     * })
     * 
     */
    create<T extends ServiceOrdersCreateArgs>(args: SelectSubset<T, ServiceOrdersCreateArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceOrders.
     * @param {ServiceOrdersCreateManyArgs} args - Arguments to create many ServiceOrders.
     * @example
     * // Create many ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceOrdersCreateManyArgs>(args?: SelectSubset<T, ServiceOrdersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceOrders and returns the data saved in the database.
     * @param {ServiceOrdersCreateManyAndReturnArgs} args - Arguments to create many ServiceOrders.
     * @example
     * // Create many ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceOrders and only return the `id`
     * const serviceOrdersWithIdOnly = await prisma.serviceOrders.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceOrdersCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceOrdersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceOrders.
     * @param {ServiceOrdersDeleteArgs} args - Arguments to delete one ServiceOrders.
     * @example
     * // Delete one ServiceOrders
     * const ServiceOrders = await prisma.serviceOrders.delete({
     *   where: {
     *     // ... filter to delete one ServiceOrders
     *   }
     * })
     * 
     */
    delete<T extends ServiceOrdersDeleteArgs>(args: SelectSubset<T, ServiceOrdersDeleteArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceOrders.
     * @param {ServiceOrdersUpdateArgs} args - Arguments to update one ServiceOrders.
     * @example
     * // Update one ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceOrdersUpdateArgs>(args: SelectSubset<T, ServiceOrdersUpdateArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceOrders.
     * @param {ServiceOrdersDeleteManyArgs} args - Arguments to filter ServiceOrders to delete.
     * @example
     * // Delete a few ServiceOrders
     * const { count } = await prisma.serviceOrders.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceOrdersDeleteManyArgs>(args?: SelectSubset<T, ServiceOrdersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceOrdersUpdateManyArgs>(args: SelectSubset<T, ServiceOrdersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceOrders and returns the data updated in the database.
     * @param {ServiceOrdersUpdateManyAndReturnArgs} args - Arguments to update many ServiceOrders.
     * @example
     * // Update many ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceOrders and only return the `id`
     * const serviceOrdersWithIdOnly = await prisma.serviceOrders.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceOrdersUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceOrdersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceOrders.
     * @param {ServiceOrdersUpsertArgs} args - Arguments to update or create a ServiceOrders.
     * @example
     * // Update or create a ServiceOrders
     * const serviceOrders = await prisma.serviceOrders.upsert({
     *   create: {
     *     // ... data to create a ServiceOrders
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceOrders we want to update
     *   }
     * })
     */
    upsert<T extends ServiceOrdersUpsertArgs>(args: SelectSubset<T, ServiceOrdersUpsertArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCountArgs} args - Arguments to filter ServiceOrders to count.
     * @example
     * // Count the number of ServiceOrders
     * const count = await prisma.serviceOrders.count({
     *   where: {
     *     // ... the filter for the ServiceOrders we want to count
     *   }
     * })
    **/
    count<T extends ServiceOrdersCountArgs>(
      args?: Subset<T, ServiceOrdersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceOrdersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceOrdersAggregateArgs>(args: Subset<T, ServiceOrdersAggregateArgs>): Prisma.PrismaPromise<GetServiceOrdersAggregateType<T>>

    /**
     * Group by ServiceOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceOrdersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceOrdersGroupByArgs['orderBy'] }
        : { orderBy?: ServiceOrdersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceOrdersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceOrdersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceOrders model
   */
  readonly fields: ServiceOrdersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceOrders.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceOrdersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ServiceOrdersCost<T extends ServiceOrders$ServiceOrdersCostArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrders$ServiceOrdersCostArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceOrders model
   */
  interface ServiceOrdersFieldRefs {
    readonly id: FieldRef<"ServiceOrders", 'Int'>
    readonly externalId: FieldRef<"ServiceOrders", 'String'>
    readonly customerName: FieldRef<"ServiceOrders", 'String'>
    readonly customerContact: FieldRef<"ServiceOrders", 'String'>
    readonly price: FieldRef<"ServiceOrders", 'Decimal'>
    readonly description: FieldRef<"ServiceOrders", 'String'>
    readonly status: FieldRef<"ServiceOrders", 'ServiceOrderStatus'>
    readonly completionDate: FieldRef<"ServiceOrders", 'DateTime'>
    readonly createdAt: FieldRef<"ServiceOrders", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceOrders", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceOrders findUnique
   */
  export type ServiceOrdersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrders to fetch.
     */
    where: ServiceOrdersWhereUniqueInput
  }

  /**
   * ServiceOrders findUniqueOrThrow
   */
  export type ServiceOrdersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrders to fetch.
     */
    where: ServiceOrdersWhereUniqueInput
  }

  /**
   * ServiceOrders findFirst
   */
  export type ServiceOrdersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrders to fetch.
     */
    where?: ServiceOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrdersOrderByWithRelationInput | ServiceOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceOrders.
     */
    cursor?: ServiceOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrders.
     */
    distinct?: ServiceOrdersScalarFieldEnum | ServiceOrdersScalarFieldEnum[]
  }

  /**
   * ServiceOrders findFirstOrThrow
   */
  export type ServiceOrdersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrders to fetch.
     */
    where?: ServiceOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrdersOrderByWithRelationInput | ServiceOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceOrders.
     */
    cursor?: ServiceOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrders.
     */
    distinct?: ServiceOrdersScalarFieldEnum | ServiceOrdersScalarFieldEnum[]
  }

  /**
   * ServiceOrders findMany
   */
  export type ServiceOrdersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrders to fetch.
     */
    where?: ServiceOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrdersOrderByWithRelationInput | ServiceOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceOrders.
     */
    cursor?: ServiceOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    distinct?: ServiceOrdersScalarFieldEnum | ServiceOrdersScalarFieldEnum[]
  }

  /**
   * ServiceOrders create
   */
  export type ServiceOrdersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceOrders.
     */
    data: XOR<ServiceOrdersCreateInput, ServiceOrdersUncheckedCreateInput>
  }

  /**
   * ServiceOrders createMany
   */
  export type ServiceOrdersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceOrders.
     */
    data: ServiceOrdersCreateManyInput | ServiceOrdersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceOrders createManyAndReturn
   */
  export type ServiceOrdersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceOrders.
     */
    data: ServiceOrdersCreateManyInput | ServiceOrdersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceOrders update
   */
  export type ServiceOrdersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceOrders.
     */
    data: XOR<ServiceOrdersUpdateInput, ServiceOrdersUncheckedUpdateInput>
    /**
     * Choose, which ServiceOrders to update.
     */
    where: ServiceOrdersWhereUniqueInput
  }

  /**
   * ServiceOrders updateMany
   */
  export type ServiceOrdersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceOrders.
     */
    data: XOR<ServiceOrdersUpdateManyMutationInput, ServiceOrdersUncheckedUpdateManyInput>
    /**
     * Filter which ServiceOrders to update
     */
    where?: ServiceOrdersWhereInput
    /**
     * Limit how many ServiceOrders to update.
     */
    limit?: number
  }

  /**
   * ServiceOrders updateManyAndReturn
   */
  export type ServiceOrdersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * The data used to update ServiceOrders.
     */
    data: XOR<ServiceOrdersUpdateManyMutationInput, ServiceOrdersUncheckedUpdateManyInput>
    /**
     * Filter which ServiceOrders to update
     */
    where?: ServiceOrdersWhereInput
    /**
     * Limit how many ServiceOrders to update.
     */
    limit?: number
  }

  /**
   * ServiceOrders upsert
   */
  export type ServiceOrdersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceOrders to update in case it exists.
     */
    where: ServiceOrdersWhereUniqueInput
    /**
     * In case the ServiceOrders found by the `where` argument doesn't exist, create a new ServiceOrders with this data.
     */
    create: XOR<ServiceOrdersCreateInput, ServiceOrdersUncheckedCreateInput>
    /**
     * In case the ServiceOrders was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceOrdersUpdateInput, ServiceOrdersUncheckedUpdateInput>
  }

  /**
   * ServiceOrders delete
   */
  export type ServiceOrdersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
    /**
     * Filter which ServiceOrders to delete.
     */
    where: ServiceOrdersWhereUniqueInput
  }

  /**
   * ServiceOrders deleteMany
   */
  export type ServiceOrdersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceOrders to delete
     */
    where?: ServiceOrdersWhereInput
    /**
     * Limit how many ServiceOrders to delete.
     */
    limit?: number
  }

  /**
   * ServiceOrders.ServiceOrdersCost
   */
  export type ServiceOrders$ServiceOrdersCostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    where?: ServiceOrdersCostWhereInput
    orderBy?: ServiceOrdersCostOrderByWithRelationInput | ServiceOrdersCostOrderByWithRelationInput[]
    cursor?: ServiceOrdersCostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceOrdersCostScalarFieldEnum | ServiceOrdersCostScalarFieldEnum[]
  }

  /**
   * ServiceOrders without action
   */
  export type ServiceOrdersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrders
     */
    select?: ServiceOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrders
     */
    omit?: ServiceOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersInclude<ExtArgs> | null
  }


  /**
   * Model Products
   */

  export type AggregateProducts = {
    _count: ProductsCountAggregateOutputType | null
    _avg: ProductsAvgAggregateOutputType | null
    _sum: ProductsSumAggregateOutputType | null
    _min: ProductsMinAggregateOutputType | null
    _max: ProductsMaxAggregateOutputType | null
  }

  export type ProductsAvgAggregateOutputType = {
    id: number | null
    stockQuantity: number | null
    unitPrice: Decimal | null
  }

  export type ProductsSumAggregateOutputType = {
    id: number | null
    stockQuantity: number | null
    unitPrice: Decimal | null
  }

  export type ProductsMinAggregateOutputType = {
    id: number | null
    externalId: string | null
    name: string | null
    stockQuantity: number | null
    unitPrice: Decimal | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductsMaxAggregateOutputType = {
    id: number | null
    externalId: string | null
    name: string | null
    stockQuantity: number | null
    unitPrice: Decimal | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductsCountAggregateOutputType = {
    id: number
    externalId: number
    name: number
    stockQuantity: number
    unitPrice: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductsAvgAggregateInputType = {
    id?: true
    stockQuantity?: true
    unitPrice?: true
  }

  export type ProductsSumAggregateInputType = {
    id?: true
    stockQuantity?: true
    unitPrice?: true
  }

  export type ProductsMinAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    stockQuantity?: true
    unitPrice?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductsMaxAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    stockQuantity?: true
    unitPrice?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductsCountAggregateInputType = {
    id?: true
    externalId?: true
    name?: true
    stockQuantity?: true
    unitPrice?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to aggregate.
     */
    where?: ProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductsOrderByWithRelationInput | ProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductsMaxAggregateInputType
  }

  export type GetProductsAggregateType<T extends ProductsAggregateArgs> = {
        [P in keyof T & keyof AggregateProducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducts[P]>
      : GetScalarType<T[P], AggregateProducts[P]>
  }




  export type ProductsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductsWhereInput
    orderBy?: ProductsOrderByWithAggregationInput | ProductsOrderByWithAggregationInput[]
    by: ProductsScalarFieldEnum[] | ProductsScalarFieldEnum
    having?: ProductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductsCountAggregateInputType | true
    _avg?: ProductsAvgAggregateInputType
    _sum?: ProductsSumAggregateInputType
    _min?: ProductsMinAggregateInputType
    _max?: ProductsMaxAggregateInputType
  }

  export type ProductsGroupByOutputType = {
    id: number
    externalId: string
    name: string
    stockQuantity: number
    unitPrice: Decimal
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductsCountAggregateOutputType | null
    _avg: ProductsAvgAggregateOutputType | null
    _sum: ProductsSumAggregateOutputType | null
    _min: ProductsMinAggregateOutputType | null
    _max: ProductsMaxAggregateOutputType | null
  }

  type GetProductsGroupByPayload<T extends ProductsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductsGroupByOutputType[P]>
            : GetScalarType<T[P], ProductsGroupByOutputType[P]>
        }
      >
    >


  export type ProductsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    stockQuantity?: boolean
    unitPrice?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ServiceOrdersCost?: boolean | Products$ServiceOrdersCostArgs<ExtArgs>
    StockMovements?: boolean | Products$StockMovementsArgs<ExtArgs>
    _count?: boolean | ProductsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["products"]>

  export type ProductsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    stockQuantity?: boolean
    unitPrice?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["products"]>

  export type ProductsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    name?: boolean
    stockQuantity?: boolean
    unitPrice?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["products"]>

  export type ProductsSelectScalar = {
    id?: boolean
    externalId?: boolean
    name?: boolean
    stockQuantity?: boolean
    unitPrice?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "name" | "stockQuantity" | "unitPrice" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["products"]>
  export type ProductsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrdersCost?: boolean | Products$ServiceOrdersCostArgs<ExtArgs>
    StockMovements?: boolean | Products$StockMovementsArgs<ExtArgs>
    _count?: boolean | ProductsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Products"
    objects: {
      ServiceOrdersCost: Prisma.$ServiceOrdersCostPayload<ExtArgs>[]
      StockMovements: Prisma.$StockMovementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      externalId: string
      name: string
      stockQuantity: number
      unitPrice: Prisma.Decimal
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["products"]>
    composites: {}
  }

  type ProductsGetPayload<S extends boolean | null | undefined | ProductsDefaultArgs> = $Result.GetResult<Prisma.$ProductsPayload, S>

  type ProductsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductsCountAggregateInputType | true
    }

  export interface ProductsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Products'], meta: { name: 'Products' } }
    /**
     * Find zero or one Products that matches the filter.
     * @param {ProductsFindUniqueArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductsFindUniqueArgs>(args: SelectSubset<T, ProductsFindUniqueArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Products that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductsFindUniqueOrThrowArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductsFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsFindFirstArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductsFindFirstArgs>(args?: SelectSubset<T, ProductsFindFirstArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Products that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsFindFirstOrThrowArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductsFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.products.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.products.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productsWithIdOnly = await prisma.products.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductsFindManyArgs>(args?: SelectSubset<T, ProductsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Products.
     * @param {ProductsCreateArgs} args - Arguments to create a Products.
     * @example
     * // Create one Products
     * const Products = await prisma.products.create({
     *   data: {
     *     // ... data to create a Products
     *   }
     * })
     * 
     */
    create<T extends ProductsCreateArgs>(args: SelectSubset<T, ProductsCreateArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductsCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const products = await prisma.products.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductsCreateManyArgs>(args?: SelectSubset<T, ProductsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductsCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const products = await prisma.products.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productsWithIdOnly = await prisma.products.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductsCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Products.
     * @param {ProductsDeleteArgs} args - Arguments to delete one Products.
     * @example
     * // Delete one Products
     * const Products = await prisma.products.delete({
     *   where: {
     *     // ... filter to delete one Products
     *   }
     * })
     * 
     */
    delete<T extends ProductsDeleteArgs>(args: SelectSubset<T, ProductsDeleteArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Products.
     * @param {ProductsUpdateArgs} args - Arguments to update one Products.
     * @example
     * // Update one Products
     * const products = await prisma.products.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductsUpdateArgs>(args: SelectSubset<T, ProductsUpdateArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductsDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.products.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductsDeleteManyArgs>(args?: SelectSubset<T, ProductsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const products = await prisma.products.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductsUpdateManyArgs>(args: SelectSubset<T, ProductsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductsUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const products = await prisma.products.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productsWithIdOnly = await prisma.products.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductsUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Products.
     * @param {ProductsUpsertArgs} args - Arguments to update or create a Products.
     * @example
     * // Update or create a Products
     * const products = await prisma.products.upsert({
     *   create: {
     *     // ... data to create a Products
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Products we want to update
     *   }
     * })
     */
    upsert<T extends ProductsUpsertArgs>(args: SelectSubset<T, ProductsUpsertArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.products.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductsCountArgs>(
      args?: Subset<T, ProductsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductsAggregateArgs>(args: Subset<T, ProductsAggregateArgs>): Prisma.PrismaPromise<GetProductsAggregateType<T>>

    /**
     * Group by Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductsGroupByArgs['orderBy'] }
        : { orderBy?: ProductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Products model
   */
  readonly fields: ProductsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Products.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ServiceOrdersCost<T extends Products$ServiceOrdersCostArgs<ExtArgs> = {}>(args?: Subset<T, Products$ServiceOrdersCostArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    StockMovements<T extends Products$StockMovementsArgs<ExtArgs> = {}>(args?: Subset<T, Products$StockMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Products model
   */
  interface ProductsFieldRefs {
    readonly id: FieldRef<"Products", 'Int'>
    readonly externalId: FieldRef<"Products", 'String'>
    readonly name: FieldRef<"Products", 'String'>
    readonly stockQuantity: FieldRef<"Products", 'Int'>
    readonly unitPrice: FieldRef<"Products", 'Decimal'>
    readonly description: FieldRef<"Products", 'String'>
    readonly createdAt: FieldRef<"Products", 'DateTime'>
    readonly updatedAt: FieldRef<"Products", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Products findUnique
   */
  export type ProductsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where: ProductsWhereUniqueInput
  }

  /**
   * Products findUniqueOrThrow
   */
  export type ProductsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where: ProductsWhereUniqueInput
  }

  /**
   * Products findFirst
   */
  export type ProductsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductsOrderByWithRelationInput | ProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * Products findFirstOrThrow
   */
  export type ProductsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductsOrderByWithRelationInput | ProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * Products findMany
   */
  export type ProductsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductsOrderByWithRelationInput | ProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * Products create
   */
  export type ProductsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * The data needed to create a Products.
     */
    data: XOR<ProductsCreateInput, ProductsUncheckedCreateInput>
  }

  /**
   * Products createMany
   */
  export type ProductsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductsCreateManyInput | ProductsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Products createManyAndReturn
   */
  export type ProductsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductsCreateManyInput | ProductsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Products update
   */
  export type ProductsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * The data needed to update a Products.
     */
    data: XOR<ProductsUpdateInput, ProductsUncheckedUpdateInput>
    /**
     * Choose, which Products to update.
     */
    where: ProductsWhereUniqueInput
  }

  /**
   * Products updateMany
   */
  export type ProductsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductsUpdateManyMutationInput, ProductsUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductsWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Products updateManyAndReturn
   */
  export type ProductsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductsUpdateManyMutationInput, ProductsUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductsWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Products upsert
   */
  export type ProductsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * The filter to search for the Products to update in case it exists.
     */
    where: ProductsWhereUniqueInput
    /**
     * In case the Products found by the `where` argument doesn't exist, create a new Products with this data.
     */
    create: XOR<ProductsCreateInput, ProductsUncheckedCreateInput>
    /**
     * In case the Products was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductsUpdateInput, ProductsUncheckedUpdateInput>
  }

  /**
   * Products delete
   */
  export type ProductsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    /**
     * Filter which Products to delete.
     */
    where: ProductsWhereUniqueInput
  }

  /**
   * Products deleteMany
   */
  export type ProductsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductsWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Products.ServiceOrdersCost
   */
  export type Products$ServiceOrdersCostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    where?: ServiceOrdersCostWhereInput
    orderBy?: ServiceOrdersCostOrderByWithRelationInput | ServiceOrdersCostOrderByWithRelationInput[]
    cursor?: ServiceOrdersCostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceOrdersCostScalarFieldEnum | ServiceOrdersCostScalarFieldEnum[]
  }

  /**
   * Products.StockMovements
   */
  export type Products$StockMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    where?: StockMovementsWhereInput
    orderBy?: StockMovementsOrderByWithRelationInput | StockMovementsOrderByWithRelationInput[]
    cursor?: StockMovementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementsScalarFieldEnum | StockMovementsScalarFieldEnum[]
  }

  /**
   * Products without action
   */
  export type ProductsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
  }


  /**
   * Model ServiceOrdersCost
   */

  export type AggregateServiceOrdersCost = {
    _count: ServiceOrdersCostCountAggregateOutputType | null
    _avg: ServiceOrdersCostAvgAggregateOutputType | null
    _sum: ServiceOrdersCostSumAggregateOutputType | null
    _min: ServiceOrdersCostMinAggregateOutputType | null
    _max: ServiceOrdersCostMaxAggregateOutputType | null
  }

  export type ServiceOrdersCostAvgAggregateOutputType = {
    id: number | null
    serviceOrderId: number | null
    productId: number | null
    value: Decimal | null
    quantity: number | null
  }

  export type ServiceOrdersCostSumAggregateOutputType = {
    id: number | null
    serviceOrderId: number | null
    productId: number | null
    value: Decimal | null
    quantity: number | null
  }

  export type ServiceOrdersCostMinAggregateOutputType = {
    id: number | null
    serviceOrderId: number | null
    productId: number | null
    description: string | null
    value: Decimal | null
    quantity: number | null
    type: $Enums.CostType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceOrdersCostMaxAggregateOutputType = {
    id: number | null
    serviceOrderId: number | null
    productId: number | null
    description: string | null
    value: Decimal | null
    quantity: number | null
    type: $Enums.CostType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceOrdersCostCountAggregateOutputType = {
    id: number
    serviceOrderId: number
    productId: number
    description: number
    value: number
    quantity: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceOrdersCostAvgAggregateInputType = {
    id?: true
    serviceOrderId?: true
    productId?: true
    value?: true
    quantity?: true
  }

  export type ServiceOrdersCostSumAggregateInputType = {
    id?: true
    serviceOrderId?: true
    productId?: true
    value?: true
    quantity?: true
  }

  export type ServiceOrdersCostMinAggregateInputType = {
    id?: true
    serviceOrderId?: true
    productId?: true
    description?: true
    value?: true
    quantity?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceOrdersCostMaxAggregateInputType = {
    id?: true
    serviceOrderId?: true
    productId?: true
    description?: true
    value?: true
    quantity?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceOrdersCostCountAggregateInputType = {
    id?: true
    serviceOrderId?: true
    productId?: true
    description?: true
    value?: true
    quantity?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceOrdersCostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceOrdersCost to aggregate.
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrdersCosts to fetch.
     */
    orderBy?: ServiceOrdersCostOrderByWithRelationInput | ServiceOrdersCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceOrdersCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrdersCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrdersCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceOrdersCosts
    **/
    _count?: true | ServiceOrdersCostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceOrdersCostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceOrdersCostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceOrdersCostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceOrdersCostMaxAggregateInputType
  }

  export type GetServiceOrdersCostAggregateType<T extends ServiceOrdersCostAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceOrdersCost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceOrdersCost[P]>
      : GetScalarType<T[P], AggregateServiceOrdersCost[P]>
  }




  export type ServiceOrdersCostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrdersCostWhereInput
    orderBy?: ServiceOrdersCostOrderByWithAggregationInput | ServiceOrdersCostOrderByWithAggregationInput[]
    by: ServiceOrdersCostScalarFieldEnum[] | ServiceOrdersCostScalarFieldEnum
    having?: ServiceOrdersCostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceOrdersCostCountAggregateInputType | true
    _avg?: ServiceOrdersCostAvgAggregateInputType
    _sum?: ServiceOrdersCostSumAggregateInputType
    _min?: ServiceOrdersCostMinAggregateInputType
    _max?: ServiceOrdersCostMaxAggregateInputType
  }

  export type ServiceOrdersCostGroupByOutputType = {
    id: number
    serviceOrderId: number
    productId: number | null
    description: string
    value: Decimal
    quantity: number
    type: $Enums.CostType
    createdAt: Date
    updatedAt: Date
    _count: ServiceOrdersCostCountAggregateOutputType | null
    _avg: ServiceOrdersCostAvgAggregateOutputType | null
    _sum: ServiceOrdersCostSumAggregateOutputType | null
    _min: ServiceOrdersCostMinAggregateOutputType | null
    _max: ServiceOrdersCostMaxAggregateOutputType | null
  }

  type GetServiceOrdersCostGroupByPayload<T extends ServiceOrdersCostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceOrdersCostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceOrdersCostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceOrdersCostGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceOrdersCostGroupByOutputType[P]>
        }
      >
    >


  export type ServiceOrdersCostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    productId?: boolean
    description?: boolean
    value?: boolean
    quantity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ServiceOrder?: boolean | ServiceOrdersDefaultArgs<ExtArgs>
    Product?: boolean | ServiceOrdersCost$ProductArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrdersCost"]>

  export type ServiceOrdersCostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    productId?: boolean
    description?: boolean
    value?: boolean
    quantity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ServiceOrder?: boolean | ServiceOrdersDefaultArgs<ExtArgs>
    Product?: boolean | ServiceOrdersCost$ProductArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrdersCost"]>

  export type ServiceOrdersCostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    productId?: boolean
    description?: boolean
    value?: boolean
    quantity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ServiceOrder?: boolean | ServiceOrdersDefaultArgs<ExtArgs>
    Product?: boolean | ServiceOrdersCost$ProductArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrdersCost"]>

  export type ServiceOrdersCostSelectScalar = {
    id?: boolean
    serviceOrderId?: boolean
    productId?: boolean
    description?: boolean
    value?: boolean
    quantity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOrdersCostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceOrderId" | "productId" | "description" | "value" | "quantity" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceOrdersCost"]>
  export type ServiceOrdersCostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrder?: boolean | ServiceOrdersDefaultArgs<ExtArgs>
    Product?: boolean | ServiceOrdersCost$ProductArgs<ExtArgs>
  }
  export type ServiceOrdersCostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrder?: boolean | ServiceOrdersDefaultArgs<ExtArgs>
    Product?: boolean | ServiceOrdersCost$ProductArgs<ExtArgs>
  }
  export type ServiceOrdersCostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceOrder?: boolean | ServiceOrdersDefaultArgs<ExtArgs>
    Product?: boolean | ServiceOrdersCost$ProductArgs<ExtArgs>
  }

  export type $ServiceOrdersCostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceOrdersCost"
    objects: {
      ServiceOrder: Prisma.$ServiceOrdersPayload<ExtArgs>
      Product: Prisma.$ProductsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serviceOrderId: number
      productId: number | null
      description: string
      value: Prisma.Decimal
      quantity: number
      type: $Enums.CostType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceOrdersCost"]>
    composites: {}
  }

  type ServiceOrdersCostGetPayload<S extends boolean | null | undefined | ServiceOrdersCostDefaultArgs> = $Result.GetResult<Prisma.$ServiceOrdersCostPayload, S>

  type ServiceOrdersCostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceOrdersCostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceOrdersCostCountAggregateInputType | true
    }

  export interface ServiceOrdersCostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceOrdersCost'], meta: { name: 'ServiceOrdersCost' } }
    /**
     * Find zero or one ServiceOrdersCost that matches the filter.
     * @param {ServiceOrdersCostFindUniqueArgs} args - Arguments to find a ServiceOrdersCost
     * @example
     * // Get one ServiceOrdersCost
     * const serviceOrdersCost = await prisma.serviceOrdersCost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceOrdersCostFindUniqueArgs>(args: SelectSubset<T, ServiceOrdersCostFindUniqueArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceOrdersCost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceOrdersCostFindUniqueOrThrowArgs} args - Arguments to find a ServiceOrdersCost
     * @example
     * // Get one ServiceOrdersCost
     * const serviceOrdersCost = await prisma.serviceOrdersCost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceOrdersCostFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceOrdersCostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceOrdersCost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostFindFirstArgs} args - Arguments to find a ServiceOrdersCost
     * @example
     * // Get one ServiceOrdersCost
     * const serviceOrdersCost = await prisma.serviceOrdersCost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceOrdersCostFindFirstArgs>(args?: SelectSubset<T, ServiceOrdersCostFindFirstArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceOrdersCost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostFindFirstOrThrowArgs} args - Arguments to find a ServiceOrdersCost
     * @example
     * // Get one ServiceOrdersCost
     * const serviceOrdersCost = await prisma.serviceOrdersCost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceOrdersCostFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceOrdersCostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceOrdersCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceOrdersCosts
     * const serviceOrdersCosts = await prisma.serviceOrdersCost.findMany()
     * 
     * // Get first 10 ServiceOrdersCosts
     * const serviceOrdersCosts = await prisma.serviceOrdersCost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceOrdersCostWithIdOnly = await prisma.serviceOrdersCost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceOrdersCostFindManyArgs>(args?: SelectSubset<T, ServiceOrdersCostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceOrdersCost.
     * @param {ServiceOrdersCostCreateArgs} args - Arguments to create a ServiceOrdersCost.
     * @example
     * // Create one ServiceOrdersCost
     * const ServiceOrdersCost = await prisma.serviceOrdersCost.create({
     *   data: {
     *     // ... data to create a ServiceOrdersCost
     *   }
     * })
     * 
     */
    create<T extends ServiceOrdersCostCreateArgs>(args: SelectSubset<T, ServiceOrdersCostCreateArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceOrdersCosts.
     * @param {ServiceOrdersCostCreateManyArgs} args - Arguments to create many ServiceOrdersCosts.
     * @example
     * // Create many ServiceOrdersCosts
     * const serviceOrdersCost = await prisma.serviceOrdersCost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceOrdersCostCreateManyArgs>(args?: SelectSubset<T, ServiceOrdersCostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceOrdersCosts and returns the data saved in the database.
     * @param {ServiceOrdersCostCreateManyAndReturnArgs} args - Arguments to create many ServiceOrdersCosts.
     * @example
     * // Create many ServiceOrdersCosts
     * const serviceOrdersCost = await prisma.serviceOrdersCost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceOrdersCosts and only return the `id`
     * const serviceOrdersCostWithIdOnly = await prisma.serviceOrdersCost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceOrdersCostCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceOrdersCostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceOrdersCost.
     * @param {ServiceOrdersCostDeleteArgs} args - Arguments to delete one ServiceOrdersCost.
     * @example
     * // Delete one ServiceOrdersCost
     * const ServiceOrdersCost = await prisma.serviceOrdersCost.delete({
     *   where: {
     *     // ... filter to delete one ServiceOrdersCost
     *   }
     * })
     * 
     */
    delete<T extends ServiceOrdersCostDeleteArgs>(args: SelectSubset<T, ServiceOrdersCostDeleteArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceOrdersCost.
     * @param {ServiceOrdersCostUpdateArgs} args - Arguments to update one ServiceOrdersCost.
     * @example
     * // Update one ServiceOrdersCost
     * const serviceOrdersCost = await prisma.serviceOrdersCost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceOrdersCostUpdateArgs>(args: SelectSubset<T, ServiceOrdersCostUpdateArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceOrdersCosts.
     * @param {ServiceOrdersCostDeleteManyArgs} args - Arguments to filter ServiceOrdersCosts to delete.
     * @example
     * // Delete a few ServiceOrdersCosts
     * const { count } = await prisma.serviceOrdersCost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceOrdersCostDeleteManyArgs>(args?: SelectSubset<T, ServiceOrdersCostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceOrdersCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceOrdersCosts
     * const serviceOrdersCost = await prisma.serviceOrdersCost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceOrdersCostUpdateManyArgs>(args: SelectSubset<T, ServiceOrdersCostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceOrdersCosts and returns the data updated in the database.
     * @param {ServiceOrdersCostUpdateManyAndReturnArgs} args - Arguments to update many ServiceOrdersCosts.
     * @example
     * // Update many ServiceOrdersCosts
     * const serviceOrdersCost = await prisma.serviceOrdersCost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceOrdersCosts and only return the `id`
     * const serviceOrdersCostWithIdOnly = await prisma.serviceOrdersCost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceOrdersCostUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceOrdersCostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceOrdersCost.
     * @param {ServiceOrdersCostUpsertArgs} args - Arguments to update or create a ServiceOrdersCost.
     * @example
     * // Update or create a ServiceOrdersCost
     * const serviceOrdersCost = await prisma.serviceOrdersCost.upsert({
     *   create: {
     *     // ... data to create a ServiceOrdersCost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceOrdersCost we want to update
     *   }
     * })
     */
    upsert<T extends ServiceOrdersCostUpsertArgs>(args: SelectSubset<T, ServiceOrdersCostUpsertArgs<ExtArgs>>): Prisma__ServiceOrdersCostClient<$Result.GetResult<Prisma.$ServiceOrdersCostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceOrdersCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostCountArgs} args - Arguments to filter ServiceOrdersCosts to count.
     * @example
     * // Count the number of ServiceOrdersCosts
     * const count = await prisma.serviceOrdersCost.count({
     *   where: {
     *     // ... the filter for the ServiceOrdersCosts we want to count
     *   }
     * })
    **/
    count<T extends ServiceOrdersCostCountArgs>(
      args?: Subset<T, ServiceOrdersCostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceOrdersCostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceOrdersCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceOrdersCostAggregateArgs>(args: Subset<T, ServiceOrdersCostAggregateArgs>): Prisma.PrismaPromise<GetServiceOrdersCostAggregateType<T>>

    /**
     * Group by ServiceOrdersCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrdersCostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceOrdersCostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceOrdersCostGroupByArgs['orderBy'] }
        : { orderBy?: ServiceOrdersCostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceOrdersCostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceOrdersCostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceOrdersCost model
   */
  readonly fields: ServiceOrdersCostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceOrdersCost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceOrdersCostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ServiceOrder<T extends ServiceOrdersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrdersDefaultArgs<ExtArgs>>): Prisma__ServiceOrdersClient<$Result.GetResult<Prisma.$ServiceOrdersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Product<T extends ServiceOrdersCost$ProductArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrdersCost$ProductArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceOrdersCost model
   */
  interface ServiceOrdersCostFieldRefs {
    readonly id: FieldRef<"ServiceOrdersCost", 'Int'>
    readonly serviceOrderId: FieldRef<"ServiceOrdersCost", 'Int'>
    readonly productId: FieldRef<"ServiceOrdersCost", 'Int'>
    readonly description: FieldRef<"ServiceOrdersCost", 'String'>
    readonly value: FieldRef<"ServiceOrdersCost", 'Decimal'>
    readonly quantity: FieldRef<"ServiceOrdersCost", 'Int'>
    readonly type: FieldRef<"ServiceOrdersCost", 'CostType'>
    readonly createdAt: FieldRef<"ServiceOrdersCost", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceOrdersCost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceOrdersCost findUnique
   */
  export type ServiceOrdersCostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrdersCost to fetch.
     */
    where: ServiceOrdersCostWhereUniqueInput
  }

  /**
   * ServiceOrdersCost findUniqueOrThrow
   */
  export type ServiceOrdersCostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrdersCost to fetch.
     */
    where: ServiceOrdersCostWhereUniqueInput
  }

  /**
   * ServiceOrdersCost findFirst
   */
  export type ServiceOrdersCostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrdersCost to fetch.
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrdersCosts to fetch.
     */
    orderBy?: ServiceOrdersCostOrderByWithRelationInput | ServiceOrdersCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceOrdersCosts.
     */
    cursor?: ServiceOrdersCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrdersCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrdersCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrdersCosts.
     */
    distinct?: ServiceOrdersCostScalarFieldEnum | ServiceOrdersCostScalarFieldEnum[]
  }

  /**
   * ServiceOrdersCost findFirstOrThrow
   */
  export type ServiceOrdersCostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrdersCost to fetch.
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrdersCosts to fetch.
     */
    orderBy?: ServiceOrdersCostOrderByWithRelationInput | ServiceOrdersCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceOrdersCosts.
     */
    cursor?: ServiceOrdersCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrdersCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrdersCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrdersCosts.
     */
    distinct?: ServiceOrdersCostScalarFieldEnum | ServiceOrdersCostScalarFieldEnum[]
  }

  /**
   * ServiceOrdersCost findMany
   */
  export type ServiceOrdersCostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrdersCosts to fetch.
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrdersCosts to fetch.
     */
    orderBy?: ServiceOrdersCostOrderByWithRelationInput | ServiceOrdersCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceOrdersCosts.
     */
    cursor?: ServiceOrdersCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrdersCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrdersCosts.
     */
    skip?: number
    distinct?: ServiceOrdersCostScalarFieldEnum | ServiceOrdersCostScalarFieldEnum[]
  }

  /**
   * ServiceOrdersCost create
   */
  export type ServiceOrdersCostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceOrdersCost.
     */
    data: XOR<ServiceOrdersCostCreateInput, ServiceOrdersCostUncheckedCreateInput>
  }

  /**
   * ServiceOrdersCost createMany
   */
  export type ServiceOrdersCostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceOrdersCosts.
     */
    data: ServiceOrdersCostCreateManyInput | ServiceOrdersCostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceOrdersCost createManyAndReturn
   */
  export type ServiceOrdersCostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceOrdersCosts.
     */
    data: ServiceOrdersCostCreateManyInput | ServiceOrdersCostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceOrdersCost update
   */
  export type ServiceOrdersCostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceOrdersCost.
     */
    data: XOR<ServiceOrdersCostUpdateInput, ServiceOrdersCostUncheckedUpdateInput>
    /**
     * Choose, which ServiceOrdersCost to update.
     */
    where: ServiceOrdersCostWhereUniqueInput
  }

  /**
   * ServiceOrdersCost updateMany
   */
  export type ServiceOrdersCostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceOrdersCosts.
     */
    data: XOR<ServiceOrdersCostUpdateManyMutationInput, ServiceOrdersCostUncheckedUpdateManyInput>
    /**
     * Filter which ServiceOrdersCosts to update
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * Limit how many ServiceOrdersCosts to update.
     */
    limit?: number
  }

  /**
   * ServiceOrdersCost updateManyAndReturn
   */
  export type ServiceOrdersCostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * The data used to update ServiceOrdersCosts.
     */
    data: XOR<ServiceOrdersCostUpdateManyMutationInput, ServiceOrdersCostUncheckedUpdateManyInput>
    /**
     * Filter which ServiceOrdersCosts to update
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * Limit how many ServiceOrdersCosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceOrdersCost upsert
   */
  export type ServiceOrdersCostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceOrdersCost to update in case it exists.
     */
    where: ServiceOrdersCostWhereUniqueInput
    /**
     * In case the ServiceOrdersCost found by the `where` argument doesn't exist, create a new ServiceOrdersCost with this data.
     */
    create: XOR<ServiceOrdersCostCreateInput, ServiceOrdersCostUncheckedCreateInput>
    /**
     * In case the ServiceOrdersCost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceOrdersCostUpdateInput, ServiceOrdersCostUncheckedUpdateInput>
  }

  /**
   * ServiceOrdersCost delete
   */
  export type ServiceOrdersCostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
    /**
     * Filter which ServiceOrdersCost to delete.
     */
    where: ServiceOrdersCostWhereUniqueInput
  }

  /**
   * ServiceOrdersCost deleteMany
   */
  export type ServiceOrdersCostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceOrdersCosts to delete
     */
    where?: ServiceOrdersCostWhereInput
    /**
     * Limit how many ServiceOrdersCosts to delete.
     */
    limit?: number
  }

  /**
   * ServiceOrdersCost.Product
   */
  export type ServiceOrdersCost$ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Products
     */
    select?: ProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Products
     */
    omit?: ProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductsInclude<ExtArgs> | null
    where?: ProductsWhereInput
  }

  /**
   * ServiceOrdersCost without action
   */
  export type ServiceOrdersCostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrdersCost
     */
    select?: ServiceOrdersCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrdersCost
     */
    omit?: ServiceOrdersCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrdersCostInclude<ExtArgs> | null
  }


  /**
   * Model StockMovements
   */

  export type AggregateStockMovements = {
    _count: StockMovementsCountAggregateOutputType | null
    _avg: StockMovementsAvgAggregateOutputType | null
    _sum: StockMovementsSumAggregateOutputType | null
    _min: StockMovementsMinAggregateOutputType | null
    _max: StockMovementsMaxAggregateOutputType | null
  }

  export type StockMovementsAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    referenceId: number | null
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type StockMovementsSumAggregateOutputType = {
    id: number | null
    productId: number | null
    referenceId: number | null
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type StockMovementsMinAggregateOutputType = {
    id: number | null
    productId: number | null
    movementType: $Enums.MovementType | null
    referenceType: $Enums.ReferenceType | null
    referenceId: number | null
    quantity: number | null
    unitPrice: Decimal | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockMovementsMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    movementType: $Enums.MovementType | null
    referenceType: $Enums.ReferenceType | null
    referenceId: number | null
    quantity: number | null
    unitPrice: Decimal | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockMovementsCountAggregateOutputType = {
    id: number
    productId: number
    movementType: number
    referenceType: number
    referenceId: number
    quantity: number
    unitPrice: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockMovementsAvgAggregateInputType = {
    id?: true
    productId?: true
    referenceId?: true
    quantity?: true
    unitPrice?: true
  }

  export type StockMovementsSumAggregateInputType = {
    id?: true
    productId?: true
    referenceId?: true
    quantity?: true
    unitPrice?: true
  }

  export type StockMovementsMinAggregateInputType = {
    id?: true
    productId?: true
    movementType?: true
    referenceType?: true
    referenceId?: true
    quantity?: true
    unitPrice?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockMovementsMaxAggregateInputType = {
    id?: true
    productId?: true
    movementType?: true
    referenceType?: true
    referenceId?: true
    quantity?: true
    unitPrice?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockMovementsCountAggregateInputType = {
    id?: true
    productId?: true
    movementType?: true
    referenceType?: true
    referenceId?: true
    quantity?: true
    unitPrice?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockMovementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to aggregate.
     */
    where?: StockMovementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementsOrderByWithRelationInput | StockMovementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockMovementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockMovements
    **/
    _count?: true | StockMovementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockMovementsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockMovementsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementsMaxAggregateInputType
  }

  export type GetStockMovementsAggregateType<T extends StockMovementsAggregateArgs> = {
        [P in keyof T & keyof AggregateStockMovements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockMovements[P]>
      : GetScalarType<T[P], AggregateStockMovements[P]>
  }




  export type StockMovementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementsWhereInput
    orderBy?: StockMovementsOrderByWithAggregationInput | StockMovementsOrderByWithAggregationInput[]
    by: StockMovementsScalarFieldEnum[] | StockMovementsScalarFieldEnum
    having?: StockMovementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockMovementsCountAggregateInputType | true
    _avg?: StockMovementsAvgAggregateInputType
    _sum?: StockMovementsSumAggregateInputType
    _min?: StockMovementsMinAggregateInputType
    _max?: StockMovementsMaxAggregateInputType
  }

  export type StockMovementsGroupByOutputType = {
    id: number
    productId: number
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: StockMovementsCountAggregateOutputType | null
    _avg: StockMovementsAvgAggregateOutputType | null
    _sum: StockMovementsSumAggregateOutputType | null
    _min: StockMovementsMinAggregateOutputType | null
    _max: StockMovementsMaxAggregateOutputType | null
  }

  type GetStockMovementsGroupByPayload<T extends StockMovementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockMovementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockMovementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockMovementsGroupByOutputType[P]>
            : GetScalarType<T[P], StockMovementsGroupByOutputType[P]>
        }
      >
    >


  export type StockMovementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    movementType?: boolean
    referenceType?: boolean
    referenceId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Product?: boolean | ProductsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovements"]>

  export type StockMovementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    movementType?: boolean
    referenceType?: boolean
    referenceId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Product?: boolean | ProductsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovements"]>

  export type StockMovementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    movementType?: boolean
    referenceType?: boolean
    referenceId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Product?: boolean | ProductsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovements"]>

  export type StockMovementsSelectScalar = {
    id?: boolean
    productId?: boolean
    movementType?: boolean
    referenceType?: boolean
    referenceId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockMovementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "movementType" | "referenceType" | "referenceId" | "quantity" | "unitPrice" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["stockMovements"]>
  export type StockMovementsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Product?: boolean | ProductsDefaultArgs<ExtArgs>
  }
  export type StockMovementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Product?: boolean | ProductsDefaultArgs<ExtArgs>
  }
  export type StockMovementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Product?: boolean | ProductsDefaultArgs<ExtArgs>
  }

  export type $StockMovementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockMovements"
    objects: {
      Product: Prisma.$ProductsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      movementType: $Enums.MovementType
      referenceType: $Enums.ReferenceType
      referenceId: number
      quantity: number
      unitPrice: Prisma.Decimal
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stockMovements"]>
    composites: {}
  }

  type StockMovementsGetPayload<S extends boolean | null | undefined | StockMovementsDefaultArgs> = $Result.GetResult<Prisma.$StockMovementsPayload, S>

  type StockMovementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockMovementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockMovementsCountAggregateInputType | true
    }

  export interface StockMovementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockMovements'], meta: { name: 'StockMovements' } }
    /**
     * Find zero or one StockMovements that matches the filter.
     * @param {StockMovementsFindUniqueArgs} args - Arguments to find a StockMovements
     * @example
     * // Get one StockMovements
     * const stockMovements = await prisma.stockMovements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementsFindUniqueArgs>(args: SelectSubset<T, StockMovementsFindUniqueArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockMovements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockMovementsFindUniqueOrThrowArgs} args - Arguments to find a StockMovements
     * @example
     * // Get one StockMovements
     * const stockMovements = await prisma.stockMovements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementsFindUniqueOrThrowArgs>(args: SelectSubset<T, StockMovementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsFindFirstArgs} args - Arguments to find a StockMovements
     * @example
     * // Get one StockMovements
     * const stockMovements = await prisma.stockMovements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementsFindFirstArgs>(args?: SelectSubset<T, StockMovementsFindFirstArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsFindFirstOrThrowArgs} args - Arguments to find a StockMovements
     * @example
     * // Get one StockMovements
     * const stockMovements = await prisma.stockMovements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementsFindFirstOrThrowArgs>(args?: SelectSubset<T, StockMovementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovements.findMany()
     * 
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockMovementsWithIdOnly = await prisma.stockMovements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockMovementsFindManyArgs>(args?: SelectSubset<T, StockMovementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockMovements.
     * @param {StockMovementsCreateArgs} args - Arguments to create a StockMovements.
     * @example
     * // Create one StockMovements
     * const StockMovements = await prisma.stockMovements.create({
     *   data: {
     *     // ... data to create a StockMovements
     *   }
     * })
     * 
     */
    create<T extends StockMovementsCreateArgs>(args: SelectSubset<T, StockMovementsCreateArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockMovements.
     * @param {StockMovementsCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovements = await prisma.stockMovements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockMovementsCreateManyArgs>(args?: SelectSubset<T, StockMovementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockMovements and returns the data saved in the database.
     * @param {StockMovementsCreateManyAndReturnArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovements = await prisma.stockMovements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockMovements and only return the `id`
     * const stockMovementsWithIdOnly = await prisma.stockMovements.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockMovementsCreateManyAndReturnArgs>(args?: SelectSubset<T, StockMovementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockMovements.
     * @param {StockMovementsDeleteArgs} args - Arguments to delete one StockMovements.
     * @example
     * // Delete one StockMovements
     * const StockMovements = await prisma.stockMovements.delete({
     *   where: {
     *     // ... filter to delete one StockMovements
     *   }
     * })
     * 
     */
    delete<T extends StockMovementsDeleteArgs>(args: SelectSubset<T, StockMovementsDeleteArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockMovements.
     * @param {StockMovementsUpdateArgs} args - Arguments to update one StockMovements.
     * @example
     * // Update one StockMovements
     * const stockMovements = await prisma.stockMovements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockMovementsUpdateArgs>(args: SelectSubset<T, StockMovementsUpdateArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementsDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockMovementsDeleteManyArgs>(args?: SelectSubset<T, StockMovementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovements = await prisma.stockMovements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockMovementsUpdateManyArgs>(args: SelectSubset<T, StockMovementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements and returns the data updated in the database.
     * @param {StockMovementsUpdateManyAndReturnArgs} args - Arguments to update many StockMovements.
     * @example
     * // Update many StockMovements
     * const stockMovements = await prisma.stockMovements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockMovements and only return the `id`
     * const stockMovementsWithIdOnly = await prisma.stockMovements.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockMovementsUpdateManyAndReturnArgs>(args: SelectSubset<T, StockMovementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockMovements.
     * @param {StockMovementsUpsertArgs} args - Arguments to update or create a StockMovements.
     * @example
     * // Update or create a StockMovements
     * const stockMovements = await prisma.stockMovements.upsert({
     *   create: {
     *     // ... data to create a StockMovements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovements we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementsUpsertArgs>(args: SelectSubset<T, StockMovementsUpsertArgs<ExtArgs>>): Prisma__StockMovementsClient<$Result.GetResult<Prisma.$StockMovementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovements.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementsCountArgs>(
      args?: Subset<T, StockMovementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockMovementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockMovementsAggregateArgs>(args: Subset<T, StockMovementsAggregateArgs>): Prisma.PrismaPromise<GetStockMovementsAggregateType<T>>

    /**
     * Group by StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockMovementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockMovementsGroupByArgs['orderBy'] }
        : { orderBy?: StockMovementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockMovementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockMovements model
   */
  readonly fields: StockMovementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockMovements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockMovementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Product<T extends ProductsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductsDefaultArgs<ExtArgs>>): Prisma__ProductsClient<$Result.GetResult<Prisma.$ProductsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockMovements model
   */
  interface StockMovementsFieldRefs {
    readonly id: FieldRef<"StockMovements", 'Int'>
    readonly productId: FieldRef<"StockMovements", 'Int'>
    readonly movementType: FieldRef<"StockMovements", 'MovementType'>
    readonly referenceType: FieldRef<"StockMovements", 'ReferenceType'>
    readonly referenceId: FieldRef<"StockMovements", 'Int'>
    readonly quantity: FieldRef<"StockMovements", 'Int'>
    readonly unitPrice: FieldRef<"StockMovements", 'Decimal'>
    readonly notes: FieldRef<"StockMovements", 'String'>
    readonly createdAt: FieldRef<"StockMovements", 'DateTime'>
    readonly updatedAt: FieldRef<"StockMovements", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockMovements findUnique
   */
  export type StockMovementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where: StockMovementsWhereUniqueInput
  }

  /**
   * StockMovements findUniqueOrThrow
   */
  export type StockMovementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where: StockMovementsWhereUniqueInput
  }

  /**
   * StockMovements findFirst
   */
  export type StockMovementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementsOrderByWithRelationInput | StockMovementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementsScalarFieldEnum | StockMovementsScalarFieldEnum[]
  }

  /**
   * StockMovements findFirstOrThrow
   */
  export type StockMovementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementsOrderByWithRelationInput | StockMovementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementsScalarFieldEnum | StockMovementsScalarFieldEnum[]
  }

  /**
   * StockMovements findMany
   */
  export type StockMovementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementsOrderByWithRelationInput | StockMovementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockMovements.
     */
    cursor?: StockMovementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    distinct?: StockMovementsScalarFieldEnum | StockMovementsScalarFieldEnum[]
  }

  /**
   * StockMovements create
   */
  export type StockMovementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * The data needed to create a StockMovements.
     */
    data: XOR<StockMovementsCreateInput, StockMovementsUncheckedCreateInput>
  }

  /**
   * StockMovements createMany
   */
  export type StockMovementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementsCreateManyInput | StockMovementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockMovements createManyAndReturn
   */
  export type StockMovementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementsCreateManyInput | StockMovementsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovements update
   */
  export type StockMovementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * The data needed to update a StockMovements.
     */
    data: XOR<StockMovementsUpdateInput, StockMovementsUncheckedUpdateInput>
    /**
     * Choose, which StockMovements to update.
     */
    where: StockMovementsWhereUniqueInput
  }

  /**
   * StockMovements updateMany
   */
  export type StockMovementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementsUpdateManyMutationInput, StockMovementsUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementsWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
  }

  /**
   * StockMovements updateManyAndReturn
   */
  export type StockMovementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementsUpdateManyMutationInput, StockMovementsUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementsWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovements upsert
   */
  export type StockMovementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * The filter to search for the StockMovements to update in case it exists.
     */
    where: StockMovementsWhereUniqueInput
    /**
     * In case the StockMovements found by the `where` argument doesn't exist, create a new StockMovements with this data.
     */
    create: XOR<StockMovementsCreateInput, StockMovementsUncheckedCreateInput>
    /**
     * In case the StockMovements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockMovementsUpdateInput, StockMovementsUncheckedUpdateInput>
  }

  /**
   * StockMovements delete
   */
  export type StockMovementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
    /**
     * Filter which StockMovements to delete.
     */
    where: StockMovementsWhereUniqueInput
  }

  /**
   * StockMovements deleteMany
   */
  export type StockMovementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: StockMovementsWhereInput
    /**
     * Limit how many StockMovements to delete.
     */
    limit?: number
  }

  /**
   * StockMovements without action
   */
  export type StockMovementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovements
     */
    select?: StockMovementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovements
     */
    omit?: StockMovementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const ServiceOrdersScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    customerName: 'customerName',
    customerContact: 'customerContact',
    price: 'price',
    description: 'description',
    status: 'status',
    completionDate: 'completionDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceOrdersScalarFieldEnum = (typeof ServiceOrdersScalarFieldEnum)[keyof typeof ServiceOrdersScalarFieldEnum]


  export const ProductsScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    name: 'name',
    stockQuantity: 'stockQuantity',
    unitPrice: 'unitPrice',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductsScalarFieldEnum = (typeof ProductsScalarFieldEnum)[keyof typeof ProductsScalarFieldEnum]


  export const ServiceOrdersCostScalarFieldEnum: {
    id: 'id',
    serviceOrderId: 'serviceOrderId',
    productId: 'productId',
    description: 'description',
    value: 'value',
    quantity: 'quantity',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceOrdersCostScalarFieldEnum = (typeof ServiceOrdersCostScalarFieldEnum)[keyof typeof ServiceOrdersCostScalarFieldEnum]


  export const StockMovementsScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    movementType: 'movementType',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockMovementsScalarFieldEnum = (typeof StockMovementsScalarFieldEnum)[keyof typeof StockMovementsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ServiceOrderStatus'
   */
  export type EnumServiceOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceOrderStatus'>
    


  /**
   * Reference to a field of type 'ServiceOrderStatus[]'
   */
  export type ListEnumServiceOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceOrderStatus[]'>
    


  /**
   * Reference to a field of type 'CostType'
   */
  export type EnumCostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CostType'>
    


  /**
   * Reference to a field of type 'CostType[]'
   */
  export type ListEnumCostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CostType[]'>
    


  /**
   * Reference to a field of type 'MovementType'
   */
  export type EnumMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MovementType'>
    


  /**
   * Reference to a field of type 'MovementType[]'
   */
  export type ListEnumMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MovementType[]'>
    


  /**
   * Reference to a field of type 'ReferenceType'
   */
  export type EnumReferenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferenceType'>
    


  /**
   * Reference to a field of type 'ReferenceType[]'
   */
  export type ListEnumReferenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferenceType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: IntFilter<"Users"> | number
    externalId?: UuidFilter<"Users"> | string
    name?: StringNullableFilter<"Users"> | string | null
    email?: StringFilter<"Users"> | string
    passwordHash?: StringFilter<"Users"> | string
    createdAt?: DateTimeFilter<"Users"> | Date | string
    updatedAt?: DateTimeFilter<"Users"> | Date | string
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    externalId?: UuidFilter<"Users"> | string
    name?: StringNullableFilter<"Users"> | string | null
    passwordHash?: StringFilter<"Users"> | string
    createdAt?: DateTimeFilter<"Users"> | Date | string
    updatedAt?: DateTimeFilter<"Users"> | Date | string
  }, "id" | "email">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _avg?: UsersAvgOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
    _sum?: UsersSumOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Users"> | number
    externalId?: UuidWithAggregatesFilter<"Users"> | string
    name?: StringNullableWithAggregatesFilter<"Users"> | string | null
    email?: StringWithAggregatesFilter<"Users"> | string
    passwordHash?: StringWithAggregatesFilter<"Users"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Users"> | Date | string
  }

  export type ServiceOrdersWhereInput = {
    AND?: ServiceOrdersWhereInput | ServiceOrdersWhereInput[]
    OR?: ServiceOrdersWhereInput[]
    NOT?: ServiceOrdersWhereInput | ServiceOrdersWhereInput[]
    id?: IntFilter<"ServiceOrders"> | number
    externalId?: UuidFilter<"ServiceOrders"> | string
    customerName?: StringFilter<"ServiceOrders"> | string
    customerContact?: StringFilter<"ServiceOrders"> | string
    price?: DecimalFilter<"ServiceOrders"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"ServiceOrders"> | string
    status?: EnumServiceOrderStatusFilter<"ServiceOrders"> | $Enums.ServiceOrderStatus
    completionDate?: DateTimeNullableFilter<"ServiceOrders"> | Date | string | null
    createdAt?: DateTimeFilter<"ServiceOrders"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrders"> | Date | string
    ServiceOrdersCost?: ServiceOrdersCostListRelationFilter
  }

  export type ServiceOrdersOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    customerName?: SortOrder
    customerContact?: SortOrder
    price?: SortOrder
    description?: SortOrder
    status?: SortOrder
    completionDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ServiceOrdersCost?: ServiceOrdersCostOrderByRelationAggregateInput
  }

  export type ServiceOrdersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ServiceOrdersWhereInput | ServiceOrdersWhereInput[]
    OR?: ServiceOrdersWhereInput[]
    NOT?: ServiceOrdersWhereInput | ServiceOrdersWhereInput[]
    externalId?: UuidFilter<"ServiceOrders"> | string
    customerName?: StringFilter<"ServiceOrders"> | string
    customerContact?: StringFilter<"ServiceOrders"> | string
    price?: DecimalFilter<"ServiceOrders"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"ServiceOrders"> | string
    status?: EnumServiceOrderStatusFilter<"ServiceOrders"> | $Enums.ServiceOrderStatus
    completionDate?: DateTimeNullableFilter<"ServiceOrders"> | Date | string | null
    createdAt?: DateTimeFilter<"ServiceOrders"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrders"> | Date | string
    ServiceOrdersCost?: ServiceOrdersCostListRelationFilter
  }, "id">

  export type ServiceOrdersOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    customerName?: SortOrder
    customerContact?: SortOrder
    price?: SortOrder
    description?: SortOrder
    status?: SortOrder
    completionDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceOrdersCountOrderByAggregateInput
    _avg?: ServiceOrdersAvgOrderByAggregateInput
    _max?: ServiceOrdersMaxOrderByAggregateInput
    _min?: ServiceOrdersMinOrderByAggregateInput
    _sum?: ServiceOrdersSumOrderByAggregateInput
  }

  export type ServiceOrdersScalarWhereWithAggregatesInput = {
    AND?: ServiceOrdersScalarWhereWithAggregatesInput | ServiceOrdersScalarWhereWithAggregatesInput[]
    OR?: ServiceOrdersScalarWhereWithAggregatesInput[]
    NOT?: ServiceOrdersScalarWhereWithAggregatesInput | ServiceOrdersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ServiceOrders"> | number
    externalId?: UuidWithAggregatesFilter<"ServiceOrders"> | string
    customerName?: StringWithAggregatesFilter<"ServiceOrders"> | string
    customerContact?: StringWithAggregatesFilter<"ServiceOrders"> | string
    price?: DecimalWithAggregatesFilter<"ServiceOrders"> | Decimal | DecimalJsLike | number | string
    description?: StringWithAggregatesFilter<"ServiceOrders"> | string
    status?: EnumServiceOrderStatusWithAggregatesFilter<"ServiceOrders"> | $Enums.ServiceOrderStatus
    completionDate?: DateTimeNullableWithAggregatesFilter<"ServiceOrders"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ServiceOrders"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceOrders"> | Date | string
  }

  export type ProductsWhereInput = {
    AND?: ProductsWhereInput | ProductsWhereInput[]
    OR?: ProductsWhereInput[]
    NOT?: ProductsWhereInput | ProductsWhereInput[]
    id?: IntFilter<"Products"> | number
    externalId?: UuidFilter<"Products"> | string
    name?: StringFilter<"Products"> | string
    stockQuantity?: IntFilter<"Products"> | number
    unitPrice?: DecimalFilter<"Products"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Products"> | string | null
    createdAt?: DateTimeFilter<"Products"> | Date | string
    updatedAt?: DateTimeFilter<"Products"> | Date | string
    ServiceOrdersCost?: ServiceOrdersCostListRelationFilter
    StockMovements?: StockMovementsListRelationFilter
  }

  export type ProductsOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ServiceOrdersCost?: ServiceOrdersCostOrderByRelationAggregateInput
    StockMovements?: StockMovementsOrderByRelationAggregateInput
  }

  export type ProductsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductsWhereInput | ProductsWhereInput[]
    OR?: ProductsWhereInput[]
    NOT?: ProductsWhereInput | ProductsWhereInput[]
    externalId?: UuidFilter<"Products"> | string
    name?: StringFilter<"Products"> | string
    stockQuantity?: IntFilter<"Products"> | number
    unitPrice?: DecimalFilter<"Products"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Products"> | string | null
    createdAt?: DateTimeFilter<"Products"> | Date | string
    updatedAt?: DateTimeFilter<"Products"> | Date | string
    ServiceOrdersCost?: ServiceOrdersCostListRelationFilter
    StockMovements?: StockMovementsListRelationFilter
  }, "id">

  export type ProductsOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductsCountOrderByAggregateInput
    _avg?: ProductsAvgOrderByAggregateInput
    _max?: ProductsMaxOrderByAggregateInput
    _min?: ProductsMinOrderByAggregateInput
    _sum?: ProductsSumOrderByAggregateInput
  }

  export type ProductsScalarWhereWithAggregatesInput = {
    AND?: ProductsScalarWhereWithAggregatesInput | ProductsScalarWhereWithAggregatesInput[]
    OR?: ProductsScalarWhereWithAggregatesInput[]
    NOT?: ProductsScalarWhereWithAggregatesInput | ProductsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Products"> | number
    externalId?: UuidWithAggregatesFilter<"Products"> | string
    name?: StringWithAggregatesFilter<"Products"> | string
    stockQuantity?: IntWithAggregatesFilter<"Products"> | number
    unitPrice?: DecimalWithAggregatesFilter<"Products"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableWithAggregatesFilter<"Products"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Products"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Products"> | Date | string
  }

  export type ServiceOrdersCostWhereInput = {
    AND?: ServiceOrdersCostWhereInput | ServiceOrdersCostWhereInput[]
    OR?: ServiceOrdersCostWhereInput[]
    NOT?: ServiceOrdersCostWhereInput | ServiceOrdersCostWhereInput[]
    id?: IntFilter<"ServiceOrdersCost"> | number
    serviceOrderId?: IntFilter<"ServiceOrdersCost"> | number
    productId?: IntNullableFilter<"ServiceOrdersCost"> | number | null
    description?: StringFilter<"ServiceOrdersCost"> | string
    value?: DecimalFilter<"ServiceOrdersCost"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"ServiceOrdersCost"> | number
    type?: EnumCostTypeFilter<"ServiceOrdersCost"> | $Enums.CostType
    createdAt?: DateTimeFilter<"ServiceOrdersCost"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrdersCost"> | Date | string
    ServiceOrder?: XOR<ServiceOrdersScalarRelationFilter, ServiceOrdersWhereInput>
    Product?: XOR<ProductsNullableScalarRelationFilter, ProductsWhereInput> | null
  }

  export type ServiceOrdersCostOrderByWithRelationInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrderInput | SortOrder
    description?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ServiceOrder?: ServiceOrdersOrderByWithRelationInput
    Product?: ProductsOrderByWithRelationInput
  }

  export type ServiceOrdersCostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ServiceOrdersCostWhereInput | ServiceOrdersCostWhereInput[]
    OR?: ServiceOrdersCostWhereInput[]
    NOT?: ServiceOrdersCostWhereInput | ServiceOrdersCostWhereInput[]
    serviceOrderId?: IntFilter<"ServiceOrdersCost"> | number
    productId?: IntNullableFilter<"ServiceOrdersCost"> | number | null
    description?: StringFilter<"ServiceOrdersCost"> | string
    value?: DecimalFilter<"ServiceOrdersCost"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"ServiceOrdersCost"> | number
    type?: EnumCostTypeFilter<"ServiceOrdersCost"> | $Enums.CostType
    createdAt?: DateTimeFilter<"ServiceOrdersCost"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrdersCost"> | Date | string
    ServiceOrder?: XOR<ServiceOrdersScalarRelationFilter, ServiceOrdersWhereInput>
    Product?: XOR<ProductsNullableScalarRelationFilter, ProductsWhereInput> | null
  }, "id">

  export type ServiceOrdersCostOrderByWithAggregationInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrderInput | SortOrder
    description?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceOrdersCostCountOrderByAggregateInput
    _avg?: ServiceOrdersCostAvgOrderByAggregateInput
    _max?: ServiceOrdersCostMaxOrderByAggregateInput
    _min?: ServiceOrdersCostMinOrderByAggregateInput
    _sum?: ServiceOrdersCostSumOrderByAggregateInput
  }

  export type ServiceOrdersCostScalarWhereWithAggregatesInput = {
    AND?: ServiceOrdersCostScalarWhereWithAggregatesInput | ServiceOrdersCostScalarWhereWithAggregatesInput[]
    OR?: ServiceOrdersCostScalarWhereWithAggregatesInput[]
    NOT?: ServiceOrdersCostScalarWhereWithAggregatesInput | ServiceOrdersCostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ServiceOrdersCost"> | number
    serviceOrderId?: IntWithAggregatesFilter<"ServiceOrdersCost"> | number
    productId?: IntNullableWithAggregatesFilter<"ServiceOrdersCost"> | number | null
    description?: StringWithAggregatesFilter<"ServiceOrdersCost"> | string
    value?: DecimalWithAggregatesFilter<"ServiceOrdersCost"> | Decimal | DecimalJsLike | number | string
    quantity?: IntWithAggregatesFilter<"ServiceOrdersCost"> | number
    type?: EnumCostTypeWithAggregatesFilter<"ServiceOrdersCost"> | $Enums.CostType
    createdAt?: DateTimeWithAggregatesFilter<"ServiceOrdersCost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceOrdersCost"> | Date | string
  }

  export type StockMovementsWhereInput = {
    AND?: StockMovementsWhereInput | StockMovementsWhereInput[]
    OR?: StockMovementsWhereInput[]
    NOT?: StockMovementsWhereInput | StockMovementsWhereInput[]
    id?: IntFilter<"StockMovements"> | number
    productId?: IntFilter<"StockMovements"> | number
    movementType?: EnumMovementTypeFilter<"StockMovements"> | $Enums.MovementType
    referenceType?: EnumReferenceTypeFilter<"StockMovements"> | $Enums.ReferenceType
    referenceId?: IntFilter<"StockMovements"> | number
    quantity?: IntFilter<"StockMovements"> | number
    unitPrice?: DecimalFilter<"StockMovements"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"StockMovements"> | string | null
    createdAt?: DateTimeFilter<"StockMovements"> | Date | string
    updatedAt?: DateTimeFilter<"StockMovements"> | Date | string
    Product?: XOR<ProductsScalarRelationFilter, ProductsWhereInput>
  }

  export type StockMovementsOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    movementType?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Product?: ProductsOrderByWithRelationInput
  }

  export type StockMovementsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StockMovementsWhereInput | StockMovementsWhereInput[]
    OR?: StockMovementsWhereInput[]
    NOT?: StockMovementsWhereInput | StockMovementsWhereInput[]
    productId?: IntFilter<"StockMovements"> | number
    movementType?: EnumMovementTypeFilter<"StockMovements"> | $Enums.MovementType
    referenceType?: EnumReferenceTypeFilter<"StockMovements"> | $Enums.ReferenceType
    referenceId?: IntFilter<"StockMovements"> | number
    quantity?: IntFilter<"StockMovements"> | number
    unitPrice?: DecimalFilter<"StockMovements"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"StockMovements"> | string | null
    createdAt?: DateTimeFilter<"StockMovements"> | Date | string
    updatedAt?: DateTimeFilter<"StockMovements"> | Date | string
    Product?: XOR<ProductsScalarRelationFilter, ProductsWhereInput>
  }, "id">

  export type StockMovementsOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    movementType?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockMovementsCountOrderByAggregateInput
    _avg?: StockMovementsAvgOrderByAggregateInput
    _max?: StockMovementsMaxOrderByAggregateInput
    _min?: StockMovementsMinOrderByAggregateInput
    _sum?: StockMovementsSumOrderByAggregateInput
  }

  export type StockMovementsScalarWhereWithAggregatesInput = {
    AND?: StockMovementsScalarWhereWithAggregatesInput | StockMovementsScalarWhereWithAggregatesInput[]
    OR?: StockMovementsScalarWhereWithAggregatesInput[]
    NOT?: StockMovementsScalarWhereWithAggregatesInput | StockMovementsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StockMovements"> | number
    productId?: IntWithAggregatesFilter<"StockMovements"> | number
    movementType?: EnumMovementTypeWithAggregatesFilter<"StockMovements"> | $Enums.MovementType
    referenceType?: EnumReferenceTypeWithAggregatesFilter<"StockMovements"> | $Enums.ReferenceType
    referenceId?: IntWithAggregatesFilter<"StockMovements"> | number
    quantity?: IntWithAggregatesFilter<"StockMovements"> | number
    unitPrice?: DecimalWithAggregatesFilter<"StockMovements"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableWithAggregatesFilter<"StockMovements"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StockMovements"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StockMovements"> | Date | string
  }

  export type UsersCreateInput = {
    externalId?: string
    name?: string | null
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersUncheckedCreateInput = {
    id?: number
    externalId?: string
    name?: string | null
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersUpdateInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateManyInput = {
    id?: number
    externalId?: string
    name?: string | null
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersUpdateManyMutationInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCreateInput = {
    externalId?: string
    customerName: string
    customerContact: string
    price: Decimal | DecimalJsLike | number | string
    description: string
    status?: $Enums.ServiceOrderStatus
    completionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrdersCost?: ServiceOrdersCostCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrdersUncheckedCreateInput = {
    id?: number
    externalId?: string
    customerName: string
    customerContact: string
    price: Decimal | DecimalJsLike | number | string
    description: string
    status?: $Enums.ServiceOrderStatus
    completionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrdersCost?: ServiceOrdersCostUncheckedCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrdersUpdateInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerContact?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceOrderStatusFieldUpdateOperationsInput | $Enums.ServiceOrderStatus
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrdersCost?: ServiceOrdersCostUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrdersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerContact?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceOrderStatusFieldUpdateOperationsInput | $Enums.ServiceOrderStatus
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrdersCost?: ServiceOrdersCostUncheckedUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrdersCreateManyInput = {
    id?: number
    externalId?: string
    customerName: string
    customerContact: string
    price: Decimal | DecimalJsLike | number | string
    description: string
    status?: $Enums.ServiceOrderStatus
    completionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersUpdateManyMutationInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerContact?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceOrderStatusFieldUpdateOperationsInput | $Enums.ServiceOrderStatus
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerContact?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceOrderStatusFieldUpdateOperationsInput | $Enums.ServiceOrderStatus
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductsCreateInput = {
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrdersCost?: ServiceOrdersCostCreateNestedManyWithoutProductInput
    StockMovements?: StockMovementsCreateNestedManyWithoutProductInput
  }

  export type ProductsUncheckedCreateInput = {
    id?: number
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrdersCost?: ServiceOrdersCostUncheckedCreateNestedManyWithoutProductInput
    StockMovements?: StockMovementsUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductsUpdateInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrdersCost?: ServiceOrdersCostUpdateManyWithoutProductNestedInput
    StockMovements?: StockMovementsUpdateManyWithoutProductNestedInput
  }

  export type ProductsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrdersCost?: ServiceOrdersCostUncheckedUpdateManyWithoutProductNestedInput
    StockMovements?: StockMovementsUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductsCreateManyInput = {
    id?: number
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductsUpdateManyMutationInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCostCreateInput = {
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrder: ServiceOrdersCreateNestedOneWithoutServiceOrdersCostInput
    Product?: ProductsCreateNestedOneWithoutServiceOrdersCostInput
  }

  export type ServiceOrdersCostUncheckedCreateInput = {
    id?: number
    serviceOrderId: number
    productId?: number | null
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCostUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrder?: ServiceOrdersUpdateOneRequiredWithoutServiceOrdersCostNestedInput
    Product?: ProductsUpdateOneWithoutServiceOrdersCostNestedInput
  }

  export type ServiceOrdersCostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceOrderId?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCostCreateManyInput = {
    id?: number
    serviceOrderId: number
    productId?: number | null
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCostUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceOrderId?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementsCreateInput = {
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Product: ProductsCreateNestedOneWithoutStockMovementsInput
  }

  export type StockMovementsUncheckedCreateInput = {
    id?: number
    productId: number
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockMovementsUpdateInput = {
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Product?: ProductsUpdateOneRequiredWithoutStockMovementsNestedInput
  }

  export type StockMovementsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementsCreateManyInput = {
    id?: number
    productId: number
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockMovementsUpdateManyMutationInput = {
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumServiceOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceOrderStatus | EnumServiceOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceOrderStatusFilter<$PrismaModel> | $Enums.ServiceOrderStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ServiceOrdersCostListRelationFilter = {
    every?: ServiceOrdersCostWhereInput
    some?: ServiceOrdersCostWhereInput
    none?: ServiceOrdersCostWhereInput
  }

  export type ServiceOrdersCostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrdersCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    customerName?: SortOrder
    customerContact?: SortOrder
    price?: SortOrder
    description?: SortOrder
    status?: SortOrder
    completionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrdersAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type ServiceOrdersMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    customerName?: SortOrder
    customerContact?: SortOrder
    price?: SortOrder
    description?: SortOrder
    status?: SortOrder
    completionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrdersMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    customerName?: SortOrder
    customerContact?: SortOrder
    price?: SortOrder
    description?: SortOrder
    status?: SortOrder
    completionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrdersSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumServiceOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceOrderStatus | EnumServiceOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceOrderStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StockMovementsListRelationFilter = {
    every?: StockMovementsWhereInput
    some?: StockMovementsWhereInput
    none?: StockMovementsWhereInput
  }

  export type StockMovementsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductsCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductsAvgOrderByAggregateInput = {
    id?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type ProductsMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductsMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductsSumOrderByAggregateInput = {
    id?: SortOrder
    stockQuantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumCostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeFilter<$PrismaModel> | $Enums.CostType
  }

  export type ServiceOrdersScalarRelationFilter = {
    is?: ServiceOrdersWhereInput
    isNot?: ServiceOrdersWhereInput
  }

  export type ProductsNullableScalarRelationFilter = {
    is?: ProductsWhereInput | null
    isNot?: ProductsWhereInput | null
  }

  export type ServiceOrdersCostCountOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrder
    description?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrdersCostAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
  }

  export type ServiceOrdersCostMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrder
    description?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrdersCostMinOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrder
    description?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrdersCostSumOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    productId?: SortOrder
    value?: SortOrder
    quantity?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumCostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeWithAggregatesFilter<$PrismaModel> | $Enums.CostType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCostTypeFilter<$PrismaModel>
    _max?: NestedEnumCostTypeFilter<$PrismaModel>
  }

  export type EnumMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeFilter<$PrismaModel> | $Enums.MovementType
  }

  export type EnumReferenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferenceType | EnumReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReferenceTypeFilter<$PrismaModel> | $Enums.ReferenceType
  }

  export type ProductsScalarRelationFilter = {
    is?: ProductsWhereInput
    isNot?: ProductsWhereInput
  }

  export type StockMovementsCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    movementType?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMovementsAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type StockMovementsMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    movementType?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMovementsMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    movementType?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMovementsSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    referenceId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type EnumMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.MovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumMovementTypeFilter<$PrismaModel>
  }

  export type EnumReferenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferenceType | EnumReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReferenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReferenceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReferenceTypeFilter<$PrismaModel>
    _max?: NestedEnumReferenceTypeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServiceOrdersCostCreateNestedManyWithoutServiceOrderInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutServiceOrderInput, ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput> | ServiceOrdersCostCreateWithoutServiceOrderInput[] | ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput | ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput[]
    createMany?: ServiceOrdersCostCreateManyServiceOrderInputEnvelope
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
  }

  export type ServiceOrdersCostUncheckedCreateNestedManyWithoutServiceOrderInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutServiceOrderInput, ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput> | ServiceOrdersCostCreateWithoutServiceOrderInput[] | ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput | ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput[]
    createMany?: ServiceOrdersCostCreateManyServiceOrderInputEnvelope
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumServiceOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceOrderStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ServiceOrdersCostUpdateManyWithoutServiceOrderNestedInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutServiceOrderInput, ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput> | ServiceOrdersCostCreateWithoutServiceOrderInput[] | ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput | ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput[]
    upsert?: ServiceOrdersCostUpsertWithWhereUniqueWithoutServiceOrderInput | ServiceOrdersCostUpsertWithWhereUniqueWithoutServiceOrderInput[]
    createMany?: ServiceOrdersCostCreateManyServiceOrderInputEnvelope
    set?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    disconnect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    delete?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    update?: ServiceOrdersCostUpdateWithWhereUniqueWithoutServiceOrderInput | ServiceOrdersCostUpdateWithWhereUniqueWithoutServiceOrderInput[]
    updateMany?: ServiceOrdersCostUpdateManyWithWhereWithoutServiceOrderInput | ServiceOrdersCostUpdateManyWithWhereWithoutServiceOrderInput[]
    deleteMany?: ServiceOrdersCostScalarWhereInput | ServiceOrdersCostScalarWhereInput[]
  }

  export type ServiceOrdersCostUncheckedUpdateManyWithoutServiceOrderNestedInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutServiceOrderInput, ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput> | ServiceOrdersCostCreateWithoutServiceOrderInput[] | ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput | ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput[]
    upsert?: ServiceOrdersCostUpsertWithWhereUniqueWithoutServiceOrderInput | ServiceOrdersCostUpsertWithWhereUniqueWithoutServiceOrderInput[]
    createMany?: ServiceOrdersCostCreateManyServiceOrderInputEnvelope
    set?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    disconnect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    delete?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    update?: ServiceOrdersCostUpdateWithWhereUniqueWithoutServiceOrderInput | ServiceOrdersCostUpdateWithWhereUniqueWithoutServiceOrderInput[]
    updateMany?: ServiceOrdersCostUpdateManyWithWhereWithoutServiceOrderInput | ServiceOrdersCostUpdateManyWithWhereWithoutServiceOrderInput[]
    deleteMany?: ServiceOrdersCostScalarWhereInput | ServiceOrdersCostScalarWhereInput[]
  }

  export type ServiceOrdersCostCreateNestedManyWithoutProductInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutProductInput, ServiceOrdersCostUncheckedCreateWithoutProductInput> | ServiceOrdersCostCreateWithoutProductInput[] | ServiceOrdersCostUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutProductInput | ServiceOrdersCostCreateOrConnectWithoutProductInput[]
    createMany?: ServiceOrdersCostCreateManyProductInputEnvelope
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
  }

  export type StockMovementsCreateNestedManyWithoutProductInput = {
    create?: XOR<StockMovementsCreateWithoutProductInput, StockMovementsUncheckedCreateWithoutProductInput> | StockMovementsCreateWithoutProductInput[] | StockMovementsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementsCreateOrConnectWithoutProductInput | StockMovementsCreateOrConnectWithoutProductInput[]
    createMany?: StockMovementsCreateManyProductInputEnvelope
    connect?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
  }

  export type ServiceOrdersCostUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutProductInput, ServiceOrdersCostUncheckedCreateWithoutProductInput> | ServiceOrdersCostCreateWithoutProductInput[] | ServiceOrdersCostUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutProductInput | ServiceOrdersCostCreateOrConnectWithoutProductInput[]
    createMany?: ServiceOrdersCostCreateManyProductInputEnvelope
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
  }

  export type StockMovementsUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<StockMovementsCreateWithoutProductInput, StockMovementsUncheckedCreateWithoutProductInput> | StockMovementsCreateWithoutProductInput[] | StockMovementsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementsCreateOrConnectWithoutProductInput | StockMovementsCreateOrConnectWithoutProductInput[]
    createMany?: StockMovementsCreateManyProductInputEnvelope
    connect?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
  }

  export type ServiceOrdersCostUpdateManyWithoutProductNestedInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutProductInput, ServiceOrdersCostUncheckedCreateWithoutProductInput> | ServiceOrdersCostCreateWithoutProductInput[] | ServiceOrdersCostUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutProductInput | ServiceOrdersCostCreateOrConnectWithoutProductInput[]
    upsert?: ServiceOrdersCostUpsertWithWhereUniqueWithoutProductInput | ServiceOrdersCostUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ServiceOrdersCostCreateManyProductInputEnvelope
    set?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    disconnect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    delete?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    update?: ServiceOrdersCostUpdateWithWhereUniqueWithoutProductInput | ServiceOrdersCostUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ServiceOrdersCostUpdateManyWithWhereWithoutProductInput | ServiceOrdersCostUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ServiceOrdersCostScalarWhereInput | ServiceOrdersCostScalarWhereInput[]
  }

  export type StockMovementsUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockMovementsCreateWithoutProductInput, StockMovementsUncheckedCreateWithoutProductInput> | StockMovementsCreateWithoutProductInput[] | StockMovementsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementsCreateOrConnectWithoutProductInput | StockMovementsCreateOrConnectWithoutProductInput[]
    upsert?: StockMovementsUpsertWithWhereUniqueWithoutProductInput | StockMovementsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockMovementsCreateManyProductInputEnvelope
    set?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    disconnect?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    delete?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    connect?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    update?: StockMovementsUpdateWithWhereUniqueWithoutProductInput | StockMovementsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockMovementsUpdateManyWithWhereWithoutProductInput | StockMovementsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockMovementsScalarWhereInput | StockMovementsScalarWhereInput[]
  }

  export type ServiceOrdersCostUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ServiceOrdersCostCreateWithoutProductInput, ServiceOrdersCostUncheckedCreateWithoutProductInput> | ServiceOrdersCostCreateWithoutProductInput[] | ServiceOrdersCostUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ServiceOrdersCostCreateOrConnectWithoutProductInput | ServiceOrdersCostCreateOrConnectWithoutProductInput[]
    upsert?: ServiceOrdersCostUpsertWithWhereUniqueWithoutProductInput | ServiceOrdersCostUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ServiceOrdersCostCreateManyProductInputEnvelope
    set?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    disconnect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    delete?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    connect?: ServiceOrdersCostWhereUniqueInput | ServiceOrdersCostWhereUniqueInput[]
    update?: ServiceOrdersCostUpdateWithWhereUniqueWithoutProductInput | ServiceOrdersCostUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ServiceOrdersCostUpdateManyWithWhereWithoutProductInput | ServiceOrdersCostUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ServiceOrdersCostScalarWhereInput | ServiceOrdersCostScalarWhereInput[]
  }

  export type StockMovementsUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockMovementsCreateWithoutProductInput, StockMovementsUncheckedCreateWithoutProductInput> | StockMovementsCreateWithoutProductInput[] | StockMovementsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementsCreateOrConnectWithoutProductInput | StockMovementsCreateOrConnectWithoutProductInput[]
    upsert?: StockMovementsUpsertWithWhereUniqueWithoutProductInput | StockMovementsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockMovementsCreateManyProductInputEnvelope
    set?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    disconnect?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    delete?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    connect?: StockMovementsWhereUniqueInput | StockMovementsWhereUniqueInput[]
    update?: StockMovementsUpdateWithWhereUniqueWithoutProductInput | StockMovementsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockMovementsUpdateManyWithWhereWithoutProductInput | StockMovementsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockMovementsScalarWhereInput | StockMovementsScalarWhereInput[]
  }

  export type ServiceOrdersCreateNestedOneWithoutServiceOrdersCostInput = {
    create?: XOR<ServiceOrdersCreateWithoutServiceOrdersCostInput, ServiceOrdersUncheckedCreateWithoutServiceOrdersCostInput>
    connectOrCreate?: ServiceOrdersCreateOrConnectWithoutServiceOrdersCostInput
    connect?: ServiceOrdersWhereUniqueInput
  }

  export type ProductsCreateNestedOneWithoutServiceOrdersCostInput = {
    create?: XOR<ProductsCreateWithoutServiceOrdersCostInput, ProductsUncheckedCreateWithoutServiceOrdersCostInput>
    connectOrCreate?: ProductsCreateOrConnectWithoutServiceOrdersCostInput
    connect?: ProductsWhereUniqueInput
  }

  export type EnumCostTypeFieldUpdateOperationsInput = {
    set?: $Enums.CostType
  }

  export type ServiceOrdersUpdateOneRequiredWithoutServiceOrdersCostNestedInput = {
    create?: XOR<ServiceOrdersCreateWithoutServiceOrdersCostInput, ServiceOrdersUncheckedCreateWithoutServiceOrdersCostInput>
    connectOrCreate?: ServiceOrdersCreateOrConnectWithoutServiceOrdersCostInput
    upsert?: ServiceOrdersUpsertWithoutServiceOrdersCostInput
    connect?: ServiceOrdersWhereUniqueInput
    update?: XOR<XOR<ServiceOrdersUpdateToOneWithWhereWithoutServiceOrdersCostInput, ServiceOrdersUpdateWithoutServiceOrdersCostInput>, ServiceOrdersUncheckedUpdateWithoutServiceOrdersCostInput>
  }

  export type ProductsUpdateOneWithoutServiceOrdersCostNestedInput = {
    create?: XOR<ProductsCreateWithoutServiceOrdersCostInput, ProductsUncheckedCreateWithoutServiceOrdersCostInput>
    connectOrCreate?: ProductsCreateOrConnectWithoutServiceOrdersCostInput
    upsert?: ProductsUpsertWithoutServiceOrdersCostInput
    disconnect?: ProductsWhereInput | boolean
    delete?: ProductsWhereInput | boolean
    connect?: ProductsWhereUniqueInput
    update?: XOR<XOR<ProductsUpdateToOneWithWhereWithoutServiceOrdersCostInput, ProductsUpdateWithoutServiceOrdersCostInput>, ProductsUncheckedUpdateWithoutServiceOrdersCostInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductsCreateNestedOneWithoutStockMovementsInput = {
    create?: XOR<ProductsCreateWithoutStockMovementsInput, ProductsUncheckedCreateWithoutStockMovementsInput>
    connectOrCreate?: ProductsCreateOrConnectWithoutStockMovementsInput
    connect?: ProductsWhereUniqueInput
  }

  export type EnumMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.MovementType
  }

  export type EnumReferenceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReferenceType
  }

  export type ProductsUpdateOneRequiredWithoutStockMovementsNestedInput = {
    create?: XOR<ProductsCreateWithoutStockMovementsInput, ProductsUncheckedCreateWithoutStockMovementsInput>
    connectOrCreate?: ProductsCreateOrConnectWithoutStockMovementsInput
    upsert?: ProductsUpsertWithoutStockMovementsInput
    connect?: ProductsWhereUniqueInput
    update?: XOR<XOR<ProductsUpdateToOneWithWhereWithoutStockMovementsInput, ProductsUpdateWithoutStockMovementsInput>, ProductsUncheckedUpdateWithoutStockMovementsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumServiceOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceOrderStatus | EnumServiceOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceOrderStatusFilter<$PrismaModel> | $Enums.ServiceOrderStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumServiceOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceOrderStatus | EnumServiceOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceOrderStatus[] | ListEnumServiceOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceOrderStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeFilter<$PrismaModel> | $Enums.CostType
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeWithAggregatesFilter<$PrismaModel> | $Enums.CostType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCostTypeFilter<$PrismaModel>
    _max?: NestedEnumCostTypeFilter<$PrismaModel>
  }

  export type NestedEnumMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeFilter<$PrismaModel> | $Enums.MovementType
  }

  export type NestedEnumReferenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferenceType | EnumReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReferenceTypeFilter<$PrismaModel> | $Enums.ReferenceType
  }

  export type NestedEnumMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.MovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumMovementTypeFilter<$PrismaModel>
  }

  export type NestedEnumReferenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferenceType | EnumReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferenceType[] | ListEnumReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReferenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReferenceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReferenceTypeFilter<$PrismaModel>
    _max?: NestedEnumReferenceTypeFilter<$PrismaModel>
  }

  export type ServiceOrdersCostCreateWithoutServiceOrderInput = {
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
    Product?: ProductsCreateNestedOneWithoutServiceOrdersCostInput
  }

  export type ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput = {
    id?: number
    productId?: number | null
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCostCreateOrConnectWithoutServiceOrderInput = {
    where: ServiceOrdersCostWhereUniqueInput
    create: XOR<ServiceOrdersCostCreateWithoutServiceOrderInput, ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput>
  }

  export type ServiceOrdersCostCreateManyServiceOrderInputEnvelope = {
    data: ServiceOrdersCostCreateManyServiceOrderInput | ServiceOrdersCostCreateManyServiceOrderInput[]
    skipDuplicates?: boolean
  }

  export type ServiceOrdersCostUpsertWithWhereUniqueWithoutServiceOrderInput = {
    where: ServiceOrdersCostWhereUniqueInput
    update: XOR<ServiceOrdersCostUpdateWithoutServiceOrderInput, ServiceOrdersCostUncheckedUpdateWithoutServiceOrderInput>
    create: XOR<ServiceOrdersCostCreateWithoutServiceOrderInput, ServiceOrdersCostUncheckedCreateWithoutServiceOrderInput>
  }

  export type ServiceOrdersCostUpdateWithWhereUniqueWithoutServiceOrderInput = {
    where: ServiceOrdersCostWhereUniqueInput
    data: XOR<ServiceOrdersCostUpdateWithoutServiceOrderInput, ServiceOrdersCostUncheckedUpdateWithoutServiceOrderInput>
  }

  export type ServiceOrdersCostUpdateManyWithWhereWithoutServiceOrderInput = {
    where: ServiceOrdersCostScalarWhereInput
    data: XOR<ServiceOrdersCostUpdateManyMutationInput, ServiceOrdersCostUncheckedUpdateManyWithoutServiceOrderInput>
  }

  export type ServiceOrdersCostScalarWhereInput = {
    AND?: ServiceOrdersCostScalarWhereInput | ServiceOrdersCostScalarWhereInput[]
    OR?: ServiceOrdersCostScalarWhereInput[]
    NOT?: ServiceOrdersCostScalarWhereInput | ServiceOrdersCostScalarWhereInput[]
    id?: IntFilter<"ServiceOrdersCost"> | number
    serviceOrderId?: IntFilter<"ServiceOrdersCost"> | number
    productId?: IntNullableFilter<"ServiceOrdersCost"> | number | null
    description?: StringFilter<"ServiceOrdersCost"> | string
    value?: DecimalFilter<"ServiceOrdersCost"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"ServiceOrdersCost"> | number
    type?: EnumCostTypeFilter<"ServiceOrdersCost"> | $Enums.CostType
    createdAt?: DateTimeFilter<"ServiceOrdersCost"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrdersCost"> | Date | string
  }

  export type ServiceOrdersCostCreateWithoutProductInput = {
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrder: ServiceOrdersCreateNestedOneWithoutServiceOrdersCostInput
  }

  export type ServiceOrdersCostUncheckedCreateWithoutProductInput = {
    id?: number
    serviceOrderId: number
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCostCreateOrConnectWithoutProductInput = {
    where: ServiceOrdersCostWhereUniqueInput
    create: XOR<ServiceOrdersCostCreateWithoutProductInput, ServiceOrdersCostUncheckedCreateWithoutProductInput>
  }

  export type ServiceOrdersCostCreateManyProductInputEnvelope = {
    data: ServiceOrdersCostCreateManyProductInput | ServiceOrdersCostCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type StockMovementsCreateWithoutProductInput = {
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockMovementsUncheckedCreateWithoutProductInput = {
    id?: number
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockMovementsCreateOrConnectWithoutProductInput = {
    where: StockMovementsWhereUniqueInput
    create: XOR<StockMovementsCreateWithoutProductInput, StockMovementsUncheckedCreateWithoutProductInput>
  }

  export type StockMovementsCreateManyProductInputEnvelope = {
    data: StockMovementsCreateManyProductInput | StockMovementsCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ServiceOrdersCostUpsertWithWhereUniqueWithoutProductInput = {
    where: ServiceOrdersCostWhereUniqueInput
    update: XOR<ServiceOrdersCostUpdateWithoutProductInput, ServiceOrdersCostUncheckedUpdateWithoutProductInput>
    create: XOR<ServiceOrdersCostCreateWithoutProductInput, ServiceOrdersCostUncheckedCreateWithoutProductInput>
  }

  export type ServiceOrdersCostUpdateWithWhereUniqueWithoutProductInput = {
    where: ServiceOrdersCostWhereUniqueInput
    data: XOR<ServiceOrdersCostUpdateWithoutProductInput, ServiceOrdersCostUncheckedUpdateWithoutProductInput>
  }

  export type ServiceOrdersCostUpdateManyWithWhereWithoutProductInput = {
    where: ServiceOrdersCostScalarWhereInput
    data: XOR<ServiceOrdersCostUpdateManyMutationInput, ServiceOrdersCostUncheckedUpdateManyWithoutProductInput>
  }

  export type StockMovementsUpsertWithWhereUniqueWithoutProductInput = {
    where: StockMovementsWhereUniqueInput
    update: XOR<StockMovementsUpdateWithoutProductInput, StockMovementsUncheckedUpdateWithoutProductInput>
    create: XOR<StockMovementsCreateWithoutProductInput, StockMovementsUncheckedCreateWithoutProductInput>
  }

  export type StockMovementsUpdateWithWhereUniqueWithoutProductInput = {
    where: StockMovementsWhereUniqueInput
    data: XOR<StockMovementsUpdateWithoutProductInput, StockMovementsUncheckedUpdateWithoutProductInput>
  }

  export type StockMovementsUpdateManyWithWhereWithoutProductInput = {
    where: StockMovementsScalarWhereInput
    data: XOR<StockMovementsUpdateManyMutationInput, StockMovementsUncheckedUpdateManyWithoutProductInput>
  }

  export type StockMovementsScalarWhereInput = {
    AND?: StockMovementsScalarWhereInput | StockMovementsScalarWhereInput[]
    OR?: StockMovementsScalarWhereInput[]
    NOT?: StockMovementsScalarWhereInput | StockMovementsScalarWhereInput[]
    id?: IntFilter<"StockMovements"> | number
    productId?: IntFilter<"StockMovements"> | number
    movementType?: EnumMovementTypeFilter<"StockMovements"> | $Enums.MovementType
    referenceType?: EnumReferenceTypeFilter<"StockMovements"> | $Enums.ReferenceType
    referenceId?: IntFilter<"StockMovements"> | number
    quantity?: IntFilter<"StockMovements"> | number
    unitPrice?: DecimalFilter<"StockMovements"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"StockMovements"> | string | null
    createdAt?: DateTimeFilter<"StockMovements"> | Date | string
    updatedAt?: DateTimeFilter<"StockMovements"> | Date | string
  }

  export type ServiceOrdersCreateWithoutServiceOrdersCostInput = {
    externalId?: string
    customerName: string
    customerContact: string
    price: Decimal | DecimalJsLike | number | string
    description: string
    status?: $Enums.ServiceOrderStatus
    completionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersUncheckedCreateWithoutServiceOrdersCostInput = {
    id?: number
    externalId?: string
    customerName: string
    customerContact: string
    price: Decimal | DecimalJsLike | number | string
    description: string
    status?: $Enums.ServiceOrderStatus
    completionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCreateOrConnectWithoutServiceOrdersCostInput = {
    where: ServiceOrdersWhereUniqueInput
    create: XOR<ServiceOrdersCreateWithoutServiceOrdersCostInput, ServiceOrdersUncheckedCreateWithoutServiceOrdersCostInput>
  }

  export type ProductsCreateWithoutServiceOrdersCostInput = {
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    StockMovements?: StockMovementsCreateNestedManyWithoutProductInput
  }

  export type ProductsUncheckedCreateWithoutServiceOrdersCostInput = {
    id?: number
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    StockMovements?: StockMovementsUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductsCreateOrConnectWithoutServiceOrdersCostInput = {
    where: ProductsWhereUniqueInput
    create: XOR<ProductsCreateWithoutServiceOrdersCostInput, ProductsUncheckedCreateWithoutServiceOrdersCostInput>
  }

  export type ServiceOrdersUpsertWithoutServiceOrdersCostInput = {
    update: XOR<ServiceOrdersUpdateWithoutServiceOrdersCostInput, ServiceOrdersUncheckedUpdateWithoutServiceOrdersCostInput>
    create: XOR<ServiceOrdersCreateWithoutServiceOrdersCostInput, ServiceOrdersUncheckedCreateWithoutServiceOrdersCostInput>
    where?: ServiceOrdersWhereInput
  }

  export type ServiceOrdersUpdateToOneWithWhereWithoutServiceOrdersCostInput = {
    where?: ServiceOrdersWhereInput
    data: XOR<ServiceOrdersUpdateWithoutServiceOrdersCostInput, ServiceOrdersUncheckedUpdateWithoutServiceOrdersCostInput>
  }

  export type ServiceOrdersUpdateWithoutServiceOrdersCostInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerContact?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceOrderStatusFieldUpdateOperationsInput | $Enums.ServiceOrderStatus
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersUncheckedUpdateWithoutServiceOrdersCostInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerContact?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceOrderStatusFieldUpdateOperationsInput | $Enums.ServiceOrderStatus
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductsUpsertWithoutServiceOrdersCostInput = {
    update: XOR<ProductsUpdateWithoutServiceOrdersCostInput, ProductsUncheckedUpdateWithoutServiceOrdersCostInput>
    create: XOR<ProductsCreateWithoutServiceOrdersCostInput, ProductsUncheckedCreateWithoutServiceOrdersCostInput>
    where?: ProductsWhereInput
  }

  export type ProductsUpdateToOneWithWhereWithoutServiceOrdersCostInput = {
    where?: ProductsWhereInput
    data: XOR<ProductsUpdateWithoutServiceOrdersCostInput, ProductsUncheckedUpdateWithoutServiceOrdersCostInput>
  }

  export type ProductsUpdateWithoutServiceOrdersCostInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StockMovements?: StockMovementsUpdateManyWithoutProductNestedInput
  }

  export type ProductsUncheckedUpdateWithoutServiceOrdersCostInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StockMovements?: StockMovementsUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductsCreateWithoutStockMovementsInput = {
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrdersCost?: ServiceOrdersCostCreateNestedManyWithoutProductInput
  }

  export type ProductsUncheckedCreateWithoutStockMovementsInput = {
    id?: number
    externalId?: string
    name: string
    stockQuantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ServiceOrdersCost?: ServiceOrdersCostUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductsCreateOrConnectWithoutStockMovementsInput = {
    where: ProductsWhereUniqueInput
    create: XOR<ProductsCreateWithoutStockMovementsInput, ProductsUncheckedCreateWithoutStockMovementsInput>
  }

  export type ProductsUpsertWithoutStockMovementsInput = {
    update: XOR<ProductsUpdateWithoutStockMovementsInput, ProductsUncheckedUpdateWithoutStockMovementsInput>
    create: XOR<ProductsCreateWithoutStockMovementsInput, ProductsUncheckedCreateWithoutStockMovementsInput>
    where?: ProductsWhereInput
  }

  export type ProductsUpdateToOneWithWhereWithoutStockMovementsInput = {
    where?: ProductsWhereInput
    data: XOR<ProductsUpdateWithoutStockMovementsInput, ProductsUncheckedUpdateWithoutStockMovementsInput>
  }

  export type ProductsUpdateWithoutStockMovementsInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrdersCost?: ServiceOrdersCostUpdateManyWithoutProductNestedInput
  }

  export type ProductsUncheckedUpdateWithoutStockMovementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrdersCost?: ServiceOrdersCostUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ServiceOrdersCostCreateManyServiceOrderInput = {
    id?: number
    productId?: number | null
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCostUpdateWithoutServiceOrderInput = {
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Product?: ProductsUpdateOneWithoutServiceOrdersCostNestedInput
  }

  export type ServiceOrdersCostUncheckedUpdateWithoutServiceOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCostUncheckedUpdateManyWithoutServiceOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCostCreateManyProductInput = {
    id?: number
    serviceOrderId: number
    description: string
    value: Decimal | DecimalJsLike | number | string
    quantity: number
    type: $Enums.CostType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockMovementsCreateManyProductInput = {
    id?: number
    movementType: $Enums.MovementType
    referenceType: $Enums.ReferenceType
    referenceId: number
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrdersCostUpdateWithoutProductInput = {
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ServiceOrder?: ServiceOrdersUpdateOneRequiredWithoutServiceOrdersCostNestedInput
  }

  export type ServiceOrdersCostUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceOrderId?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrdersCostUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceOrderId?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementsUpdateWithoutProductInput = {
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementsUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementsUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    movementType?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    referenceType?: EnumReferenceTypeFieldUpdateOperationsInput | $Enums.ReferenceType
    referenceId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}