import { MongoClient, Collection, ObjectID } from 'mongodb'

export const MongoHelper = {
  client: new MongoClient(''),
  uri: '',
  connected: false,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.connected = true
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.connected = false
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  createObjectId (id: string): ObjectID {
    return new ObjectID(id)
  },

  map (data: any): any {
    const { _id, ...rest } = data
    return { id: _id, ...rest }
  },

  mapList (list: any[]): any[] {
    return list.map(item => MongoHelper.map(item))
  }
}
