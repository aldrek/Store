import { app } from "./index";

app.listen(process.env.PORT || 8080, () => {
  console.log("Server has started");
});
