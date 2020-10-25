const House = require('../models/House')
const Available = require('../models/Available')

module.exports = {

    async createAvailable(req, res) {

        const { house_id,initial_hour,final_hour,day_week } = req.body

        const house = await House.findByPk(house_id)
        console.log(house)
        if (!house || house.is_deleted == true) {
            return res.status(400).json({ err: 'House not found' })
        }
        // como regra de negócio só permitiremos cadastrar um dia da semana uma unica vez
        const available = await Available.findOne({where: {day_week: day_week}})
        if (available){
            return res.status(400).json({err: 'available already exists'})
        }

        const inserted_available  = await Available.create({  house_id, initial_hour, final_hour, day_week })

        return res.json({inserted: inserted_available})
    },

    async getDayAvailable(req, res) {
        const { day } = req.params

        const date = new Date(day);

        const available = await Available.findOne({where: {day_week: date.getDay()}})
        return res.json(available)
    }

}