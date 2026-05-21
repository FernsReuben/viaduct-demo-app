import express from "express";
import cors from "cors";

import usersRoute from "./routes/users";
import groupsRoute from "./routes/groups";
import activityRoute from "./routes/activity";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/users", usersRoute);
app.use("/groups", groupsRoute);
app.use("/activity", activityRoute);

app.listen(3001, () => {
  console.log("Mock backend running on port 3001");
});