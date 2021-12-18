import { NodeServer, Middlewares } from "async-server";

await new NodeServer({
    port: 80
})
    .useStaticPath("./B1/Lab1/pages")
    .use(Middlewares.renderHTML)
    .use((req, res) => res.renderSync(req.url) ? void (0) : res.redirect("/index"))
    .start()