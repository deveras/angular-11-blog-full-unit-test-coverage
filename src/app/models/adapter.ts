export interface Adapter<T, U>
{
  adapt(item: T): U;
}
