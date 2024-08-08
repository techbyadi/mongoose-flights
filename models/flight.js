import mongoose from "mongoose";

const Schema = mongoose.Schema;


const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
  },
  price: Number
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String, 
    enum : ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  }, 
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: function(){
      const currentDate = new Date();
      const timezoneOffsetInHours = currentDate.getTimezoneOffset() / 60;
      currentDate.setHours(currentDate.getHours()-timezoneOffsetInHours);
      currentDate.setFullYear(currentDate.getFullYear() +1)
      return currentDate;
    }
  },
  tickets: [ticketSchema],
}, 
{
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}