export default {
  getTimestamp (_id) {
    return _id.toString().substring(0, 8)
  },
  getDate (_id) {
    const timestamp = this.getTimestamp(_id)
    return new Date(parseInt(timestamp, 16) * 1000)
  }
}
