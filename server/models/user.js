import { Schema, model } from 'mongoose'

const User = model('User', new Schema({
  name: {
    type: String,
    maxLength: [80, 'Vardas per ilgas, vardas negali būti ilgesnis nei 80 simbolių.'],
    required: [true, 'Vardas Privalomas.'],
  },
  surname: {
    type: String,
    maxLength: [80, 'Pavardė per ilga, pavardė negali būti ilgesnė nei 80 simbolių.'],
    required: [true, 'Pavardė Privaloma.'],
  },
  party_name: {
    type: String,
    maxLength: [80, 'Partijos pavadinimas per ilgas, Pavadinimas negali būti ilgesnė nei 80 simbolių.'],
    required: [true, 'Partijos pavadinimas Privalomas.'],
  },
  email: {
    type: String,
    required: [true, 'Paštas yra Privalomas.'],
    unique: [true, 'Elektroninis paštas jau yra naudojamas.'],
    maxLength: [80, 'el. pašto adresas per ilgas.'],
    validate: [{
      validator: function (v) { 
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: props => `${props.value} Neteisingas el. pašto adresas.`
    }
    ]
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  addmin: {
    type: Boolean,
    default: false,
  },
  active_user: {
    type: Boolean,
    default: true,
  },
}))

export default User;