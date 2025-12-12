import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET All Subscriptions" })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET single Subscription" })
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create New Subscription" })
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update a  Subscription" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete a Subscription" })
);

subscriptionRouter.get(
  "/user/:id",
  (
    req,
    res // to get all subsciptions of a specific user
  ) => res.send({ title: "Get All Subscription of a specific user" })
);

subscriptionRouter.put(
  "/:id/cancel",
  (
    req,
    res // to cancel subscriptions
  ) => res.send({ title: "Cancel a Subscription" })
);

subscriptionRouter.get(
  "/upcoming-renewals",
  (
    req,
    res // to cancel subscriptions
  ) => res.send({ title: "Get upcoming Subscription" })
);

export default subscriptionRouter;
