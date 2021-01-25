export interface RemoveToolRepository {
  remove: (id: string) => Promise<void>
}
