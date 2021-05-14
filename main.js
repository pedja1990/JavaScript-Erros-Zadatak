
class Errors{
    constructor(){ 
        this.errors = {}
    }

    has(field) {
        return this.errors.hasOwnProperty(field)
    }

    any (){
        return (this.errors).length
    }

    get (field){
        if (this.errors[field]){
            return this.errors[field][0]
        }
    }

    record(errors){
        this.errors = errors
    }

    clear (field){
        if(field){
            delete this.errors[field]
            
            
            return
        }

        this.errors = {}
    
    }
}




class Form {
    constructor(data) {                                                        
        this['firstName'] = data.firstName
        this['lastName'] = data.lastName
        this['email'] = data.email
        this['password'] = data.password
  
      for (let field in data) {
        this[field] = data[field]
      }
  
      this.errors = new Errors()
    }
  
    data() {
      let data = {}
  
      for (let property in this.data) {
        data[property] = this[property]
      }
  
      return data
    }
  
    reset() {
      for (let field in this.data) {
          this[field] = '';
      }
  
      this.errors.clear()
    }
  
    submit(requestType, url) {
      console.log(`Trying to submit a ${requestType} request to ${url}`)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() >= 0.5) {
            let response = {
              data: {
                message: 'Successfully submitted'
              }
              
            }

            




           
  
            this.onSuccess(response.data)
  
            resolve(response.data)
          } else {
            let error = {
              response: {
                data: {
                  [(this.data)] : 'This field is required'
                }
              }
            }
  
            this.onFail(error.response.data)
  
            reject(error.response.data)
          }
        }, 1000)
      })
    }
  
    onSuccess(data) {
      alert('Success:', data.message)
  
      this.reset()
    }
  
    onFail(errors) {
      console.log('Some errors happened', errors)
      this.errors.record(errors)
    }
  }




  const registrationForm = new Form({
  firstName: 'pedja',
  lastName: 'miljus',
  email: 'pedja@gmail.com',
  password: '1234'
})

const registrationForm1 = new Form({
  firstName: 'jelena',
  lastName: 'miljus',
  email: 'jelena@yahoo.com',
  password: '1234'
})





registrationForm.submit('POST', 'http://localhost:8000');
registrationForm1.submit('POST', 'http://localhost:8001');





