

import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";

const getAllAttendance = async (req, res) => {
    const attendanceRecords = await Attendance.find();
    // console.log(attendanceRecords);
    return res.status(200).json({
        attendanceRecords
    });
}

const getUserAttendance = async (req, res) => {
    const userId = req.params.userid;
    const user = await User.findById(userId);

    if (!user) {
        console.log("User not found");
        return res.status(404).send('User not found');
    }

    const attendanceRecords = await Attendance.find({ user });
    // console.log(attendanceRecords);
    return res.status(200).json({
        user,
        attendanceRecords
    });
}

export default {
    getUserAttendance,
    getAllAttendance
}
