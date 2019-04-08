import express from "express"
import setupMiddleware from "./middleware"
import { getSourceData, postWebHook } from "./requesty"
import asyncRoute from "route-async"

const app = express()
setupMiddleware(app)

app.get("/hook/:filterId", async (req, res) => {
  const webhook = req.query["webhook"]
  const filterId = req.params["filterId"]
  // validate
  if (webhook == undefined || filterId == undefined) {
    res.json({
      result: 'Invalid Parameters',
      sent: 0
    })
    return
  }

  // Get Test Data
  const url = "https://jsonplaceholder.typicode.com/comments?postId=1";
  const data = await getSourceData(url)

  // Filter based on filterId
  const filtered = data.filter(item => item.id == filterId)

  // Send filtered results to WebHook url asynchronously
  postWebHook(webhook, filtered)

  res.json({
	  result: `Result (${filtered.length}) sent to your webhook ${webhook}.`,
	  sent: filtered.length
  });
});

export default app;
