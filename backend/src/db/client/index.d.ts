
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
 * Model ApprovalRequest
 * 
 */
export type ApprovalRequest = $Result.DefaultSelection<Prisma.$ApprovalRequestPayload>
/**
 * Model AuthNonce
 * 
 */
export type AuthNonce = $Result.DefaultSelection<Prisma.$AuthNoncePayload>
/**
 * Model DelegatedSignature
 * DelegatedSignature - audit log for backend auto-signed actions
 * No scope system - blockchain validates all operations
 * Tracks: action, roomId, txDigest, timestamp for auditing
 */
export type DelegatedSignature = $Result.DefaultSelection<Prisma.$DelegatedSignaturePayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model diesel_schema_migrations
 * 
 */
export type diesel_schema_migrations = $Result.DefaultSelection<Prisma.$diesel_schema_migrationsPayload>
/**
 * Model meeting_rooms
 * 
 */
export type meeting_rooms = $Result.DefaultSelection<Prisma.$meeting_roomsPayload>
/**
 * Model room_metadata
 * 
 */
export type room_metadata = $Result.DefaultSelection<Prisma.$room_metadataPayload>
/**
 * Model room_participants
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type room_participants = $Result.DefaultSelection<Prisma.$room_participantsPayload>
/**
 * Model watermarks
 * 
 */
export type watermarks = $Result.DefaultSelection<Prisma.$watermarksPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ApprovalRequests
 * const approvalRequests = await prisma.approvalRequest.findMany()
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
   * // Fetch zero or more ApprovalRequests
   * const approvalRequests = await prisma.approvalRequest.findMany()
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
   * `prisma.approvalRequest`: Exposes CRUD operations for the **ApprovalRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalRequests
    * const approvalRequests = await prisma.approvalRequest.findMany()
    * ```
    */
  get approvalRequest(): Prisma.ApprovalRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authNonce`: Exposes CRUD operations for the **AuthNonce** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthNonces
    * const authNonces = await prisma.authNonce.findMany()
    * ```
    */
  get authNonce(): Prisma.AuthNonceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delegatedSignature`: Exposes CRUD operations for the **DelegatedSignature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DelegatedSignatures
    * const delegatedSignatures = await prisma.delegatedSignature.findMany()
    * ```
    */
  get delegatedSignature(): Prisma.DelegatedSignatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.diesel_schema_migrations`: Exposes CRUD operations for the **diesel_schema_migrations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Diesel_schema_migrations
    * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findMany()
    * ```
    */
  get diesel_schema_migrations(): Prisma.diesel_schema_migrationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meeting_rooms`: Exposes CRUD operations for the **meeting_rooms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meeting_rooms
    * const meeting_rooms = await prisma.meeting_rooms.findMany()
    * ```
    */
  get meeting_rooms(): Prisma.meeting_roomsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_metadata`: Exposes CRUD operations for the **room_metadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_metadata
    * const room_metadata = await prisma.room_metadata.findMany()
    * ```
    */
  get room_metadata(): Prisma.room_metadataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_participants`: Exposes CRUD operations for the **room_participants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_participants
    * const room_participants = await prisma.room_participants.findMany()
    * ```
    */
  get room_participants(): Prisma.room_participantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watermarks`: Exposes CRUD operations for the **watermarks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Watermarks
    * const watermarks = await prisma.watermarks.findMany()
    * ```
    */
  get watermarks(): Prisma.watermarksDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    ApprovalRequest: 'ApprovalRequest',
    AuthNonce: 'AuthNonce',
    DelegatedSignature: 'DelegatedSignature',
    RefreshToken: 'RefreshToken',
    Session: 'Session',
    User: 'User',
    Wallet: 'Wallet',
    diesel_schema_migrations: 'diesel_schema_migrations',
    meeting_rooms: 'meeting_rooms',
    room_metadata: 'room_metadata',
    room_participants: 'room_participants',
    watermarks: 'watermarks'
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
      modelProps: "approvalRequest" | "authNonce" | "delegatedSignature" | "refreshToken" | "session" | "user" | "wallet" | "diesel_schema_migrations" | "meeting_rooms" | "room_metadata" | "room_participants" | "watermarks"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ApprovalRequest: {
        payload: Prisma.$ApprovalRequestPayload<ExtArgs>
        fields: Prisma.ApprovalRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          findFirst: {
            args: Prisma.ApprovalRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          findMany: {
            args: Prisma.ApprovalRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>[]
          }
          create: {
            args: Prisma.ApprovalRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          createMany: {
            args: Prisma.ApprovalRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>[]
          }
          delete: {
            args: Prisma.ApprovalRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          update: {
            args: Prisma.ApprovalRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          deleteMany: {
            args: Prisma.ApprovalRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>[]
          }
          upsert: {
            args: Prisma.ApprovalRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          aggregate: {
            args: Prisma.ApprovalRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalRequest>
          }
          groupBy: {
            args: Prisma.ApprovalRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalRequestCountAggregateOutputType> | number
          }
        }
      }
      AuthNonce: {
        payload: Prisma.$AuthNoncePayload<ExtArgs>
        fields: Prisma.AuthNonceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthNonceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthNonceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>
          }
          findFirst: {
            args: Prisma.AuthNonceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthNonceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>
          }
          findMany: {
            args: Prisma.AuthNonceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>[]
          }
          create: {
            args: Prisma.AuthNonceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>
          }
          createMany: {
            args: Prisma.AuthNonceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthNonceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>[]
          }
          delete: {
            args: Prisma.AuthNonceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>
          }
          update: {
            args: Prisma.AuthNonceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>
          }
          deleteMany: {
            args: Prisma.AuthNonceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthNonceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthNonceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>[]
          }
          upsert: {
            args: Prisma.AuthNonceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthNoncePayload>
          }
          aggregate: {
            args: Prisma.AuthNonceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthNonce>
          }
          groupBy: {
            args: Prisma.AuthNonceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthNonceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthNonceCountArgs<ExtArgs>
            result: $Utils.Optional<AuthNonceCountAggregateOutputType> | number
          }
        }
      }
      DelegatedSignature: {
        payload: Prisma.$DelegatedSignaturePayload<ExtArgs>
        fields: Prisma.DelegatedSignatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DelegatedSignatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DelegatedSignatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>
          }
          findFirst: {
            args: Prisma.DelegatedSignatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DelegatedSignatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>
          }
          findMany: {
            args: Prisma.DelegatedSignatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>[]
          }
          create: {
            args: Prisma.DelegatedSignatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>
          }
          createMany: {
            args: Prisma.DelegatedSignatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DelegatedSignatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>[]
          }
          delete: {
            args: Prisma.DelegatedSignatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>
          }
          update: {
            args: Prisma.DelegatedSignatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>
          }
          deleteMany: {
            args: Prisma.DelegatedSignatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DelegatedSignatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DelegatedSignatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>[]
          }
          upsert: {
            args: Prisma.DelegatedSignatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegatedSignaturePayload>
          }
          aggregate: {
            args: Prisma.DelegatedSignatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelegatedSignature>
          }
          groupBy: {
            args: Prisma.DelegatedSignatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<DelegatedSignatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.DelegatedSignatureCountArgs<ExtArgs>
            result: $Utils.Optional<DelegatedSignatureCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      diesel_schema_migrations: {
        payload: Prisma.$diesel_schema_migrationsPayload<ExtArgs>
        fields: Prisma.diesel_schema_migrationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.diesel_schema_migrationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.diesel_schema_migrationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>
          }
          findFirst: {
            args: Prisma.diesel_schema_migrationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.diesel_schema_migrationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>
          }
          findMany: {
            args: Prisma.diesel_schema_migrationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>[]
          }
          create: {
            args: Prisma.diesel_schema_migrationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>
          }
          createMany: {
            args: Prisma.diesel_schema_migrationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.diesel_schema_migrationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>[]
          }
          delete: {
            args: Prisma.diesel_schema_migrationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>
          }
          update: {
            args: Prisma.diesel_schema_migrationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>
          }
          deleteMany: {
            args: Prisma.diesel_schema_migrationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.diesel_schema_migrationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.diesel_schema_migrationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>[]
          }
          upsert: {
            args: Prisma.diesel_schema_migrationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$diesel_schema_migrationsPayload>
          }
          aggregate: {
            args: Prisma.Diesel_schema_migrationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiesel_schema_migrations>
          }
          groupBy: {
            args: Prisma.diesel_schema_migrationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Diesel_schema_migrationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.diesel_schema_migrationsCountArgs<ExtArgs>
            result: $Utils.Optional<Diesel_schema_migrationsCountAggregateOutputType> | number
          }
        }
      }
      meeting_rooms: {
        payload: Prisma.$meeting_roomsPayload<ExtArgs>
        fields: Prisma.meeting_roomsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.meeting_roomsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.meeting_roomsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>
          }
          findFirst: {
            args: Prisma.meeting_roomsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.meeting_roomsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>
          }
          findMany: {
            args: Prisma.meeting_roomsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>[]
          }
          create: {
            args: Prisma.meeting_roomsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>
          }
          createMany: {
            args: Prisma.meeting_roomsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.meeting_roomsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>[]
          }
          delete: {
            args: Prisma.meeting_roomsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>
          }
          update: {
            args: Prisma.meeting_roomsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>
          }
          deleteMany: {
            args: Prisma.meeting_roomsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.meeting_roomsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.meeting_roomsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>[]
          }
          upsert: {
            args: Prisma.meeting_roomsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomsPayload>
          }
          aggregate: {
            args: Prisma.Meeting_roomsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting_rooms>
          }
          groupBy: {
            args: Prisma.meeting_roomsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Meeting_roomsGroupByOutputType>[]
          }
          count: {
            args: Prisma.meeting_roomsCountArgs<ExtArgs>
            result: $Utils.Optional<Meeting_roomsCountAggregateOutputType> | number
          }
        }
      }
      room_metadata: {
        payload: Prisma.$room_metadataPayload<ExtArgs>
        fields: Prisma.room_metadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_metadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_metadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>
          }
          findFirst: {
            args: Prisma.room_metadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_metadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>
          }
          findMany: {
            args: Prisma.room_metadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>[]
          }
          create: {
            args: Prisma.room_metadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>
          }
          createMany: {
            args: Prisma.room_metadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_metadataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>[]
          }
          delete: {
            args: Prisma.room_metadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>
          }
          update: {
            args: Prisma.room_metadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>
          }
          deleteMany: {
            args: Prisma.room_metadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_metadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_metadataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>[]
          }
          upsert: {
            args: Prisma.room_metadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_metadataPayload>
          }
          aggregate: {
            args: Prisma.Room_metadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_metadata>
          }
          groupBy: {
            args: Prisma.room_metadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_metadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_metadataCountArgs<ExtArgs>
            result: $Utils.Optional<Room_metadataCountAggregateOutputType> | number
          }
        }
      }
      room_participants: {
        payload: Prisma.$room_participantsPayload<ExtArgs>
        fields: Prisma.room_participantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_participantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_participantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>
          }
          findFirst: {
            args: Prisma.room_participantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_participantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>
          }
          findMany: {
            args: Prisma.room_participantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>[]
          }
          create: {
            args: Prisma.room_participantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>
          }
          createMany: {
            args: Prisma.room_participantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_participantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>[]
          }
          delete: {
            args: Prisma.room_participantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>
          }
          update: {
            args: Prisma.room_participantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>
          }
          deleteMany: {
            args: Prisma.room_participantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_participantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_participantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>[]
          }
          upsert: {
            args: Prisma.room_participantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_participantsPayload>
          }
          aggregate: {
            args: Prisma.Room_participantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_participants>
          }
          groupBy: {
            args: Prisma.room_participantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_participantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_participantsCountArgs<ExtArgs>
            result: $Utils.Optional<Room_participantsCountAggregateOutputType> | number
          }
        }
      }
      watermarks: {
        payload: Prisma.$watermarksPayload<ExtArgs>
        fields: Prisma.watermarksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.watermarksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.watermarksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>
          }
          findFirst: {
            args: Prisma.watermarksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.watermarksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>
          }
          findMany: {
            args: Prisma.watermarksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>[]
          }
          create: {
            args: Prisma.watermarksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>
          }
          createMany: {
            args: Prisma.watermarksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.watermarksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>[]
          }
          delete: {
            args: Prisma.watermarksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>
          }
          update: {
            args: Prisma.watermarksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>
          }
          deleteMany: {
            args: Prisma.watermarksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.watermarksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.watermarksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>[]
          }
          upsert: {
            args: Prisma.watermarksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$watermarksPayload>
          }
          aggregate: {
            args: Prisma.WatermarksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatermarks>
          }
          groupBy: {
            args: Prisma.watermarksGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatermarksGroupByOutputType>[]
          }
          count: {
            args: Prisma.watermarksCountArgs<ExtArgs>
            result: $Utils.Optional<WatermarksCountAggregateOutputType> | number
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    approvalRequest?: ApprovalRequestOmit
    authNonce?: AuthNonceOmit
    delegatedSignature?: DelegatedSignatureOmit
    refreshToken?: RefreshTokenOmit
    session?: SessionOmit
    user?: UserOmit
    wallet?: WalletOmit
    diesel_schema_migrations?: diesel_schema_migrationsOmit
    meeting_rooms?: meeting_roomsOmit
    room_metadata?: room_metadataOmit
    room_participants?: room_participantsOmit
    watermarks?: watermarksOmit
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
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    DelegatedSignature: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DelegatedSignature?: boolean | SessionCountOutputTypeCountDelegatedSignatureArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountDelegatedSignatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegatedSignatureWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Session: number
    Wallet: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | UserCountOutputTypeCountSessionArgs
    Wallet?: boolean | UserCountOutputTypeCountWalletArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    Session: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | WalletCountOutputTypeCountSessionArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type Meeting_roomsCountOutputType
   */

  export type Meeting_roomsCountOutputType = {
    ApprovalRequest: number
    room_participants: number
  }

  export type Meeting_roomsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ApprovalRequest?: boolean | Meeting_roomsCountOutputTypeCountApprovalRequestArgs
    room_participants?: boolean | Meeting_roomsCountOutputTypeCountRoom_participantsArgs
  }

  // Custom InputTypes
  /**
   * Meeting_roomsCountOutputType without action
   */
  export type Meeting_roomsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting_roomsCountOutputType
     */
    select?: Meeting_roomsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Meeting_roomsCountOutputType without action
   */
  export type Meeting_roomsCountOutputTypeCountApprovalRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRequestWhereInput
  }

  /**
   * Meeting_roomsCountOutputType without action
   */
  export type Meeting_roomsCountOutputTypeCountRoom_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_participantsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ApprovalRequest
   */

  export type AggregateApprovalRequest = {
    _count: ApprovalRequestCountAggregateOutputType | null
    _min: ApprovalRequestMinAggregateOutputType | null
    _max: ApprovalRequestMaxAggregateOutputType | null
  }

  export type ApprovalRequestMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    requester_address: string | null
    status: string | null
    created_at: Date | null
    resolved_at: Date | null
    resolver_address: string | null
  }

  export type ApprovalRequestMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    requester_address: string | null
    status: string | null
    created_at: Date | null
    resolved_at: Date | null
    resolver_address: string | null
  }

  export type ApprovalRequestCountAggregateOutputType = {
    id: number
    room_id: number
    requester_address: number
    status: number
    created_at: number
    resolved_at: number
    resolver_address: number
    _all: number
  }


  export type ApprovalRequestMinAggregateInputType = {
    id?: true
    room_id?: true
    requester_address?: true
    status?: true
    created_at?: true
    resolved_at?: true
    resolver_address?: true
  }

  export type ApprovalRequestMaxAggregateInputType = {
    id?: true
    room_id?: true
    requester_address?: true
    status?: true
    created_at?: true
    resolved_at?: true
    resolver_address?: true
  }

  export type ApprovalRequestCountAggregateInputType = {
    id?: true
    room_id?: true
    requester_address?: true
    status?: true
    created_at?: true
    resolved_at?: true
    resolver_address?: true
    _all?: true
  }

  export type ApprovalRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalRequest to aggregate.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalRequests
    **/
    _count?: true | ApprovalRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalRequestMaxAggregateInputType
  }

  export type GetApprovalRequestAggregateType<T extends ApprovalRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalRequest[P]>
      : GetScalarType<T[P], AggregateApprovalRequest[P]>
  }




  export type ApprovalRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRequestWhereInput
    orderBy?: ApprovalRequestOrderByWithAggregationInput | ApprovalRequestOrderByWithAggregationInput[]
    by: ApprovalRequestScalarFieldEnum[] | ApprovalRequestScalarFieldEnum
    having?: ApprovalRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalRequestCountAggregateInputType | true
    _min?: ApprovalRequestMinAggregateInputType
    _max?: ApprovalRequestMaxAggregateInputType
  }

  export type ApprovalRequestGroupByOutputType = {
    id: string
    room_id: string
    requester_address: string
    status: string
    created_at: Date
    resolved_at: Date | null
    resolver_address: string | null
    _count: ApprovalRequestCountAggregateOutputType | null
    _min: ApprovalRequestMinAggregateOutputType | null
    _max: ApprovalRequestMaxAggregateOutputType | null
  }

  type GetApprovalRequestGroupByPayload<T extends ApprovalRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalRequestGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    requester_address?: boolean
    status?: boolean
    created_at?: boolean
    resolved_at?: boolean
    resolver_address?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRequest"]>

  export type ApprovalRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    requester_address?: boolean
    status?: boolean
    created_at?: boolean
    resolved_at?: boolean
    resolver_address?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRequest"]>

  export type ApprovalRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    requester_address?: boolean
    status?: boolean
    created_at?: boolean
    resolved_at?: boolean
    resolver_address?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRequest"]>

  export type ApprovalRequestSelectScalar = {
    id?: boolean
    room_id?: boolean
    requester_address?: boolean
    status?: boolean
    created_at?: boolean
    resolved_at?: boolean
    resolver_address?: boolean
  }

  export type ApprovalRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "requester_address" | "status" | "created_at" | "resolved_at" | "resolver_address", ExtArgs["result"]["approvalRequest"]>
  export type ApprovalRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }
  export type ApprovalRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }
  export type ApprovalRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }

  export type $ApprovalRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalRequest"
    objects: {
      meeting_rooms: Prisma.$meeting_roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      requester_address: string
      status: string
      created_at: Date
      resolved_at: Date | null
      resolver_address: string | null
    }, ExtArgs["result"]["approvalRequest"]>
    composites: {}
  }

  type ApprovalRequestGetPayload<S extends boolean | null | undefined | ApprovalRequestDefaultArgs> = $Result.GetResult<Prisma.$ApprovalRequestPayload, S>

  type ApprovalRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalRequestCountAggregateInputType | true
    }

  export interface ApprovalRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalRequest'], meta: { name: 'ApprovalRequest' } }
    /**
     * Find zero or one ApprovalRequest that matches the filter.
     * @param {ApprovalRequestFindUniqueArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalRequestFindUniqueArgs>(args: SelectSubset<T, ApprovalRequestFindUniqueArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalRequestFindUniqueOrThrowArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestFindFirstArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalRequestFindFirstArgs>(args?: SelectSubset<T, ApprovalRequestFindFirstArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestFindFirstOrThrowArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalRequests
     * const approvalRequests = await prisma.approvalRequest.findMany()
     * 
     * // Get first 10 ApprovalRequests
     * const approvalRequests = await prisma.approvalRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalRequestWithIdOnly = await prisma.approvalRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalRequestFindManyArgs>(args?: SelectSubset<T, ApprovalRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalRequest.
     * @param {ApprovalRequestCreateArgs} args - Arguments to create a ApprovalRequest.
     * @example
     * // Create one ApprovalRequest
     * const ApprovalRequest = await prisma.approvalRequest.create({
     *   data: {
     *     // ... data to create a ApprovalRequest
     *   }
     * })
     * 
     */
    create<T extends ApprovalRequestCreateArgs>(args: SelectSubset<T, ApprovalRequestCreateArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalRequests.
     * @param {ApprovalRequestCreateManyArgs} args - Arguments to create many ApprovalRequests.
     * @example
     * // Create many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalRequestCreateManyArgs>(args?: SelectSubset<T, ApprovalRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalRequests and returns the data saved in the database.
     * @param {ApprovalRequestCreateManyAndReturnArgs} args - Arguments to create many ApprovalRequests.
     * @example
     * // Create many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalRequests and only return the `id`
     * const approvalRequestWithIdOnly = await prisma.approvalRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalRequest.
     * @param {ApprovalRequestDeleteArgs} args - Arguments to delete one ApprovalRequest.
     * @example
     * // Delete one ApprovalRequest
     * const ApprovalRequest = await prisma.approvalRequest.delete({
     *   where: {
     *     // ... filter to delete one ApprovalRequest
     *   }
     * })
     * 
     */
    delete<T extends ApprovalRequestDeleteArgs>(args: SelectSubset<T, ApprovalRequestDeleteArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalRequest.
     * @param {ApprovalRequestUpdateArgs} args - Arguments to update one ApprovalRequest.
     * @example
     * // Update one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalRequestUpdateArgs>(args: SelectSubset<T, ApprovalRequestUpdateArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalRequests.
     * @param {ApprovalRequestDeleteManyArgs} args - Arguments to filter ApprovalRequests to delete.
     * @example
     * // Delete a few ApprovalRequests
     * const { count } = await prisma.approvalRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalRequestDeleteManyArgs>(args?: SelectSubset<T, ApprovalRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalRequestUpdateManyArgs>(args: SelectSubset<T, ApprovalRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalRequests and returns the data updated in the database.
     * @param {ApprovalRequestUpdateManyAndReturnArgs} args - Arguments to update many ApprovalRequests.
     * @example
     * // Update many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalRequests and only return the `id`
     * const approvalRequestWithIdOnly = await prisma.approvalRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApprovalRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalRequest.
     * @param {ApprovalRequestUpsertArgs} args - Arguments to update or create a ApprovalRequest.
     * @example
     * // Update or create a ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.upsert({
     *   create: {
     *     // ... data to create a ApprovalRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalRequest we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalRequestUpsertArgs>(args: SelectSubset<T, ApprovalRequestUpsertArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestCountArgs} args - Arguments to filter ApprovalRequests to count.
     * @example
     * // Count the number of ApprovalRequests
     * const count = await prisma.approvalRequest.count({
     *   where: {
     *     // ... the filter for the ApprovalRequests we want to count
     *   }
     * })
    **/
    count<T extends ApprovalRequestCountArgs>(
      args?: Subset<T, ApprovalRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApprovalRequestAggregateArgs>(args: Subset<T, ApprovalRequestAggregateArgs>): Prisma.PrismaPromise<GetApprovalRequestAggregateType<T>>

    /**
     * Group by ApprovalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestGroupByArgs} args - Group by arguments.
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
      T extends ApprovalRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalRequestGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApprovalRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalRequest model
   */
  readonly fields: ApprovalRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting_rooms<T extends meeting_roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, meeting_roomsDefaultArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ApprovalRequest model
   */
  interface ApprovalRequestFieldRefs {
    readonly id: FieldRef<"ApprovalRequest", 'String'>
    readonly room_id: FieldRef<"ApprovalRequest", 'String'>
    readonly requester_address: FieldRef<"ApprovalRequest", 'String'>
    readonly status: FieldRef<"ApprovalRequest", 'String'>
    readonly created_at: FieldRef<"ApprovalRequest", 'DateTime'>
    readonly resolved_at: FieldRef<"ApprovalRequest", 'DateTime'>
    readonly resolver_address: FieldRef<"ApprovalRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalRequest findUnique
   */
  export type ApprovalRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest findUniqueOrThrow
   */
  export type ApprovalRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest findFirst
   */
  export type ApprovalRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalRequests.
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRequests.
     */
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * ApprovalRequest findFirstOrThrow
   */
  export type ApprovalRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalRequests.
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRequests.
     */
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * ApprovalRequest findMany
   */
  export type ApprovalRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequests to fetch.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalRequests.
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * ApprovalRequest create
   */
  export type ApprovalRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ApprovalRequest.
     */
    data: XOR<ApprovalRequestCreateInput, ApprovalRequestUncheckedCreateInput>
  }

  /**
   * ApprovalRequest createMany
   */
  export type ApprovalRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalRequests.
     */
    data: ApprovalRequestCreateManyInput | ApprovalRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalRequest createManyAndReturn
   */
  export type ApprovalRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalRequests.
     */
    data: ApprovalRequestCreateManyInput | ApprovalRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalRequest update
   */
  export type ApprovalRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ApprovalRequest.
     */
    data: XOR<ApprovalRequestUpdateInput, ApprovalRequestUncheckedUpdateInput>
    /**
     * Choose, which ApprovalRequest to update.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest updateMany
   */
  export type ApprovalRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalRequests.
     */
    data: XOR<ApprovalRequestUpdateManyMutationInput, ApprovalRequestUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalRequests to update
     */
    where?: ApprovalRequestWhereInput
    /**
     * Limit how many ApprovalRequests to update.
     */
    limit?: number
  }

  /**
   * ApprovalRequest updateManyAndReturn
   */
  export type ApprovalRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalRequests.
     */
    data: XOR<ApprovalRequestUpdateManyMutationInput, ApprovalRequestUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalRequests to update
     */
    where?: ApprovalRequestWhereInput
    /**
     * Limit how many ApprovalRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalRequest upsert
   */
  export type ApprovalRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ApprovalRequest to update in case it exists.
     */
    where: ApprovalRequestWhereUniqueInput
    /**
     * In case the ApprovalRequest found by the `where` argument doesn't exist, create a new ApprovalRequest with this data.
     */
    create: XOR<ApprovalRequestCreateInput, ApprovalRequestUncheckedCreateInput>
    /**
     * In case the ApprovalRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalRequestUpdateInput, ApprovalRequestUncheckedUpdateInput>
  }

  /**
   * ApprovalRequest delete
   */
  export type ApprovalRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter which ApprovalRequest to delete.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest deleteMany
   */
  export type ApprovalRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalRequests to delete
     */
    where?: ApprovalRequestWhereInput
    /**
     * Limit how many ApprovalRequests to delete.
     */
    limit?: number
  }

  /**
   * ApprovalRequest without action
   */
  export type ApprovalRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
  }


  /**
   * Model AuthNonce
   */

  export type AggregateAuthNonce = {
    _count: AuthNonceCountAggregateOutputType | null
    _min: AuthNonceMinAggregateOutputType | null
    _max: AuthNonceMaxAggregateOutputType | null
  }

  export type AuthNonceMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    nonce: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type AuthNonceMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    nonce: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type AuthNonceCountAggregateOutputType = {
    id: number
    walletAddress: number
    nonce: number
    expiresAt: number
    consumedAt: number
    createdAt: number
    _all: number
  }


  export type AuthNonceMinAggregateInputType = {
    id?: true
    walletAddress?: true
    nonce?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type AuthNonceMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    nonce?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type AuthNonceCountAggregateInputType = {
    id?: true
    walletAddress?: true
    nonce?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AuthNonceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthNonce to aggregate.
     */
    where?: AuthNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthNonces to fetch.
     */
    orderBy?: AuthNonceOrderByWithRelationInput | AuthNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthNonces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthNonces
    **/
    _count?: true | AuthNonceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthNonceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthNonceMaxAggregateInputType
  }

  export type GetAuthNonceAggregateType<T extends AuthNonceAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthNonce]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthNonce[P]>
      : GetScalarType<T[P], AggregateAuthNonce[P]>
  }




  export type AuthNonceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthNonceWhereInput
    orderBy?: AuthNonceOrderByWithAggregationInput | AuthNonceOrderByWithAggregationInput[]
    by: AuthNonceScalarFieldEnum[] | AuthNonceScalarFieldEnum
    having?: AuthNonceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthNonceCountAggregateInputType | true
    _min?: AuthNonceMinAggregateInputType
    _max?: AuthNonceMaxAggregateInputType
  }

  export type AuthNonceGroupByOutputType = {
    id: string
    walletAddress: string
    nonce: string
    expiresAt: Date
    consumedAt: Date | null
    createdAt: Date
    _count: AuthNonceCountAggregateOutputType | null
    _min: AuthNonceMinAggregateOutputType | null
    _max: AuthNonceMaxAggregateOutputType | null
  }

  type GetAuthNonceGroupByPayload<T extends AuthNonceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthNonceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthNonceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthNonceGroupByOutputType[P]>
            : GetScalarType<T[P], AuthNonceGroupByOutputType[P]>
        }
      >
    >


  export type AuthNonceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    nonce?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["authNonce"]>

  export type AuthNonceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    nonce?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["authNonce"]>

  export type AuthNonceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    nonce?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["authNonce"]>

  export type AuthNonceSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    nonce?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }

  export type AuthNonceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "nonce" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["authNonce"]>

  export type $AuthNoncePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthNonce"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      nonce: string
      expiresAt: Date
      consumedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["authNonce"]>
    composites: {}
  }

  type AuthNonceGetPayload<S extends boolean | null | undefined | AuthNonceDefaultArgs> = $Result.GetResult<Prisma.$AuthNoncePayload, S>

  type AuthNonceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthNonceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthNonceCountAggregateInputType | true
    }

  export interface AuthNonceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthNonce'], meta: { name: 'AuthNonce' } }
    /**
     * Find zero or one AuthNonce that matches the filter.
     * @param {AuthNonceFindUniqueArgs} args - Arguments to find a AuthNonce
     * @example
     * // Get one AuthNonce
     * const authNonce = await prisma.authNonce.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthNonceFindUniqueArgs>(args: SelectSubset<T, AuthNonceFindUniqueArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthNonce that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthNonceFindUniqueOrThrowArgs} args - Arguments to find a AuthNonce
     * @example
     * // Get one AuthNonce
     * const authNonce = await prisma.authNonce.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthNonceFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthNonceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthNonce that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceFindFirstArgs} args - Arguments to find a AuthNonce
     * @example
     * // Get one AuthNonce
     * const authNonce = await prisma.authNonce.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthNonceFindFirstArgs>(args?: SelectSubset<T, AuthNonceFindFirstArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthNonce that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceFindFirstOrThrowArgs} args - Arguments to find a AuthNonce
     * @example
     * // Get one AuthNonce
     * const authNonce = await prisma.authNonce.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthNonceFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthNonceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthNonces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthNonces
     * const authNonces = await prisma.authNonce.findMany()
     * 
     * // Get first 10 AuthNonces
     * const authNonces = await prisma.authNonce.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authNonceWithIdOnly = await prisma.authNonce.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthNonceFindManyArgs>(args?: SelectSubset<T, AuthNonceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthNonce.
     * @param {AuthNonceCreateArgs} args - Arguments to create a AuthNonce.
     * @example
     * // Create one AuthNonce
     * const AuthNonce = await prisma.authNonce.create({
     *   data: {
     *     // ... data to create a AuthNonce
     *   }
     * })
     * 
     */
    create<T extends AuthNonceCreateArgs>(args: SelectSubset<T, AuthNonceCreateArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthNonces.
     * @param {AuthNonceCreateManyArgs} args - Arguments to create many AuthNonces.
     * @example
     * // Create many AuthNonces
     * const authNonce = await prisma.authNonce.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthNonceCreateManyArgs>(args?: SelectSubset<T, AuthNonceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthNonces and returns the data saved in the database.
     * @param {AuthNonceCreateManyAndReturnArgs} args - Arguments to create many AuthNonces.
     * @example
     * // Create many AuthNonces
     * const authNonce = await prisma.authNonce.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthNonces and only return the `id`
     * const authNonceWithIdOnly = await prisma.authNonce.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthNonceCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthNonceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthNonce.
     * @param {AuthNonceDeleteArgs} args - Arguments to delete one AuthNonce.
     * @example
     * // Delete one AuthNonce
     * const AuthNonce = await prisma.authNonce.delete({
     *   where: {
     *     // ... filter to delete one AuthNonce
     *   }
     * })
     * 
     */
    delete<T extends AuthNonceDeleteArgs>(args: SelectSubset<T, AuthNonceDeleteArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthNonce.
     * @param {AuthNonceUpdateArgs} args - Arguments to update one AuthNonce.
     * @example
     * // Update one AuthNonce
     * const authNonce = await prisma.authNonce.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthNonceUpdateArgs>(args: SelectSubset<T, AuthNonceUpdateArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthNonces.
     * @param {AuthNonceDeleteManyArgs} args - Arguments to filter AuthNonces to delete.
     * @example
     * // Delete a few AuthNonces
     * const { count } = await prisma.authNonce.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthNonceDeleteManyArgs>(args?: SelectSubset<T, AuthNonceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthNonces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthNonces
     * const authNonce = await prisma.authNonce.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthNonceUpdateManyArgs>(args: SelectSubset<T, AuthNonceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthNonces and returns the data updated in the database.
     * @param {AuthNonceUpdateManyAndReturnArgs} args - Arguments to update many AuthNonces.
     * @example
     * // Update many AuthNonces
     * const authNonce = await prisma.authNonce.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthNonces and only return the `id`
     * const authNonceWithIdOnly = await prisma.authNonce.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuthNonceUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthNonceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthNonce.
     * @param {AuthNonceUpsertArgs} args - Arguments to update or create a AuthNonce.
     * @example
     * // Update or create a AuthNonce
     * const authNonce = await prisma.authNonce.upsert({
     *   create: {
     *     // ... data to create a AuthNonce
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthNonce we want to update
     *   }
     * })
     */
    upsert<T extends AuthNonceUpsertArgs>(args: SelectSubset<T, AuthNonceUpsertArgs<ExtArgs>>): Prisma__AuthNonceClient<$Result.GetResult<Prisma.$AuthNoncePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthNonces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceCountArgs} args - Arguments to filter AuthNonces to count.
     * @example
     * // Count the number of AuthNonces
     * const count = await prisma.authNonce.count({
     *   where: {
     *     // ... the filter for the AuthNonces we want to count
     *   }
     * })
    **/
    count<T extends AuthNonceCountArgs>(
      args?: Subset<T, AuthNonceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthNonceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthNonce.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuthNonceAggregateArgs>(args: Subset<T, AuthNonceAggregateArgs>): Prisma.PrismaPromise<GetAuthNonceAggregateType<T>>

    /**
     * Group by AuthNonce.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthNonceGroupByArgs} args - Group by arguments.
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
      T extends AuthNonceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthNonceGroupByArgs['orderBy'] }
        : { orderBy?: AuthNonceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuthNonceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthNonceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthNonce model
   */
  readonly fields: AuthNonceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthNonce.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthNonceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuthNonce model
   */
  interface AuthNonceFieldRefs {
    readonly id: FieldRef<"AuthNonce", 'String'>
    readonly walletAddress: FieldRef<"AuthNonce", 'String'>
    readonly nonce: FieldRef<"AuthNonce", 'String'>
    readonly expiresAt: FieldRef<"AuthNonce", 'DateTime'>
    readonly consumedAt: FieldRef<"AuthNonce", 'DateTime'>
    readonly createdAt: FieldRef<"AuthNonce", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthNonce findUnique
   */
  export type AuthNonceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * Filter, which AuthNonce to fetch.
     */
    where: AuthNonceWhereUniqueInput
  }

  /**
   * AuthNonce findUniqueOrThrow
   */
  export type AuthNonceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * Filter, which AuthNonce to fetch.
     */
    where: AuthNonceWhereUniqueInput
  }

  /**
   * AuthNonce findFirst
   */
  export type AuthNonceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * Filter, which AuthNonce to fetch.
     */
    where?: AuthNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthNonces to fetch.
     */
    orderBy?: AuthNonceOrderByWithRelationInput | AuthNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthNonces.
     */
    cursor?: AuthNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthNonces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthNonces.
     */
    distinct?: AuthNonceScalarFieldEnum | AuthNonceScalarFieldEnum[]
  }

  /**
   * AuthNonce findFirstOrThrow
   */
  export type AuthNonceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * Filter, which AuthNonce to fetch.
     */
    where?: AuthNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthNonces to fetch.
     */
    orderBy?: AuthNonceOrderByWithRelationInput | AuthNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthNonces.
     */
    cursor?: AuthNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthNonces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthNonces.
     */
    distinct?: AuthNonceScalarFieldEnum | AuthNonceScalarFieldEnum[]
  }

  /**
   * AuthNonce findMany
   */
  export type AuthNonceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * Filter, which AuthNonces to fetch.
     */
    where?: AuthNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthNonces to fetch.
     */
    orderBy?: AuthNonceOrderByWithRelationInput | AuthNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthNonces.
     */
    cursor?: AuthNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthNonces.
     */
    skip?: number
    distinct?: AuthNonceScalarFieldEnum | AuthNonceScalarFieldEnum[]
  }

  /**
   * AuthNonce create
   */
  export type AuthNonceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * The data needed to create a AuthNonce.
     */
    data: XOR<AuthNonceCreateInput, AuthNonceUncheckedCreateInput>
  }

  /**
   * AuthNonce createMany
   */
  export type AuthNonceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthNonces.
     */
    data: AuthNonceCreateManyInput | AuthNonceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthNonce createManyAndReturn
   */
  export type AuthNonceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * The data used to create many AuthNonces.
     */
    data: AuthNonceCreateManyInput | AuthNonceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthNonce update
   */
  export type AuthNonceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * The data needed to update a AuthNonce.
     */
    data: XOR<AuthNonceUpdateInput, AuthNonceUncheckedUpdateInput>
    /**
     * Choose, which AuthNonce to update.
     */
    where: AuthNonceWhereUniqueInput
  }

  /**
   * AuthNonce updateMany
   */
  export type AuthNonceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthNonces.
     */
    data: XOR<AuthNonceUpdateManyMutationInput, AuthNonceUncheckedUpdateManyInput>
    /**
     * Filter which AuthNonces to update
     */
    where?: AuthNonceWhereInput
    /**
     * Limit how many AuthNonces to update.
     */
    limit?: number
  }

  /**
   * AuthNonce updateManyAndReturn
   */
  export type AuthNonceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * The data used to update AuthNonces.
     */
    data: XOR<AuthNonceUpdateManyMutationInput, AuthNonceUncheckedUpdateManyInput>
    /**
     * Filter which AuthNonces to update
     */
    where?: AuthNonceWhereInput
    /**
     * Limit how many AuthNonces to update.
     */
    limit?: number
  }

  /**
   * AuthNonce upsert
   */
  export type AuthNonceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * The filter to search for the AuthNonce to update in case it exists.
     */
    where: AuthNonceWhereUniqueInput
    /**
     * In case the AuthNonce found by the `where` argument doesn't exist, create a new AuthNonce with this data.
     */
    create: XOR<AuthNonceCreateInput, AuthNonceUncheckedCreateInput>
    /**
     * In case the AuthNonce was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthNonceUpdateInput, AuthNonceUncheckedUpdateInput>
  }

  /**
   * AuthNonce delete
   */
  export type AuthNonceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
    /**
     * Filter which AuthNonce to delete.
     */
    where: AuthNonceWhereUniqueInput
  }

  /**
   * AuthNonce deleteMany
   */
  export type AuthNonceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthNonces to delete
     */
    where?: AuthNonceWhereInput
    /**
     * Limit how many AuthNonces to delete.
     */
    limit?: number
  }

  /**
   * AuthNonce without action
   */
  export type AuthNonceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthNonce
     */
    select?: AuthNonceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthNonce
     */
    omit?: AuthNonceOmit<ExtArgs> | null
  }


  /**
   * Model DelegatedSignature
   */

  export type AggregateDelegatedSignature = {
    _count: DelegatedSignatureCountAggregateOutputType | null
    _min: DelegatedSignatureMinAggregateOutputType | null
    _max: DelegatedSignatureMaxAggregateOutputType | null
  }

  export type DelegatedSignatureMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    action: string | null
    roomId: string | null
    txDigest: string | null
    signature: string | null
    createdAt: Date | null
  }

  export type DelegatedSignatureMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    action: string | null
    roomId: string | null
    txDigest: string | null
    signature: string | null
    createdAt: Date | null
  }

  export type DelegatedSignatureCountAggregateOutputType = {
    id: number
    sessionId: number
    action: number
    roomId: number
    txDigest: number
    signature: number
    createdAt: number
    _all: number
  }


  export type DelegatedSignatureMinAggregateInputType = {
    id?: true
    sessionId?: true
    action?: true
    roomId?: true
    txDigest?: true
    signature?: true
    createdAt?: true
  }

  export type DelegatedSignatureMaxAggregateInputType = {
    id?: true
    sessionId?: true
    action?: true
    roomId?: true
    txDigest?: true
    signature?: true
    createdAt?: true
  }

  export type DelegatedSignatureCountAggregateInputType = {
    id?: true
    sessionId?: true
    action?: true
    roomId?: true
    txDigest?: true
    signature?: true
    createdAt?: true
    _all?: true
  }

  export type DelegatedSignatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DelegatedSignature to aggregate.
     */
    where?: DelegatedSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedSignatures to fetch.
     */
    orderBy?: DelegatedSignatureOrderByWithRelationInput | DelegatedSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DelegatedSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedSignatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DelegatedSignatures
    **/
    _count?: true | DelegatedSignatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegatedSignatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegatedSignatureMaxAggregateInputType
  }

  export type GetDelegatedSignatureAggregateType<T extends DelegatedSignatureAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegatedSignature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegatedSignature[P]>
      : GetScalarType<T[P], AggregateDelegatedSignature[P]>
  }




  export type DelegatedSignatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegatedSignatureWhereInput
    orderBy?: DelegatedSignatureOrderByWithAggregationInput | DelegatedSignatureOrderByWithAggregationInput[]
    by: DelegatedSignatureScalarFieldEnum[] | DelegatedSignatureScalarFieldEnum
    having?: DelegatedSignatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegatedSignatureCountAggregateInputType | true
    _min?: DelegatedSignatureMinAggregateInputType
    _max?: DelegatedSignatureMaxAggregateInputType
  }

  export type DelegatedSignatureGroupByOutputType = {
    id: string
    sessionId: string
    action: string
    roomId: string | null
    txDigest: string | null
    signature: string
    createdAt: Date
    _count: DelegatedSignatureCountAggregateOutputType | null
    _min: DelegatedSignatureMinAggregateOutputType | null
    _max: DelegatedSignatureMaxAggregateOutputType | null
  }

  type GetDelegatedSignatureGroupByPayload<T extends DelegatedSignatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DelegatedSignatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegatedSignatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegatedSignatureGroupByOutputType[P]>
            : GetScalarType<T[P], DelegatedSignatureGroupByOutputType[P]>
        }
      >
    >


  export type DelegatedSignatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    action?: boolean
    roomId?: boolean
    txDigest?: boolean
    signature?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegatedSignature"]>

  export type DelegatedSignatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    action?: boolean
    roomId?: boolean
    txDigest?: boolean
    signature?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegatedSignature"]>

  export type DelegatedSignatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    action?: boolean
    roomId?: boolean
    txDigest?: boolean
    signature?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegatedSignature"]>

  export type DelegatedSignatureSelectScalar = {
    id?: boolean
    sessionId?: boolean
    action?: boolean
    roomId?: boolean
    txDigest?: boolean
    signature?: boolean
    createdAt?: boolean
  }

  export type DelegatedSignatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "action" | "roomId" | "txDigest" | "signature" | "createdAt", ExtArgs["result"]["delegatedSignature"]>
  export type DelegatedSignatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type DelegatedSignatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type DelegatedSignatureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $DelegatedSignaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DelegatedSignature"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      action: string
      roomId: string | null
      txDigest: string | null
      signature: string
      createdAt: Date
    }, ExtArgs["result"]["delegatedSignature"]>
    composites: {}
  }

  type DelegatedSignatureGetPayload<S extends boolean | null | undefined | DelegatedSignatureDefaultArgs> = $Result.GetResult<Prisma.$DelegatedSignaturePayload, S>

  type DelegatedSignatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DelegatedSignatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DelegatedSignatureCountAggregateInputType | true
    }

  export interface DelegatedSignatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DelegatedSignature'], meta: { name: 'DelegatedSignature' } }
    /**
     * Find zero or one DelegatedSignature that matches the filter.
     * @param {DelegatedSignatureFindUniqueArgs} args - Arguments to find a DelegatedSignature
     * @example
     * // Get one DelegatedSignature
     * const delegatedSignature = await prisma.delegatedSignature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DelegatedSignatureFindUniqueArgs>(args: SelectSubset<T, DelegatedSignatureFindUniqueArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DelegatedSignature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DelegatedSignatureFindUniqueOrThrowArgs} args - Arguments to find a DelegatedSignature
     * @example
     * // Get one DelegatedSignature
     * const delegatedSignature = await prisma.delegatedSignature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DelegatedSignatureFindUniqueOrThrowArgs>(args: SelectSubset<T, DelegatedSignatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DelegatedSignature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureFindFirstArgs} args - Arguments to find a DelegatedSignature
     * @example
     * // Get one DelegatedSignature
     * const delegatedSignature = await prisma.delegatedSignature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DelegatedSignatureFindFirstArgs>(args?: SelectSubset<T, DelegatedSignatureFindFirstArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DelegatedSignature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureFindFirstOrThrowArgs} args - Arguments to find a DelegatedSignature
     * @example
     * // Get one DelegatedSignature
     * const delegatedSignature = await prisma.delegatedSignature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DelegatedSignatureFindFirstOrThrowArgs>(args?: SelectSubset<T, DelegatedSignatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DelegatedSignatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DelegatedSignatures
     * const delegatedSignatures = await prisma.delegatedSignature.findMany()
     * 
     * // Get first 10 DelegatedSignatures
     * const delegatedSignatures = await prisma.delegatedSignature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const delegatedSignatureWithIdOnly = await prisma.delegatedSignature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DelegatedSignatureFindManyArgs>(args?: SelectSubset<T, DelegatedSignatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DelegatedSignature.
     * @param {DelegatedSignatureCreateArgs} args - Arguments to create a DelegatedSignature.
     * @example
     * // Create one DelegatedSignature
     * const DelegatedSignature = await prisma.delegatedSignature.create({
     *   data: {
     *     // ... data to create a DelegatedSignature
     *   }
     * })
     * 
     */
    create<T extends DelegatedSignatureCreateArgs>(args: SelectSubset<T, DelegatedSignatureCreateArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DelegatedSignatures.
     * @param {DelegatedSignatureCreateManyArgs} args - Arguments to create many DelegatedSignatures.
     * @example
     * // Create many DelegatedSignatures
     * const delegatedSignature = await prisma.delegatedSignature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DelegatedSignatureCreateManyArgs>(args?: SelectSubset<T, DelegatedSignatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DelegatedSignatures and returns the data saved in the database.
     * @param {DelegatedSignatureCreateManyAndReturnArgs} args - Arguments to create many DelegatedSignatures.
     * @example
     * // Create many DelegatedSignatures
     * const delegatedSignature = await prisma.delegatedSignature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DelegatedSignatures and only return the `id`
     * const delegatedSignatureWithIdOnly = await prisma.delegatedSignature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DelegatedSignatureCreateManyAndReturnArgs>(args?: SelectSubset<T, DelegatedSignatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DelegatedSignature.
     * @param {DelegatedSignatureDeleteArgs} args - Arguments to delete one DelegatedSignature.
     * @example
     * // Delete one DelegatedSignature
     * const DelegatedSignature = await prisma.delegatedSignature.delete({
     *   where: {
     *     // ... filter to delete one DelegatedSignature
     *   }
     * })
     * 
     */
    delete<T extends DelegatedSignatureDeleteArgs>(args: SelectSubset<T, DelegatedSignatureDeleteArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DelegatedSignature.
     * @param {DelegatedSignatureUpdateArgs} args - Arguments to update one DelegatedSignature.
     * @example
     * // Update one DelegatedSignature
     * const delegatedSignature = await prisma.delegatedSignature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DelegatedSignatureUpdateArgs>(args: SelectSubset<T, DelegatedSignatureUpdateArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DelegatedSignatures.
     * @param {DelegatedSignatureDeleteManyArgs} args - Arguments to filter DelegatedSignatures to delete.
     * @example
     * // Delete a few DelegatedSignatures
     * const { count } = await prisma.delegatedSignature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DelegatedSignatureDeleteManyArgs>(args?: SelectSubset<T, DelegatedSignatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DelegatedSignatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DelegatedSignatures
     * const delegatedSignature = await prisma.delegatedSignature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DelegatedSignatureUpdateManyArgs>(args: SelectSubset<T, DelegatedSignatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DelegatedSignatures and returns the data updated in the database.
     * @param {DelegatedSignatureUpdateManyAndReturnArgs} args - Arguments to update many DelegatedSignatures.
     * @example
     * // Update many DelegatedSignatures
     * const delegatedSignature = await prisma.delegatedSignature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DelegatedSignatures and only return the `id`
     * const delegatedSignatureWithIdOnly = await prisma.delegatedSignature.updateManyAndReturn({
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
    updateManyAndReturn<T extends DelegatedSignatureUpdateManyAndReturnArgs>(args: SelectSubset<T, DelegatedSignatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DelegatedSignature.
     * @param {DelegatedSignatureUpsertArgs} args - Arguments to update or create a DelegatedSignature.
     * @example
     * // Update or create a DelegatedSignature
     * const delegatedSignature = await prisma.delegatedSignature.upsert({
     *   create: {
     *     // ... data to create a DelegatedSignature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DelegatedSignature we want to update
     *   }
     * })
     */
    upsert<T extends DelegatedSignatureUpsertArgs>(args: SelectSubset<T, DelegatedSignatureUpsertArgs<ExtArgs>>): Prisma__DelegatedSignatureClient<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DelegatedSignatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureCountArgs} args - Arguments to filter DelegatedSignatures to count.
     * @example
     * // Count the number of DelegatedSignatures
     * const count = await prisma.delegatedSignature.count({
     *   where: {
     *     // ... the filter for the DelegatedSignatures we want to count
     *   }
     * })
    **/
    count<T extends DelegatedSignatureCountArgs>(
      args?: Subset<T, DelegatedSignatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegatedSignatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DelegatedSignature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DelegatedSignatureAggregateArgs>(args: Subset<T, DelegatedSignatureAggregateArgs>): Prisma.PrismaPromise<GetDelegatedSignatureAggregateType<T>>

    /**
     * Group by DelegatedSignature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegatedSignatureGroupByArgs} args - Group by arguments.
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
      T extends DelegatedSignatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegatedSignatureGroupByArgs['orderBy'] }
        : { orderBy?: DelegatedSignatureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DelegatedSignatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegatedSignatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DelegatedSignature model
   */
  readonly fields: DelegatedSignatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DelegatedSignature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DelegatedSignatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DelegatedSignature model
   */
  interface DelegatedSignatureFieldRefs {
    readonly id: FieldRef<"DelegatedSignature", 'String'>
    readonly sessionId: FieldRef<"DelegatedSignature", 'String'>
    readonly action: FieldRef<"DelegatedSignature", 'String'>
    readonly roomId: FieldRef<"DelegatedSignature", 'String'>
    readonly txDigest: FieldRef<"DelegatedSignature", 'String'>
    readonly signature: FieldRef<"DelegatedSignature", 'String'>
    readonly createdAt: FieldRef<"DelegatedSignature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DelegatedSignature findUnique
   */
  export type DelegatedSignatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * Filter, which DelegatedSignature to fetch.
     */
    where: DelegatedSignatureWhereUniqueInput
  }

  /**
   * DelegatedSignature findUniqueOrThrow
   */
  export type DelegatedSignatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * Filter, which DelegatedSignature to fetch.
     */
    where: DelegatedSignatureWhereUniqueInput
  }

  /**
   * DelegatedSignature findFirst
   */
  export type DelegatedSignatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * Filter, which DelegatedSignature to fetch.
     */
    where?: DelegatedSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedSignatures to fetch.
     */
    orderBy?: DelegatedSignatureOrderByWithRelationInput | DelegatedSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegatedSignatures.
     */
    cursor?: DelegatedSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedSignatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegatedSignatures.
     */
    distinct?: DelegatedSignatureScalarFieldEnum | DelegatedSignatureScalarFieldEnum[]
  }

  /**
   * DelegatedSignature findFirstOrThrow
   */
  export type DelegatedSignatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * Filter, which DelegatedSignature to fetch.
     */
    where?: DelegatedSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedSignatures to fetch.
     */
    orderBy?: DelegatedSignatureOrderByWithRelationInput | DelegatedSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegatedSignatures.
     */
    cursor?: DelegatedSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedSignatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegatedSignatures.
     */
    distinct?: DelegatedSignatureScalarFieldEnum | DelegatedSignatureScalarFieldEnum[]
  }

  /**
   * DelegatedSignature findMany
   */
  export type DelegatedSignatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * Filter, which DelegatedSignatures to fetch.
     */
    where?: DelegatedSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegatedSignatures to fetch.
     */
    orderBy?: DelegatedSignatureOrderByWithRelationInput | DelegatedSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DelegatedSignatures.
     */
    cursor?: DelegatedSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegatedSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegatedSignatures.
     */
    skip?: number
    distinct?: DelegatedSignatureScalarFieldEnum | DelegatedSignatureScalarFieldEnum[]
  }

  /**
   * DelegatedSignature create
   */
  export type DelegatedSignatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * The data needed to create a DelegatedSignature.
     */
    data: XOR<DelegatedSignatureCreateInput, DelegatedSignatureUncheckedCreateInput>
  }

  /**
   * DelegatedSignature createMany
   */
  export type DelegatedSignatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DelegatedSignatures.
     */
    data: DelegatedSignatureCreateManyInput | DelegatedSignatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DelegatedSignature createManyAndReturn
   */
  export type DelegatedSignatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * The data used to create many DelegatedSignatures.
     */
    data: DelegatedSignatureCreateManyInput | DelegatedSignatureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DelegatedSignature update
   */
  export type DelegatedSignatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * The data needed to update a DelegatedSignature.
     */
    data: XOR<DelegatedSignatureUpdateInput, DelegatedSignatureUncheckedUpdateInput>
    /**
     * Choose, which DelegatedSignature to update.
     */
    where: DelegatedSignatureWhereUniqueInput
  }

  /**
   * DelegatedSignature updateMany
   */
  export type DelegatedSignatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DelegatedSignatures.
     */
    data: XOR<DelegatedSignatureUpdateManyMutationInput, DelegatedSignatureUncheckedUpdateManyInput>
    /**
     * Filter which DelegatedSignatures to update
     */
    where?: DelegatedSignatureWhereInput
    /**
     * Limit how many DelegatedSignatures to update.
     */
    limit?: number
  }

  /**
   * DelegatedSignature updateManyAndReturn
   */
  export type DelegatedSignatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * The data used to update DelegatedSignatures.
     */
    data: XOR<DelegatedSignatureUpdateManyMutationInput, DelegatedSignatureUncheckedUpdateManyInput>
    /**
     * Filter which DelegatedSignatures to update
     */
    where?: DelegatedSignatureWhereInput
    /**
     * Limit how many DelegatedSignatures to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DelegatedSignature upsert
   */
  export type DelegatedSignatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * The filter to search for the DelegatedSignature to update in case it exists.
     */
    where: DelegatedSignatureWhereUniqueInput
    /**
     * In case the DelegatedSignature found by the `where` argument doesn't exist, create a new DelegatedSignature with this data.
     */
    create: XOR<DelegatedSignatureCreateInput, DelegatedSignatureUncheckedCreateInput>
    /**
     * In case the DelegatedSignature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DelegatedSignatureUpdateInput, DelegatedSignatureUncheckedUpdateInput>
  }

  /**
   * DelegatedSignature delete
   */
  export type DelegatedSignatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    /**
     * Filter which DelegatedSignature to delete.
     */
    where: DelegatedSignatureWhereUniqueInput
  }

  /**
   * DelegatedSignature deleteMany
   */
  export type DelegatedSignatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DelegatedSignatures to delete
     */
    where?: DelegatedSignatureWhereInput
    /**
     * Limit how many DelegatedSignatures to delete.
     */
    limit?: number
  }

  /**
   * DelegatedSignature without action
   */
  export type DelegatedSignatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenAvgAggregateOutputType = {
    rotationCounter: number | null
  }

  export type RefreshTokenSumAggregateOutputType = {
    rotationCounter: number | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    rotationCounter: number | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    rotationCounter: number | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    sessionId: number
    tokenHash: number
    expiresAt: number
    revokedAt: number
    rotationCounter: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenAvgAggregateInputType = {
    rotationCounter?: true
  }

  export type RefreshTokenSumAggregateInputType = {
    rotationCounter?: true
  }

  export type RefreshTokenMinAggregateInputType = {
    id?: true
    sessionId?: true
    tokenHash?: true
    expiresAt?: true
    revokedAt?: true
    rotationCounter?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    sessionId?: true
    tokenHash?: true
    expiresAt?: true
    revokedAt?: true
    rotationCounter?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    sessionId?: true
    tokenHash?: true
    expiresAt?: true
    revokedAt?: true
    rotationCounter?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefreshTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefreshTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _avg?: RefreshTokenAvgAggregateInputType
    _sum?: RefreshTokenSumAggregateInputType
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    sessionId: string
    tokenHash: string
    expiresAt: Date
    revokedAt: Date | null
    rotationCounter: number
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    rotationCounter?: boolean
    createdAt?: boolean
    Session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    rotationCounter?: boolean
    createdAt?: boolean
    Session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    rotationCounter?: boolean
    createdAt?: boolean
    Session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    sessionId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    rotationCounter?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "tokenHash" | "expiresAt" | "revokedAt" | "rotationCounter" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      Session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      tokenHash: string
      expiresAt: Date
      revokedAt: Date | null
      rotationCounter: number
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly sessionId: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly rotationCounter: FieldRef<"RefreshToken", 'Int'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    jwtId: string | null
    status: string | null
    createdAt: Date | null
    expiresAt: Date | null
    lastUsedAt: Date | null
    encryptedPrivateKey: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    jwtId: string | null
    status: string | null
    createdAt: Date | null
    expiresAt: Date | null
    lastUsedAt: Date | null
    encryptedPrivateKey: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    walletId: number
    jwtId: number
    status: number
    createdAt: number
    expiresAt: number
    lastUsedAt: number
    encryptedPrivateKey: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    jwtId?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    lastUsedAt?: true
    encryptedPrivateKey?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    jwtId?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    lastUsedAt?: true
    encryptedPrivateKey?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    jwtId?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    lastUsedAt?: true
    encryptedPrivateKey?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    walletId: string
    jwtId: string
    status: string
    createdAt: Date
    expiresAt: Date
    lastUsedAt: Date
    encryptedPrivateKey: string | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    jwtId?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    encryptedPrivateKey?: boolean
    DelegatedSignature?: boolean | Session$DelegatedSignatureArgs<ExtArgs>
    RefreshToken?: boolean | Session$RefreshTokenArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | WalletDefaultArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    jwtId?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    encryptedPrivateKey?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    jwtId?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    encryptedPrivateKey?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    walletId?: boolean
    jwtId?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    encryptedPrivateKey?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "walletId" | "jwtId" | "status" | "createdAt" | "expiresAt" | "lastUsedAt" | "encryptedPrivateKey", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DelegatedSignature?: boolean | Session$DelegatedSignatureArgs<ExtArgs>
    RefreshToken?: boolean | Session$RefreshTokenArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | WalletDefaultArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      DelegatedSignature: Prisma.$DelegatedSignaturePayload<ExtArgs>[]
      RefreshToken: Prisma.$RefreshTokenPayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs>
      Wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      walletId: string
      jwtId: string
      status: string
      createdAt: Date
      expiresAt: Date
      lastUsedAt: Date
      encryptedPrivateKey: string | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    DelegatedSignature<T extends Session$DelegatedSignatureArgs<ExtArgs> = {}>(args?: Subset<T, Session$DelegatedSignatureArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegatedSignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    RefreshToken<T extends Session$RefreshTokenArgs<ExtArgs> = {}>(args?: Subset<T, Session$RefreshTokenArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly walletId: FieldRef<"Session", 'String'>
    readonly jwtId: FieldRef<"Session", 'String'>
    readonly status: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly lastUsedAt: FieldRef<"Session", 'DateTime'>
    readonly encryptedPrivateKey: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.DelegatedSignature
   */
  export type Session$DelegatedSignatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegatedSignature
     */
    select?: DelegatedSignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegatedSignature
     */
    omit?: DelegatedSignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegatedSignatureInclude<ExtArgs> | null
    where?: DelegatedSignatureWhereInput
    orderBy?: DelegatedSignatureOrderByWithRelationInput | DelegatedSignatureOrderByWithRelationInput[]
    cursor?: DelegatedSignatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DelegatedSignatureScalarFieldEnum | DelegatedSignatureScalarFieldEnum[]
  }

  /**
   * Session.RefreshToken
   */
  export type Session$RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    primaryWalletAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    primaryWalletAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    primaryWalletAddress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    primaryWalletAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    primaryWalletAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    primaryWalletAddress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
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
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    primaryWalletAddress: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    primaryWalletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Session?: boolean | User$SessionArgs<ExtArgs>
    Wallet?: boolean | User$WalletArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    primaryWalletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    primaryWalletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    primaryWalletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "primaryWalletAddress" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | User$SessionArgs<ExtArgs>
    Wallet?: boolean | User$WalletArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Session: Prisma.$SessionPayload<ExtArgs>[]
      Wallet: Prisma.$WalletPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      primaryWalletAddress: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Session<T extends User$SessionArgs<ExtArgs> = {}>(args?: Subset<T, User$SessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Wallet<T extends User$WalletArgs<ExtArgs> = {}>(args?: Subset<T, User$WalletArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly primaryWalletAddress: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Session
   */
  export type User$SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.Wallet
   */
  export type User$WalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    address: string | null
    type: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    address: string | null
    type: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    userId: number
    address: number
    type: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    userId: string
    address: string
    type: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Session?: boolean | Wallet$SessionArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    userId?: boolean
    address?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "address" | "type" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | Wallet$SessionArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      Session: Prisma.$SessionPayload<ExtArgs>[]
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      address: string
      type: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
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
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Session<T extends Wallet$SessionArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$SessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly type: FieldRef<"Wallet", 'String'>
    readonly status: FieldRef<"Wallet", 'String'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.Session
   */
  export type Wallet$SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model diesel_schema_migrations
   */

  export type AggregateDiesel_schema_migrations = {
    _count: Diesel_schema_migrationsCountAggregateOutputType | null
    _min: Diesel_schema_migrationsMinAggregateOutputType | null
    _max: Diesel_schema_migrationsMaxAggregateOutputType | null
  }

  export type Diesel_schema_migrationsMinAggregateOutputType = {
    version: string | null
    run_on: Date | null
  }

  export type Diesel_schema_migrationsMaxAggregateOutputType = {
    version: string | null
    run_on: Date | null
  }

  export type Diesel_schema_migrationsCountAggregateOutputType = {
    version: number
    run_on: number
    _all: number
  }


  export type Diesel_schema_migrationsMinAggregateInputType = {
    version?: true
    run_on?: true
  }

  export type Diesel_schema_migrationsMaxAggregateInputType = {
    version?: true
    run_on?: true
  }

  export type Diesel_schema_migrationsCountAggregateInputType = {
    version?: true
    run_on?: true
    _all?: true
  }

  export type Diesel_schema_migrationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which diesel_schema_migrations to aggregate.
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of diesel_schema_migrations to fetch.
     */
    orderBy?: diesel_schema_migrationsOrderByWithRelationInput | diesel_schema_migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: diesel_schema_migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` diesel_schema_migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` diesel_schema_migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned diesel_schema_migrations
    **/
    _count?: true | Diesel_schema_migrationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Diesel_schema_migrationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Diesel_schema_migrationsMaxAggregateInputType
  }

  export type GetDiesel_schema_migrationsAggregateType<T extends Diesel_schema_migrationsAggregateArgs> = {
        [P in keyof T & keyof AggregateDiesel_schema_migrations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiesel_schema_migrations[P]>
      : GetScalarType<T[P], AggregateDiesel_schema_migrations[P]>
  }




  export type diesel_schema_migrationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: diesel_schema_migrationsWhereInput
    orderBy?: diesel_schema_migrationsOrderByWithAggregationInput | diesel_schema_migrationsOrderByWithAggregationInput[]
    by: Diesel_schema_migrationsScalarFieldEnum[] | Diesel_schema_migrationsScalarFieldEnum
    having?: diesel_schema_migrationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Diesel_schema_migrationsCountAggregateInputType | true
    _min?: Diesel_schema_migrationsMinAggregateInputType
    _max?: Diesel_schema_migrationsMaxAggregateInputType
  }

  export type Diesel_schema_migrationsGroupByOutputType = {
    version: string
    run_on: Date
    _count: Diesel_schema_migrationsCountAggregateOutputType | null
    _min: Diesel_schema_migrationsMinAggregateOutputType | null
    _max: Diesel_schema_migrationsMaxAggregateOutputType | null
  }

  type GetDiesel_schema_migrationsGroupByPayload<T extends diesel_schema_migrationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Diesel_schema_migrationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Diesel_schema_migrationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Diesel_schema_migrationsGroupByOutputType[P]>
            : GetScalarType<T[P], Diesel_schema_migrationsGroupByOutputType[P]>
        }
      >
    >


  export type diesel_schema_migrationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    version?: boolean
    run_on?: boolean
  }, ExtArgs["result"]["diesel_schema_migrations"]>

  export type diesel_schema_migrationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    version?: boolean
    run_on?: boolean
  }, ExtArgs["result"]["diesel_schema_migrations"]>

  export type diesel_schema_migrationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    version?: boolean
    run_on?: boolean
  }, ExtArgs["result"]["diesel_schema_migrations"]>

  export type diesel_schema_migrationsSelectScalar = {
    version?: boolean
    run_on?: boolean
  }

  export type diesel_schema_migrationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"version" | "run_on", ExtArgs["result"]["diesel_schema_migrations"]>

  export type $diesel_schema_migrationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "diesel_schema_migrations"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      version: string
      run_on: Date
    }, ExtArgs["result"]["diesel_schema_migrations"]>
    composites: {}
  }

  type diesel_schema_migrationsGetPayload<S extends boolean | null | undefined | diesel_schema_migrationsDefaultArgs> = $Result.GetResult<Prisma.$diesel_schema_migrationsPayload, S>

  type diesel_schema_migrationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<diesel_schema_migrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Diesel_schema_migrationsCountAggregateInputType | true
    }

  export interface diesel_schema_migrationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['diesel_schema_migrations'], meta: { name: 'diesel_schema_migrations' } }
    /**
     * Find zero or one Diesel_schema_migrations that matches the filter.
     * @param {diesel_schema_migrationsFindUniqueArgs} args - Arguments to find a Diesel_schema_migrations
     * @example
     * // Get one Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends diesel_schema_migrationsFindUniqueArgs>(args: SelectSubset<T, diesel_schema_migrationsFindUniqueArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Diesel_schema_migrations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {diesel_schema_migrationsFindUniqueOrThrowArgs} args - Arguments to find a Diesel_schema_migrations
     * @example
     * // Get one Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends diesel_schema_migrationsFindUniqueOrThrowArgs>(args: SelectSubset<T, diesel_schema_migrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Diesel_schema_migrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diesel_schema_migrationsFindFirstArgs} args - Arguments to find a Diesel_schema_migrations
     * @example
     * // Get one Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends diesel_schema_migrationsFindFirstArgs>(args?: SelectSubset<T, diesel_schema_migrationsFindFirstArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Diesel_schema_migrations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diesel_schema_migrationsFindFirstOrThrowArgs} args - Arguments to find a Diesel_schema_migrations
     * @example
     * // Get one Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends diesel_schema_migrationsFindFirstOrThrowArgs>(args?: SelectSubset<T, diesel_schema_migrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Diesel_schema_migrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diesel_schema_migrationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findMany()
     * 
     * // Get first 10 Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.findMany({ take: 10 })
     * 
     * // Only select the `version`
     * const diesel_schema_migrationsWithVersionOnly = await prisma.diesel_schema_migrations.findMany({ select: { version: true } })
     * 
     */
    findMany<T extends diesel_schema_migrationsFindManyArgs>(args?: SelectSubset<T, diesel_schema_migrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Diesel_schema_migrations.
     * @param {diesel_schema_migrationsCreateArgs} args - Arguments to create a Diesel_schema_migrations.
     * @example
     * // Create one Diesel_schema_migrations
     * const Diesel_schema_migrations = await prisma.diesel_schema_migrations.create({
     *   data: {
     *     // ... data to create a Diesel_schema_migrations
     *   }
     * })
     * 
     */
    create<T extends diesel_schema_migrationsCreateArgs>(args: SelectSubset<T, diesel_schema_migrationsCreateArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Diesel_schema_migrations.
     * @param {diesel_schema_migrationsCreateManyArgs} args - Arguments to create many Diesel_schema_migrations.
     * @example
     * // Create many Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends diesel_schema_migrationsCreateManyArgs>(args?: SelectSubset<T, diesel_schema_migrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Diesel_schema_migrations and returns the data saved in the database.
     * @param {diesel_schema_migrationsCreateManyAndReturnArgs} args - Arguments to create many Diesel_schema_migrations.
     * @example
     * // Create many Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Diesel_schema_migrations and only return the `version`
     * const diesel_schema_migrationsWithVersionOnly = await prisma.diesel_schema_migrations.createManyAndReturn({
     *   select: { version: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends diesel_schema_migrationsCreateManyAndReturnArgs>(args?: SelectSubset<T, diesel_schema_migrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Diesel_schema_migrations.
     * @param {diesel_schema_migrationsDeleteArgs} args - Arguments to delete one Diesel_schema_migrations.
     * @example
     * // Delete one Diesel_schema_migrations
     * const Diesel_schema_migrations = await prisma.diesel_schema_migrations.delete({
     *   where: {
     *     // ... filter to delete one Diesel_schema_migrations
     *   }
     * })
     * 
     */
    delete<T extends diesel_schema_migrationsDeleteArgs>(args: SelectSubset<T, diesel_schema_migrationsDeleteArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Diesel_schema_migrations.
     * @param {diesel_schema_migrationsUpdateArgs} args - Arguments to update one Diesel_schema_migrations.
     * @example
     * // Update one Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends diesel_schema_migrationsUpdateArgs>(args: SelectSubset<T, diesel_schema_migrationsUpdateArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Diesel_schema_migrations.
     * @param {diesel_schema_migrationsDeleteManyArgs} args - Arguments to filter Diesel_schema_migrations to delete.
     * @example
     * // Delete a few Diesel_schema_migrations
     * const { count } = await prisma.diesel_schema_migrations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends diesel_schema_migrationsDeleteManyArgs>(args?: SelectSubset<T, diesel_schema_migrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diesel_schema_migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diesel_schema_migrationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends diesel_schema_migrationsUpdateManyArgs>(args: SelectSubset<T, diesel_schema_migrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diesel_schema_migrations and returns the data updated in the database.
     * @param {diesel_schema_migrationsUpdateManyAndReturnArgs} args - Arguments to update many Diesel_schema_migrations.
     * @example
     * // Update many Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Diesel_schema_migrations and only return the `version`
     * const diesel_schema_migrationsWithVersionOnly = await prisma.diesel_schema_migrations.updateManyAndReturn({
     *   select: { version: true },
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
    updateManyAndReturn<T extends diesel_schema_migrationsUpdateManyAndReturnArgs>(args: SelectSubset<T, diesel_schema_migrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Diesel_schema_migrations.
     * @param {diesel_schema_migrationsUpsertArgs} args - Arguments to update or create a Diesel_schema_migrations.
     * @example
     * // Update or create a Diesel_schema_migrations
     * const diesel_schema_migrations = await prisma.diesel_schema_migrations.upsert({
     *   create: {
     *     // ... data to create a Diesel_schema_migrations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Diesel_schema_migrations we want to update
     *   }
     * })
     */
    upsert<T extends diesel_schema_migrationsUpsertArgs>(args: SelectSubset<T, diesel_schema_migrationsUpsertArgs<ExtArgs>>): Prisma__diesel_schema_migrationsClient<$Result.GetResult<Prisma.$diesel_schema_migrationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Diesel_schema_migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diesel_schema_migrationsCountArgs} args - Arguments to filter Diesel_schema_migrations to count.
     * @example
     * // Count the number of Diesel_schema_migrations
     * const count = await prisma.diesel_schema_migrations.count({
     *   where: {
     *     // ... the filter for the Diesel_schema_migrations we want to count
     *   }
     * })
    **/
    count<T extends diesel_schema_migrationsCountArgs>(
      args?: Subset<T, diesel_schema_migrationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Diesel_schema_migrationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Diesel_schema_migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Diesel_schema_migrationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Diesel_schema_migrationsAggregateArgs>(args: Subset<T, Diesel_schema_migrationsAggregateArgs>): Prisma.PrismaPromise<GetDiesel_schema_migrationsAggregateType<T>>

    /**
     * Group by Diesel_schema_migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diesel_schema_migrationsGroupByArgs} args - Group by arguments.
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
      T extends diesel_schema_migrationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: diesel_schema_migrationsGroupByArgs['orderBy'] }
        : { orderBy?: diesel_schema_migrationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, diesel_schema_migrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiesel_schema_migrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the diesel_schema_migrations model
   */
  readonly fields: diesel_schema_migrationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for diesel_schema_migrations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__diesel_schema_migrationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the diesel_schema_migrations model
   */
  interface diesel_schema_migrationsFieldRefs {
    readonly version: FieldRef<"diesel_schema_migrations", 'String'>
    readonly run_on: FieldRef<"diesel_schema_migrations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * diesel_schema_migrations findUnique
   */
  export type diesel_schema_migrationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * Filter, which diesel_schema_migrations to fetch.
     */
    where: diesel_schema_migrationsWhereUniqueInput
  }

  /**
   * diesel_schema_migrations findUniqueOrThrow
   */
  export type diesel_schema_migrationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * Filter, which diesel_schema_migrations to fetch.
     */
    where: diesel_schema_migrationsWhereUniqueInput
  }

  /**
   * diesel_schema_migrations findFirst
   */
  export type diesel_schema_migrationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * Filter, which diesel_schema_migrations to fetch.
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of diesel_schema_migrations to fetch.
     */
    orderBy?: diesel_schema_migrationsOrderByWithRelationInput | diesel_schema_migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for diesel_schema_migrations.
     */
    cursor?: diesel_schema_migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` diesel_schema_migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` diesel_schema_migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of diesel_schema_migrations.
     */
    distinct?: Diesel_schema_migrationsScalarFieldEnum | Diesel_schema_migrationsScalarFieldEnum[]
  }

  /**
   * diesel_schema_migrations findFirstOrThrow
   */
  export type diesel_schema_migrationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * Filter, which diesel_schema_migrations to fetch.
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of diesel_schema_migrations to fetch.
     */
    orderBy?: diesel_schema_migrationsOrderByWithRelationInput | diesel_schema_migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for diesel_schema_migrations.
     */
    cursor?: diesel_schema_migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` diesel_schema_migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` diesel_schema_migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of diesel_schema_migrations.
     */
    distinct?: Diesel_schema_migrationsScalarFieldEnum | Diesel_schema_migrationsScalarFieldEnum[]
  }

  /**
   * diesel_schema_migrations findMany
   */
  export type diesel_schema_migrationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * Filter, which diesel_schema_migrations to fetch.
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of diesel_schema_migrations to fetch.
     */
    orderBy?: diesel_schema_migrationsOrderByWithRelationInput | diesel_schema_migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing diesel_schema_migrations.
     */
    cursor?: diesel_schema_migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` diesel_schema_migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` diesel_schema_migrations.
     */
    skip?: number
    distinct?: Diesel_schema_migrationsScalarFieldEnum | Diesel_schema_migrationsScalarFieldEnum[]
  }

  /**
   * diesel_schema_migrations create
   */
  export type diesel_schema_migrationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * The data needed to create a diesel_schema_migrations.
     */
    data: XOR<diesel_schema_migrationsCreateInput, diesel_schema_migrationsUncheckedCreateInput>
  }

  /**
   * diesel_schema_migrations createMany
   */
  export type diesel_schema_migrationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many diesel_schema_migrations.
     */
    data: diesel_schema_migrationsCreateManyInput | diesel_schema_migrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * diesel_schema_migrations createManyAndReturn
   */
  export type diesel_schema_migrationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * The data used to create many diesel_schema_migrations.
     */
    data: diesel_schema_migrationsCreateManyInput | diesel_schema_migrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * diesel_schema_migrations update
   */
  export type diesel_schema_migrationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * The data needed to update a diesel_schema_migrations.
     */
    data: XOR<diesel_schema_migrationsUpdateInput, diesel_schema_migrationsUncheckedUpdateInput>
    /**
     * Choose, which diesel_schema_migrations to update.
     */
    where: diesel_schema_migrationsWhereUniqueInput
  }

  /**
   * diesel_schema_migrations updateMany
   */
  export type diesel_schema_migrationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update diesel_schema_migrations.
     */
    data: XOR<diesel_schema_migrationsUpdateManyMutationInput, diesel_schema_migrationsUncheckedUpdateManyInput>
    /**
     * Filter which diesel_schema_migrations to update
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * Limit how many diesel_schema_migrations to update.
     */
    limit?: number
  }

  /**
   * diesel_schema_migrations updateManyAndReturn
   */
  export type diesel_schema_migrationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * The data used to update diesel_schema_migrations.
     */
    data: XOR<diesel_schema_migrationsUpdateManyMutationInput, diesel_schema_migrationsUncheckedUpdateManyInput>
    /**
     * Filter which diesel_schema_migrations to update
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * Limit how many diesel_schema_migrations to update.
     */
    limit?: number
  }

  /**
   * diesel_schema_migrations upsert
   */
  export type diesel_schema_migrationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * The filter to search for the diesel_schema_migrations to update in case it exists.
     */
    where: diesel_schema_migrationsWhereUniqueInput
    /**
     * In case the diesel_schema_migrations found by the `where` argument doesn't exist, create a new diesel_schema_migrations with this data.
     */
    create: XOR<diesel_schema_migrationsCreateInput, diesel_schema_migrationsUncheckedCreateInput>
    /**
     * In case the diesel_schema_migrations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<diesel_schema_migrationsUpdateInput, diesel_schema_migrationsUncheckedUpdateInput>
  }

  /**
   * diesel_schema_migrations delete
   */
  export type diesel_schema_migrationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
    /**
     * Filter which diesel_schema_migrations to delete.
     */
    where: diesel_schema_migrationsWhereUniqueInput
  }

  /**
   * diesel_schema_migrations deleteMany
   */
  export type diesel_schema_migrationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which diesel_schema_migrations to delete
     */
    where?: diesel_schema_migrationsWhereInput
    /**
     * Limit how many diesel_schema_migrations to delete.
     */
    limit?: number
  }

  /**
   * diesel_schema_migrations without action
   */
  export type diesel_schema_migrationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diesel_schema_migrations
     */
    select?: diesel_schema_migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the diesel_schema_migrations
     */
    omit?: diesel_schema_migrationsOmit<ExtArgs> | null
  }


  /**
   * Model meeting_rooms
   */

  export type AggregateMeeting_rooms = {
    _count: Meeting_roomsCountAggregateOutputType | null
    _avg: Meeting_roomsAvgAggregateOutputType | null
    _sum: Meeting_roomsSumAggregateOutputType | null
    _min: Meeting_roomsMinAggregateOutputType | null
    _max: Meeting_roomsMaxAggregateOutputType | null
  }

  export type Meeting_roomsAvgAggregateOutputType = {
    id: number | null
    status: number | null
    max_participants: number | null
    participant_count: number | null
    created_at: number | null
    started_at: number | null
    ended_at: number | null
    checkpoint_sequence_number: number | null
  }

  export type Meeting_roomsSumAggregateOutputType = {
    id: bigint | null
    status: number | null
    max_participants: bigint | null
    participant_count: number | null
    created_at: bigint | null
    started_at: bigint | null
    ended_at: bigint | null
    checkpoint_sequence_number: bigint | null
  }

  export type Meeting_roomsMinAggregateOutputType = {
    id: bigint | null
    room_id: string | null
    title: string | null
    seal_policy_id: string | null
    status: number | null
    max_participants: bigint | null
    require_approval: boolean | null
    participant_count: number | null
    created_at: bigint | null
    started_at: bigint | null
    ended_at: bigint | null
    checkpoint_sequence_number: bigint | null
    transaction_digest: string | null
    indexed_at: Date | null
    updated_at: Date | null
  }

  export type Meeting_roomsMaxAggregateOutputType = {
    id: bigint | null
    room_id: string | null
    title: string | null
    seal_policy_id: string | null
    status: number | null
    max_participants: bigint | null
    require_approval: boolean | null
    participant_count: number | null
    created_at: bigint | null
    started_at: bigint | null
    ended_at: bigint | null
    checkpoint_sequence_number: bigint | null
    transaction_digest: string | null
    indexed_at: Date | null
    updated_at: Date | null
  }

  export type Meeting_roomsCountAggregateOutputType = {
    id: number
    room_id: number
    title: number
    hosts: number
    seal_policy_id: number
    status: number
    max_participants: number
    require_approval: number
    participant_count: number
    created_at: number
    started_at: number
    ended_at: number
    checkpoint_sequence_number: number
    transaction_digest: number
    indexed_at: number
    updated_at: number
    _all: number
  }


  export type Meeting_roomsAvgAggregateInputType = {
    id?: true
    status?: true
    max_participants?: true
    participant_count?: true
    created_at?: true
    started_at?: true
    ended_at?: true
    checkpoint_sequence_number?: true
  }

  export type Meeting_roomsSumAggregateInputType = {
    id?: true
    status?: true
    max_participants?: true
    participant_count?: true
    created_at?: true
    started_at?: true
    ended_at?: true
    checkpoint_sequence_number?: true
  }

  export type Meeting_roomsMinAggregateInputType = {
    id?: true
    room_id?: true
    title?: true
    seal_policy_id?: true
    status?: true
    max_participants?: true
    require_approval?: true
    participant_count?: true
    created_at?: true
    started_at?: true
    ended_at?: true
    checkpoint_sequence_number?: true
    transaction_digest?: true
    indexed_at?: true
    updated_at?: true
  }

  export type Meeting_roomsMaxAggregateInputType = {
    id?: true
    room_id?: true
    title?: true
    seal_policy_id?: true
    status?: true
    max_participants?: true
    require_approval?: true
    participant_count?: true
    created_at?: true
    started_at?: true
    ended_at?: true
    checkpoint_sequence_number?: true
    transaction_digest?: true
    indexed_at?: true
    updated_at?: true
  }

  export type Meeting_roomsCountAggregateInputType = {
    id?: true
    room_id?: true
    title?: true
    hosts?: true
    seal_policy_id?: true
    status?: true
    max_participants?: true
    require_approval?: true
    participant_count?: true
    created_at?: true
    started_at?: true
    ended_at?: true
    checkpoint_sequence_number?: true
    transaction_digest?: true
    indexed_at?: true
    updated_at?: true
    _all?: true
  }

  export type Meeting_roomsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which meeting_rooms to aggregate.
     */
    where?: meeting_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomsOrderByWithRelationInput | meeting_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: meeting_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned meeting_rooms
    **/
    _count?: true | Meeting_roomsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Meeting_roomsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Meeting_roomsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Meeting_roomsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Meeting_roomsMaxAggregateInputType
  }

  export type GetMeeting_roomsAggregateType<T extends Meeting_roomsAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting_rooms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting_rooms[P]>
      : GetScalarType<T[P], AggregateMeeting_rooms[P]>
  }




  export type meeting_roomsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: meeting_roomsWhereInput
    orderBy?: meeting_roomsOrderByWithAggregationInput | meeting_roomsOrderByWithAggregationInput[]
    by: Meeting_roomsScalarFieldEnum[] | Meeting_roomsScalarFieldEnum
    having?: meeting_roomsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Meeting_roomsCountAggregateInputType | true
    _avg?: Meeting_roomsAvgAggregateInputType
    _sum?: Meeting_roomsSumAggregateInputType
    _min?: Meeting_roomsMinAggregateInputType
    _max?: Meeting_roomsMaxAggregateInputType
  }

  export type Meeting_roomsGroupByOutputType = {
    id: bigint
    room_id: string
    title: string
    hosts: string[]
    seal_policy_id: string
    status: number
    max_participants: bigint
    require_approval: boolean
    participant_count: number
    created_at: bigint
    started_at: bigint | null
    ended_at: bigint | null
    checkpoint_sequence_number: bigint
    transaction_digest: string
    indexed_at: Date
    updated_at: Date
    _count: Meeting_roomsCountAggregateOutputType | null
    _avg: Meeting_roomsAvgAggregateOutputType | null
    _sum: Meeting_roomsSumAggregateOutputType | null
    _min: Meeting_roomsMinAggregateOutputType | null
    _max: Meeting_roomsMaxAggregateOutputType | null
  }

  type GetMeeting_roomsGroupByPayload<T extends meeting_roomsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Meeting_roomsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Meeting_roomsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Meeting_roomsGroupByOutputType[P]>
            : GetScalarType<T[P], Meeting_roomsGroupByOutputType[P]>
        }
      >
    >


  export type meeting_roomsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    title?: boolean
    hosts?: boolean
    seal_policy_id?: boolean
    status?: boolean
    max_participants?: boolean
    require_approval?: boolean
    participant_count?: boolean
    created_at?: boolean
    started_at?: boolean
    ended_at?: boolean
    checkpoint_sequence_number?: boolean
    transaction_digest?: boolean
    indexed_at?: boolean
    updated_at?: boolean
    ApprovalRequest?: boolean | meeting_rooms$ApprovalRequestArgs<ExtArgs>
    room_metadata?: boolean | meeting_rooms$room_metadataArgs<ExtArgs>
    room_participants?: boolean | meeting_rooms$room_participantsArgs<ExtArgs>
    _count?: boolean | Meeting_roomsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting_rooms"]>

  export type meeting_roomsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    title?: boolean
    hosts?: boolean
    seal_policy_id?: boolean
    status?: boolean
    max_participants?: boolean
    require_approval?: boolean
    participant_count?: boolean
    created_at?: boolean
    started_at?: boolean
    ended_at?: boolean
    checkpoint_sequence_number?: boolean
    transaction_digest?: boolean
    indexed_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["meeting_rooms"]>

  export type meeting_roomsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    title?: boolean
    hosts?: boolean
    seal_policy_id?: boolean
    status?: boolean
    max_participants?: boolean
    require_approval?: boolean
    participant_count?: boolean
    created_at?: boolean
    started_at?: boolean
    ended_at?: boolean
    checkpoint_sequence_number?: boolean
    transaction_digest?: boolean
    indexed_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["meeting_rooms"]>

  export type meeting_roomsSelectScalar = {
    id?: boolean
    room_id?: boolean
    title?: boolean
    hosts?: boolean
    seal_policy_id?: boolean
    status?: boolean
    max_participants?: boolean
    require_approval?: boolean
    participant_count?: boolean
    created_at?: boolean
    started_at?: boolean
    ended_at?: boolean
    checkpoint_sequence_number?: boolean
    transaction_digest?: boolean
    indexed_at?: boolean
    updated_at?: boolean
  }

  export type meeting_roomsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "title" | "hosts" | "seal_policy_id" | "status" | "max_participants" | "require_approval" | "participant_count" | "created_at" | "started_at" | "ended_at" | "checkpoint_sequence_number" | "transaction_digest" | "indexed_at" | "updated_at", ExtArgs["result"]["meeting_rooms"]>
  export type meeting_roomsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ApprovalRequest?: boolean | meeting_rooms$ApprovalRequestArgs<ExtArgs>
    room_metadata?: boolean | meeting_rooms$room_metadataArgs<ExtArgs>
    room_participants?: boolean | meeting_rooms$room_participantsArgs<ExtArgs>
    _count?: boolean | Meeting_roomsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type meeting_roomsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type meeting_roomsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $meeting_roomsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "meeting_rooms"
    objects: {
      ApprovalRequest: Prisma.$ApprovalRequestPayload<ExtArgs>[]
      room_metadata: Prisma.$room_metadataPayload<ExtArgs> | null
      room_participants: Prisma.$room_participantsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      room_id: string
      title: string
      hosts: string[]
      seal_policy_id: string
      status: number
      max_participants: bigint
      require_approval: boolean
      participant_count: number
      created_at: bigint
      started_at: bigint | null
      ended_at: bigint | null
      checkpoint_sequence_number: bigint
      transaction_digest: string
      indexed_at: Date
      updated_at: Date
    }, ExtArgs["result"]["meeting_rooms"]>
    composites: {}
  }

  type meeting_roomsGetPayload<S extends boolean | null | undefined | meeting_roomsDefaultArgs> = $Result.GetResult<Prisma.$meeting_roomsPayload, S>

  type meeting_roomsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<meeting_roomsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Meeting_roomsCountAggregateInputType | true
    }

  export interface meeting_roomsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['meeting_rooms'], meta: { name: 'meeting_rooms' } }
    /**
     * Find zero or one Meeting_rooms that matches the filter.
     * @param {meeting_roomsFindUniqueArgs} args - Arguments to find a Meeting_rooms
     * @example
     * // Get one Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends meeting_roomsFindUniqueArgs>(args: SelectSubset<T, meeting_roomsFindUniqueArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meeting_rooms that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {meeting_roomsFindUniqueOrThrowArgs} args - Arguments to find a Meeting_rooms
     * @example
     * // Get one Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends meeting_roomsFindUniqueOrThrowArgs>(args: SelectSubset<T, meeting_roomsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting_rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomsFindFirstArgs} args - Arguments to find a Meeting_rooms
     * @example
     * // Get one Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends meeting_roomsFindFirstArgs>(args?: SelectSubset<T, meeting_roomsFindFirstArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting_rooms that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomsFindFirstOrThrowArgs} args - Arguments to find a Meeting_rooms
     * @example
     * // Get one Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends meeting_roomsFindFirstOrThrowArgs>(args?: SelectSubset<T, meeting_roomsFindFirstOrThrowArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meeting_rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.findMany()
     * 
     * // Get first 10 Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meeting_roomsWithIdOnly = await prisma.meeting_rooms.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends meeting_roomsFindManyArgs>(args?: SelectSubset<T, meeting_roomsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meeting_rooms.
     * @param {meeting_roomsCreateArgs} args - Arguments to create a Meeting_rooms.
     * @example
     * // Create one Meeting_rooms
     * const Meeting_rooms = await prisma.meeting_rooms.create({
     *   data: {
     *     // ... data to create a Meeting_rooms
     *   }
     * })
     * 
     */
    create<T extends meeting_roomsCreateArgs>(args: SelectSubset<T, meeting_roomsCreateArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meeting_rooms.
     * @param {meeting_roomsCreateManyArgs} args - Arguments to create many Meeting_rooms.
     * @example
     * // Create many Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends meeting_roomsCreateManyArgs>(args?: SelectSubset<T, meeting_roomsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meeting_rooms and returns the data saved in the database.
     * @param {meeting_roomsCreateManyAndReturnArgs} args - Arguments to create many Meeting_rooms.
     * @example
     * // Create many Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meeting_rooms and only return the `id`
     * const meeting_roomsWithIdOnly = await prisma.meeting_rooms.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends meeting_roomsCreateManyAndReturnArgs>(args?: SelectSubset<T, meeting_roomsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meeting_rooms.
     * @param {meeting_roomsDeleteArgs} args - Arguments to delete one Meeting_rooms.
     * @example
     * // Delete one Meeting_rooms
     * const Meeting_rooms = await prisma.meeting_rooms.delete({
     *   where: {
     *     // ... filter to delete one Meeting_rooms
     *   }
     * })
     * 
     */
    delete<T extends meeting_roomsDeleteArgs>(args: SelectSubset<T, meeting_roomsDeleteArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meeting_rooms.
     * @param {meeting_roomsUpdateArgs} args - Arguments to update one Meeting_rooms.
     * @example
     * // Update one Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends meeting_roomsUpdateArgs>(args: SelectSubset<T, meeting_roomsUpdateArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meeting_rooms.
     * @param {meeting_roomsDeleteManyArgs} args - Arguments to filter Meeting_rooms to delete.
     * @example
     * // Delete a few Meeting_rooms
     * const { count } = await prisma.meeting_rooms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends meeting_roomsDeleteManyArgs>(args?: SelectSubset<T, meeting_roomsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meeting_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends meeting_roomsUpdateManyArgs>(args: SelectSubset<T, meeting_roomsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meeting_rooms and returns the data updated in the database.
     * @param {meeting_roomsUpdateManyAndReturnArgs} args - Arguments to update many Meeting_rooms.
     * @example
     * // Update many Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meeting_rooms and only return the `id`
     * const meeting_roomsWithIdOnly = await prisma.meeting_rooms.updateManyAndReturn({
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
    updateManyAndReturn<T extends meeting_roomsUpdateManyAndReturnArgs>(args: SelectSubset<T, meeting_roomsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meeting_rooms.
     * @param {meeting_roomsUpsertArgs} args - Arguments to update or create a Meeting_rooms.
     * @example
     * // Update or create a Meeting_rooms
     * const meeting_rooms = await prisma.meeting_rooms.upsert({
     *   create: {
     *     // ... data to create a Meeting_rooms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting_rooms we want to update
     *   }
     * })
     */
    upsert<T extends meeting_roomsUpsertArgs>(args: SelectSubset<T, meeting_roomsUpsertArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meeting_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomsCountArgs} args - Arguments to filter Meeting_rooms to count.
     * @example
     * // Count the number of Meeting_rooms
     * const count = await prisma.meeting_rooms.count({
     *   where: {
     *     // ... the filter for the Meeting_rooms we want to count
     *   }
     * })
    **/
    count<T extends meeting_roomsCountArgs>(
      args?: Subset<T, meeting_roomsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Meeting_roomsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Meeting_roomsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Meeting_roomsAggregateArgs>(args: Subset<T, Meeting_roomsAggregateArgs>): Prisma.PrismaPromise<GetMeeting_roomsAggregateType<T>>

    /**
     * Group by Meeting_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomsGroupByArgs} args - Group by arguments.
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
      T extends meeting_roomsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: meeting_roomsGroupByArgs['orderBy'] }
        : { orderBy?: meeting_roomsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, meeting_roomsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeeting_roomsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the meeting_rooms model
   */
  readonly fields: meeting_roomsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for meeting_rooms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__meeting_roomsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ApprovalRequest<T extends meeting_rooms$ApprovalRequestArgs<ExtArgs> = {}>(args?: Subset<T, meeting_rooms$ApprovalRequestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room_metadata<T extends meeting_rooms$room_metadataArgs<ExtArgs> = {}>(args?: Subset<T, meeting_rooms$room_metadataArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    room_participants<T extends meeting_rooms$room_participantsArgs<ExtArgs> = {}>(args?: Subset<T, meeting_rooms$room_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the meeting_rooms model
   */
  interface meeting_roomsFieldRefs {
    readonly id: FieldRef<"meeting_rooms", 'BigInt'>
    readonly room_id: FieldRef<"meeting_rooms", 'String'>
    readonly title: FieldRef<"meeting_rooms", 'String'>
    readonly hosts: FieldRef<"meeting_rooms", 'String[]'>
    readonly seal_policy_id: FieldRef<"meeting_rooms", 'String'>
    readonly status: FieldRef<"meeting_rooms", 'Int'>
    readonly max_participants: FieldRef<"meeting_rooms", 'BigInt'>
    readonly require_approval: FieldRef<"meeting_rooms", 'Boolean'>
    readonly participant_count: FieldRef<"meeting_rooms", 'Int'>
    readonly created_at: FieldRef<"meeting_rooms", 'BigInt'>
    readonly started_at: FieldRef<"meeting_rooms", 'BigInt'>
    readonly ended_at: FieldRef<"meeting_rooms", 'BigInt'>
    readonly checkpoint_sequence_number: FieldRef<"meeting_rooms", 'BigInt'>
    readonly transaction_digest: FieldRef<"meeting_rooms", 'String'>
    readonly indexed_at: FieldRef<"meeting_rooms", 'DateTime'>
    readonly updated_at: FieldRef<"meeting_rooms", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * meeting_rooms findUnique
   */
  export type meeting_roomsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * Filter, which meeting_rooms to fetch.
     */
    where: meeting_roomsWhereUniqueInput
  }

  /**
   * meeting_rooms findUniqueOrThrow
   */
  export type meeting_roomsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * Filter, which meeting_rooms to fetch.
     */
    where: meeting_roomsWhereUniqueInput
  }

  /**
   * meeting_rooms findFirst
   */
  export type meeting_roomsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * Filter, which meeting_rooms to fetch.
     */
    where?: meeting_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomsOrderByWithRelationInput | meeting_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for meeting_rooms.
     */
    cursor?: meeting_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of meeting_rooms.
     */
    distinct?: Meeting_roomsScalarFieldEnum | Meeting_roomsScalarFieldEnum[]
  }

  /**
   * meeting_rooms findFirstOrThrow
   */
  export type meeting_roomsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * Filter, which meeting_rooms to fetch.
     */
    where?: meeting_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomsOrderByWithRelationInput | meeting_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for meeting_rooms.
     */
    cursor?: meeting_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of meeting_rooms.
     */
    distinct?: Meeting_roomsScalarFieldEnum | Meeting_roomsScalarFieldEnum[]
  }

  /**
   * meeting_rooms findMany
   */
  export type meeting_roomsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * Filter, which meeting_rooms to fetch.
     */
    where?: meeting_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomsOrderByWithRelationInput | meeting_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing meeting_rooms.
     */
    cursor?: meeting_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    distinct?: Meeting_roomsScalarFieldEnum | Meeting_roomsScalarFieldEnum[]
  }

  /**
   * meeting_rooms create
   */
  export type meeting_roomsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * The data needed to create a meeting_rooms.
     */
    data: XOR<meeting_roomsCreateInput, meeting_roomsUncheckedCreateInput>
  }

  /**
   * meeting_rooms createMany
   */
  export type meeting_roomsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many meeting_rooms.
     */
    data: meeting_roomsCreateManyInput | meeting_roomsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * meeting_rooms createManyAndReturn
   */
  export type meeting_roomsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * The data used to create many meeting_rooms.
     */
    data: meeting_roomsCreateManyInput | meeting_roomsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * meeting_rooms update
   */
  export type meeting_roomsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * The data needed to update a meeting_rooms.
     */
    data: XOR<meeting_roomsUpdateInput, meeting_roomsUncheckedUpdateInput>
    /**
     * Choose, which meeting_rooms to update.
     */
    where: meeting_roomsWhereUniqueInput
  }

  /**
   * meeting_rooms updateMany
   */
  export type meeting_roomsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update meeting_rooms.
     */
    data: XOR<meeting_roomsUpdateManyMutationInput, meeting_roomsUncheckedUpdateManyInput>
    /**
     * Filter which meeting_rooms to update
     */
    where?: meeting_roomsWhereInput
    /**
     * Limit how many meeting_rooms to update.
     */
    limit?: number
  }

  /**
   * meeting_rooms updateManyAndReturn
   */
  export type meeting_roomsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * The data used to update meeting_rooms.
     */
    data: XOR<meeting_roomsUpdateManyMutationInput, meeting_roomsUncheckedUpdateManyInput>
    /**
     * Filter which meeting_rooms to update
     */
    where?: meeting_roomsWhereInput
    /**
     * Limit how many meeting_rooms to update.
     */
    limit?: number
  }

  /**
   * meeting_rooms upsert
   */
  export type meeting_roomsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * The filter to search for the meeting_rooms to update in case it exists.
     */
    where: meeting_roomsWhereUniqueInput
    /**
     * In case the meeting_rooms found by the `where` argument doesn't exist, create a new meeting_rooms with this data.
     */
    create: XOR<meeting_roomsCreateInput, meeting_roomsUncheckedCreateInput>
    /**
     * In case the meeting_rooms was found with the provided `where` argument, update it with this data.
     */
    update: XOR<meeting_roomsUpdateInput, meeting_roomsUncheckedUpdateInput>
  }

  /**
   * meeting_rooms delete
   */
  export type meeting_roomsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
    /**
     * Filter which meeting_rooms to delete.
     */
    where: meeting_roomsWhereUniqueInput
  }

  /**
   * meeting_rooms deleteMany
   */
  export type meeting_roomsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which meeting_rooms to delete
     */
    where?: meeting_roomsWhereInput
    /**
     * Limit how many meeting_rooms to delete.
     */
    limit?: number
  }

  /**
   * meeting_rooms.ApprovalRequest
   */
  export type meeting_rooms$ApprovalRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    where?: ApprovalRequestWhereInput
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    cursor?: ApprovalRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * meeting_rooms.room_metadata
   */
  export type meeting_rooms$room_metadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    where?: room_metadataWhereInput
  }

  /**
   * meeting_rooms.room_participants
   */
  export type meeting_rooms$room_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    where?: room_participantsWhereInput
    orderBy?: room_participantsOrderByWithRelationInput | room_participantsOrderByWithRelationInput[]
    cursor?: room_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_participantsScalarFieldEnum | Room_participantsScalarFieldEnum[]
  }

  /**
   * meeting_rooms without action
   */
  export type meeting_roomsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_rooms
     */
    select?: meeting_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_rooms
     */
    omit?: meeting_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomsInclude<ExtArgs> | null
  }


  /**
   * Model room_metadata
   */

  export type AggregateRoom_metadata = {
    _count: Room_metadataCountAggregateOutputType | null
    _avg: Room_metadataAvgAggregateOutputType | null
    _sum: Room_metadataSumAggregateOutputType | null
    _min: Room_metadataMinAggregateOutputType | null
    _max: Room_metadataMaxAggregateOutputType | null
  }

  export type Room_metadataAvgAggregateOutputType = {
    id: number | null
    df_version: number | null
    recording_blob_id: Decimal | null
  }

  export type Room_metadataSumAggregateOutputType = {
    id: bigint | null
    df_version: bigint | null
    recording_blob_id: Decimal | null
  }

  export type Room_metadataMinAggregateOutputType = {
    id: bigint | null
    room_id: string | null
    dynamic_field_id: string | null
    df_version: bigint | null
    language: string | null
    timezone: string | null
    recording_blob_id: Decimal | null
    indexed_at: Date | null
    updated_at: Date | null
  }

  export type Room_metadataMaxAggregateOutputType = {
    id: bigint | null
    room_id: string | null
    dynamic_field_id: string | null
    df_version: bigint | null
    language: string | null
    timezone: string | null
    recording_blob_id: Decimal | null
    indexed_at: Date | null
    updated_at: Date | null
  }

  export type Room_metadataCountAggregateOutputType = {
    id: number
    room_id: number
    dynamic_field_id: number
    df_version: number
    language: number
    timezone: number
    recording_blob_id: number
    indexed_at: number
    updated_at: number
    _all: number
  }


  export type Room_metadataAvgAggregateInputType = {
    id?: true
    df_version?: true
    recording_blob_id?: true
  }

  export type Room_metadataSumAggregateInputType = {
    id?: true
    df_version?: true
    recording_blob_id?: true
  }

  export type Room_metadataMinAggregateInputType = {
    id?: true
    room_id?: true
    dynamic_field_id?: true
    df_version?: true
    language?: true
    timezone?: true
    recording_blob_id?: true
    indexed_at?: true
    updated_at?: true
  }

  export type Room_metadataMaxAggregateInputType = {
    id?: true
    room_id?: true
    dynamic_field_id?: true
    df_version?: true
    language?: true
    timezone?: true
    recording_blob_id?: true
    indexed_at?: true
    updated_at?: true
  }

  export type Room_metadataCountAggregateInputType = {
    id?: true
    room_id?: true
    dynamic_field_id?: true
    df_version?: true
    language?: true
    timezone?: true
    recording_blob_id?: true
    indexed_at?: true
    updated_at?: true
    _all?: true
  }

  export type Room_metadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_metadata to aggregate.
     */
    where?: room_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_metadata to fetch.
     */
    orderBy?: room_metadataOrderByWithRelationInput | room_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_metadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_metadata
    **/
    _count?: true | Room_metadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Room_metadataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Room_metadataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_metadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_metadataMaxAggregateInputType
  }

  export type GetRoom_metadataAggregateType<T extends Room_metadataAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_metadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_metadata[P]>
      : GetScalarType<T[P], AggregateRoom_metadata[P]>
  }




  export type room_metadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_metadataWhereInput
    orderBy?: room_metadataOrderByWithAggregationInput | room_metadataOrderByWithAggregationInput[]
    by: Room_metadataScalarFieldEnum[] | Room_metadataScalarFieldEnum
    having?: room_metadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_metadataCountAggregateInputType | true
    _avg?: Room_metadataAvgAggregateInputType
    _sum?: Room_metadataSumAggregateInputType
    _min?: Room_metadataMinAggregateInputType
    _max?: Room_metadataMaxAggregateInputType
  }

  export type Room_metadataGroupByOutputType = {
    id: bigint
    room_id: string
    dynamic_field_id: string
    df_version: bigint
    language: string
    timezone: string
    recording_blob_id: Decimal | null
    indexed_at: Date
    updated_at: Date
    _count: Room_metadataCountAggregateOutputType | null
    _avg: Room_metadataAvgAggregateOutputType | null
    _sum: Room_metadataSumAggregateOutputType | null
    _min: Room_metadataMinAggregateOutputType | null
    _max: Room_metadataMaxAggregateOutputType | null
  }

  type GetRoom_metadataGroupByPayload<T extends room_metadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_metadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_metadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_metadataGroupByOutputType[P]>
            : GetScalarType<T[P], Room_metadataGroupByOutputType[P]>
        }
      >
    >


  export type room_metadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    dynamic_field_id?: boolean
    df_version?: boolean
    language?: boolean
    timezone?: boolean
    recording_blob_id?: boolean
    indexed_at?: boolean
    updated_at?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_metadata"]>

  export type room_metadataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    dynamic_field_id?: boolean
    df_version?: boolean
    language?: boolean
    timezone?: boolean
    recording_blob_id?: boolean
    indexed_at?: boolean
    updated_at?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_metadata"]>

  export type room_metadataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    dynamic_field_id?: boolean
    df_version?: boolean
    language?: boolean
    timezone?: boolean
    recording_blob_id?: boolean
    indexed_at?: boolean
    updated_at?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_metadata"]>

  export type room_metadataSelectScalar = {
    id?: boolean
    room_id?: boolean
    dynamic_field_id?: boolean
    df_version?: boolean
    language?: boolean
    timezone?: boolean
    recording_blob_id?: boolean
    indexed_at?: boolean
    updated_at?: boolean
  }

  export type room_metadataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "dynamic_field_id" | "df_version" | "language" | "timezone" | "recording_blob_id" | "indexed_at" | "updated_at", ExtArgs["result"]["room_metadata"]>
  export type room_metadataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }
  export type room_metadataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }
  export type room_metadataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }

  export type $room_metadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_metadata"
    objects: {
      meeting_rooms: Prisma.$meeting_roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      room_id: string
      dynamic_field_id: string
      df_version: bigint
      language: string
      timezone: string
      recording_blob_id: Prisma.Decimal | null
      indexed_at: Date
      updated_at: Date
    }, ExtArgs["result"]["room_metadata"]>
    composites: {}
  }

  type room_metadataGetPayload<S extends boolean | null | undefined | room_metadataDefaultArgs> = $Result.GetResult<Prisma.$room_metadataPayload, S>

  type room_metadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_metadataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_metadataCountAggregateInputType | true
    }

  export interface room_metadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_metadata'], meta: { name: 'room_metadata' } }
    /**
     * Find zero or one Room_metadata that matches the filter.
     * @param {room_metadataFindUniqueArgs} args - Arguments to find a Room_metadata
     * @example
     * // Get one Room_metadata
     * const room_metadata = await prisma.room_metadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_metadataFindUniqueArgs>(args: SelectSubset<T, room_metadataFindUniqueArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_metadata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_metadataFindUniqueOrThrowArgs} args - Arguments to find a Room_metadata
     * @example
     * // Get one Room_metadata
     * const room_metadata = await prisma.room_metadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_metadataFindUniqueOrThrowArgs>(args: SelectSubset<T, room_metadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_metadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_metadataFindFirstArgs} args - Arguments to find a Room_metadata
     * @example
     * // Get one Room_metadata
     * const room_metadata = await prisma.room_metadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_metadataFindFirstArgs>(args?: SelectSubset<T, room_metadataFindFirstArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_metadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_metadataFindFirstOrThrowArgs} args - Arguments to find a Room_metadata
     * @example
     * // Get one Room_metadata
     * const room_metadata = await prisma.room_metadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_metadataFindFirstOrThrowArgs>(args?: SelectSubset<T, room_metadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_metadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_metadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_metadata
     * const room_metadata = await prisma.room_metadata.findMany()
     * 
     * // Get first 10 Room_metadata
     * const room_metadata = await prisma.room_metadata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const room_metadataWithIdOnly = await prisma.room_metadata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends room_metadataFindManyArgs>(args?: SelectSubset<T, room_metadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_metadata.
     * @param {room_metadataCreateArgs} args - Arguments to create a Room_metadata.
     * @example
     * // Create one Room_metadata
     * const Room_metadata = await prisma.room_metadata.create({
     *   data: {
     *     // ... data to create a Room_metadata
     *   }
     * })
     * 
     */
    create<T extends room_metadataCreateArgs>(args: SelectSubset<T, room_metadataCreateArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_metadata.
     * @param {room_metadataCreateManyArgs} args - Arguments to create many Room_metadata.
     * @example
     * // Create many Room_metadata
     * const room_metadata = await prisma.room_metadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_metadataCreateManyArgs>(args?: SelectSubset<T, room_metadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_metadata and returns the data saved in the database.
     * @param {room_metadataCreateManyAndReturnArgs} args - Arguments to create many Room_metadata.
     * @example
     * // Create many Room_metadata
     * const room_metadata = await prisma.room_metadata.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_metadata and only return the `id`
     * const room_metadataWithIdOnly = await prisma.room_metadata.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_metadataCreateManyAndReturnArgs>(args?: SelectSubset<T, room_metadataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_metadata.
     * @param {room_metadataDeleteArgs} args - Arguments to delete one Room_metadata.
     * @example
     * // Delete one Room_metadata
     * const Room_metadata = await prisma.room_metadata.delete({
     *   where: {
     *     // ... filter to delete one Room_metadata
     *   }
     * })
     * 
     */
    delete<T extends room_metadataDeleteArgs>(args: SelectSubset<T, room_metadataDeleteArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_metadata.
     * @param {room_metadataUpdateArgs} args - Arguments to update one Room_metadata.
     * @example
     * // Update one Room_metadata
     * const room_metadata = await prisma.room_metadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_metadataUpdateArgs>(args: SelectSubset<T, room_metadataUpdateArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_metadata.
     * @param {room_metadataDeleteManyArgs} args - Arguments to filter Room_metadata to delete.
     * @example
     * // Delete a few Room_metadata
     * const { count } = await prisma.room_metadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_metadataDeleteManyArgs>(args?: SelectSubset<T, room_metadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_metadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_metadata
     * const room_metadata = await prisma.room_metadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_metadataUpdateManyArgs>(args: SelectSubset<T, room_metadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_metadata and returns the data updated in the database.
     * @param {room_metadataUpdateManyAndReturnArgs} args - Arguments to update many Room_metadata.
     * @example
     * // Update many Room_metadata
     * const room_metadata = await prisma.room_metadata.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_metadata and only return the `id`
     * const room_metadataWithIdOnly = await prisma.room_metadata.updateManyAndReturn({
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
    updateManyAndReturn<T extends room_metadataUpdateManyAndReturnArgs>(args: SelectSubset<T, room_metadataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_metadata.
     * @param {room_metadataUpsertArgs} args - Arguments to update or create a Room_metadata.
     * @example
     * // Update or create a Room_metadata
     * const room_metadata = await prisma.room_metadata.upsert({
     *   create: {
     *     // ... data to create a Room_metadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_metadata we want to update
     *   }
     * })
     */
    upsert<T extends room_metadataUpsertArgs>(args: SelectSubset<T, room_metadataUpsertArgs<ExtArgs>>): Prisma__room_metadataClient<$Result.GetResult<Prisma.$room_metadataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_metadataCountArgs} args - Arguments to filter Room_metadata to count.
     * @example
     * // Count the number of Room_metadata
     * const count = await prisma.room_metadata.count({
     *   where: {
     *     // ... the filter for the Room_metadata we want to count
     *   }
     * })
    **/
    count<T extends room_metadataCountArgs>(
      args?: Subset<T, room_metadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_metadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_metadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Room_metadataAggregateArgs>(args: Subset<T, Room_metadataAggregateArgs>): Prisma.PrismaPromise<GetRoom_metadataAggregateType<T>>

    /**
     * Group by Room_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_metadataGroupByArgs} args - Group by arguments.
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
      T extends room_metadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_metadataGroupByArgs['orderBy'] }
        : { orderBy?: room_metadataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, room_metadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_metadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_metadata model
   */
  readonly fields: room_metadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_metadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_metadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting_rooms<T extends meeting_roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, meeting_roomsDefaultArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the room_metadata model
   */
  interface room_metadataFieldRefs {
    readonly id: FieldRef<"room_metadata", 'BigInt'>
    readonly room_id: FieldRef<"room_metadata", 'String'>
    readonly dynamic_field_id: FieldRef<"room_metadata", 'String'>
    readonly df_version: FieldRef<"room_metadata", 'BigInt'>
    readonly language: FieldRef<"room_metadata", 'String'>
    readonly timezone: FieldRef<"room_metadata", 'String'>
    readonly recording_blob_id: FieldRef<"room_metadata", 'Decimal'>
    readonly indexed_at: FieldRef<"room_metadata", 'DateTime'>
    readonly updated_at: FieldRef<"room_metadata", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * room_metadata findUnique
   */
  export type room_metadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * Filter, which room_metadata to fetch.
     */
    where: room_metadataWhereUniqueInput
  }

  /**
   * room_metadata findUniqueOrThrow
   */
  export type room_metadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * Filter, which room_metadata to fetch.
     */
    where: room_metadataWhereUniqueInput
  }

  /**
   * room_metadata findFirst
   */
  export type room_metadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * Filter, which room_metadata to fetch.
     */
    where?: room_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_metadata to fetch.
     */
    orderBy?: room_metadataOrderByWithRelationInput | room_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_metadata.
     */
    cursor?: room_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_metadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_metadata.
     */
    distinct?: Room_metadataScalarFieldEnum | Room_metadataScalarFieldEnum[]
  }

  /**
   * room_metadata findFirstOrThrow
   */
  export type room_metadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * Filter, which room_metadata to fetch.
     */
    where?: room_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_metadata to fetch.
     */
    orderBy?: room_metadataOrderByWithRelationInput | room_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_metadata.
     */
    cursor?: room_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_metadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_metadata.
     */
    distinct?: Room_metadataScalarFieldEnum | Room_metadataScalarFieldEnum[]
  }

  /**
   * room_metadata findMany
   */
  export type room_metadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * Filter, which room_metadata to fetch.
     */
    where?: room_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_metadata to fetch.
     */
    orderBy?: room_metadataOrderByWithRelationInput | room_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_metadata.
     */
    cursor?: room_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_metadata.
     */
    skip?: number
    distinct?: Room_metadataScalarFieldEnum | Room_metadataScalarFieldEnum[]
  }

  /**
   * room_metadata create
   */
  export type room_metadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * The data needed to create a room_metadata.
     */
    data: XOR<room_metadataCreateInput, room_metadataUncheckedCreateInput>
  }

  /**
   * room_metadata createMany
   */
  export type room_metadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_metadata.
     */
    data: room_metadataCreateManyInput | room_metadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_metadata createManyAndReturn
   */
  export type room_metadataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * The data used to create many room_metadata.
     */
    data: room_metadataCreateManyInput | room_metadataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_metadata update
   */
  export type room_metadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * The data needed to update a room_metadata.
     */
    data: XOR<room_metadataUpdateInput, room_metadataUncheckedUpdateInput>
    /**
     * Choose, which room_metadata to update.
     */
    where: room_metadataWhereUniqueInput
  }

  /**
   * room_metadata updateMany
   */
  export type room_metadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_metadata.
     */
    data: XOR<room_metadataUpdateManyMutationInput, room_metadataUncheckedUpdateManyInput>
    /**
     * Filter which room_metadata to update
     */
    where?: room_metadataWhereInput
    /**
     * Limit how many room_metadata to update.
     */
    limit?: number
  }

  /**
   * room_metadata updateManyAndReturn
   */
  export type room_metadataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * The data used to update room_metadata.
     */
    data: XOR<room_metadataUpdateManyMutationInput, room_metadataUncheckedUpdateManyInput>
    /**
     * Filter which room_metadata to update
     */
    where?: room_metadataWhereInput
    /**
     * Limit how many room_metadata to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_metadata upsert
   */
  export type room_metadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * The filter to search for the room_metadata to update in case it exists.
     */
    where: room_metadataWhereUniqueInput
    /**
     * In case the room_metadata found by the `where` argument doesn't exist, create a new room_metadata with this data.
     */
    create: XOR<room_metadataCreateInput, room_metadataUncheckedCreateInput>
    /**
     * In case the room_metadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_metadataUpdateInput, room_metadataUncheckedUpdateInput>
  }

  /**
   * room_metadata delete
   */
  export type room_metadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
    /**
     * Filter which room_metadata to delete.
     */
    where: room_metadataWhereUniqueInput
  }

  /**
   * room_metadata deleteMany
   */
  export type room_metadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_metadata to delete
     */
    where?: room_metadataWhereInput
    /**
     * Limit how many room_metadata to delete.
     */
    limit?: number
  }

  /**
   * room_metadata without action
   */
  export type room_metadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_metadata
     */
    select?: room_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_metadata
     */
    omit?: room_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_metadataInclude<ExtArgs> | null
  }


  /**
   * Model room_participants
   */

  export type AggregateRoom_participants = {
    _count: Room_participantsCountAggregateOutputType | null
    _avg: Room_participantsAvgAggregateOutputType | null
    _sum: Room_participantsSumAggregateOutputType | null
    _min: Room_participantsMinAggregateOutputType | null
    _max: Room_participantsMaxAggregateOutputType | null
  }

  export type Room_participantsAvgAggregateOutputType = {
    id: number | null
  }

  export type Room_participantsSumAggregateOutputType = {
    id: bigint | null
  }

  export type Room_participantsMinAggregateOutputType = {
    id: bigint | null
    room_id: string | null
    participant_address: string | null
    role: string | null
    admin_cap_id: string | null
    joined_at: Date | null
    updated_at: Date | null
  }

  export type Room_participantsMaxAggregateOutputType = {
    id: bigint | null
    room_id: string | null
    participant_address: string | null
    role: string | null
    admin_cap_id: string | null
    joined_at: Date | null
    updated_at: Date | null
  }

  export type Room_participantsCountAggregateOutputType = {
    id: number
    room_id: number
    participant_address: number
    role: number
    admin_cap_id: number
    joined_at: number
    updated_at: number
    _all: number
  }


  export type Room_participantsAvgAggregateInputType = {
    id?: true
  }

  export type Room_participantsSumAggregateInputType = {
    id?: true
  }

  export type Room_participantsMinAggregateInputType = {
    id?: true
    room_id?: true
    participant_address?: true
    role?: true
    admin_cap_id?: true
    joined_at?: true
    updated_at?: true
  }

  export type Room_participantsMaxAggregateInputType = {
    id?: true
    room_id?: true
    participant_address?: true
    role?: true
    admin_cap_id?: true
    joined_at?: true
    updated_at?: true
  }

  export type Room_participantsCountAggregateInputType = {
    id?: true
    room_id?: true
    participant_address?: true
    role?: true
    admin_cap_id?: true
    joined_at?: true
    updated_at?: true
    _all?: true
  }

  export type Room_participantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_participants to aggregate.
     */
    where?: room_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_participants to fetch.
     */
    orderBy?: room_participantsOrderByWithRelationInput | room_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_participants
    **/
    _count?: true | Room_participantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Room_participantsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Room_participantsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_participantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_participantsMaxAggregateInputType
  }

  export type GetRoom_participantsAggregateType<T extends Room_participantsAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_participants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_participants[P]>
      : GetScalarType<T[P], AggregateRoom_participants[P]>
  }




  export type room_participantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_participantsWhereInput
    orderBy?: room_participantsOrderByWithAggregationInput | room_participantsOrderByWithAggregationInput[]
    by: Room_participantsScalarFieldEnum[] | Room_participantsScalarFieldEnum
    having?: room_participantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_participantsCountAggregateInputType | true
    _avg?: Room_participantsAvgAggregateInputType
    _sum?: Room_participantsSumAggregateInputType
    _min?: Room_participantsMinAggregateInputType
    _max?: Room_participantsMaxAggregateInputType
  }

  export type Room_participantsGroupByOutputType = {
    id: bigint
    room_id: string
    participant_address: string
    role: string
    admin_cap_id: string | null
    joined_at: Date
    updated_at: Date
    _count: Room_participantsCountAggregateOutputType | null
    _avg: Room_participantsAvgAggregateOutputType | null
    _sum: Room_participantsSumAggregateOutputType | null
    _min: Room_participantsMinAggregateOutputType | null
    _max: Room_participantsMaxAggregateOutputType | null
  }

  type GetRoom_participantsGroupByPayload<T extends room_participantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_participantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_participantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_participantsGroupByOutputType[P]>
            : GetScalarType<T[P], Room_participantsGroupByOutputType[P]>
        }
      >
    >


  export type room_participantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    participant_address?: boolean
    role?: boolean
    admin_cap_id?: boolean
    joined_at?: boolean
    updated_at?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_participants"]>

  export type room_participantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    participant_address?: boolean
    role?: boolean
    admin_cap_id?: boolean
    joined_at?: boolean
    updated_at?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_participants"]>

  export type room_participantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    participant_address?: boolean
    role?: boolean
    admin_cap_id?: boolean
    joined_at?: boolean
    updated_at?: boolean
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_participants"]>

  export type room_participantsSelectScalar = {
    id?: boolean
    room_id?: boolean
    participant_address?: boolean
    role?: boolean
    admin_cap_id?: boolean
    joined_at?: boolean
    updated_at?: boolean
  }

  export type room_participantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "participant_address" | "role" | "admin_cap_id" | "joined_at" | "updated_at", ExtArgs["result"]["room_participants"]>
  export type room_participantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }
  export type room_participantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }
  export type room_participantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_rooms?: boolean | meeting_roomsDefaultArgs<ExtArgs>
  }

  export type $room_participantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_participants"
    objects: {
      meeting_rooms: Prisma.$meeting_roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      room_id: string
      participant_address: string
      role: string
      admin_cap_id: string | null
      joined_at: Date
      updated_at: Date
    }, ExtArgs["result"]["room_participants"]>
    composites: {}
  }

  type room_participantsGetPayload<S extends boolean | null | undefined | room_participantsDefaultArgs> = $Result.GetResult<Prisma.$room_participantsPayload, S>

  type room_participantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_participantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_participantsCountAggregateInputType | true
    }

  export interface room_participantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_participants'], meta: { name: 'room_participants' } }
    /**
     * Find zero or one Room_participants that matches the filter.
     * @param {room_participantsFindUniqueArgs} args - Arguments to find a Room_participants
     * @example
     * // Get one Room_participants
     * const room_participants = await prisma.room_participants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_participantsFindUniqueArgs>(args: SelectSubset<T, room_participantsFindUniqueArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_participants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_participantsFindUniqueOrThrowArgs} args - Arguments to find a Room_participants
     * @example
     * // Get one Room_participants
     * const room_participants = await prisma.room_participants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_participantsFindUniqueOrThrowArgs>(args: SelectSubset<T, room_participantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_participantsFindFirstArgs} args - Arguments to find a Room_participants
     * @example
     * // Get one Room_participants
     * const room_participants = await prisma.room_participants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_participantsFindFirstArgs>(args?: SelectSubset<T, room_participantsFindFirstArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_participants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_participantsFindFirstOrThrowArgs} args - Arguments to find a Room_participants
     * @example
     * // Get one Room_participants
     * const room_participants = await prisma.room_participants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_participantsFindFirstOrThrowArgs>(args?: SelectSubset<T, room_participantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_participantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_participants
     * const room_participants = await prisma.room_participants.findMany()
     * 
     * // Get first 10 Room_participants
     * const room_participants = await prisma.room_participants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const room_participantsWithIdOnly = await prisma.room_participants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends room_participantsFindManyArgs>(args?: SelectSubset<T, room_participantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_participants.
     * @param {room_participantsCreateArgs} args - Arguments to create a Room_participants.
     * @example
     * // Create one Room_participants
     * const Room_participants = await prisma.room_participants.create({
     *   data: {
     *     // ... data to create a Room_participants
     *   }
     * })
     * 
     */
    create<T extends room_participantsCreateArgs>(args: SelectSubset<T, room_participantsCreateArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_participants.
     * @param {room_participantsCreateManyArgs} args - Arguments to create many Room_participants.
     * @example
     * // Create many Room_participants
     * const room_participants = await prisma.room_participants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_participantsCreateManyArgs>(args?: SelectSubset<T, room_participantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_participants and returns the data saved in the database.
     * @param {room_participantsCreateManyAndReturnArgs} args - Arguments to create many Room_participants.
     * @example
     * // Create many Room_participants
     * const room_participants = await prisma.room_participants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_participants and only return the `id`
     * const room_participantsWithIdOnly = await prisma.room_participants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_participantsCreateManyAndReturnArgs>(args?: SelectSubset<T, room_participantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_participants.
     * @param {room_participantsDeleteArgs} args - Arguments to delete one Room_participants.
     * @example
     * // Delete one Room_participants
     * const Room_participants = await prisma.room_participants.delete({
     *   where: {
     *     // ... filter to delete one Room_participants
     *   }
     * })
     * 
     */
    delete<T extends room_participantsDeleteArgs>(args: SelectSubset<T, room_participantsDeleteArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_participants.
     * @param {room_participantsUpdateArgs} args - Arguments to update one Room_participants.
     * @example
     * // Update one Room_participants
     * const room_participants = await prisma.room_participants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_participantsUpdateArgs>(args: SelectSubset<T, room_participantsUpdateArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_participants.
     * @param {room_participantsDeleteManyArgs} args - Arguments to filter Room_participants to delete.
     * @example
     * // Delete a few Room_participants
     * const { count } = await prisma.room_participants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_participantsDeleteManyArgs>(args?: SelectSubset<T, room_participantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_participantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_participants
     * const room_participants = await prisma.room_participants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_participantsUpdateManyArgs>(args: SelectSubset<T, room_participantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_participants and returns the data updated in the database.
     * @param {room_participantsUpdateManyAndReturnArgs} args - Arguments to update many Room_participants.
     * @example
     * // Update many Room_participants
     * const room_participants = await prisma.room_participants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_participants and only return the `id`
     * const room_participantsWithIdOnly = await prisma.room_participants.updateManyAndReturn({
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
    updateManyAndReturn<T extends room_participantsUpdateManyAndReturnArgs>(args: SelectSubset<T, room_participantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_participants.
     * @param {room_participantsUpsertArgs} args - Arguments to update or create a Room_participants.
     * @example
     * // Update or create a Room_participants
     * const room_participants = await prisma.room_participants.upsert({
     *   create: {
     *     // ... data to create a Room_participants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_participants we want to update
     *   }
     * })
     */
    upsert<T extends room_participantsUpsertArgs>(args: SelectSubset<T, room_participantsUpsertArgs<ExtArgs>>): Prisma__room_participantsClient<$Result.GetResult<Prisma.$room_participantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_participantsCountArgs} args - Arguments to filter Room_participants to count.
     * @example
     * // Count the number of Room_participants
     * const count = await prisma.room_participants.count({
     *   where: {
     *     // ... the filter for the Room_participants we want to count
     *   }
     * })
    **/
    count<T extends room_participantsCountArgs>(
      args?: Subset<T, room_participantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_participantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_participantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Room_participantsAggregateArgs>(args: Subset<T, Room_participantsAggregateArgs>): Prisma.PrismaPromise<GetRoom_participantsAggregateType<T>>

    /**
     * Group by Room_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_participantsGroupByArgs} args - Group by arguments.
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
      T extends room_participantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_participantsGroupByArgs['orderBy'] }
        : { orderBy?: room_participantsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, room_participantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_participantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_participants model
   */
  readonly fields: room_participantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_participants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_participantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting_rooms<T extends meeting_roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, meeting_roomsDefaultArgs<ExtArgs>>): Prisma__meeting_roomsClient<$Result.GetResult<Prisma.$meeting_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the room_participants model
   */
  interface room_participantsFieldRefs {
    readonly id: FieldRef<"room_participants", 'BigInt'>
    readonly room_id: FieldRef<"room_participants", 'String'>
    readonly participant_address: FieldRef<"room_participants", 'String'>
    readonly role: FieldRef<"room_participants", 'String'>
    readonly admin_cap_id: FieldRef<"room_participants", 'String'>
    readonly joined_at: FieldRef<"room_participants", 'DateTime'>
    readonly updated_at: FieldRef<"room_participants", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * room_participants findUnique
   */
  export type room_participantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * Filter, which room_participants to fetch.
     */
    where: room_participantsWhereUniqueInput
  }

  /**
   * room_participants findUniqueOrThrow
   */
  export type room_participantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * Filter, which room_participants to fetch.
     */
    where: room_participantsWhereUniqueInput
  }

  /**
   * room_participants findFirst
   */
  export type room_participantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * Filter, which room_participants to fetch.
     */
    where?: room_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_participants to fetch.
     */
    orderBy?: room_participantsOrderByWithRelationInput | room_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_participants.
     */
    cursor?: room_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_participants.
     */
    distinct?: Room_participantsScalarFieldEnum | Room_participantsScalarFieldEnum[]
  }

  /**
   * room_participants findFirstOrThrow
   */
  export type room_participantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * Filter, which room_participants to fetch.
     */
    where?: room_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_participants to fetch.
     */
    orderBy?: room_participantsOrderByWithRelationInput | room_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_participants.
     */
    cursor?: room_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_participants.
     */
    distinct?: Room_participantsScalarFieldEnum | Room_participantsScalarFieldEnum[]
  }

  /**
   * room_participants findMany
   */
  export type room_participantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * Filter, which room_participants to fetch.
     */
    where?: room_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_participants to fetch.
     */
    orderBy?: room_participantsOrderByWithRelationInput | room_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_participants.
     */
    cursor?: room_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_participants.
     */
    skip?: number
    distinct?: Room_participantsScalarFieldEnum | Room_participantsScalarFieldEnum[]
  }

  /**
   * room_participants create
   */
  export type room_participantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * The data needed to create a room_participants.
     */
    data: XOR<room_participantsCreateInput, room_participantsUncheckedCreateInput>
  }

  /**
   * room_participants createMany
   */
  export type room_participantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_participants.
     */
    data: room_participantsCreateManyInput | room_participantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_participants createManyAndReturn
   */
  export type room_participantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * The data used to create many room_participants.
     */
    data: room_participantsCreateManyInput | room_participantsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_participants update
   */
  export type room_participantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * The data needed to update a room_participants.
     */
    data: XOR<room_participantsUpdateInput, room_participantsUncheckedUpdateInput>
    /**
     * Choose, which room_participants to update.
     */
    where: room_participantsWhereUniqueInput
  }

  /**
   * room_participants updateMany
   */
  export type room_participantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_participants.
     */
    data: XOR<room_participantsUpdateManyMutationInput, room_participantsUncheckedUpdateManyInput>
    /**
     * Filter which room_participants to update
     */
    where?: room_participantsWhereInput
    /**
     * Limit how many room_participants to update.
     */
    limit?: number
  }

  /**
   * room_participants updateManyAndReturn
   */
  export type room_participantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * The data used to update room_participants.
     */
    data: XOR<room_participantsUpdateManyMutationInput, room_participantsUncheckedUpdateManyInput>
    /**
     * Filter which room_participants to update
     */
    where?: room_participantsWhereInput
    /**
     * Limit how many room_participants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_participants upsert
   */
  export type room_participantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * The filter to search for the room_participants to update in case it exists.
     */
    where: room_participantsWhereUniqueInput
    /**
     * In case the room_participants found by the `where` argument doesn't exist, create a new room_participants with this data.
     */
    create: XOR<room_participantsCreateInput, room_participantsUncheckedCreateInput>
    /**
     * In case the room_participants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_participantsUpdateInput, room_participantsUncheckedUpdateInput>
  }

  /**
   * room_participants delete
   */
  export type room_participantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
    /**
     * Filter which room_participants to delete.
     */
    where: room_participantsWhereUniqueInput
  }

  /**
   * room_participants deleteMany
   */
  export type room_participantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_participants to delete
     */
    where?: room_participantsWhereInput
    /**
     * Limit how many room_participants to delete.
     */
    limit?: number
  }

  /**
   * room_participants without action
   */
  export type room_participantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_participants
     */
    select?: room_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_participants
     */
    omit?: room_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_participantsInclude<ExtArgs> | null
  }


  /**
   * Model watermarks
   */

  export type AggregateWatermarks = {
    _count: WatermarksCountAggregateOutputType | null
    _avg: WatermarksAvgAggregateOutputType | null
    _sum: WatermarksSumAggregateOutputType | null
    _min: WatermarksMinAggregateOutputType | null
    _max: WatermarksMaxAggregateOutputType | null
  }

  export type WatermarksAvgAggregateOutputType = {
    epoch_hi_inclusive: number | null
    checkpoint_hi_inclusive: number | null
    tx_hi: number | null
    timestamp_ms_hi_inclusive: number | null
    reader_lo: number | null
    pruner_hi: number | null
  }

  export type WatermarksSumAggregateOutputType = {
    epoch_hi_inclusive: bigint | null
    checkpoint_hi_inclusive: bigint | null
    tx_hi: bigint | null
    timestamp_ms_hi_inclusive: bigint | null
    reader_lo: bigint | null
    pruner_hi: bigint | null
  }

  export type WatermarksMinAggregateOutputType = {
    pipeline: string | null
    epoch_hi_inclusive: bigint | null
    checkpoint_hi_inclusive: bigint | null
    tx_hi: bigint | null
    timestamp_ms_hi_inclusive: bigint | null
    reader_lo: bigint | null
    pruner_timestamp: Date | null
    pruner_hi: bigint | null
  }

  export type WatermarksMaxAggregateOutputType = {
    pipeline: string | null
    epoch_hi_inclusive: bigint | null
    checkpoint_hi_inclusive: bigint | null
    tx_hi: bigint | null
    timestamp_ms_hi_inclusive: bigint | null
    reader_lo: bigint | null
    pruner_timestamp: Date | null
    pruner_hi: bigint | null
  }

  export type WatermarksCountAggregateOutputType = {
    pipeline: number
    epoch_hi_inclusive: number
    checkpoint_hi_inclusive: number
    tx_hi: number
    timestamp_ms_hi_inclusive: number
    reader_lo: number
    pruner_timestamp: number
    pruner_hi: number
    _all: number
  }


  export type WatermarksAvgAggregateInputType = {
    epoch_hi_inclusive?: true
    checkpoint_hi_inclusive?: true
    tx_hi?: true
    timestamp_ms_hi_inclusive?: true
    reader_lo?: true
    pruner_hi?: true
  }

  export type WatermarksSumAggregateInputType = {
    epoch_hi_inclusive?: true
    checkpoint_hi_inclusive?: true
    tx_hi?: true
    timestamp_ms_hi_inclusive?: true
    reader_lo?: true
    pruner_hi?: true
  }

  export type WatermarksMinAggregateInputType = {
    pipeline?: true
    epoch_hi_inclusive?: true
    checkpoint_hi_inclusive?: true
    tx_hi?: true
    timestamp_ms_hi_inclusive?: true
    reader_lo?: true
    pruner_timestamp?: true
    pruner_hi?: true
  }

  export type WatermarksMaxAggregateInputType = {
    pipeline?: true
    epoch_hi_inclusive?: true
    checkpoint_hi_inclusive?: true
    tx_hi?: true
    timestamp_ms_hi_inclusive?: true
    reader_lo?: true
    pruner_timestamp?: true
    pruner_hi?: true
  }

  export type WatermarksCountAggregateInputType = {
    pipeline?: true
    epoch_hi_inclusive?: true
    checkpoint_hi_inclusive?: true
    tx_hi?: true
    timestamp_ms_hi_inclusive?: true
    reader_lo?: true
    pruner_timestamp?: true
    pruner_hi?: true
    _all?: true
  }

  export type WatermarksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which watermarks to aggregate.
     */
    where?: watermarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of watermarks to fetch.
     */
    orderBy?: watermarksOrderByWithRelationInput | watermarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: watermarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` watermarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` watermarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned watermarks
    **/
    _count?: true | WatermarksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatermarksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatermarksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatermarksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatermarksMaxAggregateInputType
  }

  export type GetWatermarksAggregateType<T extends WatermarksAggregateArgs> = {
        [P in keyof T & keyof AggregateWatermarks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatermarks[P]>
      : GetScalarType<T[P], AggregateWatermarks[P]>
  }




  export type watermarksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: watermarksWhereInput
    orderBy?: watermarksOrderByWithAggregationInput | watermarksOrderByWithAggregationInput[]
    by: WatermarksScalarFieldEnum[] | WatermarksScalarFieldEnum
    having?: watermarksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatermarksCountAggregateInputType | true
    _avg?: WatermarksAvgAggregateInputType
    _sum?: WatermarksSumAggregateInputType
    _min?: WatermarksMinAggregateInputType
    _max?: WatermarksMaxAggregateInputType
  }

  export type WatermarksGroupByOutputType = {
    pipeline: string
    epoch_hi_inclusive: bigint
    checkpoint_hi_inclusive: bigint
    tx_hi: bigint
    timestamp_ms_hi_inclusive: bigint
    reader_lo: bigint
    pruner_timestamp: Date
    pruner_hi: bigint
    _count: WatermarksCountAggregateOutputType | null
    _avg: WatermarksAvgAggregateOutputType | null
    _sum: WatermarksSumAggregateOutputType | null
    _min: WatermarksMinAggregateOutputType | null
    _max: WatermarksMaxAggregateOutputType | null
  }

  type GetWatermarksGroupByPayload<T extends watermarksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatermarksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatermarksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatermarksGroupByOutputType[P]>
            : GetScalarType<T[P], WatermarksGroupByOutputType[P]>
        }
      >
    >


  export type watermarksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pipeline?: boolean
    epoch_hi_inclusive?: boolean
    checkpoint_hi_inclusive?: boolean
    tx_hi?: boolean
    timestamp_ms_hi_inclusive?: boolean
    reader_lo?: boolean
    pruner_timestamp?: boolean
    pruner_hi?: boolean
  }, ExtArgs["result"]["watermarks"]>

  export type watermarksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pipeline?: boolean
    epoch_hi_inclusive?: boolean
    checkpoint_hi_inclusive?: boolean
    tx_hi?: boolean
    timestamp_ms_hi_inclusive?: boolean
    reader_lo?: boolean
    pruner_timestamp?: boolean
    pruner_hi?: boolean
  }, ExtArgs["result"]["watermarks"]>

  export type watermarksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pipeline?: boolean
    epoch_hi_inclusive?: boolean
    checkpoint_hi_inclusive?: boolean
    tx_hi?: boolean
    timestamp_ms_hi_inclusive?: boolean
    reader_lo?: boolean
    pruner_timestamp?: boolean
    pruner_hi?: boolean
  }, ExtArgs["result"]["watermarks"]>

  export type watermarksSelectScalar = {
    pipeline?: boolean
    epoch_hi_inclusive?: boolean
    checkpoint_hi_inclusive?: boolean
    tx_hi?: boolean
    timestamp_ms_hi_inclusive?: boolean
    reader_lo?: boolean
    pruner_timestamp?: boolean
    pruner_hi?: boolean
  }

  export type watermarksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"pipeline" | "epoch_hi_inclusive" | "checkpoint_hi_inclusive" | "tx_hi" | "timestamp_ms_hi_inclusive" | "reader_lo" | "pruner_timestamp" | "pruner_hi", ExtArgs["result"]["watermarks"]>

  export type $watermarksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "watermarks"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      pipeline: string
      epoch_hi_inclusive: bigint
      checkpoint_hi_inclusive: bigint
      tx_hi: bigint
      timestamp_ms_hi_inclusive: bigint
      reader_lo: bigint
      pruner_timestamp: Date
      pruner_hi: bigint
    }, ExtArgs["result"]["watermarks"]>
    composites: {}
  }

  type watermarksGetPayload<S extends boolean | null | undefined | watermarksDefaultArgs> = $Result.GetResult<Prisma.$watermarksPayload, S>

  type watermarksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<watermarksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatermarksCountAggregateInputType | true
    }

  export interface watermarksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['watermarks'], meta: { name: 'watermarks' } }
    /**
     * Find zero or one Watermarks that matches the filter.
     * @param {watermarksFindUniqueArgs} args - Arguments to find a Watermarks
     * @example
     * // Get one Watermarks
     * const watermarks = await prisma.watermarks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends watermarksFindUniqueArgs>(args: SelectSubset<T, watermarksFindUniqueArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Watermarks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {watermarksFindUniqueOrThrowArgs} args - Arguments to find a Watermarks
     * @example
     * // Get one Watermarks
     * const watermarks = await prisma.watermarks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends watermarksFindUniqueOrThrowArgs>(args: SelectSubset<T, watermarksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watermarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {watermarksFindFirstArgs} args - Arguments to find a Watermarks
     * @example
     * // Get one Watermarks
     * const watermarks = await prisma.watermarks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends watermarksFindFirstArgs>(args?: SelectSubset<T, watermarksFindFirstArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watermarks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {watermarksFindFirstOrThrowArgs} args - Arguments to find a Watermarks
     * @example
     * // Get one Watermarks
     * const watermarks = await prisma.watermarks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends watermarksFindFirstOrThrowArgs>(args?: SelectSubset<T, watermarksFindFirstOrThrowArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Watermarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {watermarksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watermarks
     * const watermarks = await prisma.watermarks.findMany()
     * 
     * // Get first 10 Watermarks
     * const watermarks = await prisma.watermarks.findMany({ take: 10 })
     * 
     * // Only select the `pipeline`
     * const watermarksWithPipelineOnly = await prisma.watermarks.findMany({ select: { pipeline: true } })
     * 
     */
    findMany<T extends watermarksFindManyArgs>(args?: SelectSubset<T, watermarksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Watermarks.
     * @param {watermarksCreateArgs} args - Arguments to create a Watermarks.
     * @example
     * // Create one Watermarks
     * const Watermarks = await prisma.watermarks.create({
     *   data: {
     *     // ... data to create a Watermarks
     *   }
     * })
     * 
     */
    create<T extends watermarksCreateArgs>(args: SelectSubset<T, watermarksCreateArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Watermarks.
     * @param {watermarksCreateManyArgs} args - Arguments to create many Watermarks.
     * @example
     * // Create many Watermarks
     * const watermarks = await prisma.watermarks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends watermarksCreateManyArgs>(args?: SelectSubset<T, watermarksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Watermarks and returns the data saved in the database.
     * @param {watermarksCreateManyAndReturnArgs} args - Arguments to create many Watermarks.
     * @example
     * // Create many Watermarks
     * const watermarks = await prisma.watermarks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Watermarks and only return the `pipeline`
     * const watermarksWithPipelineOnly = await prisma.watermarks.createManyAndReturn({
     *   select: { pipeline: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends watermarksCreateManyAndReturnArgs>(args?: SelectSubset<T, watermarksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Watermarks.
     * @param {watermarksDeleteArgs} args - Arguments to delete one Watermarks.
     * @example
     * // Delete one Watermarks
     * const Watermarks = await prisma.watermarks.delete({
     *   where: {
     *     // ... filter to delete one Watermarks
     *   }
     * })
     * 
     */
    delete<T extends watermarksDeleteArgs>(args: SelectSubset<T, watermarksDeleteArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Watermarks.
     * @param {watermarksUpdateArgs} args - Arguments to update one Watermarks.
     * @example
     * // Update one Watermarks
     * const watermarks = await prisma.watermarks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends watermarksUpdateArgs>(args: SelectSubset<T, watermarksUpdateArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Watermarks.
     * @param {watermarksDeleteManyArgs} args - Arguments to filter Watermarks to delete.
     * @example
     * // Delete a few Watermarks
     * const { count } = await prisma.watermarks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends watermarksDeleteManyArgs>(args?: SelectSubset<T, watermarksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watermarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {watermarksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watermarks
     * const watermarks = await prisma.watermarks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends watermarksUpdateManyArgs>(args: SelectSubset<T, watermarksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watermarks and returns the data updated in the database.
     * @param {watermarksUpdateManyAndReturnArgs} args - Arguments to update many Watermarks.
     * @example
     * // Update many Watermarks
     * const watermarks = await prisma.watermarks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Watermarks and only return the `pipeline`
     * const watermarksWithPipelineOnly = await prisma.watermarks.updateManyAndReturn({
     *   select: { pipeline: true },
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
    updateManyAndReturn<T extends watermarksUpdateManyAndReturnArgs>(args: SelectSubset<T, watermarksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Watermarks.
     * @param {watermarksUpsertArgs} args - Arguments to update or create a Watermarks.
     * @example
     * // Update or create a Watermarks
     * const watermarks = await prisma.watermarks.upsert({
     *   create: {
     *     // ... data to create a Watermarks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watermarks we want to update
     *   }
     * })
     */
    upsert<T extends watermarksUpsertArgs>(args: SelectSubset<T, watermarksUpsertArgs<ExtArgs>>): Prisma__watermarksClient<$Result.GetResult<Prisma.$watermarksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Watermarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {watermarksCountArgs} args - Arguments to filter Watermarks to count.
     * @example
     * // Count the number of Watermarks
     * const count = await prisma.watermarks.count({
     *   where: {
     *     // ... the filter for the Watermarks we want to count
     *   }
     * })
    **/
    count<T extends watermarksCountArgs>(
      args?: Subset<T, watermarksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatermarksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Watermarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatermarksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WatermarksAggregateArgs>(args: Subset<T, WatermarksAggregateArgs>): Prisma.PrismaPromise<GetWatermarksAggregateType<T>>

    /**
     * Group by Watermarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {watermarksGroupByArgs} args - Group by arguments.
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
      T extends watermarksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: watermarksGroupByArgs['orderBy'] }
        : { orderBy?: watermarksGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, watermarksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatermarksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the watermarks model
   */
  readonly fields: watermarksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for watermarks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__watermarksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the watermarks model
   */
  interface watermarksFieldRefs {
    readonly pipeline: FieldRef<"watermarks", 'String'>
    readonly epoch_hi_inclusive: FieldRef<"watermarks", 'BigInt'>
    readonly checkpoint_hi_inclusive: FieldRef<"watermarks", 'BigInt'>
    readonly tx_hi: FieldRef<"watermarks", 'BigInt'>
    readonly timestamp_ms_hi_inclusive: FieldRef<"watermarks", 'BigInt'>
    readonly reader_lo: FieldRef<"watermarks", 'BigInt'>
    readonly pruner_timestamp: FieldRef<"watermarks", 'DateTime'>
    readonly pruner_hi: FieldRef<"watermarks", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * watermarks findUnique
   */
  export type watermarksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * Filter, which watermarks to fetch.
     */
    where: watermarksWhereUniqueInput
  }

  /**
   * watermarks findUniqueOrThrow
   */
  export type watermarksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * Filter, which watermarks to fetch.
     */
    where: watermarksWhereUniqueInput
  }

  /**
   * watermarks findFirst
   */
  export type watermarksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * Filter, which watermarks to fetch.
     */
    where?: watermarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of watermarks to fetch.
     */
    orderBy?: watermarksOrderByWithRelationInput | watermarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for watermarks.
     */
    cursor?: watermarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` watermarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` watermarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of watermarks.
     */
    distinct?: WatermarksScalarFieldEnum | WatermarksScalarFieldEnum[]
  }

  /**
   * watermarks findFirstOrThrow
   */
  export type watermarksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * Filter, which watermarks to fetch.
     */
    where?: watermarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of watermarks to fetch.
     */
    orderBy?: watermarksOrderByWithRelationInput | watermarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for watermarks.
     */
    cursor?: watermarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` watermarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` watermarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of watermarks.
     */
    distinct?: WatermarksScalarFieldEnum | WatermarksScalarFieldEnum[]
  }

  /**
   * watermarks findMany
   */
  export type watermarksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * Filter, which watermarks to fetch.
     */
    where?: watermarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of watermarks to fetch.
     */
    orderBy?: watermarksOrderByWithRelationInput | watermarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing watermarks.
     */
    cursor?: watermarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` watermarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` watermarks.
     */
    skip?: number
    distinct?: WatermarksScalarFieldEnum | WatermarksScalarFieldEnum[]
  }

  /**
   * watermarks create
   */
  export type watermarksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * The data needed to create a watermarks.
     */
    data: XOR<watermarksCreateInput, watermarksUncheckedCreateInput>
  }

  /**
   * watermarks createMany
   */
  export type watermarksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many watermarks.
     */
    data: watermarksCreateManyInput | watermarksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * watermarks createManyAndReturn
   */
  export type watermarksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * The data used to create many watermarks.
     */
    data: watermarksCreateManyInput | watermarksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * watermarks update
   */
  export type watermarksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * The data needed to update a watermarks.
     */
    data: XOR<watermarksUpdateInput, watermarksUncheckedUpdateInput>
    /**
     * Choose, which watermarks to update.
     */
    where: watermarksWhereUniqueInput
  }

  /**
   * watermarks updateMany
   */
  export type watermarksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update watermarks.
     */
    data: XOR<watermarksUpdateManyMutationInput, watermarksUncheckedUpdateManyInput>
    /**
     * Filter which watermarks to update
     */
    where?: watermarksWhereInput
    /**
     * Limit how many watermarks to update.
     */
    limit?: number
  }

  /**
   * watermarks updateManyAndReturn
   */
  export type watermarksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * The data used to update watermarks.
     */
    data: XOR<watermarksUpdateManyMutationInput, watermarksUncheckedUpdateManyInput>
    /**
     * Filter which watermarks to update
     */
    where?: watermarksWhereInput
    /**
     * Limit how many watermarks to update.
     */
    limit?: number
  }

  /**
   * watermarks upsert
   */
  export type watermarksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * The filter to search for the watermarks to update in case it exists.
     */
    where: watermarksWhereUniqueInput
    /**
     * In case the watermarks found by the `where` argument doesn't exist, create a new watermarks with this data.
     */
    create: XOR<watermarksCreateInput, watermarksUncheckedCreateInput>
    /**
     * In case the watermarks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<watermarksUpdateInput, watermarksUncheckedUpdateInput>
  }

  /**
   * watermarks delete
   */
  export type watermarksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
    /**
     * Filter which watermarks to delete.
     */
    where: watermarksWhereUniqueInput
  }

  /**
   * watermarks deleteMany
   */
  export type watermarksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which watermarks to delete
     */
    where?: watermarksWhereInput
    /**
     * Limit how many watermarks to delete.
     */
    limit?: number
  }

  /**
   * watermarks without action
   */
  export type watermarksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the watermarks
     */
    select?: watermarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the watermarks
     */
    omit?: watermarksOmit<ExtArgs> | null
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


  export const ApprovalRequestScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    requester_address: 'requester_address',
    status: 'status',
    created_at: 'created_at',
    resolved_at: 'resolved_at',
    resolver_address: 'resolver_address'
  };

  export type ApprovalRequestScalarFieldEnum = (typeof ApprovalRequestScalarFieldEnum)[keyof typeof ApprovalRequestScalarFieldEnum]


  export const AuthNonceScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    nonce: 'nonce',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
  };

  export type AuthNonceScalarFieldEnum = (typeof AuthNonceScalarFieldEnum)[keyof typeof AuthNonceScalarFieldEnum]


  export const DelegatedSignatureScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    action: 'action',
    roomId: 'roomId',
    txDigest: 'txDigest',
    signature: 'signature',
    createdAt: 'createdAt'
  };

  export type DelegatedSignatureScalarFieldEnum = (typeof DelegatedSignatureScalarFieldEnum)[keyof typeof DelegatedSignatureScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    rotationCounter: 'rotationCounter',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    walletId: 'walletId',
    jwtId: 'jwtId',
    status: 'status',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    lastUsedAt: 'lastUsedAt',
    encryptedPrivateKey: 'encryptedPrivateKey'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    primaryWalletAddress: 'primaryWalletAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    address: 'address',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const Diesel_schema_migrationsScalarFieldEnum: {
    version: 'version',
    run_on: 'run_on'
  };

  export type Diesel_schema_migrationsScalarFieldEnum = (typeof Diesel_schema_migrationsScalarFieldEnum)[keyof typeof Diesel_schema_migrationsScalarFieldEnum]


  export const Meeting_roomsScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    title: 'title',
    hosts: 'hosts',
    seal_policy_id: 'seal_policy_id',
    status: 'status',
    max_participants: 'max_participants',
    require_approval: 'require_approval',
    participant_count: 'participant_count',
    created_at: 'created_at',
    started_at: 'started_at',
    ended_at: 'ended_at',
    checkpoint_sequence_number: 'checkpoint_sequence_number',
    transaction_digest: 'transaction_digest',
    indexed_at: 'indexed_at',
    updated_at: 'updated_at'
  };

  export type Meeting_roomsScalarFieldEnum = (typeof Meeting_roomsScalarFieldEnum)[keyof typeof Meeting_roomsScalarFieldEnum]


  export const Room_metadataScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    dynamic_field_id: 'dynamic_field_id',
    df_version: 'df_version',
    language: 'language',
    timezone: 'timezone',
    recording_blob_id: 'recording_blob_id',
    indexed_at: 'indexed_at',
    updated_at: 'updated_at'
  };

  export type Room_metadataScalarFieldEnum = (typeof Room_metadataScalarFieldEnum)[keyof typeof Room_metadataScalarFieldEnum]


  export const Room_participantsScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    participant_address: 'participant_address',
    role: 'role',
    admin_cap_id: 'admin_cap_id',
    joined_at: 'joined_at',
    updated_at: 'updated_at'
  };

  export type Room_participantsScalarFieldEnum = (typeof Room_participantsScalarFieldEnum)[keyof typeof Room_participantsScalarFieldEnum]


  export const WatermarksScalarFieldEnum: {
    pipeline: 'pipeline',
    epoch_hi_inclusive: 'epoch_hi_inclusive',
    checkpoint_hi_inclusive: 'checkpoint_hi_inclusive',
    tx_hi: 'tx_hi',
    timestamp_ms_hi_inclusive: 'timestamp_ms_hi_inclusive',
    reader_lo: 'reader_lo',
    pruner_timestamp: 'pruner_timestamp',
    pruner_hi: 'pruner_hi'
  };

  export type WatermarksScalarFieldEnum = (typeof WatermarksScalarFieldEnum)[keyof typeof WatermarksScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


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


  export type ApprovalRequestWhereInput = {
    AND?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    OR?: ApprovalRequestWhereInput[]
    NOT?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    id?: StringFilter<"ApprovalRequest"> | string
    room_id?: StringFilter<"ApprovalRequest"> | string
    requester_address?: StringFilter<"ApprovalRequest"> | string
    status?: StringFilter<"ApprovalRequest"> | string
    created_at?: DateTimeFilter<"ApprovalRequest"> | Date | string
    resolved_at?: DateTimeNullableFilter<"ApprovalRequest"> | Date | string | null
    resolver_address?: StringNullableFilter<"ApprovalRequest"> | string | null
    meeting_rooms?: XOR<Meeting_roomsScalarRelationFilter, meeting_roomsWhereInput>
  }

  export type ApprovalRequestOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    requester_address?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrderInput | SortOrder
    resolver_address?: SortOrderInput | SortOrder
    meeting_rooms?: meeting_roomsOrderByWithRelationInput
  }

  export type ApprovalRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    OR?: ApprovalRequestWhereInput[]
    NOT?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    room_id?: StringFilter<"ApprovalRequest"> | string
    requester_address?: StringFilter<"ApprovalRequest"> | string
    status?: StringFilter<"ApprovalRequest"> | string
    created_at?: DateTimeFilter<"ApprovalRequest"> | Date | string
    resolved_at?: DateTimeNullableFilter<"ApprovalRequest"> | Date | string | null
    resolver_address?: StringNullableFilter<"ApprovalRequest"> | string | null
    meeting_rooms?: XOR<Meeting_roomsScalarRelationFilter, meeting_roomsWhereInput>
  }, "id">

  export type ApprovalRequestOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    requester_address?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrderInput | SortOrder
    resolver_address?: SortOrderInput | SortOrder
    _count?: ApprovalRequestCountOrderByAggregateInput
    _max?: ApprovalRequestMaxOrderByAggregateInput
    _min?: ApprovalRequestMinOrderByAggregateInput
  }

  export type ApprovalRequestScalarWhereWithAggregatesInput = {
    AND?: ApprovalRequestScalarWhereWithAggregatesInput | ApprovalRequestScalarWhereWithAggregatesInput[]
    OR?: ApprovalRequestScalarWhereWithAggregatesInput[]
    NOT?: ApprovalRequestScalarWhereWithAggregatesInput | ApprovalRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    room_id?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    requester_address?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    status?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    created_at?: DateTimeWithAggregatesFilter<"ApprovalRequest"> | Date | string
    resolved_at?: DateTimeNullableWithAggregatesFilter<"ApprovalRequest"> | Date | string | null
    resolver_address?: StringNullableWithAggregatesFilter<"ApprovalRequest"> | string | null
  }

  export type AuthNonceWhereInput = {
    AND?: AuthNonceWhereInput | AuthNonceWhereInput[]
    OR?: AuthNonceWhereInput[]
    NOT?: AuthNonceWhereInput | AuthNonceWhereInput[]
    id?: StringFilter<"AuthNonce"> | string
    walletAddress?: StringFilter<"AuthNonce"> | string
    nonce?: StringFilter<"AuthNonce"> | string
    expiresAt?: DateTimeFilter<"AuthNonce"> | Date | string
    consumedAt?: DateTimeNullableFilter<"AuthNonce"> | Date | string | null
    createdAt?: DateTimeFilter<"AuthNonce"> | Date | string
  }

  export type AuthNonceOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuthNonceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuthNonceWhereInput | AuthNonceWhereInput[]
    OR?: AuthNonceWhereInput[]
    NOT?: AuthNonceWhereInput | AuthNonceWhereInput[]
    walletAddress?: StringFilter<"AuthNonce"> | string
    nonce?: StringFilter<"AuthNonce"> | string
    expiresAt?: DateTimeFilter<"AuthNonce"> | Date | string
    consumedAt?: DateTimeNullableFilter<"AuthNonce"> | Date | string | null
    createdAt?: DateTimeFilter<"AuthNonce"> | Date | string
  }, "id">

  export type AuthNonceOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuthNonceCountOrderByAggregateInput
    _max?: AuthNonceMaxOrderByAggregateInput
    _min?: AuthNonceMinOrderByAggregateInput
  }

  export type AuthNonceScalarWhereWithAggregatesInput = {
    AND?: AuthNonceScalarWhereWithAggregatesInput | AuthNonceScalarWhereWithAggregatesInput[]
    OR?: AuthNonceScalarWhereWithAggregatesInput[]
    NOT?: AuthNonceScalarWhereWithAggregatesInput | AuthNonceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthNonce"> | string
    walletAddress?: StringWithAggregatesFilter<"AuthNonce"> | string
    nonce?: StringWithAggregatesFilter<"AuthNonce"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"AuthNonce"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"AuthNonce"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthNonce"> | Date | string
  }

  export type DelegatedSignatureWhereInput = {
    AND?: DelegatedSignatureWhereInput | DelegatedSignatureWhereInput[]
    OR?: DelegatedSignatureWhereInput[]
    NOT?: DelegatedSignatureWhereInput | DelegatedSignatureWhereInput[]
    id?: StringFilter<"DelegatedSignature"> | string
    sessionId?: StringFilter<"DelegatedSignature"> | string
    action?: StringFilter<"DelegatedSignature"> | string
    roomId?: StringNullableFilter<"DelegatedSignature"> | string | null
    txDigest?: StringNullableFilter<"DelegatedSignature"> | string | null
    signature?: StringFilter<"DelegatedSignature"> | string
    createdAt?: DateTimeFilter<"DelegatedSignature"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type DelegatedSignatureOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    action?: SortOrder
    roomId?: SortOrderInput | SortOrder
    txDigest?: SortOrderInput | SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type DelegatedSignatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DelegatedSignatureWhereInput | DelegatedSignatureWhereInput[]
    OR?: DelegatedSignatureWhereInput[]
    NOT?: DelegatedSignatureWhereInput | DelegatedSignatureWhereInput[]
    sessionId?: StringFilter<"DelegatedSignature"> | string
    action?: StringFilter<"DelegatedSignature"> | string
    roomId?: StringNullableFilter<"DelegatedSignature"> | string | null
    txDigest?: StringNullableFilter<"DelegatedSignature"> | string | null
    signature?: StringFilter<"DelegatedSignature"> | string
    createdAt?: DateTimeFilter<"DelegatedSignature"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id">

  export type DelegatedSignatureOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    action?: SortOrder
    roomId?: SortOrderInput | SortOrder
    txDigest?: SortOrderInput | SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    _count?: DelegatedSignatureCountOrderByAggregateInput
    _max?: DelegatedSignatureMaxOrderByAggregateInput
    _min?: DelegatedSignatureMinOrderByAggregateInput
  }

  export type DelegatedSignatureScalarWhereWithAggregatesInput = {
    AND?: DelegatedSignatureScalarWhereWithAggregatesInput | DelegatedSignatureScalarWhereWithAggregatesInput[]
    OR?: DelegatedSignatureScalarWhereWithAggregatesInput[]
    NOT?: DelegatedSignatureScalarWhereWithAggregatesInput | DelegatedSignatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DelegatedSignature"> | string
    sessionId?: StringWithAggregatesFilter<"DelegatedSignature"> | string
    action?: StringWithAggregatesFilter<"DelegatedSignature"> | string
    roomId?: StringNullableWithAggregatesFilter<"DelegatedSignature"> | string | null
    txDigest?: StringNullableWithAggregatesFilter<"DelegatedSignature"> | string | null
    signature?: StringWithAggregatesFilter<"DelegatedSignature"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DelegatedSignature"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    sessionId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    rotationCounter?: IntFilter<"RefreshToken"> | number
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    Session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    rotationCounter?: SortOrder
    createdAt?: SortOrder
    Session?: SessionOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    rotationCounter?: IntFilter<"RefreshToken"> | number
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    Session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id" | "sessionId">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    rotationCounter?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _avg?: RefreshTokenAvgOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
    _sum?: RefreshTokenSumOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    sessionId?: StringWithAggregatesFilter<"RefreshToken"> | string
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    rotationCounter?: IntWithAggregatesFilter<"RefreshToken"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    walletId?: StringFilter<"Session"> | string
    jwtId?: StringFilter<"Session"> | string
    status?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    lastUsedAt?: DateTimeFilter<"Session"> | Date | string
    encryptedPrivateKey?: StringNullableFilter<"Session"> | string | null
    DelegatedSignature?: DelegatedSignatureListRelationFilter
    RefreshToken?: XOR<RefreshTokenNullableScalarRelationFilter, RefreshTokenWhereInput> | null
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    jwtId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    encryptedPrivateKey?: SortOrderInput | SortOrder
    DelegatedSignature?: DelegatedSignatureOrderByRelationAggregateInput
    RefreshToken?: RefreshTokenOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
    Wallet?: WalletOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    walletId?: StringFilter<"Session"> | string
    jwtId?: StringFilter<"Session"> | string
    status?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    lastUsedAt?: DateTimeFilter<"Session"> | Date | string
    encryptedPrivateKey?: StringNullableFilter<"Session"> | string | null
    DelegatedSignature?: DelegatedSignatureListRelationFilter
    RefreshToken?: XOR<RefreshTokenNullableScalarRelationFilter, RefreshTokenWhereInput> | null
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    jwtId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    encryptedPrivateKey?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    walletId?: StringWithAggregatesFilter<"Session"> | string
    jwtId?: StringWithAggregatesFilter<"Session"> | string
    status?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    lastUsedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    encryptedPrivateKey?: StringNullableWithAggregatesFilter<"Session"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    primaryWalletAddress?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Session?: SessionListRelationFilter
    Wallet?: WalletListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    primaryWalletAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Session?: SessionOrderByRelationAggregateInput
    Wallet?: WalletOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    primaryWalletAddress?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Session?: SessionListRelationFilter
    Wallet?: WalletListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    primaryWalletAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    primaryWalletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    type?: StringFilter<"Wallet"> | string
    status?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    Session?: SessionListRelationFilter
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Session?: SessionOrderByRelationAggregateInput
    User?: UserOrderByWithRelationInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    userId?: StringFilter<"Wallet"> | string
    type?: StringFilter<"Wallet"> | string
    status?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    Session?: SessionListRelationFilter
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "address">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    address?: StringWithAggregatesFilter<"Wallet"> | string
    type?: StringWithAggregatesFilter<"Wallet"> | string
    status?: StringWithAggregatesFilter<"Wallet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type diesel_schema_migrationsWhereInput = {
    AND?: diesel_schema_migrationsWhereInput | diesel_schema_migrationsWhereInput[]
    OR?: diesel_schema_migrationsWhereInput[]
    NOT?: diesel_schema_migrationsWhereInput | diesel_schema_migrationsWhereInput[]
    version?: StringFilter<"diesel_schema_migrations"> | string
    run_on?: DateTimeFilter<"diesel_schema_migrations"> | Date | string
  }

  export type diesel_schema_migrationsOrderByWithRelationInput = {
    version?: SortOrder
    run_on?: SortOrder
  }

  export type diesel_schema_migrationsWhereUniqueInput = Prisma.AtLeast<{
    version?: string
    AND?: diesel_schema_migrationsWhereInput | diesel_schema_migrationsWhereInput[]
    OR?: diesel_schema_migrationsWhereInput[]
    NOT?: diesel_schema_migrationsWhereInput | diesel_schema_migrationsWhereInput[]
    run_on?: DateTimeFilter<"diesel_schema_migrations"> | Date | string
  }, "version">

  export type diesel_schema_migrationsOrderByWithAggregationInput = {
    version?: SortOrder
    run_on?: SortOrder
    _count?: diesel_schema_migrationsCountOrderByAggregateInput
    _max?: diesel_schema_migrationsMaxOrderByAggregateInput
    _min?: diesel_schema_migrationsMinOrderByAggregateInput
  }

  export type diesel_schema_migrationsScalarWhereWithAggregatesInput = {
    AND?: diesel_schema_migrationsScalarWhereWithAggregatesInput | diesel_schema_migrationsScalarWhereWithAggregatesInput[]
    OR?: diesel_schema_migrationsScalarWhereWithAggregatesInput[]
    NOT?: diesel_schema_migrationsScalarWhereWithAggregatesInput | diesel_schema_migrationsScalarWhereWithAggregatesInput[]
    version?: StringWithAggregatesFilter<"diesel_schema_migrations"> | string
    run_on?: DateTimeWithAggregatesFilter<"diesel_schema_migrations"> | Date | string
  }

  export type meeting_roomsWhereInput = {
    AND?: meeting_roomsWhereInput | meeting_roomsWhereInput[]
    OR?: meeting_roomsWhereInput[]
    NOT?: meeting_roomsWhereInput | meeting_roomsWhereInput[]
    id?: BigIntFilter<"meeting_rooms"> | bigint | number
    room_id?: StringFilter<"meeting_rooms"> | string
    title?: StringFilter<"meeting_rooms"> | string
    hosts?: StringNullableListFilter<"meeting_rooms">
    seal_policy_id?: StringFilter<"meeting_rooms"> | string
    status?: IntFilter<"meeting_rooms"> | number
    max_participants?: BigIntFilter<"meeting_rooms"> | bigint | number
    require_approval?: BoolFilter<"meeting_rooms"> | boolean
    participant_count?: IntFilter<"meeting_rooms"> | number
    created_at?: BigIntFilter<"meeting_rooms"> | bigint | number
    started_at?: BigIntNullableFilter<"meeting_rooms"> | bigint | number | null
    ended_at?: BigIntNullableFilter<"meeting_rooms"> | bigint | number | null
    checkpoint_sequence_number?: BigIntFilter<"meeting_rooms"> | bigint | number
    transaction_digest?: StringFilter<"meeting_rooms"> | string
    indexed_at?: DateTimeFilter<"meeting_rooms"> | Date | string
    updated_at?: DateTimeFilter<"meeting_rooms"> | Date | string
    ApprovalRequest?: ApprovalRequestListRelationFilter
    room_metadata?: XOR<Room_metadataNullableScalarRelationFilter, room_metadataWhereInput> | null
    room_participants?: Room_participantsListRelationFilter
  }

  export type meeting_roomsOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    title?: SortOrder
    hosts?: SortOrder
    seal_policy_id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    require_approval?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrderInput | SortOrder
    ended_at?: SortOrderInput | SortOrder
    checkpoint_sequence_number?: SortOrder
    transaction_digest?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
    ApprovalRequest?: ApprovalRequestOrderByRelationAggregateInput
    room_metadata?: room_metadataOrderByWithRelationInput
    room_participants?: room_participantsOrderByRelationAggregateInput
  }

  export type meeting_roomsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    room_id?: string
    seal_policy_id?: string
    AND?: meeting_roomsWhereInput | meeting_roomsWhereInput[]
    OR?: meeting_roomsWhereInput[]
    NOT?: meeting_roomsWhereInput | meeting_roomsWhereInput[]
    title?: StringFilter<"meeting_rooms"> | string
    hosts?: StringNullableListFilter<"meeting_rooms">
    status?: IntFilter<"meeting_rooms"> | number
    max_participants?: BigIntFilter<"meeting_rooms"> | bigint | number
    require_approval?: BoolFilter<"meeting_rooms"> | boolean
    participant_count?: IntFilter<"meeting_rooms"> | number
    created_at?: BigIntFilter<"meeting_rooms"> | bigint | number
    started_at?: BigIntNullableFilter<"meeting_rooms"> | bigint | number | null
    ended_at?: BigIntNullableFilter<"meeting_rooms"> | bigint | number | null
    checkpoint_sequence_number?: BigIntFilter<"meeting_rooms"> | bigint | number
    transaction_digest?: StringFilter<"meeting_rooms"> | string
    indexed_at?: DateTimeFilter<"meeting_rooms"> | Date | string
    updated_at?: DateTimeFilter<"meeting_rooms"> | Date | string
    ApprovalRequest?: ApprovalRequestListRelationFilter
    room_metadata?: XOR<Room_metadataNullableScalarRelationFilter, room_metadataWhereInput> | null
    room_participants?: Room_participantsListRelationFilter
  }, "id" | "room_id" | "seal_policy_id">

  export type meeting_roomsOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    title?: SortOrder
    hosts?: SortOrder
    seal_policy_id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    require_approval?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrderInput | SortOrder
    ended_at?: SortOrderInput | SortOrder
    checkpoint_sequence_number?: SortOrder
    transaction_digest?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
    _count?: meeting_roomsCountOrderByAggregateInput
    _avg?: meeting_roomsAvgOrderByAggregateInput
    _max?: meeting_roomsMaxOrderByAggregateInput
    _min?: meeting_roomsMinOrderByAggregateInput
    _sum?: meeting_roomsSumOrderByAggregateInput
  }

  export type meeting_roomsScalarWhereWithAggregatesInput = {
    AND?: meeting_roomsScalarWhereWithAggregatesInput | meeting_roomsScalarWhereWithAggregatesInput[]
    OR?: meeting_roomsScalarWhereWithAggregatesInput[]
    NOT?: meeting_roomsScalarWhereWithAggregatesInput | meeting_roomsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"meeting_rooms"> | bigint | number
    room_id?: StringWithAggregatesFilter<"meeting_rooms"> | string
    title?: StringWithAggregatesFilter<"meeting_rooms"> | string
    hosts?: StringNullableListFilter<"meeting_rooms">
    seal_policy_id?: StringWithAggregatesFilter<"meeting_rooms"> | string
    status?: IntWithAggregatesFilter<"meeting_rooms"> | number
    max_participants?: BigIntWithAggregatesFilter<"meeting_rooms"> | bigint | number
    require_approval?: BoolWithAggregatesFilter<"meeting_rooms"> | boolean
    participant_count?: IntWithAggregatesFilter<"meeting_rooms"> | number
    created_at?: BigIntWithAggregatesFilter<"meeting_rooms"> | bigint | number
    started_at?: BigIntNullableWithAggregatesFilter<"meeting_rooms"> | bigint | number | null
    ended_at?: BigIntNullableWithAggregatesFilter<"meeting_rooms"> | bigint | number | null
    checkpoint_sequence_number?: BigIntWithAggregatesFilter<"meeting_rooms"> | bigint | number
    transaction_digest?: StringWithAggregatesFilter<"meeting_rooms"> | string
    indexed_at?: DateTimeWithAggregatesFilter<"meeting_rooms"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"meeting_rooms"> | Date | string
  }

  export type room_metadataWhereInput = {
    AND?: room_metadataWhereInput | room_metadataWhereInput[]
    OR?: room_metadataWhereInput[]
    NOT?: room_metadataWhereInput | room_metadataWhereInput[]
    id?: BigIntFilter<"room_metadata"> | bigint | number
    room_id?: StringFilter<"room_metadata"> | string
    dynamic_field_id?: StringFilter<"room_metadata"> | string
    df_version?: BigIntFilter<"room_metadata"> | bigint | number
    language?: StringFilter<"room_metadata"> | string
    timezone?: StringFilter<"room_metadata"> | string
    recording_blob_id?: DecimalNullableFilter<"room_metadata"> | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFilter<"room_metadata"> | Date | string
    updated_at?: DateTimeFilter<"room_metadata"> | Date | string
    meeting_rooms?: XOR<Meeting_roomsScalarRelationFilter, meeting_roomsWhereInput>
  }

  export type room_metadataOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    dynamic_field_id?: SortOrder
    df_version?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    recording_blob_id?: SortOrderInput | SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
    meeting_rooms?: meeting_roomsOrderByWithRelationInput
  }

  export type room_metadataWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    room_id?: string
    dynamic_field_id?: string
    AND?: room_metadataWhereInput | room_metadataWhereInput[]
    OR?: room_metadataWhereInput[]
    NOT?: room_metadataWhereInput | room_metadataWhereInput[]
    df_version?: BigIntFilter<"room_metadata"> | bigint | number
    language?: StringFilter<"room_metadata"> | string
    timezone?: StringFilter<"room_metadata"> | string
    recording_blob_id?: DecimalNullableFilter<"room_metadata"> | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFilter<"room_metadata"> | Date | string
    updated_at?: DateTimeFilter<"room_metadata"> | Date | string
    meeting_rooms?: XOR<Meeting_roomsScalarRelationFilter, meeting_roomsWhereInput>
  }, "id" | "room_id" | "dynamic_field_id">

  export type room_metadataOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    dynamic_field_id?: SortOrder
    df_version?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    recording_blob_id?: SortOrderInput | SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
    _count?: room_metadataCountOrderByAggregateInput
    _avg?: room_metadataAvgOrderByAggregateInput
    _max?: room_metadataMaxOrderByAggregateInput
    _min?: room_metadataMinOrderByAggregateInput
    _sum?: room_metadataSumOrderByAggregateInput
  }

  export type room_metadataScalarWhereWithAggregatesInput = {
    AND?: room_metadataScalarWhereWithAggregatesInput | room_metadataScalarWhereWithAggregatesInput[]
    OR?: room_metadataScalarWhereWithAggregatesInput[]
    NOT?: room_metadataScalarWhereWithAggregatesInput | room_metadataScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"room_metadata"> | bigint | number
    room_id?: StringWithAggregatesFilter<"room_metadata"> | string
    dynamic_field_id?: StringWithAggregatesFilter<"room_metadata"> | string
    df_version?: BigIntWithAggregatesFilter<"room_metadata"> | bigint | number
    language?: StringWithAggregatesFilter<"room_metadata"> | string
    timezone?: StringWithAggregatesFilter<"room_metadata"> | string
    recording_blob_id?: DecimalNullableWithAggregatesFilter<"room_metadata"> | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeWithAggregatesFilter<"room_metadata"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"room_metadata"> | Date | string
  }

  export type room_participantsWhereInput = {
    AND?: room_participantsWhereInput | room_participantsWhereInput[]
    OR?: room_participantsWhereInput[]
    NOT?: room_participantsWhereInput | room_participantsWhereInput[]
    id?: BigIntFilter<"room_participants"> | bigint | number
    room_id?: StringFilter<"room_participants"> | string
    participant_address?: StringFilter<"room_participants"> | string
    role?: StringFilter<"room_participants"> | string
    admin_cap_id?: StringNullableFilter<"room_participants"> | string | null
    joined_at?: DateTimeFilter<"room_participants"> | Date | string
    updated_at?: DateTimeFilter<"room_participants"> | Date | string
    meeting_rooms?: XOR<Meeting_roomsScalarRelationFilter, meeting_roomsWhereInput>
  }

  export type room_participantsOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_address?: SortOrder
    role?: SortOrder
    admin_cap_id?: SortOrderInput | SortOrder
    joined_at?: SortOrder
    updated_at?: SortOrder
    meeting_rooms?: meeting_roomsOrderByWithRelationInput
  }

  export type room_participantsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    room_id_participant_address?: room_participantsRoom_idParticipant_addressCompoundUniqueInput
    AND?: room_participantsWhereInput | room_participantsWhereInput[]
    OR?: room_participantsWhereInput[]
    NOT?: room_participantsWhereInput | room_participantsWhereInput[]
    room_id?: StringFilter<"room_participants"> | string
    participant_address?: StringFilter<"room_participants"> | string
    role?: StringFilter<"room_participants"> | string
    admin_cap_id?: StringNullableFilter<"room_participants"> | string | null
    joined_at?: DateTimeFilter<"room_participants"> | Date | string
    updated_at?: DateTimeFilter<"room_participants"> | Date | string
    meeting_rooms?: XOR<Meeting_roomsScalarRelationFilter, meeting_roomsWhereInput>
  }, "id" | "room_id_participant_address">

  export type room_participantsOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_address?: SortOrder
    role?: SortOrder
    admin_cap_id?: SortOrderInput | SortOrder
    joined_at?: SortOrder
    updated_at?: SortOrder
    _count?: room_participantsCountOrderByAggregateInput
    _avg?: room_participantsAvgOrderByAggregateInput
    _max?: room_participantsMaxOrderByAggregateInput
    _min?: room_participantsMinOrderByAggregateInput
    _sum?: room_participantsSumOrderByAggregateInput
  }

  export type room_participantsScalarWhereWithAggregatesInput = {
    AND?: room_participantsScalarWhereWithAggregatesInput | room_participantsScalarWhereWithAggregatesInput[]
    OR?: room_participantsScalarWhereWithAggregatesInput[]
    NOT?: room_participantsScalarWhereWithAggregatesInput | room_participantsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"room_participants"> | bigint | number
    room_id?: StringWithAggregatesFilter<"room_participants"> | string
    participant_address?: StringWithAggregatesFilter<"room_participants"> | string
    role?: StringWithAggregatesFilter<"room_participants"> | string
    admin_cap_id?: StringNullableWithAggregatesFilter<"room_participants"> | string | null
    joined_at?: DateTimeWithAggregatesFilter<"room_participants"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"room_participants"> | Date | string
  }

  export type watermarksWhereInput = {
    AND?: watermarksWhereInput | watermarksWhereInput[]
    OR?: watermarksWhereInput[]
    NOT?: watermarksWhereInput | watermarksWhereInput[]
    pipeline?: StringFilter<"watermarks"> | string
    epoch_hi_inclusive?: BigIntFilter<"watermarks"> | bigint | number
    checkpoint_hi_inclusive?: BigIntFilter<"watermarks"> | bigint | number
    tx_hi?: BigIntFilter<"watermarks"> | bigint | number
    timestamp_ms_hi_inclusive?: BigIntFilter<"watermarks"> | bigint | number
    reader_lo?: BigIntFilter<"watermarks"> | bigint | number
    pruner_timestamp?: DateTimeFilter<"watermarks"> | Date | string
    pruner_hi?: BigIntFilter<"watermarks"> | bigint | number
  }

  export type watermarksOrderByWithRelationInput = {
    pipeline?: SortOrder
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_timestamp?: SortOrder
    pruner_hi?: SortOrder
  }

  export type watermarksWhereUniqueInput = Prisma.AtLeast<{
    pipeline?: string
    AND?: watermarksWhereInput | watermarksWhereInput[]
    OR?: watermarksWhereInput[]
    NOT?: watermarksWhereInput | watermarksWhereInput[]
    epoch_hi_inclusive?: BigIntFilter<"watermarks"> | bigint | number
    checkpoint_hi_inclusive?: BigIntFilter<"watermarks"> | bigint | number
    tx_hi?: BigIntFilter<"watermarks"> | bigint | number
    timestamp_ms_hi_inclusive?: BigIntFilter<"watermarks"> | bigint | number
    reader_lo?: BigIntFilter<"watermarks"> | bigint | number
    pruner_timestamp?: DateTimeFilter<"watermarks"> | Date | string
    pruner_hi?: BigIntFilter<"watermarks"> | bigint | number
  }, "pipeline">

  export type watermarksOrderByWithAggregationInput = {
    pipeline?: SortOrder
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_timestamp?: SortOrder
    pruner_hi?: SortOrder
    _count?: watermarksCountOrderByAggregateInput
    _avg?: watermarksAvgOrderByAggregateInput
    _max?: watermarksMaxOrderByAggregateInput
    _min?: watermarksMinOrderByAggregateInput
    _sum?: watermarksSumOrderByAggregateInput
  }

  export type watermarksScalarWhereWithAggregatesInput = {
    AND?: watermarksScalarWhereWithAggregatesInput | watermarksScalarWhereWithAggregatesInput[]
    OR?: watermarksScalarWhereWithAggregatesInput[]
    NOT?: watermarksScalarWhereWithAggregatesInput | watermarksScalarWhereWithAggregatesInput[]
    pipeline?: StringWithAggregatesFilter<"watermarks"> | string
    epoch_hi_inclusive?: BigIntWithAggregatesFilter<"watermarks"> | bigint | number
    checkpoint_hi_inclusive?: BigIntWithAggregatesFilter<"watermarks"> | bigint | number
    tx_hi?: BigIntWithAggregatesFilter<"watermarks"> | bigint | number
    timestamp_ms_hi_inclusive?: BigIntWithAggregatesFilter<"watermarks"> | bigint | number
    reader_lo?: BigIntWithAggregatesFilter<"watermarks"> | bigint | number
    pruner_timestamp?: DateTimeWithAggregatesFilter<"watermarks"> | Date | string
    pruner_hi?: BigIntWithAggregatesFilter<"watermarks"> | bigint | number
  }

  export type ApprovalRequestCreateInput = {
    id?: string
    requester_address: string
    status?: string
    created_at?: Date | string
    resolved_at?: Date | string | null
    resolver_address?: string | null
    meeting_rooms: meeting_roomsCreateNestedOneWithoutApprovalRequestInput
  }

  export type ApprovalRequestUncheckedCreateInput = {
    id?: string
    room_id: string
    requester_address: string
    status?: string
    created_at?: Date | string
    resolved_at?: Date | string | null
    resolver_address?: string | null
  }

  export type ApprovalRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
    meeting_rooms?: meeting_roomsUpdateOneRequiredWithoutApprovalRequestNestedInput
  }

  export type ApprovalRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalRequestCreateManyInput = {
    id?: string
    room_id: string
    requester_address: string
    status?: string
    created_at?: Date | string
    resolved_at?: Date | string | null
    resolver_address?: string | null
  }

  export type ApprovalRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthNonceCreateInput = {
    id?: string
    walletAddress: string
    nonce: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthNonceUncheckedCreateInput = {
    id?: string
    walletAddress: string
    nonce: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthNonceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthNonceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthNonceCreateManyInput = {
    id?: string
    walletAddress: string
    nonce: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthNonceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthNonceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegatedSignatureCreateInput = {
    id?: string
    action: string
    roomId?: string | null
    txDigest?: string | null
    signature: string
    createdAt?: Date | string
    session: SessionCreateNestedOneWithoutDelegatedSignatureInput
  }

  export type DelegatedSignatureUncheckedCreateInput = {
    id?: string
    sessionId: string
    action: string
    roomId?: string | null
    txDigest?: string | null
    signature: string
    createdAt?: Date | string
  }

  export type DelegatedSignatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutDelegatedSignatureNestedInput
  }

  export type DelegatedSignatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegatedSignatureCreateManyInput = {
    id?: string
    sessionId: string
    action: string
    roomId?: string | null
    txDigest?: string | null
    signature: string
    createdAt?: Date | string
  }

  export type DelegatedSignatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegatedSignatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    rotationCounter?: number
    createdAt?: Date | string
    Session: SessionCreateNestedOneWithoutRefreshTokenInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    sessionId: string
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    rotationCounter?: number
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rotationCounter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUpdateOneRequiredWithoutRefreshTokenNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rotationCounter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    sessionId: string
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    rotationCounter?: number
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rotationCounter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rotationCounter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureCreateNestedManyWithoutSessionInput
    RefreshToken?: RefreshTokenCreateNestedOneWithoutSessionInput
    User: UserCreateNestedOneWithoutSessionInput
    Wallet: WalletCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    walletId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureUncheckedCreateNestedManyWithoutSessionInput
    RefreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUpdateManyWithoutSessionNestedInput
    RefreshToken?: RefreshTokenUpdateOneWithoutSessionNestedInput
    User?: UserUpdateOneRequiredWithoutSessionNestedInput
    Wallet?: WalletUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUncheckedUpdateManyWithoutSessionNestedInput
    RefreshToken?: RefreshTokenUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    walletId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionCreateNestedManyWithoutUserInput
    Wallet?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
    Wallet?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUpdateManyWithoutUserNestedInput
    Wallet?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Wallet?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionCreateNestedManyWithoutWalletInput
    User: UserCreateNestedOneWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    userId: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUpdateManyWithoutWalletNestedInput
    User?: UserUpdateOneRequiredWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    userId: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type diesel_schema_migrationsCreateInput = {
    version: string
    run_on?: Date | string
  }

  export type diesel_schema_migrationsUncheckedCreateInput = {
    version: string
    run_on?: Date | string
  }

  export type diesel_schema_migrationsUpdateInput = {
    version?: StringFieldUpdateOperationsInput | string
    run_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type diesel_schema_migrationsUncheckedUpdateInput = {
    version?: StringFieldUpdateOperationsInput | string
    run_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type diesel_schema_migrationsCreateManyInput = {
    version: string
    run_on?: Date | string
  }

  export type diesel_schema_migrationsUpdateManyMutationInput = {
    version?: StringFieldUpdateOperationsInput | string
    run_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type diesel_schema_migrationsUncheckedUpdateManyInput = {
    version?: StringFieldUpdateOperationsInput | string
    run_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type meeting_roomsCreateInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    ApprovalRequest?: ApprovalRequestCreateNestedManyWithoutMeeting_roomsInput
    room_metadata?: room_metadataCreateNestedOneWithoutMeeting_roomsInput
    room_participants?: room_participantsCreateNestedManyWithoutMeeting_roomsInput
  }

  export type meeting_roomsUncheckedCreateInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    ApprovalRequest?: ApprovalRequestUncheckedCreateNestedManyWithoutMeeting_roomsInput
    room_metadata?: room_metadataUncheckedCreateNestedOneWithoutMeeting_roomsInput
    room_participants?: room_participantsUncheckedCreateNestedManyWithoutMeeting_roomsInput
  }

  export type meeting_roomsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ApprovalRequest?: ApprovalRequestUpdateManyWithoutMeeting_roomsNestedInput
    room_metadata?: room_metadataUpdateOneWithoutMeeting_roomsNestedInput
    room_participants?: room_participantsUpdateManyWithoutMeeting_roomsNestedInput
  }

  export type meeting_roomsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ApprovalRequest?: ApprovalRequestUncheckedUpdateManyWithoutMeeting_roomsNestedInput
    room_metadata?: room_metadataUncheckedUpdateOneWithoutMeeting_roomsNestedInput
    room_participants?: room_participantsUncheckedUpdateManyWithoutMeeting_roomsNestedInput
  }

  export type meeting_roomsCreateManyInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
  }

  export type meeting_roomsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type meeting_roomsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_metadataCreateInput = {
    id?: bigint | number
    dynamic_field_id: string
    df_version: bigint | number
    language: string
    timezone: string
    recording_blob_id?: Decimal | DecimalJsLike | number | string | null
    indexed_at?: Date | string
    updated_at?: Date | string
    meeting_rooms: meeting_roomsCreateNestedOneWithoutRoom_metadataInput
  }

  export type room_metadataUncheckedCreateInput = {
    id?: bigint | number
    room_id: string
    dynamic_field_id: string
    df_version: bigint | number
    language: string
    timezone: string
    recording_blob_id?: Decimal | DecimalJsLike | number | string | null
    indexed_at?: Date | string
    updated_at?: Date | string
  }

  export type room_metadataUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dynamic_field_id?: StringFieldUpdateOperationsInput | string
    df_version?: BigIntFieldUpdateOperationsInput | bigint | number
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    recording_blob_id?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting_rooms?: meeting_roomsUpdateOneRequiredWithoutRoom_metadataNestedInput
  }

  export type room_metadataUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    dynamic_field_id?: StringFieldUpdateOperationsInput | string
    df_version?: BigIntFieldUpdateOperationsInput | bigint | number
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    recording_blob_id?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_metadataCreateManyInput = {
    id?: bigint | number
    room_id: string
    dynamic_field_id: string
    df_version: bigint | number
    language: string
    timezone: string
    recording_blob_id?: Decimal | DecimalJsLike | number | string | null
    indexed_at?: Date | string
    updated_at?: Date | string
  }

  export type room_metadataUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dynamic_field_id?: StringFieldUpdateOperationsInput | string
    df_version?: BigIntFieldUpdateOperationsInput | bigint | number
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    recording_blob_id?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_metadataUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    dynamic_field_id?: StringFieldUpdateOperationsInput | string
    df_version?: BigIntFieldUpdateOperationsInput | bigint | number
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    recording_blob_id?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_participantsCreateInput = {
    id?: bigint | number
    participant_address: string
    role: string
    admin_cap_id?: string | null
    joined_at?: Date | string
    updated_at?: Date | string
    meeting_rooms: meeting_roomsCreateNestedOneWithoutRoom_participantsInput
  }

  export type room_participantsUncheckedCreateInput = {
    id?: bigint | number
    room_id: string
    participant_address: string
    role: string
    admin_cap_id?: string | null
    joined_at?: Date | string
    updated_at?: Date | string
  }

  export type room_participantsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting_rooms?: meeting_roomsUpdateOneRequiredWithoutRoom_participantsNestedInput
  }

  export type room_participantsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_participantsCreateManyInput = {
    id?: bigint | number
    room_id: string
    participant_address: string
    role: string
    admin_cap_id?: string | null
    joined_at?: Date | string
    updated_at?: Date | string
  }

  export type room_participantsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_participantsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type watermarksCreateInput = {
    pipeline: string
    epoch_hi_inclusive: bigint | number
    checkpoint_hi_inclusive: bigint | number
    tx_hi: bigint | number
    timestamp_ms_hi_inclusive: bigint | number
    reader_lo: bigint | number
    pruner_timestamp: Date | string
    pruner_hi: bigint | number
  }

  export type watermarksUncheckedCreateInput = {
    pipeline: string
    epoch_hi_inclusive: bigint | number
    checkpoint_hi_inclusive: bigint | number
    tx_hi: bigint | number
    timestamp_ms_hi_inclusive: bigint | number
    reader_lo: bigint | number
    pruner_timestamp: Date | string
    pruner_hi: bigint | number
  }

  export type watermarksUpdateInput = {
    pipeline?: StringFieldUpdateOperationsInput | string
    epoch_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    checkpoint_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    tx_hi?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp_ms_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    reader_lo?: BigIntFieldUpdateOperationsInput | bigint | number
    pruner_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    pruner_hi?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type watermarksUncheckedUpdateInput = {
    pipeline?: StringFieldUpdateOperationsInput | string
    epoch_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    checkpoint_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    tx_hi?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp_ms_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    reader_lo?: BigIntFieldUpdateOperationsInput | bigint | number
    pruner_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    pruner_hi?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type watermarksCreateManyInput = {
    pipeline: string
    epoch_hi_inclusive: bigint | number
    checkpoint_hi_inclusive: bigint | number
    tx_hi: bigint | number
    timestamp_ms_hi_inclusive: bigint | number
    reader_lo: bigint | number
    pruner_timestamp: Date | string
    pruner_hi: bigint | number
  }

  export type watermarksUpdateManyMutationInput = {
    pipeline?: StringFieldUpdateOperationsInput | string
    epoch_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    checkpoint_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    tx_hi?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp_ms_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    reader_lo?: BigIntFieldUpdateOperationsInput | bigint | number
    pruner_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    pruner_hi?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type watermarksUncheckedUpdateManyInput = {
    pipeline?: StringFieldUpdateOperationsInput | string
    epoch_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    checkpoint_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    tx_hi?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp_ms_hi_inclusive?: BigIntFieldUpdateOperationsInput | bigint | number
    reader_lo?: BigIntFieldUpdateOperationsInput | bigint | number
    pruner_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    pruner_hi?: BigIntFieldUpdateOperationsInput | bigint | number
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

  export type Meeting_roomsScalarRelationFilter = {
    is?: meeting_roomsWhereInput
    isNot?: meeting_roomsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ApprovalRequestCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    requester_address?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
    resolver_address?: SortOrder
  }

  export type ApprovalRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    requester_address?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
    resolver_address?: SortOrder
  }

  export type ApprovalRequestMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    requester_address?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
    resolver_address?: SortOrder
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

  export type AuthNonceCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthNonceMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthNonceMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type DelegatedSignatureCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    action?: SortOrder
    roomId?: SortOrder
    txDigest?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
  }

  export type DelegatedSignatureMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    action?: SortOrder
    roomId?: SortOrder
    txDigest?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
  }

  export type DelegatedSignatureMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    action?: SortOrder
    roomId?: SortOrder
    txDigest?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
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

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    rotationCounter?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenAvgOrderByAggregateInput = {
    rotationCounter?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    rotationCounter?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    rotationCounter?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenSumOrderByAggregateInput = {
    rotationCounter?: SortOrder
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

  export type DelegatedSignatureListRelationFilter = {
    every?: DelegatedSignatureWhereInput
    some?: DelegatedSignatureWhereInput
    none?: DelegatedSignatureWhereInput
  }

  export type RefreshTokenNullableScalarRelationFilter = {
    is?: RefreshTokenWhereInput | null
    isNot?: RefreshTokenWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WalletScalarRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type DelegatedSignatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    jwtId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    encryptedPrivateKey?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    jwtId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    encryptedPrivateKey?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    jwtId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    encryptedPrivateKey?: SortOrder
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    primaryWalletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    primaryWalletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    primaryWalletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type diesel_schema_migrationsCountOrderByAggregateInput = {
    version?: SortOrder
    run_on?: SortOrder
  }

  export type diesel_schema_migrationsMaxOrderByAggregateInput = {
    version?: SortOrder
    run_on?: SortOrder
  }

  export type diesel_schema_migrationsMinOrderByAggregateInput = {
    version?: SortOrder
    run_on?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type ApprovalRequestListRelationFilter = {
    every?: ApprovalRequestWhereInput
    some?: ApprovalRequestWhereInput
    none?: ApprovalRequestWhereInput
  }

  export type Room_metadataNullableScalarRelationFilter = {
    is?: room_metadataWhereInput | null
    isNot?: room_metadataWhereInput | null
  }

  export type Room_participantsListRelationFilter = {
    every?: room_participantsWhereInput
    some?: room_participantsWhereInput
    none?: room_participantsWhereInput
  }

  export type ApprovalRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type room_participantsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type meeting_roomsCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    title?: SortOrder
    hosts?: SortOrder
    seal_policy_id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    require_approval?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    checkpoint_sequence_number?: SortOrder
    transaction_digest?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
  }

  export type meeting_roomsAvgOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    checkpoint_sequence_number?: SortOrder
  }

  export type meeting_roomsMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    title?: SortOrder
    seal_policy_id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    require_approval?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    checkpoint_sequence_number?: SortOrder
    transaction_digest?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
  }

  export type meeting_roomsMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    title?: SortOrder
    seal_policy_id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    require_approval?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    checkpoint_sequence_number?: SortOrder
    transaction_digest?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
  }

  export type meeting_roomsSumOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    max_participants?: SortOrder
    participant_count?: SortOrder
    created_at?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    checkpoint_sequence_number?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type room_metadataCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    dynamic_field_id?: SortOrder
    df_version?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    recording_blob_id?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_metadataAvgOrderByAggregateInput = {
    id?: SortOrder
    df_version?: SortOrder
    recording_blob_id?: SortOrder
  }

  export type room_metadataMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    dynamic_field_id?: SortOrder
    df_version?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    recording_blob_id?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_metadataMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    dynamic_field_id?: SortOrder
    df_version?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    recording_blob_id?: SortOrder
    indexed_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_metadataSumOrderByAggregateInput = {
    id?: SortOrder
    df_version?: SortOrder
    recording_blob_id?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type room_participantsRoom_idParticipant_addressCompoundUniqueInput = {
    room_id: string
    participant_address: string
  }

  export type room_participantsCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_address?: SortOrder
    role?: SortOrder
    admin_cap_id?: SortOrder
    joined_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_participantsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type room_participantsMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_address?: SortOrder
    role?: SortOrder
    admin_cap_id?: SortOrder
    joined_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_participantsMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_address?: SortOrder
    role?: SortOrder
    admin_cap_id?: SortOrder
    joined_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_participantsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type watermarksCountOrderByAggregateInput = {
    pipeline?: SortOrder
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_timestamp?: SortOrder
    pruner_hi?: SortOrder
  }

  export type watermarksAvgOrderByAggregateInput = {
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_hi?: SortOrder
  }

  export type watermarksMaxOrderByAggregateInput = {
    pipeline?: SortOrder
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_timestamp?: SortOrder
    pruner_hi?: SortOrder
  }

  export type watermarksMinOrderByAggregateInput = {
    pipeline?: SortOrder
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_timestamp?: SortOrder
    pruner_hi?: SortOrder
  }

  export type watermarksSumOrderByAggregateInput = {
    epoch_hi_inclusive?: SortOrder
    checkpoint_hi_inclusive?: SortOrder
    tx_hi?: SortOrder
    timestamp_ms_hi_inclusive?: SortOrder
    reader_lo?: SortOrder
    pruner_hi?: SortOrder
  }

  export type meeting_roomsCreateNestedOneWithoutApprovalRequestInput = {
    create?: XOR<meeting_roomsCreateWithoutApprovalRequestInput, meeting_roomsUncheckedCreateWithoutApprovalRequestInput>
    connectOrCreate?: meeting_roomsCreateOrConnectWithoutApprovalRequestInput
    connect?: meeting_roomsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type meeting_roomsUpdateOneRequiredWithoutApprovalRequestNestedInput = {
    create?: XOR<meeting_roomsCreateWithoutApprovalRequestInput, meeting_roomsUncheckedCreateWithoutApprovalRequestInput>
    connectOrCreate?: meeting_roomsCreateOrConnectWithoutApprovalRequestInput
    upsert?: meeting_roomsUpsertWithoutApprovalRequestInput
    connect?: meeting_roomsWhereUniqueInput
    update?: XOR<XOR<meeting_roomsUpdateToOneWithWhereWithoutApprovalRequestInput, meeting_roomsUpdateWithoutApprovalRequestInput>, meeting_roomsUncheckedUpdateWithoutApprovalRequestInput>
  }

  export type SessionCreateNestedOneWithoutDelegatedSignatureInput = {
    create?: XOR<SessionCreateWithoutDelegatedSignatureInput, SessionUncheckedCreateWithoutDelegatedSignatureInput>
    connectOrCreate?: SessionCreateOrConnectWithoutDelegatedSignatureInput
    connect?: SessionWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutDelegatedSignatureNestedInput = {
    create?: XOR<SessionCreateWithoutDelegatedSignatureInput, SessionUncheckedCreateWithoutDelegatedSignatureInput>
    connectOrCreate?: SessionCreateOrConnectWithoutDelegatedSignatureInput
    upsert?: SessionUpsertWithoutDelegatedSignatureInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutDelegatedSignatureInput, SessionUpdateWithoutDelegatedSignatureInput>, SessionUncheckedUpdateWithoutDelegatedSignatureInput>
  }

  export type SessionCreateNestedOneWithoutRefreshTokenInput = {
    create?: XOR<SessionCreateWithoutRefreshTokenInput, SessionUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRefreshTokenInput
    connect?: SessionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUpdateOneRequiredWithoutRefreshTokenNestedInput = {
    create?: XOR<SessionCreateWithoutRefreshTokenInput, SessionUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRefreshTokenInput
    upsert?: SessionUpsertWithoutRefreshTokenInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRefreshTokenInput, SessionUpdateWithoutRefreshTokenInput>, SessionUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type DelegatedSignatureCreateNestedManyWithoutSessionInput = {
    create?: XOR<DelegatedSignatureCreateWithoutSessionInput, DelegatedSignatureUncheckedCreateWithoutSessionInput> | DelegatedSignatureCreateWithoutSessionInput[] | DelegatedSignatureUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: DelegatedSignatureCreateOrConnectWithoutSessionInput | DelegatedSignatureCreateOrConnectWithoutSessionInput[]
    createMany?: DelegatedSignatureCreateManySessionInputEnvelope
    connect?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedOneWithoutSessionInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput
    connect?: RefreshTokenWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionInput = {
    create?: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput
    connect?: UserWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutSessionInput = {
    create?: XOR<WalletCreateWithoutSessionInput, WalletUncheckedCreateWithoutSessionInput>
    connectOrCreate?: WalletCreateOrConnectWithoutSessionInput
    connect?: WalletWhereUniqueInput
  }

  export type DelegatedSignatureUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<DelegatedSignatureCreateWithoutSessionInput, DelegatedSignatureUncheckedCreateWithoutSessionInput> | DelegatedSignatureCreateWithoutSessionInput[] | DelegatedSignatureUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: DelegatedSignatureCreateOrConnectWithoutSessionInput | DelegatedSignatureCreateOrConnectWithoutSessionInput[]
    createMany?: DelegatedSignatureCreateManySessionInputEnvelope
    connect?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedOneWithoutSessionInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput
    connect?: RefreshTokenWhereUniqueInput
  }

  export type DelegatedSignatureUpdateManyWithoutSessionNestedInput = {
    create?: XOR<DelegatedSignatureCreateWithoutSessionInput, DelegatedSignatureUncheckedCreateWithoutSessionInput> | DelegatedSignatureCreateWithoutSessionInput[] | DelegatedSignatureUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: DelegatedSignatureCreateOrConnectWithoutSessionInput | DelegatedSignatureCreateOrConnectWithoutSessionInput[]
    upsert?: DelegatedSignatureUpsertWithWhereUniqueWithoutSessionInput | DelegatedSignatureUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: DelegatedSignatureCreateManySessionInputEnvelope
    set?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    disconnect?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    delete?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    connect?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    update?: DelegatedSignatureUpdateWithWhereUniqueWithoutSessionInput | DelegatedSignatureUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: DelegatedSignatureUpdateManyWithWhereWithoutSessionInput | DelegatedSignatureUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: DelegatedSignatureScalarWhereInput | DelegatedSignatureScalarWhereInput[]
  }

  export type RefreshTokenUpdateOneWithoutSessionNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput
    upsert?: RefreshTokenUpsertWithoutSessionInput
    disconnect?: RefreshTokenWhereInput | boolean
    delete?: RefreshTokenWhereInput | boolean
    connect?: RefreshTokenWhereUniqueInput
    update?: XOR<XOR<RefreshTokenUpdateToOneWithWhereWithoutSessionInput, RefreshTokenUpdateWithoutSessionInput>, RefreshTokenUncheckedUpdateWithoutSessionInput>
  }

  export type UserUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput
    upsert?: UserUpsertWithoutSessionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionInput, UserUpdateWithoutSessionInput>, UserUncheckedUpdateWithoutSessionInput>
  }

  export type WalletUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<WalletCreateWithoutSessionInput, WalletUncheckedCreateWithoutSessionInput>
    connectOrCreate?: WalletCreateOrConnectWithoutSessionInput
    upsert?: WalletUpsertWithoutSessionInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutSessionInput, WalletUpdateWithoutSessionInput>, WalletUncheckedUpdateWithoutSessionInput>
  }

  export type DelegatedSignatureUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<DelegatedSignatureCreateWithoutSessionInput, DelegatedSignatureUncheckedCreateWithoutSessionInput> | DelegatedSignatureCreateWithoutSessionInput[] | DelegatedSignatureUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: DelegatedSignatureCreateOrConnectWithoutSessionInput | DelegatedSignatureCreateOrConnectWithoutSessionInput[]
    upsert?: DelegatedSignatureUpsertWithWhereUniqueWithoutSessionInput | DelegatedSignatureUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: DelegatedSignatureCreateManySessionInputEnvelope
    set?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    disconnect?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    delete?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    connect?: DelegatedSignatureWhereUniqueInput | DelegatedSignatureWhereUniqueInput[]
    update?: DelegatedSignatureUpdateWithWhereUniqueWithoutSessionInput | DelegatedSignatureUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: DelegatedSignatureUpdateManyWithWhereWithoutSessionInput | DelegatedSignatureUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: DelegatedSignatureScalarWhereInput | DelegatedSignatureScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput
    upsert?: RefreshTokenUpsertWithoutSessionInput
    disconnect?: RefreshTokenWhereInput | boolean
    delete?: RefreshTokenWhereInput | boolean
    connect?: RefreshTokenWhereUniqueInput
    update?: XOR<XOR<RefreshTokenUpdateToOneWithWhereWithoutSessionInput, RefreshTokenUpdateWithoutSessionInput>, RefreshTokenUncheckedUpdateWithoutSessionInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type SessionCreateNestedManyWithoutWalletInput = {
    create?: XOR<SessionCreateWithoutWalletInput, SessionUncheckedCreateWithoutWalletInput> | SessionCreateWithoutWalletInput[] | SessionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutWalletInput | SessionCreateOrConnectWithoutWalletInput[]
    createMany?: SessionCreateManyWalletInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutWalletInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    connect?: UserWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<SessionCreateWithoutWalletInput, SessionUncheckedCreateWithoutWalletInput> | SessionCreateWithoutWalletInput[] | SessionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutWalletInput | SessionCreateOrConnectWithoutWalletInput[]
    createMany?: SessionCreateManyWalletInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<SessionCreateWithoutWalletInput, SessionUncheckedCreateWithoutWalletInput> | SessionCreateWithoutWalletInput[] | SessionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutWalletInput | SessionCreateOrConnectWithoutWalletInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutWalletInput | SessionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: SessionCreateManyWalletInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutWalletInput | SessionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutWalletInput | SessionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutWalletNestedInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    upsert?: UserUpsertWithoutWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletInput, UserUpdateWithoutWalletInput>, UserUncheckedUpdateWithoutWalletInput>
  }

  export type SessionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<SessionCreateWithoutWalletInput, SessionUncheckedCreateWithoutWalletInput> | SessionCreateWithoutWalletInput[] | SessionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutWalletInput | SessionCreateOrConnectWithoutWalletInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutWalletInput | SessionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: SessionCreateManyWalletInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutWalletInput | SessionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutWalletInput | SessionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type meeting_roomsCreatehostsInput = {
    set: string[]
  }

  export type ApprovalRequestCreateNestedManyWithoutMeeting_roomsInput = {
    create?: XOR<ApprovalRequestCreateWithoutMeeting_roomsInput, ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput> | ApprovalRequestCreateWithoutMeeting_roomsInput[] | ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput | ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput[]
    createMany?: ApprovalRequestCreateManyMeeting_roomsInputEnvelope
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
  }

  export type room_metadataCreateNestedOneWithoutMeeting_roomsInput = {
    create?: XOR<room_metadataCreateWithoutMeeting_roomsInput, room_metadataUncheckedCreateWithoutMeeting_roomsInput>
    connectOrCreate?: room_metadataCreateOrConnectWithoutMeeting_roomsInput
    connect?: room_metadataWhereUniqueInput
  }

  export type room_participantsCreateNestedManyWithoutMeeting_roomsInput = {
    create?: XOR<room_participantsCreateWithoutMeeting_roomsInput, room_participantsUncheckedCreateWithoutMeeting_roomsInput> | room_participantsCreateWithoutMeeting_roomsInput[] | room_participantsUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: room_participantsCreateOrConnectWithoutMeeting_roomsInput | room_participantsCreateOrConnectWithoutMeeting_roomsInput[]
    createMany?: room_participantsCreateManyMeeting_roomsInputEnvelope
    connect?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
  }

  export type ApprovalRequestUncheckedCreateNestedManyWithoutMeeting_roomsInput = {
    create?: XOR<ApprovalRequestCreateWithoutMeeting_roomsInput, ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput> | ApprovalRequestCreateWithoutMeeting_roomsInput[] | ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput | ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput[]
    createMany?: ApprovalRequestCreateManyMeeting_roomsInputEnvelope
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
  }

  export type room_metadataUncheckedCreateNestedOneWithoutMeeting_roomsInput = {
    create?: XOR<room_metadataCreateWithoutMeeting_roomsInput, room_metadataUncheckedCreateWithoutMeeting_roomsInput>
    connectOrCreate?: room_metadataCreateOrConnectWithoutMeeting_roomsInput
    connect?: room_metadataWhereUniqueInput
  }

  export type room_participantsUncheckedCreateNestedManyWithoutMeeting_roomsInput = {
    create?: XOR<room_participantsCreateWithoutMeeting_roomsInput, room_participantsUncheckedCreateWithoutMeeting_roomsInput> | room_participantsCreateWithoutMeeting_roomsInput[] | room_participantsUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: room_participantsCreateOrConnectWithoutMeeting_roomsInput | room_participantsCreateOrConnectWithoutMeeting_roomsInput[]
    createMany?: room_participantsCreateManyMeeting_roomsInputEnvelope
    connect?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type meeting_roomsUpdatehostsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type ApprovalRequestUpdateManyWithoutMeeting_roomsNestedInput = {
    create?: XOR<ApprovalRequestCreateWithoutMeeting_roomsInput, ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput> | ApprovalRequestCreateWithoutMeeting_roomsInput[] | ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput | ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput[]
    upsert?: ApprovalRequestUpsertWithWhereUniqueWithoutMeeting_roomsInput | ApprovalRequestUpsertWithWhereUniqueWithoutMeeting_roomsInput[]
    createMany?: ApprovalRequestCreateManyMeeting_roomsInputEnvelope
    set?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    disconnect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    delete?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    update?: ApprovalRequestUpdateWithWhereUniqueWithoutMeeting_roomsInput | ApprovalRequestUpdateWithWhereUniqueWithoutMeeting_roomsInput[]
    updateMany?: ApprovalRequestUpdateManyWithWhereWithoutMeeting_roomsInput | ApprovalRequestUpdateManyWithWhereWithoutMeeting_roomsInput[]
    deleteMany?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
  }

  export type room_metadataUpdateOneWithoutMeeting_roomsNestedInput = {
    create?: XOR<room_metadataCreateWithoutMeeting_roomsInput, room_metadataUncheckedCreateWithoutMeeting_roomsInput>
    connectOrCreate?: room_metadataCreateOrConnectWithoutMeeting_roomsInput
    upsert?: room_metadataUpsertWithoutMeeting_roomsInput
    disconnect?: room_metadataWhereInput | boolean
    delete?: room_metadataWhereInput | boolean
    connect?: room_metadataWhereUniqueInput
    update?: XOR<XOR<room_metadataUpdateToOneWithWhereWithoutMeeting_roomsInput, room_metadataUpdateWithoutMeeting_roomsInput>, room_metadataUncheckedUpdateWithoutMeeting_roomsInput>
  }

  export type room_participantsUpdateManyWithoutMeeting_roomsNestedInput = {
    create?: XOR<room_participantsCreateWithoutMeeting_roomsInput, room_participantsUncheckedCreateWithoutMeeting_roomsInput> | room_participantsCreateWithoutMeeting_roomsInput[] | room_participantsUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: room_participantsCreateOrConnectWithoutMeeting_roomsInput | room_participantsCreateOrConnectWithoutMeeting_roomsInput[]
    upsert?: room_participantsUpsertWithWhereUniqueWithoutMeeting_roomsInput | room_participantsUpsertWithWhereUniqueWithoutMeeting_roomsInput[]
    createMany?: room_participantsCreateManyMeeting_roomsInputEnvelope
    set?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    disconnect?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    delete?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    connect?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    update?: room_participantsUpdateWithWhereUniqueWithoutMeeting_roomsInput | room_participantsUpdateWithWhereUniqueWithoutMeeting_roomsInput[]
    updateMany?: room_participantsUpdateManyWithWhereWithoutMeeting_roomsInput | room_participantsUpdateManyWithWhereWithoutMeeting_roomsInput[]
    deleteMany?: room_participantsScalarWhereInput | room_participantsScalarWhereInput[]
  }

  export type ApprovalRequestUncheckedUpdateManyWithoutMeeting_roomsNestedInput = {
    create?: XOR<ApprovalRequestCreateWithoutMeeting_roomsInput, ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput> | ApprovalRequestCreateWithoutMeeting_roomsInput[] | ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput | ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput[]
    upsert?: ApprovalRequestUpsertWithWhereUniqueWithoutMeeting_roomsInput | ApprovalRequestUpsertWithWhereUniqueWithoutMeeting_roomsInput[]
    createMany?: ApprovalRequestCreateManyMeeting_roomsInputEnvelope
    set?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    disconnect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    delete?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    update?: ApprovalRequestUpdateWithWhereUniqueWithoutMeeting_roomsInput | ApprovalRequestUpdateWithWhereUniqueWithoutMeeting_roomsInput[]
    updateMany?: ApprovalRequestUpdateManyWithWhereWithoutMeeting_roomsInput | ApprovalRequestUpdateManyWithWhereWithoutMeeting_roomsInput[]
    deleteMany?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
  }

  export type room_metadataUncheckedUpdateOneWithoutMeeting_roomsNestedInput = {
    create?: XOR<room_metadataCreateWithoutMeeting_roomsInput, room_metadataUncheckedCreateWithoutMeeting_roomsInput>
    connectOrCreate?: room_metadataCreateOrConnectWithoutMeeting_roomsInput
    upsert?: room_metadataUpsertWithoutMeeting_roomsInput
    disconnect?: room_metadataWhereInput | boolean
    delete?: room_metadataWhereInput | boolean
    connect?: room_metadataWhereUniqueInput
    update?: XOR<XOR<room_metadataUpdateToOneWithWhereWithoutMeeting_roomsInput, room_metadataUpdateWithoutMeeting_roomsInput>, room_metadataUncheckedUpdateWithoutMeeting_roomsInput>
  }

  export type room_participantsUncheckedUpdateManyWithoutMeeting_roomsNestedInput = {
    create?: XOR<room_participantsCreateWithoutMeeting_roomsInput, room_participantsUncheckedCreateWithoutMeeting_roomsInput> | room_participantsCreateWithoutMeeting_roomsInput[] | room_participantsUncheckedCreateWithoutMeeting_roomsInput[]
    connectOrCreate?: room_participantsCreateOrConnectWithoutMeeting_roomsInput | room_participantsCreateOrConnectWithoutMeeting_roomsInput[]
    upsert?: room_participantsUpsertWithWhereUniqueWithoutMeeting_roomsInput | room_participantsUpsertWithWhereUniqueWithoutMeeting_roomsInput[]
    createMany?: room_participantsCreateManyMeeting_roomsInputEnvelope
    set?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    disconnect?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    delete?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    connect?: room_participantsWhereUniqueInput | room_participantsWhereUniqueInput[]
    update?: room_participantsUpdateWithWhereUniqueWithoutMeeting_roomsInput | room_participantsUpdateWithWhereUniqueWithoutMeeting_roomsInput[]
    updateMany?: room_participantsUpdateManyWithWhereWithoutMeeting_roomsInput | room_participantsUpdateManyWithWhereWithoutMeeting_roomsInput[]
    deleteMany?: room_participantsScalarWhereInput | room_participantsScalarWhereInput[]
  }

  export type meeting_roomsCreateNestedOneWithoutRoom_metadataInput = {
    create?: XOR<meeting_roomsCreateWithoutRoom_metadataInput, meeting_roomsUncheckedCreateWithoutRoom_metadataInput>
    connectOrCreate?: meeting_roomsCreateOrConnectWithoutRoom_metadataInput
    connect?: meeting_roomsWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type meeting_roomsUpdateOneRequiredWithoutRoom_metadataNestedInput = {
    create?: XOR<meeting_roomsCreateWithoutRoom_metadataInput, meeting_roomsUncheckedCreateWithoutRoom_metadataInput>
    connectOrCreate?: meeting_roomsCreateOrConnectWithoutRoom_metadataInput
    upsert?: meeting_roomsUpsertWithoutRoom_metadataInput
    connect?: meeting_roomsWhereUniqueInput
    update?: XOR<XOR<meeting_roomsUpdateToOneWithWhereWithoutRoom_metadataInput, meeting_roomsUpdateWithoutRoom_metadataInput>, meeting_roomsUncheckedUpdateWithoutRoom_metadataInput>
  }

  export type meeting_roomsCreateNestedOneWithoutRoom_participantsInput = {
    create?: XOR<meeting_roomsCreateWithoutRoom_participantsInput, meeting_roomsUncheckedCreateWithoutRoom_participantsInput>
    connectOrCreate?: meeting_roomsCreateOrConnectWithoutRoom_participantsInput
    connect?: meeting_roomsWhereUniqueInput
  }

  export type meeting_roomsUpdateOneRequiredWithoutRoom_participantsNestedInput = {
    create?: XOR<meeting_roomsCreateWithoutRoom_participantsInput, meeting_roomsUncheckedCreateWithoutRoom_participantsInput>
    connectOrCreate?: meeting_roomsCreateOrConnectWithoutRoom_participantsInput
    upsert?: meeting_roomsUpsertWithoutRoom_participantsInput
    connect?: meeting_roomsWhereUniqueInput
    update?: XOR<XOR<meeting_roomsUpdateToOneWithWhereWithoutRoom_participantsInput, meeting_roomsUpdateWithoutRoom_participantsInput>, meeting_roomsUncheckedUpdateWithoutRoom_participantsInput>
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type meeting_roomsCreateWithoutApprovalRequestInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    room_metadata?: room_metadataCreateNestedOneWithoutMeeting_roomsInput
    room_participants?: room_participantsCreateNestedManyWithoutMeeting_roomsInput
  }

  export type meeting_roomsUncheckedCreateWithoutApprovalRequestInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    room_metadata?: room_metadataUncheckedCreateNestedOneWithoutMeeting_roomsInput
    room_participants?: room_participantsUncheckedCreateNestedManyWithoutMeeting_roomsInput
  }

  export type meeting_roomsCreateOrConnectWithoutApprovalRequestInput = {
    where: meeting_roomsWhereUniqueInput
    create: XOR<meeting_roomsCreateWithoutApprovalRequestInput, meeting_roomsUncheckedCreateWithoutApprovalRequestInput>
  }

  export type meeting_roomsUpsertWithoutApprovalRequestInput = {
    update: XOR<meeting_roomsUpdateWithoutApprovalRequestInput, meeting_roomsUncheckedUpdateWithoutApprovalRequestInput>
    create: XOR<meeting_roomsCreateWithoutApprovalRequestInput, meeting_roomsUncheckedCreateWithoutApprovalRequestInput>
    where?: meeting_roomsWhereInput
  }

  export type meeting_roomsUpdateToOneWithWhereWithoutApprovalRequestInput = {
    where?: meeting_roomsWhereInput
    data: XOR<meeting_roomsUpdateWithoutApprovalRequestInput, meeting_roomsUncheckedUpdateWithoutApprovalRequestInput>
  }

  export type meeting_roomsUpdateWithoutApprovalRequestInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room_metadata?: room_metadataUpdateOneWithoutMeeting_roomsNestedInput
    room_participants?: room_participantsUpdateManyWithoutMeeting_roomsNestedInput
  }

  export type meeting_roomsUncheckedUpdateWithoutApprovalRequestInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room_metadata?: room_metadataUncheckedUpdateOneWithoutMeeting_roomsNestedInput
    room_participants?: room_participantsUncheckedUpdateManyWithoutMeeting_roomsNestedInput
  }

  export type SessionCreateWithoutDelegatedSignatureInput = {
    id?: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    RefreshToken?: RefreshTokenCreateNestedOneWithoutSessionInput
    User: UserCreateNestedOneWithoutSessionInput
    Wallet: WalletCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutDelegatedSignatureInput = {
    id?: string
    userId: string
    walletId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    RefreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutDelegatedSignatureInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutDelegatedSignatureInput, SessionUncheckedCreateWithoutDelegatedSignatureInput>
  }

  export type SessionUpsertWithoutDelegatedSignatureInput = {
    update: XOR<SessionUpdateWithoutDelegatedSignatureInput, SessionUncheckedUpdateWithoutDelegatedSignatureInput>
    create: XOR<SessionCreateWithoutDelegatedSignatureInput, SessionUncheckedCreateWithoutDelegatedSignatureInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutDelegatedSignatureInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutDelegatedSignatureInput, SessionUncheckedUpdateWithoutDelegatedSignatureInput>
  }

  export type SessionUpdateWithoutDelegatedSignatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    RefreshToken?: RefreshTokenUpdateOneWithoutSessionNestedInput
    User?: UserUpdateOneRequiredWithoutSessionNestedInput
    Wallet?: WalletUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutDelegatedSignatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    RefreshToken?: RefreshTokenUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionCreateWithoutRefreshTokenInput = {
    id?: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureCreateNestedManyWithoutSessionInput
    User: UserCreateNestedOneWithoutSessionInput
    Wallet: WalletCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutRefreshTokenInput = {
    id?: string
    userId: string
    walletId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutRefreshTokenInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutRefreshTokenInput, SessionUncheckedCreateWithoutRefreshTokenInput>
  }

  export type SessionUpsertWithoutRefreshTokenInput = {
    update: XOR<SessionUpdateWithoutRefreshTokenInput, SessionUncheckedUpdateWithoutRefreshTokenInput>
    create: XOR<SessionCreateWithoutRefreshTokenInput, SessionUncheckedCreateWithoutRefreshTokenInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutRefreshTokenInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutRefreshTokenInput, SessionUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type SessionUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUpdateManyWithoutSessionNestedInput
    User?: UserUpdateOneRequiredWithoutSessionNestedInput
    Wallet?: WalletUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type DelegatedSignatureCreateWithoutSessionInput = {
    id?: string
    action: string
    roomId?: string | null
    txDigest?: string | null
    signature: string
    createdAt?: Date | string
  }

  export type DelegatedSignatureUncheckedCreateWithoutSessionInput = {
    id?: string
    action: string
    roomId?: string | null
    txDigest?: string | null
    signature: string
    createdAt?: Date | string
  }

  export type DelegatedSignatureCreateOrConnectWithoutSessionInput = {
    where: DelegatedSignatureWhereUniqueInput
    create: XOR<DelegatedSignatureCreateWithoutSessionInput, DelegatedSignatureUncheckedCreateWithoutSessionInput>
  }

  export type DelegatedSignatureCreateManySessionInputEnvelope = {
    data: DelegatedSignatureCreateManySessionInput | DelegatedSignatureCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutSessionInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    rotationCounter?: number
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutSessionInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    rotationCounter?: number
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutSessionInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
  }

  export type UserCreateWithoutSessionInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Wallet?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Wallet?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
  }

  export type WalletCreateWithoutSessionInput = {
    id?: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutSessionInput = {
    id?: string
    userId: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutSessionInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutSessionInput, WalletUncheckedCreateWithoutSessionInput>
  }

  export type DelegatedSignatureUpsertWithWhereUniqueWithoutSessionInput = {
    where: DelegatedSignatureWhereUniqueInput
    update: XOR<DelegatedSignatureUpdateWithoutSessionInput, DelegatedSignatureUncheckedUpdateWithoutSessionInput>
    create: XOR<DelegatedSignatureCreateWithoutSessionInput, DelegatedSignatureUncheckedCreateWithoutSessionInput>
  }

  export type DelegatedSignatureUpdateWithWhereUniqueWithoutSessionInput = {
    where: DelegatedSignatureWhereUniqueInput
    data: XOR<DelegatedSignatureUpdateWithoutSessionInput, DelegatedSignatureUncheckedUpdateWithoutSessionInput>
  }

  export type DelegatedSignatureUpdateManyWithWhereWithoutSessionInput = {
    where: DelegatedSignatureScalarWhereInput
    data: XOR<DelegatedSignatureUpdateManyMutationInput, DelegatedSignatureUncheckedUpdateManyWithoutSessionInput>
  }

  export type DelegatedSignatureScalarWhereInput = {
    AND?: DelegatedSignatureScalarWhereInput | DelegatedSignatureScalarWhereInput[]
    OR?: DelegatedSignatureScalarWhereInput[]
    NOT?: DelegatedSignatureScalarWhereInput | DelegatedSignatureScalarWhereInput[]
    id?: StringFilter<"DelegatedSignature"> | string
    sessionId?: StringFilter<"DelegatedSignature"> | string
    action?: StringFilter<"DelegatedSignature"> | string
    roomId?: StringNullableFilter<"DelegatedSignature"> | string | null
    txDigest?: StringNullableFilter<"DelegatedSignature"> | string | null
    signature?: StringFilter<"DelegatedSignature"> | string
    createdAt?: DateTimeFilter<"DelegatedSignature"> | Date | string
  }

  export type RefreshTokenUpsertWithoutSessionInput = {
    update: XOR<RefreshTokenUpdateWithoutSessionInput, RefreshTokenUncheckedUpdateWithoutSessionInput>
    create: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
    where?: RefreshTokenWhereInput
  }

  export type RefreshTokenUpdateToOneWithWhereWithoutSessionInput = {
    where?: RefreshTokenWhereInput
    data: XOR<RefreshTokenUpdateWithoutSessionInput, RefreshTokenUncheckedUpdateWithoutSessionInput>
  }

  export type RefreshTokenUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rotationCounter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rotationCounter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSessionInput = {
    update: XOR<UserUpdateWithoutSessionInput, UserUncheckedUpdateWithoutSessionInput>
    create: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionInput, UserUncheckedUpdateWithoutSessionInput>
  }

  export type UserUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Wallet?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Wallet?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletUpsertWithoutSessionInput = {
    update: XOR<WalletUpdateWithoutSessionInput, WalletUncheckedUpdateWithoutSessionInput>
    create: XOR<WalletCreateWithoutSessionInput, WalletUncheckedCreateWithoutSessionInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutSessionInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutSessionInput, WalletUncheckedUpdateWithoutSessionInput>
  }

  export type WalletUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureCreateNestedManyWithoutSessionInput
    RefreshToken?: RefreshTokenCreateNestedOneWithoutSessionInput
    Wallet: WalletCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    walletId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureUncheckedCreateNestedManyWithoutSessionInput
    RefreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    walletId?: StringFilter<"Session"> | string
    jwtId?: StringFilter<"Session"> | string
    status?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    lastUsedAt?: DateTimeFilter<"Session"> | Date | string
    encryptedPrivateKey?: StringNullableFilter<"Session"> | string | null
  }

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    type?: StringFilter<"Wallet"> | string
    status?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
  }

  export type SessionCreateWithoutWalletInput = {
    id?: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureCreateNestedManyWithoutSessionInput
    RefreshToken?: RefreshTokenCreateNestedOneWithoutSessionInput
    User: UserCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutWalletInput = {
    id?: string
    userId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
    DelegatedSignature?: DelegatedSignatureUncheckedCreateNestedManyWithoutSessionInput
    RefreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutWalletInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutWalletInput, SessionUncheckedCreateWithoutWalletInput>
  }

  export type SessionCreateManyWalletInputEnvelope = {
    data: SessionCreateManyWalletInput | SessionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutWalletInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletInput = {
    id?: string
    primaryWalletAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutWalletInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutWalletInput, SessionUncheckedUpdateWithoutWalletInput>
    create: XOR<SessionCreateWithoutWalletInput, SessionUncheckedCreateWithoutWalletInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutWalletInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutWalletInput, SessionUncheckedUpdateWithoutWalletInput>
  }

  export type SessionUpdateManyWithWhereWithoutWalletInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutWalletInput>
  }

  export type UserUpsertWithoutWalletInput = {
    update: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
  }

  export type UserUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryWalletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ApprovalRequestCreateWithoutMeeting_roomsInput = {
    id?: string
    requester_address: string
    status?: string
    created_at?: Date | string
    resolved_at?: Date | string | null
    resolver_address?: string | null
  }

  export type ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput = {
    id?: string
    requester_address: string
    status?: string
    created_at?: Date | string
    resolved_at?: Date | string | null
    resolver_address?: string | null
  }

  export type ApprovalRequestCreateOrConnectWithoutMeeting_roomsInput = {
    where: ApprovalRequestWhereUniqueInput
    create: XOR<ApprovalRequestCreateWithoutMeeting_roomsInput, ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput>
  }

  export type ApprovalRequestCreateManyMeeting_roomsInputEnvelope = {
    data: ApprovalRequestCreateManyMeeting_roomsInput | ApprovalRequestCreateManyMeeting_roomsInput[]
    skipDuplicates?: boolean
  }

  export type room_metadataCreateWithoutMeeting_roomsInput = {
    id?: bigint | number
    dynamic_field_id: string
    df_version: bigint | number
    language: string
    timezone: string
    recording_blob_id?: Decimal | DecimalJsLike | number | string | null
    indexed_at?: Date | string
    updated_at?: Date | string
  }

  export type room_metadataUncheckedCreateWithoutMeeting_roomsInput = {
    id?: bigint | number
    dynamic_field_id: string
    df_version: bigint | number
    language: string
    timezone: string
    recording_blob_id?: Decimal | DecimalJsLike | number | string | null
    indexed_at?: Date | string
    updated_at?: Date | string
  }

  export type room_metadataCreateOrConnectWithoutMeeting_roomsInput = {
    where: room_metadataWhereUniqueInput
    create: XOR<room_metadataCreateWithoutMeeting_roomsInput, room_metadataUncheckedCreateWithoutMeeting_roomsInput>
  }

  export type room_participantsCreateWithoutMeeting_roomsInput = {
    id?: bigint | number
    participant_address: string
    role: string
    admin_cap_id?: string | null
    joined_at?: Date | string
    updated_at?: Date | string
  }

  export type room_participantsUncheckedCreateWithoutMeeting_roomsInput = {
    id?: bigint | number
    participant_address: string
    role: string
    admin_cap_id?: string | null
    joined_at?: Date | string
    updated_at?: Date | string
  }

  export type room_participantsCreateOrConnectWithoutMeeting_roomsInput = {
    where: room_participantsWhereUniqueInput
    create: XOR<room_participantsCreateWithoutMeeting_roomsInput, room_participantsUncheckedCreateWithoutMeeting_roomsInput>
  }

  export type room_participantsCreateManyMeeting_roomsInputEnvelope = {
    data: room_participantsCreateManyMeeting_roomsInput | room_participantsCreateManyMeeting_roomsInput[]
    skipDuplicates?: boolean
  }

  export type ApprovalRequestUpsertWithWhereUniqueWithoutMeeting_roomsInput = {
    where: ApprovalRequestWhereUniqueInput
    update: XOR<ApprovalRequestUpdateWithoutMeeting_roomsInput, ApprovalRequestUncheckedUpdateWithoutMeeting_roomsInput>
    create: XOR<ApprovalRequestCreateWithoutMeeting_roomsInput, ApprovalRequestUncheckedCreateWithoutMeeting_roomsInput>
  }

  export type ApprovalRequestUpdateWithWhereUniqueWithoutMeeting_roomsInput = {
    where: ApprovalRequestWhereUniqueInput
    data: XOR<ApprovalRequestUpdateWithoutMeeting_roomsInput, ApprovalRequestUncheckedUpdateWithoutMeeting_roomsInput>
  }

  export type ApprovalRequestUpdateManyWithWhereWithoutMeeting_roomsInput = {
    where: ApprovalRequestScalarWhereInput
    data: XOR<ApprovalRequestUpdateManyMutationInput, ApprovalRequestUncheckedUpdateManyWithoutMeeting_roomsInput>
  }

  export type ApprovalRequestScalarWhereInput = {
    AND?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
    OR?: ApprovalRequestScalarWhereInput[]
    NOT?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
    id?: StringFilter<"ApprovalRequest"> | string
    room_id?: StringFilter<"ApprovalRequest"> | string
    requester_address?: StringFilter<"ApprovalRequest"> | string
    status?: StringFilter<"ApprovalRequest"> | string
    created_at?: DateTimeFilter<"ApprovalRequest"> | Date | string
    resolved_at?: DateTimeNullableFilter<"ApprovalRequest"> | Date | string | null
    resolver_address?: StringNullableFilter<"ApprovalRequest"> | string | null
  }

  export type room_metadataUpsertWithoutMeeting_roomsInput = {
    update: XOR<room_metadataUpdateWithoutMeeting_roomsInput, room_metadataUncheckedUpdateWithoutMeeting_roomsInput>
    create: XOR<room_metadataCreateWithoutMeeting_roomsInput, room_metadataUncheckedCreateWithoutMeeting_roomsInput>
    where?: room_metadataWhereInput
  }

  export type room_metadataUpdateToOneWithWhereWithoutMeeting_roomsInput = {
    where?: room_metadataWhereInput
    data: XOR<room_metadataUpdateWithoutMeeting_roomsInput, room_metadataUncheckedUpdateWithoutMeeting_roomsInput>
  }

  export type room_metadataUpdateWithoutMeeting_roomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dynamic_field_id?: StringFieldUpdateOperationsInput | string
    df_version?: BigIntFieldUpdateOperationsInput | bigint | number
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    recording_blob_id?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_metadataUncheckedUpdateWithoutMeeting_roomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dynamic_field_id?: StringFieldUpdateOperationsInput | string
    df_version?: BigIntFieldUpdateOperationsInput | bigint | number
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    recording_blob_id?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_participantsUpsertWithWhereUniqueWithoutMeeting_roomsInput = {
    where: room_participantsWhereUniqueInput
    update: XOR<room_participantsUpdateWithoutMeeting_roomsInput, room_participantsUncheckedUpdateWithoutMeeting_roomsInput>
    create: XOR<room_participantsCreateWithoutMeeting_roomsInput, room_participantsUncheckedCreateWithoutMeeting_roomsInput>
  }

  export type room_participantsUpdateWithWhereUniqueWithoutMeeting_roomsInput = {
    where: room_participantsWhereUniqueInput
    data: XOR<room_participantsUpdateWithoutMeeting_roomsInput, room_participantsUncheckedUpdateWithoutMeeting_roomsInput>
  }

  export type room_participantsUpdateManyWithWhereWithoutMeeting_roomsInput = {
    where: room_participantsScalarWhereInput
    data: XOR<room_participantsUpdateManyMutationInput, room_participantsUncheckedUpdateManyWithoutMeeting_roomsInput>
  }

  export type room_participantsScalarWhereInput = {
    AND?: room_participantsScalarWhereInput | room_participantsScalarWhereInput[]
    OR?: room_participantsScalarWhereInput[]
    NOT?: room_participantsScalarWhereInput | room_participantsScalarWhereInput[]
    id?: BigIntFilter<"room_participants"> | bigint | number
    room_id?: StringFilter<"room_participants"> | string
    participant_address?: StringFilter<"room_participants"> | string
    role?: StringFilter<"room_participants"> | string
    admin_cap_id?: StringNullableFilter<"room_participants"> | string | null
    joined_at?: DateTimeFilter<"room_participants"> | Date | string
    updated_at?: DateTimeFilter<"room_participants"> | Date | string
  }

  export type meeting_roomsCreateWithoutRoom_metadataInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    ApprovalRequest?: ApprovalRequestCreateNestedManyWithoutMeeting_roomsInput
    room_participants?: room_participantsCreateNestedManyWithoutMeeting_roomsInput
  }

  export type meeting_roomsUncheckedCreateWithoutRoom_metadataInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    ApprovalRequest?: ApprovalRequestUncheckedCreateNestedManyWithoutMeeting_roomsInput
    room_participants?: room_participantsUncheckedCreateNestedManyWithoutMeeting_roomsInput
  }

  export type meeting_roomsCreateOrConnectWithoutRoom_metadataInput = {
    where: meeting_roomsWhereUniqueInput
    create: XOR<meeting_roomsCreateWithoutRoom_metadataInput, meeting_roomsUncheckedCreateWithoutRoom_metadataInput>
  }

  export type meeting_roomsUpsertWithoutRoom_metadataInput = {
    update: XOR<meeting_roomsUpdateWithoutRoom_metadataInput, meeting_roomsUncheckedUpdateWithoutRoom_metadataInput>
    create: XOR<meeting_roomsCreateWithoutRoom_metadataInput, meeting_roomsUncheckedCreateWithoutRoom_metadataInput>
    where?: meeting_roomsWhereInput
  }

  export type meeting_roomsUpdateToOneWithWhereWithoutRoom_metadataInput = {
    where?: meeting_roomsWhereInput
    data: XOR<meeting_roomsUpdateWithoutRoom_metadataInput, meeting_roomsUncheckedUpdateWithoutRoom_metadataInput>
  }

  export type meeting_roomsUpdateWithoutRoom_metadataInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ApprovalRequest?: ApprovalRequestUpdateManyWithoutMeeting_roomsNestedInput
    room_participants?: room_participantsUpdateManyWithoutMeeting_roomsNestedInput
  }

  export type meeting_roomsUncheckedUpdateWithoutRoom_metadataInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ApprovalRequest?: ApprovalRequestUncheckedUpdateManyWithoutMeeting_roomsNestedInput
    room_participants?: room_participantsUncheckedUpdateManyWithoutMeeting_roomsNestedInput
  }

  export type meeting_roomsCreateWithoutRoom_participantsInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    ApprovalRequest?: ApprovalRequestCreateNestedManyWithoutMeeting_roomsInput
    room_metadata?: room_metadataCreateNestedOneWithoutMeeting_roomsInput
  }

  export type meeting_roomsUncheckedCreateWithoutRoom_participantsInput = {
    id?: bigint | number
    room_id: string
    title: string
    hosts?: meeting_roomsCreatehostsInput | string[]
    seal_policy_id: string
    status?: number
    max_participants: bigint | number
    require_approval?: boolean
    participant_count?: number
    created_at: bigint | number
    started_at?: bigint | number | null
    ended_at?: bigint | number | null
    checkpoint_sequence_number: bigint | number
    transaction_digest: string
    indexed_at?: Date | string
    updated_at?: Date | string
    ApprovalRequest?: ApprovalRequestUncheckedCreateNestedManyWithoutMeeting_roomsInput
    room_metadata?: room_metadataUncheckedCreateNestedOneWithoutMeeting_roomsInput
  }

  export type meeting_roomsCreateOrConnectWithoutRoom_participantsInput = {
    where: meeting_roomsWhereUniqueInput
    create: XOR<meeting_roomsCreateWithoutRoom_participantsInput, meeting_roomsUncheckedCreateWithoutRoom_participantsInput>
  }

  export type meeting_roomsUpsertWithoutRoom_participantsInput = {
    update: XOR<meeting_roomsUpdateWithoutRoom_participantsInput, meeting_roomsUncheckedUpdateWithoutRoom_participantsInput>
    create: XOR<meeting_roomsCreateWithoutRoom_participantsInput, meeting_roomsUncheckedCreateWithoutRoom_participantsInput>
    where?: meeting_roomsWhereInput
  }

  export type meeting_roomsUpdateToOneWithWhereWithoutRoom_participantsInput = {
    where?: meeting_roomsWhereInput
    data: XOR<meeting_roomsUpdateWithoutRoom_participantsInput, meeting_roomsUncheckedUpdateWithoutRoom_participantsInput>
  }

  export type meeting_roomsUpdateWithoutRoom_participantsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ApprovalRequest?: ApprovalRequestUpdateManyWithoutMeeting_roomsNestedInput
    room_metadata?: room_metadataUpdateOneWithoutMeeting_roomsNestedInput
  }

  export type meeting_roomsUncheckedUpdateWithoutRoom_participantsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    room_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    hosts?: meeting_roomsUpdatehostsInput | string[]
    seal_policy_id?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    max_participants?: BigIntFieldUpdateOperationsInput | bigint | number
    require_approval?: BoolFieldUpdateOperationsInput | boolean
    participant_count?: IntFieldUpdateOperationsInput | number
    created_at?: BigIntFieldUpdateOperationsInput | bigint | number
    started_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    ended_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    checkpoint_sequence_number?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_digest?: StringFieldUpdateOperationsInput | string
    indexed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ApprovalRequest?: ApprovalRequestUncheckedUpdateManyWithoutMeeting_roomsNestedInput
    room_metadata?: room_metadataUncheckedUpdateOneWithoutMeeting_roomsNestedInput
  }

  export type DelegatedSignatureCreateManySessionInput = {
    id?: string
    action: string
    roomId?: string | null
    txDigest?: string | null
    signature: string
    createdAt?: Date | string
  }

  export type DelegatedSignatureUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegatedSignatureUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegatedSignatureUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    walletId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
  }

  export type WalletCreateManyUserInput = {
    id?: string
    address: string
    type?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUpdateManyWithoutSessionNestedInput
    RefreshToken?: RefreshTokenUpdateOneWithoutSessionNestedInput
    Wallet?: WalletUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUncheckedUpdateManyWithoutSessionNestedInput
    RefreshToken?: RefreshTokenUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Session?: SessionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyWalletInput = {
    id?: string
    userId: string
    jwtId: string
    status?: string
    createdAt?: Date | string
    expiresAt: Date | string
    lastUsedAt?: Date | string
    encryptedPrivateKey?: string | null
  }

  export type SessionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUpdateManyWithoutSessionNestedInput
    RefreshToken?: RefreshTokenUpdateOneWithoutSessionNestedInput
    User?: UserUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    DelegatedSignature?: DelegatedSignatureUncheckedUpdateManyWithoutSessionNestedInput
    RefreshToken?: RefreshTokenUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalRequestCreateManyMeeting_roomsInput = {
    id?: string
    requester_address: string
    status?: string
    created_at?: Date | string
    resolved_at?: Date | string | null
    resolver_address?: string | null
  }

  export type room_participantsCreateManyMeeting_roomsInput = {
    id?: bigint | number
    participant_address: string
    role: string
    admin_cap_id?: string | null
    joined_at?: Date | string
    updated_at?: Date | string
  }

  export type ApprovalRequestUpdateWithoutMeeting_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalRequestUncheckedUpdateWithoutMeeting_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalRequestUncheckedUpdateManyWithoutMeeting_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requester_address?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolver_address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type room_participantsUpdateWithoutMeeting_roomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_participantsUncheckedUpdateWithoutMeeting_roomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_participantsUncheckedUpdateManyWithoutMeeting_roomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    participant_address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    admin_cap_id?: NullableStringFieldUpdateOperationsInput | string | null
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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