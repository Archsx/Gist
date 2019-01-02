import PubSub from '../lib/pubsub.js'


export default class Store {
  constructor(params){
    let self = this
    self.actions = {}
    self.mutations = {}
    self.state = {}
    self.status = 'resting'
    self.events = new PubSub()
  }
}