export type QueryParams = string | number | boolean;
export enum DB_TYPE {
    MYSQL = "mysql",
    PG = "pg",
}

export default interface dbInterface {
    connect(): Promise<unknown | void>;
    query(query: string, params?: QueryParams[]): Promise<any[]>;
}
