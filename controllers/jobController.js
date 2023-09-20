import { nanoid } from "nanoid";
import Job from "../models/Job.js";
import { NotFoundError } from "../ERRORS/customErrors.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
let jobs = [
  { id: nanoid(), company: "Some", position: "front" },
  { id: nanoid(), company: "stuf", position: "back" },
];
export async function getAllJob(req, res) {
  const { search, position, jobstatus, company, jobType, sort } = req.query;
  console.log(req.query);
  const queryObj = {};
  console.log(queryObj);
  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobstatus && jobstatus !== "all") {
    queryObj.jobstatus = jobstatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sortKey = sortOptions[sort] || sortOptions.newest;
  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);
  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPage = Math.ceil(totalJobs / limit);
  res.status(200).json({ jobs, totalJobs, currentPage: page, numOfPage });
}
export const createJob = async (req, res) => {
  req.body.createdByreq.body.createdBy;
  if (!req.body) {
    throw new NotFoundError("not found");
  }
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;

  let job = await Job.findById(id);

  res.status(200).json({ job });
};

export const updateJobs = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOneAndUpdate(id, req.body, { new: true });

  res.status(200).json({ msg: "patched", job });
};

export const deletJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  const newJob = jobs.filter((job) => job.id !== id);
  jobs = newJob;
  res.status(200).json({ msg: "deleted" });
};

export const showStatus = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  //atribuindo key balue para os objetps... e eu passando mal aquele dia
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  //aqui o stats vira uma key stats.algumaCoisaDentroDele
  const defaultStatus = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    decline: stats.decline || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  console.log(monthlyApplications);
  console.log(defaultStatus);

  res.status(StatusCodes.OK).send({ defaultStatus, monthlyApplications });
};
