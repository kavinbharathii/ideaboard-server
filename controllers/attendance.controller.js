
import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";
import moment from 'moment';

const checkInAttendance = async (req, res) => {
    console.log("Check In post Endpoint hit");
    const { username, latitude, longitude } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found"
            });
        }

        // console.log(`User found: ${user}`);

        const oneHourAgo = moment().subtract(1, 'hour');
        if (user.lastSubmitted && moment(user.lastSubmitted).isAfter(oneHourAgo)) {
            return res.status(400).send('You can only submit once per hour');
        }

        const attendance = new Attendance({
            user: user.username,
            selfie: req.file.path,
            latitude,
            longitude
        });

        // console.log(`Attendance created: ${attendance}`);

        // save the attendance
        try {
            await attendance.save();
        } catch (error) {
            console.log("Error saving attendance");
            return res.status(400).json({
                message: error.message
            });
        }

        // update the user's lastSubmitted to the submitted time
        user.lastSubmitted = Date.now();
        await user.save();
        return res.status(201).send('Attendance submitted successfully');
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export default {
    checkInAttendance
}
