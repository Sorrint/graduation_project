import Counter from '../models/counter.model.js';

const CounterService = {
    update: async function () {
        const autoInc = await Counter.findOneAndUpdate(
            { name: 'bookingcounter' },
            { $inc: { value: 1 } },
            { returnNewDocument: true }
        );
        return autoInc.value;
    }
};

export default CounterService;
