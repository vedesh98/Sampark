const Bhoolku = require("../models/bhoolku");
const mongoose = require("mongoose");
const Attendance = require("../models/attendance");
const Sabha = require("../models/sabha");
const common = require("../../common");

exports.attendace_get_all = async (request, response, next) => {
  try {
    const fetchAttendance = await Attendance.find(request.query, {
      _id: 1,
      attendees: 1,
      non_attendees: 1,
    });
    response.send(fetchAttendance);
  } catch (error) {
    throw error;
  }
};

exports.attendace_create = async (request, response, next) => {
  try {
    const fetchSabh = await Sabha.findById(request.body.sabha);

    if (!fetchSabh) {
      response.status(500).send({
        error: true,
        message: "Please select valid sabha.",
      });
    }
    // Check attendance is available for that day or not
    const fetchAttendance = await Attendance.find({
      date: request.body.date,
      sabha: fetchSabh._id,
    });
    if (fetchAttendance.length > 0) {
      response.status(500).send(fetchAttendance);
    } else {
      const createdAttendance = await Attendance.create({
        _id: new mongoose.Types.ObjectId(),
        date: request.body.date,
        sabha: request.body.sabh,
        attendees: request.body.attendees,
        non_attendees: request.body.non_attendees,
        // createdBy: request.userData.userId,
      });
      response.status(201).send(createdAttendance);
    }
  } catch (error) {
    throw error;
  }
};

exports.attendace_get = async (request, response, next) => {
  try {
    //fetch attendance by Addtendace ID
    const { attendanceId } = request.params;

    const fetchAttendance = await Attendance.findById(attendanceId, {
      attendees: 1,
      non_attendees: 1,
    }).populate("attendees non_attendees");

    response.status(200).send({
      attendanceId: fetchAttendance._id,
      attendees: fetchAttendance.attendees.map((bhoolku) => bhoolku.name),
      non_attendees: fetchAttendance.non_attendees.map((bhoolku) => {
        bhoolku._id, bhoolku.name;
      }),
    });
  } catch (error) {
    throw error;
  }
};

exports.attendace_update = async (request, response, next) => {
  try {
    const { attendanceId } = request.params;
    request.body.changedBy = request.userData.userId;
    request.body.changedAt = Date.now();
    const updateBhoolku = await Attendance.updateOne(
      { _id: attendanceId },
      { $set: request.body }
    ).select("date attendees");
    response.status(200).send(updateBhoolku);
  } catch (error) {
    throw error;
  }
};

exports.attendance_delete = async (request, response, next) => {
  try {
    const { attendanceId } = request.params;
    const isDeleted = await Attendance.findOneAndRemove({ _id: attendanceId });
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: `Attendance with ${attendanceId} deleted successfully,`,
      });
    } else {
      response.status(404).send({
        error: true,
        message: `Attendance with ID ${attendanceId} not found.`,
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.attendace_sheet = async (request, response, next) => {
  try {
    const { attendanceId } = request.params;

    const fetchList = await Attendance.findById(attendanceId, {
      attendees: 1,
      non_attendees: 1,
      date: 1,
    })
      .populate("attendees non_attendees")
      .select("name phone");
    const timeStamp = fetchList.date
      .toISOString()
      .split("T")[0]
      .replaceAll("-", "");
    common.createFile(fetchList.attendees, "attendees" + timeStamp);
    common.createFile(fetchList.non_attendees, "non_attendees" + timeStamp);
  } catch (error) {
    throw error;
  }
};

exports.followup = async (request, response, next) => {
  try {
    const { attendanceId } = request.params;
    const fetchFollowup = await Attendance.findById(attendanceId, {
      _id: 0,
      non_attendees: 1,
    }).populate("non_attendees", {
      _id: 0,
      name: 1,
      phone: 1,
      referanceBhoolku: 1,
      followupBhoolku: 1,
    });

    const followupListKK = fetchFollowup.non_attendees.reduce(
      (result, follow) => {
        let followUpId;
        if (follow.followupBhoolku) {
          followUpId = follow.followupBhoolku;
        } else {
          followUpId = follow.referanceBhoolku;
        }
        if (!result[followUpId]) {
          result[followUpId] = [
            { name: follow.name, phone: follow.phone },
          ];
        } else {
          result[followUpId].push({
            name: follow.name,
            phone: follow.phone,
          });
        }
        return result;
      },
      {}
    );

    const followupKK = await Bhoolku.find(
      {
        _id: { $in: Object.keys(followupListKK) },
      },
      {
        name: 1,
        phone: 1,
      }
    );
    let finalList = [];
    for (const KkInfo of followupKK) {
      finalList.push({
        KkInfo: {
          name: KkInfo.name,
          phone: KkInfo.phone,
        },
        FolloUpList: followupListKK[KkInfo._id],
      });
    }

    response.status(200).send(finalList);
  } catch (error) {
    throw error.message;
  }
};
