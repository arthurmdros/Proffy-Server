import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (req,res) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = req.body;

    const insertedUsersId = await db('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
    });

    const user_id = insertedUsersId[0];

    const insertedClassesId = await db('classes').insert({        
        subject,
        cost,
        user_id
    });

    const class_id = insertedClassesId[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
            class_id,
            week_day: scheduleItem.week_day,
            from: convertHourToMinutes(scheduleItem.from),
            to: convertHourToMinutes(scheduleItem.to),
        }
    })

    await db('class_schedule').insert(classSchedule);

    return res.send();
});

export default routes;