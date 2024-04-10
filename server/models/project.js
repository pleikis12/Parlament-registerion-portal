import { Schema, model } from 'mongoose'

const Project = model('project', new Schema({
  project_name: {
    type: String,
    maxLength: [80, 'Projekto pavadinimas negali buti ilgesnis nei 80 simbolių'],
    required: [true, 'Projekto pavadinimas yra privalomas']
  },
  picture: {
    type: String,
    required: [true, 'Įkelti nuotrauką yra privaloma']
  },
  description: {
    type: String,
    maxLength: [2000, 'Aprašymas yra per ilgas, aprašymas negali būti ilgesnis negu 2000 simbolių'],
    required: [true, 'Projekto aprašymas yra butinas']
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  hearing_at: {
    type: Date,
    required: [true, 'Nurodyti svarstymo datą yra privaloma'],
    unique: [true, 'Svarstymo data jau užimta pasirinkite kita datą.'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: "Pateiktas",
  },
}));

export default Project;