class Authentication {
  constructor() {
    this.authenticated = false
  }

  authenticate(cb) {
    console.log('updating auth')
    this.authenticated = true
    cb()
  }

  logout(cb) {
    this.authenticated = false
    localStorage.removeItem('token')
    // cb()
  }

  isAuthenticated() {
    console.log('is authenticated called')
    // console.log(localStorage.getItem('token').length > 20)
    if(localStorage.getItem('token') !== null) {
      this.authenticated = true
    }
    return this.authenticated
  }
}

export default new Authentication()